//這裡是Loading map小地圖

//第一層級的變數ser 1~5 這裡不要重複宣告
// var Aser = "";
// var Bser = "";
// var Cser = "";
// var Dser = "";

//第二層ser 5~
var A1ser = "";
var A2ser = "";
var A3ser = "";
var B1ser = "";
var B2ser = "";
var B3ser = "";
var C1ser = "";
var C2ser = "";
var C3ser = "";
var D1ser = "";
var D2ser = "";
var D3ser = "";

var url = location.href;//抓取現在網址
if (url.indexOf('?') != -1) {

	var question = "";
	var page = 0;
	//在此直接將各自的參數資料切割放進ary中
	var ary = url.split('?')[1].split('&');//param1=F4B
	//此時ary的內容為：

	//下迴圈去搜尋每個資料參數
	for (i = 0; i <= ary.length - 1; i++) {
		if (ary[i].split('=')[0] == 'param1') {
			page = ary[i].split('=')[1];//F4B
		}

	}
}


$(function () {

	setTimeout(function () { smallMap(); }, 2000);// first time loading for smallMap

	$("#closebtn").click(function () {
		$("#map").hide();
		$("#map_btn").show();
		$("#home_btn").show();
	});
	if (page == "F4B") {

	}
	else if (page == "F4BR1" || page == "F4BR2-2" || page == "F4BR2-1" || page == "F4BR2-3") //B
	{
		$(".A").css('opacity', 0.3);
		$(".C").css('opacity', 0.3);
		$(".D").css('opacity', 0.3);
		$(".E").css('opacity', 0.3);
	}
	else if (page == "F4BL1" || page == "F4BL2-2" || page == "F4BL2-1" || page == "F4BL2-3") //E
	{
		$(".A").css('opacity', 0.3);
		$(".C").css('opacity', 0.3);
		$(".D").css('opacity', 0.3);
		$(".B").css('opacity', 0.3);
	}
	else if (page == "F4BDL1" || page == "F4BDL2-2" || page == "F4BDL2-1" || page == "F4BDL2-3") //D
	{
		$(".A").css('opacity', 0.3);
		$(".E").css('opacity', 0.3);
		$(".C").css('opacity', 0.3);
		$(".B").css('opacity', 0.3);
	}
	else if (page == "F4BDR1" || page == "F4BDR2-2" || page == "F4BDR2-1" || page == "F4BDR2-3") //C
	{
		$(".A").css('opacity', 0.3);
		$(".E").css('opacity', 0.3);
		$(".D").css('opacity', 0.3);
		$(".B").css('opacity', 0.3);
	}
	else if (page == "F4BU1" || page == "F4BU2-2" || page == "F4BU2-1" || page == "F4BU2-3") //A
	{
		$(".B").css('opacity', 0.3);
		$(".C").css('opacity', 0.3);
		$(".E").css('opacity', 0.3);
		$(".D").css('opacity', 0.3);

	}
	else {

	}

	$("#map_btn").click(function () {
		$("#map").show();
		$("#map").addClass('all_show');
		setTimeout(function () { $("#map_btn").hide(); $("#home_btn").hide() }, 1000);
	})
});





function smallMap()//載入小地圖
{

	$.post('route/controller.php?action=mind', function (data, textStatus, xhr) {

		// alert(data.message);
		switch (data.message) {

			case "success":
				postData = data.data;
				$("#MAtext").html(postData[0].branch_content);
				$("#MBtext").html(postData[1].branch_content);
				$("#MCtext").html(postData[2].branch_content);
				$("#MDtext").html(postData[3].branch_content);
				$("#MEtext").html(postData[4].branch_content);

				Aser = postData[0].ser;//大麻SER
				Bser = postData[1].ser;//安非他命SER
				Cser = postData[2].ser;//k他命
				Dser = postData[3].ser;//搖頭丸
				Eser = postData[4].ser;//海洛英
				
				levelinfo(Aser);//小地圖的第一層
				levelinfo(Bser);
				levelinfo(Cser);
				levelinfo(Dser);
				levelinfo(Eser);
				break;
			case "failed":
				alert("data not pull out from sql");
				break;
		}
	}, "json");
}

function mapinfo(ser) {
	dataAry =
		{
			ser: ser,
		}
	$.post('route/controller.php?action=mapinfo', dataAry, function (data, textStatus, xhr) {

		// alert(data.message);
		switch (data.message) {

			case "success":
				postData = data.data;
			// alert("in");

			case "failed":
				alert("data not pull out from sql");
				break;
		}
	}, "json");
}

function levelinfo(ser) {
	dataAry =
		{
			level1ser: ser,
		}
	$.post('route/controller.php?action=level2', dataAry, function (data, textStatus, xhr) {

		// alert(data.message);
		switch (data.message) {

			case "success":
				postData = data.data;
				// alert("in");
				switch (postData[0].b_ser) {
					case Aser:
						$("#A1btn_text").html(postData[0].branch_content);
						$("#A2btn_text").html(postData[1].branch_content);
						$("#A3btn_text").html(postData[2].branch_content);
						A1ser = postData[0].ser;
						A2ser = postData[1].ser;
						A3ser = postData[2].ser;
						levelinfo2(A1ser);
						levelinfo2(A2ser);
						levelinfo2(A3ser);
						break;
					case '' + Bser + '':
						$("#B1btn_text").html(postData[0].branch_content);
						$("#B2btn_text").html(postData[1].branch_content);
						$("#B3btn_text").html(postData[2].branch_content);
						B1ser = postData[0].ser;
						B2ser = postData[1].ser;
						B3ser = postData[2].ser;
						levelinfo2(B1ser);
						levelinfo2(B2ser);
						levelinfo2(B3ser);
						break;
					case '' + Cser + '':
						$("#C1btn_text").html(postData[0].branch_content);
						$("#C2btn_text").html(postData[1].branch_content);
						$("#C3btn_text").html(postData[2].branch_content);
						C1ser = postData[0].ser;
						C2ser = postData[1].ser;
						C3ser = postData[2].ser;
						levelinfo2(C1ser);
						levelinfo2(C2ser);
						levelinfo2(C3ser);
						break;
					case '' + Dser + '':
						$("#D1btn_text").html(postData[0].branch_content);
						$("#D2btn_text").html(postData[1].branch_content);
						$("#D3btn_text").html(postData[2].branch_content);
						D1ser = postData[0].ser;
						D2ser = postData[1].ser;
						D3ser = postData[2].ser;
						levelinfo2(D1ser);
						levelinfo2(D2ser);
						levelinfo2(D3ser);
						break;
					case '' + Eser + '':
						$("#E1btn_text").html(postData[0].branch_content);
						$("#E2btn_text").html(postData[1].branch_content);
						$("#E3btn_text").html(postData[2].branch_content);
						E1ser = postData[0].ser;
						E2ser = postData[1].ser;
						E3ser = postData[2].ser;
						levelinfo2(E1ser);
						levelinfo2(E2ser);
						levelinfo2(E3ser);
						break;

				}
				break;
			case "failed":
				alert("data not pull out from sql");
				break;
		}
	}, "json");
}

function levelinfo2(ser) {
	dataAry =
		{
			level1ser: ser,
		}
	$.post('route/controller.php?action=level2', dataAry, function (data, textStatus, xhr) {

		// alert(data.message);
		switch (data.message) {

			case "success":
				postData = data.data;
				// alert("in");
				switch (postData[0].b_ser) {
					case '' + A1ser + '':
						if (postData.length == 1) {
							$("#lineT1").attr('src', './pic/line-1.png');
							$("#lineT1").css('width', '33%');
							$("#A1ques2_text").html(postData[0].branch_content);
							$("#A1ques1").hide();
							$("#A1ques3").hide();
						}
						else if (postData.length == 2) {
							$("#lineT1").attr('src', './pic/line-2.png');

							$("#A1ques1_text").html(postData[0].branch_content);
							$("#A1ques2_text").html(postData[1].branch_content);
							$("#A1ques3").hide();
						}
						else {
							$("#A1ques1_text").html(postData[0].branch_content);
							$("#A1ques2_text").html(postData[1].branch_content);
							$("#A1ques3_text").html(postData[2].branch_content);
						}
						break;
					case '' + A2ser + '':
						if (postData.length == 1) {
							$("#lineT2").attr('src', './pic/line-1.png');
							$("#lineT2").css('width', '33%');
							$("#A2ques2_text").html(postData[0].branch_content);
							$("#A2ques1").hide();
							$("#A2ques3").hide();
						}
						else if (postData.length == 2) {
							$("#lineT2").attr('src', './pic/line-2.png');

							$("#A2ques1_text").html(postData[0].branch_content);
							$("#A2ques2_text").html(postData[1].branch_content);
							$("#A2ques3").hide();
						}
						else {
							$("#A2ques1_text").html(postData[0].branch_content);
							$("#A2ques2_text").html(postData[1].branch_content);
							$("#A2ques3_text").html(postData[2].branch_content);
						}
						break;
					case '' + A3ser + '':
						if (postData.length == 1) {
							$("#lineT3").attr('src', './pic/line-1.png');
							$("#lineT3").css('width', '33%');
							$("#A3ques2_text").html(postData[0].branch_content);
							$("#A3ques1").hide();
							$("#A3ques3").hide();
						}
						else if (postData.length == 2) {
							$("#lineT3").attr('src', './pic/line-2.png');
							$("#A3ques1_text").html(postData[0].branch_content);
							$("#A3ques2_text").html(postData[1].branch_content);
							$("#A3ques3").hide();
						}
						else {
							$("#A3ques1_text").html(postData[0].branch_content);
							$("#A3ques2_text").html(postData[1].branch_content);
							$("#A3ques3_text").html(postData[2].branch_content);
						}
						break;
					case '' + B1ser + '':
						if (postData.length == 1) {
							$("#lineR1").attr('src', './pic/line-1.png');
							$("#lineR1").css('width', '33%');
							$("#B1ques2_text").html(postData[0].branch_content);
							$("#B1ques1").hide();
							$("#B1ques3").hide();
						}
						else if (postData.length == 2) {
							$("#lineR1").attr('src', './pic/line-2.png');
							$("#B1ques1_text").html(postData[0].branch_content);
							$("#B1ques2_text").html(postData[1].branch_content);
							$("#B1ques3").hide();
						}
						else {
							$("#B1ques1_text").html(postData[0].branch_content);
							$("#B1ques2_text").html(postData[1].branch_content);
							$("#B1ques3_text").html(postData[2].branch_content);
						}
						break;
					case '' + B2ser + '':
						if (postData.length == 1) {
							$("#lineR2").attr('src', './pic/line-1.png');
							$("#lineR2").css('width', '33%');
							$("#B2ques2_text").html(postData[0].branch_content);
							$("#B2ques1").hide();
							$("#B2ques3").hide();
						}
						else if (postData.length == 2) {
							$("#lineR2").attr('src', './pic/line-2.png');
							$("#B2ques1_text").html(postData[0].branch_content);
							$("#B2ques2_text").html(postData[1].branch_content);
							$("#B2ques3").hide();
						}
						else {
							$("#B2ques1_text").html(postData[0].branch_content);
							$("#B2ques2_text").html(postData[1].branch_content);
							$("#B2ques3_text").html(postData[2].branch_content);
						}
						break;
					case '' + B3ser + '':
						if (postData.length == 1) {
							$("#lineR3").attr('src', './pic/line-1.png');
							$("#lineR3").css('width', '33%');
							$("#B3ques1_text").html(postData[0].branch_content);
							$("#B3ques2").hide();
							$("#B3ques3").hide();
						}
						else if (postData.length == 2) {
							$("#lineR3").attr('src', './pic/line-2.png');
							$("#B3ques1_text").html(postData[0].branch_content);
							$("#B3ques2_text").html(postData[1].branch_content);
							$("#B3ques3").hide();
						}
						else {
							$("#B3ques1_text").html(postData[0].branch_content);
							$("#B3ques2_text").html(postData[1].branch_content);
							$("#B3ques3_text").html(postData[2].branch_content);
						}
						break;
					case '' + C1ser + '':
						if (postData.length == 1) {
							$("#lineDR1").attr('src', './pic/lineDR-1.png');
							$("#C1ques1_text").html(postData[0].branch_content);
							$("#C1ques2").hide();
							$("#C1ques3").hide();
						}
						else if (postData.length == 2) {
							$("#lineDR1").attr('src', './pic/lineDR-2.png');
							$("#C1ques1_text").html(postData[0].branch_content);
							$("#C1ques2_text").html(postData[1].branch_content);
							$("#C1ques3").hide();
						}
						else {
							$("#C1ques1_text").html(postData[0].branch_content);
							$("#C1ques2_text").html(postData[1].branch_content);
							$("#C1ques3_text").html(postData[2].branch_content);
						}
						break;
					case '' + C2ser + '':
						if (postData.length == 1) {
							$("#lineDR2").attr('src', './pic/lineDR-1.png');
							$("#C2ques2_text").html(postData[0].branch_content);
							$("#C2ques1").hide();
							$("#C2ques3").hide();
						}
						else if (postData.length == 2) {
							$("#lineDR2").attr('src', './pic/lineDR-2.png');
							$("#C2ques1_text").html(postData[0].branch_content);
							$("#C2ques2_text").html(postData[1].branch_content);
							$("#C2ques3").hide();
						}
						else {
							$("#C2ques1_text").html(postData[0].branch_content);
							$("#C2ques2_text").html(postData[1].branch_content);
							$("#C2ques3_text").html(postData[2].branch_content);
						}
						break;
					case '' + C3ser + '':
						if (postData.length == 1) {
							$("#C3ques2_text").html(postData[0].branch_content);
							$("#C3ques1").hide();
							$("#C3ques3").hide();
						}
						else if (postData.length == 2) {
							$("#C3ques1_text").html(postData[0].branch_content);
							$("#C3ques2_text").html(postData[1].branch_content);
							$("#C3ques3").hide();
						}
						else {
							$("#C3ques1_text").html(postData[0].branch_content);
							$("#C3ques2_text").html(postData[1].branch_content);
							$("#C3ques3_text").html(postData[2].branch_content);
						}
						break;
					case '' + D1ser + '':
						if (postData.length == 1) {
							$("#D1ques2_text").html(postData[0].branch_content);
							$("#lineDL1").attr('src', './pic/lineDL-1.png');
							$("#D1ques1").hide();
							$("#D1ques3").hide();
						}
						else if (postData.length == 2) {
							$("#D1ques1_text").html(postData[0].branch_content);
							$("#D1ques2_text").html(postData[1].branch_content);
							$("#lineDL1").attr('src', './pic/lineDL-2.png');
							$("#D1ques3").hide();
						}
						else {
							$("#D1ques1_text").html(postData[0].branch_content);
							$("#D1ques2_text").html(postData[1].branch_content);
							$("#D1ques3_text").html(postData[2].branch_content);
						}
						break;
					case '' + D2ser + '':
						if (postData.length == 1) {
							$("#lineDL2").attr('src', './pic/lineDL-1.png');
							$("#D2ques2_text").html(postData[0].branch_content);
							$("#D2ques1").hide();
							$("#D2ques3").hide();
						}
						else if (postData.length == 2) {
							$("#D2ques1_text").html(postData[0].branch_content);
							$("#D2ques2_text").html(postData[1].branch_content);
							$("#lineDL2").attr('src', './pic/lineDL-2.png');

							$("#D2ques3").hide();
						}
						else {
							$("#D2ques1_text").html(postData[0].branch_content);
							$("#D2ques2_text").html(postData[1].branch_content);
							$("#D2ques3_text").html(postData[2].branch_content);
						}
						break;
					case '' + D3ser + '':
						if (postData.length == 1) {
							$("#lineDL3").attr('src', './pic/lineDL-1.png');
							$("#D3ques2_text").html(postData[0].branch_content);
							$("#D3ques1").hide();
							$("#D3ques3").hide();
						}
						else if (postData.length == 2) {
							$("#D3ques1_text").html(postData[0].branch_content);
							$("#D3ques2_text").html(postData[1].branch_content);
							$("#lineDL3").attr('src', './pic/lineDL-2.png');
							$("#D3ques3").hide();
						}
						else {
							$("#D3ques1_text").html(postData[0].branch_content);
							$("#D3ques2_text").html(postData[1].branch_content);
							$("#D3ques3_text").html(postData[2].branch_content);
						}
						break;
					case '' + E1ser + '':
						if (postData.length == 1) {
							$("#lineL1").attr('src', './pic/line-1.png');
							$("#lineL1").css('width', '33%');
							$("#E1ques1_text").html(postData[0].branch_content);
							$("#E1ques2").hide();
							$("#E1ques3").hide();
						}
						else if (postData.length == 2) {
							$("#lineL1").attr('src', './pic/line-2.png');
							$("#E1ques1_text").html(postData[0].branch_content);
							$("#E1ques2_text").html(postData[1].branch_content);
							$("#E1ques3").hide();
						}
						else {
							$("#E1ques1_text").html(postData[0].branch_content);
							$("#E1ques2_text").html(postData[1].branch_content);
							$("#E1ques3_text").html(postData[2].branch_content);
						}
						break;
					case '' + E2ser + '':
						if (postData.length == 1) {
							$("#lineL2").attr('src', './pic/line-1.png');
							$("#lineL2").css('width', '33%');
							$("#E2ques2_text").html(postData[0].branch_content);
							$("#E2ques1").hide();
							$("#E2ques3").hide();
						}
						else if (postData.length == 2) {
							$("#lineL2").attr('src', './pic/line-2.png');
							$("#E2ques1_text").html(postData[0].branch_content);
							$("#E2ques2_text").html(postData[1].branch_content);
							$("#E2ques3").hide();
						}
						else {
							$("#E2ques1_text").html(postData[0].branch_content);
							$("#E2ques2_text").html(postData[1].branch_content);
							$("#E2ques3_text").html(postData[2].branch_content);
						}
						break;
					case '' + E3ser + '':
						if (postData.length == 1) {
							$("#lineL3").attr('src', './pic/line-1.png');
							$("#lineL3").css('width', '33%');
							$("#E3ques2_text").html(postData[0].branch_content);
							$("#E3ques1").hide();
							$("#E3ques3").hide();
						}
						else if (postData.length == 2) {
							$("#lineL3").attr('src', './pic/line-2.png');
							$("#E3ques1_text").html(postData[0].branch_content);
							$("#E3ques2_text").html(postData[1].branch_content);
							$("#E3ques3").hide();
						}
						else {
							$("#E3ques1_text").html(postData[0].branch_content);
							$("#E3ques2_text").html(postData[1].branch_content);
							$("#E3ques3_text").html(postData[2].branch_content);
						}
						break;

				}
				break;
			case "failed":
				alert("data not pull out from sql");
				break;
		}
	}, "json").done(function () {
		$("#mapload").addClass('all_dis');
		setTimeout(function () { $("#mapload").hide(); }, 1000);
		setTimeout(function () { $("#map_conent").addClass('all_show') }, 3000);
	});
}
