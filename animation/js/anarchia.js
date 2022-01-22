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
     * The animation group that will hold all animations.
     * @type BABYLON.AnimationGroup
     */
    animations: null,

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
        this.animations.addTargetedAnimation(animation, mesh);
        
        return animation;
    }
}