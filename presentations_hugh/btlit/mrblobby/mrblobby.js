var itsMrBlobby = (function() {
    var my = {};

    var socket;
    var mrblobbyhasapointer = false;

    var container, stats;
    var camera, scene, renderer, group, particle;
    var mouseX = 0,
        mouseY = 0;

    var lines = [];
    var firsttime = true;
    var lastlineidx = 0;
    var skeletons = [];
    var skeletonGroups = {};
    var skeletonTrackingIDs = [];
    var datachanged = 0;
    var WIDTH = 640;
    var HEIGHT = 480;

    var PI2 = Math.PI * 2;
    var program = function(context) {
        context.beginPath();
        context.arc(0, 0, 1, 0, PI2, true);
        context.closePath();
        context.fill();
    };

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (function() {
            return window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
                    window.setTimeout(callback, 1000 / 10);
                };
        })();
    }

    $(document).ready(init);

    function init() {
        var i;
        $("#connect").show();
        $("#connect input[type=submit]").click(connectHandler);
        //three.js setup
        camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 1, 3000);
        camera.position.z = 1000;
        scene = new THREE.Scene();
        var pointLight =
            new THREE.PointLight(0xFFFFFF);
        // set its position
        pointLight.position.x = 2000;
        pointLight.position.y = 4000;
        pointLight.position.z = 2000;
        // add to the scene
        scene.add(pointLight);
        // put in the lines...
        for (i = 0; i < 15; i++) {
            var lineMaterial = new THREE.LineBasicMaterial({
                transparent: true,
                opacity: 0.3,
                color: 0x0000ff,
                linewidth: 4
            });
            var lineGeometry = new THREE.Geometry();
            lineGeometry.vertices.push(new THREE.Vector3(-10, 0, 0));
            lineGeometry.vertices.push(new THREE.Vector3(0, 10, 0));
            var line = new THREE.Line(lineGeometry, lineMaterial);
            lines[i] = line;
            scene.add(line);
        }
        lines[0].material.linewidth = 10;
        lines[0].material.opacity = 1;
        renderer = new THREE.WebGLRenderer({
            alpha: true
        });
	//	mrblobbyhasapointer = true;
        renderer.setSize(window.innerWidth, window.innerHeight);
        $("#innercontainer" + mrblobbyContainerID).append(renderer.domElement);

	    $("#innercontainer" + mrblobbyContainerID).children().css( "position", "absolute" );
        requestAnimationFrame(animateQQ);
    }

    my.togglePointer = function () {
	mrblobbyhasapointer = !mrblobbyhasapointer;
	if (mrblobbyhasapointer==true) {
	    lines[0].material.opacity=1;
	} else {
            lines[0].material.opacity=0;
	}
    };

    function connectHandler() {
        try {
            socket = new WebSocket("ws://" + $("#ip").val() + ":" + $("#port").val(), "dumb-increment-protocol");
            socket.onopen = socketOpenHandler;
            socket.onmessage = socketMessageHandler;
            socket.onclose = socketCloseHandler;
        } catch (exception) {
            alert("Error: " + exception);
        }
        return false;
    }

    function socketOpenHandler() {
        $("#connect").hide();
        $("#innercontainer" + mrblobbyContainerID).show();
    }

    function socketMessageHandler(msg) {

        var decoded = JSON.parse(msg.data);
        switch (decoded.command) {
            case "SKELETON_UPDATE":
                datachanged = 1;
                requestAnimationFrame(animateQQ);
                skeletons = decoded.data;
                break;
        }
    }

    function socketCloseHandler() {
        alert("close");
        $("#connect").show();
        $("#innercontainer" + mrblobbyContainerID).hide();
    }

    function rawLinkup(j, pointY, from) {
        lines[j].geometry.vertices[0] = pointY;
        lines[j].geometry.vertices[1].x = from.position.x;
        lines[j].geometry.vertices[1].y = from.position.y;
        lines[j].geometry.vertices[1].z = from.position.z;
        lines[j].geometry.verticesNeedUpdate = true;
    }


    function linkup(j, to, from) {
        var pointY = new THREE.Vector3(to.position.x, to.position.y, to.position.z);
        rawLinkup(j, pointY, from);
    }

    function animateQQ() {
        var i, j, skeleton;
        if (datachanged == 0) {
            requestAnimationFrame(animateQQ);
            return;
        }
        //remove the skeletons which are no longer there
        for (i = 0; i < skeletonTrackingIDs.length; i++) {
            var trackingID = skeletonTrackingIDs[i];
            var index = -1;
            for (j = 0; j < skeletons.length; j++) {
                if (skeletons[j].trackingID == trackingID) {
                    index = j;
                    break;
                }
            }
            if (index == -1) {
                scene.remove(skeletonGroups[trackingID].group);
                skeletonGroups[trackingID] = null;
            }
        }
        //reset the tracking IDs
        skeletonTrackingIDs = [];
        for (i = 0; i < skeletons.length; i++) {
            skeleton = skeletons[i];
            skeletonTrackingIDs.push(skeleton.trackingID);
            //get the skeleton group by it's tracking id
            if (skeletonGroups[skeleton.trackingID] == null) {
                skeletonGroups[skeleton.trackingID] = {};
                skeletonGroups[skeleton.trackingID].group = new THREE.Object3D();
                scene.add(skeletonGroups[skeleton.trackingID].group);
                skeletonGroups[skeleton.trackingID].particles = [];
                for (j = 0; j < skeleton.joints.length; j++) {
                    var path = "../btlit/mrblobby/textures/cube/pisa/";
                    var format = '.png';
                    var urls = [
                        path + 'px' + format, path + 'nx' + format,
                        path + 'py' + format, path + 'ny' + format,
                        path + 'pz' + format, path + 'nz' + format
                    ];

                    var textureCube = THREE.ImageUtils.loadTextureCube(urls);

                    var sphereMaterial = new THREE.MeshPhongMaterial({
                        transparent: true,
                        opacity: 0.3,
                        color: 0xffffff,
                        metal: true,
                        specular: 0xffffff,
                        envMap: textureCube,
                        shininess: 100
                    });
                    particle = new THREE.Mesh(new THREE.SphereGeometry(50, 32, 16), sphereMaterial);
                    particle.position.x = skeleton.joints[j].x * 2.5;
                    particle.position.y = skeleton.joints[j].y * 2.5;
                    particle.position.z = skeleton.joints[j].z * -1; // * -500;
                    particle.scale.x = particle.scale.y = 1;
                    skeletonGroups[skeleton.trackingID].particles.push(particle);
                    skeletonGroups[skeleton.trackingID].group.add(particle);
                }
            }

            var geometry = new THREE.Geometry();
            for (var j = 0; j < skeleton.joints.length; j++) {
                var joint = skeleton.joints[j];
                particle = skeletonGroups[skeleton.trackingID].particles[j];
                //add some easing to the particles, to smooth the transition to the new position
                particle.position.x += ((-joint.x * 2.5) - particle.position.x); // * .3;
                //particle.position.x -= 200;
                particle.position.y += ((-joint.y * 2.5) + 50 - particle.position.y); // * .3;
                particle.position.z += ((joint.z / 5 * -1) - particle.position.z); // * .3;
                particle.scale.x = particle.scale.y = 1;
		//                if (j==14) {
		//  console.log( "x,y,z = " + joint.x + "," + joint.y + "," + joint.z + ". With X,Y,Z = " + particle.position.x + "," + particle.position.y + "," + particle.position.x);
		//}
                if (j % 3 !== 0 && j !== 0) {
                    linkup(j, skeletonGroups[skeleton.trackingID].particles[j - 1], skeletonGroups[skeleton.trackingID].particles[j]);
                }
                if (j % 3 === 0 && j !== 0) {
                    linkup(j, skeletonGroups[skeleton.trackingID].particles[Math.floor(j / 7) + 1], skeletonGroups[skeleton.trackingID].particles[j]);
                }
                if (j === 0) {
                    if (mrblobbyhasapointer == true) {
                        var x1 = skeletonGroups[skeleton.trackingID].particles[4].position.x;
                        var y1 = skeletonGroups[skeleton.trackingID].particles[4].position.y;
                        var z1 = skeletonGroups[skeleton.trackingID].particles[4].position.z;
                        var x2 = skeletonGroups[skeleton.trackingID].particles[5].position.x;
                        var y2 = skeletonGroups[skeleton.trackingID].particles[5].position.y;
                        var z2 = skeletonGroups[skeleton.trackingID].particles[5].position.z;
                        var pointerEnd = new THREE.Vector3(x2 + ((x2 - x1) * 4.5), y2 + ((y2 - y1) * 4.5), z2 + ((z2 - z1) * 4.5));
                        rawLinkup(j, pointerEnd, skeletonGroups[skeleton.trackingID].particles[5]);
                    }
                }
            }
        }
        datachanged = 0;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
        requestAnimationFrame(animateQQ);
    }

    return my;

    }());

