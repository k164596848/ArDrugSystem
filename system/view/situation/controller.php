<?php 
    $param = $_GET['param1'];
        switch($param) {    
            case "F4D":
             include('rpg_index.html');
            include('toliet.html');
                break;
            case "F4C":
            include('s_notice.html');
                break;
            case "F4I":
            include('rpg_index.html');
                break;
            case "F4R":
            include('result.html');
                break;
            default:
            header("Location:./situation?param1=F4D");
                    break;
            }
?>

