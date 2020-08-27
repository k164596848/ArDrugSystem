
//資料標題
var titleLabels = ['強硬', '友善', '迴避', '危機意識', '膽小', '敏感', '好奇'];


var color = Chart.helpers.color;
var ctx = document.getElementById('canvasRadar').getContext('2d');

var randomScalingFactor = function () {//一個會有0~10的變數
    return Math.round(Math.random() * 5) + 3;
};

var radarData = [];

var config = {//這是一個有結構的變數
    type: 'radar',
    data: {
        labels: titleLabels,
        bodyFontSize: 20,
        datasets: [{
            label: localStorage.getItem('_name') + localStorage.getItem('_userid'),
            backgroundColor: color(window.chartColors.red).alpha(0.2).rgbString(),
            borderColor: window.chartColors.red,//邊線
            pointBackgroundColor: window.chartColors.red,//點
            data: [0, 0, 0, 0, 0, 0, 0, 0]
            // localStorage.getItem('_radarData')
        }]
    },
    options: {
        legend: {
            position: 'top',
            labels: {
                fontSize: 16,
                boxWidth: 40,
                fontColor: '#252525'
            }
        },
        // title: {
        //     display: true,
        //     fontSize:18,
        //     text: '人格分析雷達圖'
        // },
        scale: {
            beginAtZero: true,
            pointLabels: {
                fontSize: 18,
                // fontfamily:'Microsoft JhengHei',
                // fontstyle:'bold',
                // fontColor:'#232323'
            },
        },

    }
};

function getRpgAnalysis() {//RpgAnalysis 裡資料
    var dataAry = {
        userid: localStorage.getItem("_userid")
    };

    $.post('route/controller.php?action=getRpgAnalysis', dataAry, function (data, textStatus, xhr) {
        postData = data.data;

        switch (data.message) {
            case "failed":
                alert("目前系統查無RPG分析結果");
                break;
            case "success":
                //這是數值
                radarData = [parseInt(postData[0].Tough), parseInt(postData[0].Friendly), parseInt(postData[0].Avoid), parseInt(postData[0].Crisis),
                parseInt(postData[0].Timid), parseInt(postData[0].Sensitive), parseInt(postData[0].Curious)];
                localStorage.setItem('_radarData', radarData);//他是字串               
                break;
            default:
                break;
        }
    }, 'json').done(function () {
        window.myRadar.update();
    });
}

function getRpgResult() {
    var dataAry = {
        userid: localStorage.getItem("_userid")
    };
    $("#rpg_type").html("");
    $("#rpg_content").html("");

    $.post('route/controller.php?action=getRpgResult', dataAry, function (data, textStatus, xhr) {
        postData = data.data;
        switch (data.message) {
            case "failed":

                break;
            case "success":
                $("#rpg_type").html("系統給您的策略:" + postData[0].type);
                $("#rpg_content").html("詳細解釋:" + postData[0].content);
                break;
            default:
                break;
        }
    }, 'json');


}

window.onload = function () {

    getRpgAnalysis();
    window.myRadar = new Chart(document.getElementById('canvasRadar'), config);
    $("#backpage").click(function () {
        window.location.href = './login?param1=F4B';
    });
    getRpgResult();


};


// function changeData() {

//     //隨機資料
//     config.data.datasets.forEach(function (dataset) {//cofig的data的dataset裡面的每一個數值
//         dataset.data = dataset.data.map(function () {//陣列裡面大洗牌。將隨機資料載入至圖表。
//             return randomScalingFactor();
//         });
//     });

//     window.myRadar.update(); //更新
// }

function changeData() {
    //隨機資料
    config.data.datasets.forEach(function (dataset) {//cofig的data的dataset裡面的每一個數值
        dataset.data = radarData;
        // localStorage.getItem('_radarData')
    });
    window.myRadar.update(); //更新
}

setInterval(changeData, 500);



