 

tmp = document.getElementById( "innercontainer3" );
tmp.data = mainPDF;
tmp = document.getElementById( "innercontainer12" );
tmp.data = secondaryPDF;
 
var scale = new Array(1,1,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,2,2.5,3,4,5,6,7,8,9,10,11,12,13,14,15);
var maxscaleitems = 24;
var currscale = new Array(1,1,1,1,1,1,13,2,1,1,1,2,1,1,1);
var leftidx = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
var topidx = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
var leftinneridx = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
var topinneridx = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

var border = new Array( false,true,false,true,false,false,true,true,false,true,true,true,true,true,true);
var snd = new Audio("../media/24.ogg"); // buffers automatically when created

var currwidthscale = new Array(1,1,1,1,1,1,10,1,1,1,1,1,1,1,1);
var currheightscale = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);


var stickmiddle = new Array(false,true,false,true,true,true,false,true,false,true,true,true,true,true,false);
var stickleft = new Array(false,false,false,false,false,false,true,false,false,false,false,false,false,false,false);
var stickright = new Array(false,false,false,false,false,false,false,false,false,false,false,false,false,false,false);
var sticktop = new Array(false,false,false,false,false,false,true,false,false,false,false,false,false,false,false);
var stickbottom = new Array(false,false,false,false,false,false,false,false,false,false,false,false,false,false,false);

var numberofwindows=14;
