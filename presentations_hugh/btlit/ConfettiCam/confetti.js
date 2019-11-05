
var visualizer = (function() {
	var my = {};


/*!
 * @name		ConfettiCam : lib/webcam.js
 */

/*global console*/
/*jslint white:true*//*jslint nomen:true*//*jslint plusplus:true*/

/**
 * 
 */
(function () {
	
	// ----- Internal
	// ----------------------------------------------------------------------
	
	'use strict';
	
	var
		webcam = {}
	;
	
	// Normalise
	window.URL = window.URL || window.webkitURL;
	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || null;
	navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia || null;
	
	
	// ----- Main webcam object
	// ----------------------------------------------------------------------
	
	webcam.init = function ($video) {
		this.video = ('string' === typeof $video) ? document.getElementById( $video ) : $video;
		this.width = this.video.width;
		this.height = this.video.height;
		
		return this;
	};
	
	webcam.connect = function () {
		navigator.getUserMedia( {video: true}, function ($stream) {
			if ( this.video.mozSrcObject ) {
				this.video.mozSrcObject = $stream;
			} else {
				if ( window.URL ) { // Opera dones thave this
				    try {
				      this.video.srcObject = $stream;
				    } catch (error) {
				    	this.video.src = window.URL.createObjectURL($stream);
				    }
				    //				    this.video.src = $stream; // window.URL.createObjectURL( $stream );
				} else {
					this.video.src = $stream;
				}
			}
			this.video.play();
			
			window.requestAnimationFrame( this.onReadFrame );
			
		}.bind( this ), function err($err) {
			console.log('Ooops, that didnt work', $err);
		});
		
		return this;
	};
	
	webcam.onReadFrame = function () {
		return;
	};
	
	
	// ----- Expose
	// ----------------------------------------------------------------------
	
	window.webcam = webcam;
	
}()); /*!
 * @name		ConfettiCam : lib/confetti.js
 */

/*global console*/
/*jslint white:true*//*jslint nomen:true*//*jslint plusplus:true*/

/**
 * 
 */

var confettiRestart=false;

(function (GLOBAL) {
	
	// ----- Internal
	// ----------------------------------------------------------------------
	
	'use strict';
	
	var
		confetti = {},
		requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function ($cb) {
			window.setTimeout( $cb, 1000 / 10 );
		}
	;
	
	
	// ----- Flake object
	// ----------------------------------------------------------------------


		function get_random_color() {
		    var letters = '0123456789ABCDEF'.split('');
		    var color = '#';
		    for (var i = 0; i < 6; i++ ) {
			color += letters[Math.round(Math.random() * 15)];
		    }
		    return color;
		}
	
	function Flake () {
		this.canvas = {
			width: 0
		};
                this.color = get_random_color();		
		this.xPos = 18;
		this.yPos = 0;
		this.xVel = 0;
		this.yVel = 0;
		
		this.speed = 0;
		this.radius = 0;
		this.step = 0;
		this.stepSize = 0;
		
		this.opacity = 1;
		
		this.sticky = false;
		this.noStick = false;
		this.melting = false;
		this.timer = null;
	}
	
	/**
	 * 
	 */
	Flake.prototype.init = function () {
		var
		speed = (Math.random() + 0.5)*6;

		this.xPos = Math.floor( Math.random() * this.canvas.width );
		this.yVel = speed;
                this.colour = get_random_color();		
		this.speed = speed;
                this.rotationSpeed = (Math.random()/5.0);
                this.theta = Math.random();
		this.radius = (Math.random() * 3.0) + 1;
		this.stepSize = Math.random() / 30;
		
		this.opacity = (Math.random() * 0.5) + 0.5;
		
		return this;
	};
	
	/**
	 * 
	 */
	Flake.prototype.stick = function () {
		if ( ! this.noStick ) {
			this.sticky = true;
			
			// Randomise when the flake starts to melt
			this.timer = setTimeout((function ($this) {
				return function () {
					$this.melting = true;
				};
			}( this )), ((Math.random() * 11 ) + 8) * 1000);
		}
	};
	
	/**
	 * 
	 */
	Flake.prototype.unstick = function () {
		this.sticky = false;
	};
	
	/**
	 * 
	 */
	Flake.prototype.reset = function () {
		this.yPos = 0;
		this.xVel = 0;
		this.step = 0;
		this.sticky = false;
		this.noStick = false;
		this.melting = false;
		
		if ( this.timer ) {
			clearTimeout( this.timer );
			this.timer = null;
		}
		
		return this.init();
	};
	
	
	// ----- Helpers
	// ----------------------------------------------------------------------
	
	function _createFlake ($canvasWidth) {
		var 
			flake = new Flake(),
			i
		;
		
		flake.canvas.width = $canvasWidth;
		
		return flake.init();
	}
	
	
	// ----- Main confetti object
	// ----------------------------------------------------------------------
	
	confetti.canvas = null;
	confetti.context = null;
	
	confetti.fallingFlakes = [];
	
	confetti.options = {
		maxFlakes: 300
	};
	
	confetti.ledges = [];
	
	
	/**
	 * 
	 * @param {Object} $canvas
	 * @param {Object} $options
  	 */
	confetti.init = function ($canvas,$options) {
		var
			i = 0
		;
		
		this.canvas = ('string' === typeof $canvas) ? document.getElementById( $canvas ) : $canvas;
		this.context = this.canvas.getContext( '2d' );
		
		//		this.canvas.width = 320;
		// this.canvas.height = 240;
		
		// Create the flakes
		for ( i=0; i<this.options.maxFlakes; i++ ) {
			this.fallingFlakes.push( _createFlake( this.canvas.width ) );
		}
		
		this.draw();
	};
	
        confetti.reset = function() {
	    var l = this.fallingFlakes.length,
	    i = 0;

	    this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
            confettiRestart = true;
	    for ( i=0; i<l; i++ ) {
 		this.fallingFlakes[i].reset();
	    }
	}

	/*
	 * 
	 */
	confetti.drawFlake = function ($flake) {
            this.context.save();
	    this.context.fillStyle = $flake.colour; // this.colour; // 'rgba(255, 255, 255, ' + $flake.opacity + ')';
	    this.context.translate($flake.xPos,$flake.yPos);
   	    this.context.beginPath();		
	    //	    this.context.moveTo( $flake.xPos, $flake.yPos );
	 	    //	    this.context.arc( $flake.xPos, $flake.yPos, $flake.radius, 0, Math.PI*2, true );
            this.context.rotate($flake.theta);
            this.context.fillRect( -$flake.radius*1.5,-$flake.radius, $flake.radius*3, $flake.radius*2 );                                                  

	    //	    this.context.fillRect( $flake.xPos, $flake.yPos, $flake.radius*3, $flake.radius*2 );
	    //		this.context.fill();
            this.context.restore();
            this.context.translate(0,0);
	};
	
	/**
	 * 
	 */
	confetti.draw = function () {
		var
			x = 0,
			y = 0,
			i = 0,
			l = this.fallingFlakes.length,
			j = 0,
			k = 0,
			ledge,
			flake,
			startX = -100,
			startY = -100,
			minDistance = 150,
			distance,
			deltaV,
			xcomp,
			ycomp
		;
		
		this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
		
		for ( i=0; i<l; i++ ) {	
			flake = this.fallingFlakes[i];
			
			x = Math.floor( flake.xPos );
			y = Math.floor( flake.yPos );
			
			// If we are melting, slowly fade away
			if ( flake.melting ) {
				flake.opacity -= 0.002;
				
				if ( flake.opacity <= 0 ) {						
				    if (confettiRestart == true ) {
              			        flake.reset();
				    }
				}
			}
			
			// If flake is currently stuck to a ledge
			if ( flake.sticky ) {
				
				// No ledge anymore, so unstick
				if ( !(this.ledges[x] && this.ledges[x][y]) ) {		
					flake.unstick();
				}
				
				// Paint the flake and skip to the next if we are still stuck
				if ( flake.sticky ) {
					this.drawFlake( flake );
					continue;
				}
			}
			
			// Flake is falling and hits a ledge
			if ( !flake.sticky && !flake.noStick && ( this.ledges[x] && this.ledges[x][y] ) ) {
				flake.stick();
			
			// Flake is falling and there is nothing obstructing it
			} else {
				distance = Math.sqrt( (flake.xPos - startX) * (flake.xPos - startX) + (flake.yPos - startY) * (flake.yPos - startY) );
 				
				if ( distance < minDistance ) { 
					xcomp = (startX - flake.xPos) / distance;
					ycomp = (startY - flake.yPos) / distance;
					deltaV = (minDistance / (distance * distance)) / 2;
					
					flake.xVel -= deltaV * xcomp;
					flake.yVel -= deltaV * ycomp;
				
				} else {
					flake.xVel *= 0.98;
					
					if (flake.yVel <= flake.speed) {
						flake.yVel = flake.speed;
					}
					
					flake.step += 0.5;
					
					flake.xVel += Math.cos(flake.step) * flake.stepSize;
				}
			    
				// Set new position
				flake.xPos += flake.xVel;
				flake.yPos += flake.yVel;
                                if (( i % 2 ) == 0 ) {
                                   flake.theta += flake.rotationSpeed;
                                   if (flake.theta > Math.PI ) { flake.theta = 0.0; }
				} else {
				    flake.theta -= flake.rotationSpeed;
				    if (flake.theta < 0.0 ) { flake.theta = Math.PI; }
				}
				// Check bounds
				if ((flake.xPos >= this.canvas.width || flake.xPos <= 0)) {
				    if (confettiRestart == true ) {
					flake.reset();
				    } else {
                                           flake.xPos = this.canvas.width+20; 
				    }                               
				}
				
			        if ((flake.yPos >= this.canvas.height || flake.yPos <= 0)) {
				    if ( confettiRestart == true ) {
					flake.reset();
				    } else {
                                            flake.yPos = this.canvas.height+20; 
				    }
				}
			}
			
			this.drawFlake( flake );
		}

		requestAnimationFrame( this.draw.bind( this ) );
	};
	
	
	// ----- Expose
	// ----------------------------------------------------------------------
	
	GLOBAL.confetti = confetti;
	
}( window ));    	var
    		worker = new Worker( '../btlit/ConfettiCam/wwConvolution.js' ),
    		tmpCanvas = document.getElementById( 'tmpCanvas' ),
    		tmpContext = tmpCanvas.getContext( '2d' ),
    		processedCanvas = document.getElementById( 'camCanvas' ),
    		processedContext = processedCanvas.getContext( '2d' ),
    		requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function ($cb) {
				window.setTimeout( $cb, 1000 / 10 );
			}
		;

	my.initConfettiCam = function () {
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
my.hideConfetti = function() {
    confettiRestart = false;
    hideConfettiToggleVar=false;
};

       
my.hideConfettiToggle = function() {
    if ( hideConfettiToggleVar ) {
	hideConfetti();
    } else {
	showConfetti();
    }	
};

my.showConfetti = function() {
    confetti.reset();
    hideConfettiToggleVar=true;
};



	my.hideConfettiToggle = function () {
		    if ( hideConfettiToggleVar == true ) {
			my.hideConfetti();
		    } else {
			my.showConfetti();
		    }
	};


	return my;

    }());

