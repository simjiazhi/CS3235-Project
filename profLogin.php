<!DOCTYPE html>
<html>
<head>
<title>Login</title>
</head>
<script src="jquery-3.4.1.min.js"></script>
<body>

Username: <input type="text" id="id"/><br/>
Password: <input type="password" id="password"/><br/>

<input type="button" value="Submit" onClick="checkCred()"/>

<script>
	function checkCred() {
		var name = document.getElementById('id').value;
		var pass = document.getElementById('password').value;
		if(name=="" || pass==""){
			alert("Please fill in all fields!");
		}
		else {
			$.ajax({
				type: 'POST',
				url: 'profCredCheck.php',
				cache: false,
				success: function(result){
					var arr=JSON.parse(result);
					console.log(result);
					if(arr[0]==name&&arr[1]==pass)
					{
						alert("Welcome");
						window.location.href="profSide.php";
						return true;
					}
					else{
						alert("Incorrect username or password");
						return false;
					}
				}
			});
		}
		
	}
</script>


<!--
<form name="login" action="profSide.php" onsubmit="return validateForm();" method="post">
Username: <input type="text" id="id"/><br/>
Password: <input type="password" id="password"/><br/>
<input type="submit" value="Enter"/>
<script>
	function validateForm(){
        var name = document.getElementById('id').value;
		var pass = document.getElementById('password').value;
		if(name=="" || pass==""){
			alert("Please fill in all fields!");
			return false;
		}
		$.ajax({
			type: 'POST',
			url: 'profCredCheck.php',
			cache: false,
			success: function(result){
				var arr=JSON.parse(result);
				//alert(arr['name'] + " " + arr['question']);
                //alert(result);
				console.log(result);
				if(arr.length > 0){
					return true;
				}
				else {
					return false;
				}
			}
		});
	}
</script>
</form>
-->

</body>
</html>