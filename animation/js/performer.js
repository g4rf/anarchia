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
        { frame: 14 * Anarchia.FRAME_RATE, value: cameraVectors[1] }
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
        { frame: 11 * Anarchia.FRAME_RATE, value: 0 }
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
        { frame: 16 * Anarchia.FRAME_RATE, value: 4.7 }
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
        { frame: end * Anarchia.FRAME_RATE, value: 0.5 * Math.PI }
    ], easing);
    Anarchia.createAnimation(top, {
        property: "position.x"
    },[ // keys
        { frame:  0 * Anarchia.FRAME_RATE, value: 0 },
        { frame: start * Anarchia.FRAME_RATE, value: 0 },
        { frame: end * Anarchia.FRAME_RATE, value: -0.113 }
    ], easing);
    Anarchia.createAnimation(top, {
        property: "position.y"
    },[ // keys
        { frame: 0 * Anarchia.FRAME_RATE, value: 0 },
        { frame: start * Anarchia.FRAME_RATE, value: 0 },
        { frame: end * Anarchia.FRAME_RATE, value: 0.465 }
    ], easing);
    
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
        texture: "textures/alien_1.png",
        height: 0.45,
        width: 0.45,
        positionX: ufo.position.x,
        positionY: ufo.position.y + 0.12,
        positionZ: ufo.position.z + 0.02
    });
    alien.setParent(ufo);
    
    // jump animation    
    const posX = Anarchia.createAnimation(alien, {
        property: "position.x"
    },[ // keys
        { frame: 0 * Anarchia.FRAME_RATE, value: alien.position.x },
        { frame: 20 * Anarchia.FRAME_RATE, value: alien.position.x },
        { frame: 21 * Anarchia.FRAME_RATE, value: alien.position.x + 2 }
    ], false, [
        { second: 19, callback: function() {
                
            const posYup = Anarchia.createAnimation(alien, {
                property: "position.y"
            },[ // keys
                { frame: 0 * Anarchia.FRAME_RATE, value: alien.position.y },
                { frame: 1 * Anarchia.FRAME_RATE, value: alien.position.y },
                { frame: 1.3 * Anarchia.FRAME_RATE, value: alien.position.y + 1 }
            ],{ // easing
                type: new BABYLON.CircleEase(),
                mode: BABYLON.EasingFunction.EASINGMODE_EASEOUT
            });
 
            const posYdown = Anarchia.createAnimation(alien, {
                property: "position.y"
            },[ // keys
                { frame: 1.3 * Anarchia.FRAME_RATE, value: alien.position.y + 1 },
                { frame: 2 * Anarchia.FRAME_RATE, value: alien.position.y - 0.5 }
            ],{ // easing
                type: new BABYLON.BounceEase(1, 5),
                mode: BABYLON.EasingFunction.EASINGMODE_EASEOUT
            });

            const scaleX = Anarchia.createAnimation(alien, {
                property: "scaling.x",
                loop: BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
            },[ // keys
                { frame: 0 * Anarchia.FRAME_RATE, value: 1 },
                { frame: 0.9 * Anarchia.FRAME_RATE, value: 1 },
                { frame: 1.0 * Anarchia.FRAME_RATE, value: 1.6 },
                { frame: 1.1 * Anarchia.FRAME_RATE, value: 1 },
                { frame: 1.8 * Anarchia.FRAME_RATE, value: 1 },
                { frame: 1.9 * Anarchia.FRAME_RATE, value: 1.6 },
                { frame: 2 * Anarchia.FRAME_RATE, value: 1 }
            ]);

            const scaleY = Anarchia.createAnimation(alien, {
                property: "scaling.y",
                loop: BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
            },[ // keys
                { frame: 0 * Anarchia.FRAME_RATE, value: 1 },
                { frame: 0.9 * Anarchia.FRAME_RATE, value: 1 },
                { frame: 1.0 * Anarchia.FRAME_RATE, value: 0.6 },
                { frame: 1.1 * Anarchia.FRAME_RATE, value: 1 },
                { frame: 1.8 * Anarchia.FRAME_RATE, value: 1 },
                { frame: 1.9 * Anarchia.FRAME_RATE, value: 0.6 },
                { frame: 2 * Anarchia.FRAME_RATE, value: 1 }
            ]);
            
            const speed = 1;
            Anarchia.scene.beginDirectAnimation(alien, [scaleY, scaleX],
                0, 2 * Anarchia.FRAME_RATE, false, speed);
            Anarchia.scene.beginDirectAnimation(alien, [posYup],
                0, 2 * Anarchia.FRAME_RATE, false, speed, function() {
                Anarchia.scene.beginDirectAnimation(alien, [posYdown],
                    0, 2 * Anarchia.FRAME_RATE, false, speed);
            });
            
        }}
    ]);
    
    
    
    return [alien];
}