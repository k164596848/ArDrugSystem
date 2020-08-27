var modules = {
  ui: function(){
      $('[data-toggle="tooltip"]').tooltip();     

       PreviewDepartment();
       SupervisorOption();
       loadUserEvent();

      
       //	預覽密碼
       var $edituserpsw = $('#edituserpsw'),
             $show_userpsw = $('<input type="text" name="' + $edituserpsw.attr('name') + '" class="' + $edituserpsw.attr('class') + '"   />'),
             $confirm_userpsw = $('#confirm_userpsw'),
             $show_confirm_userpsw = $('<input type="text" name="' + $confirm_userpsw.attr('name') + '" class="' + $confirm_userpsw.attr('class') + '"   />');
       $('#show_userpsw').click(function () {
         if (!$(this).hasClass('showedPass')) {
           $edituserpsw.replaceWith($show_userpsw.val($edituserpsw.val()));
           $(this).addClass('showedPass');
           $("#show_userpsw > i").removeClass('fa-eye').addClass('fa-times-circle');
         } else {
           $show_userpsw.replaceWith($edituserpsw.val($show_userpsw.val()));
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
    
    
      
       $("#editUserBT").click(function(event) {
         saveEvent();
       });
  }
};



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
                      
                     }        
                 break;
                 default:
                 break;
               };                       
         },"json");
 }


function loadUserEvent(){
    
  var dataAry = {
      usercode:localStorage.getItem('_userid')
    };
    //alert(localStorage.getItem('_userid'));
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
              
                $("#editusername").val(postData[0].USERNAME);   
                
                $("#s_name").val(postData[0].S_ID);
                $("#editextension").val(postData[0].EXTENSION);
                $("#s_extension").val(postData[0].S_ID);   
                $("#editusermail").val(postData[0].EMAIL);
                $("#s_email").val(postData[0].S_ID);
                $("#edituserpsw").val(postData[0].USERPSW);
                $("#d_id").val(postData[0].D_ID);   
                $("#rights").val("一般用戶"); // 先暫定
        //$("#ed_category1").val(postData[0].CATE_ID); //設定類別
              break;
              default:
              break;
            }
      },"json").done(function() {
        //$("#editUserBT").button('reset');
      });
}

 function saveEvent(){
   var dataAry = {
     usercode:localStorage.getItem('_userid'),
     extension:$("#editextension").val(),
     userpsw:$("#edituserpsw").val()
     };
   //alert($("#editextension").val());
   //alert($("#edituserpsw").val());
   
     $.post('route/controller.php?action=user_editAccount', dataAry, function(data, textStatus, xhr) {
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
                   
                 
                
               break;
               default:
               break;
             }
       },"json");
 }


$(function(){
    modules.ui();
})

