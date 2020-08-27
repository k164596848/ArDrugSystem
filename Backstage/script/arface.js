var modules = {
    ui: function () {
        $('[data-toggle="tooltip"]').tooltip();

        gotolist();

        // 開啟modal，恢復validator
        $('#addFaceModal').on('shown.bs.modal', function () {
            $("#addUserForm").validator('update');
        })
        // 關閉modal，清空表單內容
        $('#addFaceModal').on('hidden.bs.modal', function (event) {
            $("#addUserForm")[0].reset();
            $("#addUserForm").validator('destroy');
            $("#preview_a_source").attr('src','https://via.placeholder.com/280x160/FFFFFF/000000?text=預覽圖片');
            $("#ed_preview_a_source").attr('src','https://via.placeholder.com/280x160/FFFFFF/000000?text=預覽圖片');
  
        });

        $('#editUsersModal').on('hidden.bs.modal', function (event) {
            $("#editUserForm")[0].reset();
            $("#editUserForm").validator('destroy');
            $("#preview_a_source").attr('src','https://via.placeholder.com/280x160/FFFFFF/000000?text=預覽圖片');
            $("#ed_preview_a_source").attr('src','https://via.placeholder.com/280x160/FFFFFF/000000?text=預覽圖片');
        });

        $("#addUserBT").click(function (event) {
            addUserEvent();
        });

        $("#editUserBT").click(function (event) {
            saveEvent();
        });
    }
};
function gotolist() {
    if ($.fn.dataTable.isDataTable('#accountListTable')) {
        $('#accountListTable').DataTable();
    }
    else {
        $('#accountListTable').DataTable({
            "bProcessing": true,
            "sAjaxSource": "route/controller.php?action=arfacelist",
            "aoColumns": [
                { "mData": "ser", "sWidth": '10%' },
                { "mData": "drug_name", "sWidth": '20%' },
                { "mData": "drug_info", "sWidth": '20%' },

                {
                    "mData": "ar_mode", "sWidth": '20%',
                    "mRender": function (val, type, row) {
                        switch (val) {
                            case "0":
                                return "<span  class='label label-success'>" + changetoword('rights', val) + "</span>";
                                break;
                            case "1":
                                return "<span  class='label label-info'>" + changetoword('rights', val) + "</span>";
                                break;
                            default:
                                return "<span class='label label-warning'>" + changetoword('rights', val) + "</span>";
                                break;
                        }
                    }
                },

                {
                    "mData": "ser", "sWidth": '20%',
                    "mRender": function (val, type, row) {
                        return "<button class='btn btn-warning btn-circle' data-toggle='modal' data-target='#editUsersModal' onclick='loadUserEvent(\"" + val.toString() + "\")'><span class='fa fa-pencil' aria-hidden='true'></span></button><button class='btn btn-danger btn-circle' onclick='deleteEvent(\"" + val.toString() + "\")'><span class='fa fa-trash' aria-hidden='true'></span></button>";
                    }
                }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex) {

                $(nRow).attr("data-id", aData.USER_ID);
                return nRow;
            },
            "language": {
                "processing": "資料載入中...",
                "lengthMenu": "每頁顯示 _MENU_ 筆",
                "zeroRecords": "資料庫中未有相關資料。",
                "info": "第 _PAGE_ 頁，共 _PAGES_ 頁",
                "infoEmpty": "資料庫中未有相關資料。",
                "search": "搜尋:",
                "paginate": {
                    "first": "第一頁",
                    "last": "最後一頁",
                    "next": "下一頁",
                    "previous": "上一頁"
                }
            }
        });
        // $( "#loadingDiv" ).fadeOut(500, function() {
        //       $( "#loadingDiv" ).remove(); //makes page more lightweight 
        // });
    }

}


function addUserEvent() {
    $.ajax({
        type: 'POST',
        url: 'route/controller.php?action=addARface',
        data: new FormData($("#addUserForm")[0]),
        dataType: 'json',
        contentType: false,
        cache: false,
        processData: false
    }).complete(function (data) {
        switch (data.responseJSON.message) {
            case "failed":
                swal({
                    title: "毒品資訊新增失敗！",
                    text: "Oh...NO!" + data.errmsg,
                    icon: "error",
                    default: true
                }).then((value) => {
                    $("#addUserForm")[0].reset();
                });
                break;
            case "success":
                swal({
                    title: "毒品資訊新增失敗！!",
                    text: "Good Job!" + data.errmsg,
                    icon: "success",
                    default: true
                }).then((value) => {
                    $('#addFaceModal').modal('hide');
                });
                $("#addUserForm")[0].reset();
                $('#addFaceModal').modal('hide'); $("#preview_a_source").attr('src','https://via.placeholder.com/280x160/FFFFFF/000000?text=預覽圖片');

                $('#accountListTable').DataTable().destroy();

                break;

        }
        gotolist();
    });

}
function loadUserEvent(ser) {
    $("#editUserBT").button('loading');
    var dataAry = {
        ser: ser
    };
    $.post('route/controller.php?action=loadARface', dataAry, function (data, textStatus, xhr) {
        postData = data.data;
        switch (data.message) {
            case "failed":
                swal({
                    title: "帳號載入失敗！請聯繫管理員。\n Email: s1410531031@nutc.edu.tw",
                    text: "Oh...NO!" + data.errmsg,
                    icon: "error",
                    default: true
                });
                break;
            case "success":
                $("#drug_ser").val(postData[0].ser);
                $("#ed_drug_name").val(postData[0].drug_name);
                $("#ed_drug_info").val(postData[0].drug_info);
                $("#pic_address").html("目前圖片位址:" + postData[0].pic_address);
                $("#old_address").val(postData[0].pic_address);

                $("#ed_preview_a_source").attr("src",postData[0].pic_address);

                if (postData[0].ar_mode == 1) $("#ed_mode").prop("checked", true);
                else $("#ed_mode").prop("checked", false);


                break;
            default:
                break;
        }
    }, "json").done(function () {
        $("#editUserBT").button('reset');
    });


}
function saveEvent() {

    $.ajax({
        type: 'POST',
        url: 'route/controller.php?action=editARface',
        data: new FormData($("#editUserForm")[0]),
        dataType: 'json',
        contentType: false,
        cache: false,
        processData: false
    }).complete(function (data) {
        switch (data.responseJSON.message) {
            case "failed":
                swal({
                    title: "毒品修改失敗！",
                    text: "Oh...NO!" + data.errmsg,
                    icon: "error",
                    default: true
                });
                break;
            case "success":
                swal({
                    title: "毒品修改成功!",
                    text: "Good Job!" + data.errmsg,
                    icon: "success",
                    default: true
                }).then((value) => {

                    $('#editUsersModal').modal('hide');
                });

                $('#accountListTable').DataTable().destroy();
                gotolist();
                break;
        }

    });

}
function deleteEvent(ser) {
    if (confirm("確定要刪除編號" + ser + "嗎?不能後悔喔!")) {
        var dataAry = {
            ser: ser,
        };
        $.post('route/controller.php?action=deleteARface', dataAry, function (data, textStatus, xhr) {
            switch (data.message) {
                case "failed":
                    swal({
                        title: "帳號刪除失敗！",
                        text: "Oh...NO!" + data.errmsg,
                        icon: "error",
                        default: true
                    });
                    break;
                case "success":
                    swal({
                        title: "帳號刪除成功!",
                        text: "Good Job!" + data.errmsg,
                        icon: "success",
                        default: true
                    });
                    $('#accountListTable').DataTable().destroy();
                    gotolist();
                    break;
                default:
                    break;
            }
        }, "json");
    }
}

function changetoword(word, value) {
    switch (word) {
        case 'rights':
            switch (value) {
                case '0':
                    return '2D';
                    break;
                case '1':
                    return '3D';
                    break;
                default:
                    return '讀取不到資料';
                    break;
            }
            break;
        default:
            return false;
            break;
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

			
                    $("#preview_a_source").attr('src', img.src);
					$("#ed_preview_a_source").attr('src', img.src);
					
            

      }
    }
}
$(function () {
    modules.ui();
})

