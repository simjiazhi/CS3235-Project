<?php
	require '../database.php';
	$db_connection = new Database();
	$conn = $db_connection->dbConnection();
		
		// $name =  $_POST['name']; 
		// $question =  $_POST['question']; 	
		// $sql = "INSERT INTO questions (name, question) VALUES('$name', '$question')";
		// mysqli_query($conn, $sql);
		// echo "ok";
		// exit(0);
		
	$name =  $_POST['name']; 
	$question =  $_POST['question'];
	$stmt = $conn->prepare('SELECT * FROM questions WHERE name= :name ORDER BY time DESC');
	$stmt->execute(array('name'=>$name));
	if($stmt->rowCount()!= 0) {
		$row=$stmt->fetch();
		$lastTime=$row['time'];
		$lastTime=strtotime($lastTime)-25200;
		$curtime = time()+28800;
		if(($curtime-$lastTime) > 300){
			$sql = $conn->prepare('INSERT INTO questions (name, question) VALUES(:name, :question)');
			$sql->execute(array('name'=>$name, 'question'=>$question));
			echo "Submitted Question";
		}
		else
		{
			echo "You can't submit question yet";
		}
	}
	else{
		$sq = $conn->prepare('INSERT INTO questions (name, question) VALUES(:name, :question)');
		$sq->execute(array('name'=>$name, 'question'=>$question));
		echo "Submitted Question";
	}
	exit(0);
	
	
?>