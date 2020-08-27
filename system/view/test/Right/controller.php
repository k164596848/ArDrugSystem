<?php 
    $param = $_GET['param1'];
        switch($param) {    
            case "F4BR1":
            include('./view/test/map.html');
            include('R_map1.html');
                break;
            case "F4BR2_3":
            include('./view/test/map.html');
            include('R_map2_3.html');
                break;
            case "F4BR2_1":
            include('./view/test/map.html');
            include('R_map2_1.html');
                break;
            case "F4BR2_2":
            include('./view/test/map.html');
            include('R_map2_2.html');
                break;
            default:
            header("Location:./Right?param1=F4BR1");
                    break;
            }
?>

