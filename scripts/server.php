<?php

	if ($_SERVER['HTTP_REFERER'] == "http://127.0.0.1/CS3235/login.php") {
				// continue
	} else {
		header("Location: http://127.0.0.1/CS3235/login.php");
		exit(); //Stop running the script
		// go to form page again.
	}

	$matric = trim($_POST["matric"]);
	$userpass = trim($_POST["userpass"]);
	$found = false;
	$handle = fopen("cs3235.ids", "r") or exit("Cannot open classlist file"); 
	while(($buffer = fgets($handle)) != false){
		$words = explode(',', $buffer); 
		$usr = trim($words[3]);
		$pwd = trim($words[4]);
		if($usr == $matric && $pwd == $userpass){
			$found = true; 
		}
	}
	
	if($found == true){
		header("Location: ../test.php"); 
		exit;
	} else {
		echo '<script language="javascript"> alert("Wrong Student ID or Password!");window.location.href="../login.php"</script>'; 
		//$login = file_get_contents("login.html");
		//echo $login; 
	}
?>