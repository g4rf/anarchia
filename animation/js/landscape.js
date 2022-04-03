/* global BABYLON */

import Anarchia from "./anarchia.js";

/**
 * Creates the background.
 * @returns {BABYLON.Mesh}
 */
export function background() {
    /** background **/
    return Anarchia.createPlane({
        name: "city",
        texture: "textures/city/city.png",
        alpha: false,
        height: 80,
        width: 80 / 1237 * 1920,  
        positionX: 0,
        positionY: 18,
        positionZ: 16
    });
}

/**
 * Creates the Berlin tv tower.
 * @returns {BABYLON.Mesh}
 */
export function tvtower() {
    /** tv tower **/
    const height = 38;
    return Anarchia.createPlane({
        name: "tvtower",
        texture: "textures/city/tvtower.png",
        height: height,
        width: height * 122 / 942,
        positionX: -7,
        positionY: height / 2
    });
}
    
export function heinrichplatz() {    
    /** heinrichplatz **/
    const height = 5.1;
    const width = 9;
    const position = { x: -1, y: 5.5 };
    
    const heinrichplatz = Anarchia.createPlane({
        name: "heinrichplatz",
        texture: "textures/city/heinrichplatz.png",
        height: height,
        width: width,
        positionX: position.x,
        positionY: position.y,
        positionZ: 6
    });    
    
    const trafficlights = Anarchia.createPlane({
        name: "trafficlights",
        texture: "textures/city/heinrichplatz-trafficlights.png",
        height: height * 0.6,
        width: width * 0.6,
        positionX: position.x + 0.4,
        positionY: position.y,
        positionZ: 3
    });
    trafficlights.setParent(heinrichplatz);
    
    return heinrichplatz;
}

/**
 * Creates the city (houses).
 * @return Array Array of BABYLON.Mesh
 */
export function houses() {
    /** houses **/
    const size = 12;
    const houses = [
        { src: "house-4", x: -27, z: -1 }, // 0
        /*{ src: "house-2", x: -23, z: -2 }, // 1
        { src: "house-3", x: -15, z: -3 }, // 2
        { src: "house-4", x: -18, z: -3 }, // 3
        { src: "house-5", x:  -6, z: -4 }, // 4
        { src: "house-6", x:  -4, z: -6 }, // 5
        { src: "house-1", x:  -2, z: -6.5 }, // 6
        { src: "house-2", x:   4, z: -7 }, // 7
        { src: "house-3", x:   4, z: -5 }, // 8
        { src: "house-4", x:  15, z: -4 }, // 9
        { src: "house-5", x:  21, z: -6 }, // 10
        { src: "house-6", x:  15, z: -5 }, // 11
        { src: "house-1", x:  24, z: -2 }, // 12*/
    ];
    const meshHouses = [];
    houses.forEach(function(house, i) {
        meshHouses.push(
            Anarchia.createPlane({
                name: "house_" + i,
                texture: "textures/city/" + house.src + ".png",
                height: size,
                width: size,
                positionX: house.x,
                positionY: 6.7,
                positionZ: house.z
            })
        );
    });
    return meshHouses;
}

/**
 * Creates the toilet house the camera moves through at the beginning.
 * @returns Mesh The house.
 */
export function toilet() {
    const house = Anarchia.createPlane({
        name: "toilethouse",
        texture: "textures/toilethouse.png",
        height: 11.5,
        width: 11.5,
        positionX: -1.08,
        positionY: 6.7,
        positionZ: -3
    });
    /**
     * Image attributions:
     * Peggy und Marco Lachmann-Anke on Pixabay
     * cottonbro on Pexels
     * Masha Raymers on Pexels
     * Anna Nekrashevich on Pexels
     */
    const toilet = Anarchia.createPlane({
        name: "toilet",
        texture: "textures/toilet-clean.png",
        positionZ: 0.65
    });
    toilet.setParent(house);
    toilet.position.x = -0.2;
    toilet.position.y = -1.45;
    toilet.scaling.x = 6;
    toilet.scaling.y = 6 * 1600 / 1300;
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