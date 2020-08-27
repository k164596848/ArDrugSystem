
var modules = {
    ui: function () {

        loadDrugStar();
        loadTestlog();

        // $("#addpclassBT").click(function (event) {
        //     addBranchQuest();
        // });

        // $("#editclassBT").click(function (event) {
        //     if (!document.getElementById('ed_branch_quest_content').value == "") {
        //         saveEvent();
        //     } else {
        //         alert('請輸入分支內容');
        //     }
        // });


    }
};

function loadDrugStar() {

    var dataAry = {
        userid: localStorage.getItem('_userid')
    };

    $.post('route/controller.php?action=loadDrugStar', dataAry, function (data, textStatus, xhr) {
        postData = data.data;

        var drugStarAry = [0, 0, 0, 0, 0];

        switch (data.message) {
            case "failed":

                break;
            case "success":
                for ($i = 0; $i < postData.length; $i++) {
                    switch (postData[$i].branch_ser) {

                        case "1"://大麻
                            if (postData[$i].result == 1) drugStarAry[0]++;
                            break;
                        case "2"://安非他命
                            if (postData[$i].result == 1) drugStarAry[1]++;
                            break;
                        case "3"://K他命
                            if (postData[$i].result == 1) drugStarAry[2]++;
                            break;
                        case "4"://搖頭丸
                            if (postData[$i].result == 1) drugStarAry[3]++;
                            break;
                        case "5"://海洛英
                            if (postData[$i].result == 1) drugStarAry[4]++;
                            break;

                    };
                    // $("#drug" + $i).apped("")
                }

                for ($num = 0; $num < 5; $num++) {

                    for ($j = 0; $j < drugStarAry[$num]; $j++)//星星
                    {
                        $("#drug" + ($num + 1)).append("<span class='fa fa-star checked'></span>");
                    }
                    for ($k = 0; $k < 5 - drugStarAry[$num]; $k++)//沒星星
                    {
                        $("#drug" + ($num + 1)).append("<span class='fa fa-star '></span>");
                    }
                }
                break;
            default:
                break;
        }
    }, 'json');

}



function loadTestlog() {
    var dataAry = {
        userid: localStorage.getItem("_userid")
    };

    $.post('route/controller.php?action=load_testlog', dataAry, function (data, textStatus, xhr) {
        postData = data.data;
        switch (data.message) {
            case "failed":
                break;
            case "success":
                for ($i = 0; $i < postData.length; $i++) {
                    
                    if (parseInt(postData[$i].result)) {
                        anser = "<span  class='label label-success'>答對</span>";
                    }
                    else {
                        anser = "<span  class='label label-danger'>答錯</span>";
                    }

                    $("#tablebody").append("<tr><td>" + postData[$i].drugname + "</td><td>" + postData[$i].question + "</td><td>" + anser + "</td></tr>");

                }
                break;
            default:
                break;
        }
    }, 'json');


}




$(function () {

    modules.ui();

})

