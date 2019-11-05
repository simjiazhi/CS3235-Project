
function makeRawDiv( ihtml ) {
    var div = document.createElement("div");
    div.innerHTML = ihtml;
    document.body.appendChild(div);
    return div;
}

function makeIdDiv( ident ) {
    var div = document.createElement("div");
    div.id = ident;
    document.body.appendChild(div);
    return div;
}

function makeRawCenter( ) {
    var div = document.createElement("center");
    document.body.appendChild(div);
    return div;
}

function makeHiddenDiv( ihtml ) {
    var div = document.createElement("div");
    div.hidden = true;
    div.innerHTML = ihtml;
    document.body.appendChild(div);
    return div;
}

function makeDiv( ident,widt,hgt,brd,z,ihtml,inviz ) {
    var div = document.createElement("div");
    div.id=ident;
    if (inviz) { div.style.visibility = 'hidden'; }
    div.style.position = "absolute";
    div.style.width = widt;
    div.style.height = hgt;
    div.style.border = brd;
    div.innerHTML = ihtml;
    if (z!=0) { div.style.zIndex = z; }
    document.body.appendChild(div);
    return div;
}

function makeDivNoZ( ident,widt,hgt,brd,ihtml,inviz,tp,lft ) {
    var div = document.createElement("div");
    div.id=ident;
    if (inviz) { div.style.visibility = 'hidden'; }
    div.style.position = "absolute";
    if (tp!=0) { div.style.top = tp + "%"; }
    if (lft!=0) { div.style.left = lft + "%"; }
    if (widt!=0) { div.style.width = widt; }
    if (hgt!=0)  { div.style.height = hgt; }
    div.style.border = brd;
    div.innerHTML = ihtml;
    document.body.appendChild(div);
    return div;
}

function makeObject( ident,widt,hgt,brd,typ,dat ) {
    var div = document.createElement("object");
    div.id=ident;
    div.style.position = "absolute";
    div.style.width = widt;
    div.style.height = hgt;
    div.style.border = brd;
    div.type = typ;
    div.data = "";
    document.body.appendChild(div);
    return div;
}

function makeVideo( ident,src,widt,hgt,brd,ctrl,tabs,oncan,sty ) {
    var div = document.createElement("video");
    div.id=ident;
    div.style.src = src;
    div.controls = false; //ctrl;
    div.tabindex = tabs;
    if (oncan!=0) { div.addEventListener("canplay", function() {
		setup(); },false); };
    if (sty!=0)   { div.style = sty; }
    div.width = widt;
    div.height = hgt;
    div.style.backgroundColor = "#111";
    div.autoplay = true;
    document.body.appendChild(div);
    return div;
}

function makeCanvas( ident,widt,hgt,sty,abs,nodisp ) {
    var div = document.createElement("canvas");
    div.id=ident;
    if (widt!==0) { div.width = widt; div.style.width = widt + "px"; }
    if (hgt!==0)  { div.height = hgt; div.style.height = hgt + "px"; }
    div.style.style = sty;
    if (abs) { div.style.position = 'absolute'; }
    if (nodisp) { div.style.display = 'none'; }
    document.body.appendChild(div);
    return div;
}

// This is an overlay, which puts a div above EVERYTHING, and is used
// to inject in ketpress/keydown events

//var d = makeDiv( "overlay0","100%","100%",0,10000,"",true );
//var e = makeDivNoZ( "inneroverlay0","100%","100%",0,"",true,0,0 );
//d.appendChild(e);

// THis is the blank page div, used for blank pages...

var d = makeDiv( "container0","100%","100%",0,0,"",false );
var e = makeDivNoZ( "innercontainer0","100%","100%",0,"",false,0,0 );
d.appendChild(e);

// This is the video display div, which is used for all videos

var d = makeDiv( "container1","100%","100%","5px #111 solid",0,"",false );
var e = makeVideo( "innercontainer1","","100%","100%",0,true,0,0,0 );
d.appendChild(e);

// THis is the subtitles menu/display

var d = makeDiv( "container2","100%","100%",0,0,"",false );
var e = makeDivNoZ( "innercontainer2","100%","100%",0,"<center> <button id=\"start_button\" onclick=\"startButton(event)\"><img alt=\"Start\" id=\"start_img\" src=\"../btlit/media/mic.gif\"></button><textarea id=\"myTextArea\" rows=\"1\" cols=\"100\">Subtitles?</textarea></center>",false,0,0 );
d.appendChild(e);

// WTHis is the div for the main PDF

var d = makeDiv( "container3",(window.innerWidth-10)+"px",(window.innerHeight-10)+"px","5px #111 solid",0,"",false );
var e = makeObject("innercontainer3",(window.innerWidth-10)+"px",(window.innerHeight-10)+"px",0,"application/pdf","");
d.appendChild(e);

// What is this for? I dont know, but if removed I get errors with voicereg...

makeHiddenDiv( "<center><setopic id=\"select_language\" onchange=\"updateCountry()\"></select>&nbsp;&nbsp;<select id=\"select_dialect\"></select></center>" );

// This is the div used for the GREEN SCREEN overlay

var d = makeDiv( "container4","100%","100%","",4,"",false );
var e = makeHiddenDiv( "" );
var c = makeCanvas( "canvasFor4","640","480","",false,false );
e.appendChild(c);
d.appendChild(e);
var e = makeHiddenDiv( "" );
var c = makeVideo( "green-scree","src","640","480",0,true,0,"function() { setup(); }","xdisplay:none;" );
e.appendChild(c);
d.appendChild(e);
var e = makeHiddenDiv( "" );
var c = makeCanvas( "canvas-processor","640","480","xdisplay:none",true,false );
e.appendChild(c);
d.appendChild(e);
var e = makeCanvas( "innercontainer4",0,0,"",true,false );
e.style.width = "100%";
e.style.height = "100%";
d.appendChild(e);

// This is the MAX headroom div

var d = makeDiv( "container5","100%","100%","",4,"",false );
var e = makeIdDiv( "innercontainer5" );
d.appendChild(e);

// THis is the div for the small camera "C"

var d = makeDiv( "container6","100%","100%","5px #111 solid",0,"",false );
var e = makeDivNoZ( "hidden6a","100%","100%",0,"",true,0,0 );
var c = makeVideo( "innercontainer6video","src","100%","100%",0,true,0,0,0 );
e.appendChild(c);
d.appendChild(e);
var e = makeDivNoZ( "visible6b","100%","100%",0,"",false,0,0 );
var c = makeCanvas( "innercontainer6","640","480","",false,false );
e.appendChild(c);
d.appendChild(e);

// THis is the div for the Visualizer camera

var d = makeDiv( "container7","100%","100%","5px #111 solid",0,"",false );
var e = makeHiddenDiv("");
var c = makeVideo( "innercontainer7video","src","640","480",0,true,0,0,0 );
e.appendChild(c);
d.appendChild(e);
var e = makeRawDiv("");
var c = makeCanvas( "tmpCanvas","640","480","",true,false );
e.appendChild(c);
var c = makeCanvas( "camCanvas","640","480","",true,true );
e.appendChild(c);
var c = makeCanvas( "innercontainer7","640","480","",true,false );
e.appendChild(c);
d.appendChild(e);

// THis is for the timer/countdown clock...

var d = makeDiv( "container8","100%","100%",0,0,"",false );
var e = makeRawCenter();
var c = makeDivNoZ( "innercontainer8",0,0,0,"",false,40,35 );
var b = makeCanvas( "display","260","140","",false,false );
c.appendChild(b);
e.appendChild(c);
d.appendChild(e);

// What is this for?                                                                                          
var d = makeDiv( "container9","100%","100%","5px #111 solid",0,"",false );
var e = makeCanvas( "innercontainer9",0,0,"",false,false );
d.appendChild(e);

// THis is the overlay drawing

var d = makeDiv( "container10","100%","100%",0,0,"",false );
var e = makeCanvas( "innercontainer10","1000","800","",false,false );
d.appendChild(e);

// THis is the Askbox ADM page

var d = makeDiv( "container11","100%","100%",0,0,"",false );
var e = makeDivNoZ( "innercontainer11","100%","100%",0,"",false,0,0 );
var c = makeCanvas( "canvasForQuiz",(window.innerWidth/1.1)-10,(window.innerHeight/1.1)-10,"",false,false );
d.style.margin = "5px";
e.appendChild(c);
d.appendChild(e);

// THis si the seondary PDF

var d = makeDiv( "container12",(window.innerWidth-10)+"px",(window.innerHeight-10)+"px","5px #111 solid",0,"");
var e = makeObject("innercontainer12",(window.innerWidth-10)+"px",(window.innerHeight-10)+"px",0,"application/pdf","");
d.appendChild(e);

// THis is the div for internet URLS

var d = makeDiv( "container13","100%","100%","5px #111 solid",0,"",false );
d.style.backgroundColor = "#dddddd";
var e = makeDivNoZ( "innercontainer13","100%","100%",0,"",0,0 );
e.style.backgroundColor = "#dddddd";
d.appendChild(e);

// THis is the div for the questionnaire

makeDiv( "invisiblecontainer","100%","100%",0,0,"" );

// What is this for?                                                                                          
makeDiv( "title","100%","100%",0,0,"WebCamMesh<span class=\"openBtn\"></span>" );                

// What is this for?                                                                                          
makeDiv( "prompt","100%","100%",0,0,"" );

// What is this for?                                                                                          
makeDiv( "info","100%","100%",0,0,"<span class=\"closeBtn\"></span><p class=\"fps\"></p>");

// THis is the div for Mr Blobby

var d = makeDiv( "container14","100%","100%",0,0,"" );
var e = makeDiv( "connect","100%","100%",0,1,"<form method=\"post\" action=\"\"><div class=\"text\"><label for=\"ip\">IP:</label><input type=\"text\" id=\"ip\" name=\"ip\" value=\"127.0.0.1\" class=\"text\" /></div><div class=\"text\"><label for=\"port\">Port:</label><input type=\"text\" id=\"port\" name=\"port\" value=\"1234\" class=\"text\" /></div><div class=\"submit\"><input type=\"submit\" value=\"connect\" class=\"submit\" /></div></form>",false );
d.appendChild(e);
var e = makeDivNoZ( "innercontainer14","100%","100%",0,"",0,0 );
d.appendChild(e);




