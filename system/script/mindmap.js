//概念構圖大張的
//第一層級的變數ser 1~5
var Aser="";
var Bser="";
var Cser="";
var Dser="";
var Eser="";

var docElm = document.documentElement;
//W3C 

$(function(){
	
	mindMap();
    if(localStorage.getItem('A_fin')==1)
    {
        $("#A_stamp").addClass('stamp');
    }
    if(localStorage.getItem('B_fin')==1)
    {
        $("#B_stamp").addClass('stamp');
    }
    if(localStorage.getItem('C_fin')==1)
    {
        $("#C_stamp").addClass('stamp');
    }
    if(localStorage.getItem('D_fin')==1)
    {
        $("#D_stamp").addClass('stamp');
    }
    if(localStorage.getItem('E_fin')==1)
    {
        $("#E_stamp").addClass('stamp');
    }
	$("#Adiv").click(function(){
        $("#all").addClass('all_dis');
		setTimeout(function(){window.location.href='./Up?param1=F4BU1&upser='+Aser+'';},1000);
        
	});

	$("#Bdiv").click(function(){
        $("#all").addClass('all_dis');
        setTimeout(function(){window.location.href='./Right?param1=F4BR1&upser='+Bser+'';},1000);
	})
	$("#Cdiv").click(function(){
        $("#all").addClass('all_dis');
        setTimeout(function(){window.location.href='./DownR?param1=F4BDR1&upser='+Cser+'';},1000);
		
	})
	$("#Ddiv").click(function(){
        $("#all").addClass('all_dis');
        setTimeout(function(){window.location.href='./DownL?param1=F4BDL1&upser='+Dser+'';},1000);
		
	})
	$("#Ediv").click(function(){
        $("#all").addClass('all_dis');
        setTimeout(function(){window.location.href='./Left?param1=F4BL1&upser='+Eser+'';},1000);		
	});
    $("#mapdiv").click(function(){
        $("#map").show();
        $("#map").addClass('all_show');
        // $("#all").hide();
          
    });

             

});


function mindMap() {//大地圖專用

 
  $.post('route/controller.php?action=mind', function (data, textStatus, xhr) {

    // alert(data.message);
    switch (data.message) {

      case "success":
        postData = data.data;
        Aser = postData[0].ser;//大麻SER
        Bser = postData[1].ser;//安非他命SER
        Cser = postData[2].ser;//k他命
        Dser = postData[3].ser;//搖頭丸
        Eser = postData[4].ser;//海洛英F

        $("#Atext").html(postData[0].branch_content);
        $("#Btext").html(postData[1].branch_content);
        $("#Ctext").html(postData[2].branch_content);
        $("#Dtext").html(postData[3].branch_content);
        $("#Etext").html(postData[4].branch_content);


        

        break;
      case "failed":
        alert("function mindMap execute failed, from mindmap.js");
        break;
    }
  }, "json");
}

function gonext()
{

}


