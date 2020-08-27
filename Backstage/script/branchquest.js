
var modules = {
    ui: function () {
        loadser(); //拿出網址列的ser
        loadtop_href();
        gotolist();
        $("img.lazyload").lazyload();
        // 關閉modal，清空表單內容
        $('#addpClassModal').on('hidden.bs.modal', function (event) {
            $("#addpClassForm")[0].reset();
            $("#addpClassForm").validator('destroy');
        });
        $('#editclassModal').on('hidden.bs.modal', function (event) {
            $("#editClassForm")[0].reset();
            $("#editClassForm").validator('destroy');
        });

        $("#addpclassBT").click(function (event) {
            addBranchQuest();
        });

        $("#editclassBT").click(function (event) {
            if (!document.getElementById('ed_branch_quest_content').value == "") {
                saveEvent();
            } else {
                alert('請輸入分支內容');
            }
        });


    }
};


function loadser() { //拿出網址列的ser
    var url = location.href;

    if (url.indexOf('?') != -1) {
        id = "";
        var name = "";
        var ary = url.split('?')[1].split('&');

        for (i = 0; i <= ary.length - 1; i++) {
            if (ary[i].split('=')[0] == 'ser') {
                var ary2 = ary[i].split('=')[1].split('#');
                id = ary2[0];
                $("#first_branch").val(id);
            }
        }
    }
}


function addBranchQuest() {

    // var c = [];
    // $("input[type=checkbox]:checked").each(function () {
    //     c.push($(this).val());
    // });
    // var Option = c.toString();

    $.ajax({
        type: 'POST',
        url: 'route/controller.php?action=add_branch_quest',
        data: new FormData($("#addpClassForm")[0]),
        dataType: 'json',
        contentType: false,
        cache: false,
        processData: false
    }).complete(function (data) {
        switch (data.responseJSON.message) {
            case "failed":
                swal({
                    title: "分支新增失敗！",
                    text: "Oh...NO!" + data.responseJSON.errmsg,
                    icon: "error",
                    default: true
                });
                break;
            case "success":
                swal({
                    title: "分支新增完成!",
                    text: "Good Job!" + data.responseJSON.errmsg,
                    icon: "success",
                    default: true
                }).then((value) => {
                    $("#addpClassForm")[0].reset();
                    $('#addpClassModal').modal('hide');
                });
                $('#pClassTable').DataTable().destroy();
                gotolist();
                break;
        }
    });



}


//表格
function gotolist() {
    if ($.fn.dataTable.isDataTable('#pClassTable')) {
        $('#pClassTable').DataTable();
    }
    else {
        $('#pClassTable').DataTable({
            "bProcessing": true,
            "sAjaxSource": "route/controller.php?action=load_branch_quest&ser=" + id,
            "aoColumns": [
                { "mData": "ser" },
                {
                    "mData": "id_content",
                    "mRender": function (val, type, row) {
                        return  val.split('-')[1] ;
                    }
                },
                { "mData": "EDITOR" },
                { "mData": "LAST_DATE", "sWidth": '25%' },
                {
                    "mData": "ser", "sWidth": '12%',
                    "mRender": function (val, type, row) {
                        return "<button class='btn btn-warning btn-circle' data-toggle='modal' data-target='#editclassModal' onclick='loadEvent(" + val + ")' type='button'><span class='fa fa-pencil' aria-hidden='true'></span></button><button class='btn btn-danger btn-circle' onclick='deleteEvent(" + val + ")' type='button'><span class='fa fa-trash' aria-hidden='true'></span></button>";
                    }
                }
            ],
            bAutoWidth: false,
            "order": [[0, "asc"], [1, "asc"]],
            "fnRowCallback": function (nRow, aData, iDisplayIndex) {

                $(nRow).attr("data-id", aData.ser);
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

    }


}


//按下修改
function loadEvent(_id) {
    //alert(_id);
    $("#editClassForm")[0].reset();
	//$("input[type='checkbox']").attr("checked", false);
    $("#editclassBT").button('loading');
    var dataAry = {
        quest_ser: _id
    };
	
    $.post('route/controller.php?action=load_quest_and_options', dataAry, function (data, textStatus, xhr) {
        postData = data.data;

        switch (data.message) {
            case "failed":
                //  alert(data.errmsg);
                swal({
                    title: "無選項",
                    text: "Oh...NO!" + data.errmsg,
                    icon: "error",
                    default: true
                });
                break;
            case "success":
                $("#ed_branch_quest_content").val(postData[0].question);
                $("#branch_quest_ser").val(_id);
                for ($i = 1; $i <= 3; $i++) {
                    $("#branch_option" + $i + "_ser").val(postData[$i - 1].options_ser);
                    $("#ed_branch_option" + $i).val(postData[$i - 1].options);
					if(postData[$i - 1].isanswer == 1){
					$("#ed_answer" + $i).attr("checked",true);
					}else{
					$("#ed_answer" + $i).attr("checked",false);
					}
                };

                break;
            default:
                break;
        }
    }, "json").done(function () {
        $("#editclassBT").button('reset');
    });

}



//按下送出修改
function saveEvent() {

    $.ajax({
        type: 'POST',
        url: 'route/controller.php?action=editbranchquest_and_option',
        data: new FormData($("#editClassForm")[0]),
        dataType: 'json',
        contentType: false,
        cache: false,
        processData: false
    }).complete(function (data) {
        //                console.log(JSON.stringify(data.responseText.replace(' ','')));
        switch (data.responseJSON.message) {
            case "failed":
                swal({
                    title: "分支修改失敗！",
                    text: "Oh...NO!" + data.responseJSON.errmsg,
                    icon: "error",
                    default: true
                }).then((value) => {
                    $("#editClassForm")[0].reset();

                });
                break;
            case "success":
                swal({
                    title: "分支修改完成!",
                    text: "Good Job!" + data.responseJSON.errmsg,
                    icon: "success",
                    default: true
                }).then((value) => {
                    $("#editClassForm")[0].reset();
                    $('#editclassModal').modal('hide');
                });
                $('#pClassTable').DataTable().destroy();
                gotolist();
                break;
        }

    });

}
//按下刪除
function deleteEvent(_id) {
    if (confirm("確定要刪除嗎?不能後悔喔!")) {
        var dataAry = {
            ser: _id,
        };
        $.post('route/controller.php?action=deletebranch_question', dataAry, function (data, textStatus, xhr) {
            switch (data.message) {
                case "failed":
                    swal({
                        title: "分支刪除失敗！",
                        text: "Oh...NO!" + data.errmsg,
                        icon: "error",
                        default: true
                    }).then((value) => {
                        gotolist();
                    });
                    break;
                case "success":
                    swal({
                        title: "分支刪除完成!",
                        text: "Good Job!" + data.errmsg,
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
        }, "json");
    }
}



function loadtop_href() { //撈出頂部超連結文字內容
    $.post('route/controller.php?action=loadtop_class&ser=' + id, function (data, textStatus, xhr) {
        postData = data.data;

        switch (data.message) {
            case "failed":
                //                alert(data.errmsg);
                swal({
                    title: "載入失敗！",
                    text: "Oh...NO!" + data.errmsg,
                    icon: "error",
                    default: true
                });
                break;
            case "success":
                var content = '<li class="active"><a href ="Branchtest?param1=branchtest">分支測驗管理 </a></li> <li><a href = \'mind_map?param1=branch2&ser=' + postData[0].third_itemno.split('-')[0] + '\'>' + postData[0].third_itemno.split('-')[1] + '分支問題管理 </a></li>';
                $('#title_href').html(content);
                break;
            default:
                break;
        }
    }, "json");
}

function history_back() {
    history.go(-1);
}


$(function () {

    modules.ui();

})

