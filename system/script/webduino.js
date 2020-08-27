webduino_angle();

function webduino_angle(){
	/*var _id = localStorage.getItem('_userid');
	var new_angle
	
	var dataAry = {
      id:_id
    };
	
	$.post('route/controller.php?action=webduino_angle', dataAry,function (data, textStatus, xhr) {

    switch (data.message) {

      case "success":
        postData=data.data;
        
		switch (postData[0].type){
			
			case '適合堅持拒絕法':
			new_angle = 155;
			break;
			case '適合轉移話題法':
			new_angle = 110;
			break;	
			case '適合反激將法':
			new_angle = 55;
			break;
			case '適合遠離現場法':
			new_angle = 0;
			break;
		}
        
         
        break;

      case "failed":
        alert("data not pull out from sql");
        break;
    }
  }, "json");
	*/
	
	var servo;


	boardReady({device: 'aRgRN'}, function (board) {
	  board.samplingInterval = 250;
	  servo = getServo(board, 11);
	  servo.angle = 180;
	});

	
}