var attrtext="";
var attrtype="";
var persontype="";
var max=[];
var p_max=[];
$(function(){
analysis();

    setTimeout(function(){
      $("#card0").addClass('fadeout');
      $("#card1").addClass('fadeout');
      $("#card2").addClass('fadeout');
      $("#card4").addClass('fadeout');},500);
     
		setTimeout(function(){
      $("#whitebg").removeClass('disapear');
      $("#mater").removeClass('disapear');
      $("#role").removeClass('disapear');
      $("#note").removeClass('disapear');
      $("#textbox").removeClass('disapear');
      $("#typeimg").removeClass('disapear');
      $("#backindex").removeClass('disapear');
      $("#secret").removeClass('disapear');
      $("#whitebg").addClass('show');
      $("#mater").addClass('show');
      $("#role").addClass('show');
      $("#note").addClass('show');
      $("#textbox").addClass('show');
      $("#typeimg").addClass('show');
      $("#typetext").addClass('show');
    },3000)
$("#backindex").click(function(){
    window.location.href='./login?param1=F4B';
})

});


function analysis()
{ 
  dataAry=
  {
    userid:localStorage.getItem('_userid'),
  }

  $.post('route/controller.php?action=getRpgAnalysis',dataAry,function (data, textStatus, xhr) {

    switch (data.message) {

      case "success":
        postData=data.data;
        max=[postData[0].Friendly,postData[0].Tough,postData[0].Avoid,postData[0].Sensitive,postData[0].Timid,postData[0].Curious];
        //先暫時5種屬性判別 友善、強硬、迴避、敏感、膽小、好奇
        p_max=[postData[0].p_Introvert,postData[0].p_Outward,postData[0].p_Sensitive,postData[0].p_Friendly,postData[0].p_Curious];
        //先暫時5種個性判別 內向、外向、敏感、友善、好奇
        if(postData[0].Friendly!=0)
        {
          switch(postData[0].Friendly)
          {
            case '1':
              attrtext=attrtext+'你對人友善，';
              break;
            case '2':
              attrtext=attrtext+'你不敢強硬拒絕別人，';
              break;
            case '3':
              attrtext=attrtext+'你不懂得拒絕別人常常讓自己身陷險境!該強硬點!';
              break;
          }
        }
        if(postData[0].Tough!=0)
        {
          switch(postData[0].Tough)
          {
            case '1':
              // attrtext=attrtext+'你不懂得拒絕別人常常讓自己身陷險境!強硬點好嗎?';
              break;
            case '2':
              attrtext=attrtext+'懂得拒絕別人，適合用堅持拒絕法來抵擋毒蟲的誘惑。';
              break;
            case '3':
              attrtext=attrtext+'你雖然懂得拒絕，但太過的強硬反而會招來禍害。';
              break;
          }
        }
        if(postData[0].Avoid!=0)
        {
          switch(postData[0].Avoid)
          {
            case '1':
              attrtext=attrtext+'懂得轉移焦點。';
              break;
            case '2':
              attrtext=attrtext+'你較適合運用轉移話題的方法來拒絕毒品。';
              break;
            case '3':
              attrtext=attrtext+'一直逃避事情，這些事只會一直纏著你!';
              break;
          }
        }
        if(postData[0].Sensitive!=0)
        {
          switch(postData[0].Sensitive)
          {
            case '1':
              attrtext=attrtext+'有時你的理智過低!';
              break;
            case '2':
              attrtext=attrtext+'有時你的理智過低!';
              break;
            case '3':
              attrtext=attrtext+'有時你的理智過低!';
              break;
          }
        }
        if(postData[0].Timid!=0)
        {
           switch(postData[0].Timid)
          {
            case '1':
              // attrtext=attrtext+'有時你的理智過低!';
              break;
            case '2':
              attrtext=attrtext+'遇到事情不太勇敢!';
              break;
            case '3':
              attrtext=attrtext+'遇到事情不要總是退縮!勇敢點!';
              break;
          }
        }
        if(postData[0].Curious!=0)
        {
           switch(postData[0].Curious)
          {
            case '1':
              attrtext=attrtext+'你擁有一顆好奇心，但好奇心殺死一隻貓，常常會讓你陷入險境。';
              break;
            case '2':
              attrtext=attrtext+'你擁有一顆好奇心，但好奇心殺死一隻貓，常常會讓你陷入險境。';
              break;
            case '3':
              attrtext=attrtext+'你擁有一顆好奇心，但好奇心殺死一隻貓，常常會讓你陷入險境。';
              break;
          }
        }
        if(postData[0].Crisis!=0)
        {
           switch(postData[0].Crisis)
          {
            case '1':
              attrtext=attrtext+'你!危機意識欠缺啦!!!';
              break;
            case '2':
              attrtext=attrtext+'擁有良好的危機意識!讚讚的，';
              break;
            case '3':
              attrtext=attrtext+'擁有極好的危機意識!';
              break;
          }
        }
        if(postData[0].Reaction!=0)
        { 
          if(postData[0].Crisis<=1)
          {
            switch(postData[0].Reaction)
              {
                case '1':
                  attrtext=attrtext+'在緊急時刻缺乏正確判斷，容易產生重大翻盤!';
                  break;
                case '2':
                  attrtext=attrtext+'在緊急時刻缺乏正確判斷，容易產生重大翻盤!';
                  break;
                case '3':
                  attrtext=attrtext+'在緊急時刻缺乏正確判斷，容易產生重大翻盤!';
                  break;
              }

          }
          else
          {
            switch(postData[0].Reaction)
              {
                case '1':
                  attrtext=attrtext+'但在緊急時刻缺乏正確判斷，容易產生重大翻盤!';
                  break;
                case '2':
                  attrtext=attrtext+'但在緊急時刻缺乏正確判斷，容易產生重大翻盤!';
                  break;
                case '3':
                  attrtext=attrtext+'但在緊急時刻缺乏正確判斷，容易產生重大翻盤!';
                  break;
              }
          }

           
        }
        console.log(attrtext);
        $("#attrtext").html(attrtext);

         $.when( judge()).done(function(){ 
          setTimeout(function(){
            $("#attrtext").removeClass('disapear');
            $("#attrtext").addClass('fadein');
            $("#personattr").removeClass('disapear');
            $("#personattr").addClass('fadein');
            $("#typetext").removeClass('disapear');
            $("#typetext").addClass('fadein');
          },4000);
          webduino_angle(attrtext);
        })
        break;

      case "failed":
        alert("data not pull out from sql");
        break;
    }
  }, "json");
}

function judge(){
 
  var themax=0;
  var p_themax=0;
  for(var m=0;m<max.length;m++)
  { 

    if(max[themax]<max[m+1])
    {
      themax=m+1;
    }
  }

  for(var p=0;p<p_max.length;p++)
  { 

    if(p_max[p_themax]<p_max[p+1])
    {
      p_themax=p+1;
    }
  }
// alert(max[3]);
//   if(max[3]!=0)
//   {
    // attrtype="適合反激將法";
  // }
  // else
  // { 
    if(themax==0)//友善
    {
      attrtype="適合遠離現場法";
    }
    else if(themax==1)//強硬
    {
      attrtype="適合堅持拒絕法";
    }
    else if(themax==2)//迴避
    {
      attrtype="適合轉移話題法";
    }
    else if(themax==3)//敏感
    {
      attrtype="適合反激將法";
    }
    else if(themax==4)//膽小
    {
      attrtype="適合遠離現場法";
    }
    else if(themax==5)//好奇
    {
      attrtype="適合轉移話題法";
    }
  // }
//-------------------------------------------------------------

  if(p_themax==0 && p_max[0]!=0)
  {
    persontype="內向";
  }
  else if(p_themax==1)
  {
    persontype="外向";
  }
  else if(p_themax==2)
  {
    persontype="敏感";
  }
  else if(p_themax==3)
  {
    persontype="友善";
  }
  else if(p_themax==4)
  {
    persontype="好奇";
  }
  else
  {
    persontype="捉摸不定";
  }
  // alert(persontype);
  $("#typetext").html(attrtype);
  $("#persontype").html(persontype);
  resultsql();
}

function resultsql(){
 dataAry = {
    user_id: localStorage.getItem('_userid'),
    result_type:attrtype,
    result_content:attrtext,
  }

  $.post('route/controller.php?action=rpg_result', dataAry, function (data, textStatus, xhr) {

    // alert(data.message);
    switch (data.message) {

      case "success":
        console.log("完成");
        break;
      case "failed":
        alert("level1 data not pull out from sql");
        break;
    }
  }, "json");
}

function webduino_angle(attrtext){
	var _id = localStorage.getItem('_userid');
  var new_angle;
  var linenotify;
  var gettext =attrtext;
  linenotify = {token:'5dELTfzlpium212gUDjW3f9YI1aDwHxp2uMIz1Jz11p'};
	
	var dataAry = {
      id:_id
    };
	
	$.post('route/controller.php?action=webduino_angle', dataAry,function (data, textStatus, xhr) {

    switch (data.message) {

      case "success":
        postData=data.data;
        //alert('postData[0].type');
		switch (postData[0].type){
			
			case '適合堅持拒絕法':
      new_angle = 145;
      line_notify($.extend({},linenotify,{message:localStorage.getItem('_name')+'，系統建議您，適合堅持拒絕法!!'}));
      line_notify($.extend({},linenotify,{message:gettext}));
      break;
			case '適合轉移話題法':
      new_angle = 100;
      line_notify($.extend({},linenotify,{message:localStorage.getItem('_name')+'，系統建議您，適合轉移話題法!!'}));
      line_notify($.extend({},linenotify,{message:gettext}));
      break;	
			case '適合反激將法':
      new_angle = 50;
      line_notify($.extend({},linenotify,{message:localStorage.getItem('_name')+'，系統建議您，適合反激將法!!'}));
      line_notify($.extend({},linenotify,{message:gettext}));
      break;
			case '適合遠離現場法':
      new_angle = 5;
      line_notify($.extend({},linenotify,{message:localStorage.getItem('_name')+'，系統建議您，適合遠離現場法!!'}));
      line_notify($.extend({},linenotify,{message:gettext}));
      
			break;
		}
        
         
        break;

      case "failed":
        alert("data not pull out from sql");
        break;
    }
  }, "json");
	
	
	var servo;


	boardReady({device: 'aRgRN'}, function (board) {
	  board.samplingInterval = 250;
	  servo = getServo(board, 11);
	  servo.angle = new_angle;
	});
  setTimeout(async function () {
    
  }, 100000);
	
}