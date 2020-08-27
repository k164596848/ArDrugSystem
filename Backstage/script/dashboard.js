var dashboard_modules = {
    ui: function(){
        dashboard_modules.getdashboardcontent();
    },
    getdashboardcontent: function(){
        $.get("Views/dashboardContent" , function(data) {
            // console.log(data);
            $("#content-wrapper").html(data);
        });
    }
};
$(function () {
    dashboard_modules.ui();
});