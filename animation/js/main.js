

/**
 * Generates random number between min (inclusive) and max (inclusive).
 * @param {Number} min inclusive minimum number
 * @param {Number} max inclusive maximum number
 * @returns {Number} A random number.
 */
const getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max) + 1;
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Creates the scene, that will be looped.
 * @returns {createScene.scene|BABYLON.Scene} The scene.
 */
const createScene = function() {
    const scene = new BABYLON.Scene(engine);
    
    // settings
    scene.useOrderIndependentTransparency = true;
    
    
    /** light **/
    const light = new BABYLON.HemisphericLight("light", 
        new BABYLON.Vector3(0, 1, 0));
    light.diffuse = new BABYLON.Color3(1, 1, 1);
	light.specular = new BABYLON.Color3(1, 1, 1);
	light.groundColor = new BABYLON.Color3(1, 1, 1);
    
    
    /** background **/
    let skyHeight = 60;
    let skyWidth = 110;
    const sky = BABYLON.MeshBuilder.CreatePlane("plane", {
        height: skyHeight,
        width: skyWidth
    }, scene);
    sky.position.y = skyHeight / 2 - 13;
    sky.position.z = 16;
        
    const skyMaterial = new BABYLON.StandardMaterial("skyMaterial", scene);
    skyMaterial.diffuseTexture = new BABYLON.Texture("textures/city-horizon.jpg", scene);
    sky.material = skyMaterial;
    
	    
    /** tv tower **/
    let tvtowerHeight = 40;
    let tvtowerWidth = tvtowerHeight * 200 / 1000;
    const tvtower = BABYLON.MeshBuilder.CreatePlane("tvtower", {
        height: tvtowerHeight,
        width: tvtowerWidth
    }, scene);
    tvtower.position.y = tvtowerHeight / 2;
    tvtower.position.x = -7;
    tvtower.position.z = 0;
    
    const tvtowerMaterial = new BABYLON.StandardMaterial("tvtowerMaterial", scene);
    tvtowerMaterial.diffuseTexture = new BABYLON.Texture("textures/tvtower_plane.png", scene);
    tvtowerMaterial.diffuseTexture.hasAlpha = true;
    tvtower.material = tvtowerMaterial;
    
    
    /** heinrichplatz **/
    let placeHeight = 11;
    let placeWidth = 20;
    const place = BABYLON.MeshBuilder.CreatePlane("place", {
        height: placeHeight,
        width: placeWidth
    }, scene);    
    place.position.y = placeHeight / 2;
    place.position.x = -1;
    place.position.z = 13;
    
    const placeMaterial = new BABYLON.StandardMaterial("placeMaterial", scene);
    placeMaterial.diffuseTexture = new BABYLON.Texture("textures/heinrichplatz.png", scene);
    placeMaterial.diffuseTexture.hasAlpha = true;
    place.material = placeMaterial;
    
    
    /** houses **/
    let houses = [
        { height: 12, x: -27, z: -1, offset:  1},
        { height: 15, x: -23, z: -2, offset:  2},
        { height:  9, x: -15, z: -3, offset:  3},
        { height: 18, x: -18, z: -3, offset:  4},
        { height: 15, x:  -6, z: -4, offset:  5},
        { height: 14, x:  -4, z: -6, offset:  6},
        { height: 12, x:   1, z: -2, offset:  7},
        { height: 10, x:   4, z: -7, offset:  8},
        { height: 16, x:   4, z: -5, offset:  9},
        { height: 22, x:  15, z: -4, offset: 10},
        { height: 12, x:  21, z: -6, offset: 11},
        { height: 10, x:  15, z: -5, offset: 12},
        { height: 12, x:  24, z: -2, offset: 13}
    ];
    houses.forEach(function(data, i) {
        //return;
        let height = data.height; let width = height;
        const house = BABYLON.MeshBuilder.CreatePlane("house" + i, {
            height: height,
            width: width
        }, scene);
        house.position.y = height / 2;
        house.position.x = data.x;
        house.position.z = data.z;

        const mat = new BABYLON.StandardMaterial("houseMaterial" + i, scene);
        mat.diffuseTexture = new BABYLON.Texture("textures/houses.png", scene);
        mat.diffuseTexture.hasAlpha = true;
        mat.diffuseTexture.uScale = 0.2;
        mat.diffuseTexture.uOffset = data.offset * 0.2;
        mat.diffuseTexture.vOffset = 0;
        mat.diffuseTexture.vScale = 1;            
        house.material = mat;
    });
    
    
    /** headline **/
    let headlineHeight = 18;
    let headlineWidth = headlineHeight * 3226 / 1174;
    const headline = BABYLON.MeshBuilder.CreatePlane("headline", {
        height: headlineHeight,
        width: headlineWidth
    }, scene);
    headline.position.y = 25;
    headline.position.x = 20;
    headline.position.z = 9;
    
    const headlineMaterial = new BABYLON.StandardMaterial("headlineMaterial", scene);
    headlineMaterial.diffuseTexture = new BABYLON.Texture("textures/headline.png", scene);
    headlineMaterial.diffuseTexture.hasAlpha = true;
    headline.material = headlineMaterial;
    
    
    /** sign **/
    let signCredentialsStartRotationX = 0.7 * Math.PI;
    let signCredentialsHeight = 3.5;
    let signCredentialsWidth = signCredentialsHeight * 1920 / 2510;
    const signCredentials = BABYLON.MeshBuilder.CreatePlane("signCredentials", {
        height: signCredentialsHeight,
        width: signCredentialsWidth
    }, scene);
    signCredentials.position.y = 14.8;
    signCredentials.position.x = -2;
    signCredentials.position.z = -50;
    
    signCredentials.rotation.x = signCredentialsStartRotationX;
    
    const signCredentialsMaterial = new BABYLON.StandardMaterial("signCredentialsMaterial", scene);
    signCredentialsMaterial.diffuseTexture = new BABYLON.Texture("textures/sign.png", scene);
    signCredentialsMaterial.diffuseTexture.hasAlpha = true;
    signCredentials.material = signCredentialsMaterial;
    // swing sign up
    const aSwingSignUp = new BABYLON.Animation(
        "aSwingSignUp",
        "rotation.x",
        FRAME_RATE,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    aSwingSignUp.setKeys([
        { frame: 0 * FRAME_RATE, value: signCredentialsStartRotationX },
        { frame: 2 * FRAME_RATE, value: signCredentialsStartRotationX },
        { frame: 2.5 * FRAME_RATE, value: 0 * Math.PI }
    ]);
    // end event, remove sign
    aSwingSignUp.addEvent(new BABYLON.AnimationEvent(
        4 * FRAME_RATE, function() {
            scene.removeMesh(signCredentials);
        }, true
    ));
    // easing
    let easingSwingSignUp = new BABYLON.SineEase();
    easingSwingSignUp.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
    aSwingSignUp.setEasingFunction(easingSwingSignUp);
    
    
    /** ufo fly **/
    let ufoflyStartY = 45;
    let ufoflyHeight = 3;
    let ufoflyWidth = ufoflyHeight * 1157 / 501;
    const ufofly = BABYLON.MeshBuilder.CreatePlane("ufofly", {
        height: ufoflyHeight,
        width: ufoflyWidth
    }, scene);    
    ufofly.position.y = ufoflyStartY;
    ufofly.position.x = 1;
    ufofly.position.z = 5;    
    const ufoflyMaterial = new BABYLON.StandardMaterial("ufoflyMaterial", scene);
    ufoflyMaterial.diffuseTexture = new BABYLON.Texture("textures/ufo_fly.png", scene);
    ufoflyMaterial.diffuseTexture.hasAlpha = true;
    ufofly.material = ufoflyMaterial;
    // move ufo down
    const aMoveUfoDown = new BABYLON.Animation(
        "aMoveUfoDown",
        "position.y",
        FRAME_RATE,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    aMoveUfoDown.setKeys([
        { frame:  0 * FRAME_RATE, value: ufoflyStartY },
        { frame:  6 * FRAME_RATE, value: ufoflyStartY },
        { frame: 11 * FRAME_RATE, value: 3 }
    ]);
    // end event, remove ufo
    aMoveUfoDown.addEvent(new BABYLON.AnimationEvent(
        11 * FRAME_RATE, function() {
            scene.removeMesh(ufofly);
        }, true
    ));
    // easing
    let easingMoveUfoDown = new BABYLON.ExponentialEase(2);
    easingMoveUfoDown.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
    aMoveUfoDown.setEasingFunction(easingMoveUfoDown);
        
    
    /** ufo land **/
    let ufolandStartY = 7;
    let ufolandHeight = 1;
    let ufolandWidth = ufolandHeight * 1156 / 768;
    const ufoland = BABYLON.MeshBuilder.CreatePlane("ufoland", {
        height: ufolandHeight,
        width: ufolandWidth
    }, scene);
    ufoland.position.y = ufolandStartY;
    ufoland.position.x = -3.5;
    ufoland.position.z = 5;    
    const ufolandMaterial = new BABYLON.StandardMaterial("ufolandMaterial", scene);
    ufolandMaterial.diffuseTexture = new BABYLON.Texture("textures/ufo_landed.png", scene);
    ufolandMaterial.diffuseTexture.hasAlpha = true;
    ufoland.material = ufolandMaterial;
    // move ufo down
    const aMoveUfoLand = new BABYLON.Animation(
        "aMoveUfoLand",
        "position.y",
        FRAME_RATE,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    aMoveUfoLand.setKeys([
        { frame:  0 * FRAME_RATE, value: ufolandStartY },
        { frame: 11 * FRAME_RATE, value: ufolandStartY },
        { frame: 16 * FRAME_RATE, value: 4.7 }
    ]);
    
    
    /** camera **/
    let cameraVectors = [
        new BABYLON.Vector3(0, 17, -55),
        new BABYLON.Vector3(-1, 5.5, 0)
    ];    
    let camera = new BABYLON.UniversalCamera("camera", cameraVectors[0], scene);
    
    // move camera towards place
    const aMoveCameraToPlace = new BABYLON.Animation(
        "aMoveCameraToPlace",
        "position",
        FRAME_RATE,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    aMoveCameraToPlace.setKeys([
        { frame:  0 * FRAME_RATE, value: cameraVectors[0] },
        { frame:  9 * FRAME_RATE, value: cameraVectors[0] },
        { frame: 14 * FRAME_RATE, value: cameraVectors[1] },
    ]);
    // remove headline
    aMoveCameraToPlace.addEvent(new BABYLON.AnimationEvent(
        14 * FRAME_RATE, function() {
            scene.removeMesh(headline);
        }, true
    ));
    

    /** start animations **/
    
    // swing sign up
    scene.beginDirectAnimation(signCredentials, [aSwingSignUp], START, END, false);
    // ufo fly
    scene.beginDirectAnimation(ufoland, [aMoveUfoLand], START, END, false);
    // ufo landed
    scene.beginDirectAnimation(ufofly, [aMoveUfoDown], START, END, false);
    // camera
    scene.beginDirectAnimation(camera, [aMoveCameraToPlace], START, END, false);
    
    
    return scene;
};

// call the createScene function
const scene = createScene();
const music = new BABYLON.Sound("anarchia", "audio/Anarchia.mp3", scene, function() {
    // record on
    const recorder = new BABYLON.VideoRecorder(engine);
    //recorder.startRecording("test.webm", END / FRAME_RATE);
    
    // screen on
    engine.runRenderLoop(function () {
        scene.render();
    });
}, { length: END / FRAME_RATE, offset: START / FRAME_RATE, loop: false, autoplay: true });

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});