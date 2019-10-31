<?php 

	require 'database.php';
	$db_connection = new Database();
	$conn = $db_connection->dbConnection();

	$arr = [];

	$userFound = false;
	$secretFound = false; 
	
	// handle first request, username and password
	if(isset($_POST["username"]) && isset($_POST["password"])){		
		$uname = $_POST["username"];
		$pw = $_POST["password"];
		$sql = "SELECT * FROM students WHERE h_username = '$uname' AND password = '$pw'";
		$result = $conn->query($sql);
		
		// check public ip (added dimension + security by obscurity)
		$user_ip = getUserIP();
			
		// uncomment if clause if testing	
		//if($result->rowCount() > 0 && $user_ip.substr(0, 7) === "137.132") {
		if($result->rowCount() > 0) {
			$userFound = true;
			$session_key = md5(microtime());
			
			
			$sql = "INSERT INTO attempts (student, session_key) VALUES('$uname','$session_key')";
			$result = $conn->query($sql);
			
			echo $session_key;
		}
		else {
			// user not found
			header(http_response_code(400));
		}
	}
	
	
	if(isset($_POST["secret1"]) && isset($_POST["secret2"]) && isset($_POST["secret3"]) ) {
		
		$first = $_POST["secret1"];
		$second = $_POST["secret2"];
		$third = $_POST["secret3"];
		$secretFound = false;
		
		$sql = "SELECT * FROM attempts WHERE student = '$first' AND session_key = '$second' AND used < 1";
		$result = $conn->query($sql);
		if($result->rowCount() > 0) {
			$update_sql = "UPDATE attempts SET used = 1 WHERE student = '$first' AND session_key = '$second'";
			$result = $conn->query($update_sql);
			
			$handle = fopen("scripts/approved.bssid", "r") or exit("Cannot open secret file"); 
			while(($buffer = fgets($handle)) != false){
				$words = explode('\n', $buffer); 
				$sec = trim($words[0]);
				
				if($third === $sec) {
					$secretFound = true;
				}
			}
			
			if($secretFound) {
				echo "http://127.0.0.1/CS3235/interface2.php?a=".$first."&b=".$second;
			}
			else {
				header(http_response_code(400));
			}

		}
		else {
			header(http_response_code(400));
		}

	}
	
	
function getUserIP() {
	$externalContent = file_get_contents('https://diagnostic.opendns.com/myip');	
	return $externalContent;
}

	
	
	
	
	
?>