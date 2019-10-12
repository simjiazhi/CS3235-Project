<html>

<head>
	<title>Test Destination</title>
	<style>
		.center{
				position: fixed;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
		}
	</style>
	
</head>
<body>
	<body>
		<img src = "img/bongocat.gif" width="540" class="center">
		<?php 
		
			// prevent direct access
			
			if ($_SERVER['HTTP_REFERER'] == "http://127.0.0.1/CS3235/login.php") {
				// continue
			} else {
				header("Location: http://127.0.0.1/CS3235/login.php");
				exit(); //Stop running the script
				// go to form page again.
			}
		
			echo "<script>alert('Successfully logged in');</script>";
			session_start();
			echo $_SESSION['bssid'];
			echo "<br>";
			echo $_SESSION['ssid'];
			// once bssid and ssid is processed, delete it from session so it cannot not be 
			// reused
			session_destroy();
		?>
	</body>
</body>


</html>