
var modules = {
  ui: function(){
      gotolist();
	  role_addOption(1);
	  background_addOption(1);
      $("img.lazyload").lazyload();
      // 關閉modal，清空表單內容
      $('#addpClassModal').on('hidden.bs.modal', function (event) {
		  
          $("#addpClassForm")[0].reset();
          $("#addpClassForm").validator('destroy');
		  $('#quest_content').show();
		  //$('#titleform').show();
		  
      });
      $('#editclassModal').on('hidden.bs.modal', function (event) {
          $("#editClassForm")[0].reset();
          $("#editClassForm").validator('destroy');
      });
	 
      $("#addpclassBT").click(function(event) {
        add_p_class();
      });
	 
	 $('input[type=radio][name=group]').change(function() {
		 var radio_value = this.value;
		 if(radio_value == '4'){
			 $('#quest_content').hide(500);
		 }else{
			 $('#quest_content').show(500);
		 }
	 });
	  
	  $('input[type=radio][name=ed_group]').change(function() {
		 var radio_value = this.value;
		 if(radio_value == '4'){
			 $('#ed_quest_content').hide(500);
		 }else{
			 $('#ed_quest_content').show(500);
		 }
	 });
	  
	  
      $("#editclassBT").click(function(event) {
        saveEvent();
      });
	  
	  
  }
};
var n=1; //新增file id name 使用
$("#addfile").click(function() {  //按了加的按鈕就新增題目 //新增類
	n +=1;

	str="";
	str+="<div class='row marginTop-20 addfile' id='addfile"+n+"'>"
	str+="<div class='col-md-2'>"
	str+="	<select id='rpg_background"+n+"' name='rpg_background"+n+"'>";
	str+="	<option value='0'>請選擇</option>";
	str+="	</select>";
	str+="</div>";
	str+="<div class='col-md-2'>";
	str+="	<select id='rpg_role"+n+"' name='rpg_role"+n+"'>";
	str+="	<option value='0'>請選擇</option>";
	str+="</select>";
	str+="</div>";
	str+="<div class='col-md-7'>";
	str+="	<input type='text' class='form-control' id='rpg_content"+n+"' name='rpg_content"+n+"' placeholder='請輸入對話內容"+n+"'>";
	str+="</div>";
	
	
	str+="<div class='col-md-1'>"
	if(n==2) str+="<span class='fa fa-2x fa-minus' onclick='delfile("+n+")'></span>"
	str+="</div>"
	str+="</div>"
	
	$("#quest_title").append(str);
	role_addOption(n);
	background_addOption(n);
     
});
function delfile(deln) { //刪除測驗題目 //新增類
    $("#addfile"+n).remove();  //從最後新增的先刪除
    n-=1;
}

var j=1; //新增file id name 使用
$("#addoption").click(function() {  //按了加的按鈕就新增選項 //新增類
	j +=1;

	str="";
	str+="<div class='row marginTop-20 addoption' id='addoption"+j+"'>"
	
	
	str+="<div class='col-md-6'>";
	str+="	<input type='text' class='form-control' id='rpg_option"+j+"' name='rpg_option"+j+"' placeholder='請輸入選項內容"+j+"'>";
	str+="</div>";
	str+="<div class='col-md-3'>";
	str+="	<input type='text' class='form-control' id='rpg_attr"+j+"' name='rpg_attr"+j+"' placeholder='請輸入加成屬性"+j+"'>";
	str+="</div>";
	str+="<div class='col-md-2'>";
	str+="	<input type='text' class='form-control' id='rpg_next"+j+"' name='rpg_next"+j+"' placeholder='通往下一題'>";
	str+="</div>";
	
	
	str+="<div class='col-md-1'>"
	if(j==2) str+="<span class='fa fa-2x fa-minus' onclick='deloption("+j+")'></span>"
	str+="</div>"
	str+="</div>"
	
	$("#option_content").append(str);
     
});
function deloption(deln) { //刪除測驗選項 //新增類
    $("#addoption"+j).remove();  //從最後新增的先刪除
    j-=1;
}


function add_p_class(){//按下送出 //新增類
	$("#Total_file").attr("value",n); 
	$("#Total_option").attr("value",j); 
	/*var a = document.getElementById('Total_file').value;
	var b = document.getElementById('Total_option').value;
	alert(a+' '+b);*/
	
            $.ajax({
                type: 'POST',
                url: 'route/controller.php?action=add_quest',
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
                            title: "測驗內容新增失敗！",
                            text: "Oh...NO!"+data.responseJSON.errmsg,
                            icon: "error",
                            default: true
                        });
                    break;
                    case "success": 
                      swal({
                            title: "測驗內容新增完成!",
                            text: "Good Job!"+data.responseJSON.errmsg,
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


function role_addOption(z){ //獲取角色select 選項 //新增類
    $.post('route/controller.php?action=rolelist', function(data, textStatus, xhr) {
		postData=data.data;
            switch(data.message){
              case "failed":
               swal({
                    title: "角色載入失敗！",
                    text: "Oh...NO!"+data.errmsg,
                    icon: "error",
                    default: true
                });
              break;
              case "success":   
                var role=document.getElementById('rpg_role'+z); 
                 for(var i =0;i<postData.length;i++){
					 role.options.add(new Option(postData[i].name,postData[i].code+'%'+postData[i].name)); //這個兼容IE與firefox 
				 }
				 
              break;
              default:
              break;
            }
      },"json");

} 

function background_addOption(z){ //獲取場景select 選項  //新增類
    $.post('route/controller.php?action=bglist', function(data, textStatus, xhr) {
		postData=data.data;
            switch(data.message){
              case "failed":
               swal({
                    title: "場景載入失敗！",
                    text: "Oh...NO!"+data.errmsg,
                    icon: "error",
                    default: true
                });
              break;
              case "success":   
                var back=document.getElementById('rpg_background'+z); 
                 for(var i =0;i<postData.length;i++){
					 back.options.add(new Option(postData[i].name,postData[i].code)); //這個兼容IE與firefox 
				 }
              break;
              default:
              break;
            }
      },"json");

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
            "sAjaxSource": "route/controller.php?action=quest_list",
            "aoColumns": [
				{ "mData": "qnum","sWidth": '15%'},
                { "mData": "c_group","sWidth": '15%'},
				{ "mData": "group_con",
                    "mRender":function(val,type,row){
						var str="";
						var words1 = val.split('-');
						if(words1[0]=='4'){
							/*var words = words1[1].split('#');
							for(var i =0;i<words.length;i++){
							str = str+ words1[1].split('#')[i].split('$')[1] + '<br>';
							}*/
							str = val.split('=')[1];
						}else{
						var words = words1[1].split('#');
						for(var i =0;i<words.length;i++){
							str = str+ words1[1].split('#')[i].split('$')[1] + '<br>';
						}
						}
                        return str
                    }
                },
                { "mData": "qnum" ,"sWidth": '12%',
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




function ed_role_addOption(z,role1){ //獲取角色select 選項 //按下修改按鈕類
  $("#ed_rpg_role"+z).empty();
    $.post('route/controller.php?action=rolelist', function(data, textStatus, xhr) {
		postData=data.data;
            switch(data.message){
              case "failed":
               swal({
                    title: "角色載入失敗！",
                    text: "Oh...NO!"+data.errmsg,
                    icon: "error",
                    default: true
                });
              break;
              case "success":   
                var role=document.getElementById('ed_rpg_role'+z); 
				role.options.add(new Option("請選擇","0%"));
                 for(var i =0;i<postData.length;i++){
					 role.options.add(new Option(postData[i].name,postData[i].code+'%'+postData[i].name)); //這個兼容IE與firefox 
				 }
				 select_role_option(z,role1);
              break;
              default:
              break;
            }
      },"json");

} 

function ed_background_addOption(z,back1){ //獲取場景select 選項 //按下修改按鈕類
$("#ed_rpg_background"+z).empty();
    $.post('route/controller.php?action=bglist', function(data, textStatus, xhr) {
		postData=data.data;
            switch(data.message){
              case "failed":
               swal({
                    title: "場景載入失敗！",
                    text: "Oh...NO!"+data.errmsg,
                    icon: "error",
                    default: true
                });
              break;
              case "success":   
                var back=document.getElementById('ed_rpg_background'+z); 
				back.options.add(new Option("請選擇","0"));
                 for(var i =0;i<postData.length;i++){
					 back.options.add(new Option(postData[i].name,postData[i].code)); //這個兼容IE與firefox 
				 }
				 select_back_option(z,back1);
              break;
              default:
              break;
            }
      },"json");

} 


function ed_role_addOption2(z){ //獲取角色select 選項 //修改時按下+號
    $.post('route/controller.php?action=rolelist', function(data, textStatus, xhr) {
		postData=data.data;
            switch(data.message){
              case "failed":
               swal({
                    title: "角色載入失敗！",
                    text: "Oh...NO!"+data.errmsg,
                    icon: "error",
                    default: true
                });
              break;
              case "success":   
                var role=document.getElementById('ed_rpg_role'+z); 
                 for(var i =0;i<postData.length;i++){
					 role.options.add(new Option(postData[i].name,postData[i].code+'%'+postData[i].name)); //這個兼容IE與firefox 
				 }
				 
              break;
              default:
              break;
            }
      },"json");

} 

function ed_background_addOption2(z){ //獲取場景select 選項 //修改時按下+號
    $.post('route/controller.php?action=bglist', function(data, textStatus, xhr) {
		postData=data.data;
            switch(data.message){
              case "failed":
               swal({
                    title: "場景載入失敗！",
                    text: "Oh...NO!"+data.errmsg,
                    icon: "error",
                    default: true
                });
              break;
              case "success":   
                var back=document.getElementById('ed_rpg_background'+z); 
                 for(var i =0;i<postData.length;i++){
					 back.options.add(new Option(postData[i].name,postData[i].code)); //這個兼容IE與firefox 
				 }
              break;
              default:
              break;
            }
      },"json");

} 

//按下修改
$("#ed_file").click(function() {  //按了加的按鈕就新增題目 
	x+=1;
	str="";
	str+="<div class='row marginTop-20 ed_file' id='ed_file"+x+"'>"
	str+="<div class='col-md-2'>"
	str+="	<select id='ed_rpg_background"+x+"' name='ed_rpg_background"+x+"'>";
	str+="	<option value='0'>請選擇</option>";
	str+="	</select>";
	str+="</div>";
	str+="<div class='col-md-2'>";
	str+="	<select id='ed_rpg_role"+x+"' name='ed_rpg_role"+x+"'>";
	str+="	<option value='0%'>請選擇</option>";
	str+="</select>";
	str+="</div>";
	str+="<div class='col-md-7'>";
	str+="	<input type='text' class='form-control' id='ed_rpg_content"+x+"' name='ed_rpg_content"+x+"' placeholder='請輸入對話內容"+x+"'>";
	str+="</div>";
	
	
	str+="<div class='col-md-1'>"
	if(x==2) str+="<span class='fa fa-2x fa-minus' onclick='ed_delfile("+x+")'></span>"
	str+="</div>"
	str+="</div>"
	
	
	//alert(x);
	$("#ed_empty").append(str);
	$("#ed_Total_file").attr("value",x); 
	ed_role_addOption2(x);
	ed_background_addOption2(x);
     
});

$("#ed_option").click(function() {  //按了加的按鈕就新增選項
	c +=1;

	str="";
	str+="<div class='row marginTop-20 ed_option' id='ed_option"+c+"'>"
	
	
	str+="<div class='col-md-6'>";
	str+="	<input type='text' class='form-control' id='ed_rpg_option"+c+"' name='ed_rpg_option"+c+"' placeholder='請輸入選項內容"+c+"'>";
	str+="</div>";
	str+="<div class='col-md-3'>";
	str+="	<input type='text' class='form-control' id='ed_rpg_attr"+c+"' name='ed_rpg_attr"+c+"' placeholder='請輸入加成屬性"+c+"'>";
	str+="</div>";
	str+="<div class='col-md-2'>";
	str+="	<input type='text' class='form-control' id='ed_rpg_next"+c+"' name='ed_rpg_next"+c+"' placeholder='通往下一題'>";
	str+="</div>";
	
	
	str+="<div class='col-md-1'>"
	if(c==2) str+="<span class='fa fa-2x fa-minus' onclick='ed_deloption("+c+")'></span>"
	str+="</div>"
	str+="</div>"
	
	$("#edoption_empty").append(str);
     $("#ed_Total_option").attr("value",c);
});


function loadEvent(_id){  //按下修改按鈕  
	//alert(_id);
	$('#ed_empty').empty();
	$('#edoption_empty').empty();
	$("#editClassForm")[0].reset();
    $("#editclassBT").button('loading');
	var group_num = "";
  var dataAry = {
      ser:_id
    };
    $.post('route/controller.php?action=loadquest', dataAry, function(data, textStatus, xhr) {
            postData=data.data;
			
            switch(data.message){
              case "failed":
//                alert(data.errmsg);
                swal({
                    title: "測驗題目載入失敗！",
                    text: "Oh...NO!"+data.errmsg,
                    icon: "error",
                    default: true
                });
              break;
              case "success":  
			  $("input[name*='ed_group'][value='"+postData[0].c_group+"']").prop("checked", true);
			  $("#ed_rpg_qnum").val(postData[0].qnum);
			  group_num = postData[0].c_group;
					var str="";
					var words = postData[0].content.split('#');
					if(postData[0].c_group =='4'){
						c = 1;
						/*for(var i =0;i<words.length;i++){ //共分幾句
						if(i==0){
							var j = i+1;
									var role_val = postData[0].content.split('=')[1].split('#')[i].split('$')[0]; //C
									$("#ed_rpg_content"+j).val(postData[0].content.split('=')[1].split('#')[i].split('$')[1]);
									ed_role_addOption(j,role_val);
									//觸發函式ed_role_addOption 傳送 第幾句 人 
						}
						else{
							var j = i+1;
							str1="";
							str1+="<div class='row marginTop-20 ed_file' id='ed_file"+j+"'>"
							str1+="<div class='col-md-2'>"
							str1+="	<select id='ed_rpg_background"+j+"' name='ed_rpg_background"+j+"'>";
							str1+="	<option value='0'>請選擇</option>";
							str1+="	</select>";
							str1+="</div>";
							str1+="<div class='col-md-2'>";
							str1+="	<select id='ed_rpg_role"+j+"' name='ed_rpg_role"+j+"'>";
							str1+="	<option value='0%'>請選擇</option>";
							str1+="</select>";
							str1+="</div>";
							str1+="<div class='col-md-7'>";
							str1+="	<input type='text' class='form-control' id='ed_rpg_content"+j+"' name='ed_rpg_content"+j+"' placeholder='請輸入對話內容"+j+"'>";
							str1+="</div>";
							str1+="<div class='col-md-1'>"
							if(j==2) str1+="<span class='fa fa-2x fa-minus' onclick='ed_delfile("+j+")'></span>"
							str1+="</div>"
							str1+="</div>"
							
							$("#ed_empty").append(str1);
							//先加一行在加選項 剩下都一樣
									var role_val = postData[0].content.split('=')[1].split('#')[i].split('$')[0];
									$("#ed_rpg_content"+j).val(postData[0].content.split('=')[1].split('#')[i].split('$')[1]);
									ed_role_addOption(j,role_val);
									//觸發函式ed_role_addOption 傳送 第幾句 人 
						}
						//str = str+ postData[0].content.split('#')[i].split('%')[1] + '<br>';
					}*/
					$("#ed_rpg_content1").val(postData[0].content.split('=')[1]);
					$('#ed_quest_content').hide();
					
						
					}else{
					for(var i =0;i<words.length;i++){ //共分幾句
						if(i==0){
							var j = i+1;
								if(postData[0].content.split('#')[i].split('@').length == 1){ //沒場景
									var role_val = postData[0].content.split('#')[i].split('@')[0].split('$')[0];
									$("#ed_rpg_content"+j).val(postData[0].content.split('#')[i].split('@')[0].split('$')[1]);
									ed_role_addOption(j,role_val);
									ed_background_addOption(j,'0');
									//觸發函式ed_role_addOption 傳送 第幾句 人 
								}else if(postData[0].content.split('#')[i].split('@').length == 2){
									//@的陣列0 拿去放back 在處理角色
									var back_val = postData[0].content.split('#')[i].split('@')[0];//背景
									var role_val = postData[0].content.split('#')[i].split('@')[1].split('$')[0];//人物
									$("#ed_rpg_content"+j).val(postData[0].content.split('#')[i].split('@')[1].split('$')[1]);
									//alert(back_val+'  '+role_val);
									ed_role_addOption(j,role_val);
									ed_background_addOption(j,back_val);
									//觸發函式ed_background_addOption 傳送 第幾句 場景 人 
								}
						}
						else{
							var j = i+1;
							str1="";
							str1+="<div class='row marginTop-20 ed_file' id='ed_file"+j+"'>"
							str1+="<div class='col-md-2'>"
							str1+="	<select id='ed_rpg_background"+j+"' name='ed_rpg_background"+j+"'>";
							str1+="	<option value='0'>請選擇</option>";
							str1+="	</select>";
							str1+="</div>";
							str1+="<div class='col-md-2'>";
							str1+="	<select id='ed_rpg_role"+j+"' name='ed_rpg_role"+j+"'>";
							str1+="	<option value='0%'>請選擇</option>";
							str1+="</select>";
							str1+="</div>";
							str1+="<div class='col-md-7'>";
							str1+="	<input type='text' class='form-control' id='ed_rpg_content"+j+"' name='ed_rpg_content"+j+"' placeholder='請輸入對話內容"+j+"'>";
							str1+="</div>";
							str1+="<div class='col-md-1'>"
							if(j==2) str1+="<span class='fa fa-2x fa-minus' onclick='ed_delfile("+j+")'></span>"
							str1+="</div>"
							str1+="</div>"
							
							$("#ed_empty").append(str1);
							//先加一行在加選項 剩下都一樣
							if(postData[0].content.split('#')[i].split('@').length == 1){
									var role_val = postData[0].content.split('#')[i].split('@')[0].split('$')[0];
									$("#ed_rpg_content"+j).val(postData[0].content.split('#')[i].split('@')[0].split('$')[1]);
									ed_role_addOption(j,role_val);
									ed_background_addOption(j,'0');
									//觸發函式ed_role_addOption 傳送 第幾句 人 
								}else if(postData[0].content.split('#')[i].split('@').length == 2){
									//@的陣列0 拿去放back 在處理角色
									var back_val = postData[0].content.split('#')[i].split('@')[0];//背景
									var role_val = postData[0].content.split('#')[i].split('@')[1].split('$')[0];//人物
									$("#ed_rpg_content"+j).val(postData[0].content.split('#')[i].split('@')[1].split('$')[1]);
									//alert(back_val+'  '+role_val);
									ed_role_addOption(j,role_val);
									ed_background_addOption(j,back_val);
									//觸發函式ed_background_addOption 傳送 第幾句 場景 人 
								}
							
							
						}
						//str = str+ postData[0].content.split('#')[i].split('%')[1] + '<br>';
					}
					
						 $.post('route/controller.php?action=loadoption', dataAry, function(data, textStatus, xhr) {
							postData=data.data;
							
							switch(data.message){
							  case "failed":
				//                alert(data.errmsg);
								swal({
									title: "選項載入失敗！",
									text: "Oh...NO!"+data.errmsg,
									icon: "error",
									default: true
								});
							  break;
							  case "success":  
							  c = postData.length;
							  $("#ed_Total_option").val(postData.length);
							  for(var i =0;i<postData.length;i++){
								if(i == 0){
									var j = i+1;
									$("#ed_rpg_option"+j).val(postData[i].content);
									$("#ed_rpg_attr"+j).val(postData[i].attribute);
									$("#ed_rpg_next"+j).val(postData[i].nextquest);
								}else{
									var j = i+1;
									str="";
									str+="<div class='row marginTop-20 ed_option' id='ed_option"+j+"'>"
									
									
									str+="<div class='col-md-6'>";
									str+="	<input type='text' class='form-control' id='ed_rpg_option"+j+"' name='ed_rpg_option"+j+"' placeholder='請輸入選項內容"+j+"'>";
									str+="</div>";
									str+="<div class='col-md-3'>";
									str+="	<input type='text' class='form-control' id='ed_rpg_attr"+j+"' name='ed_rpg_attr"+j+"' placeholder='請輸入加成屬性"+j+"'>";
									str+="</div>";
									str+="<div class='col-md-2'>";
									str+="	<input type='text' class='form-control' id='ed_rpg_next"+j+"' name='ed_rpg_next"+j+"' placeholder='通往下一題'>";
									str+="</div>";
									
									
									str+="<div class='col-md-1'>"
									if(j==2) str+="<span class='fa fa-2x fa-minus' onclick='ed_deloption("+j+")'></span>"
									str+="</div>"
									str+="</div>"
									
									$("#edoption_empty").append(str);
									$("#ed_rpg_option"+j).val(postData[i].content);
									$("#ed_rpg_attr"+j).val(postData[i].attribute);
									$("#ed_rpg_next"+j).val(postData[i].nextquest);
								}
								
							  }
							  break;
							  default:
							  break;
							}
					  },"json");
					
					}
			  $("#ed_Total_file").val(words.length);
			  $("#ed_ser").val(_id);
			  x = words.length;
				/*$("#ed_bg_code").val(postData[0].content);
				$("#ed_preview_a_source").attr("src",postData[0].background);
				$("#bg_ser").val(_id);*/
              break;
              default:
              break;
            }
      },"json").done(function() {
		$("#editclassBT").button('reset');
	  });
	  
	  
}

function ed_delfile(deln) { //刪除上傳檔案
    $("#ed_file"+x).remove();  //從最後新增的先刪除
    x-=1;
	$("#ed_Total_file").attr("value",x); 
}


function ed_deloption(deln) { //刪除上傳檔案
    $("#ed_option"+c).remove();  //從最後新增的先刪除
    c-=1;
	$("#ed_Total_option").attr("value",c);
}

function select_role_option(i,role_val){ //如果有角色則選取起來 //按下修改按鈕類
	if(i){
	$('select[name="ed_rpg_role'+i+'"]').val(role_val);
	}
}

function select_back_option(i,back_val){//如果有場景則選取起來 //按下修改按鈕類
	if(i){
	$('select[name="ed_rpg_background'+i+'"]').val(back_val);
	}
}

//按下送出修改
function saveEvent(){
	//alert(document.getElementById('ed_Total_option').value + '  ' + document.getElementById('ed_Total_file').value)
	
	  $.ajax({
			type: 'POST',
			url: 'route/controller.php?action=editquest',
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
						title: "測驗修改失敗！",
						text: "Oh...NO!"+data.responseJSON.errmsg,
						icon: "error",
						default: true
					}).then((value) => {                            
						$("#editClassForm")[0].reset();

					});
				break;
				case "success": 
				  swal({
						title: "測驗修改完成!",
						text: "Good Job!"+data.responseJSON.errmsg,
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
function deleteEvent(_id){
  if(confirm("確定要刪除嗎?不能後悔喔!"))
  {
    var dataAry = {
      ser:_id,
    };
    $.post('route/controller.php?action=deletequest', dataAry, function(data, textStatus, xhr) {
            switch(data.message){
              case "failed":
                swal({
                    title: "測驗刪除失敗！",
                    text: "Oh...NO!"+data.errmsg,
                    icon: "error",
                    default: true
                }).then((value) => {                            
                    gotolist(); 

                });
              break;
              case "success":   
                swal({
                    title: "測驗刪除完成!",
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



$(function(){

    modules.ui();
    
})

