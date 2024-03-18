/* global BABYLON */

import Anarchia from "./anarchia.js";

export function bind() {
    // play
    document.getElementById("play").addEventListener("click", function() {
        Anarchia.play();
    });

    // reload (aka stop)
    document.getElementById("reload").addEventListener("click", function() {
        window.location.reload();
    });

    // record
    document.getElementById("record").addEventListener("click", function() {
        const recorder = new BABYLON.VideoRecorder(Anarchia.engine);
        recorder.startRecording(
                "anarchia.webm",
                Anarchia.END_SECOND - Anarchia.START_SECOND
        );

        Anarchia.play();
    });

    // inspector
    document.getElementById("inspector").addEventListener("click", function() {
        Anarchia.scene.debugLayer.show({
            overlay: true,
            enablePopup: false,
            embedMode: false // one pane left, one right
        });
    });
}
