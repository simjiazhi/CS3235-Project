<?php
// SET HEADER
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// INCLUDING DATABASE AND MAKING OBJECT
require '../database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

// GET DATA FORM REQUEST
$student_code = isset($_POST['quizCode']) ? $_POST['quizCode'] : null;

try {
    $check_sql = $conn->query("SELECT * FROM quiz LIMIT 1")->fetch();
    $generation_timestamp = $check_sql[0];
    $new_code = $check_sql[1];

} catch(PDOException $e) {
    echo "could not retrieve code!";
}

$current_time = date('Y-m-d H:i:s');
$time_diff_in_s = strtotime($current_time) - strtotime($generation_timestamp);
echo $new_code;
if ($student_code != null) {

    if (($new_code === $student_code) && ($time_diff_in_s < 60)) {
        // OK
        http_response_code(200);
        echo json_encode(array('message' => 'Code is correct!'));
    } else {
        // Bad Request
        http_response_code(400);
        echo json_encode(array('message' => 'Code is wrong! :('));
    }
}

?>

