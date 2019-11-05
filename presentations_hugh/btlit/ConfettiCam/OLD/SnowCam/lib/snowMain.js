    	var
    		worker = new Worker( 'lib/wwConvolution.js' ),
    		tmpCanvas = document.getElementById( 'tmpCanvas' ),
    		tmpContext = tmpCanvas.getContext( '2d' ),
    		processedCanvas = document.getElementById( 'camCanvas' ),
    		processedContext = processedCanvas.getContext( '2d' ),
    		requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function ($cb) {
				window.setTimeout( $cb, 1000 / 60 );
			}
		;
		
		webcam.init( 'camOriginal' )
		webcam.onReadFrame = function () {
			// Add current video frame to the temp canvas
			tmpContext.drawImage( webcam.video, 0, 0, webcam.width, webcam.height );
			
			// Post to a webworker so we don't block the snow updating
			worker.postMessage({
				'image': tmpContext.getImageData( 0, 0, webcam.width, webcam.height ),
				'horizontal': true,
				'vertical': false
			});
			
			
		};
		webcam.connect();
		
		// Once we have a result from the worker, update the processed canvas with the new frame
		worker.onmessage = function ($evt) {
			var
				imageData,
				i = 0,
				l = 0,
				edge,
				
				row = 0,
				col = 0,
				collectsOn = {};
			;
			
			imageData = tmpContext.createImageData( $evt.data.width, $evt.data.height );
			
			for ( i=0,l=imageData.data.length; i<l; i+=4 ) {
				// make the vertical gradient red
				if ( $evt.data.vertical ) {
					edge = Math.abs( $evt.data.vertical.data[i] );
					imageData.data[i] = edge;
				}

				// make the horizontal gradient green
				if ( $evt.data.horizontal ) {
					edge = Math.abs( $evt.data.horizontal.data[i] );
					imageData.data[i+1] = edge;
				}
				
				// Set row and col info for snow collection
				if ( i > 0 ) {
					col++;
				}
				
				if ( col % imageData.width == 0 ) {
					col = 0;
					row++;
				}
			
				// Only show pixles that could collect snow
				if ( imageData.data[i+1] > 100 ) {
					imageData.data[i+3] = 255;
					
					if ( ! collectsOn[col] ) {
						collectsOn[col] = {};
					}
					
					collectsOn[col][row] = 1;
					
				} else {
					imageData.data[i+3] = 0; // Hide pixel
				}
			}
			
			snow.ledges = collectsOn;
			
			processedContext.putImageData( imageData, 0, 0 );
			
			requestAnimationFrame( webcam.onReadFrame );
	    };
	    
	    // Start the snow on a seperate canvas
		snow.init( 'snowCanvas' );
		
		function merge () {
			if ( document.getElementById('camCanvas').style.display !== 'inline-block' ) {
				document.getElementById('camOriginal').style.position = 'relative';
				document.getElementById('tmpCanvas').style.position = 'relative';
				document.getElementById('camCanvas').style.position = 'relative';
				document.getElementById('camCanvas').style.display = 'inline-block';
				document.getElementById('snowCanvas').style.position = 'relative';
			} else {
				document.getElementById('camOriginal').style.position = 'absolute';
				document.getElementById('tmpCanvas').style.position = 'absolute';
				document.getElementById('camCanvas').style.position = 'absolute';
				document.getElementById('camCanvas').style.display = 'none';
				document.getElementById('snowCanvas').style.position = 'absolute';
			}
		}
		
		function release () {
			var 
				i = 0,
				l = 0
			;
			
			for ( i=0, l=snow.fallingFlakes.length; i<l; i++ ) {
				snow.fallingFlakes[i].unstick();
				snow.fallingFlakes[i].noStick = true;
			}
		}

var hideSnowToggleVar=false;

                function hideSnowToggle () {
		    if ( hideSnowToggleVar == true ) {
			snowRestart = false;
			//			document.getElementById('snowCanvasDiv').style.visibility = 'hidden'; 
		    } else {
			snow.reset();
                        //snow.draw( );
						document.getElementById('snowCanvasDiv').style.visibility = 'visible';
		    }
                    hideSnowToggleVar = ! hideSnowToggleVar;
		}
