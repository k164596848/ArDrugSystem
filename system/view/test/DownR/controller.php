<?php 
    $param = $_GET['param1'];
        switch($param) {    
            case "F4BDR1":
            include('./view/test/map.html');
            include('D_map1.html');
                break;
            case "F4BDR2_1":
            include('./view/test/map.html');
            include('D_map2_1.html');
                break;
            case "F4BDR2_2":
            include('./view/test/map.html');
            include('D_map2_2.html');
                break;
            case "F4BDR2_3":
            include('./view/test/map.html');
            include('D_map2_3.html');
                break;            
            default:
            header("Location:./DownR?param1=F4BD1");
                    break;
            }
?>

