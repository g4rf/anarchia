/* global BABYLON, Anarchia */

/** initialization **/
Anarchia.canvas = document.getElementById("render");
Anarchia.engine = new BABYLON.Engine(Anarchia.canvas, true);
Anarchia.scene = new BABYLON.Scene(Anarchia.engine);


/** settings **/
Anarchia.scene.useOrderIndependentTransparency = true;

/** light **/
const light = new BABYLON.HemisphericLight("light", 
    new BABYLON.Vector3(0, 1, 0));
light.diffuse = new BABYLON.Color3(1, 1, 1);
light.specular = new BABYLON.Color3(1, 1, 1);
light.groundColor = new BABYLON.Color3(1, 1, 1);

/** landscape **/
import "landscape.js";

/** sign **/
let signCredentialsStartRotationX = 0.7 * Math.PI;
let signCredentialsHeight = 3.5;
let signCredentialsWidth = signCredentialsHeight * 1920 / 2510;
const signCredentials = BABYLON.MeshBuilder.CreatePlane("signCredentials", {
    height: signCredentialsHeight,
    width: signCredentialsWidth
});
signCredentials.position.y = 14.8;
signCredentials.position.x = -2;
signCredentials.position.z = -50;

signCredentials.rotation.x = signCredentialsStartRotationX;

const signCredentialsMaterial = new BABYLON.StandardMaterial("signCredentialsMaterial");
signCredentialsMaterial.diffuseTexture = new BABYLON.Texture("textures/sign.png");
signCredentialsMaterial.diffuseTexture.hasAlpha = true;
signCredentials.material = signCredentialsMaterial;
// swing sign up
const aSwingSignUp = new BABYLON.Animation(
    "aSwingSignUp",
    "rotation.x",
    Anarchia.FRAME_RATE,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
);
aSwingSignUp.setKeys([
    { frame: 0 * Anarchia.FRAME_RATE, value: signCredentialsStartRotationX },
    { frame: 2 * Anarchia.FRAME_RATE, value: signCredentialsStartRotationX },
    { frame: 2.5 * Anarchia.FRAME_RATE, value: 0 * Math.PI }
]);
// end event, remove sign
aSwingSignUp.addEvent(new BABYLON.AnimationEvent(
    4 * Anarchia.FRAME_RATE, function() {
        Anarchia.scene.removeMesh(signCredentials);
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
});
ufofly.position.y = ufoflyStartY;
ufofly.position.x = 1;
ufofly.position.z = 5;    
const ufoflyMaterial = new BABYLON.StandardMaterial("ufoflyMaterial");
ufoflyMaterial.diffuseTexture = new BABYLON.Texture("textures/ufo_fly.png");
ufoflyMaterial.diffuseTexture.hasAlpha = true;
ufofly.material = ufoflyMaterial;
// move ufo down
const aMoveUfoDown = new BABYLON.Animation(
    "aMoveUfoDown",
    "position.y",
    Anarchia.FRAME_RATE,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
);
aMoveUfoDown.setKeys([
    { frame:  0 * Anarchia.FRAME_RATE, value: ufoflyStartY },
    { frame:  6 * Anarchia.FRAME_RATE, value: ufoflyStartY },
    { frame: 11 * Anarchia.FRAME_RATE, value: 3 }
]);
// end event, remove ufo
aMoveUfoDown.addEvent(new BABYLON.AnimationEvent(
    11 * Anarchia.FRAME_RATE, function() {
        Anarchia.scene.removeMesh(ufofly);
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
});
ufoland.position.y = ufolandStartY;
ufoland.position.x = -3.5;
ufoland.position.z = 5;    
const ufolandMaterial = new BABYLON.StandardMaterial("ufolandMaterial");
ufolandMaterial.diffuseTexture = new BABYLON.Texture("textures/ufo_landed.png");
ufolandMaterial.diffuseTexture.hasAlpha = true;
ufoland.material = ufolandMaterial;
// move ufo down
const aMoveUfoLand = new BABYLON.Animation(
    "aMoveUfoLand",
    "position.y",
    Anarchia.FRAME_RATE,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
);
aMoveUfoLand.setKeys([
    { frame:  0 * Anarchia.FRAME_RATE, value: ufolandStartY },
    { frame: 11 * Anarchia.FRAME_RATE, value: ufolandStartY },
    { frame: 16 * Anarchia.FRAME_RATE, value: 4.7 }
]);


/** camera **/
let cameraVectors = [
    new BABYLON.Vector3(0, 17, -55),
    new BABYLON.Vector3(-1, 5.5, 0)
];    
let camera = new BABYLON.UniversalCamera("camera", cameraVectors[0]);

// move camera towards place
const aMoveCameraToPlace = new BABYLON.Animation(
    "aMoveCameraToPlace",
    "position",
    Anarchia.FRAME_RATE,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
);
aMoveCameraToPlace.setKeys([
    { frame:  0 * Anarchia.FRAME_RATE, value: cameraVectors[0] },
    { frame:  9 * Anarchia.FRAME_RATE, value: cameraVectors[0] },
    { frame: 14 * Anarchia.FRAME_RATE, value: cameraVectors[1] }
]);
// remove headline
aMoveCameraToPlace.addEvent(new BABYLON.AnimationEvent(
    14 * Anarchia.FRAME_RATE, function() {
        Anarchia.scene.removeMesh(headline);
    }, true
));


/** start animations **/

// swing sign up
Anarchia.scene.beginDirectAnimation(signCredentials, [aSwingSignUp], 
    Anarchia.START_FRAME, Anarchia.END_FRAME, false);
// ufo fly
Anarchia.scene.beginDirectAnimation(ufoland, [aMoveUfoLand], 
    Anarchia.START_FRAME, Anarchia.END_FRAME, false);
// ufo landed
Anarchia.scene.beginDirectAnimation(ufofly, [aMoveUfoDown], 
    Anarchia.START_FRAME, Anarchia.END_FRAME, false);
// camera
Anarchia.scene.beginDirectAnimation(camera, [aMoveCameraToPlace], 
    Anarchia.START_FRAME, Anarchia.END_FRAME, false);


/** music **/
Anarchia.music = new BABYLON.Sound("anarchia", "audio/Anarchia.mp3", 
    Anarchia.scene, function() { /* nothing to do when loaded */ }, { 
        length: Anarchia.END_SECOND,
        offset: Anarchia.START_SECOND,
        loop: false,
        autoplay: false
    }
);