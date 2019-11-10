<?php
	session_start();
	require '../database.php';
	$db_connection = new Database();
	$conn = $db_connection->dbConnection();
		
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
	$count = 0;
	$arr = [];
	if($sql->rowCount()!= 0) {
		while($row=$sql->fetch(PDO::FETCH_ASSOC)) {
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
		


?>