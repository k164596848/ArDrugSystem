<?php 
    $param = $_GET['param1'];
        switch($param) {    
            case "F4D":
            include('artest.html');
                break;
            case "F4B":
            include('map.html');
            include('mindmap.html');
                break;
            case "F4BR1":
            include('R_map1.html');
                break;
            case "F4BR2_3":
            include('R_map2_3.html');
                break;
            case "F4BR2_1":
            include('R_map2_1.html');
                break;
            case "F4BR2_2":
            include('R_map2_2.html');
                break;
            case "F4BD1":
            include('D_map1.html');
                break;
            case "F4BU1":
            include('U_map1.html');
                break;
            case "F4BL1":
            include('L_map1.html');
                break;
            case "F4E":
            include('teach.html');
                break;
            case "F4M":
            include('map.html');
                break;
            case "F4T":
            include('test.html');
                break;
            default:
            header("Location:./test?param1=F4D");
                    break;
            }
?>

