<?php
            $param = $_GET['param1'];
            switch ($param) {
                case 'AF1':
                    include 'ARface.html';
                    break;
                default:
                    header('Location:./ARface?param1=AF1');
                    break;
            }
