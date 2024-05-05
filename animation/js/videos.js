/* global BABYLON */

import Anarchia from "./anarchia.js";

export let ready = false;

export function load() {
    for (const video of document.getElementsByTagName("video")) {
        if(video.readyState != 4) { // HAVE_ENOUGH_DATA
            console.log("Waiting for video", video);
            window.setTimeout(load, 100);
            return;
        }
    }
    ready = true;
}

function play(selector) {
    return; // REC
    $(selector).removeClass("hidden").get(0).play();
}

function stop(selector) {
    return; // REC
    $(selector).addClass("hidden").get(0).pause();
}

export function playCreepyStone() {
    play("#creepy-stone");
}

export function stopCreepyStone() {
    stop("#creepy-stone");
}

export function playCameraRewind() {
    play("#camera-rewind");
}

export function stopCameraRewind() {
    stop("#camera-rewind");
}