<?php 
session_start();
$param = $_GET['param1'];
switch($param) {    
   case "F4A":
	   if($_SESSION['rights'] == '1'){
		   include('AccountListContent.html');
			break;
	   }else if($_SESSION['rights'] == '2' || $_SESSION['rights'] == '3'){
			header("Location:./Announcement?param1=B4A");
			break;
	   }
			//echo $_SESSION['rights'];		
    default:
		if($_SESSION['rights'] == '1'){
			header("Location:./AccountList?param1=F4A");
			break;
	   }else if($_SESSION['rights'] == '2' || $_SESSION['rights'] == '3'){
			header("Location:./Announcement?param1=B4A");
			break;
   }
}
?>

