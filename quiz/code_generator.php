<?php

// prevent direct access

if ($_SERVER['HTTP_REFERER'] == "http://group6-i.comp.nus.edu.sg/presentations_hugh/cs3235/topic1.shtml") {
// continue checking

} else {
die('Access Denied.');
exit(); //Stop running the script
// go to form page again.
}

require '../database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

// $unique_string = bin2hex(random_bytes(20));
// $new_code = substr($unique_string, 0, 8); 
// $hashed_code = sha1($new_code);

$hashed_code = isset($_POST['quizCode']) ? $_POST['quizCode'] : null;

// echo "Deleting previous code!\n";
if ($hashed_code != null) {
	try {
		$remove_code_sql = "TRUNCATE TABLE quiz";
		$conn->exec($remove_code_sql);
		// echo "All codes have been deleted.\n";
	} catch(PDOException $e) {
		// echo $remove_code_sql . "<br>" . $e->getMessage();
	}

	// echo "Inserting newly generated code!\n";
	try {
		$new_code_sql = $conn->prepare("INSERT INTO quiz (code) VALUES (:hashedCode)");
		$new_code_sql->bindParam(':hashedCode', $hashed_code);
		$new_code_sql->execute();
		// echo $new_code . "\n";
		// echo $hashed_code;
		echo "\nNew code has been inserted!\n";

		$check_sql = $conn->query("SELECT * FROM quiz LIMIT 1")->fetch();
	    $generation_timestamp = $check_sql[0];
		$db_code = $check_sql[1];
		echo $generation_timestamp . "\n";
		echo $db_code . "\n";
		http_response_code(200);
	    echo json_encode(array('message' => 'Code has been inserted!'));

	} catch(PDOException $e) {
	    // echo $new_code_sql . "<br>" . $e->getMessage();
	    http_response_code(400);
	}	
}


$conn = null;
?>
