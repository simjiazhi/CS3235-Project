
// bind to window onload event
//window.addEventListener('load', onloadHandler, false);

var bitmaps = [];

function Max_onloadHandler()
{
    //    alert("In maxheadroom load handler");
   // get the images loading
   bitmaps.push(new Image());
   var loader = new Preloader();
   loader.addImage(bitmaps[0], '../3d/images/House.png');
   loader.onLoadCallback(Max_init);
}

function Max_init()
{
    //    alert("In Max init");
   // get the canvas DOM element
   var canvas = document.getElementById('innercontainer9');
   
   // bind a K3D Controller object to the canvas
   // - it is responsible for managing the K3D objects displayed within it
   var k3d = new K3D.RequestAnimController(canvas);
   
   // create a K3D object for rendering
   var obj = new K3D.K3DObject();
   obj.textures.push(bitmaps[0]);
   with (obj)
   {
      drawmode = "solid";     // one of "point", "wireframe", "solid"
      shademode = "plain";    // one of "plain", "depthcue", "lightsource" (solid drawing mode only)
      addtheta = addgamma = 0.3;
      scale = 150;
      init(
         // describe the points of a simple unit cube
         [{x:-1,y:1,z:-1}, {x:1,y:1,z:-1}, {x:1,y:-1,z:-1}, {x:-1,y:-1,z:-1}, {x:-1,y:1,z:1}, {x:1,y:1,z:1}, {x:1,y:-1,z:1}, {x:-1,y:-1,z:1}],
         // describe the edges of the cube
         [{a:0,b:1}, {a:1,b:2}, {a:2,b:3}, {a:3,b:0}, {a:4,b:5}, {a:5,b:6}, {a:6,b:7}, {a:7,b:4}, {a:0,b:4}, {a:1,b:5}, {a:2,b:6}, {a:3,b:7}],
         // describe the polygon faces of the cube
         [{color:[255,0,0],vertices:[0,1,2,3],texture:0},{color:[0,255,0],vertices:[0,4,5,1],texture:0},{color:[0,0,255],vertices:[1,5,6,2],texture:0},{color:[255,255,0],vertices:[2,6,7,3],texture:0},{color:[0,255,255],vertices:[3,7,4,0],texture:0},{color:[255,0,255],vertices:[7,6,5,4],texture:0}]
      );
   }
   
   // add the object to the controller
   k3d.addK3DObject(obj);
   
   // begin the rendering and animation immediately
   k3d.paused = false;
   k3d.frame();
}

