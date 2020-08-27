 <?php
            $param = $_GET['param1'];
            switch ($param) {
                case 'branchtest':
                    include 'branchtest.html';
                    break;
                case 'branchquest':
                    include 'branchquest.html';
                    break;
                case 'branchoptions':
                    include 'branchoptions.html';
                    break;

                default:
                    header('Location:./Branchtest?param1=branchtest');
                    break;
            }
?>