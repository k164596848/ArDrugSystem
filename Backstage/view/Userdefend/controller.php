 <?php 
            $param = $_GET['param1'];
            switch($param) {    
                case "F3C":
                    include('Userdefend.html');
                    break;
                default:
                    header("Location:./Userdefend?param1=F3C");
                    break;
            }
?>