/* global BABYLON */

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
    END_FRAME: 0,
    
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
     * Generates random number between min (inclusive) and max (inclusive).
     * @param {Number} min inclusive minimum number
     * @param {Number} max inclusive maximum number
     * @returns {Number} A random number.
     */
    getRandomInt: function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max) + 1;
        return Math.floor(Math.random() * (max - min) + min);
    },
    
    /**
     * Which part of the animation to play
     * @param {Number} startSecond
     * @param {Number} endSecond
     */
    duration: function(startSecond, endSecond) {
        this.START_SECOND = startSecond;
        this.END_SECOND = endSecond;
        this.START_FRAME = startSecond * this.FRAME_RATE;
        this.END_FRAME = endSecond * this.FRAME_RATE;
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
     * @returns {BABYLON.Mesh} The plane
     */
    createPlane: function(config) {
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
     * @param {type} config
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
        
        const param = {
            name: "",
            property: "",
            type: BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            loop: BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
        };
        
        // properties
        if(! config) config = {};
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
                event.second * this.FRAME_RATE, event.callback, true
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
     * @param {Number} [height=1] The height on y axis relativ to current position.
     * @param {Number} [end=0] The end position on y axis relativ to current position.
     * @param {Number} [speed=1] The animation speed factor.
     * @param {Number} [bounces=1] The bounces at animation end, see BABYLON.BounceEase.
     * @param {Number} [bounciness=5] The bounciness, see BABYLON.BounceEase.
     */
    jump: function(mesh, height, end, speed, bounces, bounciness) {        
        if(typeof height == "undefined") height = 1;
        if(typeof end == "undefined") end = 0;
        if(typeof speed == "undefined") speed = 1;
        if(typeof bounces == "undefined") bounces = 1;
        if(typeof bounciness == "undefined") bounciness = 5;
        
        const ratio = height / (height + height - end);
        const posYup = this.createAnimation(mesh, {
            property: "position.y"
        },[ // keys
            { frame: 0 * this.FRAME_RATE, value: mesh.position.y },
            { frame: 0.2 * this.FRAME_RATE, value: mesh.position.y },
            { frame: (0.8 * ratio) * this.FRAME_RATE, value: mesh.position.y + height }
        ],{ // easing
            type: new BABYLON.CircleEase(),
            mode: BABYLON.EasingFunction.EASINGMODE_EASEOUT
        });

        const posYdown = this.createAnimation(mesh, {
            property: "position.y"
        },[ // keys
            { frame: (0.8 * ratio) * this.FRAME_RATE, value: mesh.position.y + height },
            { frame: this.FRAME_RATE, value: mesh.position.y + end }
        ],{ // easing
            type: new BABYLON.BounceEase(bounces, bounciness),
            mode: BABYLON.EasingFunction.EASINGMODE_EASEOUT
        });

        const scaleX = this.createAnimation(mesh, {
            property: "scaling.x",
            loop: BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
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
            loop: BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
        },[ // keys
            { frame: 0.00 * this.FRAME_RATE, value: 1 },
            { frame: 0.10 * this.FRAME_RATE, value: 0.6 },
            { frame: 0.20 * this.FRAME_RATE, value: 1 },
            { frame: 0.77 * this.FRAME_RATE, value: 1 },
            { frame: 0.87 * this.FRAME_RATE, value: 0.6 },
            { frame: 0.97 * this.FRAME_RATE, value: 1 }
        ]);

        // squeeze
        this.scene.beginDirectAnimation(mesh, [scaleY, scaleX],
            0, this.FRAME_RATE, false, speed);
        
        // jump
        const self = this;
        this.scene.beginDirectAnimation(mesh, [posYup],
            0, this.FRAME_RATE, false, speed, function() {
                self.scene.beginDirectAnimation(mesh, [posYdown],
                    0, self.FRAME_RATE, false, speed);
        });
    },
    
    addJittery: function(mesh, jitter) {
        if(typeof jitter == "undefined") jitter = {};
        
        const param = {
            scaleX: { span: 0, duration: 0 },
            scaleY: { span: 0, duration: 0 },
            rotateZ: { span: 0, duration: 0 },
            moveX: { span: 0, duration: 0 },
            moveY: { span: 0, duration: 0 }
        };
        
        // properties
        for(const property in jitter) {
            param[property] = jitter[property];
        }
        
        // scaleX
        if(param.scaleX.span > 0) {
            let span = param.scaleX.span;
            let duration = param.scaleX.duration;
            
            const scaleX = this.createAnimation(mesh, {
                property: "scaling.x",
                loop: BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
            },[ // keys
                { frame: span * 0.0 * this.FRAME_RATE, value: 1 },
                { frame: span * 0.5 * this.FRAME_RATE,
                    value: 0.9 + this.getRandomInt(0,9) * 0.01 },
                { frame: span * 1.0 * this.FRAME_RATE, value: 1 },
                { frame: duration * this.FRAME_RATE, value: 1 }
            ],{ // easing
                type: new BABYLON.CircleEase(),
                mode: BABYLON.EasingFunction.EASINGMODE_EASEINOUT
            });
            
            scaleX.enableBlending = true;
            mesh.animations.push(scaleX);
        }
        
        // scaleY
        if(param.scaleY.span > 0) {
            let span = param.scaleY.span;
            let duration = param.scaleY.duration;
            
            const scaleY = this.createAnimation(mesh, {
                property: "scaling.y",
                loop: BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
            },[ // keys
                { frame: span * 0.0 * this.FRAME_RATE, value: 1 },
                { frame: span * 0.5 * this.FRAME_RATE, value: 0.9 },
                { frame: span * 1.0 * this.FRAME_RATE, value: 1 },
                { frame: duration * this.FRAME_RATE, value: 1 }
            ],{ // easing
                type: new BABYLON.CircleEase(),
                mode: BABYLON.EasingFunction.EASINGMODE_EASEINOUT
            });
            
            scaleY.enableBlending = true;
            mesh.animations.push(scaleY);
        }
        
        // rotateZ
        if(param.rotateZ.span > 0) {
            let span = param.rotateZ.span;
            let duration = param.rotateZ.duration;
            
            const rotateZ = this.createAnimation(mesh, {
                property: "rotation.z",
                loop: BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
            },[ // keys
                { frame: span * 0.0 * this.FRAME_RATE, value:  0.0 * Math.PI },
                { frame: span * 0.5 * this.FRAME_RATE, value:  0.05 * Math.PI },
                { frame: span * 1.0 * this.FRAME_RATE, value:  0.0 * Math.PI },
                { frame: duration * this.FRAME_RATE, value: 0 * Math.PI }
            ],{ // easing
                type: new BABYLON.BounceEase(1, 5),
                mode: BABYLON.EasingFunction.EASINGMODE_EASEOUT
            });
            
            rotateZ.enableBlending = true;
            mesh.animations.push(rotateZ);
        }
        
        // moveX
        if(param.moveX.span > 0) {
            let span = param.moveX.span;
            let duration = param.moveX.duration;
            
            const moveX = this.createAnimation(mesh, {
                property: "position.x",
                loop: BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
            },[ // keys
                { frame: span * 0.0 * this.FRAME_RATE, value: 0 },
                { frame: span * 0.5 * this.FRAME_RATE, value: 1 },
                { frame: span * 1.0 * this.FRAME_RATE, value: 0 },
                { frame: duration * this.FRAME_RATE, value: 0 }
            ]);
            
            moveX.enableBlending = true;
            mesh.animations.push(moveX);
        }
    }
}