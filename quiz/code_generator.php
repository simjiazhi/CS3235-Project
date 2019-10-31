<?php

require '../database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

$unique_string = bin2hex(random_bytes(20));
$new_code = substr($unique_string, 0, 8); 
$hashed_code = sha1($new_code);

echo "Deleting previous code!\n";
try {
	$remove_code_sql = "TRUNCATE TABLE quiz";
	$conn->exec($remove_code_sql);
	echo "All codes have been deleted.\n";
} catch(PDOException $e) {
	echo $remove_code_sql . "<br>" . $e->getMessage();
}

echo "Inserting newly generated code!\n";
try {
	$new_code_sql = $conn->prepare("INSERT INTO quiz (code) VALUES (?)");
	$new_code_sql->execute([$hashed_code]);
	echo $new_code;
	echo $hashed_code;
	echo "\nNew code has been inserted!\n";

	$check_sql = $conn->query("SELECT * FROM quiz LIMIT 1")->fetch();
    $generation_timestamp = $check_sql[0];
	$db_code = $check_sql[1];
	echo $generation_timestamp . "\n";
	echo $db_code . "\n";

} catch(PDOException $e) {
    echo $new_code_sql . "<br>" . $e->getMessage();
}

$conn = null;
?>
