<html>

<?php

	require 'database.php';
	$db_connection = new Database();
	$conn = $db_connection->dbConnection();
	
	// authenticate using attempts
	// comment out if testing
	if(isset($_GET["a"]) || isset($_GET["b"]))
	{
		
		$first = $_GET['a'];
		$second = $_GET['b'];
			
		$sql = $conn->prepare("SELECT * FROM attempts a, students s WHERE a.student = s.h_username AND a.student= :first AND 		a.session_key=:second AND a.used = 1");
		$sql->bindValue(':first', $first);
		$sql->bindValue(':second', $second);
		$sql->execute();
		
		if($sql->rowCount() > 0) {
			// session storing current username
			$row = $sql->fetch();
			$_SESSION["username"] = $row["username"];
			
			// update flag so that it cannot be used again
			$update_sql = $conn->prepare("UPDATE attempts SET used = 2 WHERE student = :first AND session_key = :second");
			$update_sql->bindValue(':first', $first);
			$update_sql->bindValue(':second', $second);
			$update_sql->execute();
			
			echo "<script>alert('Logged in as ".$_SESSION['username']."');</script>";
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

<head>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<script src="scripts/encryption.js"></script>

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
        var hashedCode = sha1(input)

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