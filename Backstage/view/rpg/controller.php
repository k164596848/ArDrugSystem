 <?php
            $param = $_GET['param1'];
            switch ($param) {
                case 'role':
                    include 'rpg_role.html';
                    break;
                case 'background':
                    include 'rpg_background.html';
                    break;
                case 'quest':
                    include 'rpg_quest.html';
                    break;
                default:
                    header('Location:./rpg?param1=quest');
                    break;
            }
?>