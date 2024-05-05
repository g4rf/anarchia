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
}
