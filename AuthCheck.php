<?php 

	require 'database.php';
	$db_connection = new Database();
	$conn = $db_connection->dbConnection();

	$arr = [];
	
	// will replace with database connection in due time
	$handle = fopen("scripts/approved.bssid", "r") or exit("Cannot open secret file"); 
	while(($buffer = fgets($handle)) != false){
		$words = explode('\n', $buffer); 
		$sec = trim($words[0]);
		array_push($arr,$sec);
	}


	$found = false;

	if(isset($_POST["username"]) && isset($_POST["password"])){			
		
		
		$uname = $_POST["username"];
		$pw = $_POST["password"];
		
		$sql = "SELECT * FROM students WHERE username = '$uname' AND password = '$pw'";
		$result = $conn->query($sql);
		
		if($result->rowCount() > 0) {
			//$arr[count($arr)] = md5(microtime());
			$session_key = md5(microtime());
			$sql = "INSERT INTO attempts VALUES('$uname','$session_key')";
			$result = $conn->query($sql);
			
			array_push($arr,$session_key);
			$found = true;
		}
		
		/*
		$handle = fopen("scripts/cs3235.ids", "r") or exit("Cannot open classlist file"); 
		while(($buffer = fgets($handle)) != false){
			$words = explode(',', $buffer); 
			
			$usr = trim($words[3]);
			$pwd = trim($words[4]);
			
			if($usr == $uname && $pwd == $pw){
				$found = true; 
			}
		}
		*/

	}
	
	if($found) {
		
		echo json_encode($arr, JSON_FORCE_OBJECT);
		
	}
	else {
		header(http_response_code(400));
	}

	
	
	
	
	
?>