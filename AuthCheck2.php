<?php 

	require 'database.php';
	$db_connection = new Database();
	$conn = $db_connection->dbConnection();

	$arr = [];

	$userFound = false;
	$secretFound = false; 
	


	
	if(isset($_POST["username"]) && isset($_POST["password"]) && isset($_POST["secret"])){			
		
		
		$uname = $_POST["username"];
		$pw = $_POST["password"];
		$secret = $_POST["secret"];
		
		$sql = "SELECT * FROM students WHERE username = '$uname' AND password = '$pw'";
		$result = $conn->query($sql);
		
		if($result->rowCount() > 0) {
			
			$userFound = true;

			// check secret
			$handle = fopen("scripts/approved.bssid", "r") or exit("Cannot open secret file"); 
			while(($buffer = fgets($handle)) != false){
				$words = explode('\n', $buffer); 
				$sec = trim($words[0]);
				
				if($secret === $sec) {
					$secretFound = true;
				}
			}

			
			//$session_key = md5(microtime());
			//$sql = "INSERT INTO attempts VALUES('$uname','$session_key')";
			//$result = $conn->query($sql);
			
			//array_push($arr,$session_key);
			//$found = true;
			
		}
		
	
	}

	if($userFound && $secretFound) {
		
		
		$session_key = md5(microtime());
		// do db stuff here
		$uname = $_POST["username"];
		$sql = "INSERT INTO attempts (student, session_key) VALUES('$uname','$session_key')";
		$result = $conn->query($sql);
		//
		
		// echo back url for access
		echo "http://127.0.0.1/CS3235/interface2.php?a=".$uname."&b=".$session_key;
		
	}
	else {
		header(http_response_code(400));
	}
	
	

	
	
	
	
	
?>