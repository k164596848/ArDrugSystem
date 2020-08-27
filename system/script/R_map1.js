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
    
  localStorage.setItem('branch_level', upser);
	$("#UP_block1").click(function(){
      $("#UPdiv_1").show();
			$("#click_point1").hide(); //最上橘色動態指標
			$("#UP_1").show(); //最上藍色指標
			$("#UPdiv_1").removeClass('arrow_show');
			$("#UPdiv_1").addClass('arrow1-1');
			$("#all").addClass('all_dis'); //全畫面
      localStorage.setItem('last', '0');
			setTimeout(function(){total(B1,1);},1000);

	});

	$("#UP_block2").click(function(){
    if(direct1==1)
    {
      $("#click_point2").hide(); //最上橘色動態指標
      $("#UP_2-1").show(); //最上藍色指標
      $("#UP_2-2").show();
      $("#UPdiv_2").show();
      $("#UPdiv_2").removeClass('arrow_show');
      $("#UPdiv_2").addClass('arrow1-1');
      $("#all").addClass('all_dis'); //全畫面
      localStorage.setItem('last', '0');
      setTimeout(function(){total(B2,2);},1000);
    }
		else
    {
      alert("未解鎖");
    }

	});
	$("#UP_block3").click(function(){
    if(direct2==1)
    {
      $("#click_point3").hide(); //最上橘色動態指標
      $("#UP_3").show(); //最上藍色指標
      $("#UP_3").show();
      $("#UPdiv_3").show();
      $("#UPdiv_3").removeClass('arrow_show');
      $("#UPdiv_3").addClass('arrow1-1');
      $("#all").addClass('all_dis'); //全畫面
      localStorage.setItem('last', '1');
      setTimeout(function(){total(B3,3);},1000);
    }
	   else
     {
      alert("未解鎖");
     }
		
	});
});


function total(mindser,block)
{	
	dataAry=
	{
		level1ser:mindser,
	}

	$.post('route/controller.php?action=totally',dataAry,function (data, textStatus, xhr) {

    // alert(data.message);
    switch (data.message) {

      case "success":
        postData = data.data;
        	switch(postData[0].total)
        	{
        		case '3':
        			if(block==3)
        			{
        				window.location.href='./Right?param1=F4BR2_1&upser='+B3+'';
        			}
        			if(block==2)
        			{
        				window.location.href='./Right?param1=F4BR2_1&upser='+B2+'';
        			}
        			if(block==1)
        			{
        				window.location.href='./Right?param1=F4BR2_1&upser='+B1+'';
        			}
        			break;
        		case '2':
        			if(block==3)
        			{
        				window.location.href='./Right?param1=F4BR2_2&upser='+B3+'';
        			}
        			if(block==2)
        			{
        				window.location.href='./Right?param1=F4BR2_2&upser='+B2+'';
        			}
        			if(block==1)
        			{
        				window.location.href='./Right?param1=F4BR2_2&upser='+B1+'';
        			}
        			break;
        		case '1':
        			if(block==3)
        			{
        				window.location.href='./Right?param1=F4BR2_1&upser='+B3+'';
        			}
        			if(block==2)
        			{
        				window.location.href='./Right?param1=F4BR2_1&upser='+B2+'';
        			}
        			if(block==1)
        			{
        				window.location.href='./Right?param1=F4BR2_1&upser='+B1+'';
        			}
        			break;
        	}
        break;
      case "failed":
        alert("data not pull out from sql");
        break;
    }
  }, "json");
}
