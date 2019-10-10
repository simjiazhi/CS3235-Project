<!DOCTYPE html>
<html>
<head>
<title>Login</title>
<link rel="stylesheet" href="styles.css">
<script>
	function validateForm(){
		var matric = document.forms["login"]["matric"].value;
		var userpass = document.forms["login"]["userpass"].value;
		if(matric=="" || userpass==""){
			alert("Please fill in all fields!");
			return false;
		}
	}
</script>
</head>
<body onload = "">

<form name="login" action="scripts/server.php" onsubmit="return validateForm();" method="post">
Student ID: <input type="text" name="matric"/><br/>
Student Password: <input type="password" name="userpass"/><br/>
<input type="submit" value="Enter"/>
</form>

</body>
</html>