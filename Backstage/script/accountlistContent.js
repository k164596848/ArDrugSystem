var modules = {
  ui: function(){
      $('[data-toggle="tooltip"]').tooltip();     

      gotolist();

      PreviewDepartment();
      SupervisorOption();

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
	  
	  var $ed_userpsw = $('#ed_userpsw'),  //修改時顯示、隱藏密碼
            $show_ed_userpsw = $('<input type="text" name="' + $ed_userpsw.attr('name') + '" class="' + $ed_userpsw.attr('class') + '"   />');
      $('#show_ed_userpsw').click(function () {
        if (!$(this).hasClass('showedPass')) {
          $ed_userpsw.replaceWith($show_ed_userpsw.val($ed_userpsw.val()));
          $(this).addClass('showedPass');
          $("#show_ed_userpsw > i").removeClass('fa-eye').addClass('fa-times-circle');
        } else {
          $show_ed_userpsw.replaceWith($ed_userpsw.val($show_ed_userpsw.val()));
          $(this).removeClass('showedPass');
          $("#show_ed_userpsw > i").removeClass('fa-times-circle').addClass('fa-eye');
        }
      });
	  
	  $('#s_name').change(function (){ //每次變動選項其餘姓名、分機、郵件都會同步變動 48
		  var a = document.getElementById('s_name').value;
		  $("#s_extension").val(a);
		  $("#s_email").val(a);
	  });
	  $('#ed_s_name').change(function (){
		  var a = document.getElementById('ed_s_name').value;
		  $("#ed_s_extension").val(a);
		  $("#ed_s_email").val(a);
	  });
	  $('#s_extension').change(function (){ 
		  var a = document.getElementById('s_extension').value;
		  $("#s_name").val(a);
		  $("#s_email").val(a);
	  });
	  $('#ed_s_extension').change(function (){
		  var a = document.getElementById('ed_s_extension').value;
		  $("#ed_s_name").val(a);
		  $("#ed_s_email").val(a);
	  });
	  $('#s_email').change(function (){
		  var a = document.getElementById('s_email').value;
		  $("#s_name").val(a);
		  $("#s_extension").val(a);
	  });
	  $('#ed_s_email').change(function (){
		  var a = document.getElementById('ed_s_email').value;
		  $("#ed_s_name").val(a);
		  $("#ed_s_extension").val(a);
	  });
	  
      // 開啟modal，恢復validator
      $('#addUsersModal').on('shown.bs.modal', function () {
          $("#addUserForm").validator('update');
        })
      // 關閉modal，清空表單內容
      $('#addUsersModal').on('hidden.bs.modal', function (event) {
          $("#addUserForm")[0].reset();
          $("#addUserForm").validator('destroy');
      });

      $("#addUserBT").click(function(event) {
          addUserEvent();
      });
      
      $("#editUserBT").click(function(event) {
        saveEvent();
      });
  }
};
function gotolist(){
    if ( $.fn.dataTable.isDataTable( '#accountListTable' ) ) {
        $('#accountListTable').DataTable();
    }
    else
    {
        $('#accountListTable').DataTable({
            "bProcessing": true,
            "sAjaxSource": "route/controller.php?action=accountlist",
            "aoColumns": [
                { "mData": "USER_ID", "sWidth": '10%'},
                { "mData": "USERNAME", "sWidth": '20%'},
                { "mData": "RIGHTS", "sWidth": '20%',
                    "mRender":function(val,type,row){
                        switch(val)
                       {
                        case"1":
                            return "<span class='label label-primary'>" + changetoword('rights',val)+ "</span>";
                            break;
                        case"2":
                            return "<span class='label label-info'>" + changetoword('rights',val)+ "</span>";
                            break;
                        case"3":
                            return "<span class='label label-default'>" + changetoword('rights',val)+ "</span>";
                            break;
                        default:
                            return "<span class='label label-warning'>" + changetoword('rights',val)+ "</span>";
                            break;
                       }
                    }
                },
                { "mData": "LOCKED", "sWidth": '20%',
                    "mRender":function(val,type,row){
                        switch(val)
                        {
                            case "0":
                                return "<span class='label label-success'>正常</span>";
                                break;
                            default:
                                return "<span class='label label-danger' onclick='unlockEvent($(this))'>已鎖定</span>"
                                break;
                        }
                    }
                },
                { "mData": "USER_ID", "sWidth": '20%' ,
                      "mRender":function(val,type,row) {
                        return "<button class='btn btn-warning btn-circle' data-toggle='modal' data-target='#editUsersModal' onclick='loadUserEvent(\""+val.toString()+"\")'><span class='fa fa-pencil' aria-hidden='true'></span></button><button class='btn btn-danger btn-circle' onclick='deleteEvent(\""+val.toString()+"\")'><span class='fa fa-trash' aria-hidden='true'></span></button>";
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
       // $( "#loadingDiv" ).fadeOut(500, function() {
       //       $( "#loadingDiv" ).remove(); //makes page more lightweight 
       // });
    }
    
}
function PreviewDepartment(){
	var str="";
    $.post('route/controller.php?action=Preview_Department_option', function(data, textStatus, xhr) {
              switch(data.message){
                case "failed":
                //alert('123');
                break;
                case "success":   
					          postData=data.data; 					
                    for (var i = 0; i < postData.length; i++) {
						          $("#d_id").append("<option value='"+postData[i].D_ID+"'>"+postData[i].DEPARTMENT+"</option>");
								  $("#ed_d_id").append("<option value='"+postData[i].D_ID+"'>"+postData[i].DEPARTMENT+"</option>");
					          }				 
                break;
                default:
                break;
              };                       
        },"json");
}
function SupervisorOption(){
	var str="";
    $.post('route/controller.php?action=SupervisorOption', function(data, textStatus, xhr) {
              switch(data.message){
                case "failed":
                //alert('123');
                break;
                case "success":   
					          postData=data.data; 					
                    for (var i = 0; i < postData.length; i++) {
                      $("#s_name").append("<option value='"+postData[i].S_ID+"'>"+postData[i].S_NAME+"</option>");
                      $("#s_extension").append("<option value='"+postData[i].S_ID+"'>"+postData[i].S_EXTENSION+"</option>");
                      $("#s_email").append("<option value='"+postData[i].S_ID+"'>"+postData[i].S_EMAIL+"</option>");
                      $("#ed_s_name").append("<option value='"+postData[i].S_ID+"'>"+postData[i].S_NAME+"</option>");
                      $("#ed_s_extension").append("<option value='"+postData[i].S_ID+"'>"+postData[i].S_EXTENSION+"</option>");
                      $("#ed_s_email").append("<option value='"+postData[i].S_ID+"'>"+postData[i].S_EMAIL+"</option>");
					          }				 
                break;
                default:
                break;
              };                       
        },"json");
}

function addUserEvent(){
  if ($("#userpsw").val() == $("#confirm_userpsw").val()) {
    $("#addUserBT").button('loading');
    var dataAry = {
      usercode:$("#usercode").val(),
      userpsw:$("#userpsw").val(),
      username:$("#usernames").val(),
      extension:$("#extension").val(),
      email:$("#usermail").val(),
      s_id:$("#s_name").val(),
      d_id:$("#d_id").val(),
	  rights:$("#rights").val(),
      builder:localStorage.getItem('_userid'),
      
    };
   // alert($("#usercode").val()+$("#userpsw").val()+$("#usernames").val()+$("#extension").val()+$("#s_email").val()+$("#usermail").val()+$("#s_name").val()+$("#d_id").val()+localStorage.getItem('_userid'));
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
function loadUserEvent(user){
    $("#editUserBT").button('loading');
  var dataAry = {
      usercode:user
    };
    $.post('route/controller.php?action=loadUserEvent', dataAry, function(data, textStatus, xhr) {
            postData=data.data;
            switch(data.message){
              case "failed":
                swal({
                    title: "帳號載入失敗！請聯繫管理員。\n Email: s1410531031@nutc.edu.tw",
                    text: "Oh...NO!"+data.errmsg,
                    icon: "error",
                    default: true
                });
              break;
              case "success":
                $("#ed_usernames").val(postData[0].USERNAME);   
                $("#ed_usercode").val(postData[0].USER_ID);
                $("#ed_s_name").val(postData[0].S_ID);
                $("#ed_extension").val(postData[0].EXTENSION);
                $("#ed_s_extension").val(postData[0].S_ID);   
                $("#ed_usermail").val(postData[0].EMAIL);
                $("#ed_s_email").val(postData[0].S_ID);
                $("#ed_userpsw").val(postData[0].USERPSW);
				$("#ed_d_id").val(postData[0].D_ID);   
                $("#ed_rights").val(postData[0].RIGHTS);
				//$("#ed_category1").val(postData[0].CATE_ID); //設定類別
              break;
              default:
              break;
            }
      },"json").done(function() {
        $("#editUserBT").button('reset');
      });
}
function saveEvent(){
  var dataAry = {
	  usercode:$("#ed_usercode").val(),
	  username:$("#ed_usernames").val(),
	  extension:$("#ed_extension").val(),
	  userpsw:$("#ed_userpsw").val(),
	  s_id:$("#ed_s_name").val(),
	  d_id:$("#ed_d_id").val(),
	  rights:$("#ed_rights").val(),
      builder:localStorage.getItem('_userid')
    };
    
	//alert($("#ed_usercode").val());
	//alert(localStorage.getItem('_userid'));
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
function unlockEvent(obj){
    //console.log(obj.parent().parent().attr("data-id"));
  if(confirm("確定要解除鎖定嗎?不能後悔喔!"))
  {
    var dataAry = {
      usercode:obj.parent().parent().attr("data-id"),
    };
    $.post('route/controller.php?action=unlockAccount', dataAry, function(data, textStatus, xhr) {
            switch(data.message){
              case "failed":
                swal({
                    title: "解除失敗！",
                    text: "Oh...NO!"+data.errmsg,
                    icon: "error",
                    default: true
                });
              break;
              case "success":  
                swal({
                    title: "解除成功!",
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
      case 'rights':
        switch(value){
          case '3':
            return '一般用戶';
          break;
          case '2':
            return '超級使用者';
          break;
          case '1':
            return '管理員';
          break;
          default:
            return '測試專用帳號';
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

