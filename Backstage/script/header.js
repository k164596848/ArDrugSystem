var container_opt = $("#container-opt");
var container_header = $("#container-header");
var content_panel = $("#content-panel");
var container_header_dropdown =$("#container-header .dropdown");
var _name="", _userid="", _rights="",_department="";
var modules = {
    ui: function(){
        _name = localStorage.getItem('_name');
        _userid = localStorage.getItem('_userid');
        _useremail =localStorage.getItem('_useremail');
        _department = localStorage.getItem('_department');
        if(localStorage.getItem('_rights') == "1") _rights="管理員";
        else if (localStorage.getItem('_rights') == "2") _rights="超級使用者";
        else _rights="使用者";

        $("#username").text(_name + "您好, ");
        $("#userid").text(_useremail);
        $("#userdepartment").text("," + _department +",")
        $("#userrights").text("(" + _rights + ")");
        if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            container_opt.animate({ left:'-200px' }, 200, 'swing').removeClass('optOpen');
                container_header.animate({ marginLeft:'0px' }, 200, 'swing').removeClass('optOpen');
                content_panel.animate({ marginLeft:'0px' }, 200, 'swing').removeClass('optOpen');
                container_header_dropdown.animate({ marginRight:'0px' }, 200, 'swing').removeClass('optOpen');
        }
        
        $(".dropdown>a").click(function (event) {
            if ($(this).next().css('display') == "none") {
                //展開
                $(".dropdown").children('ul').slideUp(500);
                $(this).next('ul').slideDown(300);
                $(this).parent('li').addClass('dropdown-show').siblings('li').removeClass('dropdown-show');
            }
            else {
                // 收起
                $(this).next('ul').slideUp(300);
                $('.dropdown.dropdown-show').removeClass('dropdown-show');
            }
        });
        modules.sildebar();
		rights_sort();
    },
    sildebar: function(){
        $("#optButton").click(function(event) {
            
            if(container_opt.hasClass('optOpen'))
            {
                container_opt.animate({ left:'-200px' }, 200, 'swing').removeClass('optOpen');
                container_header.animate({ marginLeft:'0px' }, 200, 'swing').removeClass('optOpen');
                content_panel.animate({ marginLeft:'0px' }, 200, 'swing').removeClass('optOpen');
                container_header_dropdown.animate({ marginRight:'0px' }, 200, 'swing').removeClass('optOpen');
            }
            else
            {
                container_opt.animate({ left:'0px' }, 200, 'swing').addClass('optOpen');
                container_header.animate({ marginLeft:'200px' }, 200, 'swing').addClass('optOpen');
                content_panel.animate({ marginLeft:'200px' }, 200, 'swing').addClass('optOpen');
                container_header_dropdown.animate({ marginRight:'200px' }, 200, 'swing').addClass('optOpen');
            }
        });
    }
};
function showtodaydate()
{
    var fullDate = new Date();
    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var weeks = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
    var twoDigitYear = fullDate.getFullYear();
    var twoDigitMonth = months[fullDate.getMonth()] + " ";
    var twoDigitDate = fullDate.getDate() + " ";
    var twoDigithour = fullDate.getHours().toString();
    var twoDigitmin = fullDate.getMinutes().toString();
    var twoDigitmday = weeks[fullDate.getDay()] + ", ";
    if (twoDigithour.length == 1) twoDigithour = "0" + twoDigithour;
    if (twoDigitmin.length == 1) twoDigitmin = "0" + twoDigitmin;
    var showTime = twoDigithour + ":" + twoDigitmin; 
    var showDate = twoDigitmday + twoDigitMonth + twoDigitDate + twoDigitYear;
    $(".showTime").text(showTime);
    $(".showDate").text(showDate);
}
function logoutEvent()
{
    localStorage.removeItem('_name');
    localStorage.removeItem('_userid');
    localStorage.removeItem('_rights');
    $.post('route/controller.php?action=logout', '', function(data, textStatus, xhr) {
            window.location.href='./Auth?param1=F2A';
      },"json");
}
window.onload = function () {
    setInterval(showtodaydate, 1000);
} 
$(function () {
    modules.ui();
    showtodaydate();
});

function rights_sort()
{
	var str="";
    if(localStorage.getItem("_rights") == '1'){
		str= "<li><a href='./AccountList?param1=F4A' class='hvr-underline-from-center'><span>人員維護</span></a></li>";
		str+= "<li><a href='./Userlog?param1=F6A' class='hvr-underline-from-center'><span>登錄紀錄</span></a></li>";
		
		$("#right_sort").append(str);
	}
}