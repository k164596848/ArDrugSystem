
var modules = {
  ui: function(){
      gotolist();
      $("img.lazyload").lazyload();
      // 關閉modal，清空表單內容
      $('#addpClassModal').on('hidden.bs.modal', function (event) {
          $("#addpClassForm")[0].reset();
          $("#addpClassForm").validator('destroy');
          $("#preview_a_source").attr('src','https://via.placeholder.com/280x160/FFFFFF/000000?text=預覽圖片');
          $("#ed_preview_a_source").attr('src','https://via.placeholder.com/280x160/FFFFFF/000000?text=預覽圖片');
		  $('#titleform').show();
      });
      $('#editclassModal').on('hidden.bs.modal', function (event) {
          $("#editClassForm")[0].reset();
          $("#editClassForm").validator('destroy');
          $("#preview_a_source").attr('src','https://via.placeholder.com/280x160/FFFFFF/000000?text=預覽圖片');
          $("#ed_preview_a_source").attr('src','https://via.placeholder.com/280x160/FFFFFF/000000?text=預覽圖片');
      });
	 
      $("#addpclassBT").click(function(event) {
        add_p_class();
      });
	

	  
      $("#editclassBT").click(function(event) {
        saveEvent();
      });
	  
	  
  }
};


function add_p_class(){
            $.ajax({
                type: 'POST',
                url: 'route/controller.php?action=add_role',
                data: new FormData($("#addpClassForm")[0]),
                dataType: 'json',
                contentType: false,
                cache: false,
                processData:false
            }).complete(function(data) {
//                    console.log(JSON.stringify(data.responseText.replace(' ','')));
                switch(data.responseJSON.message){
                    case "failed":
                      swal({
                            title: "角色內容新增失敗！",
                            text: "Oh...NO!"+data.responseJSON.errmsg,
                            icon: "error",
                            default: true
                        });
                    break;
                    case "success": 
                      swal({
                            title: "角色內容新增完成!",
                            text: "Good Job!"+data.responseJSON.errmsg,
                            icon: "success",
                            default: true
                        }).then((value) => {                            
                            $("#addpClassForm")[0].reset();
                          $('#addpClassModal').modal('hide'); $("#preview_a_source").attr('src','https://via.placeholder.com/280x160/FFFFFF/000000?text=預覽圖片');
                        }); 
                        $('#pClassTable').DataTable().destroy();
                        gotolist();
                    break;
                }
              });
	
}



//表格
function gotolist(){
    if ( $.fn.dataTable.isDataTable( '#pClassTable' ) ) {
        $('#pClassTable').DataTable();
    }
    else
    {
        $('#pClassTable').DataTable({
            "bProcessing": true,
            "sAjaxSource": "route/controller.php?action=rolelist",
            "aoColumns": [
                { "mData": "code","sWidth": '15%'},
				{ "mData": "role",
                    "mRender":function(val,type,row){
                        return "<img class='img-thumbnail lazyload' style='max-width: 180px;max-height: 120px;' src='" + val+ "?"+(new Date()).getTime()+"' data-src='" + val+ "?"+(new Date()).getTime()+"'/>";
                    }
                },
                { "mData": "name"},
                { "mData": "ser" ,"sWidth": '12%',
                      "mRender":function(val,type,row) {
                        return "<button class='btn btn-warning btn-circle' data-toggle='modal' data-target='#editclassModal' onclick='loadEvent("+ val +")' type='button'><span class='fa fa-pencil' aria-hidden='true'></span></button><button class='btn btn-danger btn-circle' onclick='deleteEvent("+val+")' type='button'><span class='fa fa-trash' aria-hidden='true'></span></button>";
                      }
                }
            ],
            bAutoWidth: false , 
            "order": [[ 0, "asc" ],[ 1, "asc" ]],
            "fnRowCallback": function( nRow, aData, iDisplayIndex ) {
                
                $(nRow).attr("data-id",aData.ser);
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
        
    }
    
    
} 


//按下修改
function loadEvent(_id){
	//alert(_id);
	$("#editClassForm")[0].reset();
    $("#editclassBT").button('loading');
  var dataAry = {
      ser:_id
    };
    $.post('route/controller.php?action=loadrole', dataAry, function(data, textStatus, xhr) {
            postData=data.data;
			
            switch(data.message){
              case "failed":
//                alert(data.errmsg);
                swal({
                    title: "角色載入失敗！",
                    text: "Oh...NO!"+data.errmsg,
                    icon: "error",
                    default: true
                });
              break;
              case "success":  
				$("#ed_role_name").val(postData[0].name);
				$("#ed_role_code").val(postData[0].code);
				$("#ed_preview_a_source").attr("src",postData[0].role);
				$("#role_ser").val(_id);
              break;
              default:
              break;
            }
      },"json").done(function() {
        $("#editclassBT").button('reset');
      });
}
//按下送出修改
function saveEvent(){
	  $.ajax({
			type: 'POST',
			url: 'route/controller.php?action=editrole',
			data: new FormData($("#editClassForm")[0]),
			dataType: 'json',
			contentType: false,
			cache: false,
			processData:false
		}).complete(function(data) {
	//                console.log(JSON.stringify(data.responseText.replace(' ','')));
			switch(data.responseJSON.message){
				case "failed":
				  swal({
						title: "角色修改失敗！",
						text: "Oh...NO!"+data.responseJSON.errmsg,
						icon: "error",
						default: true
					}).then((value) => {                            
						$("#editClassForm")[0].reset();

					});
				break;
				case "success": 
				  swal({
						title: "角色修改完成!",
						text: "Good Job!"+data.responseJSON.errmsg,
						icon: "success",
						default: true
					}).then((value) => {                            
						$("#editClassForm")[0].reset();
					  $('#editclassModal').modal('hide'); $("#preview_e_source").attr('src','https://via.placeholder.com/280x160/FFFFFF/000000?text=預覽圖片');
					}); 
					$('#pClassTable').DataTable().destroy();
					gotolist();
				break;
			}

		  });
	
}
//按下刪除
function deleteEvent(_id){
  if(confirm("確定要刪除嗎?不能後悔喔!"))
  {
    var dataAry = {
      ser:_id,
    };
    $.post('route/controller.php?action=deleterole', dataAry, function(data, textStatus, xhr) {
            switch(data.message){
              case "failed":
                swal({
                    title: "角色刪除失敗！",
                    text: "Oh...NO!"+data.errmsg,
                    icon: "error",
                    default: true
                }).then((value) => {                            
                    gotolist(); 

                });
              break;
              case "success":   
                swal({
                    title: "角色刪除完成!",
                    text: "Good Job!"+data.errmsg,
                    icon: "success",
                    default: true
                }).then((value) => {                            
                       
                    $('#pClassTable').DataTable().destroy();
                    gotolist(); 
                }); 
                 
              break;
              default:
              break;
            }
      },"json");
  }
}



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

			/*if((w/h) <= 1.67 && (w/h) >= 1.65 && w >= 500 && h >= 300)
             {
				if((s/1000000) <= 2)
                {*/
                    $("#preview_a_source").attr('src', img.src);
					$("#ed_preview_a_source").attr('src', img.src);
					check = 0;
                /*}
                else
                {
					$("#preview_a_source").attr('src', 'https://via.placeholder.com/280x160/FFFFFF/000000?text=預覽圖片');
					$("#ed_preview_a_source").attr('src', 'https://via.placeholder.com/280x160/FFFFFF/000000?text=預覽圖片');
                    swal({
                        title: "圖片大小("+(s/1000000)+"MB)已超過2MB，請重新上傳。",
                        text: "Oh...Sorry!",
                        icon: "error",
                        default: true
                    });
					check = 1;
                }
             }
             else 
            {      
				$("#preview_a_source").attr('src', 'https://via.placeholder.com/280x160/FFFFFF/000000?text=預覽圖片');
				$("#ed_preview_a_source").attr('src', 'https://via.placeholder.com/280x160/FFFFFF/000000?text=預覽圖片');
                 swal({
                     title: "圖片長寬(長："+w+",寬："+h+")不符，請重新上傳。",
                     text: "Oh...Sorry!",
                     icon: "error",
                     default: true
                 });
				 check = 1;
            }	*/

      }
    }
}

$(function(){

    modules.ui();
    
})

