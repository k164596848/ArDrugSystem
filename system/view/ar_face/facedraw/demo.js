"use strict";

// some globalz :
var THREECAMERA;

// callback : launched if a face is detected or lost. TODO : add a cool particle effect WoW !
function detect_callback(isDetected) {
  if (isDetected) {
    console.log('INFO in detect_callback() : DETECTED');
  } else {
    console.log('INFO in detect_callback() : LOST');
  }
}

// build the 3D. called once when Jeeliz Face Filter is OK
function init_threeScene(spec) {
  const threeStuffs = THREE.JeelizHelper.init(spec, detect_callback);

  // Add our face model
  const loader = new THREE.BufferGeometryLoader();

  loader.load(
    'models/football_makeup/face.json',
    (geometry) => {
      const mat = new THREE.MeshBasicMaterial({
        // DEBUG: uncomment color, comment map and alphaMap
        // color: 0xFF0000,
        map: new THREE.TextureLoader().load('models/football_makeup/texture2.png'),
        transparent: true,
        opacity: 0.6
      });

      const faceMesh = new THREE.Mesh(geometry, mat);
      faceMesh.position.y += 0.15;
      faceMesh.position.z -= 0.25;

      addDragEventListener(faceMesh);

      threeStuffs.faceObject.add(faceMesh);
    }
  )

  // CREATE THE VIDEO BACKGROUND
  function create_mat2d(threeTexture, isTransparent){ //MT216 : we put the creation of the video material in a func because we will also use it for the frame
    return new THREE.RawShaderMaterial({
      depthWrite: false,
      depthTest: false,
      transparent: isTransparent,
      vertexShader: "attribute vec2 position;\n\
        varying vec2 vUV;\n\
        void main(void){\n\
          gl_Position=vec4(position, 0., 1.);\n\
          vUV=0.5+0.5*position;\n\
        }",
      fragmentShader: "precision lowp float;\n\
        uniform sampler2D samplerVideo;\n\
        varying vec2 vUV;\n\
        void main(void){\n\
          gl_FragColor=texture2D(samplerVideo, vUV);\n\
        }",
       uniforms:{
        samplerVideo: { value: threeTexture }
       }
    });
  }

  //MT216 : create the frame. We reuse the geometry of the video
  const calqueMesh = new THREE.Mesh(threeStuffs.videoMesh.geometry,  create_mat2d(new THREE.TextureLoader(), true))
  calqueMesh.renderOrder = 999; // render last
  calqueMesh.frustumCulled = false;
  threeStuffs.scene.add(calqueMesh);

  // CREATE THE CAMERA
  THREECAMERA = THREE.JeelizHelper.create_camera();

  // const threeStuffs = THREE.JeelizHelper.init(spec, detect_callback);

  //CREATE THE MASK
  const maskLoader=new  THREE.BufferGeometryLoader();
  /*
  faceLowPoly.json has been exported from dev/faceLowPoly.blend using THREE.JS blender exporter with Blender v2.76
  */
  maskLoader.load('models/faceLowPoly.json', function(maskBufferGeometry){
    maskBufferGeometry.computeVertexNormals();
    const threeMask = new THREE.Mesh(maskBufferGeometry, build_maskMaterial());
    threeMask.frustumCulled=false;
    threeMask.scale.multiplyScalar(0.8);
    threeMask.position.set(0.6,0.2,-0.5);
    threeStuffs.faceObject.add(threeMask);
  });
  maskLoader.load('models/faceLowPoly.json', function(maskBufferGeometry){
    maskBufferGeometry.computeVertexNormals();
    const threeMask = new THREE.Mesh(maskBufferGeometry, build_maskMaterial());
    threeMask.frustumCulled=false;
    threeMask.scale.multiplyScalar(0.8);
    threeMask.position.set(-0.6,0.2,-0.5);
    threeStuffs.faceObject.add(threeMask);
  });

  //CREATE THE CAMERA
  THREECAMERA = THREE.JeelizHelper.create_camera();
} // end init_threeScene()

function build_maskMaterial(){
  /*
    THIS IS WHERE THE DEFORMATIONS ARE BUILT:
    1) create a tearpoint where the deformation will be located
    2) add a displacement(x, y) to deform the zone around your tearpoint
    3) select a radius: the bigger the radius the bigger the size of the deformed zone
    around your tearpoint will be
  */
  const vertexShaderSource='varying vec2 vUVvideo;\n\
  //deformation 0 parameters :\n\
  const vec2 TEARPOINT0=vec2(0.,-0.5);\n\
  const vec2 DISPLACEMENT0=vec2(0.,0.15);\n\
  const float RADIUS0=0.4;\n\
  //deformation 1 parameters :\n\
  const vec2 TEARPOINT1=vec2(0.25,-0.4);\n\
  const vec2 DISPLACEMENT1=vec2(0.12,-0.07);\n\
  const float RADIUS1=0.3;\n\
  //deformation 2 parameters :\n\
  const vec2 TEARPOINT2=vec2(-0.25,-0.4);\n\
  const vec2 DISPLACEMENT2=vec2(-0.12,-0.07);\n\
  const float RADIUS2=0.3;\n\
  void main() {\n\
    vec3 positionDeformed=position;\n\
    //apply deformation 0\n\
    float deformFactor0=1.-smoothstep(0.0, RADIUS0, distance(TEARPOINT0, position.xy));\n\
    positionDeformed.xy+=deformFactor0*DISPLACEMENT0;\n\
    //apply deformation 1\n\
    float deformFactor1=1.-smoothstep(0.0, RADIUS1, distance(TEARPOINT1, position.xy));\n\
    positionDeformed.xy+=deformFactor1*DISPLACEMENT1;\n\
    //apply deformation 2\n\
    float deformFactor2=1.-smoothstep(0.0, RADIUS2, distance(TEARPOINT2, position.xy));\n\
    positionDeformed.xy+=deformFactor2*DISPLACEMENT2;\n\
    //project deformed point :\n\
    vec4 mvPosition = modelViewMatrix * vec4( positionDeformed, 1.0 );\n\
    vec4 projectedPosition=projectionMatrix * mvPosition;\n\
    gl_Position=projectedPosition;\n\
    //compute UV coordinates on the video texture :\n\
    vec4 mvPosition0 = modelViewMatrix * vec4( position, 1.0 );\n\
    vec4 projectedPosition0=projectionMatrix * mvPosition0;\n\
    vUVvideo=vec2(0.5,0.5)+0.5*projectedPosition0.xy/projectedPosition0.w;\n\
  }';

  const fragmentShaderSource="precision mediump float;\n\
  uniform sampler2D samplerVideo;\n\
  varying vec2 vUVvideo;\n\
  void main() {\n\
    gl_FragColor=texture2D(samplerVideo, vUVvideo);\n\
  }";

  const mat = new THREE.ShaderMaterial({
    vertexShader: vertexShaderSource,
    fragmentShader: fragmentShaderSource,
    uniforms: {
      samplerVideo:{value: THREE.JeelizHelper.get_threeVideoTexture()}
    }
  });
  return mat;
}
//launched by body.onload() :
function main() {
  JeelizResizer.size_canvas({
    canvasId: 'jeeFaceFilterCanvas',
    callback: function(isError, bestVideoSettings){
      init_faceFilter(bestVideoSettings);
    }
  })
} //end main()

function init_faceFilter(videoSettings){
  JEEFACEFILTERAPI.init({
    canvasId: 'jeeFaceFilterCanvas',
    NNCpath: 'jeelizFaceFilter/dist/', // root of NNC.json file
    videoSettings: videoSettings,
    callbackReady: function (errCode, spec) {
      if (errCode) {
        console.log('AN ERROR HAPPENS. SORRY BRO :( . ERR =', errCode);
        return;
      }

      console.log('INFO : JEEFACEFILTERAPI IS READY');
      init_threeScene(spec);
    }, // end callbackReady()

    // called at each render iteration (drawing loop)
    callbackTrack: function (detectState) {
      THREE.JeelizHelper.render(detectState, THREECAMERA);
    } // end callbackTrack()
  }); // end JEEFACEFILTERAPI.init call
} // end main()

