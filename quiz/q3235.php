<html>
<head>
<title>Poll question</title>
</head>
<body>
<?php

  // prevent direct access

  if ($_SERVER['HTTP_REFERER'] == "http://group6-i.comp.nus.edu.sg/interface.php") {
    // continue checking
    
  } else {
    die('Access Denied.');
    exit(); //Stop running the script
    // go to form page again.
  }

  $qidx         = '/var/www/html/quiz/questions/lectures/qid.txt';
  $qid          = file_get_contents($qidx);
  $questionfile = '/var/www/html/quiz/questions/lectures/question.txt';
  $sh           = fopen($questionfile, 'r');
  $line         = fgets($sh);
  $questionid   = explode(".",$qid);
  echo '<b> Q' . $questionid[2] . ':</b> ' . $line . '<p>';
  echo '<Form name ="form1" ACTION ="questions/lectures/radioButtonAnswer.php" method="post"><blockquote>';
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
