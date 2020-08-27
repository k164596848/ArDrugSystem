 var url = location.href;
 var next_total="";
 var B1="";
 var B2="";
 var B3="";
 if(url.indexOf('?')!=-1)
    { 

      var question="";
      var upser="";
      //在此直接將各自的參數資料切割放進ary中
      var ary = url.split('?')[1].split('&');
      //此時ary的內容為：
      
      //下迴圈去搜尋每個資料參數
      for(i=0;i<=ary.length-1;i++)
      {
          //如果資料名稱為id的話那就把他取出來
          if(ary[i].split('=')[0] == 'question'){
             question = ary[i].split('=')[1];
          }
          if(ary[i].split('=')[0] == 'upser'){
             upser = ary[i].split('=')[1];
          }
      }
    }

$(function(){

	level1(upser);
	level2(upser);
  
  $("#UP_block1").click(function(){
    $("#UP_block1").addClass('inteach')
      $("#all").addClass('all_dis'); //全畫面
      setTimeout(function(){window.location.href='./test?param1=F4E&question='+B1+'';},1000);
  });
  $("#UP_block3").click(function(){
    $("#UP_block3").addClass('inteach')
      $("#all").addClass('all_dis'); //全畫面
      setTimeout(function(){window.location.href='./test?param1=F4E&question='+B2+'';},1000);
  });
});


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
        alert(postData[0].branch_content);
        next_total=postData[0].total;
        B1=postData[0].ser;
        B2=postData[1].ser;
        $("#B1text").html(postData[0].branch_content);
        $("#B2text").html(postData[1].branch_content);
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
