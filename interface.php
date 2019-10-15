<html>

<head>
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
	
	<script>
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
	
	</script>
	
</head>

<body>

	<div class = "overlay">
		<embed src="Lect5Comms.pdf" type="application/pdf" width="100%" height="100%" />
	</div>

	<div class = "sticky">
			
		<Button onClick = "askQuestion();">Ask Question</button>
		<Button>Quiz</button>
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
	

</body>


</html>