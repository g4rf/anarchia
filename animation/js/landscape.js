/* global BABYLON */

import Anarchia from "./anarchia.js";
import Timeline from "./timeline.js";

/**
 * Creates the background.
 * @returns {BABYLON.Mesh}
 */
export function background() {
    let background = [];
    
    /** space **/
    const spaceHeight = 500;
    background.push(Anarchia.createPlane({
        name: "city",
        texture: "textures/space.jpg",
        alpha: false,
        height: spaceHeight,
        width: spaceHeight / 1257 * 1920,  
        positionX: 3,
        positionY: 18,
        positionZ: 17
    }));
    
    /** city **/
    background.push(Anarchia.createPlane({
        name: "city",
        texture: "textures/city/city.png",
        alpha: true,
        height: 80,
        width: 80 / 1237 * 1920,  
        positionX: 3,
        positionY: 18,
        positionZ: 16
    }));
    
    return background;
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
    
/**
 * Creates the city (houses & trafficlights).
 * @return Array Array of BABYLON.Mesh
 */
export function heinrichplatz() {
    let elements = [];
    
    // heinrichplatz
    const heinrichplatz = Anarchia.createPlane({
        name: "heinrichplatz",
        texture: "textures/city/heinrichplatz.png",
        height: 5.1,
        width: 9,
        positionX: -1,
        positionY: 5.5,
        positionZ: 6
    });    
    elements.push(heinrichplatz);
    
    // trafficlight right
    const trafficlightRight = Anarchia.createPlane({
        name: "trafficlight-right",
        texture: "textures/city/trafficlight-full-mirror.png",
        height: 3,
        width: 1.3,
        positionX: 0.45,
        positionY: 5.2,
        positionZ: 3
    });
    elements.push(trafficlightRight);
    
    // trafficlight left back
    const trafficlightLeftBack = Anarchia.createPlane({
        name: "trafficlight-left-back",
        texture: "textures/city/trafficlight-full.png",
        height: 3,
        width: 1.3,
        positionX: -4,
        positionY: 5.85,
        positionZ: 5.1
    });
    elements.push(trafficlightLeftBack);
    
    // trafficlight left front
    const trafficlightLeftFront = Anarchia.createPlane({
        name: "trafficlight-left-front",
        texture: "textures/city/trafficlight-partly.png",
        height: 2,
        width: 0.45,
        positionX: -3.1,
        positionY: 5,
        positionZ: 3
    });
    elements.push(trafficlightLeftFront);
    
    return elements;
}

/**
 * Creates the city (houses & trafficlights).
 * @return Array Array of BABYLON.Mesh
 */
export function charlottenburg() {
    let elements = [];
    
    // heinrichplatz
    const charlottenburg = Anarchia.createPlane({
        name: "charlottenburg",
        texture: "textures/city/charlottenburg.png",
        height: 5.1,
        width: 9,
        positionX: 19,
        positionY: 5.6,
        positionZ: 6
    });    
    
    elements.push(charlottenburg);
    
    return elements;
}

/**
 * Creates the city (houses).
 * @return Array Array of BABYLON.Mesh
 */
export function houses() {
    /** houses **/
    const data = [
        { src: "house-3", size: 12.0, x:  -6.2, y: 6.7, z: -4.0 }, // 0
        { src: "house-5", size:  8.4, x:   5.0, y: 5.0, z: -3.5 }, // 1   
        { src: "house-1", size:  9.0, x: -31.5, y: 6.4, z: -4.0 }, // 2
        { src: "house-2", size: 12.0, x: -27.7, y: 7.4, z: -5.0 }, // 3
        { src: "house-4", size: 12.0, x: -24.5, y: 7.4, z: -3.0 }, // 4
        { src: "house-6", size: 12.0, x: -18.9, y: 7.2, z: -6.0 }, // 5
        { src: "house-7", size:  9.0, x: -14.1, y: 5.0, z: -3.0 }, // 6
        { src: "house-2", size: 12.0, x: -11.5, y: 6.4, z: -4.7 }, // 7
        { src: "house-3", size: 12.0, x:   6.5, y: 6.7, z: -1.2 }, // 8
        { src: "house-4", size: 12.0, x:  -8.0, y: 6.7, z: -7.0 }, // 9
        { src: "house-5", size: 12.0, x: -15.6, y: 8.3, z: -2.4 }, // 10
        { src: "house-6", size: 12.0, x:  25.9, y: 5.5, z: -2.8 }, // 11
        { src: "house-5", size: 12.0, x:  24.1, y: 6.4, z: -0.9 }, // 12
        { src: "house-4", size: 12.0, x:  11.9, y: 7.2, z: -6.1 }, // 13
        { src: "house-3", size: 12.0, x:  14.7, y: 6.8, z: -1.3 }, // 14
        { src: "house-2", size: 12.0, x:  19.6, y: 6.8, z: -4.0 }, // 15
        { src: "house-1", size: 12.0, x:  29.0, y: 6.1, z: -1.3 }, // 16
        { src: "house-7", size:  7.2, x:  15.0, y: 4.8, z: -7.2 }  // 17
    ];
    
    const houses = new BABYLON.AbstractMesh("houses");
    data.forEach(function(house, i) {
        
        var h = Anarchia.createPlane({
                name: "house_" + i,
                texture: "textures/city/" + house.src + ".png",
                height: house.size,
                width: house.size,
                positionX: house.x,
                positionY: house.y,
                positionZ: house.z
        });
        
        h.setParent(houses);
    });
    
    // create fake Animation to change texture
    Anarchia.createAnimation(houses, {
        property: "x"
    },[
        { frame: Timeline.filmStart, value: houses.position.x },
        { frame: Anarchia.END_FRAME, value: houses.position.x }
    ], false, [
        {
            frame: Timeline.cinema.show,
            callback: function() {                
                houses.getChildMeshes(true).forEach(function(house, i) {
                    const texture = new BABYLON.Texture(
                        "textures/city/graffiti/" + data[i].src + ".png", 
                        Anarchia.scene
                    );
                    texture.hasAlpha = true;
                    house.material.diffuseTexture = texture;
                });
            }
        }
    ]);
    
    return houses;
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
        
    const toilet = Anarchia.createPlane({
        name: "toilet",
        texture: "textures/toilet-clean.png",
        positionZ: 0.65
    });
    toilet.setParent(house);
    toilet.position.x = 0.5;
    toilet.position.y = -1.5;
    toilet.scaling.x = 7 * 1700 / 1600;
    toilet.scaling.y = 7;
    
    // create fake Animation to change texture
    Anarchia.createAnimation(toilet, {
        property: "x"
    },[
        { frame: Timeline.filmStart, value: toilet.position.x },
        { frame: Anarchia.END_FRAME, value: toilet.position.x }
    ], false, [
        {
            frame: Timeline.cinema.show,
            callback: function() {                
                // toilet
                const textureToilet = new BABYLON.Texture(
                        "textures/toilet-punk.png", 
                        Anarchia.scene
                );
                textureToilet.hasAlpha = true;
                toilet.material.diffuseTexture = textureToilet;
                
                // house
                const textureHouse = new BABYLON.Texture(
                        "textures/toilethouse-graffiti.png", 
                        Anarchia.scene
                );
                textureHouse.hasAlpha = true;
                house.material.diffuseTexture = textureHouse;
            }
        }
    ]);
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
        width: height * 3500 / 1300,
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
    const height = 2.5;
    return Anarchia.createPlane({
        name: "signCredentials",
        texture: "textures/sign.png",
        height: height,
        width: height * 1665 / 1642,
        positionX: -2.1,
        positionY: 15.6,
        positionZ: -50,
        rotationX: 0 * Math.PI,
        rotationY: -0.05 * Math.PI
    });
};