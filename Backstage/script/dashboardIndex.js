// 初始內容
var init_context = function(){    
    $.get("Views/dashboardPanel" , function(data) {
       $("body").append(data);       
    });    
};
$(function(){        
   init_context();
   
});