
<?php 
$param = $_GET['param1'];
switch($param) {    
   case "F2A":
        include('login.html');
        break;
    default:
        header("Location:./Auth?param1=F2A");
        break;
}
?>

