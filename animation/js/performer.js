/* global BABYLON */

import Anarchia from "./anarchia.js";

/**
 * Creates the camera and its movements.
 * @type BABYLON.UniversalCamera
 */
export function camera() {
    const cameraVectors = [
        new BABYLON.Vector3(0, 17, -55),
        new BABYLON.Vector3(-1, 5.5, 0)
    ];
    
    const camera = new BABYLON.UniversalCamera("camera", cameraVectors[0]);

    Anarchia.createAnimation(camera, {
        name: "moveCameraToHeinrichplatz",
        property: "position",
        type: BABYLON.Animation.ANIMATIONTYPE_VECTOR3
    },[ // keys
        { frame:  0 * Anarchia.FRAME_RATE, value: cameraVectors[0] },
        { frame:  9 * Anarchia.FRAME_RATE, value: cameraVectors[0] },
        { frame: 14 * Anarchia.FRAME_RATE, value: cameraVectors[1] },
        
        { frame: Anarchia.END_FRAME, value: cameraVectors[1] }
    ],{ // easing
        type: new BABYLON.SineEase(),
        mode: BABYLON.EasingFunction.EASINGMODE_EASEINOUT
    },[ // events
    ]);
    
    return camera;
}

/**
 * Creates the down flying ufo.
 * @returns {BABYLON.Mesh}
 */
export function ufoFly() {
    const height = 3;
    const startY = 45;
    
    const ufo = Anarchia.createPlane({
        name: "ufoFly",
        texture: "textures/ufo_fly.png",
        height: height,
        width: height * 1157 / 501,
        positionX: 1,
        positionY: startY,
        positionZ: 5
    });
    
    Anarchia.createAnimation(ufo, {
        name: "moveUfoDown",
        property: "position.y"
    },[ // keys
        { frame:  0 * Anarchia.FRAME_RATE, value: startY },
        { frame:  6 * Anarchia.FRAME_RATE, value: startY },
        { frame: 11 * Anarchia.FRAME_RATE, value: 0 },
        
        { frame: Anarchia.END_FRAME, value: 0 }
    ],{ // easing
        type: new BABYLON.ExponentialEase(2),
        mode: BABYLON.EasingFunction.EASINGMODE_EASEOUT
    },[
        { second: 11.1, callback: function() {
            ufo.isVisible = false;
        }}
    ]);
    
    return ufo;
}

/**
 * Creates the landing ufo.
 * @returns {BABYLON.Mesh}
 */
export function ufoLand() {
    const height = 1;
    const startY = 7;
    
    // the (whole) ufo
    const bottom = Anarchia.createPlane({
        name: "ufoLand",
        texture: "textures/ufo_landed_bottom.png",
        height: height,
        width: height * 1156 / 768,
        positionX: -3.5,
        positionY: startY,
        positionZ: 5
    });    
    // land animation
    Anarchia.createAnimation(bottom, {
        property: "position.y"
    },[ // keys
        { frame:  0 * Anarchia.FRAME_RATE, value: startY },
        { frame: 11 * Anarchia.FRAME_RATE, value: startY },
        { frame: 16 * Anarchia.FRAME_RATE, value: 4.7 },
        
        { frame: Anarchia.END_FRAME, value: 4.7 }
    ],{ // easing
        type: new BABYLON.ExponentialEase(2),
        mode: BABYLON.EasingFunction.EASINGMODE_EASEOUT
    });
    
    // the ufo top
    const top = Anarchia.createPlane({
        texture: "textures/ufo_landed_top.png",
        height: height,
        width: height * 1156 / 768,
        positionX: -3.5,
        positionY: startY,
        positionZ: 5.01
    });
    top.setParent(bottom);
        
    // open top
    const start = 16;
    const end = 20;
    const easing = {
        type: new BABYLON.ExponentialEase(10),
        mode: BABYLON.EasingFunction.EASINGMODE_EASEINOUT
    };
    Anarchia.createAnimation(top, {
        property: "rotation.z"
    },[ // keys
        { frame: 0 * Anarchia.FRAME_RATE, value: 0 * Math.PI },
        { frame: start * Anarchia.FRAME_RATE, value: 0 * Math.PI },
        { frame: end * Anarchia.FRAME_RATE, value: 0.5 * Math.PI },
        
        { frame: Anarchia.END_FRAME, value: 0.5 * Math.PI }
    ], easing);
    Anarchia.createAnimation(top, {
        property: "position.x"
    },[ // keys
        { frame:  0 * Anarchia.FRAME_RATE, value: 0 },
        { frame: start * Anarchia.FRAME_RATE, value: 0 },
        { frame: end * Anarchia.FRAME_RATE, value: -0.113 },
        
        { frame: Anarchia.END_FRAME, value: -0.113 }
    ], easing);
    Anarchia.createAnimation(top, {
        property: "position.y"
    },[ // keys
        { frame: 0 * Anarchia.FRAME_RATE, value: 0 },
        { frame: start * Anarchia.FRAME_RATE, value: 0 },
        { frame: end * Anarchia.FRAME_RATE, value: 0.465 },
        
        { frame: Anarchia.END_FRAME, value: 0.465 }
    ], easing);
    
    top.isVisible = false;
    //bottom.isVisible = false;
    
    return bottom;
}

/**
 * Creates the aliens.
 * @returns {Array}  Array of alien meshes.
 */
export function aliens() {
    const ufo = Anarchia.scene.getMeshById("ufoLand");
    
    const alien = Anarchia.createPlane({
        name: "alien_1",
        texture: "textures/aliens/alien_1.png",
        height: 0.45,
        width: 0.45,
        positionX: ufo.position.x,
        positionY: ufo.position.y + 0.12,
        positionZ: ufo.position.z + 0.02
    });
    alien.setParent(ufo);
    
    Anarchia.addJitter(alien, {
        property: "rotation.z",
        beginValue: 0,
        maxValue: 0.5 * Math.PI,
        minDuration: 1,
        maxDuration: 3,
        minPause: 0.5,
        maxPause: 4
    });
    Anarchia.addJitter(alien, {
        property: "rotation.z",
        beginValue: 0,
        maxValue: -0.5 * Math.PI,
        minDuration: 1,
        maxDuration: 3,
        minPause: 0.6,
        maxPause: 1.3
    });
    
    // jump animation    
    const posX = Anarchia.createAnimation(alien, {
        property: "position.x"
    },[ // keys
        { frame: 0 * Anarchia.FRAME_RATE, value: alien.position.x },
        { frame: 20.2 * Anarchia.FRAME_RATE, value: alien.position.x },
        { frame: 21 * Anarchia.FRAME_RATE, value: alien.position.x + 2 },
        
        { frame: Anarchia.END_FRAME, value: alien.position.x + 2 }
    ], false, [
        { second: 20, callback: function() {
            Anarchia.jump(alien, { height: 1, end: -0.5 });
        }},
        { second: 22, callback: function() {
            Anarchia.randomJumping(alien, {
                minHeight: 0.1,
                maxHeight: 0.3,
                minPause: 1,
                maxPause: 2
            });
        }},
        { second: 30, callback: function() {
            Anarchia.stopJumping(alien);
            Anarchia.stopJitters(alien);
        }}
    ]);    
    
    return [alien];
}