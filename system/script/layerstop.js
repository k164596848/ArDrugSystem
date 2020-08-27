var url = location.href; //現在的網址

var B1 = "";
var B2 = "";
var B3 = "";
var check = 0;
var check2 = 0;
var check3 = 0;
var page = "";
var direct1 = 0; //讀不懂
var direct2 = 0;
var direct3 = 0;

if (url.indexOf('?') != -1) {
  var upser = "";
  //在此直接將各自的參數資料切割放進ary中
  var ary = url.split('?')[1].split('&');
  //此時ary的內容為：

  //下迴圈去搜尋每個資料參數
  for (i = 0; i <= ary.length - 1; i++) {
    if (ary[i].split('=')[0] == 'upser') {
      upser = ary[i].split('=')[1];
    }
    if (ary[i].split('=')[0] == 'param1') {
      page = ary[i].split('=')[1];
    }

  }
}

$(function () {

  getCookieupser(upser);

  $("#stamp1").hide();
  $("#stamp2").hide();
  $("#stamp3").hide();
  $("#UP_1").hide();
  $("#UP_2").hide();
  $("#UP_3").hide();
  $("#UPdiv_3").hide();
  $("#UPdiv_2").hide();
  $("#UPdiv_1").hide();
  $("#click_point1").hide();
  $("#click_point2").hide();
  $("#click_point3").hide();

  level1(upser);
  level2(upser);

  $("#backbtn").click(function () {
    $("#all").addClass('all_dis'); //全畫面
    setTimeout(function () { history.back(-1); }, 1500);
  })
});

function level1(mindser) {//撈出當前 ser的資料
  dataAry = {
    level1ser: mindser
  }

  $.post('route/controller.php?action=level1', dataAry, function (data, textStatus, xhr) {

    // alert(data.message);
    switch (data.message) {

      case "success":
        postData = data.data;
        $("#Maptext").html(postData[0].branch_content);
        $("#B0text").html(postData[0].branch_content);
        localStorage.setItem('drugname', postData[0].branch_content);
        break;
      case "failed":
        alert("level1 data not pull out from sql");
        break;
    }
  }, "json");
}

function level2(mindser) {//撈出以 當前ser 為 前一層的資料 
  dataAry = {
    level1ser: mindser,
  }

  $.post('route/controller.php?action=level2', dataAry, function (data, textStatus, xhr) {

    // alert(data.message);
    switch (data.message) {

      case "success":
        postData = data.data;
        next_total = postData[0].total;
        B1 = postData[0].ser;
        B2 = postData[1].ser;
        B3 = postData[2].ser;

        getCookieB1(B1);
        getCookieB2(B2);
        getCookieB3(B3);

        $("#B1text").html(postData[0].branch_content);
        $("#B2text").html(postData[1].branch_content);
        $("#B3text").html(postData[2].branch_content);
        check_path();
        break;
      case "failed":
        alert("level2 sql failed");
        break;
    }
  }, "json");
}



function check_path() {

  dataAry=
  {
    username:localStorage.getItem("_userid")
  }
 $.post('route/controller.php?action=check_path',dataAry, function (data, textStatus, xhr) {

    // alert(data.message);
    switch (data.message) {

      case "success":
        postData = data.data;

        if (direct1 == 1 && direct2 == 0 && direct3 == 0) {
          animate_stamp();
        }
        else if (direct1 == 1 && direct2 == 1 && direct3 == 0) {
          animate_stamp2();
        }
        else if (direct1 == 1 && direct2 == 1 && direct3 == 1) {
          animate_stamp3();
          setCookie(upser);
          if (check3 == 0) {
            setTimeout(function () { window.location.href = './test?param1=F4B' }, 2000);
          }
        }
        else {
          block_amp();
        }

        break;
      case "failed":
        // alert("data not pull out from sql");block_amp();
        block_amp();
        break;
    }
  }, "json").done(function () {
    $("#load").addClass('all_dis');
    setTimeout(function () { $("#load").hide(); }, 100);
    setTimeout(function () { $("#bg").addClass('all_show') }, 600);
  })
}

function animate_stamp() {
  $("#stamp1").show();
  $("#stamp2").hide();
  $("#UP_1").show();
  $("#click_point1").hide();
  $("#click_point2").show();
  $("#click_point3").hide();
  $("#UP_1").show();
  // $("#UP_3").show();
  $("#stamp1").addClass('stamp');
  $("#block2").addClass('block1');
  if (page == "F4BL1") {

    $("#border3_img").attr('src', './pic/gray_button2.png');
  }
  else {

    $("#border3_img").attr('src', './pic/gray_button.png');
  }
}

function animate_stamp2() {
  $("#stamp1").show();
  $("#stamp2").show();
  $("#click_point3").show();
  $("#UP_1").show();
  $("#UP_2").show();
  $("#stamp2").addClass('stamp');
  $("#block3").addClass('block1');
}
function animate_stamp3() {
  $("#stamp1").show();
  $("#stamp2").show();
  $("#stamp3").show();
  $("#click_point2").hide();
  $("#UP_1").show();
  $("#UP_2").show();
  $("#UP_3").show();
  $("#stamp3").addClass('stamp');
}

function block_amp() {
  $("#block1").addClass('block1');
  $("#UP_block1").addClass('block1');
  $("#click_point1").show();
  if (page == "F4BL1") {
    $("#border2_img").attr('src', './pic/gray_button2.png');
    $("#border3_img").attr('src', './pic/gray_button2.png');
  }
  else {
    $("#border2_img").attr('src', './pic/gray_button.png');
    $("#border3_img").attr('src', './pic/gray_button.png');
  }
}

function getCookieB1(cname) { //快速讀取密碼

  var check = 0;
  var name = cname + "=";
  
  var ca = document.cookie.split(';');//把 ;號拿掉
  
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();//去掉頭尾的空白
    if (c.indexOf(name) == 0) {
      direct1 = 1;
    }
  }
}

function getCookieB2(cname) { //快速讀取密碼

  var check = 0;
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) {
      direct2 = 1;
    }
  }
}
function getCookieB3(cname) { //快速讀取密碼

  var check = 0;
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) {
      direct3 = 1;
    }
  }
}

function getCookieupser(cname) { //快速讀取密碼

  var check = 0;
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) {
      check3 = 1;
    }
  }
}
function setCookie(page) { //設定cookie

  expire_days = 0.01; // 過期日期(天)
  var d = new Date();
  d.setTime(d.getTime() + (10));
  document.cookie = '' + page + '=clear;path=/;max-age=2592000;';
}