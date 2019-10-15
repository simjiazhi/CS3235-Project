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
				// continue checking
				
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
			
			// time test - change device time and see if it is reflected here
			echo "<br>";
			date_default_timezone_set('Asia/Singapore');
			
			$timestamp = time();
			$date_time = date("d-m-Y (D) H:i:s", $timestamp);
			echo "Current date and local time on this server is $date_time";
		
		?>
		
		
	</body>
</body>


</html>