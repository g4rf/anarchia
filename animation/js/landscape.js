/* global BABYLON */

import Anarchia from "./anarchia.js";

/**
 * Creates the background.
 * @returns {BABYLON.Mesh}
 */
export function background() {
    /** background **/
    const height = 120;
    return Anarchia.createPlane({
        name: "sky",
        texture: "textures/city/city.png",
        alpha: false,
        height: height,
        width: 220,  
        positionX: 10,
        positionY: 5,
        positionZ: 16
    });
}

/**
 * Creates the Berlin tv tower.
 * @returns {BABYLON.Mesh}
 */
export function tvtower() {
    /** tv tower **/
    const height = 29;
    return Anarchia.createPlane({
        name: "tvtower",
        texture: "textures/city/tvtower.png",
        height: height,
        width: 3.6,
        positionX: -6,
        positionY: 26
    });
}

/**
 * Creates the Heinrichplatz.
 * @returns {BABYLON.Mesh}
 */
export function heinrichplatz() {    
    /** heinrichplatz **/
    const height = 5.1;
    const width = 9;
    const positionX = -1;
    const positionY = 15;
    const heinrichplatz = Anarchia.createPlane({
        name: "heinrichplatz",
        texture: "textures/city/heinrichplatz.png",
        height: height,
        width: width,
        positionX: positionX,
        positionY: positionY,
        positionZ: 6
    });    
    const trafficlights = Anarchia.createPlane({
        name: "heinrichplatz-trafficlights",
        texture: "textures/city/heinrichplatz-trafficlights.png",
        height: height * 0.6,
        width: width * 0.6,
        positionX: positionX + 0.4,
        positionY: positionY,
        positionZ: 3
    });
    return {
        "heinrichplatz": heinrichplatz,
        "trafficlights": trafficlights
    };
}

/**
 * Creates the city (houses).
 * @return Array Array of BABYLON.Mesh
 */
export function houses() {
    /** houses **/
    const houses = [
        { src: "house-1", x: -27  , y: 16, z: -1}, // 0
        { src: "house-2", x:   0  , y: 16, z:  0}, // 1
        { src: "house-3", x:  -5  , y: 16, z:  0}, // 2
        { src: "house-4", x:   4.6, y: 16, z:  0}, // 3
        { src: "house-5", x:  11  , y: 16, z:  0}, // 4
        { src: "house-6", x:  16.2, y: 16, z:  0}, // 5
    ];
    const meshHouses = [];
    houses.forEach(function(house, i) {
        meshHouses.push(
            Anarchia.createPlane({
                name: "house_" + i,
                texture: "textures/city/" + house.src + ".png",
                height: 8,
                width: 8,
                positionX: house.x,
                positionY: house.y,
                positionZ: house.z
            })
        );
    });
    return meshHouses;
}

/**
 * Creates the headline.
 * @returns {BABYLON.Mesh}
 */
export function headline() {
    /** headline **/
    const height = 18;
    return Anarchia.createPlane({
        name: "headline",
        texture: "textures/headline.png",
        height: height,
        width: height * 3226 / 1174,
        positionX: 20,
        positionY: 25,
        positionZ: 9
    });
}

/**
 * Creates the first credential sign.
 * @returns {BABYLON.Mesh}
 */
export function signCredentials() {
    /** sign **/
    const height = 3.5;
    return Anarchia.createPlane({
        name: "signCredentials",
        texture: "textures/sign.png",
        height: height,
        width: height * 1920 / 2510,
        positionX: -2,
        positionY: 14.8,
        positionZ: -50,
        rotationX: 0 * Math.PI,
        rotationY: -0.05 * Math.PI
    });
};