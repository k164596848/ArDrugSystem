var modules = {
  ui:function(){
    
    $("#LoginBt").click(function(event) {
      modules.loginEvent();
    });
    $("form input").keydown(function(event) {
      modules.keyDownEvent(event);
    });
    
  },
  keyDownEvent: function(event){
    var x = event.keyCode;
    if (x == 13) {  // 13 is the Enter key
        modules.loginEvent();
      }
  },
  loginEvent:function(){
      var dataAry = {
        usercode:$("#usercode").val(),
        userpsw:$("#userpsw").val()
      };
      $.post('route/controller.php?action=checkLogin', dataAry, function(data, textStatus, xhr) {
              switch(data.message){
                case "failed":
//                  alert(data.errmsg);
                    swal({
                        title: "登入失敗!",
                        text: data.errmsg,
                        icon: "error",
                        default: true
                    }).then((value) => {                            
                        $("form")[0].reset();
                    });
                  
                break;
                case "success":
                    localStorage.setItem('_name', data.data.data[0].USERNAME);
                    localStorage.setItem('_userid', data.data.data[0].USER_ID);
                    localStorage.setItem('_useremail', data.data.data[0].EMAIL);
                    localStorage.setItem('_department', data.data.data[0].D_ID);
                    localStorage.setItem('_rights', data.data.data[0].RIGHTS);
                    
                    swal({
                        title: "登入成功!",
                        text: "Welcome!",
                        icon: "success",
                        buttons: false,
                        default: true
                    });   
                    setInterval(function(){ window.location.href=data.actionurl; }, 1000);
                break;
                default:
                break;
              }
        },"json");
  },
  showtodaydate:function(){
        var fullDate = new Date();
        var twoDigitMonth = (fullDate.getMonth() + 1) + "";
        if (twoDigitMonth.length == 1) twoDigitMonth = "0" + twoDigitMonth;
        var twoDigitDate = fullDate.getDate();
        var twoDigithour = fullDate.getHours().toString();
        var twoDigitmin = fullDate.getMinutes().toString();
        var twoDigitmsec = fullDate.getSeconds().toString();
        if (twoDigitDate.length == 1) twoDigitDate = "0" + twoDigitDate;
        if (twoDigithour.length == 1) twoDigithour = "0" + twoDigithour;
        if (twoDigitmin.length == 1) twoDigitmin = "0" + twoDigitmin;
        if (twoDigitmsec.length == 1) twoDigitmsec = "0" + twoDigitmsec;
        var currentDate = fullDate.getFullYear() +"/"+ twoDigitMonth + "/"+ twoDigitDate +"\t"+  twoDigithour + ":" + twoDigitmin + ":" + twoDigitmsec ;
        $("#today-date").text(currentDate);
    }
}

window.onload = function () {
    setInterval(modules.showtodaydate, 1000);
}    
$(function(){
    modules.ui();

});
