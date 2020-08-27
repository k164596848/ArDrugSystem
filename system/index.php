<?php

if (!isset($_GET['action'])) {
    header('Location:./login?param1=F2A');
} else {
    $control = explode('/', $_GET['action']);

    switch ($control[0]) {
        case'login':
            require 'view/login/controller.php';
            break;
        case'Auth':
            require 'view/Auth/controller.php';
            break;
        case'Right':
            require 'view/test/Right/controller.php';
            break;
        case'test':
            require 'view/test/controller.php';
            break;
        case'Left':
            require 'view/test/Left/controller.php';
            break;
        case'Up':
            require 'view/test/Up/controller.php';
            break;
        case'DownR':
            require 'view/test/DownR/controller.php';
            break;
        case'DownL':
            require 'view/test/DownL/controller.php';
            break;
         case'ar_face':
            require 'view/ar_face/controller.php';
            break;
        case'situation':
            require 'view/situation/controller.php';
            break;
        case'learnlog':
            require 'view/learnlog/controller.php';
            break;
        case 'Views':
             require 'view/controller.php';
            break;
    }
}
