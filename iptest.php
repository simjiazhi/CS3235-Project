<?PHP

/*
function getUserIP() {
    $ipaddress = '';
    if (getenv('HTTP_CLIENT_IP'))
        $ipaddress = getenv('HTTP_CLIENT_IP');
    else if(getenv('HTTP_X_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
    else if(getenv('HTTP_X_FORWARDED'))
        $ipaddress = getenv('HTTP_X_FORWARDED');
    else if(getenv('HTTP_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_FORWARDED_FOR');
    else if(getenv('HTTP_FORWARDED'))
       $ipaddress = getenv('HTTP_FORWARDED');
    else if(getenv('REMOTE_ADDR'))
        $ipaddress = getenv('REMOTE_ADDR');
    else
        $ipaddress = 'UNKNOWN';
    return $ipaddress;
}
*/

function getUserIP() {
	
	$externalContent = file_get_contents('https://diagnostic.opendns.com/myip');
	//$externalContent = file_get_contents('http://checkip.dyndns.com/');
	//preg_match('/Current IP Address: \[?([:.0-9a-fA-F]+)\]?/', $externalContent, $m);
	//$externalIp = $m[1];
	
	return $externalContent;
}



$user_ip = getUserIP();

echo $user_ip; // Output IP address [Ex: 177.87.193.134]
echo "<br>";
echo substr($user_ip,0,7);
echo "<br>";
if(substr($user_ip,0,7) === "137.132") {
	echo "yes";
}
else {
	echo "no";
}


?>