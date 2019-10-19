<html>

<head>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

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
			background-color: red;
			bottom: 50;
			left: 10;
			z-index: 30;
			border: 2px solid black;
			padding: 10px;
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
	
	<script type='text/javascript'>
		function askQuestion() {
			console.log("asking question");
			var askPanel = document.getElementById("askQn");	
			askPanel.style.display = "block";
		}
		
		function closeQuestion() {
			console.log("closing question");
			var askPanel = document.getElementById("askQn");	
			askPanel.style.display = "none";
		}

		function openQuizPanel() {
			console.log("asking question");
			var quizPanel = document.getElementById("enterQuiz");
			quizPanel.style.display = "block";
		}
		
		function closeQuizPanel() {
			console.log("closing question");
			var quizPanel = document.getElementById("enterQuiz");
			quizPanel.style.display = "none";
		}

		$("#quizForm").submit(function(e){
            e.preventDefault();
            var req
            req = $.ajax({
                type: "POST",
                url: "./quiz/verify_code.php",
                data: $(this).serialize(),
                processData: false
            });
            req.always(function (response) {
                if (response.status == '200') {
                  // console.log('http response: ' + response.status)
                  // console.log(response.responseText)
                  // console.log(response)
                  // fix parseerror :(
                  alert("Success!");
                  var win = window.open('./quiz/q3235.php', '_blank');
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
	
</head>

<body>

	<div class = "overlay">
		<embed src="Lect5Comms.pdf" type="application/pdf" width="100%" height="100%" />
	</div>

	<div class = "sticky">
			
		<Button onClick = "askQuestion();">Ask Question</button>
		<Button onClick = "openQuizPanel();">Quiz</button>
	</div>
	
	<!-- need prevent sql injection here -->
	
	<div class = "popup" id = "askQn" style = "display: none">
		<button class = "close" onClick = "closeQuestion();">x</button>
		<p><b>Ask a question:</b></p>
		<textarea rows="4" cols="50" maxlength="200"></textarea>
		<br>
		<br>
		<button class = "close">Submit</button>
		
		
	</div>

	<div class = "popup" id = "enterQuiz" style = "display: none">
	    <button class = "close" onClick = "closeQuizPanel();">x</button>
	    <form id="quizForm" method="post">
	        <input type="text" name="quizCode">
	        <input type="submit" value="Join Quiz Now!">
	    </form>

	</div>
	

</body>
<?php

	require 'database.php';
	$db_connection = new Database();
	$conn = $db_connection->dbConnection();
	
	if(isset($_GET["a"]) || isset($_GET["b"]))
	{
		
		$first = $_GET['a'];
		$second = $_GET['b'];
		$sql = "SELECT * FROM attempts WHERE student = '$first' AND session_key = '$second'";
		$result = $conn->query($sql);
		if($result->rowCount() > 0) {
			echo "<script>alert('Greetings!')</script>";
		}
		else {
			header("Location: error.php");
		}
		
	}
	else 
	{
		header("Location: error.php");
	}

?>

</html>