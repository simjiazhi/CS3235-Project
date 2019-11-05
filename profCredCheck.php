<?php
	$servername = "localhost";
	$username = "root";
	$password = "123456";
	$database = "polltest";
    $conn = new mysqli($servername, $username, $password, $database);

	// Check connection
	if ($conn->connect_error) {
		//echo '<script>console.log("Connection successful")</script>';
		echo "Can't connect to question server :<";
		exit(1);
    }
    else{
        $arr;
        $stmt = $conn->prepare('SELECT * FROM profcred');
		$stmt->execute();
		$result = $stmt->get_result();
        if(mysqli_num_rows($result) != 0) {
			$row = mysqli_fetch_assoc($result);
			$arr[0] = $row['username'];
			$arr[1] = $row['password'];
		}
		echo json_encode($arr);
    }
?>