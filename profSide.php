<html>
<head>
	<title>Ask a question</title>
	<script src="jquery-3.4.1.min.js"></script>
	<script>
		function receiveQuestion(){
			$.ajax({
				  type: 'POST',
				  url: 'getQuestions.php',
				  cache: false,
				  success: function(result){
					//var arr=JSON.parse(result);
					//alert(arr['name'] + " " + arr['question']);
					alert(result);
					var arr=JSON.parse(result);
					
					if (arr.length == 0) {
						alert("No new questions");
					}
					else {
						/*
						var markup = "<tr><td>"+arr['name']+"</td><td>"+arr['question']+"</td></tr>";
					
						lastTimeStamp = arr['time'];
						
						$("table tbody").append(markup);
						
						console.log(lastTimeStamp);
						*/
						var i; 
						for (i = 0; i < arr.length; i++) {
							var markup = arr[i]['name']+":"+arr[i]['question'];
							var len=markup.length;
							for(j=130-len;j>0;j--)
							{
								markup+=" ";
							}
							markup+=arr[i]['time']+'\n';
							//$('#receiveQuestion').val(markup);
							var area=$('#receiveQuestion');
							area.val(area.val()+markup);
						}
					}
				}
			});
		} 
		
    </script>
</head>
<body>
    <textarea readonly rows = "30" cols = "150" id = "receiveQuestion"></textarea><br><br>
    <input type="button" value="Receive" onClick="receiveQuestion()"/>
	<?php 
		
			// prevent direct access
			
			if ($_SERVER['HTTP_REFERER'] == "http://127.0.0.1/cs3235/profLogin.php") {
				// continue checking
				
			} else {
				header("Location: http://127.0.0.1/cs3235/profLogin.php");
				exit(); //Stop running the script
				// go to form page again.
			}
		
		?>
</body>
</html>
