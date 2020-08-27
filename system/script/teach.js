
var url = location.href;
if (url.indexOf('?') != -1) {
  var upser = "";
  var question = "";
  var teachser = "";
  var check = 0;
  //在此直接將各自的參數資料切割放進ary中
  var ary = url.split('?')[1].split('&');
  //此時ary的內容為：

  //下迴圈去搜尋每個資料參數
  for (i = 0; i <= ary.length - 1; i++) {
    //如果資料名稱為id的話那就把他取出來
    if (ary[i].split('=')[0] == 'question') {
      question = ary[i].split('=')[1];
    }
    if (ary[i].split('=')[0] == 'question') {
      upser = ary[i].split('=')[1];
    }
  }
}

$(function () {//start execute

  level2(upser);
  $("#finish").click(function () {
    // $("body").removeClass('all_show');

    $("#all").addClass('all_dis');

    if (check == 0) //判斷是否有看過 沒有則記錄
    {
      record_path(upser);
    }
    else {
      history.back(-1);
    }
    // setTimeout(function(){ changepage();},1000)
  });
  $("#back").click(function () {
    // $("body").removeClass('all_show');
    $("#all").addClass('all_dis');
    setTimeout(function () { backpage(); }, 1000)
  });

});




function backpage() {
  history.go(-1);
}

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
        // alert(postData[0].ser);
        teachser = postData[0].ser;
        $("#content").html(postData[0].branch_content);
        check_path();

        break;
      case "failed":
        alert("the action level2 is failed");
        break;
    }
  }, "json").done(function () {
    $("#load").addClass('all_dis');
    setTimeout(function () { $("#load").hide(); }, 100);
    setTimeout(function () { $("#bg").addClass('all_show') }, 200);
  });
}


function record_path(mindser) //寫入路徑紀錄
{
  dataAry =
    {
      level1ser: mindser,
      username: localStorage.getItem('_userid')
    }

  $.post('route/controller.php?action=record_path', dataAry, function (data, textStatus, xhr) {

    // alert(data.message);
    switch (data.message) {

      case "success":
        postData = data.data;

        if (localStorage.getItem('last') == 2) {
          window.location.href = './test?param1=F4T'
        }
        else {
          history.back(-1);
        }
        break;
      case "failed":
        alert("data not pull out from sql");
        break;
    }
  }, "json");
}

function check_path() {
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
          if (upser == postData[i].user_path) {
            check = 1;

          }
        }
        break;
      case "failed":
        // alert("data not pull out from sql");
        break;
    }
  }, "json");
}

