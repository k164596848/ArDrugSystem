
$(function(){
localStorage.setItem('branch_level', upser);

	$("#block1").click(function(){
			$("#click_point1").hide(); //最上橘色動態指標
			$("#UP_1").show(); //最上藍色指標
			$("#UPdiv_1").show();
			$("#UPdiv_1").removeClass('arrow_show');
			$("#UPdiv_1").addClass('arrow1_left');
			$("#all").addClass('all_dis'); //全畫面
            localStorage.setItem('last', '0');
			setTimeout(function(){total(B1,1);},1000);

	});

	$("#block2").click(function(){
        if(direct1==1)
        {
            $("#click_point2").hide(); //最上橘色動態指標
            $("#UP_2").show(); //最上藍色指標
            $("#UP_2").show();
            $("#UPdiv_2").show();
            $("#UPdiv_2").removeClass('arrow_show');
            $("#UPdiv_2").addClass('arrow1_left');
            $("#all").addClass('all_dis'); //全畫面
            localStorage.setItem('last', '0');
            setTimeout(function(){total(B2,2);},1000);
        }
        else
        {
            alert("未解鎖");
        }
			

	});
	$("#block3").click(function(){
        if(direct2==1)
        {
            $("#click_point3").hide(); //最上橘色動態指標
            $("#UP_3").show(); //最上藍色指標
            $("#UP_3").show();
            $("#UPdiv_3").show();
            $("#UPdiv_3").removeClass('arrow_show');
            $("#UPdiv_3").addClass('arrow1_left');
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



function changeinfo()
{	window.location.href='./test?param1=F4BR2';
}


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
        				window.location.href='./Left?param1=F4BL2_3&upser='+B3+'';
        			}
        			if(block==2)
        			{
        				window.location.href='./Left?param1=F4BL2_3&upser='+B2+'';
        			}
        			if(block==1)
        			{
        				window.location.href='./Left?param1=F4BL2_3&upser='+B1+'';
        			}
        			break;
        		case '2':
        			if(block==3)
        			{
        				window.location.href='./Left?param1=F4BL2_2&upser='+B3+'';
        			}
        			if(block==2)
        			{
        				window.location.href='./Left?param1=F4BL2_2&upser='+B2+'';
        			}
        			if(block==1)
        			{
        				window.location.href='./Left?param1=F4BL2_2&upser='+B1+'';
        			}
        			break;
        		case '1':
        			if(block==3)
        			{
        				window.location.href='./Left?param1=F4BL2_1&upser='+B3+'';
        			}
        			if(block==2)
        			{
        				window.location.href='./Left?param1=F4BL2_1&upser='+B2+'';
        			}
        			if(block==1)
        			{
        				window.location.href='./Left?param1=F4BL2_1&upser='+B1+'';
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
