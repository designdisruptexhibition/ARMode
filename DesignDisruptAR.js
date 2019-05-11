
//////////////////////////////////////////////////////////////////////////////////
//		Global Variables
//////////////////////////////////////////////////////////////////////////////////

	var renderer, render, scene, camera;
	var arToolkitContext;
	var arToolkitSource;
	var props;

	var material = new THREE.MeshNormalMaterial({transparent: true, opacity: 0.6});

	var jwGroup;
	var jpGroup;

//////////////////////////////////////////////////////////////////////////////////
//		Render Setup
//////////////////////////////////////////////////////////////////////////////////
function init(){

	// Delay rendering until all files have loaded
	THREE.DefaultLoadingManager.onLoad = function ( ) {
		render();
		console.log("ready to render");
	};

	// Create a WebGL renderer and add prefernces
	renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

	// Set the size of the renderers to the inner width and inner height of the window
	renderer.setSize( window.innerWidth, window.innerHeight );

	// Add in the created DOM elements to the body of the document
	document.body.appendChild( renderer.domElement );

//////////////////////////////////////////////////////////////////////////////////
//		Initialize a basic scene, camera and light
//////////////////////////////////////////////////////////////////////////////////

	// Create a scene
	scene	= new THREE.Scene();

	// Create a camera and add it to the scene
	camera = new THREE.Camera();
	scene.add(camera);

	// Creat a soft white light and add it to the scene
	var light = new THREE.AmbientLight( 0x404040, 5 );
	scene.add( light );

	// var light = new THREE.PointLight( 0x404040, 15, 100 );
	// light.position.set( 50, 50, 50 );
	// scene.add( light );

//////////////////////////////////////////////////////////////////////////////////
//		Setup AR Source (Webcam)
//////////////////////////////////////////////////////////////////////////////////

	// Initialise Webcam
	arToolkitSource = new THREEx.ArToolkitSource({
		sourceType : 'webcam',
	})

	// Setup resize events
	arToolkitSource.init(function onReady(){
		onResize()
	})

	// Handle resize
	window.addEventListener('resize', function(){
		onResize()
	})
	function onResize(){
		arToolkitSource.onResizeElement()
		arToolkitSource.copyElementSizeTo(renderer.domElement)
		if( arToolkitContext.arController !== null ){
			arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
		}
	}

////////////////////////////////////////////////////////////////////////////////
//    Initialize AR Context (Camera and projection settings)
////////////////////////////////////////////////////////////////////////////////

	// create atToolkitContext
	arToolkitContext = new THREEx.ArToolkitContext({
		cameraParametersUrl: 'data/camera_para.dat',
		detectionMode: 'mono',
	})

	// initialize it
	arToolkitContext.init(function onCompleted(){
		// Copy projection matrix to camera
		camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
	})

////////////////////////////////////////////////////////////////////////////////
//     Create AR Controls (Markers)
////////////////////////////////////////////////////////////////////////////////

	//JW Marker
		//Create a group for all objects for this particular marker
		jwGroup = new THREE.Group
		scene.add(jwGroup)

		// Declare which marker is to be detected
		var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, jwGroup, {
			type : 'pattern',
			patternUrl : 'data/JW.patt',
		})

	// JP Marker
		// jpGroup = new THREE.Group
		// scene.add(jpGroup)
    //
		// var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, jpGroup, {
		// 	type : 'pattern',
		// 	patternUrl : 'data/JP.patt',
		// })
  //
	// // AY Marker
	// 	var ayGroup = new THREE.Group
	// 	scene.add(ayGroup)
  //
	// 	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, ayGroup, {
	// 		type : 'pattern',
	// 		patternUrl : 'data/AY.patt',
	// 	})
  //
	// // BL Marker
	// 	var blGroup = new THREE.Group
	// 	scene.add(blGroup)
  //
	// 	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, blGroup, {
	// 		type : 'pattern',
	// 		patternUrl : 'data/BL.patt',
	// 	})
  //
	// // DJ Marker
	// 	var djGroup = new THREE.Group
	// 	scene.add(djGroup)
  //
	// 	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, djGroup, {
	// 		type : 'pattern',
	// 		patternUrl : 'data/DJ.patt',
	// 	})
  //
	// // DZ Marker
	// 	var dzGroup = new THREE.Group
	// 	scene.add(dzGroup)
  //
	// 	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, dzGroup, {
	// 		type : 'pattern',
	// 		patternUrl : 'data/DZ.patt',
	// 	})
  //
	// // EL Marker
	// 	var elGroup = new THREE.Group
	// 	scene.add(elGroup)
  //
	// 	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, elGroup, {
	// 		type : 'pattern',
	// 		patternUrl : 'data/EL.patt',
	// 	})
  //
	// // ES Marker
	// 	var esGroup = new THREE.Group
	// 	scene.add(esGroup)
  //
	// 	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, esGroup, {
	// 		type : 'pattern',
	// 		patternUrl : 'data/ES.patt',
	// 	})
  //
	// // JH Marker
	// 	var jhGroup = new THREE.Group
	// 	scene.add(jhGroup)
  //
	// 	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, jhGroup, {
	// 		type : 'pattern',
	// 		patternUrl : 'data/JH.patt',
	// 	})
  //
	// // KA Marker
	// 	var kaGroup = new THREE.Group
	// 	scene.add(kaGroup)
  //
	// 	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, kaGroup, {
	// 		type : 'pattern',
	// 		patternUrl : 'data/KA.patt',
	// 	})
  //
	// // KB Marker
	// 	var kbGroup = new THREE.Group
	// 	scene.add(kbGroup)
  //
	// 	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, kbGroup, {
	// 		type : 'pattern',
	// 		patternUrl : 'data/KB.patt',
	// 	})
  //
	// // LZ Marker
	// 	var lzGroup = new THREE.Group
	// 	scene.add(lzGroup)
  //
	// 	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, lzGroup, {
	// 		type : 'pattern',
	// 		patternUrl : 'data/LZ.patt',
	// 	})
  //
	// // NW Marker
	// 	var nwGroup = new THREE.Group
	// 	scene.add(nwGroup)
  //
	// 	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, nwGroup, {
	// 		type : 'pattern',
	// 		patternUrl : 'data/NW.patt',
	// 	})
  //
	// // SH Marker
	// 	var shGroup = new THREE.Group
	// 	scene.add(shGroup)
  //
	// 	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, shGroup, {
	// 		type : 'pattern',
	// 		patternUrl : 'data/SH.patt',
	// 	})
  //
	// // SK Marker
	// 	var skGroup = new THREE.Group
	// 	scene.add(skGroup)
  //
	// 	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, skGroup, {
	// 		type : 'pattern',
	// 		patternUrl : 'data/SK.patt',
	// 	})
  //
	// // ZH Marker
	// 	var zhGroup = new THREE.Group
	// 	scene.add(zhGroup)
  //
	// 	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, zhGroup, {
	// 		type : 'pattern',
	// 		patternUrl : 'data/ZH.patt',
	// 	})

//////////////////////////////////////////////////////////////////////////////////
//		Create content for markers
//////////////////////////////////////////////////////////////////////////////////

	//JW Marker Content
	  var groupObjects = new THREE.Object3D();
			var objLoader = new THREE.OBMLoader();
	      objLoader.load(
	        'resources/heads/JW.obm',
	        function (props) {
	          props.scale.set(0.008,0.008,0.008);
	          props.rotation.y = 3.1;
						props.children[0].material = material;
						props.children[1].material = material;
						props.children[0].opacity = 1;
						props.children[0].geometry.center();
						props.position.set(0,0,-4);
	          groupObjects.add(props);
	        },
				);
			var object;
				var materialLoader = new THREE.MTLLoader();
		    materialLoader.load('resources/content/AR2.mtl', function (material) {
		      var objLoader = new THREE.OBJLoader()
		      objLoader.setMaterials(material)
		      objLoader.load(
		        'resources/content/AR2.obj',
		        function (object) {
		          object.scale.set(0.02,0.02,0.02);
		          object.rotation.x = -1.5;
		          object.position.set(0,0.5,-2.3);
		          groupObjects.add(object);
		        }
		      )
		    })
			groupObjects.position.set(0,0,1);
		// Add to marker group
		jwGroup.add( groupObjects );

	//JP Marker Content
	// var groupObjects = new THREE.Object3D();
	// 	var objLoader = new THREE.OBJLoader();
	// 		objLoader.load(
	// 			'resources/heads/JP.obj',
	// 			function (props) {
	// 				props.scale.set(0.012,0.012,0.012);
	// 				props.rotation.y = 3.1;
	// 				props.children[0].material = material;
	// 				props.children[1].material = material;
	// 				props.children[0].material.opacity = 0.7;
	// 				props.children[0].geometry.center();
	// 				props.position.set(0,0,-5);
	// 				groupObjects.add(props);
	// 			}
	// 		);
	// 	var object;
	// 		var materialLoader = new THREE.MTLLoader();
	// 		materialLoader.load('resources/content/JP.mtl', function (material) {
	// 			var objLoader = new THREE.OBJLoader()
	// 			objLoader.setMaterials(material)
	// 			objLoader.load(
	// 				'resources/content/JP.obj',
	// 				function (object) {
	// 					object.scale.set(0.05,0.05,0.05);
	// 					object.rotation.x = -1.5;
	// 					object.position.set(0,0.5,-2.3);
	// 					groupObjects.add(object);
	// 				}
	// 			)
	// 		})
			// groupObjects.position.set(0,0,1);
	// // Add to marker group
	// jpGroup.add( groupObjects );
  //
	// //AY Marker Content
	// var groupObjects = new THREE.Object3D();
  //
	// 	var objLoader = new THREE.OBJLoader();
	// 		objLoader.load(
	// 			'resources/heads/AY.obj',
	// 			function (props) {
	// 				props.scale.set(0.012,0.012,0.012);
	// 				props.rotation.y = 3.1;
	// 				props.children[0].material = material;
	// 				props.children[1].material = material;
	// 				props.children[0].material.opacity = 0.7;
	// 				props.children[0].geometry.center();
	// 				props.position.set(0,0,-5);
	// 				groupObjects.add(props);
	// 			},
	// 		);
	// 	var object
	// 		var materialLoader = new THREE.MTLLoader();
	// 		materialLoader.load('resources/content/AY.mtl', function (material) {
	// 			var objLoader = new THREE.OBJLoader()
	// 			objLoader.setMaterials(material)
	// 			objLoader.load(
	// 				'resources/content/AY.obj',
	// 				function (object) {
	// 					object.scale.set(0.05,0.05,0.05);
	// 					object.rotation.x = -1.5;
	// 					object.position.set(0,0.5,-2.3);
	// 					groupObjects.add(object);
	// 				}
	// 			)
	// 		})
				// groupObjects.position.set(0,0,1);
	// // Add to marker group
	// ayGroup.add( groupObjects );
  //
	// //BL Marker Content
	// var groupObjects = new THREE.Object3D();
  //
	// 	var objLoader = new THREE.OBJLoader();
	// 		objLoader.load(
	// 			'resources/heads/BL.obj',
	// 			function (props) {
	// 				props.scale.set(0.012,0.012,0.012);
	// 				props.rotation.y = 3.1;
	// 				props.children[0].material = material;
	// 				props.children[1].material = material;
	// 				props.children[0].material.opacity = 0.7;
	// 				props.children[0].geometry.center();
	// 				props.position.set(0,0,-5);
	// 				groupObjects.add(props);
	// 			},
	// 		);
	// 	var object
	// 		var materialLoader = new THREE.MTLLoader();
	// 		materialLoader.load('resources/content/BL.mtl', function (material) {
	// 			var objLoader = new THREE.OBJLoader()
	// 			objLoader.setMaterials(material)
	// 			objLoader.load(
	// 				'resources/content/BL.obj',
	// 				function (object) {
	// 					object.scale.set(0.05,0.05,0.05);
	// 					object.rotation.x = -1.5;
	// 					object.position.set(0,0.5,-2.3);
	// 					groupObjects.add(object);
	// 				}
	// 			)
	// 		})
				// groupObjects.position.set(0,0,1);
	// // Add to marker group
	// blGroup.add( groupObjects );
  //
	// //DJ Marker Content
	// var groupObjects = new THREE.Object3D();
  //
	// 	var objLoader = new THREE.OBJLoader();
	// 		objLoader.load(
	// 			'resources/heads/DJ.obj',
	// 			function (props) {
	// 				props.scale.set(0.012,0.012,0.012);
	// 				props.rotation.y = 3.1;
	// 				props.children[0].material = material;
	// 				props.children[1].material = material;
	// 				props.children[0].material.opacity = 0.7;
	// 				props.children[0].geometry.center();
	// 				props.position.set(0,0,-5);
	// 				groupObjects.add(props);
	// 			},
	// 		);
	// 	var object
	// 		var materialLoader = new THREE.MTLLoader();
	// 		materialLoader.load('resources/content/DJ.mtl', function (material) {
	// 			var objLoader = new THREE.OBJLoader()
	// 			objLoader.setMaterials(material)
	// 			objLoader.load(
	// 				'resources/content/DJ.obj',
	// 				function (object) {
	// 					object.scale.set(0.05,0.05,0.05);
	// 					object.rotation.x = -1.5;
	// 					object.position.set(0,0.5,-2.3);
	// 					groupObjects.add(object);
	// 				}
	// 			)
	// 		})
				// groupObjects.position.set(0,0,1);
	// // Add to marker group
	// djGroup.add( groupObjects );
  //
	// //DZ Marker Content
	// var groupObjects = new THREE.Object3D();
  //
	// 	var objLoader = new THREE.OBJLoader();
	// 		objLoader.load(
	// 			'resources/heads/DZ.obj',
	// 			function (props) {
	// 				props.scale.set(0.012,0.012,0.012);
	// 				props.rotation.y = 3.1;
	// 				props.children[0].material = material;
	// 				props.children[1].material = material;
	// 				props.children[0].material.opacity = 0.7;
	// 				props.children[0].geometry.center();
	// 				props.position.set(0,0,-5);
	// 				groupObjects.add(props);
	// 			},
	// 		);
	// 	var object
	// 		var materialLoader = new THREE.MTLLoader();
	// 		materialLoader.load('resources/content/DZ.mtl', function (material) {
	// 			var objLoader = new THREE.OBJLoader()
	// 			objLoader.setMaterials(material)
	// 			objLoader.load(
	// 				'resources/content/DZ.obj',
	// 				function (object) {
	// 					object.scale.set(0.05,0.05,0.05);
	// 					object.rotation.x = -1.5;
	// 					object.position.set(0,0.5,-2.3);
	// 					groupObjects.add(object);
	// 				}
	// 			)
	// 		})
				// groupObjects.position.set(0,0,1);
	// // Add to marker group
	// dzGroup.add( groupObjects );
  //
	// //EL Marker Content
	// var groupObjects = new THREE.Object3D();
  //
	// 	var objLoader = new THREE.OBJLoader();
	// 		objLoader.load(
	// 			'resources/heads/EL.obj',
	// 			function (props) {
	// 				props.scale.set(0.012,0.012,0.012);
	// 				props.rotation.y = 3.1;
	// 				props.children[0].material = material;
	// 				props.children[1].material = material;
	// 				props.children[0].material.opacity = 0.7;
	// 				props.children[0].geometry.center();
	// 				props.position.set(0,0,-5);
	// 				groupObjects.add(props);
	// 			},
	// 		);
	// 	var object
	// 		var materialLoader = new THREE.MTLLoader();
	// 		materialLoader.load('resources/content/EL.mtl', function (material) {
	// 			var objLoader = new THREE.OBJLoader()
	// 			objLoader.setMaterials(material)
	// 			objLoader.load(
	// 				'resources/content/EL.obj',
	// 				function (object) {
	// 					object.scale.set(0.05,0.05,0.05);
	// 					object.rotation.x = -1.5;
	// 					object.position.set(0,0.5,-2.3);
	// 					groupObjects.add(object);
	// 				}
	// 			)
	// 		})
			// groupObjects.position.set(0,0,1);
	// // Add to marker group
	// elGroup.add( groupObjects );
  //
	// //ES Marker Content
	// var groupObjects = new THREE.Object3D();
  //
	// 	var objLoader = new THREE.OBJLoader();
	// 		objLoader.load(
	// 			'resources/heads/ES.obj',
	// 			function (props) {
	// 				props.scale.set(0.012,0.012,0.012);
	// 				props.rotation.y = 3.1;
	// 				props.children[0].material = material;
	// 				props.children[1].material = material;
	// 				props.children[0].material.opacity = 0.7;
	// 				props.children[0].geometry.center();
	// 				props.position.set(0,0,-5);
	// 				groupObjects.add(props);
	// 			},
	// 		);
	// 	var object
	// 		var materialLoader = new THREE.MTLLoader();
	// 		materialLoader.load('resources/content/ES.mtl', function (material) {
	// 			var objLoader = new THREE.OBJLoader()
	// 			objLoader.setMaterials(material)
	// 			objLoader.load(
	// 				'resources/content/ES.obj',
	// 				function (object) {
	// 					object.scale.set(0.05,0.05,0.05);
	// 					object.rotation.x = -1.5;
	// 					object.position.set(0,0.5,-2.3);
	// 					groupObjects.add(object);
	// 				}
	// 			)
	// 		})
				// groupObjects.position.set(0,0,1);
	// // Add to marker group
	// esGroup.add( groupObjects );
  //
	// //JH Marker Content
	// var groupObjects = new THREE.Object3D();
  //
	// 	var objLoader = new THREE.OBJLoader();
	// 		objLoader.load(
	// 			'resources/heads/JH.obj',
	// 			function (props) {
	// 				props.scale.set(0.012,0.012,0.012);
	// 				props.rotation.y = 3.1;
	// 				props.children[0].material = material;
	// 				props.children[1].material = material;
	// 				props.children[0].material.opacity = 0.7;
	// 				props.children[0].geometry.center();
	// 				props.position.set(0,0,-5);
	// 				groupObjects.add(props);
	// 			},
	// 		);
	// 	var object
	// 		var materialLoader = new THREE.MTLLoader();
	// 		materialLoader.load('resources/content/JH.mtl', function (material) {
	// 			var objLoader = new THREE.OBJLoader()
	// 			objLoader.setMaterials(material)
	// 			objLoader.load(
	// 				'resources/content/JH.obj',
	// 				function (object) {
	// 					object.scale.set(0.05,0.05,0.05);
	// 					object.rotation.x = -1.5;
	// 					object.position.set(0,0.5,-2.3);
	// 					groupObjects.add(object);
	// 				}
	// 			)
	// 		})
				// groupObjects.position.set(0,0,1);
	// // Add to marker group
	// jhGroup.add( groupObjects );
  //
	// //KA Marker Content
	// var groupObjects = new THREE.Object3D();
  //
	// 	var objLoader = new THREE.OBJLoader();
	// 		objLoader.load(
	// 			'resources/heads/KA.obj',
	// 			function (props) {
	// 				props.scale.set(0.012,0.012,0.012);
	// 				props.rotation.y = 3.1;
	// 				props.children[0].material = material;
	// 				props.children[1].material = material;
	// 				props.children[0].material.opacity = 0.7;
	// 				props.children[0].geometry.center();
	// 				props.position.set(0,0,-5);
	// 				groupObjects.add(props);
	// 			},
	// 		);
	// 	var object
	// 		var materialLoader = new THREE.MTLLoader();
	// 		materialLoader.load('resources/content/KA.mtl', function (material) {
	// 			var objLoader = new THREE.OBJLoader()
	// 			objLoader.setMaterials(material)
	// 			objLoader.load(
	// 				'resources/content/KA.obj',
	// 				function (object) {
	// 					object.scale.set(0.05,0.05,0.05);
	// 					object.rotation.x = -1.5;
	// 					object.position.set(0,0.5,-2.3);
	// 					groupObjects.add(object);
	// 				}
	// 			)
	// 		})
				// groupObjects.position.set(0,0,1);
	// // Add to marker group
	// kaGroup.add( groupObjects );
  //
	// //KB Marker Content
	// var groupObjects = new THREE.Object3D();
  //
	// 	var objLoader = new THREE.OBJLoader();
	// 		objLoader.load(
	// 			'resources/heads/KB.obj',
	// 			function (props) {
	// 				props.scale.set(0.012,0.012,0.012);
	// 				props.rotation.y = 3.1;
	// 				props.children[0].material = material;
	// 				props.children[1].material = material;
	// 				props.children[0].material.opacity = 0.7;
	// 				props.children[0].geometry.center();
	// 				props.position.set(0,0,-5);
	// 				groupObjects.add(props);
	// 			},
	// 		);
	// 	var object
	// 		var materialLoader = new THREE.MTLLoader();
	// 		materialLoader.load('resources/content/KB.mtl', function (material) {
	// 			var objLoader = new THREE.OBJLoader()
	// 			objLoader.setMaterials(material)
	// 			objLoader.load(
	// 				'resources/content/KB.obj',
	// 				function (object) {
	// 					object.scale.set(0.05,0.05,0.05);
	// 					object.rotation.x = -1.5;
	// 					object.position.set(0,0.5,-2.3);
	// 					groupObjects.add(object);
	// 				}
	// 			)
	// 		})
				// groupObjects.position.set(0,0,1);
	// // Add to marker group
	// kbGroup.add( groupObjects );
  //
	// //LZ Marker Content
	// var groupObjects = new THREE.Object3D();
  //
	// 	var objLoader = new THREE.OBJLoader();
	// 		objLoader.load(
	// 			'resources/heads/LZ.obj',
	// 			function (props) {
	// 				props.scale.set(0.012,0.012,0.012);
	// 				props.rotation.y = 3.1;
	// 				props.children[0].material = material;
	// 				props.children[1].material = material;
	// 				props.children[0].material.opacity = 0.7;
	// 				props.children[0].geometry.center();
	// 				props.position.set(0,0,-5);
	// 				groupObjects.add(props);
	// 			},
	// 		);
	// 	var object
	// 		var materialLoader = new THREE.MTLLoader();
	// 		materialLoader.load('resources/content/LZ.mtl', function (material) {
	// 			var objLoader = new THREE.OBJLoader()
	// 			objLoader.setMaterials(material)
	// 			objLoader.load(
	// 				'resources/content/LZ.obj',
	// 				function (object) {
	// 					object.scale.set(0.05,0.05,0.05);
	// 					object.rotation.x = -1.5;
	// 					object.position.set(0,0.5,-2.3);
	// 					groupObjects.add(object);
	// 				}
	// 			)
	// 		})
				// groupObjects.position.set(0,0,1);
	// // Add to marker group
	// lzGroup.add( groupObjects );
  //
	// //NW Marker Content
	// var groupObjects = new THREE.Object3D();
  //
	// 	var objLoader = new THREE.OBJLoader();
	// 		objLoader.load(
	// 			'resources/heads/NW.obj',
	// 			function (props) {
	// 				props.scale.set(0.012,0.012,0.012);
	// 				props.rotation.y = 3.1;
	// 				props.children[0].material = material;
	// 				props.children[1].material = material;
	// 				props.children[0].material.opacity = 0.7;
	// 				props.children[0].geometry.center();
	// 				props.position.set(0,0,-5);
	// 				groupObjects.add(props);
	// 			},
	// 		);
	// 	var object
	// 		var materialLoader = new THREE.MTLLoader();
	// 		materialLoader.load('resources/content/NW.mtl', function (material) {
	// 			var objLoader = new THREE.OBJLoader()
	// 			objLoader.setMaterials(material)
	// 			objLoader.load(
	// 				'resources/content/NW.obj',
	// 				function (object) {
	// 					object.scale.set(0.05,0.05,0.05);
	// 					object.rotation.x = -1.5;
	// 					object.position.set(0,0.5,-2.3);
	// 					groupObjects.add(object);
	// 				}
	// 			)
	// 		})
				// groupObjects.position.set(0,0,1);
	// // Add to marker group
	// nwGroup.add( groupObjects );
  //
	// //SH Marker Content
	// var groupObjects = new THREE.Object3D();
  //
	// 	var objLoader = new THREE.OBJLoader();
	// 		objLoader.load(
	// 			'resources/heads/SH.obj',
	// 			function (props) {
	// 				props.scale.set(0.012,0.012,0.012);
	// 				props.rotation.y = 3.1;
	// 				props.children[0].material = material;
	// 				props.children[1].material = material;
	// 				props.children[0].material.opacity = 0.7;
	// 				props.children[0].geometry.center();
	// 				props.position.set(0,0,-5);
	// 				groupObjects.add(props);
	// 			},
	// 		);
	// 	var object
	// 		var materialLoader = new THREE.MTLLoader();
	// 		materialLoader.load('resources/content/SH.mtl', function (material) {
	// 			var objLoader = new THREE.OBJLoader()
	// 			objLoader.setMaterials(material)
	// 			objLoader.load(
	// 				'resources/content/SH.obj',
	// 				function (object) {
	// 					object.scale.set(0.05,0.05,0.05);
	// 					object.rotation.x = -1.5;
	// 					object.position.set(0,0.5,-2.3);
	// 					groupObjects.add(object);
	// 				}
	// 			)
	// 		})
				// groupObjects.position.set(0,0,1);
	// // Add to marker group
	// shGroup.add( groupObjects );
  //
	// //SK Marker Content
	// var groupObjects = new THREE.Object3D();
  //
	// 	var objLoader = new THREE.OBJLoader();
	// 		objLoader.load(
	// 			'resources/heads/SK.obj',
	// 			function (props) {
	// 				props.scale.set(0.012,0.012,0.012);
	// 				props.rotation.y = 3.1;
	// 				props.children[0].material = material;
	// 				props.children[1].material = material;
	// 				props.children[0].material.opacity = 0.7;
	// 				props.children[0].geometry.center();
	// 				props.position.set(0,0,-5);
	// 				groupObjects.add(props);
	// 			},
	// 		);
	// 	var object
	// 		var materialLoader = new THREE.MTLLoader();
	// 		materialLoader.load('resources/content/SK.mtl', function (material) {
	// 			var objLoader = new THREE.OBJLoader()
	// 			objLoader.setMaterials(material)
	// 			objLoader.load(
	// 				'resources/content/SK.obj',
	// 				function (object) {
	// 					object.scale.set(0.05,0.05,0.05);
	// 					object.rotation.x = -1.5;
	// 					object.position.set(0,0.5,-2.3);
	// 					groupObjects.add(object);
	// 				}
	// 			)
	// 		})
				// groupObjects.position.set(0,0,1);
	// // Add to marker group
	// skGroup.add( groupObjects );
  //
	// //ZH Marker Content
	// var groupObjects = new THREE.Object3D();
  //
	// 	var objLoader = new THREE.OBJLoader();
	// 		objLoader.load(
	// 			'resources/heads/ZH.obj',
	// 			function (props) {
	// 				props.scale.set(0.012,0.012,0.012);
	// 				props.rotation.y = 3.1;
	// 				props.children[0].material = material;
	// 				props.children[1].material = material;
	// 				props.children[0].material.opacity = 0.7;
	// 				props.children[0].geometry.center();
	// 				props.position.set(0,0,-5);
	// 				groupObjects.add(props);
	// 			},
	// 		);
	// 	var object
	// 		var materialLoader = new THREE.MTLLoader();
	// 		materialLoader.load('resources/content/ZH.mtl', function (material) {
	// 			var objLoader = new THREE.OBJLoader()
	// 			objLoader.setMaterials(material)
	// 			objLoader.load(
	// 				'resources/content/ZH.obj',
	// 				function (object) {
	// 					object.scale.set(0.05,0.05,0.05);
	// 					object.rotation.x = -1.5;
	// 					object.position.set(0,0.5,-2.3);
	// 					groupObjects.add(object);
	// 				}
	// 			)
	// 		})
				// groupObjects.position.set(0,0,1);
	// // Add to marker group
	// zhGroup.add( groupObjects );
}

//////////////////////////////////////////////////////////////////////////////////
//		Render the content (will render content for particular detected marker)
//////////////////////////////////////////////////////////////////////////////////

  function render () {
    requestAnimationFrame( render );

    if( arToolkitSource.ready === false )	return
		arToolkitContext.update( arToolkitSource.domElement )

		// Update scene.visible if the marker is seen
		scene.visible = camera.visible

		// Spinning head animation
		jwGroup.children[0].children[0].rotation.z -= 0.02;
		// jpGroup.children[0].children[0].rotation.z -= 0.02;
		// ayGroup.children[0].children[0].rotation.z -= 0.02;
		// blGroup.children[0].children[0].rotation.z -= 0.02;
		// djGroup.children[0].children[0].rotation.z -= 0.02;
		// dzGroup.children[0].children[0].rotation.z -= 0.02;
		// elGroup.children[0].children[0].rotation.z -= 0.02;
		// esGroup.children[0].children[0].rotation.z -= 0.02;
		// jhGroup.children[0].children[0].rotation.z -= 0.02;
		// kaGroup.children[0].children[0].rotation.z -= 0.02;
		// kbGroup.children[0].children[0].rotation.z -= 0.02;
		// lzGroup.children[0].children[0].rotation.z -= 0.02;
		// nwGroup.children[0].children[0].rotation.z -= 0.02;
		// shGroup.children[0].children[0].rotation.z -= 0.02;
		// skGroup.children[0].children[0].rotation.z -= 0.02;
		// zhGroup.children[0].children[0].rotation.z -= 0.02;

    // Render the scene and camera
    renderer.render( scene, camera);
  }

// Call init to start
window.onload = init();
