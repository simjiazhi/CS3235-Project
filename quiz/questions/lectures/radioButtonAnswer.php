<html>
<head><title>Submission for question</title></head>
<body>

<h3>Submission</h3>
<?php 
$array = array("A","B","C","D");
$rslt = $_POST["result"];
echo 'You selected ' . $array[$rslt - 1] . '<p>';
$qidx       = '/var/www/html/cs3235/lectures/qid.txt';
$qid = file_get_contents($qidx);
$tallyfile = '/var/www/html/cs3235/lectures/results.' . $qid . '.js';
$tempfile = '/var/www/html/cs3235/lectures/results.' . $qid . '.tmp';
$sh=fopen($tallyfile, 'r');
if ( $sh == 0 ) {
   $sh=fopen($tallyfile,'a');
   fwrite($sh,"vala=0;\nvalb=0;\nvalc=0;\nvald=0;\n");
   fclose($sh);
   $sh=fopen($tallyfile, 'r') or exit("Can't open results file");
}
$th=fopen($tempfile, 'a') or exit("Can't open temp file");
$idx = 1;
while (!feof($sh)) {
   $line=fgets($sh);
//   echo 'idx=' . $idx . '; rslt=' . $rslt . '; <p>';
   if (strlen($line)!==0) {
      if ($idx == $rslt) {
  //       echo 'in loop...<p>';
         $nm = substr($line,5,-2);
//echo 'nm is ' . $nm;
         $nm = $nm + 1;
         $line = substr($line,0,5) . "$nm" . ";\n";
      }
      fwrite($th, $line) or exit("Cannot write tempfile");
   }
   $idx = $idx+1;
}
   fclose($sh) or exit("Cannot close tallyfile");
   fclose($th) or exit("Cannot close tempfile");;
   unlink($tallyfile) or exit("Cannot unlink tallyfile");
   rename($tempfile, $tallyfile) or exit("Cannot rename tempfile");


?>

Click <a href="../../q3235.php">here</a> when next question is on the screen.
</body>
</html>
