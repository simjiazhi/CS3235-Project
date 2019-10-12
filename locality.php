<?php

	$bssid = $_GET['bssid'];
	$ssid = $_GET['ssid'];
	
	// checks for bssid and ssid validity will be written here
	// ignored for prototyping purposes
	
	if(isset($bssid) && isset($ssid)) {
		session_start();
		$_SESSION['bssid'] = $bssid;
		$_SESSION['ssid'] = $ssid;
		header("Location: http://127.0.0.1/CS3235/login.php");
	}
	



?>