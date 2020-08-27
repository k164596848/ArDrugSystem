$(function(){
	loaduserEvent();

});
function loaduserEvent(){
	$.post('route/controller.php?action=loaduser',  function(data, textStatus, xhr) {
		postData = data.data;
		for (var i = 0; i < postData.length; i++) {
			$("#showqrcode").append("<div class='col-sm-4' style='margin-top:20px'><div class='qrcodediv'><div id='qrcode"+i+"'></div>"+postData[i].USER_ID+postData[i].USERPSW+"</div></div>");
			$("#qrcode"+i).qrcode({
				render: 'canvas',
			 	text: "http://163.17.135.190/ardrugsystem/system/login?param1=F4A&user="+postData[i].USER_ID+"&psw="+postData[i].USERPSW,
			  	width:180,
			  	height:180,
			});
		}
	},"json");
}
$("#loginbyhandBt").click(function(event) {
	$("#qrcodenopsw").qrcode({
		render: 'canvas',
	 	text: "http://163.17.135.190/ardrugsystem/system/login?param1=F4A",
	  	width:180,
	  	height:180,
	});
	$(this).hide();
});




