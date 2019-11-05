var cameraFn = (function() {
   var my = {};

   my.startCam = function( cm ) {
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
      if (navigator.getUserMedia) {
         navigator.getUserMedia({video: true}, cm, videoError);
      }
   };
   return my;
}());

