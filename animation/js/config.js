/* global BABYLON */

/**********************/
/*** constants ********/
/**********************/

/**
 * frame rate
 * @type Number
 */
const FRAME_RATE = 25;

/**
 * start of animation in frames
 * @type Number
 */
const START = 0 * FRAME_RATE;

/**
 * end of animation in frames
 * ! beware: that won't function very properly
 * @type Number
 */
const END = 20 * FRAME_RATE; // s * frame rate


/**********************/
/*** global objects ***/
/**********************/

/**
 * canvas to draw animation on
 * @type HTMLElement
 */
const canvas = document.getElementById("render");

/**
 * 
 * @type BABYLON.Engine
 */
const engine = new BABYLON.Engine(canvas, true);