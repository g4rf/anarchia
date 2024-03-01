/* global BABYLON */

import Anarchia from "./anarchia.js";

export function bind() {
    // watch for canvas resize events
    window.addEventListener("resize", function() {
        Anarchia.engine.resize();
    });

    // play
    document.getElementById("play").addEventListener("click", function() {
        Anarchia.play();
    });

    // stop
    document.getElementById("stop").addEventListener("click", function() {
        window.location.reload();
        
        // that would be great but won't work with Animation events:
        /* // stop and reset all animations
        for(let sound in Anarchia.sounds) {
            if(Anarchia.sounds[sound]) Anarchia.sounds[sound].stop();
        }*/
    });

    // record
    document.getElementById("record").addEventListener("click", function() {
        const recorder = new BABYLON.VideoRecorder(Anarchia.engine);
        recorder.startRecording("anarchia.webm", Anarchia.END_SECOND);

        document.getElementById("play").click();
    });

    // inspector
    document.getElementById("inspector").addEventListener("click", function() {
        Anarchia.scene.debugLayer.show({
            overlay: true,
            enablePopup: false,
            embedMode: true // both panes on the right
        });
    });
}
