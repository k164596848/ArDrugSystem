var modules = {
  ui: function(){
      $("#bannerSetForm").on('submit',(function(e){
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: 'route/controller.php?action=bannerSet',
                data: new FormData(this),
                dataType: 'json',
                contentType: false,
                cache: false,
                processData:false,
                beforeSend:function(){
                    $(".banner-progress").css("width","25%");
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
                                $(".banner-progress").css("width",Math.round(percentComplete * 100) + "%");
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
                            $("#bannerSetForm")[0].reset();
                            $("#preview_image_banner").attr('src','https://via.placeholder.com/720x150/FFFFFF/000000?text=預覽圖片');
                            $(".banner-progress").css("width","0%");
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
                            $("#current_image_banner").attr('src','pic/banner?'+(new Date()).getTime());
                            $("#preview_image_banner").attr('src','https://via.placeholder.com/720x150/FFFFFF/000000?text=預覽圖片');
                            $(".banner-progress").css("width","0%");
                            $("#uploadtxt").text("等待上傳圖片");
                        }); 
                        
                    break;
                }
                
              });
    }));
    $("#logoSetForm").on('submit',(function(e){
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: 'route/controller.php?action=logoSet',
                data: new FormData(this),
                dataType: 'json',
                contentType: false,
                cache: false,
                processData:false,
                beforeSend:function(){
                    $(".logo-progress").css("width","25%");
                    $("#uploadtxt2").text("等待...");
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
                                $(".logo-progress").css("width",Math.round(percentComplete * 100) + "%");
                                $("#uploadtxt2").text("檔案上傳成功!");
                            }
                        }
                    };
                    return xhr;
                }
            }).complete(function(data) {
//                console.log(JSON.stringify(data.responseText.replace(' ','')));
                switch(data.responseJSON.message){
                    case "failed":
                        $("#uploadtxt2").text("圖片上傳失敗!");
                      swal({
                            title: "圖片上傳失敗！",
                            text: "Oh...NO!"+data.responseJSON.errmsg,
                            icon: "error",
                            default: true
                        }).then((value) => {                            
                            $("#logoSetForm")[0].reset();
                            $("#preview_image_logo").attr('src','https://via.placeholder.com/180x45/FFFFFF/000000?text=預覽圖片');
                            $(".logo-progress").css("width","0%");
                            $("#uploadtxt2").text("等待上傳圖片");
                        });
                    break;
                    case "success":   
                        $("#uploadtxt2").text("圖片上傳成功!");
                      swal({
                            title: "圖片上傳完成!",
                            text: "Good Job!"+data.responseJSON.errmsg,
                            icon: "success",
                            default: true
                        }).then((value) => {                            
                            $("#logoSetForm")[0].reset();
                            $("#current_image_logo").attr('src','pic/logo?'+(new Date()).getTime());
                            $("#preview_image_logo").attr('src','https://via.placeholder.com/180x45/FFFFFF/000000?text=預覽圖片');
                            $(".logo-progress").css("width","0%");
                            $("#uploadtxt2").text("等待上傳圖片");
                        }); 
                        
                    break;
                }
                
              });
    }));
  }
};
function previewEvent(method, obj){
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
            console.log(w);
            console.log(h);
            
            switch(method)
            {
                case 'banner':
                    if((w/h) <= 5.3 && (w/h) >= 4.3 && w >= 1200 && h >= 250)
                    {
                        if((s/1000000) <= 1)
                        {
                            $("#preview_image_banner").attr('src', img.src);
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
                    break;
                case 'logo':
                    console.log(w/h);
                    if((w/h) <= 4.5 && (w/h) >= 3.5 && w >= 180 && h >= 45)
                    {
                        if((s/1000000) <= 1)
                        {
                            $("#preview_image_logo").attr('src', img.src);
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
                    break;
            }
            
        }
        
      }
}


$(function(){
    modules.ui();
})

