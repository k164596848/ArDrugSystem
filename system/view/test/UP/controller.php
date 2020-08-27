<?php 
    $param = $_GET['param1'];
        switch($param) {    
            case "F4BU1":
            include('./view/test/map.html');
            include('U_map1.html');     
                break;
            case "F4BU2_1":
            include('./view/test/map.html');
            include('U_map2_1.html');
                break;
            case "F4BU2_3":
            include('./view/test/map.html');
            include('U_map2_3.html');
                break;            
            case "F4BU2_2":
            include('./view/test/map.html');
            include('U_map2_2.html');
                break;
            default:
            header("Location:./Up?param1=F4BU1");
                    break;
            }
?>

