<?php 

	require 'database.php';
	$db_connection = new Database();
	$conn = $db_connection->dbConnection();

	//$data = json_decode(file_get_contents("scripts/approved.bssid"));
	$arr = [];
	$err = [];
	$err[0] = "error";
	
	// will replace with database connection in due time
	$handle = fopen("scripts/approved.bssid", "r") or exit("Cannot open secret file"); 
	while(($buffer = fgets($handle)) != false){
		$words = explode('\n', $buffer); 
		$sec = trim($words[0]);
		array_push($arr,$sec);
	}
	
	// check username and password
	$found = false;
	
	if(isset($_GET["username"]) && isset($_GET["password"])){			
		
		$uname = $_GET["username"];
		$pw = $_GET["password"];
		
		$sql = "SELECT * FROM students WHERE username = '$uname' AND password = '$pw'";
		$result = $conn->query($sql);
		
		if($result->rowCount() > 0) {
			$found = true;
		}
		
		/*
		$handle = fopen("scripts/cs3235.ids", "r") or exit("Cannot open classlist file"); 
		while(($buffer = fgets($handle)) != false){
			$words = explode(',', $buffer); 
			
			$usr = trim($words[3]);
			$pwd = trim($words[4]);
			
			if($usr == $_GET["username"] && $pwd == $_GET["password"]){
				$found = true; 
			}
		}
		*/
	}	
	
	
	if($found) {
		// print_r($arr);
		echo json_encode($arr, JSON_FORCE_OBJECT);
	}
	else {
		// print_r($err);
		//return json_encode($err); 
		header(http_response_code(400));
	}
	
	
?>