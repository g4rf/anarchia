/* global Anarchia, BABYLON */

// watch for canvas resize events
window.addEventListener("resize", function() {
    Anarchia.engine.resize();
});


/*************/
/** buttons **/
/*************/

// play
document.getElementById("play").addEventListener("click", function() {
    // music on
    Anarchia.music.play();
    
    // screen on
    Anarchia.engine.runRenderLoop(function () {
        Anarchia.scene.render();
    });
});

// stop
document.getElementById("stop").addEventListener("click", function() {
    window.location.reload();
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