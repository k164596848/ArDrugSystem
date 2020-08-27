<?php 
    $param = $_GET['param1'];
        switch($param) {    
            case "F4BL1":
            include('./view/test/map.html');
            include('L_map1.html');
                break;
            case "F4BL2_1":
            include('./view/test/map.html');
            include('L_map2_1.html');
                break;
            case "F4BL2_2":
            include('./view/test/map.html');
            include('L_map2_2.html');
                break;
            case "F4BL2_3":
            include('./view/test/map.html');
            include('L_map2_3.html');
                break;            
            default:
            header("Location:./Left?param1=F4BL1");
                    break;
            }
?>

