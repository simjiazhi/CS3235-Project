 
//var drawcanvas, drawctx, 
var drawflag = false,
    drawprevX = 0,
    drawcurrX = 0,
    drawprevY = 0,
    drawcurrY = 0,
    drawdot_flag = false;

var drawx = "red",
    drawy = 2;

function drawinit() {
    container = document.getElementById('container10');
    drawcanvas = document.getElementById('innercontainer10');
    drawcanvas.width = parseInt(container.style.width);
    drawcanvas.height = parseInt(container.style.height);
    drawctx = drawcanvas.getContext("2d");

    //    w = drawcanvas.width;
    //h = drawcanvas.height;

    drawcanvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    drawcanvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    drawcanvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    drawcanvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}

function color(obj) {
    switch (obj.id) {
        case "green":
            drawx = "green";
            break;
        case "blue":
            drawx = "blue";
            break;
        case "red":
            drawx = "red";
            break;
        case "yellow":
            drawx = "yellow";
            break;
        case "orange":
            drawx = "orange";
            break;
        case "black":
            drawx = "black";
            break;
        case "white":
            drawx = "white";
            break;
    }
    if (drawx == "white") drawy = 14;
    else drawy = 2;

}

function draw() {
    drawcanvas = document.getElementById('innercontainer10');
    drawctx = drawcanvas.getContext("2d");
    drawctx.beginPath();
    drawctx.moveTo(drawprevX, drawprevY);
    drawctx.lineTo(drawcurrX, drawcurrY);
    drawctx.strokeStyle = drawx;
    drawctx.lineWidth = drawy;
    drawctx.stroke();
    drawctx.closePath();
}

function drawerase() {
    container = document.getElementById('container10');
    drawcanvas = document.getElementById('innercontainer10');
    drawcanvas.width = parseInt(container.style.width);
    drawcanvas.height = parseInt(container.style.height);
    drawctx = drawcanvas.getContext("2d");
    drawctx.clearRect(0, 0, drawcanvas.width, drawcanvas.height);
}


function findxy(res, e) {
    drawcanvas = document.getElementById('innercontainer10');
    drawctx = drawcanvas.getContext("2d");
    if (res == 'down') {
        drawprevX = drawcurrX;
        drawprevY = drawcurrY;
        drawcurrX = e.clientX; // - drawcanvas.offsetLeft;
        drawcurrY = e.clientY; // - drawcanvas.offsetTop;

        drawflag = true;
        drawdot_flag = true;
        if (drawdot_flag) {
            drawctx.beginPath();
            drawctx.fillStyle = drawx;
            drawctx.fillRect(drawcurrX, drawcurrY, 2, 2);
            drawctx.closePath();
            drawdot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        drawflag = false;
    }
    if (res == 'move') {
        if (drawflag) {
            drawprevX = drawcurrX;
            drawprevY = drawcurrY;
            drawcurrX = e.clientX; // - drawcanvas.offsetLeft;
            drawcurrY = e.clientY; // - drawcanvas.offsetTop;
            draw();
        }
    }
}
