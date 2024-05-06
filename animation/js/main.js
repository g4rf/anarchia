/* global BABYLON */

/** imports **/
import Anarchia from "./anarchia.js";
import * as Landscape from "./landscape.js";
import * as Performer from "./performer.js";
import * as Events from "./events.js";


/** initialization **/
Anarchia.showLoading();

Anarchia.canvas = document.getElementById("render");
Anarchia.engine = new BABYLON.Engine(Anarchia.canvas, true);
Anarchia.scene = new BABYLON.Scene(Anarchia.engine);


/** recordings ? **/

// ccapture
//Anarchia.ccapture = true;

// BabylonJS VideoRecorder
//Anarchia.videorecorder = true;

/** settings **/

// which part to render
// won't work perfectly as events are only triggered, when on the exact frame
//Anarchia.duration(103, 164);
Anarchia.duration(-3, 164); // whole film

// hide unmute button; we handle this on our own
BABYLON.Engine.audioEngine.useCustomUnlockedButton = true;

// optimization
Anarchia.scene.skipPointerMovePicking = true; // we have no mouse interaction
Anarchia.scene.physicsEnabled = false; // no physics
Anarchia.scene.collisionsEnabled = false; // no collisions
Anarchia.scene.fogEnabled = false; // no fog
Anarchia.scene.lensFlaresEnabled = false; // no lens flare effects
Anarchia.scene.particlesEnabled = false; // no particles
Anarchia.scene.shadowsEnabled = false; // no computed shadows
Anarchia.scene.skeletonsEnabled = false; // no skeletons
Anarchia.scene.autoClear = false; // color buffer
Anarchia.scene.autoClearDepthAndStencil = false; // depth and stencil buffer

// used for aplha blended textures
Anarchia.canvas.getContext("webgl2").getExtension("EXT_float_blend");


/** light **/
const light = new BABYLON.HemisphericLight("light", 
    new BABYLON.Vector3(0, 1, 0));
// as we don't have real 3d objects/lights, set it all to pure white
light.diffuse = new BABYLON.Color3(1, 1, 1);
light.specular = new BABYLON.Color3(1, 1, 1);
light.groundColor = new BABYLON.Color3(1, 1, 1);


/** landscape **/
Landscape.headline();
Landscape.background();
Landscape.signCredentials();
Landscape.tvtower();
Landscape.houses();
Landscape.toilet();
Landscape.heinrichplatz();
Landscape.charlottenburg();

/** performer **/
Performer.camera(); // also holds the cinema

Performer.ufoFly();
Performer.ufoLand();
Performer.control();
Performer.ufoSpace();

Performer.aliens();
Performer.humans();
Performer.punks();
Performer.police();

Performer.dustclouds();

Performer.balloons();

Performer.combats();


/** gui events **/
Events.bind();


/** calculate screen size **/
(function() {
    let width = $("screen").innerWidth();
    
    // with inspector
    if(window.location.hash == "#inspector") {
         width -= 600;
         Anarchia.scene.debugLayer.show({
            globalRoot: $("body").get(0),
            overlay: true,
            enablePopup: false,
            embedMode: false // one pane left, one right
        });
    }
     
    let zoom = width / 1920;
    $(".scale").css({
        "transform": "scale(" + zoom + ")"
    });
})();

/** show buttons **/
Anarchia.hideLoading(function() {
    Anarchia.showButtons();
});
