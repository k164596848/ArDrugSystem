<?php 
    $param = $_GET['param1'];
        switch($param) {    
            case "F4BDL1":
            include('./view/test/map.html');
            include('D_map1.html');
                break;
            case "F4BDL2_1":
            include('./view/test/map.html');
            include('D_map2_1.html');
                break;
            case "F4BDL2_2":
            include('./view/test/map.html');
            include('D_map2_2.html');
                break;
            case "F4BDL2_3":
            include('./view/test/map.html');
            include('D_map2_3.html');
                break;            
            default:
            header("Location:./DownL?param1=F4BD1");
                    break;
            }
?>

