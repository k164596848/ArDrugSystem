<?php

// if(is_null($_GET['action']))
// {
//     $_GET['action'] = "";
// }

if (!isset($_GET['action'])) {
    header('Location:./Auth?param1=F2A');
} else {
    $control = explode('/', $_GET['action']);

    switch ($control[0]) {
        case 'Auth':
            include 'view/config_module_style.html';
            include 'view/Auth/controller.php';
            break;

        case 'AccountList':
             include 'view/config_module_style.html';
             include 'view/AccountList/controller.php';

             // no break
        case 'Basic':
             include 'view/config_module_style.html';
            break;
        case 'Announcement':
            include 'view/config_module_style.html';
            include 'view/Announcement/controller.php';

            // no break
        case 'Userlog':
            include 'view/config_module_style.html';
            include 'view/Userlog/controller.php';
            break;
        case 'Userdefend':
            include 'view/config_module_style.html';
            include 'view/Userdefend/controller.php';
            break;

        case 'Views':
             require 'view/controller.php';
            break;
        case 'mind_map': //1001賴
             require 'view/mind_map/controller.php';
            break;
        case 'Branchtest': //1015 揚
             require 'view/Branchtest/controller.php';
            break;
        case 'ARface': //1027 jiyang
             require 'view/ARface/controller.php';
            break;
        case 'rpg': //1110賴
             require 'view/rpg/controller.php';
            break;
    }
}
