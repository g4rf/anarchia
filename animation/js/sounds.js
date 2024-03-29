/* global BABYLON */

import Anarchia from "./anarchia.js";

export function song(callback) {
    // load sound
    Anarchia.sounds.song = new BABYLON.Sound("anarchia", "audio/anarchia.mp3", 
        Anarchia.scene, callback, { 
            length: Anarchia.END_SECOND - Anarchia.START_SECOND,
            offset: Anarchia.START_SECOND,
            loop: false,
            autoplay: true,
            spatialSound: false
        }
    );
}

export function city(callback) {
    // TODO
    /*Anarchia.music = new BABYLON.Sound("anarchia", "audio/Anarchia.mp3", 
        Anarchia.scene, callback, { 
            length: Anarchia.END_SECOND,
            offset: Anarchia.START_SECOND,
            loop: false,
            autoplay: false
        }
    );*/
}