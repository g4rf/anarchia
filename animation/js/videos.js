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