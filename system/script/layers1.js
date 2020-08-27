var url = location.href;
var B1 = "";
var check = 0;
var page = 0;
var direct = 0;
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
  getCookie(upser);
  $("#drugname").html(localStorage.getItem('drugname'));
  $("#stamp1").hide();
  $("#UP_2-1").hide();
  $("#UP_1").hide();
  level1(upser);
  level2(upser);
  $("#block1").click(function () {
    $("#UP_1").show();
    $("#click_point2").hide();
    $("#block1").addClass('inteach')
    $("#all").addClass('all_dis'); //全畫面
    // window.location.href='./test?param1=F4E&question='+B1+'';
    if (localStorage.getItem('last') == 1) {
      localStorage.setItem('last', '2');
    }
    setTimeout(function () { window.location.href = './test?param1=F4E&question=' + B1 + ''; }, 1000);
  });
  $("#backbtn").click(function () {
    $("#all").addClass('all_dis'); //全畫面
    setTimeout(function () { history.back(-1); }, 1000);
  })
});

function level2(mindser) {
  dataAry =
    {
      level1ser: mindser,
    }

  $.post('route/controller.php?action=level2', dataAry, function (data, textStatus, xhr) {

    // alert(data.message);
    switch (data.message) {

      case "success":
        postData = data.data;
        next_total = postData[0].total;
        B1 = postData[0].ser;
        $("#B1text").html(postData[0].branch_content);
        check_path();
        break;
      case "failed":
        alert("data not pull out from sql");
        break;
    }
  }, "json");
}

function level1(mindser) {
  dataAry =
    {
      level1ser: mindser,
    }

  $.post('route/controller.php?action=level1', dataAry, function (data, textStatus, xhr) {

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

function check_path()//確認路徑
{
  dataAry =
    {
      username: localStorage.getItem("_userid")
    }
  $.post('route/controller.php?action=check_path', dataAry, function (data, textStatus, xhr) {

    // alert(data.message);
    switch (data.message) {

      case "success":
        postData = data.data;
        for (var i = 0; i < postData.length; i++) {
          if (B1 == postData[i].user_path) {
            check = 1;
            // alert("已完成");

          }
          else {
            // alert("未完成");

          }
        }
        if (check == 1) {
          animate_stamp();
          setCookie(upser);
          if (direct == 0) {
            setTimeout(function () { $("#all").addClass('all_dis'); }, 1000);

            setTimeout(function () { history.back(-1) }, 2000);
          }
        }
        else {
          $("#block1").addClass('block1');
        }
        break;
      case "failed":
        alert("data not pull out from sql");
        break;
    }
  }, "json").done(function () {
    $("#load").addClass('all_dis');

    setTimeout(function () { $("#load").hide(); }, 100);
    setTimeout(function () { $("#bg").addClass('all_show') }, 200);
  });
}


function animate_stamp() {
  $("#stamp1").show();
  $("#click_point3").hide();
  $("#click_point2").hide();
  $("#UP_2-1").show();
  $("#UP_1").show();
  $("#stamp1").addClass('stamp');

}


function getCookie(cname) //快速讀取密碼
{
  var check = 0;
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) {
      direct = 1;
    }
  }

}

function setCookie(page) //設定cookie
{
  expire_days = 0.01; // 過期日期(天)
  var d = new Date();
  d.setTime(d.getTime() + (10));
  document.cookie = '' + page + '=clear;path=/;max-age=2592000;';
}