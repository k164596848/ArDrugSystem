var common_init = function(){
    $.get("Views/meta", function(data) {
        $("head").prepend(data);

        $.get("Views/body", function(data) {
            // $("body").addClass('container');
            $("body").append(data);
            
          });
      });
    
};

/*處理第二層顯示。參數為第一層之編號 */
// var changeTwoItems = function(topItem,topItemTitle){
//     switch (topItem){
//         case 0:
//             var itemTitleHtml="",loopEnd=itemsName[topItem];
//             for (var i in loopEnd){
//                 itemTitleHtml+='<a href="#" class="list-group-item" id="websiteAboutPage' + (parseInt(i)+1) + '">'+ loopEnd[i] + '</a>';
//             }
//             $("#twoPanel").html(itemTitleHtml);//顯示第二層選項名稱
//             $("#twoPanelTitle").text(topItemTitle);//顯示第二層標題
//             getwebsiteAboutPage1();
//             break;
//         case 1: //最新消息
//             var itemTitleHtml = "", loopEnd = itemsName[topItem];
//             for (var i in loopEnd) {
//                 itemTitleHtml += '<a href="#" class="list-group-item" id="news">' + loopEnd[i] + '</a>';
//             }
//             $("#twoPanel").html(itemTitleHtml);//顯示第二層選項名稱
//             $("#twoPanelTitle").text(topItemTitle);
//             localStorage.setItem("barType", "news");
//             $.get("Home/news", function(data) {
//                 $("#content-wrapper").html(data);
//             });
//             break;
//         case 2: //行政公告區
//             var itemTitleHtml = "", loopEnd = itemsName[topItem];
//             for (var i in loopEnd) {
//                 itemTitleHtml += '<a href="#" class="list-group-item" id="notice">' + loopEnd[i] + '</a>';
//             }
//             $("#twoPanel").html(itemTitleHtml);//顯示第二層選項名稱
//             $("#twoPanelTitle").text(topItemTitle);
//             localStorage.setItem("barType", "notice");
//             $.get("Home/notice", function(data) {
//                 $("#content-wrapper").html(data);
//             });
//             break;
//         case 3: //活動花絮
//             var itemTitleHtml = "", loopEnd = itemsName[topItem];
//             for (var i in loopEnd) {
//                 itemTitleHtml += '<a href="#" class="list-group-item" id="highlight">' + loopEnd[i] + '</a>';
//             }
//             $("#twoPanel").html(itemTitleHtml);//顯示第二層選項名稱
//             $("#twoPanelTitle").text(topItemTitle);
//             localStorage.setItem("barType", "highlight");
//             $.get("Home/highlight", function(data) {
//                 $("#content-wrapper").html(data);
//             });
//             break;
//         /*case 5:
//             var itemTitleHtml="",loopEnd=itemsName[topItem];
//             for (var i in loopEnd){
//                 itemTitleHtml+='<a href="#" class="list-group-item">'+loopEnd[i]+'</a>'
//             }
//             $("#twoPanel").html(itemTitleHtml);
//             $("#twoPanelTitle").text(topItemTitle);
//             break;*/
//         default:
//             if (topItemTitle=="登入") break;
//             $("#twoPanel").html("");
//             $("#twoPanelTitle").text(topItemTitle);
//             break;
//     }
// }
$(function(){
    common_init();
});