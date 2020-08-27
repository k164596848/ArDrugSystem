
            <?php 
            $param = $_GET['param1'];
            switch($param) {    
                case "F4D":
                    include('DashboardContent.html');
                    break;
                case "F5D":
                    include('memberContent.html');
                    break;
                default:
                    header("Location:./Dashboard?param1=F3D");
                    break;
            }
            ?>

