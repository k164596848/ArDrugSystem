var modules = {
    ui: function () {
        $('[data-toggle="tooltip"]').tooltip();

        gotoCategorylist();


        // 開啟modal，恢復validator
        $('#addCategoryModal').on('shown.bs.modal', function () {
            $("#addCateForm").validator('update');
        })
        // 關閉modal，清空表單內容
        $('#addCategoryModal').on('hidden.bs.modal', function (event) {
            $("#addCateForm")[0].reset();
            $("#addCateForm").validator('destroy');
        });
        $("#addCateBT").click(function (event) {
            addCateEvent();
        });

        $("#editCateBT").click(function (event) {
            saveEvent($("#editcateid").val());
        });
		$("#deletecatetBT").click(function (event) {
            deletecatetEvent();
        });
        

         gotodepartmentlist();
        // 開啟modal，恢復validator
        $('#adddepartmentModal').on('shown.bs.modal', function () {
            $("#adddepartForm").validator('update');
        })
        // 關閉modal，清空表單內容
        $('#adddepartmentModal').on('hidden.bs.modal', function (event) {
            $("#adddepartForm")[0].reset();
            $("#adddepartForm").validator('destroy');
        });
        $("#adddepartBT").click(function (event) {
            adddepartEvent();
        });
        
        $("#editdepartBT").click(function (event) {
            savedepartEvent($("#editdepartid").val());
        });
        $("#deletedepartBT").click(function (event) {
            deletedepartEvent();
        });


         gotomanagerlist();
        // 開啟modal，恢復validator
        $('#addmanagerModal').on('shown.bs.modal', function () {
            $("#addmanaForm").validator('update');
        })
        // 關閉modal，清空表單內容
        $('#addmanagerModal').on('hidden.bs.modal', function (event) {
            $("#addmanaForm")[0].reset();
            $("#addmanaForm").validator('destroy');
        });
        $("#addmanaBT").click(function (event) {
            addmanaEvent();
        });
        
        $("#editmanaBT").click(function (event) {
            savemanaEvent();
        });
        $("#deletemanaBT").click(function (event) {
            deletemanaEvent();
        });
		
		gotofieldlist();
        // 開啟modal，恢復validator
        $('#addfieldModal').on('shown.bs.modal', function () {
            $("#addfielForm").validator('update');
        })
        // 關閉modal，清空表單內容
        $('#addfieldModal').on('hidden.bs.modal', function (event) {
            $("#addfielForm")[0].reset();
            $("#addfielForm").validator('destroy');
        });
        $("#addfielBT").click(function (event) {
            addfielEvent();
        });
        
        $("#editfielBT").click(function (event) {
            savefielEvent($("#editfielid").val());
        });
        $("#deletefielBT").click(function (event) {
            deletefielEvent();
        });


    },



};


function gotoCategorylist() {
    if ($.fn.dataTable.isDataTable('#categoryListTable')) {
        $('#categoryListTable').DataTable();
    }
    else {
        $('#categoryListTable').DataTable({
            "bProcessing": true,
            "sAjaxSource": "route/controller.php?action=getCategory",
            "aoColumns": [
                { "mData": "CATE_ID", "sWidth": '10%' },
                { "mData": "CATEGORY", "sWidth": '20%' },


                {
                    "mData": "CATE_ID", "sWidth": '20%',
                    "mRender": function (val, type, row) {
                        return "<button class='btn btn-warning btn-circle' data-toggle='modal' data-target='#editCateModal' onclick='loadCateEvent(\"" + val.toString() + "\")'><span class='fa fa-pencil' aria-hidden='true'></span></button><button class='btn btn-danger btn-circle' onclick='deletecateEvent(\"" + val.toString() + "\")'><span class='fa fa-trash' aria-hidden='true'></span></button>";
                    }
                }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex) {

                $(nRow).attr("data-id", aData.CATE_ID);
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
function loadCateEvent(id) {
    $("#editCateBT").button('loading');
    var dataAry = {
        cateid: id
    };
    $.post('route/controller.php?action=loadCateEvent', dataAry, function (data, textStatus, xhr) {
        postData = data.data;
        switch (data.message) {
            case "failed":
                swal({
                    title: "類別載入失敗！請聯繫管理員。\n Email: s1410531031@nutc.edu.tw",
                    text: "Oh...NO!" + data.errmsg,
                    icon: "error",
                    default: true
                });
                break;
            case "success":
                $("#editcateid").val(postData[0].CATE_ID);
                $("#editcategory").val(postData[0].CATEGORY);


                break;
            default:
                break;
        }
    }, "json").done(function () {
        $("#editCateBT").button('reset');
    });
}
function addCateEvent() {

    $("#addCateBT").button('loading');
    var dataAry = {
        category: $("#categoryname").val(),



    };

    $.post('route/controller.php?action=addCategory', dataAry, function (data, textStatus, xhr) {
        switch (data.message) {
            case "failed":
                swal({
                    title: "類別新增失敗！",
                    text: "Oh...NO!" + data.errmsg,
                    icon: "error",
                    default: true
                }).then((value) => {
                    $("#addCateForm")[0].reset();
                });
                break;
            case "success":
                swal({
                    title: "類別新增成功!",
                    text: "Good Job!" + data.errmsg,
                    icon: "success",
                    default: true
                }).then((value) => {
                    $('#addCatesModal').modal('hide');
                });
                $('#categoryListTable').DataTable().destroy();
                gotoCategorylist();
                break;
            default:
                break;
        }
    }, "json").done(function () {
        $("#addCateBT").button('reset');
    });

}

function saveEvent(id) {
    var dataAry = {
        category: $("#editcategory").val(),
        cateid: id
    };
    $.post('route/controller.php?action=editCategory', dataAry, function (data, textStatus, xhr) {
        switch (data.message) {
            case "failed":
                swal({
                    title: "類別修改失敗！",
                    text: "Oh...NO!" + data.errmsg,
                    icon: "error",
                    default: true
                });
                break;
            case "success":
                swal({
                    title: "類別修改成功!",
                    text: "Good Job!" + data.errmsg,
                    icon: "success",
                    default: true
                }).then((value) => {

                    $('#editCateModal').modal('hide');
                });

                $('#categoryListTable').DataTable().destroy();
                gotoCategorylist();

                break;
            default:
                break;
        }
    }, "json");
}

function deletecateEvent(id){
  if(confirm("確定要刪除嗎?不能後悔喔!"))
  {
    var dataAry = {
      cateid: id
    };
    $.post('route/controller.php?action=deletecate', dataAry, function(data, textStatus, xhr) {
            switch(data.message){
              case "failed":
                swal({
                    title: "類別刪除失敗！",
                    text: "Oh...NO!"+data.errmsg,
                    icon: "error",
                    default: true
                });
              break;
              case "success":  
                swal({
                    title: "類別刪除成功!",
                    text: "Good Job!"+data.errmsg,
                    icon: "success",
                    default: true
                }).then((value) => {
                    $('#CategoryModal').modal('hide');
                });
                $('#categoryListTable').DataTable().destroy();
                gotoCategorylist();
              break;
              default:
              break;
            }
      },"json").done(function () {
        $("#deletecateBT").button('reset');
         });
  }
}

//部門
function gotodepartmentlist() {
    if ($.fn.dataTable.isDataTable('#departmentListTable')) {
        $('#departmentListTable').DataTable();
    }
    else {
        $('#departmentListTable').DataTable({
            "bProcessing": true,
            "sAjaxSource": "route/controller.php?action=getdepartment",
            "aoColumns": [
                { "mData": "D_ID", "sWidth": '10%' },
                { "mData": "DEPARTMENT", "sWidth": '20%' },


                {
                    "mData": "D_ID", "sWidth": '20%',
                    "mRender": function (val, type, row) {
                        return "<button class='btn btn-warning btn-circle' data-toggle='modal' data-target='#editdepartModal' onclick='loaddepartEvent(\"" + val.toString() + "\")'><span class='fa fa-pencil' aria-hidden='true'></span></button><button class='btn btn-danger btn-circle' onclick='deletedepartEvent(\"" + val.toString() + "\")'><span class='fa fa-trash' aria-hidden='true'></span></button>";
                    }
                }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex) {

                $(nRow).attr("data-id", aData.D_ID);
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

function loaddepartEvent(id) {
    $("#editdepartBT").button('loading');
    var dataAry = {
        departid: id
    };
    $.post('route/controller.php?action=loaddepartEvent', dataAry, function (data, textStatus, xhr) {
        postData = data.data;
        switch (data.message) {
            case "failed":
                swal({
                    title: "部門載入失敗！請聯繫管理員。\n Email: s1410531031@nutc.edu.tw",
                    text: "Oh...NO!" + data.errmsg,
                    icon: "error",
                    default: true
                });
                break;
            case "success":
                $("#editdepartid").val(postData[0].D_ID);
                $("#editdepartment").val(postData[0].DEPARTMENT);


                break;
            default:
                break;
        }
    }, "json").done(function () {
        $("#editdepartBT").button('reset');
    });
}

//新增部門
function adddepartEvent() {

    $("#adddepartBT").button('loading');
    var dataAry = {
        departid: $("#departid").val(),
        department: $("#departmentname").val(),

    };

    $.post('route/controller.php?action=adddepartment', dataAry, function (data, textStatus, xhr) {
        switch (data.message) {
            case "failed":
                swal({
                    title: "部門新增失敗！",
                    text: "Oh...NO!" + data.errmsg,
                    icon: "error",
                    default: true
                }).then((value) => {
                    $("#adddepartForm")[0].reset();
                });
                break;
            case "success":
                swal({
                    title: "部門新增成功!",
                    text: "Good Job!" + data.errmsg,
                    icon: "success",
                    default: true
                }).then((value) => {
                    $('#adddepartModal').modal('hide');
                });
                $('#departmentListTable').DataTable().destroy();
                gotodepartmentlist();
                break;
            default:
                break;
        }
    }, "json").done(function () {
        $("#adddepartBT").button('reset');
    });

}

function savedepartEvent(id) {
    var dataAry = {
        department: $("#editdepartment").val(),
        departid: id
    };
    $.post('route/controller.php?action=editdepartment', dataAry, function (data, textStatus, xhr) {
        switch (data.message) {
            case "failed":
                swal({
                    title: "部門修改失敗！",
                    text: "Oh...NO!" + data.errmsg,
                    icon: "error",
                    default: true
                });
                break;
            case "success":
                swal({
                    title: "部門修改成功!",
                    text: "Good Job!" + data.errmsg,
                    icon: "success",
                    default: true
                }).then((value) => {

                    $('#editdepartModal').modal('hide');
                });

                $('#departmentListTable').DataTable().destroy();
                gotodepartmentlist();

                break;
            default:
                break;
        }
    }, "json");
}
//刪除部門
function deletedepartEvent(id){
  if(confirm("確定要刪除嗎?不能後悔喔!"))
  {
    var dataAry = {
      departid: id
    };
    $.post('route/controller.php?action=deletedepart', dataAry, function(data, textStatus, xhr) {
            switch(data.message){
              case "failed":
                swal({
                    title: "部門刪除失敗！",
                    text: "Oh...NO!"+data.errmsg,
                    icon: "error",
                    default: true
                });
              break;
              case "success":  
                swal({
                    title: "部門刪除成功!",
                    text: "Good Job!"+data.errmsg,
                    icon: "success",
                    default: true
                }).then((value) => {
                    $('#departmentModal').modal('hide');
                });
                $('#departmentListTable').DataTable().destroy();
                gotodepartmentlist();
              break;
              default:
              break;
            }
      },"json").done(function () {
        $("#deletedepartBT").button('reset');
         });
  }
}


//主管
function gotomanagerlist() {
    if ($.fn.dataTable.isDataTable('#managerListTable')) {
        $('#managerListTable').DataTable();
    }
    else {
        $('#managerListTable').DataTable({
            "bProcessing": true,
            "sAjaxSource": "route/controller.php?action=getmanager",
            "aoColumns": [
                { "mData": "S_ID", "sWidth": '10%' },
                { "mData": "S_NAME", "sWidth": '20%' },
				{ "mData": "S_EXTENSION", "sWidth": '20%' },
				{ "mData": "S_EMAIL", "sWidth": '20%' },
                {
                    "mData": "S_ID", "sWidth": '20%',
                    "mRender": function (val, type, row) {
                        return "<button class='btn btn-warning btn-circle' data-toggle='modal' data-target='#editmanaModal' onclick='loadmanaEvent(\"" + val.toString() + "\")'><span class='fa fa-pencil' aria-hidden='true'></span></button><button class='btn btn-danger btn-circle' onclick='deletemanaEvent(\"" + val.toString() + "\")'><span class='fa fa-trash' aria-hidden='true'></span></button>";
                    }
                }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex) {

                $(nRow).attr("data-id", aData.S_ID);
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

function loadmanaEvent(id) {
    $("#editmanaBT").button('loading');
    var dataAry = {
        manaid: id
    };
    $.post('route/controller.php?action=loadmanaEvent', dataAry, function (data, textStatus, xhr) {
        postData = data.data;
        switch (data.message) {
            case "failed":
                swal({
                    title: "主管載入失敗！請聯繫管理員。\n Email: s1410531031@nutc.edu.tw",
                    text: "Oh...NO!" + data.errmsg,
                    icon: "error",
                    default: true
                });
                break;
            case "success":
                $("#ed_manaid").val(postData[0].S_ID);
                $("#ed_manager").val(postData[0].S_NAME);
				$("#ed_manaextension").val(postData[0].S_EXTENSION);
				$("#ed_manamail").val(postData[0].S_EMAIL);
                break;
            default:
                break;
        }
    }, "json").done(function () {
        $("#editmanaBT").button('reset');
    });
}
//新增主管
function addmanaEvent() {

    $("#addmanaBT").button('loading');
    var dataAry = {
        manaid:$("#manaid").val(),
        manager:$("#managername").val(),
		manaextension:$("#mana_extension").val(),
		manamail:$("#mana_mail").val()
    };

    $.post('route/controller.php?action=addmanager', dataAry, function (data, textStatus, xhr) {
        switch (data.message) {
            case "failed":
                swal({
                    title: "主管新增失敗！",
                    text: "Oh...NO!" + data.errmsg,
                    icon: "error",
                    default: true
                }).then((value) => {
                    $("#addmanaForm")[0].reset();
                });
                break;
            case "success":
                swal({
                    title: "主管新增成功!",
                    text: "Good Job!" + data.errmsg,
                    icon: "success",
                    default: true
                }).then((value) => {
                    $('#addmanagerModal').modal('hide');
                });
                $('#managerListTable').DataTable().destroy();
                gotomanagerlist();
                break;
            default:
                break;
        }
    }, "json").done(function () {
        $("#addmanaBT").button('reset');
    });

}

function savemanaEvent() {
    var dataAry = {
        manager:$("#ed_manager").val(),
        manaid:$("#ed_manaid").val(),
		manaextension:$("#ed_manaextension").val(),
		manamail:$("#ed_manamail").val()
    };
	
    $.post('route/controller.php?action=editmanager', dataAry, function (data, textStatus, xhr) {
        switch (data.message) {
            case "failed":
                swal({
                    title: "主管修改失敗！",
                    text: "Oh...NO!" + data.errmsg,
                    icon: "error",
                    default: true
                });
                break;
            case "success":
                swal({
                    title: "主管修改成功!",
                    text: "Good Job!" + data.errmsg,
                    icon: "success",
                    default: true
                }).then((value) => {

                    $('#editmanaModal').modal('hide');
                });

                $('#managerListTable').DataTable().destroy();
                gotomanagerlist();

                break;
            default:
                break;
        }
    }, "json");
}

//刪除主管
function deletemanaEvent(id){
  if(confirm("確定要刪除嗎?不能後悔喔!"))
  {
    var dataAry = {
      manaid: id
    };
    $.post('route/controller.php?action=deletemana', dataAry, function(data, textStatus, xhr) {
            switch(data.message){
              case "failed":
                swal({
                    title: "主管刪除失敗！",
                    text: "Oh...NO!"+data.errmsg,
                    icon: "error",
                    default: true
                });
              break;
              case "success":  
                swal({
                    title: "主管刪除成功!",
                    text: "Good Job!"+data.errmsg,
                    icon: "success",
                    default: true
                }).then((value) => {
                    $('#managerModal').modal('hide');
                });
                $('#managerListTable').DataTable().destroy();
                gotomanagerlist();
              break;
              default:
              break;
            }
      },"json").done(function () {
        $("#deletemanaBT").button('reset');
         });
  }
}

//領域
function gotofieldlist() {
    if ($.fn.dataTable.isDataTable('#fieldListTable')) {
        $('#fieldListTable').DataTable();
    }
    else {
        $('#fieldListTable').DataTable({
            "bProcessing": true,
            "sAjaxSource": "route/controller.php?action=getfield",
            "aoColumns": [
                { "mData": "F_ID", "sWidth": '10%' },
                { "mData": "FIELD", "sWidth": '20%' },


                {
                    "mData": "F_ID", "sWidth": '20%',
                    "mRender": function (val, type, row) {
                        return "<button class='btn btn-warning btn-circle' data-toggle='modal' data-target='#editfielModal' onclick='loadfielEvent(\"" + val.toString() + "\")'><span class='fa fa-pencil' aria-hidden='true'></span></button><button class='btn btn-danger btn-circle' onclick='deletefielEvent(\"" + val.toString() + "\")'><span class='fa fa-trash' aria-hidden='true'></span></button>";
                    }
                }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex) {

                $(nRow).attr("data-id", aData.F_ID);
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

function loadfielEvent(id) {
    $("#editfielBT").button('loading');
    var dataAry = {
        fielid: id
    };
    $.post('route/controller.php?action=loadfielEvent', dataAry, function (data, textStatus, xhr) {
        postData = data.data;
        switch (data.message) {
            case "failed":
                swal({
                    title: "領域載入失敗！請聯繫管理員。\n Email: s1410531031@nutc.edu.tw",
                    text: "Oh...NO!" + data.errmsg,
                    icon: "error",
                    default: true
                });
                break;
            case "success":
                $("#editfielid").val(postData[0].F_ID);
                $("#editfield").val(postData[0].FIELD);


                break;
            default:
                break;
        }
    }, "json").done(function () {
        $("#editfielBT").button('reset');
    });
}

//新增領域
function addfielEvent() {

    $("#addfielBT").button('loading');
    var dataAry = {
        fielid: $("#fielid").val(),
        field: $("#fieldname").val(),

    };

    $.post('route/controller.php?action=addfield', dataAry, function (data, textStatus, xhr) {
        switch (data.message) {
            case "failed":
                swal({
                    title: "領域新增失敗！",
                    text: "Oh...NO!" + data.errmsg,
                    icon: "error",
                    default: true
                }).then((value) => {
                    $("#addfielForm")[0].reset();
                });
                break;
            case "success":
                swal({
                    title: "領域新增成功!",
                    text: "Good Job!" + data.errmsg,
                    icon: "success",
                    default: true
                }).then((value) => {
                    $('#addfielModal').modal('hide');
                });
                $('#fieldListTable').DataTable().destroy();
                gotofieldlist();
                break;
            default:
                break;
        }
    }, "json").done(function () {
        $("#addfielBT").button('reset');
    });

}

function savefielEvent(id) {
    var dataAry = {
        field: $("#editfield").val(),
        fielid: id
    };
    $.post('route/controller.php?action=editfield', dataAry, function (data, textStatus, xhr) {
        switch (data.message) {
            case "failed":
                swal({
                    title: "領域修改失敗！",
                    text: "Oh...NO!" + data.errmsg,
                    icon: "error",
                    default: true
                });
                break;
            case "success":
                swal({
                    title: "領域修改成功!",
                    text: "Good Job!" + data.errmsg,
                    icon: "success",
                    default: true
                }).then((value) => {

                    $('#editfielModal').modal('hide');
                });

                $('#fieldListTable').DataTable().destroy();
                gotofieldlist();

                break;
            default:
                break;
        }
    }, "json");
}
//刪除領域
function deletefielEvent(id){
  if(confirm("確定要刪除嗎?不能後悔喔!"))
  {
    var dataAry = {
      fielid: id
    };
    $.post('route/controller.php?action=deletefiel', dataAry, function(data, textStatus, xhr) {
            switch(data.message){
              case "failed":
                swal({
                    title: "領域刪除失敗！",
                    text: "Oh...NO!"+data.errmsg,
                    icon: "error",
                    default: true
                });
              break;
              case "success":  
                swal({
                    title: "領域刪除成功!",
                    text: "Good Job!"+data.errmsg,
                    icon: "success",
                    default: true
                }).then((value) => {
                    $('#fieldModal').modal('hide');
                });
                $('#fieldListTable').DataTable().destroy();
                gotofieldlist();
              break;
              default:
              break;
            }
      },"json").done(function () {
        $("#deletefielBT").button('reset');
         });
  }
}

$(function () {
    modules.ui();
})

