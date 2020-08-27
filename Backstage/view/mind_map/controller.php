 <?php
            $param = $_GET['param1'];
            switch ($param) {
                case 'branch1':
                    include 'map_first.html';
                    break;
                case 'branch2':
                    include 'map_second.html';
                    break;
                case 'branch3':
                    include 'map_third.html';
                    break;
                case 'branch4':
                    include 'map_description.html';
                    break;
                default:
                    header('Location:./mind_map?param1=branch1');
                    break;
            }
?>