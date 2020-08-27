var container_opt = $("#container-opt");
var content_panel = $("#content-panel");
var website_init_modules = {
    ui: function(){
        // website_init_modules.getconfig_module_style();
        website_init_modules.getmeta();
        website_init_modules.getbody();
        website_init_modules.getheader();
        website_init_modules.followsildebar();
    },
    getmeta: function(){        
        $.get("Views/meta" , function(data) {
            $("head").prepend(data);
          });
    },
    getbody: function(){        
        $.get("Views/body" , function(data) {
            $("body").append(data);
          });
    },
//    getconfig_module_style: function(){        
//        $.get("Views/config_module_style" , function(data) {
//            $("head").append(data);
//          });
//    },
    getheader: function(){
        $.get("Views/header", function(data) {
            $("body").prepend(data);

                // $.get("Views/footer", function(data) {
                  // $("#website-wrapper").after(data);
                 
                // });
          });
    },
    followsildebar: function(){
        $("#optButton").click(function(event) {
            
            if(container_opt.hasClass('optOpen'))
            {
                content_panel.animate({ marginLeft:'0px' }, 200, 'swing').removeClass('optOpen');
            }
            else
            {
                content_panel.animate({ marginLeft:'200px' }, 200, 'swing').addClass('optOpen');
            }
        });
    }
};

$(function(){    
    if(localStorage.getItem('_name') == null || localStorage.getItem('_name') == "undefined")
     {
        localStorage.removeItem('_name');
        localStorage.removeItem('_userid');
        localStorage.removeItem('_rights');
        localStorage.removeItem('_useremail');
         window.location.href="Auth?param1=F2A";
     }
    $.post('route/controller.php?action=_checkauth', '', function(data, textStatus, xhr) {
        
        
        window.location.href=data.actionurl;         
            
      },"json");
    $("#welcomeTitle p").text("歡迎"+localStorage.getItem('_name')+"蒞臨後台管理系統");
    website_init_modules.ui();
});
