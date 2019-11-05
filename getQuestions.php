<?php
	session_start();
	$servername = "localhost";
	$username = "root";
	$password = "123456";
	$database = "polltest";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $database);
	
	if ($conn->connect_error) {
		//echo '<script>console.log("Connection successful")</script>';
		echo "Can't connect to question server :<";
		exit(1);
	}
	else {
		
		/*
		$time =  $_POST['time']; 
		
		$sql = "SELECT * FROM questions ORDER BY time DESC LIMIT 1";
		$result = mysqli_query($conn, $sql);
		
		$arr = [];
		
		
		if(mysqli_num_rows($result) != 0) {
			
			$row = mysqli_fetch_assoc($result);
			
			if($row['time'] > $time) {
				$arr['id'] = $row['id'];
				$arr['name'] = $row['name'];
				$arr['question'] = $row['question'];
				$arr['time'] = $row['time'];
			}
		}
		*/
		$time = 0;
		if(isset($_SESSION["lastTime"])) {
			$time=$_SESSION["lastTime"];
		}

		$sql = $conn->prepare('SELECT * FROM questions');
		$sql->execute();
		$result = $sql->get_result();
		$count = 0;
		$arr = [];
		if(mysqli_num_rows($result) != 0) {
			while($row = mysqli_fetch_assoc($result)) {
				
				if($row['time'] > $time) {
					$arr[$count]['id'] = $row['id'];
					$arr[$count]['name'] = $row['name'];
					$arr[$count]['question'] = $row['question'];
					$arr[$count]['time'] = $row['time'];
					$count++;
				}
			}
		}
		
		if($count > 0) {
			$_SESSION["lastTime"] = $arr[$count-1]['time'];
		}
		
		echo json_encode($arr);
		exit(0);
		
	
	}


?>