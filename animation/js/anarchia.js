/* global BABYLON */

const Anarchia = {
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
     * The song, that will be played.
     * @type BABYLON.Sound
     */
    music: null,
    
    /**
     * The scene, that will be looped.
     * @type BABYLON.Scene
     */
    scene: null,

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
     * @returns {BABYLON.Mesh} The plane
     */
    createPlane: function(config) {
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
            rotationZ: 0,
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
};