
var v1 = false;
var v2 = false;
var v3 = false;
var v4 = false;
var v9 = false;
var v10 = false;

var widt = window.innerWidth;
var heit = window.innerHeight;

var lastwidth = false;
var lastheight = false;

var zindex = 11;
var currentdiv = 3;
var cam1 = document.querySelector("#innercontainer6video");
var cam2 = document.querySelector("#innercontainer7video");
var cam4 = document.getElementById("green-scree");

var currentfocus=3;

function frameConverter(video,canvas,dv) {

    // Set up our frame converter
    this.video = video;
    this.viewport = canvas.getContext("2d");
    console.log( "Canvas: "+canvas.width+","+canvas.height+". Video: "+video.width+","+video.height );
    this.width = canvas.width;
    this.height = canvas.height;
    // Create the frame-buffer canvas
    this.framebuffer = document.createElement("canvas");
    this.framebuffer.width = this.width;
    this.framebuffer.height = this.height;
    this.ctx = this.framebuffer.getContext("2d");
    // Default video effect is blur
    //    this.effect = JSManipulate.blur;
    // This variable used to pass ourself to event call-backs
    var self = this;
    // Start rendering when the video is playing
    this.video.addEventListener("play", function() {
	    self.render();
	}, false);
      
    // Change the image effect to be applied  
    //  this.setEffect = function(effect){
    //if(effect in JSManipulate){
    //    this.effect = JSManipulate[effect];
    //}
    //}

    // Rendering call-back
    this.render = function() {
        if (this.video.paused || this.video.ended) {
	    return;
        }
	this.renderFrame();
        var self = this;
        // Render every 100 ms
        setTimeout(function () {
		self.render();
	    }, 100);
    };


    // Compute and display the next frame 
    this.renderFrame = function() {
        // Acquire a video frame from the video element
        this.ctx.drawImage(this.video, leftinneridx[dv],topinneridx[dv], this.video.videoWidth/scale[currwidthscale[dv]],
			   this.video.videoHeight/scale[currheightscale[dv]],0,0,this.width, this.height);
		//		data = "";
	var data = this.ctx.getImageData(0, 0, this.width, this.height);
        // Apply image effect
	//        this.effect.filter(data,this.effect.defaultValues);
        // Render to viewport
	this.viewport.putImageData(data, 0, 0);
        data = "";
	return;
    };
};


window.addEventListener( "keydown", doKeyDown, false );

window.onresize = function(event) {
   resetWindows();
   fixDiv(currentdiv,0,0);
}

function setDivSize(dv) {
   var container = document.getElementById("container"+dv);
   container.style.width = ((widt/scale[currscale[dv]])/scale[currwidthscale[dv]])+"px";
   container.style.height = ((heit/scale[currscale[dv]])/scale[currheightscale[dv]])+"px";
   
   if ( border[dv] == true ) {
       container.style.width = ((widt/scale[currscale[dv]])/scale[currwidthscale[dv]])-10+"px";
       container.style.height = ((heit/scale[currscale[dv]])/scale[currheightscale[dv]])-10+"px";
       var container = document.getElementById("innercontainer"+dv);
       container.style.width = ((widt/scale[currscale[dv]])/scale[currwidthscale[dv]])-10+"px";
       container.style.height = ((heit/scale[currscale[dv]])/scale[currheightscale[dv]])-10+"px";
       if ( dv == 7 ) {
	   var container = document.getElementById("camCanvas");
	   container.style.width = ((widt/scale[currscale[dv]])/scale[currwidthscale[dv]])-10+"px";
	   container.style.height = ((heit/scale[currscale[dv]])/scale[currheightscale[dv]])-10+"px";
           var container = document.getElementById("tmpCanvas");
           container.style.width = ((widt/scale[currscale[dv]])/scale[currwidthscale[dv]])-10+"px";
           container.style.height = ((heit/scale[currscale[dv]])/scale[currheightscale[dv]])-10+"px";
       }
   }
}

resetWindows();

function resetWindows() {
      widt = window.innerWidth;
      heit = window.innerHeight;
      for (var i=0;i<=numberofwindows;i++) {
         setDivSize(i);
	 fixDiv(i,0,0);
      }   
}

function bringContainerToFront( dv ) {
    var container = document.getElementById("container"+dv);
    if ( container.style.zIndex != zindex ) {
       zindex = zindex+1;
       container.style.zIndex = zindex;
    }
    currentdiv = dv;
    if (dv!=8) { // i.e. it is not the timer...
	timerCountdown.stopClock();
    }
}

function playMovie( fname ) {
    bringContainerToFront(1);
    var container = document.getElementById("innercontainer1");
    container.src = fname;
    container.addEventListener('loadedmetadata',function(){
	    container.currentTime = 0;
	    container.play();
	}, false );
    currentfocus=1;
}

var starwarsSelectMessage=false;
var starwarsShowing=false;
var internetSelectURL=false;

function doKeyDown(e) {
    if ( quizzing == true ) {
	quiz.Quiz_keypresshandler(e);
	//        return;
    } else {
//   alert( e.keyCode );
   if ( e.keyCode == 86 ) { // Visualizer - V
      if ( v2 == false ) {
          v2 = true;
          visualizer.initConfettiCam();
	  //          video = document.getElementById("innercontainer7video");
          //canvas = document.getElementyId("innercontainer7");
          //fc = new frameConverter(video,canvas,7);
	  //cameraFn.startCam( handleCam2 );
       } 
       if ( e.ctrlKey == true ) {
	   visualizer.hideConfettiToggle();
       } else {
	   bringContainerToFront(7);
        }
   }
   if ( e.keyCode == 67 ) { // Camera - C
      if ( v1 == false ) {
         v1 = true;
         cameraFn.startCam( handleCam1 );
       }
       bringContainerToFront(6);
   }
   if ( e.keyCode == 71 ) { // Green screen video overlay - G
       if ( v4 == false ) {
	   v4 = true;
           cameraFn.startCam( handleCam4 );
       } else  {
          if ( e.altKey == true ) {
             greenScreenEngine.grabackground();
          } else {
	      if ( e.ctrlKey == true ) {
               
	      }
          }
       }
       bringContainerToFront(4);
   }
   if ( e.keyCode == 88 ) { // Reset to beginning - X
      resetWindows();
      starwarsShowing=false;
      starwarsmp3.pause();
    }
   if ( e.keyCode == 84 ) { // Timer/clock   - T
         timerCountdown.startClock();
         bringContainerToFront(8);
         snd.play();
	 starwarsShowing=false;
	 starwarsmp3.pause();
    }
    if ( e.keyCode == 66 ) { // Select Blank page - B
        var container = document.getElementById("container0");
	$("#innercontainer0").empty();
        starwarsmp3.pause();
 	if ( e.ctrlKey == true ) {
	    container.style.backgroundColor = "#ffffff";
	} else {
            if (e.altKey == true ) {
		container.style.backgroundColor = "#000";
                starwarsSelectMessage = true;
	    } else {
               container.style.backgroundColor = "#000";
	    }
	}
        bringContainerToFront(0);
    }
    if ( e.keyCode == 32 ) { // Pause/restart Movies 1..5
	//         bringContainerToFront(1);
         if ( starwarsShowing == true ) {
	    var container = document.getElementById("titlecontent");
    	    if ( container.style.webkitAnimationPlayState == "paused" ) {
                container.style.webkitAnimationPlayState = "running";
		starwarsmp3.play();
	    } else {
                container.style.webkitAnimationPlayState = "paused"
		starwarsmp3.pause();
            }
	 } else {
   	    var container = document.getElementById("innercontainer1");
            if ( container.paused == false ) {

	     //    document.getElementById("innercontainer0").style.animationPlayState = "paused";
               container.pause();
               container.paused = true;
            } else {
               container.paused = false;
               container.play();
            }
	 }
         currentfocus=1;
    }
    if ( e.keyCode == 73 ) { // Select   - I                                                                  
        internetSelectURL = true;
 	//	$("#innercontainer13").load("http://www.comp.nus.edu.sg/~hugh/index.html");
	//	$("#innercontainer13").html('<object data = "http://hughanderson.org/uploads/latestDYDX.html" width=\"100%\" height=\"100%\" left=\"5px\" top=\"5px\">');

	//bringContainerToFront(13);
     }
    if ( e.keyCode == 69 ) { // Select MaxHeadroom or mesh cam background effect - E
        if ( e.ctrlKey == true ) {
   	   animating = true;
	   if ( v3 == false ) {
	       v3 = true;
	       detectSpecs();
    	   }
	   bringContainerToFront(5);
	} else {
           if ( v9 == false ) {
	       v9 = true;
	       Max_onloadHandler();
	   }
	   bringContainerToFront(9);
	}
    }
    if ( e.keyCode == 65 ) { // Bring Mr Anderson the Avatar to front - A
	/*	if ( e.ctrlKey == true ) {
	    itsMrBlobby.mrblobbyhasapointer=false;
        } else {
            itsMrBlobby.mrblobbyhasapointer=true;
	    }*/
        itsMrBlobby.togglePointer();
        bringContainerToFront(14);
    }

    if ( e.keyCode == 48 ) { // Bring Movie to front - 0                                  
	bringContainerToFront(1);
	currentfocus=1;
	starwarsShowing=false;
	starwarsmp3.pause();
    }
    if ( e.keyCode == 89 ) { // Play a YES movie - Y or ctrl Y
	if ( e.ctrlKey == true ) {
	    playMovie( "../btlit/media/yesyes3.mp4" );
        } else {
            if ( e.altKey == true ) {
	       playMovie( "../btlit/media/yesyes2.mp4");
            } else {
               playMovie( "../btlit/media/yesyes1.mp4");
	    }
        }
	starwarsShowing=false;
	starwarsmp3.pause();
    }
    if ( e.keyCode == 87 ) { // Change inner width - w: shrink W: expand
        lastwidth = true;
        lastheight = false;
	if ( e.shiftKey == false ) {
   	   if ( currwidthscale[currentdiv] < maxscaleitems ) {
	      currwidthscale[currentdiv] = currwidthscale[currentdiv]+1;
   	   }
	} else {
	    if ( currwidthscale[currentdiv] >1 ) {
		currwidthscale[currentdiv] = currwidthscale[currentdiv]-1;
	    }
	}
	setDivSize(currentdiv);
	fixDiv(currentdiv,0,0);
    }
    if ( e.keyCode == 72 ) { // Change inner height - H
        lastheight = true;
        lastwidth = false;
        if ( e.shiftKey == false ) {
	    if ( currheightscale[currentdiv] < maxscaleitems ) {
		currheightscale[currentdiv] = currheightscale[currentdiv]+1;
	    }
        } else {
            if ( currheightscale[currentdiv] >1 ) {
                currheightscale[currentdiv] = currheightscale[currentdiv]-1;
            }
        }
        setDivSize(currentdiv);
        fixDiv(currentdiv,0,0);
    }
    

    if ( e.keyCode == 81 ) { // Do a question... Q
        if ( e.ctrlKey == true ) {
	    quizzing = true;
	   //	   document.getElementById('canvasForQuiz').focus();
           bringContainerToFront(11);
	   quiz.Quiz_drawQuestion( quiz.currentQ,0 );
	   starwarsShowing=false;
	   starwarsmp3.pause();
        } else {
	    dataval="http://hugh.comp.nus.edu.sg/cs2107/Askbox/AskboxADM.php";
            $("#innercontainer13").html('<object data=\"' + dataval + '\" width=\"100%\" height=\"100%\" left=\"5px\" top=\"5px\">');
            bringContainerToFront(13);
            starwarsmp3.pause();
	}
    }

    //    if ( e.keyCode == 81 ) { // Play a "Good Question" movie - Q or ctrl Q                                                                       
    //        if ( e.ctrlKey == true ) {
    //      playMovie( "../btlit/media/illbeback.mp4" );
    //  } else {
    //      playMovie( "../btlit/media/goodquestion.mp4");
    //  }
    //}
    if ( internetSelectURL == true ) {
	if ( e.keyCode >= 49 && e.keyCode < 49+numberOfURLs ) { // Select Messages 1..n 
            dataval=sessionURLs[e.keyCode-49];
	    internetSelectURL = false;
	    $("#innercontainer13").html('<object data=\"' + dataval + '\" width=\"100%\" height=\"100%\" left=\"5px\" top=\"5px\">');
	    bringContainerToFront(13);      
	    starwarsmp3.pause();
	}
    } else {
       if ( starwarsSelectMessage == true ) {
	   if ( e.keyCode >= 49 && e.keyCode < 49+numberOfMessages ) { // Select Messages 1..n                               
                $("#innercontainer0").load(starwarsmessages[e.keyCode-49]);
                starwarsmp3.currentTime = 0;
		starwarsSelectMessage = false;
                starwarsShowing = true;
                starwarsmp3.play();
	   }
       } else {
            if ( e.ctrlKey == false ) {
	       if ( e.keyCode >= 49 && e.keyCode < 49+numberOfVideos ) { // Select Movies 1..n  
		   starwarsmp3.pause();
		   //setTimeout(function() { 
                   playMovie( videos[e.keyCode-49] );
		   //},1000);
		   starwarsShowing=false;
	       }
            } else {
              if ( e.keyCode >= 49 && e.keyCode < 49+numberOfMemeVideos ) { // Select Movies 1..n
	     	starwarsmp3.pause();
 	        playMovie( memeVideos[e.keyCode-49] );
	        starwarsShowing=false;
	      }
	    }
       }
    }
    if ( e.keyCode == 79 ) { // Select the Overlay drawing canvas - O
        if ( v10 == false ) {
	    drawinit();
            v10 = true;
	}
        drawerase();
        bringContainerToFront(10);
    }

    if ( e.keyCode == 80 ) { // Select PDF - P
	// 	 tmp = document.getElementById( "innercontainer3" );
	//ln1 = tmp.data.length;
         if ( e.ctrlKey == false ) {
	     bringContainerToFront(3);
	     currentfocus=3;
	     starwarsShowing=false;
	     starwarsmp3.pause();
	     //	     ln2 = mainPDF.length;
             //if ( tmp.data.substring(ln1-ln2) != mainPDF ) {
   	     //   tmp.data = mainPDF;
	     // }
	 } else {
	     bringContainerToFront(12);
	     currentfocus=12;
	     starwarsShowing=false;
	     starwarsmp3.pause();

	     //             ln2 = secondaryPDF.length;
             //if ( tmp.data.substring(ln1-ln2) != secondaryPDF ) {
	     //   tmp.data = secondaryPDF;
	     // }
	 }
	 //         bringContainerToFront(3);
         //currentfocus=3;
	 //starwarsShowing=false;
	 //starwarsmp3.pause();
    }
    if ( e.keyCode == 83 ) { // Select Subtitles - S
         bringContainerToFront(2);
	 starwarsShowing=false;
	 starwarsmp3.pause();
    }
    if ( e.keyCode == 77 ) { // Select Middle - M
        if ( e.ctrlKey == false ) {
           stickmiddle[currentdiv] = true;
           stickleft[currentdiv]=false;
           stickright[currentdiv]=false;
           sticktop[currentdiv]=false;
           stickbottom[currentdiv]=false;
	} else {
	    if ( lastwidth == true && (( currentdiv == 6) || (currentdiv == 7 )) ) {
		var container = document.getElementById("container"+currentdiv);
		var innerwid = parseInt(container.style.width);
                var wid = innerwid*scale[currwidthscale[currentdiv]];
                leftinneridx[currentdiv] = ((wid-innerwid)/2)*scale[currwidthscale[currentdiv]];
		//		alert( "Divider,div,wid,innerwidth,Left is "+scale[currwidthscale[currentdiv]]+","+currentdiv+","+wid+","+innerwid+","+leftinneridx[currentdiv]);
	    }
            if ( lastheight == true && (( currentdiv == 6) || (currentdiv == 7 )) ) {
                var container = document.getElementById("container"+currentdiv);
                var innerhite = parseInt(container.style.height);
                var hite = innerhite*scale[currheightscale[currentdiv]];
                topinneridx[currentdiv] = (hite-innerhite)/2;
		//				alert( "Top is "+topinneridx[currentdiv]);
             }
	}
	fixDiv(currentdiv,0,0);
     }
    if ( e.keyCode == 76 ) { // Move current item to left
        if ( e.ctrlKey == true ) {
	    if ( leftinneridx[currentdiv]>0 && (( currentdiv == 6) || (currentdiv == 7 )) ) {
		leftinneridx[currentdiv] = leftinneridx[currentdiv]-1;
	    }
	} else {
           stickmiddle[currentdiv] = false;
           stickright[currentdiv] = false;
	} 
        fixDiv(currentdiv,-8,0);
    }
    if ( e.keyCode == 82 ) { // Move current item to right
        if ( e.ctrlKey == true ) {
            if ( ( currentdiv == 6) || (currentdiv == 7 ) ) {
                leftinneridx[currentdiv] = leftinneridx[currentdiv]+1;
            }
        } else {
	    stickmiddle[currentdiv] = false;
            stickleft[currentdiv] = false;
	}
        fixDiv(currentdiv,8,0);
    }
    if ( e.keyCode == 85 ) { // Move current item up
	if ( e.ctrlKey == true ) {
            if ( topinneridx[currentdiv]>0 && (( currentdiv == 6) || (currentdiv == 7 )) ) {
                topinneridx[currentdiv] = topinneridx[currentdiv]-1;
            }
        } else {
            stickmiddle[currentdiv] = false;
	    stickbottom[currentdiv]=false;
	}
        fixDiv(currentdiv,0,-8);
    }
    if ( e.keyCode == 68 ) { // Move current item down
        if ( e.ctrlKey == true ) {
            if ( ( currentdiv == 6) || (currentdiv == 7 ) ) {
                topinneridx[currentdiv] = topinneridx[currentdiv]+1;
            }
        } else {
            stickmiddle[currentdiv] = false;
	    sticktop[currentdiv]=false;
	}
        fixDiv(currentdiv,0,8);
    }

    if ( e.keyCode == 189 ) { // Make current item smaller - -
	if ( e.ctrlKey == true ) {
          if ( currscale[currentdiv] < maxscaleitems ) {
             currscale[currentdiv] = currscale[currentdiv]+1;
          }
          setDivSize(currentdiv);
          fixDiv(currentdiv,0,0);
	}
    }
    if ( e.keyCode == 187 ) { // Make current item larger - +
       if ( e.ctrlKey == true ) {
          if ( currscale[currentdiv] > 1 ) {
             currscale[currentdiv] = currscale[currentdiv]-1;
          }
          setDivSize(currentdiv);
          fixDiv(currentdiv,0,0);
       }
    }
    }
}

function fixDiv(dv,lr,ud) {
   var container = document.getElementById("container"+dv);
   var left = parseInt(container.style.left);
   var wid = parseInt(container.style.width);
   var top = parseInt(container.style.top);
   var hite = parseInt(container.style.height);
   left = left+lr;
   if ( left < 0 ) { left = 0; stickleft[dv] = true; }
   if (left+wid+10 > widt ) { 
      stickright[dv]=true;
      left = widt-wid-10; 
   }
   if ( left < 0 ) { left = 0; stickleft[dv] = true; }
   top = top+ud;
   if ( top <= 0 ) { top = 0; sticktop[dv] = true; }
   if ( top+hite+10 > heit ) { 
       stickbottom[dv] = true;
      top = heit-hite-10; 
   }
   if ( top <= 0 ) { top = 0; sticktop[dv] = true; }
   if ( currscale[dv] == 1 ) {
       top = 0;
       left = 0;
   } else {
      if (stickleft[dv]==true) { left = 0; }
      if (sticktop[dv]==true) { top = 0; }
      if (stickright[dv]==true) { left = widt-wid-10; }
      if (stickbottom[dv]==true) { top = heit-hite-10; }
   }
   if ( stickmiddle[dv] && currscale[dv]!=1 ) {
       left = ( widt-wid )/2;
       top  = ( heit-hite )/2;
   }
   container.style.left = left+"px";
   leftidx[dv] = left;
   container.style.top = top+"px";
   topidx[dv] = top;
}


function handleCam1(stream) {
    cam1.src = window.URL.createObjectURL(stream);
    video = document.getElementById("innercontainer6video");
    canvas = document.getElementById("innercontainer6");
    fc = new frameConverter(video,canvas,6);
}
 
function handleCam2(stream) {
    cam2.src = window.URL.createObjectURL(stream);
    video = document.getElementById("innercontainer7video");
    canvas = document.getElementById("innercontainer7");
    fc = new frameConverter(video,canvas,7);
}

function handleCam4(stream) {
    cam4.src = window.URL.createObjectURL(stream);
}
 
function videoError(e) {
    // do something
} 

var snd = new Audio("../btlit/media/24.ogg"); // buffers automatically when created
//snd.play();
var starwarsmp3 = new Audio("../btlit/StarWars/starwars.mp3");
 
window.setInterval('refocus()', 100);
  
function refocus() {
    var container = document.getElementById("innercontainer"+currentfocus);
    container.contentEditable=true;
    container.focus();
}

var ev = new CustomEvent('resize'); //instantiate the resize event
ev.initEvent('resize');

document.body.dispatchEvent(ev); // fire 'resize' event!
