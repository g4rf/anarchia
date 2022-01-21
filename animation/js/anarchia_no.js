/* global BABYLON */

/**
 * frame rate
 * @type Number
 */
export const FRAME_RATE = 25;

/**
 * start of animation in frames
 * @type Number
 */
export const START_FRAME = 0;

/**
 * end of animation in frames
 * ! beware = that won't function very properly
 * @type Number
 */
export const END_FRAME = 0;

/**
 * start of animation in frames
 * @type Number
 */
export const START_SECOND = 0;

/**
 * end of animation in frames
 * ! beware = that won't function very properly
 * @type Number
 */
export const END_SECOND = 0;

/**
 * canvas to draw animation on
 * @type HTMLElement
 */
export const canvas = null;

/**
 * 
 * @type BABYLON.Engine
 */
export const engine = null;

/**
 * The song, that will be played.
 * @type BABYLON.Sound
 */
export const music = null;

/**
 * The scene, that will be looped.
 * @type BABYLON.Scene
 */
export const scene = null;

/**
 * Generates random number between min (inclusive) and max (inclusive).
 * @param {Number} min inclusive minimum number
 * @param {Number} max inclusive maximum number
 * @returns {Number} A random number.
 */
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max) + 1;
    return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Which part of the animation to play
 * @param {Number} startSecond
 * @param {Number} endSecond
 */
export function duration(startSecond, endSecond) {
    START_SECOND = startSecond;
    END_SECOND = endSecond;
    START_FRAME = startSecond * FRAME_RATE;
    END_FRAME = endSecond * FRAME_RATE;
};

/**
 * Creates a plane with a texture.
 * @param {object} config Data for the plane =
 *          name = ""
 *          texture = ""
 *          width = 0
 *          height = 0
 *          positionX = 0
 *          positionY = 0
 *          positionZ = 0
 *          rotationX = 0
 *          rotationY = 0
 *          rotationZ = 0
 * @returns {BABYLON.Mesh} The plane
 */
export function createPlane(config) {
    const param = {
        name: "",
        texture: "",
        alpha: true,

        width: 0,
        height: 0,

        positionX: 0,
        positionY: 0,
        positionZ: 0,

        rotationX: 0,
        rotationY: 0,
        rotationZ: 0
    };

    if(typeof config == "undefined") config = {};
    for(const property in config) {
        param[property] = config[property];
    }

    const mesh = BABYLON.MeshBuilder.CreatePlane(param.name, {
        height: param.height,
        width: param.width
    });

    mesh.position.x = param.positionX;
    mesh.position.y = param.positionY;
    mesh.position.z = param.positionZ;

    mesh.rotation.x = param.rotationX;
    mesh.rotation.y = param.rotationY;
    mesh.rotation.z = param.rotationZ;

    const material = new BABYLON.StandardMaterial(param.name + "-material");
    material.diffuseTexture = new BABYLON.Texture(param.texture);
    material.diffuseTexture.hasAlpha = param.alpha;
    mesh.material = material;
}