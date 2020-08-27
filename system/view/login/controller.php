<?php
    $param = $_GET['param1'];
        switch ($param) {
            case 'F4D':
            include 'qrcode.html';
                break;
            case 'F4A':
            include 'login.html';
                break;
            case 'F4B':
            include 'index.html';
                break;
            default:
            header('Location:./login?param1=F4D');
                    break;
            }
?>

