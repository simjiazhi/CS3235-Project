<!DOCTYPE html>
<html>
<head>
<script src="scripts/encryption.js"></script>
<title>Login</title>
</head>
<body>
<form name="login" action="scripts/server.php" onsubmit="return validateForm();" method="post">
Student ID: <input type="text" name="matric"/><br/>
Student Password: <input type="password" name="userpass"/><br/>
<input type="submit" value="Enter"/>
<script>
	function validateForm(){
		var matric = document.forms["login"]["matric"].value;
		var userpass = document.forms["login"]["userpass"].value;
		if(matric=="" || userpass==""){
			alert("Please fill in all fields!");
			return false;
		}
		else{
			document.forms["login"]["userpass"].value = sha1(userpass);
		}
	}
</script>
</form>

</body>
</html>