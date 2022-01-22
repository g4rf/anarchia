/* global BABYLON */

/** imports **/
import Anarchia from "./anarchia.js";
import * as Landscape from "./landscape.js";
import * as Performer from "./performer.js";
import * as Sounds from "./sounds.js";
import * as Events from "./events.js";


/** initialization **/
Anarchia.canvas = document.getElementById("render");
Anarchia.engine = new BABYLON.Engine(Anarchia.canvas, true);
Anarchia.scene = new BABYLON.Scene(Anarchia.engine);
Anarchia.animations = new BABYLON.AnimationGroup("animations");


/** settings **/
Anarchia.scene.useOrderIndependentTransparency = true;
// which part to render; ! won't work perfectly
Anarchia.duration(14, 14);


/** light **/
const light = new BABYLON.HemisphericLight("light", 
    new BABYLON.Vector3(0, 1, 0));
light.diffuse = new BABYLON.Color3(1, 1, 1);
light.specular = new BABYLON.Color3(1, 1, 1);
light.groundColor = new BABYLON.Color3(1, 1, 1);


/** landscape **/
Landscape.background();
Landscape.tvtower();
Landscape.heinrichplatz();
Landscape.houses();
Landscape.headline();
Landscape.signCredentials();


/** performer **/
Performer.ufoFly();
Performer.ufoLand();



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
Sounds.song(function() { // music ready
    // when we have sound we can render the scene and show the buttons
    Anarchia.engine.runRenderLoop(function () {
        Anarchia.scene.render();
    });

    // hide loading
    document.getElementById("loading").classList.add("hidden");
    // show button bar
    document.getElementById("bar").classList.remove("hidden");
});

/** gui events **/
Events.bind();