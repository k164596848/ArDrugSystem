var url = location.href;
var B1="";
var check=0;
var nextresult=0;
var NewArray = new Array();
var NewArray1 = new Array();
var NewArray2 = new Array();
var endgame=new Array();
var countattr=new Array();
var rolename=[];
var conversation=[]; //對話存取
var count=0; //計算對話有幾個
var section=0;
var question=1;
var optionacc=0;
var group=0;
var startsituate=0; //判斷開始遊戲
var Aattr,Battr,Cattr,Dattr,Eattr; //暫存選項屬性
let attr_total=[]; //存屬性
var end=0; //判斷是否結局
var friendly=0,tough=0,avoid=0,sensitive=0,timid=0,curious=0,crisis=0,reaction=0;
var p_Introvert=0,p_outward=0,p_Sensitive=0,p_Friendly=0,p_Curious=0;
//友善,強硬,迴避,敏感,膽小,好奇,危機意識，反應
 if(url.indexOf('?')!=-1)
    { 
       var upser="";
      //在此直接將各自的參數資料切割放進ary中
      var ary = url.split('?')[1].split('&');
      //此時ary的內容為：
      
      //下迴圈去搜尋每個資料參數
      for(i=0;i<=ary.length-1;i++)
      {
          if(ary[i].split('=')[0] == 'upser'){
             upser = ary[i].split('=')[1];
          }
          if(ary[i].split('=')[0] == 'param1'){
             page = ary[i].split('=')[1];
          }
      }
    }

$(function(){
  quest();
  option(1);
  $("#endimg").hide();
  $("#name_div").hide();
  $("#situation").hide();
  $("#con_div").hide();
  $("#backindex").click(function(){
    window.location.href='./login?param1=F4B';
  })

  $("#start").click(function(){
    setTimeout(function(){$("#rpg_index").hide();$("#situation").show();$("#con_div").show();startsituate=1},1500)
    $("#rpg_index").addClass('fade');
  });
$("body").click(function(){
  if(nextresult==1)
  {
    window.location.href="./situation?param1=F4R";
  }
});
$("#con_div").click(function(){
  
  if(startsituate==1) //判斷是否進入遊戲
  {

  if(section<conversation[question-1].length-1){  //判斷要選擇答案ㄌ沒
    $("#conversation").removeClass('conversation');
    $("#conversation").hide();
    $("#conversation").html(conversation[question-1][section+1][1]);

    setTimeout(function(){$("#conversation").addClass('conversation');$("#conversation").show();},500);
    
    
  if(conversation[question-1][section+1][0]=='A') //第一人稱
  {
    $("#role_name").html("我");
    $("#name_div").show();
    $("#A").attr('src','./pic/role/A.png');
    $("#B").attr('src','');
  }
  else if(conversation[question-1][section+1][0]=='Z') //旁白
  {
    $("#name_div").hide();
    $("#A").attr('src','');
    $("#B").attr('src','');
  }
  
  else if(conversation[question-1][section+1][0]) 
  {   
    $("#role_name").html(conversation[question-1][section+1][2]);
    $("#name_div").show();
    $("#B").attr('src','./pic/role/'+conversation[question-1][section+1][0]+'.png');
    $("#role_name").html(conversation[question-1][section+1][5]);
    // console.log(conversation[question-1][section+1][5]);
  }


  if(conversation[question-1][section+1][3]) //換背景
  { 
    $("#situation").addClass('bgg');
    var xx=(conversation[question-1][section+1][3]);
    setTimeout(function(){$("#situation").css('background-image','url(./pic/bg/'+xx+'.png)'); },500);
    setTimeout(function(){$("#situation").removeClass('bgg'); },1100);
  }
  section=section+1;
  }
  else
  { 
    if(end==0)
    {
        if(optionacc==5)
      {
        $("#btnA").removeClass("disapear");
        $("#btnB").removeClass("disapear");
        $("#btnC").removeClass("disapear");
        $("#btnD").removeClass("disapear");
        $("#btnE").removeClass("disapear");
      }
      else if(optionacc==3)
      {
        $("#btnA").removeClass("disapear");
        $("#btnB").removeClass("disapear");
        $("#btnC").removeClass("disapear");
      }
      else if (optionacc==2)
      {
        $("#btnA").removeClass("disapear");
        $("#btnB").removeClass("disapear");
      }
      else if (optionacc==4)
      {
        $("#btnA").removeClass("disapear");
        $("#btnB").removeClass("disapear");
        $("#btnC").removeClass("disapear");
        $("#btnD").removeClass("disapear");
      }
    }

    
  }
  }
  
});

$("#btnA").click(function(){
  question=$("#btnA").val();
  $("#conversation").hide();
  $("#conversation").removeClass('conversation');
  section=0;
  $("#btnA").addClass('disapear');
  $("#btnB").addClass('disapear');
  $("#btnC").addClass('disapear');
  $("#btnD").addClass('disapear');
  $("#btnE").addClass('disapear');
  attr_total.push(Aattr);
  option(question);
  console.log('question'+question+'section'+section);
  // $("#B").attr('src','');
  changerole();
  $("#conversation").html(conversation[question-1][section][1]);
  setTimeout(function(){$("#conversation").addClass('conversation');$("#conversation").show();},500);
  changebg();
});
$("#btnB").click(function(){
  $("#conversation").hide();
  question=$("#btnB").val();
  section=0;
  $("#btnA").addClass('disapear');
  $("#btnB").addClass('disapear');
  $("#btnC").addClass('disapear');
  $("#btnD").addClass('disapear');
  $("#btnE").addClass('disapear');
  attr_total.push(Battr);
  option(question);
  changerole();
  $("#conversation").html(conversation[question-1][section][1]);
  setTimeout(function(){$("#conversation").addClass('conversation');$("#conversation").show();},500);
  changebg();
})
$("#btnC").click(function(){
  $("#conversation").hide();
  question=$("#btnC").val();
  section=0;
  $("#btnA").addClass('disapear');
  $("#btnB").addClass('disapear');
  $("#btnC").addClass('disapear');
  $("#btnD").addClass('disapear');
  $("#btnE").addClass('disapear');
  attr_total.push(Cattr);
  // alert(Cattr);
  option(question);
  changerole();
  $("#conversation").html(conversation[question-1][section][1]);
  setTimeout(function(){$("#conversation").addClass('conversation');$("#conversation").show();},500);
  changebg();
})

$("#btnD").click(function(){
  $("#conversation").hide();
  question=$("#btnD").val();
  section=0;
  $("#btnA").addClass('disapear');
  $("#btnB").addClass('disapear');
  $("#btnC").addClass('disapear');
  $("#btnD").addClass('disapear');
  $("#btnE").addClass('disapear');
  attr_total.push(Dattr);
  option(question);
  changerole();
  $("#conversation").html(conversation[question-1][section][1]);
  setTimeout(function(){$("#conversation").addClass('conversation');$("#conversation").show();},500);
  changebg();
})
$("#btnE").click(function(){
  $("#conversation").hide();
  question=$("#btnE").val();
  section=0;
  $("#btnA").addClass('disapear');
  $("#btnB").addClass('disapear');
  $("#btnC").addClass('disapear');
  $("#btnD").addClass('disapear');
  $("#btnE").addClass('disapear');
  attr_total.push(Eattr);
  changerole();
  option(question);
  $("#conversation").html(conversation[question-1][section][1]);
  setTimeout(function(){$("#conversation").addClass('conversation');$("#conversation").show();},500);
  changebg();
})
});

function quest(mindser)
{	

	$.post('route/controller.php?action=rpg_quest',function (data, textStatus, xhr) {

    // alert(data.message);
    switch (data.message) {

      case "success":
        postData=data.data;
    
      for(var x=0;x<postData.length;x++)
      { 
        
        conversation[x]=[];
        endgame[x]=[];
        rolename[x]=[];
        NewArray=postData[x].content.split("#");
        endgame[x]=NewArray[0].split("=");
        if(endgame[x].length==1)
        {
            for(var i=0;i<NewArray.length;i++)
          { 
            count=NewArray.length;
            conversation[x][i]=[];
            rolename[x][i]=[];
            NewArray1=NewArray[i].split("@"); //判斷有沒有要換場景

            // conversation[i]=new Array();
            if(NewArray1.length==2) //如果長度=2就換圖
            {
             // alert(NewArray1[0]);
              NewArray2=NewArray1[1].split("%");
              
              conversation[x][i][0]=NewArray2[0];//角色

              rolename[x][i]=NewArray2[1].split("$");
              conversation[x][i][5]=rolename[x][i][0];//角色名
              conversation[x][i][1]=rolename[x][i][1];//對話
              conversation[x][i][3]=NewArray1[0];//背景
              conversation[x][i][4]=endgame[0];//背景
            }
            else
            {
              NewArray2=NewArray1[0].split("%");
              rolename[x][i]=NewArray2[1].split("$");
              // console.log(rolename[x][i][1]+'long:'+endgame[x].length);
              // console.log('x:'+x+'i:'+i);
              conversation[x][i][0]=NewArray2[0];//角色
              conversation[x][i][5]=rolename[x][i][0];//角色名
              conversation[x][i][1]=rolename[x][i][1];//對話
          
            }
          }
        }
        
      }
    // alert(conversation[4][0][1]);
       $("#conversation").html(conversation[0][0][1]);
       $("#situation").css('background-image','url(./pic/bg/'+conversation[0][0][3]+'.png)');
        break;
      case "failed":
            $("#the_end").removeClass("disapear");
        break;
    }
  }, "json");
}

function option(ser)
{	
  dataAry={
    qser:ser,
  }

	$.post('route/controller.php?action=rpg_option',dataAry,function (data, textStatus, xhr) {

    switch (data.message) {

      case "success":
        postData = data.data;

        if(postData.length==5)
        {
          $("#btnA").val(postData[0].nextquest);
          $("#btnA").html(postData[0].content);
          Aattr=postData[0].attribute;
          $("#btnB").val(postData[1].nextquest);
          $("#btnB").html(postData[1].content);
          Battr=postData[1].attribute;
          $("#btnC").val(postData[2].nextquest);
          $("#btnC").html(postData[2].content);
          Cattr=postData[2].attribute;
          $("#btnD").val(postData[3].nextquest);
          $("#btnD").html(postData[3].content);
          Dattr=postData[3].attribute;
          $("#btnE").val(postData[4].nextquest);
          $("#btnE").html(postData[4].content);
          Eattr=postData[4].attribute;
          optionacc=5;
        }
         else if(postData.length==4)
        {
          $("#btnA").val(postData[0].nextquest);
          $("#btnA").html(postData[0].content);
          $("#btnB").val(postData[1].nextquest);
          $("#btnB").html(postData[1].content);
          $("#btnC").val(postData[2].nextquest);
          $("#btnC").html(postData[2].content);
          $("#btnD").val(postData[3].nextquest);
          $("#btnD").html(postData[3].content);
          
          Aattr=postData[0].attribute;
          Battr=postData[1].attribute;
          Cattr=postData[2].attribute;
          Dattr=postData[3].attribute;
          optionacc=4;
        }
        else if(postData.length==3)
        {
          $("#btnA").val(postData[0].nextquest);
          $("#btnA").html(postData[0].content);
          $("#btnB").val(postData[1].nextquest);
          $("#btnB").html(postData[1].content);
          $("#btnC").val(postData[2].nextquest);
          $("#btnC").html(postData[2].content);
          Aattr=postData[0].attribute;
          Battr=postData[1].attribute;
          Cattr=postData[2].attribute;
          optionacc=3;
        }
        else if(postData.length==2)
        {
          $("#btnA").val(postData[0].nextquest);
          $("#btnA").html(postData[0].content);
          $("#btnB").val(postData[1].nextquest);
          $("#btnB").html(postData[1].content);
          Aattr=postData[0].attribute;
          Battr=postData[1].attribute;
          optionacc=2;
        }

        break;
      case "failed":
        // alert("data not pull out from sql");
        end=1;
        if(endgame[question-1].length==2)
        {
          // alert(endgame[question-1][1]);
          $(".opt").hide();
          $("#the_end").removeClass('disapear');
          $("#name_div").hide();
          $("#con_div").hide();
          $("#A").hide();
          $("#B").hide();
          $("#endconversation").html(endgame[question-1][1]);
          $("#the_end").addClass('endconversation');
        }
        // cal_attr();
        $.when( cal_attr()).done(function(){ 
          rpg_analysis();
        })
        break;
    }
  }, "json");
}

function changebg()
{
  if(conversation[question-1][section][3])
  { 
    $("#situation").addClass('bgg');
    var xx=(conversation[question-1][section][3]);
    setTimeout(function(){$("#situation").css('background-image','url(./pic/bg/'+xx+'.png)'); },500);
    setTimeout(function(){$("#situation").removeClass('bgg'); },1100);
    
  }
}

function cal_attr()
{
  for(var a=0;a<attr_total.length;a++)
  {
    
    countattr[a]=[];
    countattr[a]=attr_total[a].split("、");

    // alert(countattr[a].length);
    for(var l=0;l<countattr[a].length;l++)
    { 
      
      console.log(countattr[a][l]);
      console.log('a'+a);
        switch(countattr[a][l])
      {
        case'友善':
          friendly=friendly+1;
          break;
        case'強硬':
          tough=tough+1;
          break;
        case'迴避':
          avoid=avoid+1;
          break;
        case'敏感':
          sensitive=sensitive+1;
          break;
        case'膽小':
          timid=timid+1;
          break;
        case'好奇':
          curious=curious+1;
          break;
        case'危機':
          crisis=crisis+1;
          break;
        case'反應':
          reaction=reaction+1;
          break;
        case'內向':
          p_Introvert=p_Introvert+1;
          break;
        case'外向':
          p_outward=p_outward+1;
          break;
        case'神經':
        p_Sensitive=p_Sensitive+1;
          break;
        case'友好':
        p_Friendly=p_Friendly+1;
          break;
        case'奇':
        p_Curious=p_Curious+1;
        // alert(p_Curious);
          break;
      }
    }
    // p_Introvert=0,p_outward=0,p_Sensitive=0,p_Friendly=0,p_Curious=0;
  }
}

function rpg_analysis()
{  
  
  dataAry=
  {
    userid:localStorage.getItem('_userid'),
    Friendly:friendly,
    Tough:tough,
    Avoid:avoid,
    Sensitive:sensitive,
    Timid:timid,
    Curious:curious,
    Crisis:crisis,
    Reaction:reaction,
    p_Introvert:p_Introvert,
    p_outward:p_outward,
    p_Sensitive:p_Sensitive,
    p_Friendly:p_Friendly,
    p_Curious:p_Curious,
  }

  $.post('route/controller.php?action=rpg_analysis',dataAry,function (data, textStatus, xhr) {

    switch (data.message) {

      case "success":
        // alert("新增成功");
        nextresult=1;
        break;
      case "failed":
        alert("data not pull out from sql");
        break;
    }
  }, "json");
}

function changerole(){
  if(conversation[question-1][section][0]=='A') //第一人稱
  {
    $("#role_name").html("我");
    $("#name_div").show();
    $("#A").attr('src','./pic/role/A.png');
    $("#B").attr('src','');
  }
  else if(conversation[question-1][section][0]=='Z') //旁白
  {
    $("#name_div").hide();
    $("#A").attr('src','');
    $("#B").attr('src','');

  }
  
  else if(conversation[question-1][section][0]) 
  {   
    $("#role_name").html(conversation[question-1][section][2]);
    $("#name_div").show();
    $("#B").attr('src','./pic/role/'+conversation[question-1][section][0]+'.png');
    $("#role_name").html(conversation[question-1][section][5]);
    // console.log(conversation[question-1][section+1][5]);
  }
}

