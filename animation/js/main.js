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


/** settings **/
// used for aplha blended textures
Anarchia.canvas.getContext("webgl2").getExtension("EXT_float_blend");
// this renders all alpha correctly, but hit performance
//Anarchia.scene.useOrderIndependentTransparency = true;
// which part to render; !!! won't work perfectly
Anarchia.duration(0.01, 164);


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