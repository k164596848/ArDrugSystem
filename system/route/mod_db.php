<?php

//資料庫變數
$hostname_conn = '163.17.135.190';
$username_conn = 'letjs';
$password_conn = 'letjs00000000';
$database_conn = 'ardrugs';
 global $conn;
// $hostname_conn = $_REQUEST["_site_conn"];
// $username_conn = $_REQUEST["_db_login_id"];
// $password_conn = $_REQUEST["_db_login_pw"];
// $database_conn = $_REQUEST["_db_conn"];

if (!defined('PHP_VERSION_ID')) {
    $version = explode('.', PHP_VERSION);

    define('PHP_VERSION_ID', ($version[0] * 10000 + $version[1] * 100 + $version[2]));
}

// if (PHP_VERSION_ID < 50207) {
//     //UTF8
//     mysql_query("SET NAMES 'utf8'");

//     //啟動資料庫連接
//     $conn = mysql_pconnect($hostname_conn, $username_conn, $password_conn) or trigger_error(mysql_error(), E_USER_ERROR);
// }
// else
// {
    $conn = new PDO('mysql:host='.$hostname_conn.';dbname='.$database_conn, $username_conn, $password_conn) or trigger_error(mysql_error(), E_USER_ERROR);
    $conn->exec('set names utf8');
    $conn->exec('SET CHARACTER SET utf-8');
// }
