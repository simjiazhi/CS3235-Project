var quiz = (function() {
        var my = {};

	//var vala=valb=valc=vald=0;

function showPoll(x,y,txt,size,tot) {
    var Quiz_mycanvas = document.getElementById( "canvasForQuiz" );
    var Quiz_ctx=Quiz_mycanvas.getContext("2d");
    Quiz_ctx.strokeStyle = 'deepskyblue';
    Quiz_ctx.stroke();
    Quiz_ctx.font="20px Arial";
    Quiz_ctx.fillStyle = 'white';
    Quiz_ctx.fillText(txt,x,y);
    Quiz_ctx.fillStyle = 'deepskyblue';
    Quiz_ctx.lineWidth = 3;
    Quiz_ctx.beginPath();
    Quiz_ctx.moveTo(x,y-25);
    Quiz_ctx.lineTo(x+20,y-25);
    Quiz_ctx.lineTo(x+20,y-25-((size*200)/tot));
    Quiz_ctx.lineTo(x,y-25-((size*200)/tot));
    Quiz_ctx.lineTo(x,y-25);
    Quiz_ctx.closePath();
    Quiz_ctx.fill();
    Quiz_ctx.stroke();
    Quiz_ctx.fillStyle = 'white';
    Quiz_ctx.fillText(size,x+4,y-30);
}

function showPollResult(qid) {
    var Quiz_mycanvas = document.getElementById( "canvasForQuiz" );
    var Quiz_ctx=Quiz_mycanvas.getContext("2d");
    var fileref=document.createElement('script')
    fileref.setAttribute("type","text/javascript")
    fileref.setAttribute("src", baseURLforGettingPoll + qid + '.js?x=' + Math.floor(Math.random() * 200) )
    if (typeof fileref!="undefined")
	    document.getElementsByTagName("head")[0].appendChild(fileref)
    Quiz_ctx.strokeStyle = 'deepskyblue';
    Quiz_ctx.stroke();
    Quiz_ctx.fillStyle = 'black';
    Quiz_ctx.lineWidth = 3;
    Quiz_ctx.beginPath();
    Quiz_ctx.moveTo(10,260);
    Quiz_ctx.lineTo(190,260);
    Quiz_ctx.lineTo(190,10);
    Quiz_ctx.lineTo(10,10);
    Quiz_ctx.lineTo(10,260);
    Quiz_ctx.closePath();
    Quiz_ctx.fill();
    Quiz_ctx.strokeStyle = 'deepskyblue';
    Quiz_ctx.stroke();
    Quiz_ctx.lineWidth = 1;
    Quiz_ctx.strokeStyle = 'deepskyblue';
    Quiz_ctx.stroke();
    Quiz_ctx.beginPath();
    Quiz_ctx.moveTo(20,230);
    Quiz_ctx.lineTo(180,230);
    Quiz_ctx.lineTo(180,30);
    Quiz_ctx.lineTo(20,30);
    Quiz_ctx.lineTo(20,230);
    Quiz_ctx.lineTo(20,210);
    Quiz_ctx.lineTo(180,210);
    Quiz_ctx.lineTo(180,190);
    Quiz_ctx.lineTo(20,190);
    Quiz_ctx.lineTo(20,170);
    Quiz_ctx.lineTo(180,170);
    Quiz_ctx.lineTo(180,150);
    Quiz_ctx.lineTo(20,150);
    Quiz_ctx.lineTo(20,130);
    Quiz_ctx.lineTo(180,130);
    Quiz_ctx.lineTo(180,110);
    Quiz_ctx.lineTo(20,110);
    Quiz_ctx.lineTo(20,90);
    Quiz_ctx.lineTo(180,90);
    Quiz_ctx.lineTo(180,70);
    Quiz_ctx.lineTo(20,70);
    Quiz_ctx.lineTo(20,50);
    Quiz_ctx.lineTo(180,50);
    Quiz_ctx.lineTo(180,30);
    Quiz_ctx.lineTo(160,30);
    Quiz_ctx.lineTo(160,230);
    Quiz_ctx.lineTo(140,230);
    Quiz_ctx.lineTo(140,30);
    Quiz_ctx.lineTo(120,30);
    Quiz_ctx.lineTo(120,230);
    Quiz_ctx.lineTo(100,230);
    Quiz_ctx.lineTo(100,30);
    Quiz_ctx.lineTo(80,30);
    Quiz_ctx.lineTo(80,230);
    Quiz_ctx.lineTo(60,230);
    Quiz_ctx.lineTo(60,30);
    Quiz_ctx.lineTo(40,30);
    Quiz_ctx.lineTo(40,230);
    Quiz_ctx.lineTo(20,230);
    Quiz_ctx.closePath();
    //    Quiz_ctx.stroke();
    Quiz_ctx.fill();
    //    Quiz_ctx.strokeStyle = 'black';
    Quiz_ctx.stroke();



    tot=vala+valb+valc+vald+1;
    showPoll(30,250,"A",vala,tot);
    showPoll(70,250,"B",valb,tot);
    showPoll(110,250,"C",valc,tot);
    showPoll(150,250,"D",vald,tot);
}

function hidePollResult(qid) {
}

function Quiz_drawIt( q,txt1,lft,rght,y,l,r,w,bg,twolines,txt2 ) {
    var Quiz_mycanvas = document.getElementById( "canvasForQuiz" );
    var Quiz_ctx=Quiz_mycanvas.getContext("2d");
    Quiz_ctx.lineWidth = 3;
    Quiz_ctx.beginPath();
    Quiz_ctx.moveTo(lft,y);
    Quiz_ctx.lineTo(rght,y);
    Quiz_ctx.strokeStyle = 'deepskyblue';
    Quiz_ctx.stroke();
    Quiz_ctx.beginPath();
    Quiz_ctx.moveTo(lft+l,y);
    Quiz_ctx.lineTo(lft+l+10,y-w);
    Quiz_ctx.lineTo(rght-r-10,y-w);
    Quiz_ctx.lineTo(rght-r,y);
    Quiz_ctx.lineTo(rght-r-10,y+w);
    Quiz_ctx.lineTo(lft+l+10,y+w);
    Quiz_ctx.lineTo(lft+l,y);
    Quiz_ctx.closePath();
    Quiz_ctx.fillStyle = bg;
    Quiz_ctx.fill();
    Quiz_ctx.strokeStyle = 'deepskyblue';
    Quiz_ctx.stroke();
    Quiz_ctx.font="20px Arial";
    Quiz_ctx.fillStyle = 'salmon';
    Quiz_ctx.fillText(q,lft+l+20,y+6);
    Quiz_ctx.fillStyle = 'white';
    if ( twolines == true ) {
       Quiz_ctx.fillText(txt1,lft+l+50,y-6);
       Quiz_ctx.fillText(txt2,lft+l+50,y+18);
    } else {
       Quiz_ctx.fillText(txt1,lft+l+50,y+6);
    }
    if (l == 30) {
        Quiz_ctx.fillText(pollText,lft+l+200,y-50);
    }
}

my.currentQ = q0;
var currentQid = 0;


var sndwaiting = new Audio("../btlit/quizzes/media/mp3/auswahlrunde_loesung.mp3"); // buffers automatically when created                                         
var sndselect = new Audio("../btlit/quizzes/media/mp3/auswahlrunde_antwort_a.mp3"); // buffers automatically when created
var sndrightanswer = new Audio("../btlit/quizzes/media/mp3/richtig_stufe_2.mp3"); // buffers automatically when created                                         
var sndwronganswer = new Audio("../btlit/quizzes/media/mp3/falsch.mp3"); // buffers automatically when created                                                              

function Quiz_showFinalAnswer(q) {
    var Quiz_container = document.getElementById("innercontainer11");
    var Quiz_canvaswidt = parseInt(Quiz_container.style.width);
    var Quiz_canvasheit = parseInt(Quiz_container.style.height);
    var Quiz_qloc = Quiz_canvasheit-160;
    switch ( currentQ[5] )
	{
        case 1:
            Quiz_drawIt( "A:",q[1],0,Quiz_canvaswidt/2,Quiz_qloc+60,50,10,20,'lime',false,"");
            break;
        case 2:
            Quiz_drawIt( "B:",q[2],Quiz_canvaswidt/2,Quiz_canvaswidt,Quiz_qloc+60,10,50,20,'lime',false,"");
            break;
        case 3:
            Quiz_drawIt( "C:",q[3],0,Quiz_canvaswidt/2,Quiz_qloc+110,50,10,20,'lime',false,"");
            break;
        case 4:
            Quiz_drawIt( "D:",q[4],Quiz_canvaswidt/2,Quiz_canvaswidt,Quiz_qloc+110,10,50,20,'lime',false,"");
            break;
        default:
         case 1:
	}
}

my.Quiz_drawQuestion = function( q,numberofquestions) {
    var Quiz_mycanvas = document.getElementById( "canvasForQuiz" );
    var Quiz_ctx=Quiz_mycanvas.getContext("2d");
    Quiz_ctx.clearRect( 0,0,1279,767); 
    var Quiz_container = document.getElementById("innercontainer11");
    var Quiz_canvaswidt = parseInt(Quiz_container.style.width);
    var Quiz_canvasheit = parseInt(Quiz_container.style.height);
    var Quiz_qloc = Quiz_canvasheit-160;
    Quiz_drawIt( "",q[0],0,Quiz_canvaswidt,Quiz_qloc,30,30,30,'black',q[6],q[7]);
    Quiz_drawIt( "","",0,Quiz_canvaswidt/2,Quiz_qloc+60,50,10,20,'black',false,"");
    Quiz_drawIt( "","",Quiz_canvaswidt/2,Quiz_canvaswidt,Quiz_qloc+60,10,50,20,'black',false,"");
    Quiz_drawIt( "","",0,Quiz_canvaswidt/2,Quiz_qloc+110,50,10,20,'black');
    Quiz_drawIt( "","",Quiz_canvaswidt/2,Quiz_canvaswidt,Quiz_qloc+110,10,50,20,'black',false,"");
    switch(numberofquestions)
	{
	case 1:
	    Quiz_drawIt( "A:",q[1],0,Quiz_canvaswidt/2,Quiz_qloc+60,50,10,20,'black',false,"");
            break;
        case 2:
            Quiz_drawIt( "A:",q[1],0,Quiz_canvaswidt/2,Quiz_qloc+60,50,10,20,'black',false,"");
	    Quiz_drawIt( "B:",q[2],Quiz_canvaswidt/2,Quiz_canvaswidt,Quiz_qloc+60,10,50,20,'black',false,"");
            break;
        case 3:
            Quiz_drawIt( "A:",q[1],0,Quiz_canvaswidt/2,Quiz_qloc+60,50,10,20,'black',false,"");
            Quiz_drawIt( "B:",q[2],Quiz_canvaswidt/2,Quiz_canvaswidt,Quiz_qloc+60,10,50,20,'black',false,"");
	    Quiz_drawIt( "C:",q[3],0,Quiz_canvaswidt/2,Quiz_qloc+110,50,10,20,'black',false,"");
            break;
        case 4:
            Quiz_drawIt( "A:",q[1],0,Quiz_canvaswidt/2,Quiz_qloc+60,50,10,20,'black',false,"");
            Quiz_drawIt( "B:",q[2],Quiz_canvaswidt/2,Quiz_canvaswidt,Quiz_qloc+60,10,50,20,'black',false,"");
            Quiz_drawIt( "C:",q[3],0,Quiz_canvaswidt/2,Quiz_qloc+110,50,10,20,'black',false,"");
	    Quiz_drawIt( "D:",q[4],Quiz_canvaswidt/2,Quiz_canvaswidt,Quiz_qloc+110,10,50,20,'black',false,"");
            break;
        default:
	}
};

my.quizzing = false;
var Quiz_lockedIn = false;
var Quiz_nextNumIsQuestion = false;
var Quiz_contestantAnswer = 0;


my.Quiz_keypresshandler = function(e) {
    var Quiz_container = document.getElementById("innercontainer11");
    var Quiz_canvaswidt = parseInt(Quiz_container.style.width);
    var Quiz_canvasheit = parseInt(Quiz_container.style.height);
    var Quiz_qloc = Quiz_canvasheit-160;

    if ( e.keyCode == 86 ) { // Visualizer - V
	if ( e.ctrlKey == true ) {
	    visualizer.hideConfettiToggle();
	}
    }
    if ( e.keyCode == 80 ) { // Polling - P                                                                                                            
        if ( e.ctrlKey == true ) {
            hidePollResult(currentQid);
        } else {
             showPollResult(currentQid);

	}
    }
 
     if ( e.keyCode == 81 ) { // Draw just the question - q
	sndwaiting.pause();
        visualizer.hideConfetti();
        if ( Quiz_nextNumIsQuestion == false ) {
            Quiz_nextNumIsQuestion = true;
        } else {
	   Quiz_contestantAnswer = 0;
    	   my.Quiz_drawQuestion( currentQ,0 );
           sndwaiting.loop = true;
           sndwaiting.play();
        }
    }
    if ( e.keyCode >= 49 && e.keyCode < 49+Quiz_numberOfQuestions ) {
        if (Quiz_nextNumIsQuestion == true ) {
   	   currentQ = window[ "q"+(e.keyCode-48) ];
           currentQid = (e.keyCode-48);
	   Quiz_nextNumIsQuestion = false;
	   Quiz_contestantAnswer = 0;
           my.Quiz_drawQuestion( currentQ,0 );
           sndwaiting.loop = true;
           sndwaiting.play();
	   vala=valb=valc=vald=0;
	   // Next line updates the quiz question on a different server
	   qq = window[ "q"+(e.keyCode-48) ];
           $("#invisiblecontainer").html('<object data=\"' + baseURLforSettingPoll +
              (e.keyCode-48) + '&q=' + qq[0] + ' ' + qq[7] + '&l1=' + qq[1] + '&l2=' + qq[2] + '&l3=' + qq[3] + '&l4=' + qq[4] + '\">');

	}
    }
    if ( e.keyCode == 70 ) { // Final answer question - F
        sndwaiting.pause();
        if ( Quiz_contestantAnswer == currentQ[5] ) {
	    visualizer.showConfetti();
	    sndrightanswer.play();
	} else {
            sndwronganswer.play();
	}
        Quiz_showFinalAnswer(currentQ);
    }
    if ( e.keyCode == 76 ) { // Lock in a question - L
         Quiz_lockedIn = true;
    }
     if ( e.keyCode == 65 ) { // Draw the question with A
        if ( Quiz_lockedIn == true ) {
	    sndwaiting.pause();
	    sndselect.play();
	    Quiz_lockedIn = false;
	    Quiz_contestantAnswer = 1;
            Quiz_drawIt( "A:",currentQ[1],0,Quiz_canvaswidt/2,Quiz_qloc+60,50,10,20,'orange',false,"");
        } else {
	    my.Quiz_drawQuestion( currentQ,1 );
	}
    }
    if ( e.keyCode == 66 ) { // Draw the question with B
        if ( Quiz_lockedIn == true ) {
 	    sndwaiting.pause();
	     sndselect.play();
             Quiz_lockedIn = false;
	     Quiz_contestantAnswer = 2;
             Quiz_drawIt( "B:",currentQ[2],Quiz_canvaswidt/2,Quiz_canvaswidt,Quiz_qloc+60,10,50,20,'orange',false,"");
        } else {
	    my.Quiz_drawQuestion( currentQ,2 );
	}
    }
    if ( e.keyCode == 67 ) { // Draw the question with C
        if ( Quiz_lockedIn == true ) {
	    sndwaiting.pause();
	    sndselect.play();
            Quiz_lockedIn = false;
	    Quiz_contestantAnswer = 3;
            Quiz_drawIt( "C:",currentQ[3],0,Quiz_canvaswidt/2,Quiz_qloc+110,50,10,20,'orange',false,"");
        } else {
	    my.Quiz_drawQuestion( currentQ,3 );
	}
    }
    if ( e.keyCode == 68 ) { // Draw the question with D
        if ( Quiz_lockedIn == true ) {
	    sndwaiting.pause();
 	     sndselect.play();
             Quiz_lockedIn = false;
	     Quiz_contestantAnswer = 4;
             Quiz_drawIt( "D:",currentQ[4],Quiz_canvaswidt/2,Quiz_canvaswidt,Quiz_qloc+110,10,50,20,'orange',false,"");
        } else {
	    my.Quiz_drawQuestion( currentQ,4 );
	}
    }
    if ( e.keyCode == 32 ) {
	quizzing = false;
    }
};


	return my;

    }());

