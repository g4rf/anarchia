/* global BABYLON */

import Anarchia from "./anarchia.js";

export function song(callback) {
    // sound already loaded
    if(Anarchia.sounds.song) {
        Anarchia.sounds.song.play();
        callback();
        return;
    }
    
    // load sound
    let callbackHideLoading = function() {
        Anarchia.hideLoading();
        Anarchia.sounds.song.play();
        callback();
    };
    Anarchia.showLoading();
    Anarchia.sounds.song = new BABYLON.Sound("anarchia", "audio/anarchia.mp3", 
        Anarchia.scene, callbackHideLoading, { 
            length: Anarchia.END_SECOND - Anarchia.START_SECOND,
            offset: Anarchia.START_SECOND,
            loop: false,
            autoplay: false
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