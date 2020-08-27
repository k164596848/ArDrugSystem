<?php

// include_once("mod_file.php");
    require '../vendor/phpmailer/src/Exception.php';
    require '../vendor/phpmailer/src/PHPMailer.php';
    require '../vendor/phpmailer/src/SMTP.php';
    require_once '../vendor/autoload.php';
define('__pageroot', dirname(__FILE__).'/');
define('__logindir', 'layout/login/0/');
define('__memindexdir', 'layout/memberIndex/0/');
define('__inidir', 'route/');
define('PHPEXCEL', dirname(__FILE__).'/core/Classes/');
ini_set('display_errors', 'On');
date_default_timezone_set('Asia/Taipei');
include PHPEXCEL.'PHPExcel.php';
include 'db_event.php';
session_start();
$action = explode(':', $_GET['action']);
$res['errmsg'] = '資料讀取有誤!';
$isChecked = false;
Action_Event($action);

function Action_Event($action)
{
    switch ($action[0]) {
        case '_checkauth':

            if (!empty($_SESSION['usercode']) && !empty($_SESSION['username'])) {
//                if($isChecked === true)
//                {
//                    $result = array();
//                    $res['isc'] = true;
//                }
//                else
//                {
//                    $result =  array();
//                    $res['isc'] = false;
//                    $res['actionurl'] = 'Dashboard?param1=F3D';
//                    $isChecked = true;
//                }
                $result = array();
                $res['actionurl'] = '#';
            } else {
                $isChecked = false;
                $result = false;
                $res['actionurl'] = 'Auth?param1=F2A';
            }
            break;
        case 'checkLogin':
            if (!empty($_POST['usercode']) && !empty($_POST['userpsw'])) {
                if (SearchTool_DB_event::DB_Event('isAccountLock', $_POST)) {
                    $result = SearchTool_DB_event::DB_Event('checkLogin', $_POST);
                    $res['errmsg'] = $result['code_msg'];
                    switch ($result['code']) {
                        case 000:

                            $_SESSION['usercode'] = $result['data'][0]['USER_ID'];
                            $_SESSION['useremail'] = $result['data'][0]['EMAIL'];
                            $_SESSION['username'] = $result['data'][0]['USERNAME'];
                            $_SESSION['userdepartment'] = $result['data'][0]['D_ID'];
                            $_SESSION['rights'] = $result['data'][0]['RIGHTS'];
                            //$result = array();
                            $res['actionurl'] = 'Announcement?param1=B4A';
                            $isChecked = true;
                            break;
                        case 100:
                        case 200:
                            $result = false;
                            break;
                    }
                } else {
                    $res['errmsg'] = '帳戶已被鎖定，請通知管理員！';
                    $result = false;
                }
            } else {
                $res['errmsg'] = '帳號密碼不可為空!';
                $result = false;
            }
            break;

        case 'accountlist':
            $result = SearchTool_DB_event::DB_Event('accountlist', array());
            break;
        case 'loginrecord':
            $result = SearchTool_DB_event::DB_Event('loginrecord', array());
            break;
        case 'loadUserEvent':
            $result = SearchTool_DB_event::DB_Event('loadUserEvent', $_POST);
            break;
        case 'unlockAccount':
            $result = SearchTool_DB_event::DB_Event('unlockAcc', $_POST);

            if (!is_array($result)) {
                $res['errmsg'] = '解除鎖失敗！';
            } else {
                $res['errmsg'] = '解除鎖定成功！';
            }

            break;
        case 'addAccount':
            if (!empty($_POST['usercode']) && !empty($_POST['userpsw'])) {
                $result = SearchTool_DB_event::DB_Event('addAccount', $_POST);

                if (!is_array($result)) {
                    $res['errmsg'] = '新增失敗！';
                } else {
                    $res['errmsg'] = '新增成功！';
                }
            } else {
                $result = false;
                $res['errmsg'] = '帳號密碼不可空白！';
            }

            break;
        case 'editAccount':
                if (!empty($_POST['username'])) {
                    $result = SearchTool_DB_event::DB_Event('editAccount', $_POST);

                    if (!is_array($result)) {
                        $res['errmsg'] = '修改失敗！';
                    } else {
                        $res['errmsg'] = '修改成功！';
                    }
                } else {
                    $result = false;
                    $res['errmsg'] = '姓名不可空白！';
                }

                break;
        case 'user_editAccount':

                    $result = SearchTool_DB_event::DB_Event('user_editAccount', $_POST);

                    if (!is_array($result)) {
                        $res['errmsg'] = '修改失敗！';
                    } else {
                        $res['errmsg'] = '修改成功！';
                    }

                break;
         case 'deleteAccount':
            $result = SearchTool_DB_event::DB_Event('deleteAccount', $_POST);

            if (!is_array($result)) {
                $res['errmsg'] = '刪除失敗！';
            } else {
                $res['errmsg'] = '刪除成功！';
            }

            break;
        case 'paymentlist':
            $result = SearchTool_DB_event::DB_Event('paymentlist', array());
            break;
        case 'loadpaymentEvent':
            $result = SearchTool_DB_event::DB_Event('loadpayEvent', $_POST);
            break;
        case 'logout':
            unset($_SESSION['usercode']);
            unset($_SESSION['username']);
            unset($_SESSION['userdepartment']);
            unset($_SESSION['rights']);
             $isChecked = false;
            $result = array();
            break;
        case 'frontBGSet':
            $targetdir = '../pic/';
            $newfilename = 'bg';
            //var_dump($_FILES['csvuploadinput']);
            //exit();
            if ($_FILES['bgimginput']) {
                if ($_FILES['bgimginput']['size'] > 1000000) {
                    $res['errmsg'] = '檔案大小不可以大於1M喔！';
                    $result = false;
                } else {
                    move_uploaded_file($_FILES['bgimginput']['tmp_name'], $targetdir.$newfilename);
                    $res['errmsg'] = '圖片上傳成功！';
                    $result = array();
                }
            } else {
                $res['errmsg'] = '請重新上傳圖片！';
                $result = false;
            }

            break;
        case 'bannerSet':
            $targetdir = '../pic/';
            $newfilename = 'banner';
            //var_dump($_FILES['bannerimginput']);
            //exit();
            if ($_FILES['bannerimginput']) {
                if ($_FILES['bannerimginput']['size'] > 1000000) {
                    $res['errmsg'] = '檔案大小不可以大於1M喔！';
                    $result = false;
                } else {
                    move_uploaded_file($_FILES['bannerimginput']['tmp_name'], $targetdir.$newfilename);
                    $res['errmsg'] = '圖片上傳成功！';
                    $result = array();
                }
            } else {
                $res['errmsg'] = '請重新上傳圖片！';
                $result = false;
            }

            break;
        case 'logoSet':
            $targetdir = '../pic/';
            $newfilename = 'logo';
            //var_dump($_FILES['logoimginput']);
            //exit();
            if ($_FILES['logoimginput']) {
                if ($_FILES['logoimginput']['size'] > 1000000) {
                    $res['errmsg'] = '檔案大小不可以大於1M喔！';
                    $result = false;
                } else {
                    move_uploaded_file($_FILES['logoimginput']['tmp_name'], $targetdir.$newfilename);
                    $res['errmsg'] = '圖片上傳成功！';
                    $result = array();
                }
            } else {
                $res['errmsg'] = '請重新上傳圖片！';
                $result = false;
            }

            break;
        case 'clearengineCode':
            $result = SearchTool_DB_event::DB_Event('cleareCode', $_POST);

            if (!is_array($result)) {
                $res['errmsg'] = '清空失敗！';
            } else {
                $res['errmsg'] = '清空成功！';
            }

            break;
        case 'clearoemCode':
            $result = SearchTool_DB_event::DB_Event('clearoCode', $_POST);

            if (!is_array($result)) {
                $res['errmsg'] = '清空失敗！';
            } else {
                $res['errmsg'] = '清空成功！';
            }

            break;
        case 'clearproductImage':
            $result = SearchTool_DB_event::DB_Event('clearpImage', $_POST);

            if (!is_array($result)) {
                $res['errmsg'] = '清空失敗！';
            } else {
                $res['errmsg'] = '清空成功！';
            }

            break;

        case 'Preview_Department_option'://獲取所有部門ID
            $result = SearchTool_DB_event::DB_Event('DepartmentOption', array());
            break;
        case 'SupervisorOption'://獲取所有主管資料
            $result = SearchTool_DB_event::DB_Event('SupervisorOption', array());
            break;
        case 'Preview_personal_option'://獲取所有使用者ID
            $result = SearchTool_DB_event::DB_Event('PersonalOption', array());
            break;
        case 'getCategory':
            $result = SearchTool_DB_event::DB_Event('getCategory', array());
            break;
        case 'addCategory':
            if (!empty($_POST['category'])) {
                $result = SearchTool_DB_event::DB_Event('addCategory', $_POST);

                if (!is_array($result)) {
                    $res['errmsg'] = '新增失敗！';
                } else {
                    $res['errmsg'] = '新增成功！';
                }
            } else {
                $result = false;
                $res['errmsg'] = '類別名稱不可空白！';
            }

            break;
        case 'editCategory':
            if (!empty($_POST['cateid'])) {
                $result = SearchTool_DB_event::DB_Event('editCategory', $_POST);

                if (!is_array($result)) {
                    $res['errmsg'] = '修改失敗！';
                } else {
                    $res['errmsg'] = '修改成功！';
                }
            } else {
                $result = false;
                $res['errmsg'] = '姓名不可空白！';
            }

            break;
        case 'loadCateEvent':
            $result = SearchTool_DB_event::DB_Event('loadCateEvent', $_POST);
            break;
        case 'deletecate':
            $result = SearchTool_DB_event::DB_Event('deletecate', $_POST);

            if (!is_array($result)) {
                $res['errmsg'] = '刪除失敗！';
            } else {
                $res['errmsg'] = '刪除成功！';
            }

            break;
            //部門
        case 'getdepartment':
            $result = SearchTool_DB_event::DB_Event('getdepartment', array());
            break;
        case 'adddepartment':
            if (!empty($_POST['department'])) {
                $result = SearchTool_DB_event::DB_Event('adddepartment', $_POST);

                if (!is_array($result)) {
                    $res['errmsg'] = '新增失敗！';
                } else {
                    $res['errmsg'] = '新增成功！';
                }
            } else {
                $result = false;
                $res['errmsg'] = '部門名稱不可空白！';
            }

            break;
        case 'editdepartment':
            if (!empty($_POST['departid'])) {
                $result = SearchTool_DB_event::DB_Event('editdepartment', $_POST);

                if (!is_array($result)) {
                    $res['errmsg'] = '修改失敗！';
                } else {
                    $res['errmsg'] = '修改成功！';
                }
            } else {
                $result = false;
                $res['errmsg'] = '姓名不可空白！';
            }

            break;
        case 'loaddepartEvent':
            $result = SearchTool_DB_event::DB_Event('loaddepartEvent', $_POST);
            break;
        case 'deletedepart':
            $result = SearchTool_DB_event::DB_Event('deletedepart', $_POST);

            if (!is_array($result)) {
                $res['errmsg'] = '刪除失敗！';
            } else {
                $res['errmsg'] = '刪除成功！';
            }

            break;
         //部門 end
            //主管
        case 'getmanager':
            $result = SearchTool_DB_event::DB_Event('getmanager', array());
            break;
        case 'addmanager':
            if (!empty($_POST['manager'])) {
                $result = SearchTool_DB_event::DB_Event('addmanager', $_POST);

                if (!is_array($result)) {
                    $res['errmsg'] = '新增失敗！';
                } else {
                    $res['errmsg'] = '新增成功！';
                }
            } else {
                $result = false;
                $res['errmsg'] = '主管名稱不可空白！';
            }

            break;
        case 'editmanager':
            if (!empty($_POST['manaid'])) {
                $result = SearchTool_DB_event::DB_Event('editmanager', $_POST);

                if (!is_array($result)) {
                    $res['errmsg'] = '修改失敗！';
                } else {
                    $res['errmsg'] = '修改成功！';
                }
            } else {
                $result = false;
                $res['errmsg'] = '姓名不可空白！';
            }

            break;
        case 'loadmanaEvent':
            $result = SearchTool_DB_event::DB_Event('loadmanaEvent', $_POST);
            break;
        case 'deletemana':
            $result = SearchTool_DB_event::DB_Event('deletemana', $_POST);

            if (!is_array($result)) {
                $res['errmsg'] = '刪除失敗！';
            } else {
                $res['errmsg'] = '刪除成功！';
            }

            break;
        //主管end
        //領域
        case 'load_first_branch': //1001賴
            $result = SearchTool_DB_event::DB_Event('load_first_branch', array());

            break;
        case 'add_first_map': //1001賴
            //獲取使用者輸入資料
            $branch_name = $_POST['firstbranch_name'];
            //var_dump($branch_name);
            //exit();
            $result = SearchTool_DB_event::DB_Event('add_first_map', array($branch_name, '1'));
            if (!is_array($result)) {
                $res['errmsg'] = '新增失敗！';
            } else {
                $res['errmsg'] = '新增成功！';
            }
            break;
        case 'loadbranch':    //1001賴
            $result = SearchTool_DB_event::DB_Event('loadbranch', $_POST);
            break;
        case 'editbranch':     //1001賴
            $branch_name = $_POST['ed_firstbranch_name'];
            $ser = $_POST['branch_ser'];
            //var_dump($branch_name,$ser);
            //exit();
                $result = SearchTool_DB_event::DB_Event('editfirstbranch', array($branch_name, $ser));

            if (!is_array($result)) {
                $res['errmsg'] = '更新失敗！';
            } else {
                $res['errmsg'] = '更新成功！';
            }
            break;
        case 'deletebranch':        //1001賴

            $result = SearchTool_DB_event::DB_Event('deletebranch', $_POST);

            if (!is_array($result)) {
                $res['errmsg'] = '刪除失敗！';
            } else {
                $res['errmsg'] = '刪除成功！';
            }

            break;
        case 'load_second_branch': //1001賴
            $ser = $_GET['ser'];
            $result = SearchTool_DB_event::DB_Event('load_second_branch', array($ser));
            break;
        case 'add_second_map':  //1001賴
            //獲取使用者輸入資料
            $level = $_POST['first_branch'];
            $branch_name = $_POST['firstbranch_name'];

            $result = SearchTool_DB_event::DB_Event('add_second_map', array($branch_name, '2', $level));
            if (!is_array($result)) {
                $res['errmsg'] = '新增失敗！';
            } else {
                $res['errmsg'] = '新增成功！';
            }
            break;
        case 'loadtop_class':      //1001賴
            $ser = $_GET['ser'];
            $result = SearchTool_DB_event::DB_Event('loadtop_class', array($ser));
            break;
        case 'load_third_branch': //1001賴
            $ser = $_GET['ser'];
            $result = SearchTool_DB_event::DB_Event('load_third_branch', array($ser));
            break;
        case 'add_third_map':  //1001賴
            //獲取使用者輸入資料
            $level = $_POST['first_branch'];
            $branch_name = $_POST['firstbranch_name'];

            $result = SearchTool_DB_event::DB_Event('add_third_map', array($branch_name, '3', $level));
            if (!is_array($result)) {
                $res['errmsg'] = '新增失敗！';
            } else {
                $res['errmsg'] = '新增成功！';
            }
            break;
        case 'load_branch_des': //1001賴
            $ser = $_GET['ser'];
            $result = SearchTool_DB_event::DB_Event('load_branch_des', array($ser));
            break;
        case 'add_map_des':  //1001賴
            //獲取使用者輸入資料
            $level = $_POST['first_branch'];
            $branch_name = $_POST['firstbranch_name'];

            $result = SearchTool_DB_event::DB_Event('add_map_des', array($branch_name, '4', $level));
            if (!is_array($result)) {
                $res['errmsg'] = '新增失敗！';
            } else {
                $res['errmsg'] = '新增成功！';
            }
            break;
        case 'load_branch_quest': //1001賴
            $ser = $_GET['ser'];
            $result = SearchTool_DB_event::DB_Event('load_branch_quest', array($ser));
            break;
        case 'add_branch_quest':  //1015揚
            //獲取使用者輸入資料
            $branch_ser = $_POST['first_branch']; //分支流水號
            $question_content = $_POST['firstbranch_name']; //輸入的內容
            $check = 0;
            if (!empty($_POST['answer1'])) {
                ++$check;
            }
            if (!empty($_POST['answer2'])) {
                ++$check;
            }
            if (!empty($_POST['answer3'])) {
                ++$check;
            }

            if ($check <= 1) {
                $result = SearchTool_DB_event::DB_Event('add_branch_quest', array($question_content, $branch_ser, '0'));
            } else {
                $result = SearchTool_DB_event::DB_Event('add_branch_quest', array($question_content, $branch_ser, '1'));
            }
            if (!is_array($result)) {
                $res['errmsg'] = '新增失敗！';
            } else {
                $res['errmsg'] = '新增成功！';
            }

            $getQuestion_ser = SearchTool_DB_event::DB_Event('get_quest_ser', array($question_content));
            $quest_ser = $getQuestion_ser[0]['ser'];

            for ($i = 1; $i <= 3; ++$i) {
                $options_content = $_POST['branch_option'.$i];
                if (!empty($_POST['answer'.$i])) {
                    $ans = $_POST['answer'.$i];
                } else {
                    $ans = 0;
                }
                //$optoin_answer = $_POST['answer'.$i];
                //存空選項
                if (!empty($options_content)) {
                    $add_options = SearchTool_DB_event::DB_Event('add_branch_options', array($options_content, $ans, $quest_ser));
                }
                //  var_dump( $optoin_answer);
            }

            break;

        case 'load_quest_and_options':    //1015 jiyang
            $result = SearchTool_DB_event::DB_Event('load_quest_and_options', $_POST);
            break;
        case 'editbranchquest_and_option':     //1015 jiyang
            $branch_question = $_POST['ed_branch_quest_content'];
            $quest_ser = $_POST['branch_quest_ser'];
            //var_dump($branch_name,$ser);
            //exit();
            $check = 0;
            if (!empty($_POST['ed_answer1'])) {
                ++$check;
            }
            if (!empty($_POST['ed_answer2'])) {
                ++$check;
            }
            if (!empty($_POST['ed_answer3'])) {
                ++$check;
            }

            if ($check <= 1) {
                $result = SearchTool_DB_event::DB_Event('editbranchquest', array($branch_question, $quest_ser, '0'));
            } else {
                $result = SearchTool_DB_event::DB_Event('editbranchquest', array($branch_question, $quest_ser, '1'));
            }
            if (!is_array($result)) {
                $res['errmsg'] = '更新失敗！';
            } else {
                $res['errmsg'] = '更新成功！';
            }

            for ($i = 1; $i <= 3; ++$i) {
                $ed_options_ser = $_POST['branch_option'.$i.'_ser'];
                $ed_options_content = $_POST['ed_branch_option'.$i];
                if (!empty($_POST['ed_answer'.$i])) {
                    $ans = $_POST['ed_answer'.$i];
                } else {
                    $ans = 0;
                }

                //$ed_answer = $_POST['ed_answer'.$i];
                //存空選項
                if (!empty($ed_options_content)) {
                    $add_options = SearchTool_DB_event::DB_Event('editbranchoptions', array($ed_options_content, $ans, $ed_options_ser));
                }
            }

            break;
        case 'deletebranch_question': //1019 jiyang

            $result = SearchTool_DB_event::DB_Event('deletebranch_question', $_POST);
            $result1 = SearchTool_DB_event::DB_Event('deletebranch_options', $_POST);

            if (!is_array($result)) {
                $res['errmsg'] = '刪除失敗！';
            } else {
                $res['errmsg'] = '刪除成功！';
            }

            break;

            default:
            // code...
            break;
        case 'arfacelist': //1027 jiyang
            $result = SearchTool_DB_event::DB_Event('arfacelist', array());
            break;
        
        case 'addARface':
            $drugname = $_POST['add_drug_name'];
            $druginfo = $_POST['add_drug_info'];

            $targetdir = '../pic/arface_img/'; //img存檔資料夾
            $drugimg = $_FILES['class_source']['name'];
            
            $filetype = $_FILES['class_source']['type'];
            $filesize = $_FILES['class_source']['size'];

            if (!empty($_POST['add_mode'])) {//判定模式
                $drugmode = $_POST['add_mode'];
            } else {
                $drugmode = 0;
            }

            $result = SearchTool_DB_event::DB_Event('addARface', array($drugname, $druginfo, 'pic/arface_img/'.$drugimg, $drugmode));

            if (!is_array($result)) {
                $res['errmsg'] = '新增失敗！';
            } else {
                if (!file_exists('../pic/arface_img/') && !is_dir('../pic/arface_img/')) {
                    mkdir('../pic/arface_img/', 0777, true);
                }
                move_uploaded_file($_FILES['class_source']['tmp_name'], $targetdir.$drugimg);
                $result = array();
                $res['errmsg'] = '新增成功！';
            }

            break;

        case 'deleteARface':
            $result1 = SearchTool_DB_event::DB_Event('find_pic_address', $_POST);
            $deletefilename = $result1[0]['pic_address'];
            if (file_exists('../'.$deletefilename)) {
                unlink('../'.$deletefilename);
            }
            $result = SearchTool_DB_event::DB_Event('deleteARface', $_POST);

            if (!is_array($result)) {
                $res['errmsg'] = '刪除失敗！';
            } else {
                $res['errmsg'] = '刪除成功！';
            }

            break;
        case 'loadARface':
            $result = SearchTool_DB_event::DB_Event('loadARface', $_POST);
            break;
       
        case 'editARface':

            $drugname = $_POST['ed_drug_name'];
            $druginfo = $_POST['ed_drug_info'];
          
            $ser = $_POST['drug_ser'];

            if (!empty($_POST['ed_mode'])) {//判定模式
                $drugmode = $_POST['ed_mode'];
            } else {
                $drugmode = 0;
            }

            $targetdir = '../pic/arface_img/'; //img存檔資料夾

            //file info
            $drugimg = $_FILES['img_source']['name'];
            $filetype = $_FILES['img_source']['type'];
            $filesize = $_FILES['img_source']['size'];

            $deletefilename = $_POST['old_address'];//原本存的位置
            if($drugimg!=null)//如果有上傳新檔案
            {
                if (file_exists('../'.$deletefilename)) 
                {
                    unlink('../'.$deletefilename);
                }
                //搬移新圖存進資料庫
                move_uploaded_file($_FILES['img_source']['tmp_name'], $targetdir.$drugimg);
                $result = SearchTool_DB_event::DB_Event('editARface', array($drugname,$druginfo ,'pic/arface_img/'.$drugimg,$drugmode,$ser));  
            }
            else//圖保持原樣，更新其他的東西
            {
                $result = SearchTool_DB_event::DB_Event('editARface', array($drugname,$druginfo , $deletefilename,$drugmode,$ser));                  
            }
           
            

            if (!is_array($result)) {
                $res['errmsg'] = '修改失敗！';
            } else {
                $res['errmsg'] = '修改成功！';
            }

            break;
		 case 'add_role':
            //獲取使用者輸入資料
            $role_name = $_POST['role_name'];
			$role_code = $_POST['role_code'];
            $targetdir = '../pic/role/';
            $oldfilename = $_FILES['role_img']['name'];
            $sourcetype = explode('.', $oldfilename);
            $filetype = $_FILES['role_img']['type'];
            $filesize = $_FILES['role_img']['size'];
            //var_dump($role_name,$oldfilename.$role_code);
            //exit();
            $result = SearchTool_DB_event::DB_Event('add_role', array($role_code, './pic/role/'.$role_code.'.'.$sourcetype[1], $role_name));
            if (!is_array($result)) {
                $res['errmsg'] = '新增失敗！請再次嘗試。';
            } else {
                if (!file_exists('../pic/role') && !is_dir('../pic/role')) {
                    mkdir('../pic/role', 0777, true);
                }
				$rpg_route = $targetdir.$role_code.'.'.$sourcetype[1];
				$tmpname = iconv("UTF-8", "big5", $rpg_route );
                move_uploaded_file($_FILES['role_img']['tmp_name'], $tmpname);
                $result = array();
                $res['errmsg'] = '新增成功！';
            }
            break;
		case 'rolelist':
            $result = SearchTool_DB_event::DB_Event('rolelist', array());
            break;
		case 'loadrole':
            $result = SearchTool_DB_event::DB_Event('loadrole', $_POST);
            break;
		case 'editrole':
			$role_name = $_POST['ed_role_name'];
			$role_code = $_POST['ed_role_code'];
            $ser = $_POST['role_ser'];
            if (empty($_FILES['ed_role_img']['name'])) {
                $result = SearchTool_DB_event::DB_Event('editrole', array($role_code,$role_name, $ser));
            } else {
                $targetdir = '../pic/role/';
                $oldfilename = $_FILES['ed_role_img']['name'];
                $sourcetype = explode('.', $oldfilename);
                $filetype = $_FILES['ed_role_img']['type'];
                $filesize = $_FILES['ed_role_img']['size'];
                $result1 = SearchTool_DB_event::DB_Event('loadrolefile', array($ser)); //先拿出舊有資料進行刪除圖片
                $deletefilename = $result1[0]['role'];
                if (file_exists('.'.$deletefilename)) {
                    unlink('.'.$deletefilename);
                }
                //搬移新圖存進資料庫
				$rpg_route = $targetdir.$role_code.'.'.$sourcetype[1];
				$tmpname = iconv("UTF-8", "big5", $rpg_route );
                move_uploaded_file($_FILES['ed_role_img']['tmp_name'], $tmpname);
                $result = SearchTool_DB_event::DB_Event('editrole2', array($role_code, './pic/role/'.$role_code.'.'.$sourcetype[1], $role_name, $ser));
				$result = array();//讓只修改圖片也能通過
            }
            if (!is_array($result)) {
                $res['errmsg'] = '更新失敗！';
            } else {
                        $res['errmsg'] = '更新成功！';
                    }
            break;
		case 'deleterole':
            $result1 = SearchTool_DB_event::DB_Event('loadrole', $_POST);
            $deletefilename = $result1[0]['role'];
            if (file_exists('.'.$deletefilename)) {
                unlink('.'.$deletefilename);
            }
            $result = SearchTool_DB_event::DB_Event('deleterole', $_POST);

            if (!is_array($result)) {
                $res['errmsg'] = '刪除失敗！';
            } else {
                $res['errmsg'] = '刪除成功！';
            }

            break;
		
		
		
		case 'add_bg':
            //獲取使用者輸入資料
            $bg_name = $_POST['bg_name'];
			$bg_code = $_POST['bg_code'];
            $targetdir = '../pic/bg/';
            $oldfilename = $_FILES['bg_img']['name'];
            $sourcetype = explode('.', $oldfilename);
            $filetype = $_FILES['bg_img']['type'];
            $filesize = $_FILES['bg_img']['size'];
           /*var_dump($bg_name,$oldfilename.$bg_code);
            exit();*/
            $result = SearchTool_DB_event::DB_Event('add_bg', array($bg_code, './pic/bg/'.$bg_code.'.'.$sourcetype[1], $bg_name));
            if (!is_array($result)) {
                $res['errmsg'] = '新增失敗！請再次嘗試。';
            } else {
                if (!file_exists('../pic/bg') && !is_dir('../pic/bg')) {
                    mkdir('../pic/bg', 0777, true);
                }
				$rpg_route = $targetdir.$bg_code.'.'.$sourcetype[1];
				$tmpname = iconv("UTF-8", "big5", $rpg_route );
                move_uploaded_file($_FILES['bg_img']['tmp_name'], $tmpname);
                $result = array();
                $res['errmsg'] = '新增成功！';
            }
            break;
		case 'bglist':
            $result = SearchTool_DB_event::DB_Event('bglist', array());
            break;
		case 'loadbg':
            $result = SearchTool_DB_event::DB_Event('loadbg', $_POST);
            break;
		case 'editbg':
			$bg_name = $_POST['ed_bg_name'];
			$bg_code = $_POST['ed_bg_code'];
            $ser = $_POST['bg_ser'];
            if (empty($_FILES['ed_bg_img']['name'])) {
                $result = SearchTool_DB_event::DB_Event('editbg', array($bg_code,$bg_name, $ser));
            } else {
                $targetdir = '../pic/bg/';
                $oldfilename = $_FILES['ed_bg_img']['name'];
                $sourcetype = explode('.', $oldfilename);
                $filetype = $_FILES['ed_bg_img']['type'];
                $filesize = $_FILES['ed_bg_img']['size'];
                $result1 = SearchTool_DB_event::DB_Event('loadbgfile', array($ser)); //先拿出舊有資料進行刪除圖片
                $deletefilename = $result1[0]['background'];
                if (file_exists('.'.$deletefilename)) {
                    unlink('.'.$deletefilename);
                }
                //搬移新圖存進資料庫
				$rpg_route = $targetdir.$bg_code.'.'.$sourcetype[1];
				$tmpname = iconv("UTF-8", "big5", $rpg_route );
                move_uploaded_file($_FILES['ed_bg_img']['tmp_name'], $tmpname);
                $result = SearchTool_DB_event::DB_Event('editbg2', array($bg_code, './pic/bg/'.$bg_code.'.'.$sourcetype[1], $bg_name, $ser));
				$result = array();//讓只修改圖片也能通過
            }
            if (!is_array($result)) {
                $res['errmsg'] = '更新失敗！';
            } else {
                        $res['errmsg'] = '更新成功！';
                    }
            break;
		case 'deletebg':
            $result1 = SearchTool_DB_event::DB_Event('loadbg', $_POST);
            $deletefilename = $result1[0]['background'];
            if (file_exists('.'.$deletefilename)) {
                unlink('.'.$deletefilename);
            }
            $result = SearchTool_DB_event::DB_Event('deletebg', $_POST);

            if (!is_array($result)) {
                $res['errmsg'] = '刪除失敗！';
            } else {
                $res['errmsg'] = '刪除成功！';
            }

            break;
		case 'add_quest':
			$Total_file = $_POST['Total_file'];
			$Total_option = $_POST['Total_option'];
			$group = $_POST['group'];
			$rpg_qnum = $_POST['rpg_qnum'];
			//var_dump($Total_file,$Total_option);
			//exit();
			$file_str = "";
			if($group =='4'){
				$file_str = $file_str."=";
				/*for($i=1;$i<=$Total_file;$i++){
				//$rpg_background = $_POST['rpg_background'.$i];
				$rpg_role = $_POST['rpg_role'.$i];
				$rpg_content = $_POST['rpg_content'.$i];
				if($i ==1){
					//if($rpg_background != 0){
					//$file_str = $file_str . $rpg_background . '@';}
					$file_str = $file_str . $rpg_role . '$';
					$file_str = $file_str . $rpg_content;
				}else{
					$file_str = $file_str . '#';
					//if($rpg_background != 0){
					//$file_str = $file_str . $rpg_background . '@';}
					$file_str = $file_str . $rpg_role . '$';
					$file_str = $file_str . $rpg_content;
				}
				
			}*/
			$rpg_content = $_POST['rpg_content1'];
			$file_str = $file_str.$rpg_content;
			$result = SearchTool_DB_event::DB_Event('add_quest', array($rpg_qnum,$file_str,$group));
			if (!is_array($result)) {
                $res['errmsg'] = '新增失敗！';
            } else {
                $res['errmsg'] = '新增成功！';
            }
			
			}else{
			for($i=1;$i<=$Total_file;$i++){
				$rpg_background = $_POST['rpg_background'.$i];
				$rpg_role = $_POST['rpg_role'.$i]; //B%老奶奶
				$rpg_content = $_POST['rpg_content'.$i];
				if($i ==1){
					if($rpg_background != 0){
					$file_str = $file_str . $rpg_background . '@';}
					$file_str = $file_str . $rpg_role. '$';
					$file_str = $file_str . $rpg_content;
				}else{
					$file_str = $file_str . '#';
					if($rpg_background != 0){
					$file_str = $file_str . $rpg_background . '@';}
					$file_str = $file_str . $rpg_role. '$';
					$file_str = $file_str . $rpg_content;
				}
				
			}
			/*var_dump($file_str);
			exit();*/
			
            $result1 = SearchTool_DB_event::DB_Event('add_quest', array($rpg_qnum,$file_str,$group));
			$result2 = SearchTool_DB_event::DB_Event('loadnew_quest', array($file_str,$group));//撈出新增進去的ser值 以利後續新增選項表
            $ser = $result2[0]['ser'];
			
			for($i=1;$i<=$Total_option;$i++){
				$rpg_option = $_POST['rpg_option'.$i];
				$rpg_attr = $_POST['rpg_attr'.$i];
				$rpg_next = $_POST['rpg_next'.$i];
				$result = SearchTool_DB_event::DB_Event('add_option', array($rpg_qnum,$rpg_option,$rpg_attr,$rpg_next));
			}

            if (!is_array($result)) {
                $res['errmsg'] = '新增失敗！';
            } else {
                $res['errmsg'] = '新增成功！';
            }
			}
            break;
		case 'quest_list':
            $result = SearchTool_DB_event::DB_Event('quest_list', $_POST);
            break;
		case 'loadquest':
            $result = SearchTool_DB_event::DB_Event('loadquest', $_POST);
            break;
		case 'loadoption':
            $result = SearchTool_DB_event::DB_Event('loadoption', $_POST);
            break;
		case 'editquest':
			$Total_file = $_POST['ed_Total_file'];
			$Total_option = $_POST['ed_Total_option'];
			$group = $_POST['ed_group'];
			$ed_rpg_qnum = $_POST['ed_rpg_qnum'];
			$ser = $_POST['ed_ser'];
			$file_str = "";
			
			if($group =='4'){
				$file_str = $file_str."=";
				/*for($i=1;$i<=$Total_file;$i++){
				$rpg_role = $_POST['ed_rpg_role'.$i];
				$rpg_content = $_POST['ed_rpg_content'.$i];
				if($i ==1){
					$file_str = $file_str . $rpg_role . '$';
					$file_str = $file_str . $rpg_content;
				}else{
					$file_str = $file_str . '#';
					$file_str = $file_str . $rpg_role . '$';
					$file_str = $file_str . $rpg_content;
				}
				}*/
				$rpg_content = $_POST['ed_rpg_content1'];
				$file_str = $file_str.$rpg_content;
				$result1 = SearchTool_DB_event::DB_Event('ed_quest', array($ed_rpg_qnum,$file_str,$group,$ser));
				$result2 = SearchTool_DB_event::DB_Event('del_option', array($ser));//先刪選項表
				$result = array(); //直接通過 讓未更改內容也可過關
				if (!is_array($result)) {
					$res['errmsg'] = '修改失敗！';
				} else {
					$res['errmsg'] = '修改成功！';
				}
			
			}else{
			
			for($i=1;$i<=$Total_file;$i++){
				$rpg_background = $_POST['ed_rpg_background'.$i];
				$rpg_role = $_POST['ed_rpg_role'.$i];
				$rpg_content = $_POST['ed_rpg_content'.$i];
				if($i ==1){
					if($rpg_background != 0){
					$file_str = $file_str . $rpg_background . '@';}
					$file_str = $file_str . $rpg_role . '$';
					$file_str = $file_str . $rpg_content;
				}else{
					$file_str = $file_str . '#';
					if($rpg_background != 0){
					$file_str = $file_str . $rpg_background . '@';}
					$file_str = $file_str . $rpg_role . '$';
					$file_str = $file_str . $rpg_content;
				}
				
			}
            $result1 = SearchTool_DB_event::DB_Event('ed_quest', array($ed_rpg_qnum,$file_str,$group,$ser));
			$result2 = SearchTool_DB_event::DB_Event('del_option', array($ser));//先刪選項表
			for($i=1;$i<=$Total_option;$i++){
				$rpg_option = $_POST['ed_rpg_option'.$i];
				$rpg_attr = $_POST['ed_rpg_attr'.$i];
				$rpg_next = $_POST['ed_rpg_next'.$i];
				$result = SearchTool_DB_event::DB_Event('add_option', array($ed_rpg_qnum,$rpg_option,$rpg_attr,$rpg_next));
			}
			$result = array(); //直接通過 讓未更改內容也可過關
            if (!is_array($result)) {
                $res['errmsg'] = '修改失敗！';
            } else {
                $res['errmsg'] = '修改成功！';
            }
			}
            break;
			case 'deletequest':
            $result2 = SearchTool_DB_event::DB_Event('del_option2', $_POST);//先刪選項表
            $result = SearchTool_DB_event::DB_Event('deletequest', $_POST);//再刪題目表

            if (!is_array($result)) {
                $res['errmsg'] = '刪除失敗！';
            } else {
                $res['errmsg'] = '刪除成功！';
            }

            break;
    }

    if (is_bool($result)) {
        $res['message'] = 'failed';
        $res['data'] = null;
    } else {
        $res['message'] = 'success';
        $res['data'] = $result;
    }

    echo json_encode($res);
}
function respTimer($process, $total, $count)
{
//    echo true;
//    echo $count;
    return round(($process / $total) * 100);
}
function checkCSVcolums($kind, $checkcolnameArray)
{
    switch ($kind) {
        case 'importECode':
            $columsName = array('Maunfacturer', 'Model', 'Year', 'BOXO I/N(item no)', 'Engine size', 'Engine code');

            try {
                $res = true;
                foreach ($columsName as $key => $value) {
                    if ($value != $checkcolnameArray[$key]) {
                        $res = false;
                    }
                }
            } catch (Exception $e) {
                $res = false;
            }

            return $res;

            break;
        case 'importOCode':
            $columsName = array('BOXO I/N(item no)', 'Description', 'OEMcode');

            try {
                $res = true;
                foreach ($columsName as $key => $value) {
                    if ($value != $checkcolnameArray[$key]) {
                        $res = false;
                    }
                }
            } catch (Exception $e) {
                $res = false;
            }

            return $res;

            break;
    }
}
