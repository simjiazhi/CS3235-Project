<html>
<head>
<title>Poll question</title>
</head>
<body>

<?php
$qidx         = '/var/www/html/cs3235/lectures/qid.txt';
$qid          = file_get_contents($qidx);
$questionfile = '/var/www/html/cs3235/lectures/question.txt';
$sh           = fopen($questionfile, 'r');
$line         = fgets($sh);
$questionid   = explode(".",$qid);
echo '<b> Q' . $questionid[2] . ':</b> ' . $line . '<p>';
echo '<Form name ="form1" ACTION ="radioButtonAnswer.php" method="post"><blockquote>';
$line         = fgets($sh);
echo '<Input type = "Radio" Name ="result" value= "1"> ' . $line . '<p>';
$line         = fgets($sh);
echo '<Input type = "Radio" Name ="result" value= "2"> ' . $line . '<p>';
$line         = fgets($sh);
echo '<Input type = "Radio" Name ="result" value= "3"> ' . $line . '<p>';
$line         = fgets($sh);
echo '<Input type = "Radio" Name ="result" value= "4"> ' . $line . '<p>';
echo '</blockquote><P><Input type = "Submit" Name = "Submit1" Value = "Select your answer, and press this button">';
echo '</FORM>';
?>

</body>
</html>
