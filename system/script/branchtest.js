var ques1 = "";
var ques2 = "";
var ques3 = "";
var ques4 = "";
var ques5 = "";
var time = 10000;
var ques = "";

var option1 = "";
var option2 = "";
var option3 = "";
var option4 = "";
var option5 = "";

var check1 = 0;
var check2 = 0;
var check3 = 0;

var answer1 = 0;
var answer2 = 0;
var answer3 = 0;

var btnans1 = 0;
var btnans2 = 0;
var btnans3 = 0;

var selection = 1;
var done = 0;

$(function () {
  $("#correct").hide();
  $("#drug").html(localStorage.getItem('drugname'));
  $("#wrong").hide();
  $("#selectionspan").hide();
  branchquest();//載入問題
  branchoption();//載入選項




  $("#nextbtn").hide();
  counter();

  $("#nextbtn").click(function () {//下一題 按鈕按下
    //重製 參數
    done = 0;
    btnans1 = 0;
    btnans2 = 0;
    btnans3 = 0;

    check1 = 0;
    check2 = 0;
    check3 = 0;

    changequestion();//下一題~~

    $("#correct").hide();
    $("#wrong").hide();
    $("#nextbtn").hide();

    $("#submitbtn").show();
    counter();
  })

  $("#option1").click(function () {//選1
   
    if (done == 0) {
      if (selection == 1) {
        if (check1 == 0) {//沒有被選
          $("#option1").css('background-color', 'rgb(66, 103, 123)');
          check1 = 1;
          btnans1 = 1;//按下去答案=1
        }
        else {
          $("#option1").css('background-color', 'rgb(46, 139, 190)');
          check1 = 0;
          btnans1 = 0;//按下去答案=1???這是複製得吧?
        }
      }
      else {
        $("#option1").css('background-color', 'rgb(66, 103, 123)');
        $("#option2").css('background-color', 'rgb(46, 139, 190)');
        $("#option3").css('background-color', 'rgb(46, 139, 190)');
        btnans1 = 1;//按下去答案=1
        btnans2 = 0;
        btnans3 = 0;
      }
    }

  })
  $("#option2").click(function () {
    if (done == 0) {
      if (selection == 1) {
        if (check2 == 0) {
          $("#option2").css('background-color', 'rgb(66, 103, 123)');
          check2 = 1;
          btnans2 = 1;
        }
        else {
          $("#option2").css('background-color', 'rgb(46, 139, 190)');
          check2 = 0;
          btnans2 = 0;
        }

      }
      else {

        $("#option1").css('background-color', 'rgb(46, 139, 190)');
        $("#option2").css('background-color', 'rgb(66, 103, 123)');
        $("#option3").css('background-color', 'rgb(46, 139, 190)');
        btnans1 = 0;//按下去答案=1
        btnans2 = 1;
        btnans3 = 0;
      }
    }


  })

  $("#option3").click(function () {
    if (done == 0) {
      if (selection == 1) {
        if (check3 == 0) {
          $("#option3").css('background-color', 'rgb(66, 103, 123)');
          check3 = 1;
          btnans3 = 1;
        }
        else {
          $("#option3").css('background-color', 'rgb(46, 139, 190)');
          check3 = 0;
          btnans3 = 0;
        }
      }
      else {
        $("#option1").css('background-color', 'rgb(46, 139, 190)');
        $("#option2").css('background-color', 'rgb(46, 139, 190)');
        $("#option3").css('background-color', 'rgb(66, 103, 123)');
        btnans1 = 0;//按下去答案=1
        btnans2 = 0;
        btnans3 = 1;


      }
    }

  })

  $("#submitbtn").click(function () {//提交答案動作發生

    $("#count").hide();
    ques = localStorage.getItem('test_ques');//拿當前問題編號

    console.log("btnans1" + btnans1);
    console.log("btnans2" + btnans2);
    console.log("btnans3" + btnans3);

    console.log("answer1" + answer1);
    console.log("answer2" + answer2);
    console.log("answer3" + answer3);

    if (btnans1 == 0 && btnans2 == 0 && btnans3 == 0) { //如果都沒有選的話
      alert('請作答');
      btnans1 = 0;
      btnans2 = 0;
      btnans3 = 0;
      check1 = 0;
      check2 = 0;
      check3 = 0;
    }

    else if ((btnans1 == answer1) && (btnans2 == answer2) && (btnans3 == answer3)) {//比對選項是否為正解
      // setTimeout(function(){changequestion();},1000);
      $("#correct").show();//顯示答對
      time = 0;
      done = 1;
      save_testlog(1);
      show_answer();
        // if (answer1 == 1 && answer2 == 0 && answer3 == 0) {
        //   $("#option1").css('background-color', '#00b703');
        //   $("#option2").css('background-color', '#777');
        //   $("#option3").css('background-color', '#777');
        // }
        // if (answer2 == 1 && answer1 == 0 && answer3 == 0) {
        //   $("#option1").css('background-color', '#777');
        //   $("#option2").css('background-color', '#00b703');
        //   $("#option3").css('background-color', '#777');
        // }
        // if (answer3 == 1 && answer1 == 0 && answer2 == 0) {
        //   $("#option1").css('background-color', '#777');
        //   $("#option2").css('background-color', '#777');
        //   $("#option3").css('background-color', '#00b703');
        // }
        // if (answer1 == 1 && answer2 == 1 && answer3 == 0) {
        //   $("#option1").css('background-color', '#00b703');
        //   $("#option2").css('background-color', '#00b703');
        //   $("#option3").css('background-color', '#777');
        // }
        // if (answer1 == 1 && answer2 == 0 && answer3 == 1) {
        //   $("#option1").css('background-color', '#00b703');
        //   $("#option2").css('background-color', '#777');
        //   $("#option3").css('background-color', '#00b703');
        // }
        // if (answer1 == 0 && answer2 == 1 && answer3 == 1) {
        //   $("#option1").css('background-color', '#777');
        //   $("#option2").css('background-color', '#00b703');
        //   $("#option3").css('background-color', '#00b703');
        // }
        // if (answer1 == 1 && answer2 == 1 && answer3 == 1) {
        //   $("#option1").css('background-color', '#00b703');
        //   $("#option2").css('background-color', '#00b703');
        //   $("#option3").css('background-color', '#00b703');
        // }


        // $("#nextbtn").show();//顯示下一題案紐
        // $("#submitbtn").hide();// 隱藏提交按鈕

    }
    else {
      time = 0;
      done = 1; //檢查是否完成
        //把所有狀況列出?? 這樣寫會不會太硬?
        // if (answer1 == 1 && answer2 == 0 && answer3 == 0) {
        //   $("#option1").css('background-color', '#00b703');//綠色
        //   $("#option2").css('background-color', '#777');
        //   $("#option3").css('background-color', '#777');
        // }
        // if (answer2 == 1 && answer1 == 0 && answer3 == 0) {
        //   $("#option1").css('background-color', '#777');
        //   $("#option2").css('background-color', '#00b703');//V
        //   $("#option3").css('background-color', '#777');
        // }
        // if (answer3 == 1 && answer1 == 0 && answer2 == 0) {
        //   $("#option1").css('background-color', '#777');
        //   $("#option2").css('background-color', '#777');
        //   $("#option3").css('background-color', '#00b703');
        // }
        // //複選題~~兩複選全..對
        // if (answer1 == 1 && answer2 == 1 && answer3 == 0) {
        //   $("#option1").css('background-color', '#00b703');
        //   $("#option2").css('background-color', '#00b703');
        //   $("#option3").css('background-color', '#777');
        // }
        // if (answer1 == 1 && answer2 == 0 && answer3 == 1) {
        //   $("#option1").css('background-color', '#00b703');
        //   $("#option2").css('background-color', '#777');
        //   $("#option3").css('background-color', '#00b703');
        // }
        // if (answer1 == 0 && answer2 == 1 && answer3 == 1) {
        //   $("#option1").css('background-color', '#777');
        //   $("#option2").css('background-color', '#00b703');
        //   $("#option3").css('background-color', '#00b703');
        // }
        // //三複選全...對
        // if (answer1 == 1 && answer2 == 1 && answer3 == 1) {
        //   $("#option1").css('background-color', '#00b703');
        //   $("#option2").css('background-color', '#00b703');
        //   $("#option3").css('background-color', '#00b703');
        // }

        // $("#nextbtn").show();
        // $("#submitbtn").hide();
      show_answer();
      save_testlog(0);
      $("#wrong").show();//顯示答錯
    }


  });


});

function save_testlog(logresult){//存入測驗紀錄
  dataAry = {
    quest_ser:window['ques' + ques][1],
    branch_level:localStorage.getItem('branch_level'),
    result:logresult,
    username:localStorage.getItem('_userid')
  };


  $.post('route/controller.php?action=save_testlog', dataAry, function (data, textStatus, xhr) {

    switch (data.message) {

      case "success": 
        break;
      case "failed":
        break;
    }

  }, 'json');


}

function show_answer() {//顯示錯誤與正確選項
  if (answer1 == 1 && answer2 == 0 && answer3 == 0) {
    $("#option1").css('background-color', '#00b703');
    $("#option2").css('background-color', '#777');
    $("#option3").css('background-color', '#777');
  }
  if (answer2 == 1 && answer1 == 0 && answer3 == 0) {
    $("#option1").css('background-color', '#777');
    $("#option2").css('background-color', '#00b703');
    $("#option3").css('background-color', '#777');
  }
  if (answer3 == 1 && answer1 == 0 && answer2 == 0) {
    $("#option1").css('background-color', '#777');
    $("#option2").css('background-color', '#777');
    $("#option3").css('background-color', '#00b703');
  }
  if (answer1 == 1 && answer2 == 1 && answer3 == 0) {
    $("#option1").css('background-color', '#00b703');
    $("#option2").css('background-color', '#00b703');
    $("#option3").css('background-color', '#777');
  }
  if (answer1 == 1 && answer2 == 0 && answer3 == 1) {
    $("#option1").css('background-color', '#00b703');
    $("#option2").css('background-color', '#777');
    $("#option3").css('background-color', '#00b703');
  }
  if (answer1 == 0 && answer2 == 1 && answer3 == 1) {
    $("#option1").css('background-color', '#777');
    $("#option2").css('background-color', '#00b703');
    $("#option3").css('background-color', '#00b703');
  }
  if (answer1 == 1 && answer2 == 1 && answer3 == 1) {
    $("#option1").css('background-color', '#00b703');
    $("#option2").css('background-color', '#00b703');
    $("#option3").css('background-color', '#00b703');
  }
  $("#nextbtn").show();//顯示下一題案紐
  $("#submitbtn").hide();// 隱藏提交按鈕
  
};

function branchquest() {

  dataAry = {
    ser: localStorage.getItem('branch_level'),
  }
  $.post('route/controller.php?action=branchquest', dataAry, function (data, textStatus, xhr) {


    switch (data.message) {

      case "success":
        postData = data.data;
        //全域變數 放入 資料
        ques1 = Array(postData[0].question, postData[0].ser, postData[0].isselection);
        ques2 = Array(postData[1].question, postData[1].ser, postData[1].isselection);
        ques3 = Array(postData[2].question, postData[2].ser, postData[2].isselection);
        ques4 = Array(postData[3].question, postData[3].ser, postData[3].isselection);
        ques5 = Array(postData[4].question, postData[4].ser, postData[4].isselection);

        $("#ques_content").html(ques1[0]);
        selection = ques1[2];
        if (ques1[2] == 1) {
          $("#selectionspan").show();
        }

        localStorage.setItem('test_ques', '1');//
        break;
      case "failed":
        break;
    }

  }, 'json');

}

function branchoption() {

  dataAry = {
    ser: localStorage.getItem('branch_level'),
  }
  $.post('route/controller.php?action=branchoption', dataAry, function (data, textStatus, xhr) {

    switch (data.message) {

      case "success":
        postData = data.data;
        //分配題組
        option1 = Array(postData[0].options, postData[1].options, postData[2].options, postData[0].quest_ser, postData[0].isanswer, postData[1].isanswer, postData[2].isanswer);
        option2 = Array(postData[3].options, postData[4].options, postData[5].options, postData[0].quest_ser, postData[3].isanswer, postData[4].isanswer, postData[5].isanswer);
        option3 = Array(postData[6].options, postData[7].options, postData[8].options, postData[0].quest_ser, postData[6].isanswer, postData[7].isanswer, postData[8].isanswer);
        option4 = Array(postData[9].options, postData[10].options, postData[11].options, postData[0].quest_ser, postData[9].isanswer, postData[10].isanswer, postData[11].isanswer);
        option5 = Array(postData[12].options, postData[13].options, postData[14].options, postData[0].quest_ser, postData[12].isanswer, postData[13].isanswer, postData[14].isanswer);

        $("#option1").html(option1[0]);
        $("#option2").html(option1[1]);
        $("#option3").html(option1[2]);
        answer1 = option1[4];
        answer2 = option1[5];
        answer3 = option1[6];

        var i = 1;
        var control_Option = window['option' + i][0];



      case "failed":
        break;
    }
  }, 'json');

}

function changequestion() { //改變問題(下一題)

  $("#option1").css('background-color', 'rgb(46, 139, 190)');
  $("#option2").css('background-color', 'rgb(46, 139, 190)');
  $("#option3").css('background-color', 'rgb(46, 139, 190)');
  //-----------------------
  var now_ques = ques;//捕捉現在的問題流水號
  
    now_ques++;//下一題的流水號+1

  if (ques >=5) {

    if (localStorage.getItem('branch_level') == 1) {
      localStorage.setItem('A_fin', '1');
    }
    if (localStorage.getItem('branch_level') == 2) {
      localStorage.setItem('B_fin', '1');
    }
    if (localStorage.getItem('branch_level') == 3) {
      localStorage.setItem('C_fin', '1');
    }
    if (localStorage.getItem('branch_level') == 4) {
      localStorage.setItem('D_fin', '1');
    }
    if (localStorage.getItem('branch_level') == 5) {
      localStorage.setItem('E_fin', '1');
    }
    window.location.href = './test?param1=F4B'
    exit();
  }
  
  localStorage.setItem('test_ques', now_ques);//設置
  console.log(now_ques);

  selection = window['ques' + now_ques][2];//利用動態變數的方法  
  answer1 = window['option' + now_ques][4];
  answer2 = window['option' + now_ques][5];
  answer3 = window['option' + now_ques][6];

  $("#ques_content").html(window['ques' + now_ques][0]);
  $("#option1").html(window['option' + now_ques][0]);
  $("#option2").html(window['option' + now_ques][1]);
  $("#option3").html(window['option' + now_ques][2]);

  if (selection == 1) {
    $("#selectionspan").show();
  }
  else {

    $("#selectionspan").hide();
  }
  
  //-----------以下是舊版的code-------------
  

    // if (ques == 1) {
    //   localStorage.setItem('test_ques', '2');//第二題

    //   selection = ques2[2];
    //   answer1 = option2[4];
    //   answer2 = option2[5];
    //   answer3 = option2[6];
    //   $("#ques_content").html(ques2[0]);
    //   $("#option1").html(option2[0]);
    //   $("#option2").html(option2[1]);
    //   $("#option3").html(option2[2]);

    //   if (selection == 1) {
    //     $("#selectionspan").show();
    //   }
    //   else {

    //     $("#selectionspan").hide();
    //   }
    // }
    // else if (ques == 2) {
    //   localStorage.setItem('test_ques', '3');//第3題
    //   selection = ques3[2];
    //   answer1 = option3[4];
    //   answer2 = option3[5];
    //   answer3 = option3[6];
    //   $("#ques_content").html(ques3[0]);
    //   $("#option1").html(option3[0]);
    //   $("#option2").html(option3[1]);
    //   $("#option3").html(option3[2]);
    //   if (selection == 1) {
    //     $("#selectionspan").show();
    //   }
    //   else {
    //     $("#selectionspan").hide();
    //   }
    // }
    // else if (ques == 3) {
    //   localStorage.setItem('test_ques', '4');//第4題
    //   selection = ques4[2];
    //   answer1 = option4[4];
    //   answer2 = option4[5];
    //   answer3 = option4[6];
    //   $("#ques_content").html(ques4[0]);
    //   $("#option1").html(option4[0]);
    //   $("#option2").html(option4[1]);
    //   $("#option3").html(option4[2]);
    //   if (selection == 1) {
    //     $("#selectionspan").show();
    //   }
    //   else {
    //     $("#selectionspan").hide();
    //   }
    // }
    // else if (ques == 4) {
    //   localStorage.setItem('test_ques', '5');
    //   selection = ques5[2];
    //   answer1 = option5[4];
    //   answer2 = option5[5];
    //   answer3 = option5[6];
    //   $("#ques_content").html(ques5[0]);
    //   $("#option1").html(option5[0]);
    //   $("#option2").html(option5[1]);
    //   $("#option3").html(option5[2]);
    //   if (selection == 1) {
    //     $("#selectionspan").show();
    //   }
    //   else {
    //     $("#selectionspan").hide();
    //   }
    // }
    // else {

    //   if (localStorage.getItem('branch_level') == 1) {
    //     localStorage.setItem('A_fin', '1');
    //   }
    //   if (localStorage.getItem('branch_level') == 2) {
    //     localStorage.setItem('B_fin', '1');
    //   }
    //   if (localStorage.getItem('branch_level') == 3) {
    //     localStorage.setItem('C_fin', '1');
    //   }
    //   if (localStorage.getItem('branch_level') == 4) {
    //     localStorage.setItem('D_fin', '1');
    //   }
    //   if (localStorage.getItem('branch_level') == 5) {
    //     localStorage.setItem('E_fin', '1');
    //   }


    //   window.location.href = './test?param1=F4B'
    // }
}


function counter() { //倒數計時器(目前)
  !function MyCounter() {

    if (time <= 0) {
      //倒數完成
    } else {
      $("#count").animate({ width: "0%" }, 10000);
      console.log((time / 1000) + " sec...");
      setTimeout(MyCounter, 1000);
    }
    time -= 1000;
  }();
}
