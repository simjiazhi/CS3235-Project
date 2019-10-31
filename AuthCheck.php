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
		// check public ip (added dimension + security by obscurity)
		$user_ip = getUserIP();
		
		// prepared statements for prevention of SQL injection
		$sql = $conn->prepare("SELECT * FROM students WHERE h_username = :un AND password = :pw");
		$sql->bindValue(':un', $uname);
		$sql->bindValue(':pw', $pw);
		$sql->execute();
		

		// uncomment if clause if testing	
		//if($sql->rowCount() > 0 && $user_ip.substr(0, 7) === "137.132") {
		if($sql->rowCount() > 0) {
			$userFound = true;
			$session_key = md5(microtime());
			
			$sql = $conn->prepare("INSERT INTO attempts (student, session_key) VALUES(:un,:sk)");
			$sql->bindValue(':un', $uname);
			$sql->bindValue(':sk', $session_key);
			$sql->execute();
			
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
		
		$sql = $conn->prepare("SELECT * FROM attempts WHERE student = :s1 AND session_key = :s2 AND used < 1");
		$sql->bindValue(':s1', $first);
		$sql->bindValue(':s2', $second);
		$sql->execute();
		
		if($sql->rowCount() > 0) {
			
			$sql = $conn->prepare("UPDATE attempts SET used = 1 WHERE student = :s1 AND session_key = :s2 ");
			$sql->bindValue(':s1', $first);
			$sql->bindValue(':s2', $second);
			$sql->execute();
			
			$handle = fopen("scripts/approved.bssid", "r") or exit("Cannot open secret file"); 
			while(($buffer = fgets($handle)) != false){
				$words = explode('\n', $buffer); 
				$sec = trim($words[0]);
				
				if($third === $sec) {
					$secretFound = true;
				}
			}
			
			if($secretFound) {
				echo "http://127.0.0.1/CS3235/interface.php?a=".$first."&b=".$second;
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