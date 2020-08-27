<?php

/**
 * summary.
 */
class SearchTool_DB_event
{
    public static function DB_Event($method, $args)
    {
        include 'mod_db.php';
        date_default_timezone_set('Asia/Taipei');
        $ini_result = self::iniread(__pageroot.'ardrug.ini');
        switch ($method) {
            case 'login':
                $sql_inquery = $ini_result['data']['login']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['user_id'], PDO::PARAM_STR);
                $state->bindValue(2, $args['user_pw'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'loaduser':
                $sql_inquery = $ini_result['data']['loaduser']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'mind':
                $sql_inquery = $ini_result['data']['mind']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'level1':
                $sql_inquery = $ini_result['data']['level1']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['level1ser'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'level2':
                $sql_inquery = $ini_result['data']['level2']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['level1ser'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'totally':
                $sql_inquery = $ini_result['data']['totally']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['level1ser'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'record_path':
                $sql_inquery = $ini_result['data']['record_path']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['level1ser'], PDO::PARAM_STR);
                $state->bindValue(2, $args['username'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'check_path':
                $sql_inquery = $ini_result['data']['check_path']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['username'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'mapinfo':
                $sql_inquery = $ini_result['data']['mapinfo']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['ser'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'branchquest':
                $sql_inquery = $ini_result['data']['branchquest']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['ser'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'branchoption':
                $sql_inquery = $ini_result['data']['branchoption']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['ser'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'save_testlog':
                $sql_inquery = $ini_result['data']['save_testlog']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['quest_ser'], PDO::PARAM_STR);
                $state->bindValue(2, $args['result'], PDO::PARAM_STR);
                $state->bindValue(3, $args['username'], PDO::PARAM_STR);
                $state->bindValue(4, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                $state->bindValue(5, $args['branch_level'], PDO::PARAM_STR);

                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'check_testlog':
                $sql_inquery = $ini_result['data']['check_testlog']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['quest_ser'], PDO::PARAM_INT);
                $state->bindValue(2, $args['username'], PDO::PARAM_STR);

                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'update_testlog':
                $sql_inquery = $ini_result['data']['update_testlog']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[1], PDO::PARAM_STR);
                $state->bindValue(2, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                $state->bindValue(3, $args[0], PDO::PARAM_STR);

                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'rpg_quest':
                $sql_inquery = $ini_result['data']['rpg_quest']['sql'];
                $state = $conn->prepare($sql_inquery);
                // $state->bindValue(1,$args['ser'],PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'rpg_option':
                $sql_inquery = $ini_result['data']['rpg_option']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['qser'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'rpg_role':
                $sql_inquery = $ini_result['data']['rpg_role']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'rpg_bg':
                $sql_inquery = $ini_result['data']['rpg_bg']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'rpg_analysis':
                $sql_inquery = $ini_result['data']['rpg_analysis']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['userid'], PDO::PARAM_STR);
                $state->bindValue(2, $args['Friendly'], PDO::PARAM_STR);
                $state->bindValue(3, $args['Tough'], PDO::PARAM_STR);
                $state->bindValue(4, $args['Avoid'], PDO::PARAM_STR);
                $state->bindValue(5, $args['Sensitive'], PDO::PARAM_STR);
                $state->bindValue(6, $args['Timid'], PDO::PARAM_STR);
                $state->bindValue(7, $args['Curious'], PDO::PARAM_STR);
                $state->bindValue(8, $args['Crisis'], PDO::PARAM_STR);
                $state->bindValue(9, $args['Reaction'], PDO::PARAM_STR);
                $state->bindValue(10, $args['p_Introvert'], PDO::PARAM_STR);
                $state->bindValue(11, $args['p_outward'], PDO::PARAM_STR);
                $state->bindValue(12, $args['p_Sensitive'], PDO::PARAM_STR);
                $state->bindValue(13, $args['p_Friendly'], PDO::PARAM_STR);
                $state->bindValue(14, $args['p_Curious'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'analysis':
                $sql_inquery = $ini_result['data']['analysis']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'loadDrugStar':
                $sql_inquery = $ini_result['data']['loadDrugStar']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['userid'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'load_testlog':
                $sql_inquery = $ini_result['data']['load_testlog']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['userid'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'getRpgAnalysis':
                $sql_inquery = $ini_result['data']['getRpgAnalysis']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['userid'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'rpg_result'://10
                $sql_inquery = $ini_result['data']['rpg_result']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['user_id'], PDO::PARAM_STR);
                $state->bindValue(2, $args['result_type'], PDO::PARAM_STR);
                $state->bindValue(3, $args['result_content'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'getRpgResult':
                $sql_inquery = $ini_result['data']['getRpgResult']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['userid'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'webduino_angle':
                $sql_inquery = $ini_result['data']['webduino_angle']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['id'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            default:
                // code...
                break;
        }
    }

    //base
    private static function iniread($filename)
    {
        // $filename = __pageroot . __appsurl . $_REQUEST["para"];

        if (file_exists($filename)) {
            $result = parse_ini_file($filename, true);
        } else {
            $result = _error_message('general', '0003', '', $filename.' not found.');             //�  �
        }

        $result = array('data' => $result);

        return $result;
    }
}
