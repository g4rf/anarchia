/* global BABYLON */

import Anarchia from "./anarchia.js";

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
        { frame: 11 * Anarchia.FRAME_RATE, value: 3 }
    ],{ // easing
        type: new BABYLON.ExponentialEase(2),
        mode: BABYLON.EasingFunction.EASINGMODE_EASEOUT
    });
    
    return ufo;
}

export function ufoLand() {
    const height = 1;
    const startY = 7;
        
    const ufoBottom = Anarchia.createPlane({
        name: "ufoLand",
        texture: "textures/ufo_landed_bottom.png",
        height: height,
        width: height * 1156 / 768,
        positionX: -3.5,
        positionY: startY,
        positionZ: 5
    });
    const ufoTop = Anarchia.createPlane({
        name: "ufoLand",
        texture: "textures/ufo_landed_top.png",
        height: height,
        width: height * 1156 / 768,
        positionX: -3.5,
        positionY: startY,
        positionZ: 5.01
    });
    ufoBottom.addChild(ufoTop);
    
    
    return;
    
    Anarchia.createAnimation(ufo, {
        name: "moveUfoLand",
        property: "position.y"
    },[ // keys
        { frame:  0 * Anarchia.FRAME_RATE, value: startY },
        { frame: 11 * Anarchia.FRAME_RATE, value: startY },
        { frame: 16 * Anarchia.FRAME_RATE, value: 4.7 }
    ],{ // easing
        type: new BABYLON.ExponentialEase(2),
        mode: BABYLON.EasingFunction.EASINGMODE_EASEOUT
    });
    
    return ufo;
}