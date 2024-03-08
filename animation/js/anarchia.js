/* global BABYLON */

import * as Sounds from "./sounds.js";

export default {
    /**
     * frame rate
     * @type Number
     */
    FRAME_RATE: 25,

    /**
     * start of animation in frames
     * @type Number
     */
    START_FRAME: 0,

    /**
     * end of animation in frames
     * ! beware: that won't function very properly
     * @type Number
     */
    END_FRAME: 1,
    
    /**
     * start of animation in frames
     * @type Number
     */
    START_SECOND: 0,

    /**
     * end of animation in frames
     * ! beware: that won't function very properly
     * @type Number
     */
    END_SECOND: 0,

    /**
     * canvas to draw animation on
     * @type HTMLElement
     */
    canvas: null,

    /**
     * 
     * @type BABYLON.Engine
     */
    engine: null,
    
    /**
     * The sound library.
     * @type object with BABYLON.Sound objects
     */
    sounds: {
        song: null
    },
    
    /**
     * The scene, that will be looped.
     * @type BABYLON.Scene
     */
    scene: null,
    
    /**
     * The array of animatable meshes to start at beginning.
     * @type Array
     */
    animations: [],
    
    /**
     * Show loading indicator.
     */
    showLoading: function(callback) {
        if(typeof callback != "function") callback = function() {};
        
        $("#loading").fadeIn('fast', callback);
    },
    
    /**
     * Hide loading indicator.
     */
    hideLoading: function(callback) {
        if(typeof callback != "function") callback = function() {};
        
        $("#loading").fadeOut('slow', callback);
    },
    
    /**
     * Show buttons.
     */
    showButtons: function(callback) {
        if(typeof callback != "function") callback = function() {};
        
        $("#bar").fadeIn('fast', callback);
    },
    
    /**
     * Hide buttons.
     */
    hideButtons: function(callback) {
        if(typeof callback != "function") callback = function() {};
        
        $("#bar").fadeOut('slow', callback);
    },

    /**
     * Generates random float between min (inclusive) and max (inclusive).
     * @param {Float} min inclusive minimum number
     * @param {Float} max inclusive maximum number
     * @param {Integer} [decimals] round to decimal places
     * @returns {Float} The random float number.
     */
    random: function(min, max, decimals) {
        const float = Math.random() * (max - min) + min;
        if(typeof decimals != "undefined") {
            return parseFloat(float.toFixed(decimals));
        }
        return parseFloat(float);
    },
    
    /**
     * Which part of the animation to play
     * @param {Number} startSecond
     * @param {Number} endSecond
     */
    duration: function(startSecond, endSecond) {
        this.START_SECOND = startSecond;
        this.END_SECOND = endSecond;
        
        /**
         * Bug in BABYLON, that throw a type error when start frame is 0:
         * > TypeError: AudioListener.setPosition: Argument 1 is not a finite 
         * > floating-point value.
         * We set it to 1, to avoid this.
         */
        if(startSecond == 0) {
            this.START_FRAME = 1;
        } else {
            this.START_FRAME = startSecond * this.FRAME_RATE;
        }
        
        this.END_FRAME = endSecond * this.FRAME_RATE;
    },
    
    /**
     * Starts the animation.
     */
    play: function() {
        let self = this;
        
        // show loading
        self.hideButtons(function() {
            self.showLoading();
        });        
        
        Sounds.song( // load and start music
        
            // screen on    
            function() {
            
                // render screen
                self.engine.runRenderLoop(function () {
                    self.scene.render();
                });

                // animations on
                self.animations.forEach(function(mesh) {
                    self.scene.beginAnimation(mesh,
                            self.START_FRAME, self.END_FRAME);
                });

                // hide buttons
                self.hideLoading();
            }
        );
    },
    
    /**
     * Creates a plane with a texture.
     * @param {object} config Data for the plane:
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
     *          uScale = 1
     *          uOffset = 0
     *          vScale = 1
     *          vOffset = 0
     *          visible = true
     * @returns {BABYLON.Mesh} The plane
     */
    createPlane: function(config) {
        if(typeof config == "undefined") config = {};
        
        const param = {
            name: "",
            
            width: 0,
            height: 0,
            
            positionX: 0,
            positionY: 0,
            positionZ: 0,
            
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            
            texture: "",
            alpha: true,
            uScale: 1,
            uOffset: 0,
            vScale: 1,
            vOffset: 0,
            
            visible: true
        };
        for(const property in config) {
            param[property] = config[property];
        }
        
        const mesh = BABYLON.MeshBuilder.CreatePlane(param.name, {
            height: param.height,
            width: param.width
        });
        
        mesh.isVisible = param.visible;
        
        mesh.position.x = param.positionX;
        mesh.position.y = param.positionY;
        mesh.position.z = param.positionZ;
        
        mesh.rotation.x = param.rotationX;
        mesh.rotation.y = param.rotationY;
        mesh.rotation.z = param.rotationZ;
        
        if(param.texture != false) {
            const material = new BABYLON.StandardMaterial(param.name + "-material");
            material.diffuseTexture = new BABYLON.Texture(param.texture);
            material.diffuseTexture.hasAlpha = param.alpha;
            material.diffuseTexture.uScale = param.uScale;
            material.diffuseTexture.uOffset = param.uOffset;
            material.diffuseTexture.vScale = param.vScale;
            material.diffuseTexture.vOffset = param.vOffset;

            mesh.material = material;
        }
        
        return mesh;
    },
    
    /**
     * Creates an animation
     * @param {type} [config]
     *          [name=""]
     *          [property=""]
     *          [type=BABYLON.Animation.ANIMATIONTYPE_FLOAT]
     *          [loop=BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT]
     * @param {type} keys
     * @param {type} easing
     * @param {type} events
     * @returns {BABYLON.Animation}
     */
    createAnimation: function(mesh, config, keys, easing, events) {
        if(typeof mesh == "undefined") return;
        if(typeof keys == "undefined") return;
        if(typeof config == "undefined") config = {};
        if(typeof easing == "undefined") easing = null;
        if(typeof events == "undefined") events = [];
        
        // config
        const param = {
            name: "",
            property: "",
            type: BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            loop: BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        };
        for(const property in config) {
            param[property] = config[property];
        }
        
        // create
        const animation = new BABYLON.Animation(
            param.name,
            param.property,
            this.FRAME_RATE,
            param.type,
            param.loop
        );
        
        // keys
        if(! keys) keys = [];
        animation.setKeys(keys);
        
        // easing
        if(easing) {
            const ease = easing.type;
            ease.setEasingMode(easing.mode);
            animation.setEasingFunction(ease);
        }
        
        // events
        if(! events) events = [];
        events.forEach(function(event) {
            animation.addEvent(new BABYLON.AnimationEvent(
                event.frame, event.callback, true
            ));
        }, this);
        
        // add animation
        mesh.animations.push(animation);
        
        // add to animatable meshes when not done yet
        if(this.animations.indexOf(mesh) < 0) {
            this.animations.push(mesh);
        }
        
        return animation;
    },
    
    /**
     * Do a mesh jump.
     * @param {BABYLON.Mesh} mesh
     * @param {Object} [config] The parameters of the jump:
     *      [height=1] The height of the jump.
     *      [end=0] The end position on y axis relativ to current position.
     *      [speed=1] The animation speed factor.
     *      [bounces=1] The bounces at animation end, see BABYLON.BounceEase.
     *      [bounciness=5] The bounciness, see BABYLON.BounceEase.
     */
    jump: function(mesh, config) {
        if(typeof config == "undefined") config = {};
        
        const param = {
            height: 1,
            end: 0,
            speed: 1,
            bounces: 1,
            bounciness: 5
        };        
        for(const property in config) {
            param[property] = config[property];
        }
        
        const ratio = param.height / (param.height + param.height - param.end);
        const posYup = this.createAnimation(mesh, {
            property: "position.y"
        },[ // keys
            { frame: 0 * this.FRAME_RATE, value: mesh.position.y },
            { frame: 0.2 * this.FRAME_RATE, value: mesh.position.y },
            { frame: (0.8 * ratio) * this.FRAME_RATE, 
                    value: mesh.position.y + param.height }
        ],{ // easing
            type: new BABYLON.CircleEase(),
            mode: BABYLON.EasingFunction.EASINGMODE_EASEOUT
        });

        const posYdown = this.createAnimation(mesh, {
            property: "position.y"
        },[ // keys
            { frame: (0.8 * ratio) * this.FRAME_RATE, 
                    value: mesh.position.y + param.height },
            { frame: this.FRAME_RATE, value: mesh.position.y + param.end }
        ],{ // easing
            type: new BABYLON.BounceEase(param.bounces, param.bounciness),
            mode: BABYLON.EasingFunction.EASINGMODE_EASEOUT
        });

        const scaleX = this.createAnimation(mesh, {
            property: "scaling.x",
            //loop: BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
        },[ // keys
            { frame: 0.00 * this.FRAME_RATE, value: 1 },
            { frame: 0.10 * this.FRAME_RATE, value: 1.6 },
            { frame: 0.20 * this.FRAME_RATE, value: 1 },
            { frame: 0.77 * this.FRAME_RATE, value: 1 },
            { frame: 0.87 * this.FRAME_RATE, value: 1.6 },
            { frame: 0.97 * this.FRAME_RATE, value: 1 }
        ]);

        const scaleY = this.createAnimation(mesh, {
            property: "scaling.y",
            //loop: BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
        },[ // keys
            { frame: 0.00 * this.FRAME_RATE, value: 1 },
            { frame: 0.10 * this.FRAME_RATE, value: 0.6 },
            { frame: 0.20 * this.FRAME_RATE, value: 1 },
            { frame: 0.77 * this.FRAME_RATE, value: 1 },
            { frame: 0.87 * this.FRAME_RATE, value: 0.6 },
            { frame: 0.97 * this.FRAME_RATE, value: 1 }
        ]);
        
        // blending
        scaleX.enableBlending = true;
        scaleY.enableBlending = true;

        // squeeze
        this.scene.beginDirectAnimation(mesh, [scaleY, scaleX],
            0, this.FRAME_RATE, false, param.speed);
        
        // jump
        const self = this;
        this.scene.beginDirectAnimation(mesh, [posYup],
            0, this.FRAME_RATE, false, param.speed, function() {
                self.scene.beginDirectAnimation(mesh, [posYdown],
                    0, self.FRAME_RATE, false, param.speed);
        });
    },
    
    /**
     * Adds random jumping to a mesh.
     * @param {BABYLON.Mesh} mesh
     * @param {Object} [config] Parameters for random jumping:
     *      [minHeight=0.1] The min height for a jump.
     *      [maxHeight=1] The max height for a jump.
     *      [minPause=0] The minimal break between two jumps.
     *      [maxPause=5] The maximal break between two jumps.
     */
    randomJumping: function(mesh, config) {
        if(typeof config == "undefined") config = {};
       
        const param = {
            minHeight: 0.1,
            maxHeight: 1,
            minPause: 0,
            maxPause: 5,
            base: mesh.position.y
        };        
        for(const property in config) {
            param[property] = config[property];
        }
        
        // convert sec to msec
        param.minPause *= 1000;
        param.maxPause *= 1000;
        
        // do jumping & save timer
        mesh.randomJumpTimers = mesh.randomJumpTimers || [];
        const self = this;
        const jumpInterval = function() {
            
            self.jump(mesh, {
                height: self.random(param.minHeight, param.maxHeight)
            });
            
            mesh.randomJumpTimers.push(
                window.setTimeout(jumpInterval, 
                    param.minPause
                    + self.random(0, param.maxPause - param.minPause, 0)
                )
            );
            // TODO: clear old timeout saved in array to save memory
        };
        mesh.randomJumpTimers.push(
            window.setTimeout(jumpInterval, 
                param.minPause
                + self.random(0, param.maxPause - param.minPause, 0)
            )
        );
    },
    
    /**
     * Stops the random jumps.
     * @param {BABYLON.Mesh} mesh
     */
    stopJumping: function(mesh) {
        if(typeof mesh.randomJumpTimers == "undefined") return;
        
        // TODO: remove old timers from array to save memory
        mesh.randomJumpTimers.forEach(function(timer) {
            window.clearTimeout(timer);
        });
    },
    
    /**
     * Adds jitter animations to a mesh.
     * ! BEWARE: Use "position.{x,y,z}" very carefully as property, as this will
     * interact with and maybe break other moving animations.
     * @param {BABYLON.Mesh} mesh
     * @param {Object} [config] The config:
     *          [property="scaling.x"]
     *          [beginValue=0]
     *          [maxValue=1]
     *          [minDuration=1]
     *          [maxDuration=1]
     *          [minPause=0]
     *          [maxPause=0]
     *          [easeType=new BABYLON.CircleEase()]
     *          [easeMode=BABYLON.EasingFunction.EASINGMODE_EASEINOUT]
     */
    addJitter: function(mesh, config) {
        if(typeof config == "undefined") config = {};
       
        const param = {
            property: "scaling.x",
            beginValue: 1,
            maxValue: 1.3,
            minDuration: 1,
            maxDuration: 1,
            minPause: 0,
            maxPause: 0,
            easeType: new BABYLON.CircleEase(),
            easeMode: BABYLON.EasingFunction.EASINGMODE_EASEINOUT
        };        
        for(const property in config) {
            param[property] = config[property];
        }
        
        // convert sec to msec
        param.minPause *= 1000;
        param.maxPause *= 1000;
        
        mesh.randomJitterTimers = mesh.randomJitterTimers || [];
        const self = this;
        
        const jitterInterval = function() {
            const duration = self.random(param.minDuration, param.maxDuration);
            const changeValue = self.random(0, 1) * param.maxValue;
            
            const jitter = self.createAnimation(mesh, {
                property: param.property,
                loop: BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
            },[ // keys
                { frame: duration * 0.0 * self.FRAME_RATE, 
                    value: param.beginValue },
                { frame: duration * 0.5 * self.FRAME_RATE, 
                    value: changeValue },
                { frame: duration * 1.0 * self.FRAME_RATE, 
                    value: param.beginValue }
            ],{ // easing
                type: param.easeType,
                mode: param.easeMode
            });
            jitter.enableBlending = true;
            
            self.scene.beginDirectAnimation(mesh, [jitter], 
                    0, duration * self.FRAME_RATE, false);
                        
            mesh.randomJitterTimers.push(
                window.setTimeout(jitterInterval, 
                    param.minPause 
                    + self.random(0, param.maxPause - param.minPause, 0)
                )
            );
            // TODO: clear old timeout saved in array to save memory
        };
        mesh.randomJitterTimers.push(
            window.setTimeout(jitterInterval, 
                param.minPause
                + self.random(0, param.maxPause - param.minPause, 0)
            )
        );
    },
    
    /**
     * Stops the random jitters.
     * @param {BABYLON.Mesh} mesh
     */
    stopJitters: function(mesh) {
        if(typeof mesh.randomJitterTimers == "undefined") return;
        
        // TODO: remove old timers from array to save memory
        mesh.randomJitterTimers.forEach(function(timer) {
            window.clearTimeout(timer);
        });
    },
}