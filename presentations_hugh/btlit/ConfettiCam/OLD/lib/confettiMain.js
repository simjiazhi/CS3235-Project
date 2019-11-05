    	var
    		worker = new Worker( '../btlit/ConfettiCam/lib/wwConvolution.js' ),
    		tmpCanvas = document.getElementById( 'tmpCanvas' ),
    		tmpContext = tmpCanvas.getContext( '2d' ),
    		processedCanvas = document.getElementById( 'camCanvas' ),
    		processedContext = processedCanvas.getContext( '2d' ),
    		requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function ($cb) {
				window.setTimeout( $cb, 1000 / 60 );
			}
		;

function initConfettiCam() {		
		webcam.init( 'innercontainer7video' )
		webcam.onReadFrame = function () {
			// Add current video frame to the temp canvas
			tmpContext.drawImage( webcam.video, 0, 0, webcam.width, webcam.height );
			
			// Post to a webworker so we don't block the confetti updating
			worker.postMessage({
				'image': tmpContext.getImageData( 0, 0, webcam.width, webcam.height ),
				'horizontal': true,
				'vertical': false
			});
			
			
		};
		webcam.connect();
		
}
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
				
				// Set row and col info for confetti collection
				if ( i > 0 ) {
					col++;
				}
				
				if ( col % imageData.width == 0 ) {
					col = 0;
					row++;
				}
			
				// Only show pixles that could collect confetti
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
			
			confetti.ledges = collectsOn;
			
			processedContext.putImageData( imageData, 0, 0 );
			
			requestAnimationFrame( webcam.onReadFrame );
	    };
	    
	    // Start the confetti on a seperate canvas
		confetti.init( 'innercontainer7' );
		
		function merge () {
			if ( document.getElementById('camCanvas').style.display !== 'inline-block' ) {
				document.getElementById('innercontainer7video').style.position = 'relative';
				document.getElementById('tmpCanvas').style.position = 'relative';
				document.getElementById('camCanvas').style.position = 'relative';
				document.getElementById('camCanvas').style.display = 'inline-block';
				document.getElementById('innercontainer7').style.position = 'relative';
			} else {
				document.getElementById('innercontainer7video').style.position = 'absolute';
				document.getElementById('tmpCanvas').style.position = 'absolute';
				document.getElementById('camCanvas').style.position = 'absolute';
				document.getElementById('camCanvas').style.display = 'none';
				document.getElementById('innercontainer7').style.position = 'absolute';
			}
		}
		
		function release () {
			var 
				i = 0,
				l = 0
			;
			
			for ( i=0, l=confetti.fallingFlakes.length; i<l; i++ ) {
				confetti.fallingFlakes[i].unstick();
				confetti.fallingFlakes[i].noStick = true;
			}
		}

var hideConfettiToggleVar=false;
function hideConfetti() {
    confettiRestart = false;
    hideConfettiToggleVar=false;
}
function showConfetti() {
    confetti.reset();
    hideConfettiToggleVar=true;
}



                function hideConfettiToggle () {
		    if ( hideConfettiToggleVar == true ) {
			hideConfetti();
		    } else {
			showConfetti();
		    }
		}
