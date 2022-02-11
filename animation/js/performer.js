/* global BABYLON */

import Anarchia from "./anarchia.js";
import Timeline from "./timeline.js";

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
        { frame: Timeline.filmStart, value: cameraVectors[0] },
        { frame: Timeline.cameraPositionStart, value: cameraVectors[0] },
        { frame: Timeline.cameraPositionHeinrichplatz, value: cameraVectors[1] },
        
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
        { frame: Timeline.filmStart, value: startY },
        { frame: Timeline.ufoflyPositionStart, value: startY },
        { frame: Timeline.ufoflyPositionLanded, value: 0 },
        
        { frame: Anarchia.END_FRAME, value: 0 }
    ],{ // easing
        type: new BABYLON.ExponentialEase(2),
        mode: BABYLON.EasingFunction.EASINGMODE_EASEOUT
    },[
        { frame: Timeline.ufoflyPositionLanded + 0.01, callback: function() {
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
        { frame: Timeline.filmStart, value: startY },
        { frame: Timeline.ufolandedPositionStart, value: startY },
        { frame: Timeline.ufolandedPositionLanded, value: 4.7 },
        
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
    const start = Timeline.ufolandedOpenTop;
    const end = Timeline.ufolandedTopOpened;
    const easing = {
        type: new BABYLON.ExponentialEase(10),
        mode: BABYLON.EasingFunction.EASINGMODE_EASEINOUT
    };
    Anarchia.createAnimation(top, {
        property: "rotation.z"
    },[ // keys
        { frame: 0, value: 0 * Math.PI },
        { frame: start, value: 0 * Math.PI },
        { frame: end, value: 0.5 * Math.PI },
        
        { frame: Anarchia.END_FRAME, value: 0.5 * Math.PI }
    ], easing);
    Anarchia.createAnimation(top, {
        property: "position.x"
    },[ // keys
        { frame: 0, value: 0 },
        { frame: start, value: 0 },
        { frame: end, value: -0.113 },
        
        { frame: Anarchia.END_FRAME, value: -0.113 }
    ], easing);
    Anarchia.createAnimation(top, {
        property: "position.y"
    },[ // keys
        { frame: 0, value: 0 },
        { frame: start, value: 0 },
        { frame: end, value: 0.465 },
        
        { frame: Anarchia.END_FRAME, value: 0.465 }
    ], easing);
    
    return bottom;
}

/**
 * Creates the aliens.
 * @returns {Array}  Array of alien meshes.
 */
export function aliens() {
    const ufo = Anarchia.scene.getMeshById("ufoLand");
    const aliens = [];
    
    const parameters = [
        { endX: 1.4, endY: -0.50 },
        { endX: 1.7, endY: -0.40 },
        { endX: 2.2, endY: -0.35 },
        { endX: 2.5, endY: -0.30 },
        { endX: 2.0, endY: -0.20 },
        { endX: 1.8, endY: -0.15 },
        { endX: 1.5, endY: -0.10 }
    ];
    
    for (let i = 0; i < parameters.length; i++) {
        
        const size = Anarchia.random(0.3, 0.5);
        let alien = Anarchia.createPlane({
            name: "alien_" + i,
            texture: "textures/aliens/alien_" + i + ".png",
            height: size,
            width: size,
            positionX: ufo.position.x,
            positionY: ufo.position.y + 0.12,
            positionZ: ufo.position.z + 0.02 + (i * 0.01)
        });
        alien.setParent(ufo);

        // random rotation clockwise
        Anarchia.addJitter(alien, {
            property: "rotation.z",
            beginValue: 0,
            maxValue: Anarchia.random(0.1, 0.5) * Math.PI,
            minDuration: 0.1,
            maxDuration: 3,
            minPause: 0.1,
            maxPause: 5
        });
        // random rotation counter clockwise
        Anarchia.addJitter(alien, {
            property: "rotation.z",
            beginValue: 0,
            maxValue: Anarchia.random(0.1, 0.5) * -Math.PI,
            minDuration: 0.1,
            maxDuration: 3,
            minPause: 0.1,
            maxPause: 5
        });

        // jump animation
        Anarchia.createAnimation(alien, {
            property: "position.x"
        },[ // keys
            { frame: Timeline.filmStart, value: alien.position.x },
            { frame: Timeline["alien" + i + "JumpOut"] 
                        + 0.2 * Anarchia.FRAME_RATE,
                value: alien.position.x },
            { frame: Timeline["alien" + i + "JumpOut"]
                        + 1 * Anarchia.FRAME_RATE,
                value: alien.position.x + parameters[i].endX },

            { frame: Anarchia.END_FRAME, 
                value: alien.position.x + parameters[i].endX }
        ], false, [
            { frame: Timeline["alien" + i + "JumpOut"], callback: function() {
                Anarchia.jump(alien, { 
                    height: Anarchia.random(0.5, 1.5),
                    end: parameters[i].endY
                });
            }},
            { frame: Timeline["alien" + i + "RandomJumps"], callback: function() {
                Anarchia.randomJumping(alien, {
                    minHeight: 0.1,
                    maxHeight: 0.3,
                    minPause: 1,
                    maxPause: 2
                });
            }},
            { frame: Timeline["alien" + i + "StopRandomJumps"], callback: function() {
                Anarchia.stopJumping(alien);
                
            }}
        ]);
        
        // add to array
        aliens.push(alien);
    }
    
    return aliens;
}

/**
 * Creates the humans.
 * @returns {Array} Array of human meshes.
 */
export function humans() {
    const humans = [];
    
    // human 0
    const parameters = [
        { size: 1.10, x:  3.00, y: 1.60, z: 12.9, 
                                    rotationStart: -0.3, rotationEnd:  -0.05 },
        { size: 1.15, x: -7.80, y: 0.80, z: 12.9,
                                    rotationStart: -0.1, rotationEnd: 0.1 },
        { size: 0.80, x:  1.00, y: 4.38, z: 12.9,
                                    rotationStart: -0.1, rotationEnd: 0.05 },
        { size: 0.70, x:  1.35, y: 4.25, z: 12.89, 
                                    rotationStart: -0.1, rotationEnd: 0.05 }
    ];
    
    for (let i = 0; i < parameters.length; i++) {
        
        let human = Anarchia.createPlane({
            name: "human_" + i,
            texture: "textures/humans/human_" + i + ".png",
            height: parameters[i].size,
            width: parameters[i].size,
            positionX: parameters[i].x,
            positionY: parameters[i].y,
            positionZ: parameters[i].z
        });

        // rotate animation
        Anarchia.createAnimation(human, {
            property: "rotation.z"
        },[ // keys
            { frame: Timeline.filmStart, 
                value: parameters[i].rotationStart * Math.PI },
            { frame: Timeline.ufolandedPositionStart,
                value: parameters[i].rotationStart * Math.PI },
            { frame: Timeline.ufolandedPositionLanded,
                value: parameters[i].rotationEnd * Math.PI },

            { frame: Anarchia.END_FRAME, 
                value: parameters[i].rotationEnd * Math.PI }
        ], false, [
            { frame: Timeline.humanJitterStart, callback: function() {
                Anarchia.addJitter(human, {
                    property: "rotation.z",
                    beginValue: parameters[i].rotationEnd * Math.PI,
                    maxValue: Math.PI * (parameters[i].rotationEnd + 0.1),
                    minDuration: 1,
                    maxDuration: 5,
                    minPause: 0.1,
                    maxPause: 5
                });
            }}
        ]);
        
        // add to array
        humans.push(human);
    }
    
    return humans;
}