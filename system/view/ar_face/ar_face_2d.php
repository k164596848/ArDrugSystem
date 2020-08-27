<?php

$db_host="163.17.135.190";
$db_username="letjs";
$db_password="letjs00000000";
$db_name="ardrugs";

$db_link=@mysqli_connect($db_host,$db_username,$db_password);
$charset=mysqli_query($db_link,"set names'utf8'");
mysqli_select_db($db_link,$db_name);

echo $_GET['id'];
$sql = "select * from ar_face where `ser` = ".$_GET['id'];
$result=mysqli_query($db_link,$sql);
$row = mysqli_fetch_array($result);

if($row['ar_mode']){
	echo"<script>document.location.href='./facedraw/index1.html?img_add=".$row['pic_address']."'</script>"; //裡面用GET放?$row['pic_address']
}else{
	echo"<script>document.location.href='./jeelizFaceFilter/demos/CSS3D/comedy-glasses/index.php?img_add=".$row['pic_address']."'</script>"; //裡面用GET放?$row['pic_address']
}
?>


<html>
<head>
</head>
<body>
hello 2D
</body>
</html>