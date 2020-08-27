<?php

// include_once("mod_file.php");
define('__pageroot', dirname(__FILE__).'/');
define('__logindir', 'layout/login/0/');
define('__memindexdir', 'layout/memberIndex/0/');
define('__inidir', 'route/');
// ini_set("display_errors", "On");

include 'db_event.php';
session_start();
$action = explode(':', $_GET['action']);
$res['errmsg'] = '資料讀取有誤!';
$isChecked = false;
Action_Event($action);

function Action_Event($action)
{
    switch ($action[0]) {
            case 'login':

                $result = SearchTool_DB_event::DB_Event('login', $_POST);

                if (!is_array($result)) {
                    $res['errmsg'] = '登入失敗！';
                } else {
                    $res['errmsg'] = '登入成功！';
                    $_SESSION['id'] = $result[0]['USER_ID'];
                }

                break;
            case 'loaduser':
                $result = SearchTool_DB_event::DB_Event('loaduser', $_POST);
                break;
            case 'mind':
                $result = SearchTool_DB_event::DB_Event('mind', $_POST);
                break;
            case 'level1':
                $result = SearchTool_DB_event::DB_Event('level1', $_POST);
                break;
            case 'level2':
                $result = SearchTool_DB_event::DB_Event('level2', $_POST);
                break;
            case 'totally':
                $result = SearchTool_DB_event::DB_Event('totally', $_POST);
                break;
            case 'record_path':
                $result = SearchTool_DB_event::DB_Event('record_path', $_POST);
                break;
            case 'check_path':
                $result = SearchTool_DB_event::DB_Event('check_path', $_POST);
                break;
            case 'mapinfo':
                $result = SearchTool_DB_event::DB_Event('mapinfo', $_POST);
                break;
            case 'mapinfo':
                $result = SearchTool_DB_event::DB_Event('mapinfo', $_POST);
                break;
            case 'branchquest':
                $result = SearchTool_DB_event::DB_Event('branchquest', $_POST);
                break;
            case 'branchoption':
                $result = SearchTool_DB_event::DB_Event('branchoption', $_POST);
                break;
            case 'save_testlog': //1203 jiyang
                $isTestlogExsit = SearchTool_DB_event::DB_Event('check_testlog', $_POST);
                if (!is_array($isTestlogExsit)) {//沒有存在紀錄
                    $result = SearchTool_DB_event::DB_Event('save_testlog', $_POST); //直接存入紀錄
                } else {//有存在
                    $TestlogSer = $isTestlogExsit[0]['ser']; //該題目的紀錄流水號
                    //更新題目
                    $result = SearchTool_DB_event::DB_Event('update_testlog', array($TestlogSer, $_POST['result']));
                }

                break;
            case 'load_testlog':
                $result = SearchTool_DB_event::DB_Event('load_testlog', $_POST);
                break;
            case 'rpg_quest':
                $result = SearchTool_DB_event::DB_Event('rpg_quest', $_POST);
                break;
            case 'rpg_option':
                $result = SearchTool_DB_event::DB_Event('rpg_option', $_POST);
                break;
            case 'rpg_role':
                $result = SearchTool_DB_event::DB_Event('rpg_role', $_POST);
                break;
            case 'rpg_bg':
                $result = SearchTool_DB_event::DB_Event('rpg_bg', $_POST);
                break;
            case 'rpg_analysis':
                $result = SearchTool_DB_event::DB_Event('rpg_analysis', $_POST);
                break;
            case 'analysis':
                $result = SearchTool_DB_event::DB_Event('analysis', $_POST);
                break;
            case 'loadDrugStar':
                $result = SearchTool_DB_event::DB_Event('loadDrugStar', $_POST);
                break;
            case 'getRpgAnalysis':
                $result = SearchTool_DB_event::DB_Event('getRpgAnalysis', $_POST);
                break;
            case 'rpg_result'://10
                $result = SearchTool_DB_event::DB_Event('rpg_result', $_POST);
                break;
            case 'getRpgResult':
                $result = SearchTool_DB_event::DB_Event('getRpgResult', $_POST);
                break;
			case 'webduino_angle':
				$result = SearchTool_DB_event::DB_Event('webduino_angle', $_POST);
				break;
        default:
            // code...
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
function encryptStr($str, $key)
{
}
