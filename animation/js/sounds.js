/* global BABYLON */

import Anarchia from "./anarchia.js";

export let ready = false; // becomes true when all sounds are loaded

const sounds = {
    music: null,
    cityNoise: null,
    landingUfo: null,
    jump: null,
    police: null,
    rumble: null
};

export function load() {
    const numberOfFiles = Object.keys(sounds).length;
    let loadedFiles = 0;

    function fileLoaded() {
        loadedFiles++;
        if (loadedFiles === numberOfFiles) ready = true;
        console.log("Loaded audio files:", loadedFiles);
    }
    
    // music
    let offset = Anarchia.START_SECOND;
    if(offset < 0) offset = 0;
    let length = Anarchia.END_SECOND - offset;
    sounds.music = new BABYLON.Sound("anarchia", "audio/anarchia.mp3", 
        Anarchia.scene, fileLoaded, { 
            length: length,
            offset: offset,
            loop: false,
            autoplay: false,
            spatialSound: false,
            volume: 1
        }
    );
    
    // city noise
    sounds.cityNoise = new BABYLON.Sound("city-noise", "audio/city-noise.mp3",
        Anarchia.scene, fileLoaded, {
            length: 15,
            offset: 21.0,
            loop: false, 
            autoplay: false,
            spatialSound: true,
            volume: 0 // to fade in
        }
    );
    
    // landing ufo
    sounds.landingUfo = new BABYLON.Sound("landing-ufo", "audio/landing-ufo.mp3",
        Anarchia.scene, fileLoaded, {
            //length: 15,
            //offset: 21.0,
            loop: false, 
            autoplay: false,
            spatialSound: true,
            volume: 0.2
        }
    );
    
    // jump
    sounds.jump = new BABYLON.Sound("jump", "audio/jump4.mp3",
        Anarchia.scene, fileLoaded, {
            //length: 15,
            //offset: 21.0,
            loop: false, 
            autoplay: false,
            spatialSound: true,
            volume: 0.3
        }
    );
    
    // police siren
    sounds.police = new BABYLON.Sound("police", "audio/police.mp3",
        Anarchia.scene, fileLoaded, {
            //length: 15,
            //offset: 21.0,
            loop: false, 
            autoplay: false,
            spatialSound: true,
            volume: 0.2
        }
    );
    
    // police rumble
    sounds.rumble = new BABYLON.Sound("rumble", "audio/rumble.mp3",
        Anarchia.scene, fileLoaded, {
            //length: 15,
            //offset: 21.0,
            loop: false, 
            autoplay: false,
            spatialSound: true,
            volume: 1.5
        }
    );
}

export function music() {
    //return;
    let wait = 0;
    if(Anarchia.START_SECOND < 0) {
        wait = -Anarchia.START_SECOND;
    }
    sounds.music.play(wait);
}

export function cityNoise() {
    // only play at the very beginning
    if(Anarchia.START_SECOND > -2) return;
    
    sounds.cityNoise.setVolume(1, 2.0); // fade from 0 to 1 in 2.0 seconds
    sounds.cityNoise.play();
}

export function landingUfo(ufo) {
    sounds.landingUfo.attachToMesh(ufo);
    sounds.landingUfo.play();
}

export function jump(mesh) {
    const jump = sounds.jump.clone();
    jump.attachToMesh(mesh);
    jump.play();
}

export function police(mesh) {
    sounds.police.attachToMesh(mesh);
    sounds.police.play();
}

export function rumble(mesh) {
    sounds.rumble.attachToMesh(mesh);
    sounds.rumble.play();
}