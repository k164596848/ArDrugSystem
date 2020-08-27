<?php

$img = $_GET['img_add'];

echo"
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv='Content-Type' content='text/html; charset=utf-8'>
        <meta http-equiv='content-language' content='en-EN' />
        
        <title>JEELIZ FACE FILTER : CSS3D COMEDY GLASSES DEMO</title>
        
        <!-- INCLUDE JEELIZ FACEFILTER SCRIPT -->
        <script type='text/javascript' src='../../../dist/jeelizFaceFilter.js'></script>

        <!-- INCLUDE MATH PART OF THREE.JS -->
        <script type='text/javascript' src='../../../libs/threejs/matrix/THREEMatrix.js'></script>

        <!-- INCLUDE DEMO SCRIPT -->
        <script type='text/javascript' src='./demo_comedyGlasses.js'></script>

        <!-- INCLUDE FORK ME ON GITHUB BANNER -->
       <!-- <script type='text/javascript' src='../../appearance/widget.js'></script>-->

        <link rel='stylesheet' href='../../appearance/style.css' type='text/css' />

		 
        <style type='text/css'>
        
		#jeelizFaceFilterFollow {
            display: block;
            position: absolute; z-index: 1000;
            background-image: url('../../../../../../../Backstage/".$img."');
            background-size: cover;
            height: 0px; width: 0px;
        } 
		
        .mouthOpened {
            
        }
        .mouthClosed {
            
        }
        #jeeFaceFilterCanvas {
            /* YOU SHOULD KEEP the transform: translateZ(-4000px) and the transform-style: preserve-3d;
            OTHERWISE THE DIV WILL BE BEHIND THE CANVAS WITH IOS
            */
             transform: translateZ(-4000px) translate(-50%, -50%) rotateY(180deg);
             transform-style: preserve-3d;
        }
		
		
		
        </style>

    </head>
    
    <body onload='main()' style='color: white'>
        <canvas width='1000' height='1500' id='jeeFaceFilterCanvas'style='position:absolute;top:325px;left:250px' ></canvas>

        <div id='jeelizFaceFilterFollow'>
            
        </div>
    </body>
</html>";
 
 
 ?>
