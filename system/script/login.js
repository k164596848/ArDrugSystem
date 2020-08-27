var url = location.href;

//再來用去尋找網址列中是否有資料傳遞(QueryString)
if (url.indexOf('?') != -1) {
  var param = "";
  var A = "";
  var id = ""; pw = "";
  //在此直接將各自的參數資料切割放進ary中
  var ary = url.split('?')[1].split('&');
  //此時ary的內容為：
  //ary[0] = 'param=U001'，ary[1] = 'ser=GQSM'

  //下迴圈去搜尋每個資料參數
  for (i = 0; i <= ary.length - 1; i++) {
    //如果資料名稱為id的話那就把他取出來
    if (ary[i].split('=')[0] == 'user') {
      id = ary[i].split('=')[1];
    }
    if (ary[i].split('=')[0] == 'psw') {
      pw = ary[i].split('=')[1];
    }
  }
}

$(function () {
  if (id && pw) {
    login();
  }
});

$("#loginbtn").click(function (event) {
  id = $("#user_id").val();
  pw = $("#user_pw").val();
  login();
});


function login() {
  dataAry = {
    user_id: id,
    user_pw: pw,
  }
  $.post('route/controller.php?action=login', dataAry, function (data, textStatus, xhr) {

    switch (data.message) {
      case "success":
      localStorage.setItem('_name', data.data[0].USERNAME);
      localStorage.setItem('_userid', data.data[0].USER_ID);
        postData = data.data;
        swal({
          title: "success",
          icon: "success",
          button: "確認",
        }).then((value) => {
          window.location.href = './login?param1=F4B';
        });
        break;
      case "failed":
        swal({
          title: "登入失敗",
          icon: "error",
          button: "確認",
        });
        $("form")[0].reset();
        break;
    }

  }, 'json');

}