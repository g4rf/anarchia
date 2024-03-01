/* global BABYLON */

/** imports **/
import Anarchia from "./anarchia.js";
import * as Landscape from "./landscape.js";
import * as Performer from "./performer.js";
import * as Events from "./events.js";


/** initialization **/
Anarchia.canvas = document.getElementById("render");
Anarchia.engine = new BABYLON.Engine(Anarchia.canvas, true);
Anarchia.scene = new BABYLON.Scene(Anarchia.engine);


/** settings **/
Anarchia.scene.useOrderIndependentTransparency = true;
// which part to render; !!! won't work perfectly
Anarchia.duration(0, 200);


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

Performer.aliens();
Performer.humans();
Performer.punks();

Performer.balloons();

// ToDo
// - 
// –––––

/** screen on **/
Anarchia.engine.runRenderLoop(function () {
    Anarchia.scene.render();
});

Anarchia.hideLoading();

/** music will be loaded by click on play as the security settings forces this.
 * Firefox:
 * Ein AudioContext wurde an der automatischen Wiedergabe gehindert. Er muss 
 * nach Interaktion des Benutzers mit der Seite erstellt oder fortgesetzt 
 * werden.
 **/

/** gui events **/
Events.bind();

/** show inspector **/
Anarchia.scene.debugLayer.show({
    overlay: true,
    enablePopup: false,
    embedMode: true // both panes on the right
});