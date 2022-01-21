/* global BABYLON */

/** imports **/
import Anarchia from "./anarchia.js";
import * as Landscape from "./landscape.js";
import * as Events from "./events.js";


/** initialization **/
Anarchia.canvas = document.getElementById("render");
Anarchia.engine = new BABYLON.Engine(Anarchia.canvas, true);
Anarchia.scene = new BABYLON.Scene(Anarchia.engine);
Anarchia.animations = new BABYLON.AnimationGroup("animations");


/** settings **/
Anarchia.scene.useOrderIndependentTransparency = true;
Anarchia.duration(0, 20);


/** light **/
const light = new BABYLON.HemisphericLight("light", 
    new BABYLON.Vector3(0, 1, 0));
light.diffuse = new BABYLON.Color3(1, 1, 1);
light.specular = new BABYLON.Color3(1, 1, 1);
light.groundColor = new BABYLON.Color3(1, 1, 1);


/** landscape **/
Landscape.create();


/** sign **/
var rotationX = 0.7 * Math.PI;
var height = 3.5;
const signCredentials = Anarchia.createPlane({
    name: "signCredentials",
    texture: "textures/sign.png",
    height: height,
    width: height * 1920 / 2510,
    positionX: -2,
    positionY: 14.8,
    positionZ: -50,
    rotationX: rotationX
});
Anarchia.createAnimation(signCredentials, {
    name: "swingSignUp",
    property: "rotation.x"
},[ // keys
    { frame: 0 * Anarchia.FRAME_RATE, value: rotationX },
    { frame: 2 * Anarchia.FRAME_RATE, value: rotationX },
    { frame: 2.5 * Anarchia.FRAME_RATE, value: 0 * Math.PI }
],{ // easing
    type: new BABYLON.SineEase(),
    mode: BABYLON.EasingFunction.EASINGMODE_EASEOUT
});


/** ufo fly **/
var height = 3;
var startY = 45;
const ufoFly = Anarchia.createPlane({
    name: "ufoFly",
    texture: "textures/ufo_fly.png",
    height: height,
    width: height * 1157 / 501,
    positionX: 1,
    positionY: startY,
    positionZ: 5
});
Anarchia.createAnimation(ufoFly, {
    name: "moveUfoDown",
    property: "position.y"
},[ // keys
    { frame:  0 * Anarchia.FRAME_RATE, value: startY },
    { frame:  6 * Anarchia.FRAME_RATE, value: startY },
    { frame: 11 * Anarchia.FRAME_RATE, value: 3 }
],{ // easing
    type: new BABYLON.ExponentialEase(2),
    mode: BABYLON.EasingFunction.EASINGMODE_EASEOUT
});



/** ufo land **/
var height = 1;
var startY = 7;
const ufoLand = Anarchia.createPlane({
    name: "ufoLand",
    texture: "textures/ufo_landed.png",
    height: height,
    width: height * 1156 / 768,
    positionX: -3.5,
    positionY: startY,
    positionZ: 5
});
Anarchia.createAnimation(ufoLand, {
    name: "moveUfoLand",
    property: "position.y"
},[ // keys
    { frame:  0 * Anarchia.FRAME_RATE, value: startY },
    { frame: 11 * Anarchia.FRAME_RATE, value: startY },
    { frame: 16 * Anarchia.FRAME_RATE, value: 4.7 }
],{ // easing
    type: new BABYLON.ExponentialEase(2),
    mode: BABYLON.EasingFunction.EASINGMODE_EASEOUT
});


/** camera **/
const cameraVectors = [
    new BABYLON.Vector3(0, 17, -55),
    new BABYLON.Vector3(-1, 5.5, 0)
];    
const camera = new BABYLON.UniversalCamera("camera", cameraVectors[0]);

Anarchia.createAnimation(camera, {
    name: "moveCameraToHeinrichplatz",
    property: "position",
    type: BABYLON.Animation.ANIMATIONTYPE_VECTOR3
},[ // keys
    { frame:  0 * Anarchia.FRAME_RATE, value: cameraVectors[0] },
    { frame:  9 * Anarchia.FRAME_RATE, value: cameraVectors[0] },
    { frame: 14 * Anarchia.FRAME_RATE, value: cameraVectors[1] }
],
false // no easing
,[ // events
    { // remove ufo
        second: 11,
        callback: function() {
            Anarchia.scene.removeMesh(Anarchia.scene.getMeshByName("ufoFly"));
        }
    }
]);

/** animations **/
Anarchia.animations.normalize(Anarchia.START_FRAME, Anarchia.END_FRAME);

// screen on
Anarchia.engine.runRenderLoop(function () {
    Anarchia.scene.render();
});

/** music **/
Anarchia.music = new BABYLON.Sound("anarchia", "audio/Anarchia.mp3", 
    Anarchia.scene, function() { // music ready
        // when we have sound we can render the scene and show the buttons
        Anarchia.engine.runRenderLoop(function () {
            Anarchia.scene.render();
        });
        
        // hide loading
        document.getElementById("loading").classList.add("hidden");
        // show bar
        document.getElementById("bar").classList.remove("hidden");
    }, { 
        length: Anarchia.END_SECOND,
        offset: Anarchia.START_SECOND,
        loop: false,
        autoplay: false
    }
);

/** gui events **/
Events.bind();