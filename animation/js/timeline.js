import Anarchia from "./anarchia.js";

/**
 * Holds all timeline data in frames.
 */
export default {
    filmStart: 0 * Anarchia.FRAME_RATE,
    
    // camera
    camera: {
        start:                8 * Anarchia.FRAME_RATE,
        toiletStart:         11 * Anarchia.FRAME_RATE,
        toiletEnd:           12 * Anarchia.FRAME_RATE,
        heinrichplatz:       13 * Anarchia.FRAME_RATE,
        punksZoomStart:      44 * Anarchia.FRAME_RATE,
        punksZoomEnd:        45 * Anarchia.FRAME_RATE,
    },
    
    // ufo fly
    ufoflyPositionStart:   7 * Anarchia.FRAME_RATE,    
    ufoflyPositionLanded: 12 * Anarchia.FRAME_RATE,
    
    // ufo landed
    ufolandedPositionStart:  12 * Anarchia.FRAME_RATE,
    ufolandedPositionLanded: 16 * Anarchia.FRAME_RATE,
    ufolandedOpenTop:        16 * Anarchia.FRAME_RATE,
    ufolandedTopOpened:      20 * Anarchia.FRAME_RATE,
    
    alien: [{
        // alien 0
        jumpOut:        20 * Anarchia.FRAME_RATE,
        randomJumps:    22 * Anarchia.FRAME_RATE,
        pogoStart:      32 * Anarchia.FRAME_RATE,
        pogoEnd:        42 * Anarchia.FRAME_RATE,
    },{ // alien 1
        jumpOut:        20.1 * Anarchia.FRAME_RATE,
        randomJumps:    22.1 * Anarchia.FRAME_RATE,
        pogoStart:      33 * Anarchia.FRAME_RATE,
        pogoEnd:        43 * Anarchia.FRAME_RATE,
    },{ // alien 2
        jumpOut:        20.2 * Anarchia.FRAME_RATE,
        randomJumps:    22.2 * Anarchia.FRAME_RATE,
        pogoStart:      34 * Anarchia.FRAME_RATE,
        pogoEnd:        44 * Anarchia.FRAME_RATE,
    },{ // alien 3
        jumpOut:        20.3 * Anarchia.FRAME_RATE,
        randomJumps:    22.3 * Anarchia.FRAME_RATE,
        pogoStart:      32.5 * Anarchia.FRAME_RATE,
        pogoEnd:        41.5 * Anarchia.FRAME_RATE,
    },{ // alien 4
        jumpOut:        20.4 * Anarchia.FRAME_RATE,
        randomJumps:    22.4 * Anarchia.FRAME_RATE,
        pogoStart:      33.5 * Anarchia.FRAME_RATE,
        pogoEnd:        42.5 * Anarchia.FRAME_RATE,
    },{ // alien 5
        jumpOut:        20.5 * Anarchia.FRAME_RATE,
        randomJumps:    22.5 * Anarchia.FRAME_RATE,
        pogoStart:      34 * Anarchia.FRAME_RATE,
        pogoEnd:        43 * Anarchia.FRAME_RATE,
    },{ // alien 6
        jumpOut:        20.6 * Anarchia.FRAME_RATE,
        randomJumps:    22.6 * Anarchia.FRAME_RATE,
        pogoStart:      35 * Anarchia.FRAME_RATE,
        pogoEnd:        43.5 * Anarchia.FRAME_RATE,
    },{ // alien 7
        jumpOut:        20.7 * Anarchia.FRAME_RATE,
        randomJumps:    22.7 * Anarchia.FRAME_RATE,
        pogoStart:      32.5 * Anarchia.FRAME_RATE,
        pogoEnd:        42.8 * Anarchia.FRAME_RATE,
    }],

    // punks
    punks: [{
        // punk 0
        jumpIn: [{
            start:    38 * Anarchia.FRAME_RATE,
            end:      38.8 * Anarchia.FRAME_RATE
        },{
            start:    40 * Anarchia.FRAME_RATE,
            end:      40.8 * Anarchia.FRAME_RATE
        },{
            start:    42 * Anarchia.FRAME_RATE,
            end:      42.7 * Anarchia.FRAME_RATE
        },{
            start:    45 * Anarchia.FRAME_RATE,
            end:      45.5 * Anarchia.FRAME_RATE
        },{
            start:    48 * Anarchia.FRAME_RATE,
            end:      48.5 * Anarchia.FRAME_RATE
        }]        
    },{
        // punk 1
        jumpIn: [{
            start:    38.1 * Anarchia.FRAME_RATE,
            end:      38.9 * Anarchia.FRAME_RATE
        },{
            start:    39.8 * Anarchia.FRAME_RATE,
            end:      40.7 * Anarchia.FRAME_RATE
        },{
            start:    42.1 * Anarchia.FRAME_RATE,
            end:      42.8 * Anarchia.FRAME_RATE
        },{
            start:    46 * Anarchia.FRAME_RATE,
            end:      46.4 * Anarchia.FRAME_RATE
        },{
            start:    49 * Anarchia.FRAME_RATE,
            end:      49.4 * Anarchia.FRAME_RATE
        }]
    }],
    
    // humans
    humanJitterStart:   16.1 * Anarchia.FRAME_RATE,
    
    // balloon 0
    balloon0Show:                      22 * Anarchia.FRAME_RATE,
    balloon0Star:                      22 * Anarchia.FRAME_RATE,
    balloon0Anarchy:                   23.5 * Anarchia.FRAME_RATE,
    balloon0Tvtower:                   25.5 * Anarchia.FRAME_RATE,
    balloon0Cat:                       26.5 * Anarchia.FRAME_RATE,
    balloon0Flyback:                   31 * Anarchia.FRAME_RATE,
    balloon0Hide:                      33 * Anarchia.FRAME_RATE 
    
}