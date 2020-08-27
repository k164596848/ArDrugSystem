<?php

function check_mobile()
{
    $regex_match = "/(nokia|iphone|android|motorola|^mot\-|softbank|foma|docomo|kddi|up\.browser|up\.link|";
    $regex_match .= 'htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|';
    $regex_match .= "blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam\-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|";
    $regex_match .= "symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte\-|longcos|pantech|gionee|^sie\-|portalmmm|";
    $regex_match .= "jig\s browser|hiptop|^ucweb|^benq|haier|^lct|opera\s*mobi|opera\*mini|320x320|240x320|176x220";
    $regex_match .= ')/i';

    return preg_match($regex_match, strtolower($_SERVER['HTTP_USER_AGENT']));
}
switch (isset($control[1]) ? $control[1] : '') {
    case 'meta':
        include 'meta.html';
        break;
    case 'body':
        include 'body.html';
        break;
    case 'config_module_style':
        include 'config_module_style.html';
        break;
    case 'header':
         include 'header/header.html';
        break;
    case 'footer':
        include 'footer/footer.html';
        break;
    case 'dashboardPanel':
        include 'Dashboard/container.html';
        break;
    case 'dashboardContent':
        include 'Dashboard/DashboardContent.html';
        break;
    case 'dashboardListContent':
        include 'Dashboard/DashboardListContent.html';
    break;

    default:
        include 'build.html';
        break;
}
