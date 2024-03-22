/* global BABYLON */

import Anarchia from "./anarchia.js";
import Timeline from "./timeline.js";

/**
 * Creates the camera and its movements.
 * @type BABYLON.UniversalCamera
 */
export function camera() {
    const vectors = {
        start:         new BABYLON.Vector3(0, 17, -55),
        toiletStart:   new BABYLON.Vector3(-0.86, 7.06, -7),
        heinrichplatz: new BABYLON.Vector3(-1, 5.5, 0),
        punks:         new BABYLON.Vector3(-0.5, 5, 2.5),
        police:        new BABYLON.Vector3(-1, 5.5, 0)
    };
    
    const camera = new BABYLON.UniversalCamera("camera", vectors.start);

    Anarchia.createAnimation(camera, {
        name: "moveCameraToHeinrichplatz",
        property: "position",
        type: BABYLON.Animation.ANIMATIONTYPE_VECTOR3
    },
    // key positions
    [{ 
        frame: Timeline.filmStart,
        value: vectors.start
    },{ 
        frame: Timeline.camera.start, 
        value: vectors.start
    },{
        frame: Timeline.camera.toiletStart, 
        value: vectors.toiletStart 
    },{ 
        frame: Timeline.camera.heinrichplatz, 
        value: vectors.heinrichplatz 
    },{ 
        frame: Timeline.camera.punksZoomStart, 
        value: vectors.heinrichplatz 
    },{ 
        frame: Timeline.camera.punksZoomEnd, 
        value: vectors.punks 
    },{
        frame: Timeline.camera.policeZoomStart, 
        value: vectors.punks
    },{
        frame: Timeline.camera.policeZoomEnd, 
        value: vectors.police
    },
    
        
    { 
        frame: Anarchia.END_FRAME,
        value: vectors.police
    }],{ // easing
        type: new BABYLON.BezierCurveEase(0, 0, 0.99, 0.99),
        mode: BABYLON.EasingFunction.EASINGMODE_EASEIN
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
        width: height * 1273 / 551,
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
        { frame: Timeline.ufoflyPositionLanded, value: 7 },
        
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
    const endY = 4.6;
    const x = -2.95;
    const z = 4;
    
    // the (whole) ufo
    const bottom = Anarchia.createPlane({
        name: "ufoLand",
        texture: "textures/ufo_landed_bottom.png",
        height: height,
        width: height * 1272 / 845,
        positionX: x,
        positionY: startY,
        positionZ: z
    });    
    // land animation
    Anarchia.createAnimation(bottom, {
        property: "position.y"
    },[ // keys
        { frame: Timeline.filmStart, value: startY },
        { frame: Timeline.ufolandedPositionStart, value: startY },
        { frame: Timeline.ufolandedPositionLanded, value: endY },
        
        { frame: Anarchia.END_FRAME, value: endY }
    ],{ // easing
        type: new BABYLON.ExponentialEase(2),
        mode: BABYLON.EasingFunction.EASINGMODE_EASEOUT
    });
    
    // the ufo top
    const top = Anarchia.createPlane({
        name: "ufoLandTop",
        texture: "textures/ufo_landed_top.png",
        height: height,
        width: height * 1156 / 768,
        positionX: x,
        positionY: startY,
        positionZ: z + 0.01
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
        { frame: end, value: 0.43 },
        
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
            { frame: Timeline.alien[i].jumpOut 
                        + 0.2 * Anarchia.FRAME_RATE,
                value: alien.position.x },
            { frame: Timeline.alien[i].jumpOut
                        + 1 * Anarchia.FRAME_RATE,
                value: alien.position.x + parameters[i].endX },

            { frame: Anarchia.END_FRAME, 
                value: alien.position.x + parameters[i].endX }
        ], false, [
            { frame: Timeline.alien[i].jumpOut, callback: function() {
                Anarchia.jump(alien, { 
                    height: Anarchia.random(0.5, 1.5),
                    end: parameters[i].endY
                });
            }},
            { frame: Timeline.alien[i].randomJumps, callback: function() {
                Anarchia.randomJumping(alien, {
                    minHeight: 0.1,
                    maxHeight: 0.3,
                    minPause: 2,
                    maxPause: 4
                });
            }},
            { frame: Timeline.alien[i].pogoStart, callback: function() {
                Anarchia.stopJumping(alien);
                Anarchia.randomJumping(alien, {
                    minHeight: 1,
                    maxHeight: 1.5,
                    minPause: 1.1,
                    maxPause: 1.2
                });
            }},
            { frame: Timeline.alien[i].pogoEnd, callback: function() {
                Anarchia.stopJumping(alien);
            }}
        ]);
        
        // add to array
        aliens.push(alien);
    }
    
    return aliens;
}

/**
 * Creates the punks.
 * @returns {Array} Array of punk meshes.
 */
export function punks() {
    const punks = [];
    const jumpStartOffset = 0.2 * Anarchia.FRAME_RATE;
    
    // parameters
    const parameters = [{
        // punk 0
        size: 0.7,
        x: 3.2, // !!! change jumps as well
        y: 4.65,  z: 5,
        jumps: [
            3.2,
            3.2 - 1.2,
            3.2 - 1.2 - 1,
            3.2 - 1.2 - 1 - 0.5,
            3.2 - 1.2 - 1 - 0.5 - 0.3,
            3.2 - 1.2 - 1 - 0.5 - 0.3 - 0.3,
        ]
    },{ // punk 1
        size: 0.6,
        x: 3.3, // !!! change jumps as well
        y: 4.55,  z: 4.9,
        jumps: [
            3.3,
            3.3 - 1,
            3.3 - 1 - 1.1,
            3.3 - 1 - 1.1 - 0.6,
            3.3 - 1 - 1.1 - 0.6 - 0.2,
            3.3 - 1 - 1.1 - 0.6 - 0.2 - 0.05,
        ]
    }];
    
    for(let i = 0; i < parameters.length; i++) {
        
        const punk = Anarchia.createPlane({
            name: "punk_" + i,
            texture: "textures/humans/punk_" + i + ".png",
            height: parameters[i].size,
            width: parameters[i].size,
            positionX: parameters[i].x,
            positionY: parameters[i].y,
            positionZ: parameters[i].z
        });
        
        // rotation clockwise
        Anarchia.addJitter(punk, {
            property: "rotation.z",
            beginValue: 0 * Math.PI,
            maxValue: -0.1 * Math.PI,
            minDuration: 1,
            maxDuration: 2,
            minPause: 1,
            maxPause: 2
        });
        // rotation counter clockwise
        Anarchia.addJitter(punk, {
            property: "rotation.z",
            beginValue: 0 * Math.PI,
            maxValue: 0.1 * Math.PI,
            minDuration: 1,
            maxDuration: 2,
            minPause: 1,
            maxPause: 2
        });

        // jumping in
        Anarchia.createAnimation(punk, {
            property: "position.x"
        },[{ // keys
            frame: Timeline.filmStart, 
            value: parameters[i].jumps[0]
        },
        { // jump in 1
            frame: Timeline.punks[i].jumpIn[0].start,
            value: parameters[i].jumps[0]
        },{
            frame: Timeline.punks[i].jumpIn[0].end,
            value: parameters[i].jumps[1]
        },{ // jump in 2
            frame: Timeline.punks[i].jumpIn[1].start,
            value: parameters[i].jumps[1]
        },{
            frame: Timeline.punks[i].jumpIn[1].end,
            value: parameters[i].jumps[2]
        },{ // jump in 3
            frame: Timeline.punks[i].jumpIn[2].start,
            value: parameters[i].jumps[2]
        },{
            frame: Timeline.punks[i].jumpIn[2].end,
            value: parameters[i].jumps[3]
        },{ // jump in 4
            frame: Timeline.punks[i].jumpIn[3].start,
            value: parameters[i].jumps[3]
        },{
            frame: Timeline.punks[i].jumpIn[3].end,
            value: parameters[i].jumps[4]
        },{ // jump in 5
            frame: Timeline.punks[i].jumpIn[4].start,
            value: parameters[i].jumps[4]
        },{
            frame: Timeline.punks[i].jumpIn[4].end,
            value: parameters[i].jumps[5]
        },
        { // last position
            frame: Anarchia.END_FRAME, 
            value: parameters[i].jumps[parameters[i].jumps.length - 1]
        }], false, [{ // jumps
            frame: Timeline.punks[i].jumpIn[0].start - jumpStartOffset, 
            callback: function() { Anarchia.jump(punk, { height: 0.5 }); } 
        },{
            frame: Timeline.punks[i].jumpIn[1].start - jumpStartOffset, 
            callback: function() { Anarchia.jump(punk, { height: 0.5 }); }
        },{ 
            frame: Timeline.punks[i].jumpIn[2].start - jumpStartOffset, 
            callback: function() { Anarchia.jump(punk, { height: 0.3 }); }
        },{ 
            frame: Timeline.punks[i].jumpIn[3].start - jumpStartOffset, 
            callback: function() { Anarchia.jump(punk, { height: 0.1 }); }
        },{ 
            frame: Timeline.punks[i].jumpIn[4].start - jumpStartOffset, 
            callback: function() { Anarchia.jump(punk, { height: 0.1 }); }
        }]);
    
        punks.push(punk);
    }
    
    return [punks];
}

/**
 * Creates the humans.
 * @returns {Array} Array of human meshes.
 */
export function humans() {
    const humans = [];
    
    // parameters for each human
    const parameters = [
        { size: 0.55, x:  0.60, y: 4.12, z: 4.8, 
                                    rotationStart: -0.3, rotationEnd:  -0.05 },
        { size: 0.53, x: -3.40, y: 3.85, z: 4.7,
                                    rotationStart: -0.1, rotationEnd: 0.1 },
        { size: 0.48, x:  0.00, y: 5.06, z: 5.9,
                                    rotationStart: -0.1, rotationEnd: 0.05 },
        { size: 0.40, x:  0.20, y: 4.95, z: 5.89, 
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

/**
 * Creates the police.
 * @returns {Array} Array of police meshes.
 */
export function police() {
    const police = [];
    
    // parameters for each police pig
    const parameters = [
        // back row
        { 
            pigs: 9,
            size: 0.55, 
            xStart: 4, 
            xEnd: -5,
            y: 4.8, 
            z: 5.5, 
            rotationStart: -0.3, 
            rotationEnd:  0 
        },
        // front row
        { 
            pigs: 7,
            size: 0.55, 
            xStart: 3.0,
            xEnd: -4,
            y: 4.3, 
            z: 3.8, 
            rotationStart: 0, 
            rotationEnd:  0 
        }
    ];
    
    // loop through rows
    for (let i = 0; i < parameters.length; i++) 
    {        
        // add numberOfPolicePerRow to the row
        for(let p = 0; p < parameters[i].pigs; p++) 
        {
            // distance
            const distance = 
                    Math.abs(parameters[i].xEnd - parameters[i].xStart) /
                        parameters[i].pigs;
            // start
            const start = parameters[i].xStart + (p * distance);
            // end
            const end = parameters[i].xEnd + (p * distance);
            
            const policeman = Anarchia.createPlane({
                name: "police_row_" + i + "_pig_" + p,
                texture: "textures/humans/police.png",
                height: parameters[i].size,
                width: parameters[i].size,
                positionX: start,
                positionY: parameters[i].y,
                positionZ: parameters[i].z
            });

            // move animation
            Anarchia.createAnimation(policeman,
            { // config
                property: "position.x"
            },
            [ // keys
                { 
                    frame: Timeline.filmStart, 
                    value: start
                },{ 
                    frame: Timeline.police.moveStart,
                    value: start
                },{ 
                    frame: Timeline.police.moveEnd,
                    value: end
                },{ 
                    frame: Anarchia.END_FRAME, 
                    value: end 
                }
            ],
            { // easing
                type: new BABYLON.BezierCurveEase(.53,.2,.43,.75),
                mode: BABYLON.EasingFunction.EASINGMODE_EASEIN
            },
            [ // events 
                { // start rotation
                    frame: Timeline.police.moveStart, 
                    callback: function() {
                        const group = new BABYLON.AnimationGroup();
                        const rotate = new BABYLON.Animation(
                                "rotate_police_row_" + i + "_pig_" + p,
                                "rotation.z",
                                Anarchia.FRAME_RATE,
                                BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
                        );
                        rotate.setKeys([{
                            frame: 0,
                            value: 0 * Math.PI
                        },{
                            frame: 0.5 * Anarchia.FRAME_RATE,
                            value: 2 * Math.PI
                        }]);

                        group.addTargetedAnimation(rotate, policeman);
                        group.play(true);
                    }
                },
                { // stop rotation, blend to up position
                    frame: Timeline.police.moveEnd, 
                    callback: function() {
                        Anarchia.scene.stopAnimation(policeman);

                        const group = new BABYLON.AnimationGroup();
                        const blending = new BABYLON.Animation(
                                "blend_police_row_" + i + "_pig_" + p,
                                "rotation.z",
                                Anarchia.FRAME_RATE,
                                BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
                        blending.enableBlending = true;
                        blending.blendingSpeed = 0.05;
                        blending.setKeys([{
                            frame: 0,
                            value: 2 * Math.PI
                        }]);
                        group.addTargetedAnimation(blending, policeman);
                        group.play(true);
                    }
                }
            ]);

            // add to array
            police.push(policeman);
        }
    }
    
    return police;
}

export function dustclouds() {
    const dustclouds = [];
    
    // parameters for dust clouds
    const p = { 
        textures: [
            "textures/clouds/cloud-blue.png",
            "textures/clouds/cloud-grey.png",
            "textures/clouds/cloud-lightblue.png",
            "textures/clouds/cloud-orange.png",
            "textures/clouds/cloud-yellow.png"
        ],
        width: { // is a real size
            min: 0.5,
            max: 1.5
        },
        height: { // is a multiply of width
            min: 1.5,
            max: 2.0
        },
        x: {
            min: -5,
            max: 3
        },
        rows: [ // rows where we add little randomness
            { y: 4.5, z: 3.8 },
            { y: 5.0, z: 5.5 }
        ],
        yEnd: {
            min: 6,
            max: 9
        },
        rotationZ: 1.5 * Math.PI
    };
    
    const numberOfDustClouds = Anarchia.random(42, 84, 0);
    
    // loop through clouds
    for (let i = 0; i < numberOfDustClouds; i++) 
    {               
        // select random texture
        const textureIndex  = Math.floor(Anarchia.random(0, p.textures.length));
        
        // select random row with imprecision
        const imprecision = 0.2;
        const rowIndex = Math.floor(Anarchia.random(0, p.rows.length));
        const y = p.rows[rowIndex].y + Anarchia.random(-imprecision, imprecision);
        const z = p.rows[rowIndex].z + Anarchia.random(-imprecision, imprecision);
        
        // create random cloud
        const dustcloud = Anarchia.createPlane({
            name: "dustcloud_" + i,
            texture: p.textures[textureIndex],
            height: 0,
            width: 0,
            positionX: Anarchia.random(p.x.min, p.x.max),
            positionY: y,
            positionZ: z,
            rotationZ: p.rotationZ
        });
        
        const ease = {
            type: new BABYLON.SineEase(),
            mode: BABYLON.EasingFunction.EASINGMODE_EASEINOUT
        };
        
        // random start until 2 seconds before end
        const start = Anarchia.random(
                Timeline.dustclouds.show,
                Timeline.dustclouds.hide - 2 * Anarchia.FRAME_RATE,
                0
        );
        // random end in the last second
        const end = Anarchia.random(
                Timeline.dustclouds.hide,
                Timeline.dustclouds.hide - 1 * Anarchia.FRAME_RATE,
                0
        );

        // random width
        const width = Anarchia.random(p.width.min, p.width.max);
        // random height based on width
        const height = width * Anarchia.random(p.height.min, p.height.max);
        
        // scale height
        Anarchia.createAnimation(dustcloud, {
            property: "scaling.y"
        },[ // keys
            { frame: Timeline.filmStart, value: 0 },
            {
                frame: start,
                value: 0
            },{ 
                frame: start + 0.2 * Anarchia.FRAME_RATE,
                value: height
            },{ 
                frame: end,
                value: 0
            },
            { frame: Anarchia.END_FRAME, value: 0 }
        ], ease, []);

        // scale width
        Anarchia.createAnimation(dustcloud, {
            property: "scaling.x"
        },[ // keys
            { frame: Timeline.filmStart, value: 0 },
            { 
                frame: start, 
                value: 0 
            },{
                frame: start + 0.2 * Anarchia.FRAME_RATE, 
                value: width 
            },{
                frame: end, 
                value: 0 
            },
            { frame: Anarchia.END_FRAME, value: 0 }
        ], ease, []);

        // random end position
        const yEnd = Anarchia.random(p.yEnd.min, p.yEnd.max);
        
        // move animation
        Anarchia.createAnimation(dustcloud,
        { // config
            property: "position.y"
        },
        [ // keys
            { 
                frame: Timeline.filmStart, 
                value: y
            },{ 
                frame: start,
                value: y
            },{ 
                frame: end,
                value: yEnd
            },{ 
                frame: Anarchia.END_FRAME, 
                value: yEnd
            }
        ],
        { // easing
            type: new BABYLON.BezierCurveEase(.62,.01,.68,.63),
            mode: BABYLON.EasingFunction.EASINGMODE_EASEIN
        },
        [] // events 
        );

        // add to array
        dustclouds.push(dustcloud);
    }
    
    return dustclouds;
}

/**
 * Creates the balloons.
 * @returns {Array} Array of balloon meshes.
 */
export function balloons() {
    const balloons = [];
    
    const parameters = [{
        // balloon 0 aliens
        x: -1, 
        y: 6, 
        z: 5,
        width: 4,
        height: 2
    },{
        // balloon 1 punks
        x: 0, 
        y: 5.5, 
        z: 5,
        width: 2,
        height: 1
    },{
        // balloon 2 aliens
        x: -1.2, 
        y: 5.5, 
        z: 5,
        width: 1,
        height: 1
    }];
    
    for(let i = 0; i < parameters.length; i++) {
    
        const p = parameters[i];
        const t = Timeline.balloons[i];
    
        const balloon = Anarchia.createPlane({
            name: "balloon_" + i,
            texture: "textures/balloon.png",
            height: 0,
            width: 0,
            positionX: p.x,
            positionY: p.y,
            positionZ: p.z
        });

        const ease = {
            type: new BABYLON.SineEase(),
            mode: BABYLON.EasingFunction.EASINGMODE_EASEINOUT
        };
        const width = p.width;
        const height = p.height;

        // scale height
        Anarchia.createAnimation(balloon, {
            property: "scaling.y"
        },[ // keys
            { 
                frame: Timeline.filmStart * Anarchia.FRAME_RATE,
                value: 0
            },{ 
                frame: t.show,
                value: 0
            },{ 
                frame: t.show + 0.2 * Anarchia.FRAME_RATE,
                value: height 
            },{
                frame: t.hide, 
                value: height * 0.95
            },{ 
                frame: t.hide + 0.1 * Anarchia.FRAME_RATE, 
                value: 0
            },{
                frame: Anarchia.END_FRAME, 
                value: 0
            }
        ], ease, []);

        // scale width
        Anarchia.createAnimation(balloon, {
            property: "scaling.x"
        },[ // keys
            { frame: Timeline.filmStart, value: 0 },

            { frame: t.show, value: 0 },
            { frame: t.show + 0.2 * Anarchia.FRAME_RATE, value: width },

            { frame: t.hide, value: width * 1.1 },
            { frame: t.hide + 0.1 * Anarchia.FRAME_RATE, value: 0 },

            { frame: Anarchia.END_FRAME, value: 0 }
        ], ease, []);

        // fill with contents
        balloonContents(i, balloon);
        
        balloons.push(balloon);
    }
    
    return balloons;
}

/**
 * Fills balloons with contents.
 * @param {Integer] i The index of the balloon.
 * @param {BABYLON.Mesh} balloon The balloon.
 */
function balloonContents(i, balloon) {
    const t = Timeline.balloons[i];
    
    // aliens 1
    if(i == 0) {
        // star
        let star = Anarchia.createPlane({
            name: "balloon_0_star",
            texture: "textures/balloon_0_star.png"
        });
        star.setParent(balloon);
        star.position.x = -0.2;
        star.position.y = 0.05;
        star.position.z = 100;
        star.scaling.x = 0.2;
        star.scaling.y = 0.4;
        Anarchia.createAnimation(star, { property: "position.z" },[ // keys
            { frame: Timeline.filmStart, value: 100 },
            { frame: t.star, value: -0.1 },        
            { frame: Anarchia.END_FRAME, value: -0.1 }
        ]);

        // anarchy
        let anarchy = Anarchia.createPlane({
            name: "balloon_0_anarchy",
            texture: "textures/anarchy.png"
        });
        anarchy.setParent(balloon);
        anarchy.position.x = -0.08;
        anarchy.position.y = 0.1;
        anarchy.position.z = 100;
        anarchy.scaling.x = 0.2;
        anarchy.scaling.y = 0.4;
        Anarchia.createAnimation(anarchy, { property: "position.z" },[ // keys
            { frame: Timeline.filmStart, value: 100 },
            { frame: t.anarchy, value: -0.1 },        
            { frame: Anarchia.END_FRAME, value: -0.1 }
        ]);

        // tvtower
        let tvtower = Anarchia.createPlane({
            name: "balloon_0_tvtower",
            texture: "textures/city/tvtower.png"
        });
        tvtower.setParent(balloon);
        tvtower.position.x = 0.07;
        tvtower.position.y = 0.08;
        tvtower.position.z = 100;
        tvtower.scaling.x = 0.1;
        tvtower.scaling.y = 0.55;
        Anarchia.createAnimation(tvtower, { property: "position.z" },[ // keys
            { frame: Timeline.filmStart, value: 100 },
            { frame: t.tvtower, value: -0.1 },        
            { frame: Anarchia.END_FRAME, value: -0.1 }
        ]);

        // cat
        let cat = Anarchia.createPlane({
            name: "balloon_0_cat",
            texture: "textures/balloon_0_cat.png"
        });
        cat.setParent(balloon);
        cat.position.x = 0.12;
        cat.position.y = -0.05;
        cat.position.z = 100;
        cat.scaling.x = 0.13;
        cat.scaling.y = 0.4;
        Anarchia.createAnimation(cat, { property: "position.z" },[ // keys
            { frame: Timeline.filmStart, value: 100 },
            { frame: t.cat, value: -0.11 },
            { frame: Anarchia.END_FRAME, value: -0.11 }
        ]);

        // flyback
        let flyback = Anarchia.createPlane({
            name: "balloon_0_flyback",
            texture: "textures/balloon_0_flyback.png"
        });
        flyback.setParent(balloon);
        flyback.position.x = 0.28;
        flyback.position.y = -0.05;
        flyback.position.z = 100;
        flyback.scaling.x = 0.25;
        flyback.scaling.y = 0.6;
        Anarchia.createAnimation(flyback, { property: "position.z" },[ // keys
            { frame: Timeline.filmStart, value: 100 },
            { frame: t.flyback, value: -0.1 },        
            { frame: Anarchia.END_FRAME, value: -0.1 }
        ]);
        
        return; // 0
    }
    
    // punks
    if(i == 1) {
        // aliens
        let aliens = Anarchia.createPlane({
            name: "balloon_1_aliens",
            texture: "textures/aliens/alien_0.png"
        });
        aliens.setParent(balloon);
        aliens.position.x = -0.2;
        aliens.position.y = 0.05;
        aliens.position.z = 100;
        aliens.scaling.x = 0.2;
        aliens.scaling.y = 0.4;
        Anarchia.createAnimation(aliens, { property: "position.z" },[ // keys
            { frame: Timeline.filmStart, value: 100 },
            { frame: t.aliens, value: -0.1 },        
            { frame: Anarchia.END_FRAME, value: -0.1 }
        ]);
        
        // star
        let star = Anarchia.createPlane({
            name: "balloon_1_star",
            texture: "textures/balloon_0_star.png"
        });
        star.setParent(balloon);
        star.position.x = 0;
        star.position.y = 0.05;
        star.position.z = 100;
        star.scaling.x = 0.2;
        star.scaling.y = 0.4;
        Anarchia.createAnimation(star, { property: "position.z" },[ // keys
            { frame: Timeline.filmStart, value: 100 },
            { frame: t.star, value: -0.1 },        
            { frame: Anarchia.END_FRAME, value: -0.1 }
        ]);
        
        // moshpit
        let moshpit = Anarchia.createPlane({
            name: "balloon_1_moshpit",
            texture: "textures/moshpit.png"
        });
        moshpit.setParent(balloon);
        moshpit.position.x = 0.2;
        moshpit.position.y = 0.05;
        moshpit.position.z = 100;
        moshpit.scaling.x = 0.2;
        moshpit.scaling.y = 0.4;
        Anarchia.createAnimation(moshpit, { property: "position.z" },[ // keys
            { frame: Timeline.filmStart, value: 100 },
            { frame: t.moshpit, value: -0.1 },        
            { frame: Anarchia.END_FRAME, value: -0.1 }
        ]);
        
        return; // 0
    }
    
    // aliens 2
    if(i == 2) {
        // moshpit
        let moshpit = Anarchia.createPlane({
            name: "balloon_2_moshpit",
            texture: "textures/moshpit.png"
        });
        moshpit.setParent(balloon);
        moshpit.position.x = 0;
        moshpit.position.y = 0.05;
        moshpit.position.z = 100;
        moshpit.scaling.x = 0.4;
        moshpit.scaling.y = 0.4;
        Anarchia.createAnimation(moshpit, { property: "position.z" },[ // keys
            { frame: Timeline.filmStart, value: 100 },
            { frame: t.moshpit, value: -0.1 },        
            { frame: Anarchia.END_FRAME, value: -0.1 }
        ]);
        
        return; // 0
    }
}