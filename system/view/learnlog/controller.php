<?php
    $param = $_GET['param1'];
        switch ($param) {
            case 'LL1':
            include 'radar.html';
                break;

            default:
            header('Location:./learnlog?param1=LL1');
                    break;
            }
?>

