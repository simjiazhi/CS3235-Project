<html>

<head>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.5.0/js/md5.min.js"></script>

	<title>Interface</title>
	<style>
		.overlay {
			position: fixed;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			z-index: 10;
		}
	  
		.popup {
			position: fixed;
			bottom: 50;
			left: 10;
			z-index: 30;
			border: 2px solid black;
			padding: 10px;

		}

		.question {
			background-color: #d6543a;
		}
		.quiz {
			background-color: #89c0f0;				
		}
		.quizBox {
			margin-bottom: 0;
		}
		.quizInput {
			margin-bottom: 12px;
		}
	  
		div.sticky {
			position: -webkit-sticky; /* Safari */
			position: sticky;
			position: fixed;
			bottom: 10;
			left: 10;
			z-index: 20;
		}
		
		.close {
            color: #aaaaaa;
            float: right;
            font-weight: bold;
        }
		
		textarea {
		  resize: none;
		  margin-left = 10;
		  margin-right = 10;
		}
	  
	</style>
	
</head>

<body>

	<div class = "overlay">
		<embed src="Lect5Comms.pdf" type="application/pdf" width="100%" height="100%" />
	</div>

	<div class = "sticky">
			
		<Button onClick = "toggleQuestionPanel();">Ask Question</button>
		<Button onClick = "toggleQuizPanel();">Quiz</button>
	</div>
	
	<!-- need prevent sql injection here -->
	
	<div class = "popup question" id = "askQn" style = "display: none">
		<button class = "close" onClick = "closeQuestion();">x</button>
		<p><b>Ask a question:</b></p>
		<textarea rows="4" cols="50" maxlength="200"></textarea>
		<br>
		<br>
		<button class = "close">Submit</button>
		
		
	</div>

	<div class = "popup quiz" id = "enterQuiz" style = "display: none">
	    <button class = "close" onClick = "closeQuizPanel();">x</button>
	    <form id="quizForm" class="quizBox" method="post">
	    	<p><b>Enter quiz code:</b></p>
	        <input type="text" class="quizInput" name="quizCode">
	        <input type="submit" value="Join Quiz Now!">
	    </form>

	</div>

</body>
<script type='text/javascript'>

	var isQuestionPanelOpen = false;
	var isQuizPanelOpen = false;
	function toggleQuestionPanel() {
		var askPanel = document.getElementById("askQn");
		isQuestionPanelOpen = !isQuestionPanelOpen;
		if (isQuestionPanelOpen) {
			if (isQuizPanelOpen) {
				toggleQuizPanel()				
			}
			askPanel.style.display = "block";
		} else {
			askPanel.style.display = "none";
		}
	}
	
	function closeQuestion() {
		var askPanel = document.getElementById("askQn");	
		askPanel.style.display = "none";
	}

	function toggleQuizPanel() {
		var quizPanel = document.getElementById("enterQuiz");
		isQuizPanelOpen = !isQuizPanelOpen;
		if (isQuizPanelOpen) {
			if (isQuestionPanelOpen) {
				toggleQuestionPanel()				
			}
			quizPanel.style.display = "block";
		} else {
			quizPanel.style.display = "none";
		}
	}
	
	function closeQuizPanel() {
		console.log("closing quiz panel");
		var quizPanel = document.getElementById("enterQuiz");
		quizPanel.style.display = "none";
	}

	$("#quizForm").submit(function(e){
        e.preventDefault();

        // convert input into md5 hash to be sent
        var serialized_input = $(this).serialize()
        var input = serialized_input.substring(9)
        var hashedCode = md5(input)

        var req
        req = $.ajax({
            type: "POST",
            url: "/quiz/verify_code.php",
            data: "quizCode=" + hashedCode,
            processData: false
        });
        req.always(function (response) {
            if (response.status == '200') {
              // console.log('http response: ' + response.status)
              console.log(response.responseText)
              // console.log(response)
              // fix parseerror :(
              alert("Success!");
              var win = window.open('/quiz/q3235.php', '_blank');
              win.focus();
            }
            else {
              // console.log('Error status: ' + response.status);
              // console.log("Failure!")
              alert("Code is wrong!");
            }
        });
    });

</script>


</html>