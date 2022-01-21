/* global BABYLON */

import Anarchia from "./anarchia.js";

export function create() {
    /** background **/
    var height = 60;
    Anarchia.createPlane({
        name: "sky",
        texture: "textures/city-horizon.jpg",
        alpha: false,
        height: height,
        width: 110,    
        positionY: height / 2 - 13, // 60 == height
        positionZ: 16
    });

    /** tv tower **/
    var height = 40;
    Anarchia.createPlane({
        name: "tvtower",
        texture: "textures/tvtower_plane.png",
        height: height,
        width: height * 200 / 1000,    
        positionX: -7,
        positionY: height / 2
    });

    /** heinrichplatz **/
    var height = 11;
    Anarchia.createPlane({
        name: "heinrichplatz",
        texture: "textures/heinrichplatz.png",
        height: height,
        width: 20,
        positionX: -1,
        positionY: height / 2,
        positionZ: 13
    });

    /** houses **/
    let houses = [
        { height: 12, x: -27, z: -1, offset:  1},
        { height: 15, x: -23, z: -2, offset:  2},
        { height:  9, x: -15, z: -3, offset:  3},
        { height: 18, x: -18, z: -3, offset:  4},
        { height: 15, x:  -6, z: -4, offset:  5},
        { height: 14, x:  -4, z: -6, offset:  6},
        { height: 12, x:   1, z: -2, offset:  7},
        { height: 10, x:   4, z: -7, offset:  8},
        { height: 16, x:   4, z: -5, offset:  9},
        { height: 22, x:  15, z: -4, offset: 10},
        { height: 12, x:  21, z: -6, offset: 11},
        { height: 10, x:  15, z: -5, offset: 12},
        { height: 12, x:  24, z: -2, offset: 13}
    ];
    houses.forEach(function(data, i) {
        Anarchia.createPlane({
            name: "house_" + i,
            texture: "textures/houses.png",
            height: data.height,
            width: data.height,
            positionX: data.x,
            positionY: data.height / 2,
            positionZ: data.z,
            uScale: 0.2,
            uOffset: data.offset * 0.2,
            vScale: 1,
            vOffset: 0
        });
    });


    /** headline **/
    var height = 18;
    Anarchia.createPlane({
        name: "headline",
        texture: "textures/headline.png",
        height: height,
        width: height * 3226 / 1174,
        positionX: 20,
        positionY: 25,
        positionZ: 9
    });
};