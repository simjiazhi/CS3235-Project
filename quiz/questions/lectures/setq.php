<html>
<head><title>Setting question for poll</title></head>
<body>

<h3>CS3235 Question</h3>
<?php 
$course      = $_GET["course"];
$lect        = $_GET["lect"];
$qnum = $_GET["qid"];
$q    = $_GET["q"];
$l1   = $_GET["l1"];
$l2   = $_GET["l2"];
$l3   = $_GET["l3"];
$l4   = $_GET["l4"];

if (ctype_alnum($course) && ctype_alnum($lect) && ctype_alnum($qnum)) {
   $qfile = '/var/www/html/cs3235/lectures/qid.txt';
   echo "Setting qnum to "+$qnum;
   $qn=fopen($qfile, 'w') or exit("Can't open qfile");
   fwrite($qn,"$course.") or exit("Cannot write qfile");
   fwrite($qn,"$lect.") or exit("Cannot write qfile");
   fwrite($qn,"$qnum") or exit("Cannot write qfile");
   fclose($qn) or exit("Cannot close qfile");

   $qfile = '/var/www/html/cs3235/lectures/question.txt';
   echo "Setting qnum to "+$qnum;
   $qn=fopen($qfile, 'w') or exit("Can't open qfile");
   fwrite($qn,"$q\n") or exit("Cannot write qfile");
   fwrite($qn,"$l1\n") or exit("Cannot write qfile");
   fwrite($qn,"$l2\n") or exit("Cannot write qfile");
   fwrite($qn,"$l3\n") or exit("Cannot write qfile");
   fwrite($qn,"$l4\n") or exit("Cannot write qfile");
   fclose($qn) or exit("Cannot close qfile");


}
?>

</body>
</html>
