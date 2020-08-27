var modules = {
  ui: function(){
      
      modules.paymentListEvent();
      
  },
    paymentListEvent: function(){
        if ( $.fn.dataTable.isDataTable( '#paymentListTable' ) ) {
            $('#paymentListTable').DataTable();
        }
        else
        {
            $('#paymentListTable').DataTable({
                "bProcessing": true,
                "sAjaxSource": "route/controller.php?action=paymentlist",
                "aoColumns": [
                    { "mData": "id"},
                    { "mData": "paperid"},
                    { "mData": "orderid"},
                    { "mData": "orderstatus",
                        "mRender":function(val,type,row){
                            switch(parseInt(val))
                            {
                                case 1:
                                    return "<span class='label label-success'>S</span>";
                                    break;
                                case 2:
                                    return "<span class='label label-danger'>F</span>";
                                    break;
                                default:
                                    return "<span class='label label-default'>無</span>";
                                    break;
                            }
                        }
                    },
                    { "mData": "pay_type",
                        "mRender":function(val,type,row){
                            switch(parseInt(val))
                            {
                                case 1:
                                    return "<span class='label label-warning'><span class='fa fa-credit-card'>信用卡</span></span>";
                                    break;
                                case 2:
                                    return "<span class='label label-primary'><span class='fa fa-credit-card-alt'>銀聯卡</span></span>";
                                    break;
                                default:
                                    return "<span class='label label-default'>無</span>";
                                    break;
                            }
                        }
                    },
                    { "mData": "amount"},
                    { "mData": "payer"},
                    { "mData": "organization"},
                    { "mData": "id", "sWidth": '20%' ,
                          "mRender":function(val,type,row) {
                            return "<button class='btn btn-info btn-circle' data-toggle='modal' data-target='#infoModal' onclick='loadEvent(\""+val.toString()+"\")'><span class='fa fa-info' aria-hidden='true'></span></button><button class='btn btn-danger btn-circle'><small>退</small></button>";
                          }
                    },
                    { "mData": "create_date", "visible": false, "searchable": false}
                ],
                "order": [[ 9, "desc" ]],
                "fnRowCallback": function( nRow, aData, iDisplayIndex ) {

                    $(nRow).attr("data-id",aData.id);
                    return nRow;
                },
                "language": {
                    "processing": "資料載入中...",
                    "lengthMenu": "每頁顯示 _MENU_ 筆",
                    "zeroRecords": "資料庫中未有相關資料。",
                    "info": "第 _PAGE_ 頁，共 _PAGES_ 頁",
                    "infoEmpty": "資料庫中未有相關資料。",
                    "search":  "搜尋:",
                    "paginate": {
                          "first":      "第一頁",
                          "last":       "最後一頁",
                          "next":       "下一頁",
                          "previous":   "上一頁"
                      }
                }
            });
    //        $( "#loadingDiv" ).fadeOut(500, function() {
    //              $( "#loadingDiv" ).remove(); //makes page more lightweight 
    //        });
        }
    }
};
function addUserEvent(){
  if ($("#userpsw").val() == $("#confirm_userpsw").val()) {
    $("#addUserBT").button('loading');
    var dataAry = {
      usercode:$("#usercode").val(),
      userpsw:$("#userpsw").val(),
      username:$("#username").val()
    };
    $.post('route/controller.php?action=addAccount', dataAry, function(data, textStatus, xhr) {
            switch(data.message){
              case "failed":
                swal({
                    title: "帳號新增失敗！",
                    text: "Oh...NO!"+data.errmsg,
                    icon: "error",
                    default: true
                }).then((value) => {                            
                    $("#addUserForm")[0].reset();
                });
              break;
              case "success": 
                swal({
                    title: "帳號新增成功!",
                    text: "Good Job!"+data.errmsg,
                    icon: "success",
                    default: true
                }).then((value) => {                            
                    $('#addUsersModal').modal('hide'); 
                });                 
                $('#accountListTable').DataTable().destroy();
                gotolist();
              break;
              default:
              break;
            }
      },"json").done(function() {
        $("#addUserBT").button('reset');
      });
  }
  else
  {
    swal({
        title: "驗證密碼不相符！",
        text: "Oh...NO!密碼與驗證密碼不符。",
        icon: "error",
        default: true
    });
  }
}
function loadEvent(_id){
  var dataAry = {
      id:_id
    };
    $.post('route/controller.php?action=loadpaymentEvent', dataAry, function(data, textStatus, xhr) {
            postData=data.data;
            switch(data.message){
              case "failed":
                swal({
                    title: "Please conatct.\n Email: icms.conf@gmail.com",
                    text: "Oh...NO!"+data.errmsg,
                    icon: "error",
                    default: true
                });
              break;
              case "success":   
                switch(parseInt(postData[0].tx_type))
                {
                    case 1:
                        $txttype = "授權";
                        break;
                    case 3:
                        $txttype = "請款";
                        break;
                    case 4:
                        $txttype = "取消請款";
                        break;
                    case 5:
                        $txttype = "退貨";
                        break;
                    case 7:
                        $txttype = "查詢";
                        break;
                    case 8:
                        $txttype = "取消授權";
                        break;
                    default:
                        $txttype = "空";
                        break;
                }
                $regist_type = postData[0].regist_type.split('-')[0] + "-" + postData[0].regist_type.split('-')[1];
                    
                $("#txtype").text($txttype);
                $("#registertype").text($regist_type);
                $("#contactemail").text(postData[0].email);
                $("#ret_code").text(postData[0].ret_code); 
                $("#ret_msg").text(postData[0].ret_msg); 
              break;
              default:
              break;
            }
      },"json");
}
function saveEvent(user){
  var dataAry = {
      username:$("#editusername").val(),
      usercode:user
    };
    $.post('route/controller.php?action=editAccount', dataAry, function(data, textStatus, xhr) {
            switch(data.message){
              case "failed":
                swal({
                    title: "帳號修改失敗！",
                    text: "Oh...NO!"+data.errmsg,
                    icon: "error",
                    default: true
                });
              break;
              case "success":  
                swal({
                    title: "帳號修改成功!",
                    text: "Good Job!"+data.errmsg,
                    icon: "success",
                    default: true
                }).then((value) => {                            
                    localStorage.setItem('_name', dataAry.username);
                    $('#editUsersModal').modal('hide');  
                });
                   
                $('#accountListTable').DataTable().destroy();
                gotolist();  
                
              break;
              default:
              break;
            }
      },"json");
}
function deleteEvent(user){
  if(confirm("確定要刪除"+user+"嗎?不能後悔喔!"))
  {
    var dataAry = {
      usercode:user,
    };
    $.post('route/controller.php?action=deleteAccount', dataAry, function(data, textStatus, xhr) {
            switch(data.message){
              case "failed":
                swal({
                    title: "帳號刪除失敗！",
                    text: "Oh...NO!"+data.errmsg,
                    icon: "error",
                    default: true
                });
              break;
              case "success":  
                swal({
                    title: "帳號刪除成功!",
                    text: "Good Job!"+data.errmsg,
                    icon: "success",
                    default: true
                });
                $('#accountListTable').DataTable().destroy();
                gotolist();
              break;
              default:
              break;
            }
      },"json");
  }
}
function changetoword(word, value){
  switch(word){
      case 'userstatus':
        switch(value){
          case '0':
            return '註冊中';
          break;
          case '1':
            return '使用中';
          break;
          case '2':
            return '系統停權';
          break;
          case '3':
            return '用戶暫停使用';
          break;
          default:
            return '永久停權';
          break;
        }
      break;
      default:
       return false;
      break;
    }
}
$(function(){
    modules.ui();
})

