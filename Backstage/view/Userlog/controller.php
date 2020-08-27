<?php

session_start();
$param = $_GET['param1'];
switch ($param) {
    case 'F6A':
        if ($_SESSION['rights'] == '1') {
            include 'Userlog.html';
            break;
        } elseif ($_SESSION['rights'] == '2' || $_SESSION['rights'] == '3') {
            header('Location:./Announcement?param1=B4A');
            break;
        }
       // no break
    default:
        if ($_SESSION['rights'] == '1') {
            header('Location:./Userlog?param1=F6A');
            break;
        } elseif ($_SESSION['rights'] == '2' || $_SESSION['rights'] == '3') {
            header('Location:./Announcement?param1=B4A');
            break;
        }
}
