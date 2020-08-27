var modules = {
  ui: function(){
      $('[data-toggle="tooltip"]').tooltip();     

      gotolist();
      // 預覽密碼
      var $userpsw = $('#userpsw'),
            $show_userpsw = $('<input type="text" name="' + $userpsw.attr('name') + '" class="' + $userpsw.attr('class') + '"   />'),
            $confirm_userpsw = $('#confirm_userpsw'),
            $show_confirm_userpsw = $('<input type="text" name="' + $confirm_userpsw.attr('name') + '" class="' + $confirm_userpsw.attr('class') + '"   />');
      $('#show_userpsw').click(function () {
        if (!$(this).hasClass('showedPass')) {
          $userpsw.replaceWith($show_userpsw.val($userpsw.val()));
          $(this).addClass('showedPass');
          $("#show_userpsw > i").removeClass('fa-eye').addClass('fa-times-circle');
        } else {
          $show_userpsw.replaceWith($userpsw.val($show_userpsw.val()));
          $(this).removeClass('showedPass');
          $("#show_userpsw > i").removeClass('fa-times-circle').addClass('fa-eye');
        }
      });
      $('#show_confirm_userpsw').click(function () {
        if (!$(this).hasClass('showedPass')) {
          $confirm_userpsw.replaceWith($show_confirm_userpsw.val($confirm_userpsw.val()));
          $(this).addClass('showedPass');
          $("#show_confirm_userpsw > i").removeClass('fa-eye').addClass('fa-times-circle');
        } else {
          $show_confirm_userpsw.replaceWith($confirm_userpsw.val($show_confirm_userpsw.val()));
          $(this).removeClass('showedPass');
          $("#show_confirm_userpsw > i").removeClass('fa-times-circle').addClass('fa-eye');
        }
      });
  }
};
function gotolist(){
    if ( $.fn.dataTable.isDataTable( '#LoginRecordTable' ) ) {
        $('#LoginRecordTable').DataTable();
    }
    else
    {
        $('#LoginRecordTable').DataTable({
            "bProcessing": true,
            "sAjaxSource": "route/controller.php?action=loginrecord",
            "aoColumns": [
                { "mData": "usercode", "sWidth": '10%'},
                { "mData": "local_ip", "sWidth": '10%'},
                { "mData": "login_datetime"},
                { "mData": "login_status", "sWidth": '20%',
                    "mRender":function(val,type,row){
                        if(val=='S'){
                          return "<span class='label label-success'>" + changetoword('userstatus',val)+ "</span>";
                        }else{
                          return "<span class='label label-danger'>" + changetoword('userstatus',val)+ "</span>";
                        }
                    }
                },
                { "mData": "usercode", "sWidth": '20%' ,
                      "mRender":function(val,type,row) {
                        return "<button class='btn btn-danger btn-circle' onclick='deleteEvent(\""+val.toString()+"\")'><span class='fa fa-trash' aria-hidden='true'></span></button>";
                      }
                }
            ],
            "fnRowCallback": function( nRow, aData, iDisplayIndex ) {
               
                $(nRow).attr("data-id",aData.USER_ID);
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
                $('#LoginRecordTable').DataTable().destroy();
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
          case 'F':
            return '失敗';
          break;
          case 'S':
            return '成功';
          break;
          default:
            return '錯誤';
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

