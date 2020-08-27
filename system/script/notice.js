
$(function(){
    if (window.orientation === 180 || window.orientation === 0) { //一開始就判斷是否為橫
             $("#all").hide();
             $("#notice_border").removeClass('disapear');
             $("#people").removeClass('disapear');
      }
    window.addEventListener("orientationchange",onOrientationchange ,false);
    function onOrientationchange() {
      if (window.orientation === 180 || window.orientation === 0) { //直的
              $("#all").hide();
               $("#notice_border").removeClass('disapear');
               $("#people").removeClass('disapear');
      }
      if (window.orientation === 90 || window.orientation === -90 ){ //橫的
               $("#all").show();
                $("#notice_border").addClass('disapear');
                $("#people").addClass('disapear');
      } 
   }
             

});



