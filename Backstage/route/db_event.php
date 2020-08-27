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
        $ini_result = self::iniread(__pageroot.'ardrugs.ini');
        switch ($method) {
            case 'isAccountLock':
                $sql_inquery = $ini_result['data']['isAccountLock']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['usercode'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return true;
                 } else {
                     return false;
                 }
                break;
            case 'checkLogin':
                $sql_inquery = $ini_result['data']['checkLoginAccount']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['usercode'], PDO::PARAM_STR);
                $state->execute();

                if ($state->rowCount() < 1) { //無該帳號
                    return array('code' => 100, 'code_msg' => '系統中無此帳號');
                } else {
                    $sql_inquery1 = $ini_result['data']['checkLoginPwd']['sql'];

                    $state1 = $conn->prepare($sql_inquery1);
                    $state1->bindValue(1, $args['usercode'], PDO::PARAM_STR);
                    $state1->bindValue(2, ($args['userpsw']), PDO::PARAM_STR);
                    $state1->execute();

                    if ($state1->rowCount() < 1) { //密碼錯誤
                        $errnum; //錯誤次數變數
                        $errmsg; //錯誤訊息
                        //是否有過登入紀錄
                        $sql_inqueryerr = $ini_result['data']['pwdError']['sql'];
                        $state_err = $conn->prepare($sql_inqueryerr);
                        $state_err->bindValue(1, $args['usercode'], PDO::PARAM_STR);
                        $state_err->execute();
                        $errmsg = '密碼錯誤';
                        if ($state_err->rowCount() < 1) {  //沒有登入紀錄，新增
                            $sql_inquery2 = $ini_result['data']['loginlog']['sql'];

                            $state2 = $conn->prepare($sql_inquery2);
                            $state2->bindValue(1, $args['usercode'], PDO::PARAM_STR);
                            $state2->bindValue(2, $_SERVER['REMOTE_ADDR'], PDO::PARAM_STR);
                            $state2->bindValue(3, $_SERVER['REMOTE_ADDR'], PDO::PARAM_STR);
                            $state2->bindValue(4, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                            $state2->bindValue(5, 'F', PDO::PARAM_STR);
                            $state2->bindValue(6, 1, PDO::PARAM_INT);
                            $state2->bindValue(7, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                            $state2->bindValue(8, 'SYSTEM', PDO::PARAM_STR);
                            $state2->execute();
                        } else { //有登入紀錄，更新
                            $row = $state_err->fetchAll();

                            if (!is_numeric((int) $row[0]['forgetpsd'])) { //第一次錯誤登入
                                $errnum = 1;
                            } else {
                                $errnum = (int) $row[0]['forgetpsd'] + 1;
                            }

                            if ($errnum <= 5) { //限制五次錯誤
                                $sql_inquery2 = $ini_result['data']['upadtePwdError']['sql'];

                                $state2 = $conn->prepare($sql_inquery2);
                                $state2->bindValue(1, $errnum, PDO::PARAM_INT);
                                $state2->bindValue(2, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                                $state2->bindValue(3, 'SYSTEM', PDO::PARAM_STR);
                                $state2->bindValue(4, $args['usercode'], PDO::PARAM_STR);
                                $state2->execute();

                                $errmsg = '密碼錯誤'.$errnum.'次';
                            } else { //鎖定使用者帳戶
                                $sql_inquery2 = $ini_result['data']['lockAccount']['sql'];

                                $state2 = $conn->prepare($sql_inquery2);
                                $state2->bindValue(1, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                                $state2->bindValue(2, 'SYSTEM', PDO::PARAM_STR);
                                $state2->bindValue(3, $args['usercode'], PDO::PARAM_STR);
                                $state2->execute();

                                $errmsg = '您已錯誤輸入五次密碼，帳戶已被鎖定，請通知管理員！';
                            }
                        }

                        return array('code' => 200, 'code_msg' => $errmsg);   //密碼錯誤
                    } else {
                        $sql_inquery2 = $ini_result['data']['loginlog']['sql'];

                        $state2 = $conn->prepare($sql_inquery2);
                        $state2->bindValue(1, $args['usercode'], PDO::PARAM_STR);
                        $state2->bindValue(2, $_SERVER['REMOTE_ADDR'], PDO::PARAM_STR);
                        $state2->bindValue(3, $_SERVER['REMOTE_ADDR'], PDO::PARAM_STR);
                        $state2->bindValue(4, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                        $state2->bindValue(5, 'S', PDO::PARAM_STR);
                        $state2->bindValue(6, 0, PDO::PARAM_INT);
                        $state2->bindValue(7, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                        $state2->bindValue(8, 'SYSTEM', PDO::PARAM_STR);
                        $state2->execute();

                        return array('code' => 000, 'code_msg' => '登入成功', 'data' => $state1->fetchAll());
                    }
                }
                break;
            case 'accountlist':
                $sql_inquery = $ini_result['data']['accountlist']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'loginrecord':
                $sql_inquery = $ini_result['data']['loginrecord']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'loadUserEvent':
                $sql_inquery = $ini_result['data']['loadUserEvent']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['usercode'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'addAccount':
                $sql_inquery = $ini_result['data']['addAccount']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['usercode'], PDO::PARAM_STR);
                $state->bindValue(2, $args['username'], PDO::PARAM_STR);
                $state->bindValue(3, ($args['userpsw']), PDO::PARAM_STR);
                $state->bindValue(4, $args['extension'], PDO::PARAM_STR);
                $state->bindValue(5, $args['email'], PDO::PARAM_STR);
                $state->bindValue(6, $args['s_id'], PDO::PARAM_STR);
                $state->bindValue(7, $args['d_id'], PDO::PARAM_STR);
                $state->bindValue(8, $args['rights'], PDO::PARAM_STR);
                $state->bindValue(9, $args['builder'], PDO::PARAM_STR);
                $state->bindValue(10, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                $state->bindValue(11, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                $state->bindValue(12, $args['builder'], PDO::PARAM_STR);
                $state->bindValue(13, 0, PDO::PARAM_INT);

                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'editAccount':
                $sql_inquery = $ini_result['data']['editAccount']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['username'], PDO::PARAM_STR);
                $state->bindValue(2, $args['userpsw'], PDO::PARAM_STR);
                $state->bindValue(3, $args['extension'], PDO::PARAM_STR);
                $state->bindValue(4, $args['s_id'], PDO::PARAM_STR);
                $state->bindValue(5, $args['d_id'], PDO::PARAM_STR);
                $state->bindValue(6, $args['rights'], PDO::PARAM_STR);
                $state->bindValue(7, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                $state->bindValue(8, $args['builder'], PDO::PARAM_STR);
                $state->bindValue(9, $args['usercode'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'user_editAccount':
                $sql_inquery = $ini_result['data']['user_editAccount']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['userpsw'], PDO::PARAM_STR);
                $state->bindValue(2, $args['extension'], PDO::PARAM_STR);
                $state->bindValue(3, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                $state->bindValue(4, $args['usercode'], PDO::PARAM_STR);
                $state->bindValue(5, $args['usercode'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'deleteAccount':
                $sql_inquery = $ini_result['data']['deleteAccount']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['usercode'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'unlockAcc':
                $sql_inquery = $ini_result['data']['unlockAccount']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                $state->bindValue(2, 'SYSTEM', PDO::PARAM_STR);
                $state->bindValue(3, $args['usercode'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 //eturn $conn->errorInfo();
                 } else {
                     $sql_inquery = $ini_result['data']['updateLoginLog']['sql'];

                     $state = $conn->prepare($sql_inquery);
                     $state->bindValue(1, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                     $state->bindValue(2, 'SYSTEM', PDO::PARAM_STR);
                     $state->bindValue(3, $args['usercode'], PDO::PARAM_STR);
                     $state->execute();

                     if ($state->rowCount() < 1) {
                         return false;
                     } else {
                         return $state->fetchAll();
                     }
                 }
                break;
            case 'paymentlist':
                $sql_inquery = $ini_result['data']['paymentlist']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'loadpayEvent':
                $sql_inquery = $ini_result['data']['loadpayment']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['id'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;

             case 'fieldphone': //抓取領域按鈕 10
                $sql_inquery = $ini_result['data']['fieldphone']['sql'];
                 $state = $conn->prepare($sql_inquery);
                 $state->execute();

                  if ($state->rowCount() < 1) {
                      return false;
                  } else {
                      return $state->fetchAll();
                  }
                 break;
            case 'countID'://523-31
                 if ($args['u_right'] >= 3) {
                     $sql_inquery = $ini_result['data']['countID']['sql'];
                     $state = $conn->prepare($sql_inquery);
                     $state->bindValue(1, $args['userid'], PDO::PARAM_STR);
                     $state->execute();
                 } else {
                     $sql_inquery = $ini_result['data']['supercountID']['sql'];
                     $state = $conn->prepare($sql_inquery);
                     $state->execute();
                 }

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                 break;
            case 'countmyarticle':
                 $sql_inquery = $ini_result['data']['countmyarticle']['sql'];
                 $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['userid'], PDO::PARAM_STR);
                 $state->execute();
                  if ($state->rowCount() < 1) {
                      return false;
                  } else {
                      return $state->fetchAll();
                  }
                 break;
            case 'aviweloglist':
                 if ($args['u_right'] >= 3 || $args['u_right'] == 'unknow') {
                     $sql_inquery = $ini_result['data']['aviweloglist']['sql'];
                     $state = $conn->prepare($sql_inquery);
                     $state->bindValue(1, $args['userid'], PDO::PARAM_STR);
                     $state->execute();
                 } else {
                     $sql_inquery = $ini_result['data']['adminaviweloglist']['sql'];
                     $state = $conn->prepare($sql_inquery);
                     $state->bindValue(1, $args['u_right'], PDO::PARAM_INT);
                     $state->execute();
                 }

                  if ($state->rowCount() < 1) {
                      return false;
                  } else {
                      return $state->fetchAll();
                  }
                 break;
            case 'viewlist':
                 $sql_inquery = $ini_result['data']['viewlist']['sql'];
                 $state = $conn->prepare($sql_inquery);
                 $state->bindValue(1, $args['articleID'], PDO::PARAM_STR);
                 $state->execute();

                  if ($state->rowCount() < 1) {
                      return false;
                  } else {
                      return $state->fetchAll();
                  }
                 break;
             case'searchcontent':
                  $sql_inquery = $ini_result['data']['searchcontent']['sql'];
                 $state = $conn->prepare($sql_inquery);
                 $state->bindValue(1, $args['articleID'], PDO::PARAM_STR);
                 $state->execute();

                if ($state->rowCount() < 1) {
                    return false;
                } else {
                    return $state->fetchAll();
                }
                 break;
            case'fileinfo':
                 $sql_inquery = $ini_result['data']['fileinfo']['sql'];
                 $state = $conn->prepare($sql_inquery);
                 $state->bindValue(1, $args['articleID'], PDO::PARAM_STR);
                 $state->execute();

                if ($state->rowCount() < 1) {
                    return false;
                } else {
                    return $state->fetchAll();
                }
                 break;
            case'voteinfo':
                 $sql_inquery = $ini_result['data']['voteinfo']['sql'];
                 $state = $conn->prepare($sql_inquery);
                 $state->bindValue(1, $args['articleID'], PDO::PARAM_STR);
                 $state->execute();

                if ($state->rowCount() < 1) {
                    return false;
                } else {
                    return $state->fetchAll();
                }
                 break;
            case'votetotal':
                 $sql_inquery = $ini_result['data']['votetotal']['sql'];
                 $state = $conn->prepare($sql_inquery);
                 $state->bindValue(1, $args['A_ID'], PDO::PARAM_STR);
                 $state->execute();

                if ($state->rowCount() < 1) {
                    return false;
                } else {
                    return $state->fetchAll();
                }
                 break;
            case'voteinfo2':  //新增投票前的判斷
                 $sql_inquery = $ini_result['data']['voteinfo2']['sql'];
                 $state = $conn->prepare($sql_inquery);
                 $state->bindValue(1, $args[0], PDO::PARAM_STR);
                 $state->execute();

                if ($state->rowCount() < 1) {
                    return false;
                } else {
                    return $state->fetchAll();
                }
                 break;
            case'optionsinfo':
                 $sql_inquery = $ini_result['data']['optionsinfo']['sql'];
                 $state = $conn->prepare($sql_inquery);
                 $state->bindValue(1, $args['voteID'], PDO::PARAM_STR);
                 $state->execute();

                if ($state->rowCount() < 1) {
                    return false;
                } else {
                    return $state->fetchAll();
                }
                 break;
            case'insertoptions':

                $sql_inquery = $ini_result['data']['insertoptions']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->bindValue(2, $args[1], PDO::PARAM_STR);
                $state->bindValue(3, $args[2], PDO::PARAM_STR);
                $state->execute();

                if ($state->rowCount() < 1) {
                    return false;
                } else {
                    return $state->fetchAll();
                }
                 break;
            case'loadvotelog':  //讀取紀錄RRR
                 $sql_inquery = $ini_result['data']['loadvotelog']['sql'];
                 $state = $conn->prepare($sql_inquery);
                 $state->bindValue(1, $args[0], PDO::PARAM_STR);
                 $state->execute();

                if ($state->rowCount() < 1) {
                    return false;
                } else {
                    return $state->fetchAll();
                }
                 break;
            case'delvotelog':  //讀取紀錄RRR
                 $sql_inquery = $ini_result['data']['delvotelog']['sql'];
                 $state = $conn->prepare($sql_inquery);
                 $state->bindValue(1, $args[0], PDO::PARAM_STR);
                 $state->bindValue(2, $args[1], PDO::PARAM_STR);
                 $state->execute();

                if ($state->rowCount() < 1) {
                    return false;
                } else {
                    return $state->fetchAll();
                }
                 break;
            case'loada_view_log':  //讀取紀錄RRR
                 $sql_inquery = $ini_result['data']['loada_view_log']['sql'];
                 $state = $conn->prepare($sql_inquery);
                 $state->bindValue(1, $args['A_ID'], PDO::PARAM_STR);
                 $state->bindValue(2, $args['userID'], PDO::PARAM_STR);
                 $state->execute();

                if ($state->rowCount() < 1) {
                    return false;
                } else {
                    return $state->fetchAll();
                }
                 break;
            case 'articleViewLog':
                 $sql_inquery = $ini_result['data']['articleViewLog']['sql'];
                 $state = $conn->prepare($sql_inquery);
                 $state->bindValue(1, $args['articleID'], PDO::PARAM_STR);
                 $state->bindValue(2, $args['userid'], PDO::PARAM_STR);

                 $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                 break;
            case 'checkViewLog':
                 $sql_inquery = $ini_result['data']['checkViewLog']['sql'];
                  $state = $conn->prepare($sql_inquery);
                 $state->bindValue(1, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                 $state->bindValue(2, $args['userid'], PDO::PARAM_STR);
                 $state->bindValue(3, $args['articleID'], PDO::PARAM_STR);

                 $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case'favoritelist':
                $sql_inquery = $ini_result['data']['favoritelist']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['userid'], PDO::PARAM_STR);

                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'addFavorite':
                 $sql_inquery = $ini_result['data']['addFavorite']['sql'];
                  $state = $conn->prepare($sql_inquery);
                 $state->bindValue(1, $args['userid'], PDO::PARAM_STR);
                 $state->bindValue(2, $args['articleID'], PDO::PARAM_STR);

                 $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'disFavorite':
                 $sql_inquery = $ini_result['data']['disFavorite']['sql'];
                  $state = $conn->prepare($sql_inquery);
                 $state->bindValue(1, $args['userid'], PDO::PARAM_STR);
                 $state->bindValue(2, $args['articleID'], PDO::PARAM_STR);

                 $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'addrecycle':
                 $sql_inquery = $ini_result['data']['addrecycle']['sql'];
                  $state = $conn->prepare($sql_inquery);
                 $state->bindValue(1, $args['userid'], PDO::PARAM_STR);
                 $state->bindValue(2, $args['articleID'], PDO::PARAM_STR);

                 $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'disrecycle':
                 $sql_inquery = $ini_result['data']['disrecycle']['sql'];
                  $state = $conn->prepare($sql_inquery);
                 $state->bindValue(1, $args['userid'], PDO::PARAM_STR);
                 $state->bindValue(2, $args['articleID'], PDO::PARAM_STR);

                 $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'addArticle':

                $sql_inquery = $ini_result['data']['addArticle']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->bindValue(2, $args[1], PDO::PARAM_STR);
                $state->bindValue(3, $args[2], PDO::PARAM_STR);
                $state->bindValue(4, $args[3], PDO::PARAM_STR);
                $state->bindValue(5, $args[4], PDO::PARAM_STR);
                $state->bindValue(6, $args[5], PDO::PARAM_STR);
                $state->bindValue(7, $args[6], PDO::PARAM_STR);
                $state->bindValue(8, $args[7], PDO::PARAM_INT);

                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                     echo "\nPDO::errorInfo():\n";
                     print_r($state->errorInfo());
                     exit();
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'getAID':

                $sql_inquery = $ini_result['data']['getAID']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->bindValue(2, $args[1], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'addfile':

                $sql_inquery = $ini_result['data']['addfile']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->bindValue(2, $args[1], PDO::PARAM_STR);
                $state->bindValue(3, $args[2], PDO::PARAM_STR);
                $state->bindValue(4, $args[3], PDO::PARAM_STR);
                $state->bindValue(5, $args[4], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'addd_rights':

                $sql_inquery = $ini_result['data']['addd_rights']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->bindValue(2, $args[1], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'addp_rights':

                $sql_inquery = $ini_result['data']['addp_rights']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->bindValue(2, $args[1], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'GetAllID':

                $sql_inquery = $ini_result['data']['GetAllID']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'GetUserID':  //抓取mail的信箱

                $sql_inquery = $ini_result['data']['GetUserID']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'add_view_log':
                $sql_inquery = $ini_result['data']['add_view_log']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->bindValue(2, $args[1], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'GetAlldepartmentID':
                $sql_inquery = $ini_result['data']['GetAlldepartmentID']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'getCategory':
                $sql_inquery = $ini_result['data']['getCategory']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'addCategory':
                $sql_inquery = $ini_result['data']['addCategory']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['category'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'loadCateEvent':
                $sql_inquery = $ini_result['data']['loadCateEvent']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['cateid'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'editCategory':
                $sql_inquery = $ini_result['data']['editCategory']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['category'], PDO::PARAM_STR);
                $state->bindValue(2, $args['cateid'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'deletecate':
                $sql_inquery = $ini_result['data']['deletecate']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['cateid'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
             // 部門
            case 'getdepartment':
                $sql_inquery = $ini_result['data']['getdepartment']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'adddepartment':
                $sql_inquery = $ini_result['data']['adddepartment']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['departid'], PDO::PARAM_STR);
                $state->bindValue(2, $args['department'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'editdepartment':
                $sql_inquery = $ini_result['data']['editdepartment']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['department'], PDO::PARAM_STR);
                $state->bindValue(2, $args['departid'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'loaddepartEvent':
                $sql_inquery = $ini_result['data']['loaddepartEvent']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['departid'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'deletedepart':
                $sql_inquery = $ini_result['data']['deletedepart']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['departid'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            //部門end
           case 'getmanager':
                $sql_inquery = $ini_result['data']['getmanager']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'addmanager':
                $sql_inquery = $ini_result['data']['addmanager']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['manaid'], PDO::PARAM_STR);
                $state->bindValue(2, $args['manager'], PDO::PARAM_STR);
                $state->bindValue(3, $args['manaextension'], PDO::PARAM_STR);
                $state->bindValue(4, $args['manamail'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'editmanager':
                $sql_inquery = $ini_result['data']['editmanager']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['manager'], PDO::PARAM_STR);
                $state->bindValue(2, $args['manaextension'], PDO::PARAM_STR);
                $state->bindValue(3, $args['manamail'], PDO::PARAM_STR);
                $state->bindValue(4, $args['manaid'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'loadmanaEvent':
                $sql_inquery = $ini_result['data']['loadmanaEvent']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['manaid'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'deletemana':
                $sql_inquery = $ini_result['data']['deletemana']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['manaid'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
                //主管end
                // 領域
            case 'getfield':
                $sql_inquery = $ini_result['data']['getfield']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'addfield':
                $sql_inquery = $ini_result['data']['addfield']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['fielid'], PDO::PARAM_STR);
                $state->bindValue(2, $args['field'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'editfield':
                $sql_inquery = $ini_result['data']['editfield']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['field'], PDO::PARAM_STR);
                $state->bindValue(2, $args['fielid'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'loadfielEvent':
                $sql_inquery = $ini_result['data']['loadfielEvent']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['fielid'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'deletefiel':
                $sql_inquery = $ini_result['data']['deletefiel']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['fielid'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
                //領域end
            case 'DepartmentOption':
                $sql_inquery = $ini_result['data']['DepartmentOption']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'PersonalOption':
                $sql_inquery = $ini_result['data']['PersonalOption']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'SupervisorOption':
                $sql_inquery = $ini_result['data']['SupervisorOption']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'dprights': //觀看人員撈出部門的人員 4/24 張育瑋
                $sql_inquery = $ini_result['data']['dprights']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['dp'], PDO::PARAM_STR);
                 $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'getpersondp': //觀看人員撈出人員的部門id 4/24 張育瑋
                 $sql_inquery = $ini_result['data']['getpersondp']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['userid'], PDO::PARAM_STR);
                 $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'loadview': //觀看人員撈出人員的部門id 4/27 張育瑋
                 $sql_inquery = $ini_result['data']['loadview']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['articleID'], PDO::PARAM_STR);
                 $state->execute();

                if ($state->rowCount() < 1) {
                    $result['loadview'] = false;
                } else {
                    $result['loadview'] = $state->fetchAll();
                }

                $sql_inquery2 = $ini_result['data']['loadfile']['sql'];

                $state2 = $conn->prepare($sql_inquery2);
                $state2->bindValue(1, $args['articleID'], PDO::PARAM_STR);
                $state2->execute();

                if ($state2->rowCount() < 1) {
                    $result['loadfile'] = false;
                } else {
                    $result['loadfile'] = $state2->fetchAll();
                }

                $sql_inquery3 = $ini_result['data']['loadvote']['sql'];

                $state3 = $conn->prepare($sql_inquery3);
                $state3->bindValue(1, $args['articleID'], PDO::PARAM_STR);
                $state3->execute();

                if ($state3->rowCount() < 1) {
                    $result['loadvote'] = false;
                } else {
                    $result['loadvote'] = $state3->fetchAll();
                }

                return $result;
                break;
            case 'loadold_article':  //撈出舊有文章資料 4/28 賴俊斵

                $sql_inquery = $ini_result['data']['loadold_article']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'loadarticle_vision':  //撈出log表中 文章版次 4/28 賴俊斵

                $sql_inquery = $ini_result['data']['loadarticle_vision']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'add_article_log':  //將舊有資料存進log資料表 4/28賴俊斵

                $sql_inquery = $ini_result['data']['add_article_log']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->bindValue(2, $args[1], PDO::PARAM_STR);
                $state->bindValue(3, $args[2], PDO::PARAM_STR);
                $state->bindValue(4, $args[3], PDO::PARAM_STR);
                $state->bindValue(5, $args[4], PDO::PARAM_STR);
                $state->bindValue(6, $args[5], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'ed_Article': //將新文章更新至Article資料表 4/28賴俊斵

                $sql_inquery = $ini_result['data']['ed_Article']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->bindValue(2, $args[1], PDO::PARAM_STR);
                $state->bindValue(3, $args[2], PDO::PARAM_STR);
                $state->bindValue(4, $args[3], PDO::PARAM_STR);
                $state->bindValue(5, $args[4], PDO::PARAM_STR);
                $state->bindValue(6, $args[5], PDO::PARAM_STR);
                $state->bindValue(7, $args[6], PDO::PARAM_STR);
                $state->bindValue(8, $args[7], PDO::PARAM_STR);

                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                     echo "\nPDO::errorInfo():\n";
                     print_r($state->errorInfo());
                     exit();
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'delete_file':  //刪除file表中舊有資料  4/28 賴俊斵

                $sql_inquery = $ini_result['data']['delete_file']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'delete_viewlog':  //刪除a_view_log表中舊有資料 4/28 賴俊斵

                $sql_inquery = $ini_result['data']['delete_viewlog']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'loadold_article2':  //撈出舊有文章資料 4/28 賴俊斵

                $sql_inquery = $ini_result['data']['loadold_article']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['articleID'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'add_article_del':  //將舊有資料存進del資料表 4/28賴俊斵

                $sql_inquery = $ini_result['data']['add_article_del']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->bindValue(2, $args[1], PDO::PARAM_STR);
                $state->bindValue(3, $args[2], PDO::PARAM_STR);
                $state->bindValue(4, $args[3], PDO::PARAM_STR);
                $state->bindValue(5, $args[4], PDO::PARAM_STR);
                $state->bindValue(6, $args[5], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'delete_file2':  //刪除file表中資料 使用dataAry  4/29 賴俊斵

                $sql_inquery = $ini_result['data']['delete_file']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['articleID'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'delete_viewlog2':  //刪除a_view_log表中資料 使用dataAry 4/29 賴俊斵

                $sql_inquery = $ini_result['data']['delete_viewlog']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['articleID'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'delete_article_log':  //刪除article_log表中資料 使用dataAry 4/29 賴俊斵

                $sql_inquery = $ini_result['data']['delete_article_log']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['articleID'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'delete_Article2':  //刪除file表中舊有資料 使用dataAry  4/28 賴俊斵

                $sql_inquery = $ini_result['data']['delete_Article']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['articleID'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case'searchcontent':
                 $sql_inquery = $ini_result['data']['searchcontent']['sql'];
                 $state = $conn->prepare($sql_inquery);
                 $state->bindValue(1, $args['articleID'], PDO::PARAM_STR);
                 $state->execute();

                if ($state->rowCount() < 1) {
                    return false;
                } else {
                    return $state->fetchAll();
                }
                 break;
                         case 'addcomment': //新增留言 5/6 10
                $sql_inquery = $ini_result['data']['addcomment']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['A_ID'], PDO::PARAM_STR);
                $state->bindValue(2, $args['content'], PDO::PARAM_STR);
                $state->bindValue(3, $args['userid'], PDO::PARAM_STR);
                $state->bindValue(4, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'loadcomment':  //撈出留言 5/6 10

                $sql_inquery = $ini_result['data']['loadcomment']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['A_ID'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'loadcommentnums':  //撈留言數量 5/6 10

                $sql_inquery = $ini_result['data']['loadcommentnums']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['A_ID'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
             case 'delcomment':

                $sql_inquery = $ini_result['data']['delcomment']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['ID'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'loadold_comment':  //撈出舊有留言資料 5/16 賴俊斵

                $sql_inquery = $ini_result['data']['loadold_comment']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['articleID'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'add_comment_del':  //將舊有資料存進留言del資料表 5/16 賴俊斵

                $sql_inquery = $ini_result['data']['add_comment_del']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->bindValue(2, $args[1], PDO::PARAM_STR);
                $state->bindValue(3, $args[2], PDO::PARAM_STR);
                $state->bindValue(4, $args[3], PDO::PARAM_STR);
                $state->bindValue(5, $args[4], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'delcomment2':  //將舊有留言資料刪除 5/16 賴俊斵

                $sql_inquery = $ini_result['data']['delcomment2']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['articleID'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'add_vote':  //新增投票資料 6/8 賴俊斵

                $sql_inquery = $ini_result['data']['add_vote']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->bindValue(2, $args[1], PDO::PARAM_STR);
                $state->bindValue(3, $args[2], PDO::PARAM_STR);
                $state->bindValue(4, $args[3], PDO::PARAM_STR);
                $state->bindValue(5, $args[4], PDO::PARAM_STR);
                $state->bindValue(6, $args[5], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'getVID':  //獲取vote資料表的VOTE_ID 6/8 賴俊斵

                $sql_inquery = $ini_result['data']['getVID']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->bindValue(2, $args[1], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'addoptions':  //新增選項資料 6/8 賴俊斵

                $sql_inquery = $ini_result['data']['addoptions']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->bindValue(2, $args[1], PDO::PARAM_STR);
                $state->bindValue(3, $args[2], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'delete_getVID':  //撈出待刪除之投票VID 6/8 賴俊斵

                $sql_inquery = $ini_result['data']['load_vote']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['articleID'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'delete_options':  //刪除options表中該文章所有資料  6/8 賴俊斵

                $sql_inquery = $ini_result['data']['delete_options']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'delete_vote':  //刪除vote表中該文章所有資料	7/3 賴俊斵

                $sql_inquery = $ini_result['data']['delete_vote']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'delete_vote_log':  //刪除vote_log表中該文章所有資料  7/3 賴俊斵

                $sql_inquery = $ini_result['data']['delete_vote_log']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'ed_vote':  //修改vote 7/3 賴俊斵

                $sql_inquery = $ini_result['data']['ed_vote']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->bindValue(2, $args[1], PDO::PARAM_STR);
                $state->bindValue(3, $args[2], PDO::PARAM_STR);
                $state->bindValue(4, $args[3], PDO::PARAM_STR);
                $state->bindValue(5, $args[4], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'load_VID':  //獲取vote的V_ID  7/3 賴俊斵

                $sql_inquery = $ini_result['data']['load_vote']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'grouplist':  //撈出群組名稱表 7/11 張育瑋
                $sql_inquery = $ini_result['data']['grouplist']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['userid'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
             case 'loadgroupperson':  //撈出群組名稱表 7/11 張育瑋
                $sql_inquery = $ini_result['data']['loadgroupperson']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['ser'], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'load_first_branch':  //1001賴
                $sql_inquery = $ini_result['data']['load_first_branch']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'add_first_map':  //1001賴
                $sql_inquery = $ini_result['data']['add_first_map']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->bindValue(2, $args[1], PDO::PARAM_STR);
                $state->bindValue(3, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                $state->bindValue(4, $_SESSION['usercode'], PDO::PARAM_STR);
                $state->bindValue(5, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                $state->bindValue(6, $_SESSION['usercode'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'loadbranch':  //1001賴
                $sql_inquery = $ini_result['data']['loadbranch']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['ser'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'editfirstbranch':  //1001賴
                $sql_inquery = $ini_result['data']['editfirstbranch']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->bindValue(2, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                $state->bindValue(3, $_SESSION['usercode'], PDO::PARAM_STR);
                $state->bindValue(4, $args[1], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'deletebranch':  //1001賴
                $sql_inquery = $ini_result['data']['deletebranch']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['ser'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'load_second_branch':  //1001賴
                $sql_inquery = $ini_result['data']['load_second_branch']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'add_second_map':  //1001賴
                $sql_inquery = $ini_result['data']['add_other_map']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->bindValue(2, $args[1], PDO::PARAM_STR);
                $state->bindValue(3, $args[2], PDO::PARAM_STR);
                $state->bindValue(4, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                $state->bindValue(5, $_SESSION['usercode'], PDO::PARAM_STR);
                $state->bindValue(6, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                $state->bindValue(7, $_SESSION['usercode'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'loadtop_class': //1001賴
                $sql_inquery = $ini_result['data']['loadtop_class']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'load_third_branch':  //1001賴
                $sql_inquery = $ini_result['data']['load_third_branch']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'add_third_map':  //1001賴
                $sql_inquery = $ini_result['data']['add_other_map']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->bindValue(2, $args[1], PDO::PARAM_STR);
                $state->bindValue(3, $args[2], PDO::PARAM_STR);
                $state->bindValue(4, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                $state->bindValue(5, $_SESSION['usercode'], PDO::PARAM_STR);
                $state->bindValue(6, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                $state->bindValue(7, $_SESSION['usercode'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'load_branch_des':  //1001賴
                $sql_inquery = $ini_result['data']['load_branch_des']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'add_map_des':  //1001賴
                $sql_inquery = $ini_result['data']['add_other_map']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->bindValue(2, $args[1], PDO::PARAM_STR);
                $state->bindValue(3, $args[2], PDO::PARAM_STR);
                $state->bindValue(4, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                $state->bindValue(5, $_SESSION['usercode'], PDO::PARAM_STR);
                $state->bindValue(6, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                $state->bindValue(7, $_SESSION['usercode'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;

            case 'load_branch_quest':  //1015 jiyang
                $sql_inquery = $ini_result['data']['load_branch_quest']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'add_branch_quest':  //10015 jiyang
                $sql_inquery = $ini_result['data']['add_branch_quest']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->bindValue(2, $args[1], PDO::PARAM_STR);
				$state->bindValue(3, $args[2], PDO::PARAM_STR);
                // $state->bindValue(3, $args[2], PDO::PARAM_STR);
                $state->bindValue(4, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                $state->bindValue(5, $_SESSION['usercode'], PDO::PARAM_STR);
                $state->bindValue(6, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                $state->bindValue(7, $_SESSION['usercode'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'load_quest_and_options':  //1015 jiyang
                $sql_inquery = $ini_result['data']['load_quest_and_options']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['quest_ser'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'get_quest_ser':  //1015 jiyang
                $sql_inquery = $ini_result['data']['get_quest_ser']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['0'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'add_branch_options':  //1019 jiyang
                $sql_inquery = $ini_result['data']['add_branch_options']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['0'], PDO::PARAM_STR);
                $state->bindValue(2, $args['1'], PDO::PARAM_STR);
                $state->bindValue(3, $args['2'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'editbranchquest':  //1019 jiyang
                $sql_inquery = $ini_result['data']['editbranchquest']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
				$state->bindValue(2, $args[2], PDO::PARAM_STR);
                $state->bindValue(3, date('Y-m-d H:i:s'), PDO::PARAM_STR);
                $state->bindValue(4, $_SESSION['usercode'], PDO::PARAM_STR);
                $state->bindValue(5, $args[1], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'editbranchoptions':  //1019 jiyang
                $sql_inquery = $ini_result['data']['editbranchoptions']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args[0], PDO::PARAM_STR);
                $state->bindValue(2, $args[1], PDO::PARAM_STR);
                $state->bindValue(3, $args[2], PDO::PARAM_STR);
                
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'deletebranch_question':  //1019 jiyang
                $sql_inquery = $ini_result['data']['deletebranch_question']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['ser'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'deletebranch_options':  //1019 jiyang
                $sql_inquery = $ini_result['data']['deletebranch_options']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['ser'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'arfacelist':
                $sql_inquery = $ini_result['data']['arfacelist']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'addARface':
                $sql_inquery = $ini_result['data']['addARface']['sql'];

                // $state = $conn->prepare($sql_inquery);
                // $state->bindValue(1, $args['drugname'], PDO::PARAM_STR);
                // $state->bindValue(2, $args['druginfo'], PDO::PARAM_STR);

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1,$args[0],PDO::PARAM_STR);                
                $state->bindValue(2,$args[1],PDO::PARAM_STR);
                $state->bindValue(3,$args[2],PDO::PARAM_STR);
                $state->bindValue(4,$args[3],PDO::PARAM_INT);
                // $state->bindValue(5,$args[4],PDO::PARAM_STR);
                // $state->bindValue(6,$args[5],PDO::PARAM_STR);
                // $state->bindValue(7,$args[6],PDO::PARAM_STR);
                // $state->bindValue(8,date("Y-m-d H:i:s"),PDO::PARAM_STR);
				// $state->bindValue(9,$_SESSION['usercode'],PDO::PARAM_STR);
                // $state->bindValue(10,date("Y-m-d H:i:s"),PDO::PARAM_STR);
				// $state->bindValue(11,$_SESSION['usercode'],PDO::PARAM_STR);
    
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'deleteARface':
                $sql_inquery = $ini_result['data']['deleteARface']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['ser'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'loadARface':
                $sql_inquery = $ini_result['data']['loadARface']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['ser'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'find_pic_address':
                $sql_inquery = $ini_result['data']['find_pic_address']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1, $args['ser'], PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
            case 'editARface':
                $sql_inquery = $ini_result['data']['editARface']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1,$args[0],PDO::PARAM_STR);                
                $state->bindValue(2,$args[1],PDO::PARAM_STR);
                $state->bindValue(3,$args[2],PDO::PARAM_STR);
                $state->bindValue(4,$args[3],PDO::PARAM_INT);
                $state->bindValue(5,$args[4],PDO::PARAM_STR);
                
               
                $state->execute();

                 if ($state->rowCount() < 1) {
                     return false;
                 } else {
                     return $state->fetchAll();
                 }
                break;
			case 'add_role':
                $sql_inquery = $ini_result['data']['add_role']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1,$args[0],PDO::PARAM_STR);                
                $state->bindValue(2,$args[1],PDO::PARAM_STR);
                $state->bindValue(3,$args[2],PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                    return false;            
                }
                else 
                {
                    return $state->fetchAll();
                }
                break;
			case 'rolelist':
			   	$sql_inquery = $ini_result['data']['rolelist']['sql'];
				$state = $conn->prepare($sql_inquery);
				$state->execute();
				 if ($state->rowCount() < 1) {
					return false;            
				}
				else 
				{
					return $state->fetchAll();
				}
				break;
			case 'loadrole':
                $sql_inquery = $ini_result['data']['loadrole']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1,$args['ser'],PDO::PARAM_STR);
                $state->execute();
                
                 if ($state->rowCount() < 1) {
                    return false;            
                }
                else 
                {
                    return $state->fetchAll();
                }
                break;
			case 'editrole':
                $sql_inquery = $ini_result['data']['editrole']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1,$args[0],PDO::PARAM_STR);                
                $state->bindValue(2,$args[1],PDO::PARAM_STR);
				$state->bindValue(3,$args[2],PDO::PARAM_STR);
				$state->execute();
                
                 if ($state->rowCount() < 1) {
                    return false;            
                }
                else 
                {
                    return $state->fetchAll();
                }
                break;
			case 'loadrolefile':
                $sql_inquery = $ini_result['data']['loadrole']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1,$args[0],PDO::PARAM_STR);   
                $state->execute();
                 if ($state->rowCount() < 1) {
                    return false;            
                }
                else 
                {
                    return $state->fetchAll();
                }
                break;
			case 'editrole2':
                $sql_inquery = $ini_result['data']['editrole2']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1,$args[0],PDO::PARAM_STR);                
                $state->bindValue(2,$args[1],PDO::PARAM_STR);
				$state->bindValue(3,$args[2],PDO::PARAM_STR);
				$state->bindValue(4,$args[3],PDO::PARAM_STR);
				$state->execute();
                
                 if ($state->rowCount() < 1) {
                    return false;            
                }
                else 
                {
                    return $state->fetchAll();
                }
                break;
			case 'deleterole':
                $sql_inquery = $ini_result['data']['deleterole']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1,$args['ser'],PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                    return false;            
                }
                else 
                {
                    return $state->fetchAll();
                }
                break;
				
				
			
			case 'add_bg':
                $sql_inquery = $ini_result['data']['add_bg']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1,$args[0],PDO::PARAM_STR);                
                $state->bindValue(2,$args[1],PDO::PARAM_STR);
                $state->bindValue(3,$args[2],PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                    return false;            
                }
                else 
                {
                    return $state->fetchAll();
                }
                break;
			case 'bglist':
			   	$sql_inquery = $ini_result['data']['bglist']['sql'];
				$state = $conn->prepare($sql_inquery);
				$state->execute();
				 if ($state->rowCount() < 1) {
					return false;            
				}
				else 
				{
					return $state->fetchAll();
				}
				break;
			case 'loadbg':
                $sql_inquery = $ini_result['data']['loadbg']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1,$args['ser'],PDO::PARAM_STR);
                $state->execute();
                
                 if ($state->rowCount() < 1) {
                    return false;            
                }
                else 
                {
                    return $state->fetchAll();
                }
                break;
			case 'editbg':
                $sql_inquery = $ini_result['data']['editbg']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1,$args[0],PDO::PARAM_STR);                
                $state->bindValue(2,$args[1],PDO::PARAM_STR);
				$state->bindValue(3,$args[2],PDO::PARAM_STR);
				$state->execute();
                
                 if ($state->rowCount() < 1) {
                    return false;            
                }
                else 
                {
                    return $state->fetchAll();
                }
                break;
			case 'loadbgfile':
                $sql_inquery = $ini_result['data']['loadbg']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1,$args[0],PDO::PARAM_STR);   
                $state->execute();
                 if ($state->rowCount() < 1) {
                    return false;            
                }
                else 
                {
                    return $state->fetchAll();
                }
                break;
			case 'editbg2':
                $sql_inquery = $ini_result['data']['editbg2']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1,$args[0],PDO::PARAM_STR);                
                $state->bindValue(2,$args[1],PDO::PARAM_STR);
				$state->bindValue(3,$args[2],PDO::PARAM_STR);
				$state->bindValue(4,$args[3],PDO::PARAM_STR);
				$state->execute();
                
                 if ($state->rowCount() < 1) {
                    return false;            
                }
                else 
                {
                    return $state->fetchAll();
                }
                break;
			case 'deletebg':
                $sql_inquery = $ini_result['data']['deletebg']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1,$args['ser'],PDO::PARAM_STR);
                $state->execute();

                 if ($state->rowCount() < 1) {
                    return false;            
                }
                else 
                {
                    return $state->fetchAll();
                }
                break;
			case 'add_quest':
                $sql_inquery = $ini_result['data']['add_quest']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1,$args[0],PDO::PARAM_STR);                
                $state->bindValue(2,$args[1],PDO::PARAM_STR);
				$state->bindValue(3,$args[2],PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                    return false;            
                }
                else 
                {
                    return $state->fetchAll();
                }
                break;
			case 'loadnew_quest':
                $sql_inquery = $ini_result['data']['loadnew_quest']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1,$args[0],PDO::PARAM_STR);                
                $state->bindValue(2,$args[1],PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                    return false;            
                }
                else 
                {
                    return $state->fetchAll();
                }
                break;
			case 'add_option':
                $sql_inquery = $ini_result['data']['add_option']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1,$args[0],PDO::PARAM_STR);                
                $state->bindValue(2,$args[1],PDO::PARAM_STR);
				$state->bindValue(3,$args[2],PDO::PARAM_STR);
				$state->bindValue(4,$args[3],PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                    return false;            
                }
                else 
                {
                    return $state->fetchAll();
                }
                break;
			case 'quest_list':
			   	$sql_inquery = $ini_result['data']['quest_list']['sql'];
				$state = $conn->prepare($sql_inquery);
				$state->execute();
				 if ($state->rowCount() < 1) {
					return false;            
				}
				else 
				{
					return $state->fetchAll();
				}
				break;
			case 'loadquest':
                $sql_inquery = $ini_result['data']['loadquest']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1,$args['ser'],PDO::PARAM_STR);
                $state->execute();
                
                 if ($state->rowCount() < 1) {
                    return false;            
                }
                else 
                {
                    return $state->fetchAll();
                }
                break;
			case 'loadoption':
                $sql_inquery = $ini_result['data']['loadoption']['sql'];
                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1,$args['ser'],PDO::PARAM_STR);
                $state->execute();
                
                 if ($state->rowCount() < 1) {
                    return false;            
                }
                else 
                {
                    return $state->fetchAll();
                }
                break;
			case 'ed_quest':
                $sql_inquery = $ini_result['data']['ed_quest']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1,$args[0],PDO::PARAM_STR);                
                $state->bindValue(2,$args[1],PDO::PARAM_STR);
				$state->bindValue(3,$args[2],PDO::PARAM_STR);
				$state->bindValue(4,$args[3],PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                    return false;            
                }
                else 
                {
                    return $state->fetchAll();
                }
                break;
			case 'del_option':
                $sql_inquery = $ini_result['data']['del_option']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1,$args[0],PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                    return false;            
                }
                else 
                {
                    return $state->fetchAll();
                }
                break;
			case 'del_option2':
                $sql_inquery = $ini_result['data']['del_option']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1,$args['ser'],PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                    return false;            
                }
                else 
                {
                    return $state->fetchAll();
                }
                break;
			case 'deletequest':
                $sql_inquery = $ini_result['data']['deletequest']['sql'];

                $state = $conn->prepare($sql_inquery);
                $state->bindValue(1,$args['ser'],PDO::PARAM_STR);
                $state->execute();
                 if ($state->rowCount() < 1) {
                    return false;            
                }
                else 
                {
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
            $result = _error_message('general', '0003', '', $filename.' not found.');             //檔案不存在
        }

        $result = array('data' => $result);

        return $result;
    }
}
