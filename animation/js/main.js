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
Anarchia.scene.useOrderIndependentTransparency = true;
// which part to render; !!! won't work perfectly
Anarchia.duration(80, 99);


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


/** performer **/
Performer.camera();

Performer.ufoFly();
Performer.ufoLand();
Performer.controlpanel();

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
            overlay: true,
            enablePopup: false,
            embedMode: false // one pane left, one right
        });
    }
     
    let zoom = width / 1920;
    $("#render").css({
        "transform": "scale(" + zoom + ")"
    });
})();

/** show buttons **/
Anarchia.hideLoading(function() {
    Anarchia.showButtons();
});