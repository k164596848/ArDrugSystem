<?php

$db_host="163.17.135.190";
$db_username="letjs";
$db_password="letjs00000000";
$db_name="ardrugs";

$db_link=@mysqli_connect($db_host,$db_username,$db_password);
$charset=mysqli_query($db_link,"set names'utf8'");
mysqli_select_db($db_link,$db_name);

if(isset($_GET['id']))
{
	$sql = "select * from ar_face group by `drug_name` order by `ser`";
	$result=mysqli_query($db_link,$sql);
	$rec_no = mysqli_num_rows($result);
	$str="";
	for($i=1;$i<=$rec_no;$i++){
	$row = mysqli_fetch_array($result);

	$str = $str."
	<div id='drug".$i."' style='display:none'>
		<h1>".$row['drug_name']."</h1>
		<h3>".$row['drug_info']."</h3>
	</div>";
	}
	
	//echo $row['ser'];
	echo"
	<html>
	<head>
	<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css'>
	
  
     <link rel='stylesheet' href='style.css'>
	 <style>
	H3{
		font-family:Microsoft JhengHei;;
	}
	H1{
		font-family:Microsoft JhengHei;;
	}
	button{
		font-family:Microsoft JhengHei;;
	}
	</style>

	
	</head>
	<body>
	";

}

echo "

	<a href='ar_face_2d.php?id=2' target='right_frame'><button onclick='change_drug(1)' value='毒品1' class='mh11' style='margin:0px 10px 30px 10px;'>大麻</button></a>
	<a href='ar_face_2d.php?id=15' target='right_frame'><button onclick='change_drug(2)' value='毒品2' class='mh11' style='margin:0px 10px 0 0;'>安非他命</button></a>
	<a href='ar_face_2d.php?id=17' target='right_frame'><button onclick='change_drug(3)' value='毒品3' class='mh11' style='margin:0px 0px 0 0;'>搖頭丸</button></a>
	<a href='ar_face_2d.php?id=18' target='right_frame'><button onclick='change_drug(4)' value='毒品3' class='mh11' style='margin:0px 10px 60px 60px;'>海洛因</button></a>
	<a href='ar_face_2d.php?id=20' target='right_frame'><button onclick='change_drug(5)' value='毒品3' class='mh11' style='margin:0px 40px 0px 30px;'>K他命</button></a>
	<ul class='cards'>
	  
	  <li class='card card--next'>
		<h1>Comment Card 1 </h1>
		
		 </li>
	  <li class='card card--out'>
		<h1>Comment Card 2 </h1>

		 </li>
	  <li class='card'>
		<h1>Comment Card 3</h1>

		
	  </li>
	  <li class='card card--current'>
		".$str."

	  </li>
	</ul>
	 <a href='../../login?param1=F4B' target='_parent'>
	 <button style='width:50px;position: absolute;top:120px;right: 2%;background: none;border:none;' id='backindex'>
		<img src='../../pic/backindex.png' style='max-width: 100%'>
		</button>
		</a>
	<script src='https://code.jquery.com/jquery-3.3.1.min.js'></script>
	
	<script>
	
	
	$('#drug1').show(500);
	
	function change_drug(i){
		
		if(!$('#drug'+i).is(':visible')){
		$('div').hide(500);
		$('#drug'+i).show(500);
	}
		//document.location.replace('ar_face_information.php?id='+i);
	}
	
	
	</script>

		</body>
		</html>
";



?>




	
