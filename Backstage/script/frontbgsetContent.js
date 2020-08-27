var modules = {
  ui: function(){
      $("#frontBGSetForm").on('submit',(function(e){
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: 'route/controller.php?action=frontBGSet',
                data: new FormData(this),
                dataType: 'json',
                contentType: false,
                cache: false,
                processData:false,
                beforeSend:function(){
                    $(".progress-bar-success").css("width","25%");
                    $("#uploadtxt").text("等待...");
                },
                xhr: function () {
                    var xhr = new window.XMLHttpRequest();
                    
                    xhr.upload.onprogress = function (evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = evt.loaded / evt.total;
//                            $(".progress-bar-primary").css("width",Math.round(percentComplete * 50) + "%");
//                            $("#uploadtxt").text("檔案上傳中...");
                            if(percentComplete == 1)
                            {
                                $(".progress-bar-success").css("width",Math.round(percentComplete * 100) + "%");
                                $("#uploadtxt").text("檔案上傳成功!");
                            }
                        }
                    };
                    return xhr;
                }
            }).complete(function(data) {
//                console.log(JSON.stringify(data.responseText.replace(' ','')));
                switch(data.responseJSON.message){
                    case "failed":
                        $("#uploadtxt").text("圖片上傳失敗!");
                      swal({
                            title: "圖片上傳失敗！",
                            text: "Oh...NO!"+data.responseJSON.errmsg,
                            icon: "error",
                            default: true
                        }).then((value) => {                            
                            $("form")[0].reset();
                            $("#preview_image").attr('src','https://via.placeholder.com/800x450/FFFFFF/000000?text=預覽圖片');
                            $(".progress-bar").css("width","0%");
                            $("#uploadtxt").text("等待上傳圖片");
                        });
                    break;
                    case "success":   
                        $("#uploadtxt").text("圖片上傳成功!");
                      swal({
                            title: "圖片上傳完成!",
                            text: "Good Job!"+data.responseJSON.errmsg,
                            icon: "success",
                            default: true
                        }).then((value) => {                            
                            $("form")[0].reset();
                            $("#current_image").attr('src','pic/bg?'+(new Date()).getTime());
                            $("#preview_image").attr('src','https://via.placeholder.com/800x450/FFFFFF/000000?text=預覽圖片');
                            $(".progress-bar").css("width","0%");
                            $("#uploadtxt").text("等待上傳圖片");
                        }); 
                        
                    break;
                }
                
              });
    }));
  }
};
function previewEvent(obj){
    if(obj[0].files && obj[0].files[0]){
        var readerimg = new FileReader();
        var img = new Image();
        var w=0,h=0,s=0;
        readerimg.onload = function (e) {
            img.src = e.target.result
            s = e.total;
        }
        
        readerimg.readAsDataURL(obj[0].files[0]);
        
        img.onload = function() {
            w = this.width;
            h = this.height;
            
            if((w/h) <= 2.27 && (w/h) >= 1.27 && w >= 1600 && h >= 900)
            {
                if((s/1000000) <= 1)
                {
                    $("#preview_image").attr('src', img.src);
                }
                else
                {
                    swal({
                        title: "圖片大小("+(s/1000000)+"MB)已超過1MB，請重新上傳。",
                        text: "Oh...Sorry!",
                        icon: "error",
                        default: true
                    });
                }
               
            }
            else 
            {            
                swal({
                    title: "圖片長寬(長："+w+",寬："+h+")不符，請重新上傳。",
                    text: "Oh...Sorry!",
                    icon: "error",
                    default: true
                });
            }
        }
        
      }
}
  
$(function(){
    modules.ui();
})

