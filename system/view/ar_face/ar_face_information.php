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

	<a href='ar_face_2d.php?id=2' target='right_frame'><button onclick='change_drug(1)' value='毒品1' class='mh11' style='margin:0px 30px 50px 50px;'>大麻</button></a>
	<a href='ar_face_2d.php?id=15' target='right_frame'><button onclick='change_drug(2)' value='毒品2' class='mh11' style='margin:0px 30px 0;'>安非他命</button></a>
	<a href='ar_face_2d.php?id=17' target='right_frame'><button onclick='change_drug(3)' value='毒品3' class='mh11' style='margin:0px 30px 0;'>搖頭丸</button></a>
	<a href='ar_face_2d.php?id=18' target='right_frame'><button onclick='change_drug(4)' value='毒品3' class='mh11' style='margin:0px 50px 0px 140px;'>海洛因</button></a>
	<a href='ar_face_2d.php?id=20' target='right_frame'><button onclick='change_drug(5)' value='毒品3' class='mh11' style='margin:0px 40px 0px 40px;'>K他命</button></a>
	<ul class='cards'>
	  
	  <li class='card card--next'>
		<h1>Comment Card 1 </h1>
		
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent bibendum, lorem vel tincidunt imperdiet, nibh elit laoreet felis, a bibendum nisl tortor non orci. Donec pretium fermentum felis, quis aliquet est rutrum ut. Integer quis massa ut lacus viverra pharetra in eu lacus. Aliquam tempus odio adipiscing diam pellentesque rhoncus. Curabitur a bibendum est. Mauris vehicula cursus risus id luctus. Curabitur accumsan venenatis nibh, non egestas ipsum vulputate ac. Vivamus consectetur dolor sit amet enim aliquet eu scelerisque ipsum hendrerit. Donec lobortis suscipit vestibulum. Nullam luctus pellentesque risus in ullamcorper. Nam neque nunc, mattis vitae ornare ut, feugiat a erat. Ut tempus iaculis augue vel pellentesque.</p>
	  </li>
	  <li class='card card--out'>
		<h1>Comment Card 2 </h1>

		<p>Vestibulum nunc massa, gravida quis porta nec, feugiat id metus. Nunc ac arcu dolor, quis vestibulum leo. Cras viverra mollis ipsum, non rhoncus lectus aliquam et. Morbi faucibus purus sit amet lacus aliquet elementum. Donec sit amet posuere enim. Cras in eros id tortor fringilla ultricies. Mauris faucibus ullamcorper velit, pulvinar varius odio eleifend eu. Quisque id odio metus. Morbi adipiscing ultricies posuere. Pellentesque elementum porttitor eros in molestie. Maecenas ut leo quis nisi tempor tincidunt.</p>
	  </li>
	  <li class='card'>
		<h1>Comment Card 3</h1>

		<p>Donec nunc ligula, vulputate quis mollis eu, interdum quis libero. Donec nulla ante, facilisis sit amet vulputate at, tincidunt a velit. Maecenas vestibulum, nulla sed tincidunt viverra, lorem turpis aliquam urna, ut pretium orci purus consequat augue. Etiam a enim orci, vitae pulvinar odio. In elit urna, tincidunt a pellentesque et, scelerisque at nibh. Sed nec est sapien. Aliquam ullamcorper eros eu quam ultrices vel faucibus eros interdum. Etiam mattis eleifend sapien, eu iaculis massa feugiat sed. Aliquam erat volutpat. Vivamus facilisis ultricies eros, a pretium purus mollis id. Sed dapibus elit ut neque rutrum dignissim. Nulla eros nisl, venenatis quis rhoncus sit amet, molestie nec nisl. Pellentesque vel neque sapien, et sagittis nulla.</p>

	  </li>
	  <li class='card card--current'>
		".$str."

	  </li>
	</ul>
	<a href='../../login?param1=F4B' target='_parent'>
	 <button style='width:80px;position: absolute;top:10px;right: 2%;background: none;border:none;' id='backindex'>
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




	
