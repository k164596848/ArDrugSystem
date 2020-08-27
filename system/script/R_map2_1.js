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

  // $("#block1").click(function(){
  //   changepage();

  // })

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
        next_total=postData[0].total;
        B1=postData[0].ser;

        $("#B1text").html(postData[0].branch_content);
         check_path();
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
        $("#Maptext").html(postData[0].branch_content);
        break;
      case "failed":
        alert("data not pull out from sql");
        break;
    }
  }, "json");
}


function changepage()
{
  window.location.href='./test?param1=F4E&question='+B1+'';
}

// function check_path()
// { 


//   $.post('route/controller.php?action=check_path',function (data, textStatus, xhr) {

//     // alert(data.message);
//     switch (data.message) {

//       case "success":
//         postData = data.data;
//         for(var i=0;i<postData.length;i++)
//         { 
//           if(B1==postData[i].user_path)
//           {
//             check=1;
//             // alert("已完成");
//           }
         
//         }
//         break;
//       case "failed":
//         alert("data not pull out from sql");
//         break;
//     }
//   }, "json");
// }
