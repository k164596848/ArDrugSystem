 var url = location.href;
 var schedule="";
 if(url.indexOf('?')!=-1)
    { 
       var upser="";
      //在此直接將各自的參數資料切割放進ary中
      var ary = url.split('?')[1].split('&');
      //此時ary的內容為：
      
      //下迴圈去搜尋每個資料參數
      for(i=0;i<=ary.length-1;i++)
      {
          //如果資料名稱為id的話那就把他取出來
          if(ary[i].split('=')[0] == 'sche'){
             schedule = ary[i].split('=')[1];
          }
            if(ary[i].split('=')[0] == 'upser'){
             upser = ary[i].split('=')[1];
          }

      }
    }

$(function(){
	level1(upser);
	level2(upser);
	// $("#UP_1").hide();
	// $("#UPdiv_1-2").hide();
	// $("#UPdiv_2-1").hide();
	// $("#UPdiv_2-2").hide();
	
	// $("#UPdiv_3-1").hide();
	// $("#UP_block2").hide();
	// $("#UP_block3").hide();
	// $("#click_text").hide();
	// $("#click_point").hide();
	// $("#stamp1").hide();
	// $("#stamp2").hide();
	// $("#click_point2").show();
	// $("#click_point3").hide();
	// $("#UPdiv_3").hide();

	$("#click_point2").addClass('click_point2');

	// if(schedule==1)	
	// {	
	// 	$("#UP_block3").addClass('block1');
	// 	$("#stamp1").addClass('stamp');
	// 	$("#stamp1").show();
	// 	$("#stamp2").hide();
	// 	$("#UP_block2").show();
	// 	$("#UPdiv_2-1").show();
	// 	$("#click_point2").hide();
	// 	$("#click_point3").show();
	// 	$("#UP_1").show();
	// 	$("#UP_2-1").hide();
	// 	$("#UPdiv_3").hide();

	// }
	// else if(schedule==2)
	// {	

	// 	// $("#click_point3").attr('display');
	// 	$("#stamp1").show();
	// 	$("#stamp2").addClass('stamp');
	// 	$("#stamp2").show();
	// 	$("#stamp3").hide();
	// 	$("#UP_block2").show();
	// 	$("#UP_block3").show();
	// 	$("#UPdiv_2-1").show();
	// 	$("#click_point2").hide();
	// 	$("#UP_1").show();
	// 	$("#UP_3").hide();
	// 	$("#UP_2-1").show();
	// 	$("#UPdiv_3").show();
	// 	$("#UP_block3").addClass('block1');
	// }
	// else if(schedule==3)
	// {	

	// 	// $("#click_point3").attr('display');
	// 	$("#stamp1").show();
	// 	$("#stamp2").show();
	// 	$("#stamp3").addClass('stamp');
	// 	$("#stamp3").show();
	// 	$("#UP_block2").show();
	// 	$("#UP_block3").show();
	// 	$("#UPdiv_2-1").show();
	// 	$("#click_point2").hide();
	// 	$("#click_point4").hide();
	// 	$("#UP_1").show();
	// 	$("#UP_3").show();
	// 	$("#UP_2-1").show();
	// 	$("#UPdiv_3").show();
	// 	setTimeout(function(){window.location.href='./test?param1=F4BR1&question=1';},2500);
	// }


	$("#Mapdiv").click(function(){

		$("#UP_block1").show();
		$("#UP_block1").addClass('block1');
		$("#UPdiv_1-2").addClass('arrow_show');
		$("#click_point").hide();
		
		$("#click_text").hide();
	});

	$("#UP_block1").click(function(){
			$("#UP_block1").addClass('inteach')
			$("#all").addClass('all_dis'); //全畫面
			setTimeout(function(){window.location.href='./test?param1=F4E&question=1';},1000);
			
	});

	$("#UP_block2").click(function(){
			$("#UP_block2").addClass('inteach')
			$("#all").addClass('all_dis'); //全畫面
			setTimeout(function(){window.location.href='./test?param1=F4E&question=2';},1000);
			
	});

	$("#UP_block3").click(function(){
			$("#UP_block3").addClass('inteach')
			$("#all").addClass('all_dis'); //全畫面
			setTimeout(function(){window.location.href='./test?param1=F4E&question=3';},1000);
			
	});

	$("#UP_1").click(function(){
			$("#UP_block1").addClass('block1');
			setTimeout(function(){$("#UP_block1").removeClass('block1');},2000);
	});
	$("#UP_2").click(function(){
			$("#all").addClass('all_dis'); //全畫面
			setTimeout(function(){toMind();},2000);
	});

});



function changeinfo()
{	window.location.href='./test?param1=F4E';
}
function toMind()
{	window.location.href='./test?param1=F4B';
}
function line1()
{
	$("#UP_1").hide();
	$("#UPdiv_1-2").hide();
	$("#click_point2").show();
	$("#UPdiv_2-1").hide();
	$("#UPdiv_2-2").hide();
	$("#UPdiv_3").hide();
	$("#UPdiv_3-1").hide();

	$("#UP_block2").hide();
	$("#UP_block3").hide();
}

function level2(mindser)
{	
	dataAry=
	{
		level1ser:mindser,
	}

	$.post('route/controller.php?action=level2',dataAry,function (data, textStatus, xhr) {

    // alert(data.message);
    switch (data.message) {

      case "success":
        postData = data.data;
        next_total=postData[0].total;
        B1=postData[0].ser;

        $("#B1text").html(postData[0].branch_content);
        $("#B2text").html(postData[1].branch_content);
        $("#B3text").html(postData[2].branch_content);
       
        break;
      case "failed":
        alert("data not pull out from sql");
        break;
    }
  }, "json");
}

function level1(mindser)
{	
	dataAry=
	{
		level1ser:mindser,
	}

	$.post('route/controller.php?action=level1',dataAry,function (data, textStatus, xhr) {

    // alert(data.message);
    switch (data.message) {

      case "success":
        postData = data.data;
        alert(postData[0].branch_content);
        $("#Maptext").html(postData[0].branch_content);
        break;
      case "failed":
        alert("data not pull out from sql");
        break;
    }
  }, "json");
}
