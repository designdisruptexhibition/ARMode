
//////////////////////////////////////////////////////////////////////////////////
//		Global Variables
//////////////////////////////////////////////////////////////////////////////////

	var renderer, render, scene, camera;
	var arToolkitContext;
	var arToolkitSource;
	var props;
	var material = new THREE.MeshNormalMaterial({transparent: true, opacity: 0.6});

	var loading = 0;

//////////////////////////////////////////////////////////////////////////////////
//		Render Setup
//////////////////////////////////////////////////////////////////////////////////
//initialize the  to handle all loaded events (currently just works for OBJ and image files)

// THREE.DefaultLoadingManager.onProgress = function (url, itemsloaded, itemsTotal) {
//     console.log(itemsloaded);
// 		loading = (itemsloaded/45) * 100;
//
// 		var loadNum = document.querySelector('#loadNum');
// 		loadNum.innerHTML = Math.trunc(loading);
//
// 		if (loading == 100){
// 			var remLoad = document.querySelector('#loader-wrapper');
// 			remLoad.parentNode.removeChild(remLoad);
// 		}
// };


	//Delay rendering until all files have loaded
	// THREE.DefaultLoadingManager.onLoad = function ( ) {
	// 	render();
	// 	console.log("ready to render");
	// };

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
		var jwGroup;
		var groupObjectsJW = new THREE.Object3D();
		var holder = new THREE.Object3D();
		jwGroup = new THREE.Group
		scene.add(jwGroup);
		groupObjectsJW.add(holder);
		jwGroup.add(groupObjectsJW);

		// Declare which marker is to be detected
		var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, jwGroup, {
			type : 'pattern',
			patternUrl : 'data/JW.patt',
		})

		artoolkitMarker.addEventListener("markerFound", function mark (e){

		//JW Marker Content
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
				props.children[1].geometry.center();
				props.position.set(0,0,-5.3);
				groupObjectsJW.add(props);
			},
		);
		var object;
		var materialLoader = new THREE.MTLLoader();
		materialLoader.load('resources/content/JW.mtl', function (material) {
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(material)
			objLoader.load(
				'resources/content/JW.obj',
				function (object) {
					object.scale.set(0.2,0.2,0.2);
					object.rotation.x = -1.5;
					object.position.set(0,0,-2.3);
					groupObjectsJW.add(object);
				}
			)
		})
		groupObjectsJW.position.set(0,0,2.3);

		groupObjectsJW.remove(holder);

		groupObjectsJW.matrixAutoUpdate  = true;
		groupObjectsJW.updateMatrix();

		this.removeEventListener("markerFound", mark);

	});

	//JP Marker
	var jpGroup;
	var groupObjectsJP = new THREE.Object3D();
	var holder = new THREE.Object3D();
	jpGroup = new THREE.Group
	scene.add(jpGroup);
	groupObjectsJP.add(holder);
	jpGroup.add(groupObjectsJP);

	// Declare which marker is to be detected
	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, jpGroup, {
		type : 'pattern',
		patternUrl : 'data/JP.patt',
	})

	artoolkitMarker.addEventListener("markerFound", function mark (e){

	//jp Marker Content
	var objLoader = new THREE.OBMLoader();
	objLoader.load(
		'resources/heads/JP.obm',
		function (props) {
			props.scale.set(0.008,0.008,0.008);
			props.rotation.y = 3.1;
			props.children[0].material = material;
			props.children[1].material = material;
			props.children[0].opacity = 1;
			props.children[0].geometry.center();
			props.children[1].geometry.center();
			props.position.set(0,0,-5.3);
			groupObjectsJP.add(props);
		},
	);
	var object;
	var materialLoader = new THREE.MTLLoader();
	materialLoader.load('resources/content/JP.mtl', function (material) {
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(material)
		objLoader.load(
			'resources/content/JP.obj',
			function (object) {
				object.scale.set(0.2,0.2,0.2);
				object.rotation.x = -1.5;
				object.position.set(0,0,-2.3);
				groupObjectsJP.add(object);
			}
		)
	})
	groupObjectsJP.position.set(0,0,2.3);

	groupObjectsJP.remove(holder);

	groupObjectsJP.matrixAutoUpdate  = true;
	groupObjectsJP.updateMatrix();

	this.removeEventListener("markerFound", mark);

});

	// AY Marker
	//Create a group for all objects for this particular marker
	var ayGroup;
	var groupObjectsAY = new THREE.Object3D();
	var holder = new THREE.Object3D();
	ayGroup = new THREE.Group
	scene.add(ayGroup);
	groupObjectsAY.add(holder);
	ayGroup.add(groupObjectsAY);

	// Declare which marker is to be detected
	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, ayGroup, {
		type : 'pattern',
		patternUrl : 'data/AY.patt',
	})

	artoolkitMarker.addEventListener("markerFound", function mark (e){

	//AY Marker Content
	var objLoader = new THREE.OBMLoader();
	objLoader.load(
		'resources/heads/AY.obm',
		function (props) {
			props.scale.set(0.008,0.008,0.008);
			props.rotation.y = 3.1;
			props.children[0].material = material;
			props.children[0].opacity = 1;
			props.children[0].geometry.center();
			props.position.set(0,0,-5.3);
			groupObjectsAY.add(props);
		},
	);
	var object;
	var materialLoader = new THREE.MTLLoader();
	materialLoader.load('resources/content/AY.mtl', function (material) {
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(material)
		objLoader.load(
			'resources/content/AY.obj',
			function (object) {
				object.scale.set(0.2,0.2,0.2);
				object.rotation.x = -1.5;
				object.position.set(0,0,-2.3);
				groupObjectsAY.add(object);
			}
		)
	})
	groupObjectsAY.position.set(0,0,2.3);

	groupObjectsAY.remove(holder);

	groupObjectsAY.matrixAutoUpdate  = true;
	groupObjectsAY.updateMatrix();

	this.removeEventListener("markerFound", mark);

});

	// BL Marker
	//Create a group for all objects for this particular marker
	var blGroup;
	var groupObjectsBL = new THREE.Object3D();
	var holder = new THREE.Object3D();
	blGroup = new THREE.Group
	scene.add(blGroup);
	groupObjectsBL.add(holder);
	blGroup.add(groupObjectsBL);

	// Declare which marker is to be detected
	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, blGroup, {
		type : 'pattern',
		patternUrl : 'data/BL.patt',
	})

	artoolkitMarker.addEventListener("markerFound", function mark (e){

	//BL Marker Content
	var objLoader = new THREE.OBMLoader();
	objLoader.load(
		'resources/heads/BL.obm',
		function (props) {
			props.scale.set(0.008,0.008,0.008);
			props.rotation.y = 3.1;
			props.children[0].material = material;
			props.children[1].material = material;
			props.children[0].opacity = 1;
			props.children[0].geometry.center();
			props.children[1].geometry.center();
			props.position.set(0,0,-5.3);
			groupObjectsBL.add(props);
		},
	);
	var object;
	var materialLoader = new THREE.MTLLoader();
	materialLoader.load('resources/content/BL.mtl', function (material) {
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(material)
		objLoader.load(
			'resources/content/BL.obj',
			function (object) {
				object.scale.set(0.2,0.2,0.2);
				object.rotation.x = -1.5;
				object.position.set(0,0,-2.3);
				groupObjectsBL.add(object);
			}
		)
	})
	groupObjectsBL.position.set(0,0,2.3);

	groupObjectsBL.remove(holder);

	groupObjectsBL.matrixAutoUpdate  = true;
	groupObjectsBL.updateMatrix();

	this.removeEventListener("markerFound", mark);

});

	// DZ Marker
	//Create a group for all objects for this particular marker
	var dzGroup;
	var groupObjectsDZ = new THREE.Object3D();
	var holder = new THREE.Object3D();
	dzGroup = new THREE.Group
	scene.add(dzGroup);
	groupObjectsDZ.add(holder);
	dzGroup.add(groupObjectsDZ);

	// Declare which marker is to be detected
	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, dzGroup, {
		type : 'pattern',
		patternUrl : 'data/DZ.patt',
	})

	artoolkitMarker.addEventListener("markerFound", function mark (e){

	//DZ Marker Content
	var objLoader = new THREE.OBMLoader();
	objLoader.load(
		'resources/heads/DZ.obm',
		function (props) {
			props.scale.set(0.008,0.008,0.008);
			props.rotation.y = 3.1;
			props.children[0].material = material;
			props.children[1].material = material;
			props.children[0].opacity = 1;
			props.children[0].geometry.center();
			props.children[1].geometry.center();
			props.position.set(0,0,-5.3);
			groupObjectsDZ.add(props);
		},
	);
	var object;
	var materialLoader = new THREE.MTLLoader();
	materialLoader.load('resources/content/DZ.mtl', function (material) {
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(material)
		objLoader.load(
			'resources/content/DZ.obj',
			function (object) {
				object.scale.set(0.2,0.2,0.2);
				object.rotation.x = -1.5;
				object.position.set(0,0,-2.3);
				groupObjectsDZ.add(object);
			}
		)
	})
	groupObjectsDZ.position.set(0,0,2.3);

	groupObjectsDZ.remove(holder);

	groupObjectsDZ.matrixAutoUpdate  = true;
	groupObjectsDZ.updateMatrix();

	this.removeEventListener("markerFound", mark);

});

	// EL Marker
	//Create a group for all objects for this particular marker
	var elGroup;
	var groupObjectsEL = new THREE.Object3D();
	var holder = new THREE.Object3D();
	elGroup = new THREE.Group
	scene.add(elGroup);
	groupObjectsEL.add(holder);
	elGroup.add(groupObjectsEL);

	// Declare which marker is to be detected
	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, elGroup, {
		type : 'pattern',
		patternUrl : 'data/EL.patt',
	})

	artoolkitMarker.addEventListener("markerFound", function mark (e){

	//EL Marker Content
	var objLoader = new THREE.OBMLoader();
	objLoader.load(
		'resources/heads/EL.obm',
		function (props) {
			props.scale.set(0.008,0.008,0.008);
			props.rotation.y = 3.1;
			props.children[0].material = material;
			props.children[1].material = material;
			props.children[0].opacity = 1;
			props.children[0].geometry.center();
			props.children[1].geometry.center();
			props.position.set(0,0,-5.3);
			groupObjectsEL.add(props);
		},
	);
	var object;
	var materialLoader = new THREE.MTLLoader();
	materialLoader.load('resources/content/EL.mtl', function (material) {
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(material)
		objLoader.load(
			'resources/content/EL.obj',
			function (object) {
				object.scale.set(0.2,0.2,0.2);
				object.rotation.x = -1.5;
				object.position.set(0,0,-2.3);
				groupObjectsEL.add(object);
			}
		)
	})
	groupObjectsEL.position.set(0,0,2.3);

	groupObjectsEL.remove(holder);

	groupObjectsEL.matrixAutoUpdate  = true;
	groupObjectsEL.updateMatrix();

	this.removeEventListener("markerFound", mark);

});

	// ES Marker
	//Create a group for all objects for this particular marker
	var esGroup;
	var groupObjectsES = new THREE.Object3D();
	var holder = new THREE.Object3D();
	esGroup = new THREE.Group
	scene.add(esGroup);
	groupObjectsES.add(holder);
	esGroup.add(groupObjectsES);

	// Declare which marker is to be detected
	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, esGroup, {
		type : 'pattern',
		patternUrl : 'data/ES.patt',
	})

	artoolkitMarker.addEventListener("markerFound", function mark (e){

	//ES Marker Content
	var objLoader = new THREE.OBMLoader();
	objLoader.load(
		'resources/heads/ES.obm',
		function (props) {
			props.scale.set(0.008,0.008,0.008);
			props.rotation.y = 3.1;
			props.children[0].material = material;
			props.children[1].material = material;
			props.children[0].opacity = 1;
			props.children[0].geometry.center();
			props.children[1].geometry.center();
			props.position.set(0,0,-5.3);
			groupObjectsES.add(props);
		},
	);
	var object;
	var materialLoader = new THREE.MTLLoader();
	materialLoader.load('resources/content/ES.mtl', function (material) {
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(material)
		objLoader.load(
			'resources/content/ES.obj',
			function (object) {
				object.scale.set(0.2,0.2,0.2);
				object.rotation.x = -1.5;
				object.position.set(0,0,-2.3);
				groupObjectsES.add(object);
			}
		)
	})
	groupObjectsES.position.set(0,0,2.3);

	groupObjectsES.remove(holder);

	groupObjectsES.matrixAutoUpdate  = true;
	groupObjectsES.updateMatrix();

	this.removeEventListener("markerFound", mark);

});

	// JH Marker
	//Create a group for all objects for this particular marker
	var jhGroup;
	var groupObjectsJH = new THREE.Object3D();
	var holder = new THREE.Object3D();
	jhGroup = new THREE.Group
	scene.add(jhGroup);
	groupObjectsJH.add(holder);
	jhGroup.add(groupObjectsJH);

	// Declare which marker is to be detected
	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, jhGroup, {
		type : 'pattern',
		patternUrl : 'data/JH.patt',
	})

	artoolkitMarker.addEventListener("markerFound", function mark (e){

	//JH Marker Content
	var objLoader = new THREE.OBMLoader();
	objLoader.load(
		'resources/heads/JH.obm',
		function (props) {
			props.scale.set(0.008,0.008,0.008);
			props.rotation.y = 3.1;
			props.children[0].material = material;
			props.children[1].material = material;
			props.children[0].opacity = 1;
			props.children[0].geometry.center();
			props.children[1].geometry.center();
			props.position.set(0,0,-5.3);
			groupObjectsJH.add(props);
		},
	);
	var object;
	var materialLoader = new THREE.MTLLoader();
	materialLoader.load('resources/content/JH.mtl', function (material) {
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(material)
		objLoader.load(
			'resources/content/JH.obj',
			function (object) {
				object.scale.set(0.2,0.2,0.2);
				object.rotation.x = -1.5;
				object.position.set(0,0,-2.3);
				groupObjectsJH.add(object);
			}
		)
	})
	groupObjectsJH.position.set(0,0,2.3);

	groupObjectsJH.remove(holder);

	groupObjectsJH.matrixAutoUpdate  = true;
	groupObjectsJH.updateMatrix();

	this.removeEventListener("markerFound", mark);

});

	// KA Marker
	//Create a group for all objects for this particular marker
	var kaGroup;
	var groupObjectsKA = new THREE.Object3D();
	var holder = new THREE.Object3D();
	kaGroup = new THREE.Group
	scene.add(kaGroup);
	groupObjectsKA.add(holder);
	kaGroup.add(groupObjectsKA);

	// Declare which marker is to be detected
	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, kaGroup, {
		type : 'pattern',
		patternUrl : 'data/KA.patt',
	})

	artoolkitMarker.addEventListener("markerFound", function mark (e){

	//KA Marker Content
	var objLoader = new THREE.OBMLoader();
	objLoader.load(
		'resources/heads/KA.obm',
		function (props) {
			props.scale.set(0.008,0.008,0.008);
			props.rotation.y = 3.1;
			props.children[0].material = material;
			props.children[1].material = material;
			props.children[0].opacity = 1;
			props.children[0].geometry.center();
			props.children[1].geometry.center();
			props.position.set(0,0,-5.3);
			groupObjectsKA.add(props);
		},
	);
	var object;
	var materialLoader = new THREE.MTLLoader();
	materialLoader.load('resources/content/KA.mtl', function (material) {
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(material)
		objLoader.load(
			'resources/content/KA.obj',
			function (object) {
				object.scale.set(0.2,0.2,0.2);
				object.rotation.x = -1.5;
				object.position.set(0,0,-2.3);
				groupObjectsKA.add(object);
			}
		)
	})
	groupObjectsKA.position.set(0,0,2.3);

	groupObjectsKA.remove(holder);

	groupObjectsKA.matrixAutoUpdate  = true;
	groupObjectsKA.updateMatrix();

	this.removeEventListener("markerFound", mark);

});

	// KB Marker
	//Create a group for all objects for this particular marker
	var kbGroup;
	var groupObjectsKB = new THREE.Object3D();
	var holder = new THREE.Object3D();
	kbGroup = new THREE.Group
	scene.add(kbGroup);
	groupObjectsKB.add(holder);
	kbGroup.add(groupObjectsKB);

	// Declare which marker is to be detected
	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, kbGroup, {
		type : 'pattern',
		patternUrl : 'data/KB.patt',
	})

	artoolkitMarker.addEventListener("markerFound", function mark (e){

	//KB Marker Content
	var objLoader = new THREE.OBMLoader();
	objLoader.load(
		'resources/heads/KB.obm',
		function (props) {
			props.scale.set(0.008,0.008,0.008);
			props.rotation.y = 3.1;
			props.children[0].material = material;
			props.children[1].material = material;
			props.children[0].opacity = 1;
			props.children[0].geometry.center();
			props.children[1].geometry.center();
			props.position.set(0,0,-5.3);
			groupObjectsKB.add(props);
		},
	);
	var object;
	var materialLoader = new THREE.MTLLoader();
	materialLoader.load('resources/content/KB.mtl', function (material) {
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(material)
		objLoader.load(
			'resources/content/KB.obj',
			function (object) {
				object.scale.set(0.2,0.2,0.2);
				object.rotation.x = -1.5;
				object.position.set(0,0,-2.3);
				groupObjectsKB.add(object);
			}
		)
	})
	groupObjectsKB.position.set(0,0,2.3);

	groupObjectsKB.remove(holder);

	groupObjectsKB.matrixAutoUpdate  = true;
	groupObjectsKB.updateMatrix();

	this.removeEventListener("markerFound", mark);

});

	// LZ Marker
	//Create a group for all objects for this particular marker
	var lzGroup;
	var groupObjectsLZ = new THREE.Object3D();
	var holder = new THREE.Object3D();
	lzGroup = new THREE.Group
	scene.add(lzGroup);
	groupObjectsLZ.add(holder);
	lzGroup.add(groupObjectsLZ);

	// Declare which marker is to be detected
	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, lzGroup, {
		type : 'pattern',
		patternUrl : 'data/LZ.patt',
	})

	artoolkitMarker.addEventListener("markerFound", function mark (e){

	//LZ Marker Content
	var objLoader = new THREE.OBMLoader();
	objLoader.load(
		'resources/heads/LZ.obm',
		function (props) {
			props.scale.set(0.008,0.008,0.008);
			props.rotation.y = 3.1;
			props.children[0].material = material;
			props.children[1].material = material;
			props.children[0].opacity = 1;
			props.children[0].geometry.center();
			props.children[1].geometry.center();
			props.position.set(0,0,-5.3);
			groupObjectsLZ.add(props);
		},
	);
	var object;
	var materialLoader = new THREE.MTLLoader();
	materialLoader.load('resources/content/LZ.mtl', function (material) {
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(material)
		objLoader.load(
			'resources/content/LZ.obj',
			function (object) {
				object.scale.set(0.2,0.2,0.2);
				object.rotation.x = -1.5;
				object.position.set(0,0,-2.3);
				groupObjectsLZ.add(object);
			}
		)
	})
	groupObjectsLZ.position.set(0,0,2.3);

	groupObjectsLZ.remove(holder);

	groupObjectsLZ.matrixAutoUpdate  = true;
	groupObjectsLZ.updateMatrix();

	this.removeEventListener("markerFound", mark);

});

	// NW Marker
	//Create a group for all objects for this particular marker
	var nwGroup;
	var groupObjectsNW = new THREE.Object3D();
	var holder = new THREE.Object3D();
	nwGroup = new THREE.Group
	scene.add(nwGroup);
	groupObjectsNW.add(holder);
	nwGroup.add(groupObjectsNW);

	// Declare which marker is to be detected
	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, nwGroup, {
		type : 'pattern',
		patternUrl : 'data/NW.patt',
	})

	artoolkitMarker.addEventListener("markerFound", function mark (e){

		groupObjectsNW.remove(holder);

	//NW Marker Content
	var objLoader = new THREE.OBMLoader();
	objLoader.load(
		'resources/heads/NW.obm',
		function (props) {
			props.scale.set(0.008,0.008,0.008);
			props.rotation.y = 3.1;
			props.children[0].material = material;
			props.children[1].material = material;
			props.children[0].opacity = 1;
			props.children[0].geometry.center();
			props.children[1].geometry.center();
			props.position.set(0,0,-5.3);
			groupObjectsNW.add(props);
		},
	);
	var object;
	var materialLoader = new THREE.MTLLoader();
	materialLoader.load('resources/content/NW.mtl', function (material) {
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(material)
		objLoader.load(
			'resources/content/NW.obj',
			function (object) {
				object.scale.set(0.2,0.2,0.2);
				object.rotation.x = -1.5;
				object.position.set(0,0,-2.3);
				groupObjectsNW.add(object);
			}
		)
	})
	groupObjectsNW.position.set(0,0,2.3);

	groupObjectsSH.matrixAutoUpdate  = true;
	groupObjectsSH.updateMatrix();

	this.removeEventListener("markerFound", mark);

});

	// SH Marker
	//Create a group for all objects for this particular marker
	var shGroup;
	var groupObjectsSH = new THREE.Object3D();
	var holder = new THREE.Object3D();
	shGroup = new THREE.Group
	scene.add(shGroup);
	groupObjectsSH.add(holder);
	shGroup.add(groupObjectsSH);

	// Declare which marker is to be detected
	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, shGroup, {
		type : 'pattern',
		patternUrl : 'data/SH.patt',
	})

	artoolkitMarker.addEventListener("markerFound", function mark (e){

	//SH Marker Content
	var objLoader = new THREE.OBMLoader();
	objLoader.load(
		'resources/heads/SH.obm',
		function (props) {
			props.scale.set(0.008,0.008,0.008);
			props.rotation.y = 3.1;
			props.children[0].material = material;
			props.children[1].material = material;
			props.children[0].opacity = 1;
			props.children[0].geometry.center();
			props.children[1].geometry.center();
			props.position.set(0,0,-5.3);
			groupObjectsSH.add(props);
		},
	);
	var object;
	var materialLoader = new THREE.MTLLoader();
	materialLoader.load('resources/content/SH.mtl', function (material) {
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(material)
		objLoader.load(
			'resources/content/SH.obj',
			function (object) {
				object.scale.set(0.2,0.2,0.2);
				object.rotation.x = -1.5;
				object.position.set(0,0,-2.3);
				groupObjectsSH.add(object);
			}
		)
	})
	groupObjectsSH.position.set(0,0,2.3);

	groupObjectsSH.remove(holder);

	groupObjectsSH.matrixAutoUpdate  = true;
	groupObjectsSH.updateMatrix();

	this.removeEventListener("markerFound", mark);

});

	// SK Marker
	//Create a group for all objects for this particular marker
	var skGroup;
	var groupObjectsSK = new THREE.Object3D();
	var holder = new THREE.Object3D();
	skGroup = new THREE.Group
	scene.add(skGroup);
	groupObjectsSK.add(holder);
	skGroup.add(groupObjectsSK);

	// Declare which marker is to be detected
	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, skGroup, {
		type : 'pattern',
		patternUrl : 'data/SK.patt',
	})

	artoolkitMarker.addEventListener("markerFound", function mark (e){

		groupObjectsSK.matrixAutoUpdate  = true;
		groupObjectsSK.updateMatrix();

	//SK Marker Content
	var objLoader = new THREE.OBMLoader();
	objLoader.load(
		'resources/heads/SK.obm',
		function (props) {
			props.scale.set(0.008,0.008,0.008);
			props.rotation.y = 3.1;
			props.children[0].material = material;
			props.children[1].material = material;
			props.children[0].opacity = 1;
			props.children[0].geometry.center();
			props.children[1].geometry.center();
			props.position.set(0,0,-5.3);
			groupObjectsSK.add(props);
		},
	);
	var object;
	var materialLoader = new THREE.MTLLoader();
	materialLoader.load('resources/content/SK.mtl', function (material) {
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(material)
		objLoader.load(
			'resources/content/SK.obj',
			function (object) {
				object.scale.set(0.2,0.2,0.2);
				object.rotation.x = -1.5;
				object.position.set(0,0,-2.3);
				groupObjectsSK.add(object);
			}
		)
	})
	groupObjectsSK.position.set(0,0,2.3);

	groupObjectsSK.remove(holder);

	groupObjectsSK.matrixAutoUpdate  = true;
	groupObjectsSK.updateMatrix();

	groupObjectsSK.children[0].rotationneedsUpdate = true;

	this.removeEventListener("markerFound", mark);

});

	// ZH Marker
	//Create a group for all objects for this particular marker
	var zhGroup;
	var groupObjectsZH = new THREE.Object3D();
	var holder = new THREE.Object3D();
	zhGroup = new THREE.Group
	scene.add(zhGroup);
	groupObjectsZH.add(holder);
	zhGroup.add(groupObjectsZH);

	// Declare which marker is to be detected
	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, zhGroup, {
		type : 'pattern',
		patternUrl : 'data/ZH.patt',
	})

	artoolkitMarker.addEventListener("markerFound", function mark (e){

	//ZH Marker Content
	var objLoader = new THREE.OBMLoader();
	objLoader.load(
		'resources/heads/ZH.obm',
		function (props) {
			props.scale.set(0.008,0.008,0.008);
			props.rotation.y = 3.1;
			props.children[0].material = material;
			props.children[1].material = material;
			props.children[0].opacity = 1;
			props.children[0].geometry.center();
			props.children[1].geometry.center();
			props.position.set(0,0,-5.3);
			groupObjectsZH.add(props);
		},
	);
	var object;
	var materialLoader = new THREE.MTLLoader();
	materialLoader.load('resources/content/ZH.mtl', function (material) {
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(material)
		objLoader.load(
			'resources/content/ZH.obj',
			function (object) {
				object.scale.set(0.2,0.2,0.2);
				object.rotation.x = -1.5;
				object.position.set(0,0,-2.3);
				groupObjectsZH.add(object);
			}
		)
	})
	groupObjectsZH.position.set(0,0,2.3);

	groupObjectsZH.remove(holder);

	groupObjectsZH.matrixAutoUpdate  = true;
	groupObjectsZH.updateMatrix();

	this.removeEventListener("markerFound", mark);

});

//////////////////////////////////////////////////////////////////////////////////
//		Render the content (will render content for particular detected marker)
//////////////////////////////////////////////////////////////////////////////////

  function render () {
    requestAnimationFrame( render );

    if( arToolkitSource.ready === false )	return
		arToolkitContext.update( arToolkitSource.domElement )

		// Update scene.visible if the marker is seen
		scene.visible = camera.visible

		jwGroup.children[0].matrixAutoUpdate  = true;
		jwGroup.children[0].updateMatrix();

		// Spinning head animation
		jwGroup.children[0].children[0].rotation.z -= 0.02;
		jpGroup.children[0].children[0].rotation.z -= 0.02;
		ayGroup.children[0].children[0].rotation.z -= 0.02;
		blGroup.children[0].children[0].rotation.z -= 0.02;
		dzGroup.children[0].children[0].rotation.z -= 0.02;
		elGroup.children[0].children[0].rotation.z -= 0.02;
		esGroup.children[0].children[0].rotation.z -= 0.02;
		jhGroup.children[0].children[0].rotation.z -= 0.02;
		kaGroup.children[0].children[0].rotation.z -= 0.02;
		kbGroup.children[0].children[0].rotation.z -= 0.02;
		lzGroup.children[0].children[0].rotation.z -= 0.02;
		nwGroup.children[0].children[0].rotation.z -= 0.02;
		shGroup.children[0].children[0].rotation.z -= 0.02;
		skGroup.children[0].children[0].rotation.z -= 0.02;
		zhGroup.children[0].children[0].rotation.z -= 0.02;

    // Render the scene and camera
    renderer.render( scene, camera);
  }
render();
