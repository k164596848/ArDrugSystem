var dashboardlistvalue = localStorage.getItem("dashboardlist");

var modulesFunction = {
    ui: function(){
    // 	window.fbAsyncInit = function() {
		  //   FB.init({
		  //     appId      : '1842898605826076',
		  //     xfbml      : true,
		  //     version    : 'v2.4'
		  //   });
		  // };

		  // (function(d, s, id){
		  //    var js, fjs = d.getElementsByTagName(s)[0];
		  //    if (d.getElementById(id)) {return;}
		  //    js = d.createElement(s); js.id = id;
		  //    js.src = "//connect.facebook.net/en_US/sdk.js";
		  //    fjs.parentNode.insertBefore(js, fjs);
		  //  }(document, 'script', 'facebook-jssdk'));
		  window.fbAsyncInit = function() {
		    FB.init({
		      appId      : '1842898605826076',
		      cookie     : true,
		      xfbml      : true,
		      version    : 'v2.8'
		    });
		      
		    FB.AppEvents.logPageView();   
		      
		  };

		  (function(d, s, id){
		     var js, fjs = d.getElementsByTagName(s)[0];
		     if (d.getElementById(id)) {return;}
		     js = d.createElement(s); js.id = id;
		     js.src = "https://connect.facebook.net/en_US/sdk.js";
		     fjs.parentNode.insertBefore(js, fjs);
		   }(document, 'script', 'facebook-jssdk'));
		  
		$("#FBShareBt").click(function(event) {
			modulesFunction.shareFB($("#link").val(),$("#caption").val(),$("#description").val());
		});
    },
    shareFB:function(link,caption,description){

    	FB.ui({
	  // method: 'share',
	  // href: 'https://www.nutc.edu.tw/',
	  // caption: 'Testing',
	  // app_id: '1842898605826076',
	  // method: 'feed',
	  // link: 'https://www.nutc.edu.tw/',
	  // caption: '九年學校',
	  // description: '看過大起也經歷過大落，面對黑暗我們都有自己的態度，究竟最能代表你的經典語錄是哪一句話？還不點進來看看',
	  method: 'share_open_graph',
	    action_type: 'og.shares',
	    action_properties: JSON.stringify({
	        object : {
	           'og:url': 'https://www.nutc.edu.tw/',
	           'og:title': '九年學校',
	           'og:description': '看過大起也經歷過大落，面對黑暗我們都有自己的態度，究竟最能代表你的經典語錄是哪一句話？還不點進來看看',
	        }
	    })
	}, function(response){
		console.log(response);
	});
  //   	FB.ui({
		//   method: 'feed',
		//   link: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fappledaily.tw%2Fposts%2F10157181962422069&width=500',
		//   caption: 'Joeman',
		// }, function(response){});
    },
	query:{
		equipments: function(){
			$.post('route/route_event.php?action=equipments', function (data, textStatus, xhr) {
				switch (data.message) {
					case "failed":
						liststr = "<tr><td colspan='3'>無相關資料</td></tr>";
						$("#dashboardlisttb").html(liststr);
						break;
					case "success":
						postData=data.data;
						for (var i in postData) {
							liststr += "<tr>";
							liststr += "<td><img src='"+ urlstr +postData[i].image.toString()+"' alt='"+postData[i].equiplabel+"' class='img-thumbnail'></td>";
							liststr += "<td>"+postData[i].equiplabel+"</td>";
							liststr += "<td>"+postData[i].equip_id+"</td>";
							liststr += "</tr>";
						}
						$("#dashboardlisttb").html(liststr);                   
						break;
				}
			}, "json");
		}
	}    
};

// $(function(){
    modulesFunction.ui();
// })