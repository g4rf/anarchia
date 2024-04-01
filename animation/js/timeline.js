import Anarchia from "./anarchia.js";

/**
 * Holds all timeline data in frames.
 */
export default {
    filmStart: 0 * Anarchia.FRAME_RATE,
    
    // camera
    camera: {
        start:                8 * Anarchia.FRAME_RATE,
        toiletStart:         10 * Anarchia.FRAME_RATE,
        heinrichplatz:       12 * Anarchia.FRAME_RATE,
        punksZoomStart:      41 * Anarchia.FRAME_RATE,
        punksZoomEnd:        42 * Anarchia.FRAME_RATE,
        policeZoomStart:     56 * Anarchia.FRAME_RATE,
        policeZoomEnd:       85 * Anarchia.FRAME_RATE
    },
    
    // ufo fly
    ufoflyPositionStart:   4 * Anarchia.FRAME_RATE,    
    ufoflyPositionLanded: 11 * Anarchia.FRAME_RATE,
    
    // ufo landed
    ufolandedPositionStart:  11 * Anarchia.FRAME_RATE,
    ufolandedPositionLanded: 15 * Anarchia.FRAME_RATE,
    ufolandedOpenTop:        15 * Anarchia.FRAME_RATE,
    ufolandedTopOpened:      19 * Anarchia.FRAME_RATE,
    
    alien: [{
        // alien 0
        jumpOut:         19 * Anarchia.FRAME_RATE,
        randomJumps:     21 * Anarchia.FRAME_RATE,
        pogoStart:       31 * Anarchia.FRAME_RATE,
        pogoEnd:         41 * Anarchia.FRAME_RATE,
        policePogoStart: 62 * Anarchia.FRAME_RATE,
        policePogoEnd:   73 * Anarchia.FRAME_RATE
    },{ // alien 1
        jumpOut:         19.1 * Anarchia.FRAME_RATE,
        randomJumps:     21.1 * Anarchia.FRAME_RATE,
        pogoStart:       32.0 * Anarchia.FRAME_RATE,
        pogoEnd:         42.0 * Anarchia.FRAME_RATE,
        policePogoStart: 64.0 * Anarchia.FRAME_RATE,
        policePogoEnd:   73.0 * Anarchia.FRAME_RATE
    },{ // alien 2
        jumpOut:         19.2 * Anarchia.FRAME_RATE,
        randomJumps:     21.2 * Anarchia.FRAME_RATE,
        pogoStart:       33 * Anarchia.FRAME_RATE,
        pogoEnd:         43 * Anarchia.FRAME_RATE,
        policePogoStart: 64.0 * Anarchia.FRAME_RATE,
        policePogoEnd:   73.0 * Anarchia.FRAME_RATE
    },{ // alien 3
        jumpOut:         19.3 * Anarchia.FRAME_RATE,
        randomJumps:     21.3 * Anarchia.FRAME_RATE,
        pogoStart:       31.5 * Anarchia.FRAME_RATE,
        pogoEnd:         40.5 * Anarchia.FRAME_RATE,
        policePogoStart: 63.5 * Anarchia.FRAME_RATE,
        policePogoEnd:   72.5 * Anarchia.FRAME_RATE
    },{ // alien 4
        jumpOut:         19.4 * Anarchia.FRAME_RATE,
        randomJumps:     21.4 * Anarchia.FRAME_RATE,
        pogoStart:       32.5 * Anarchia.FRAME_RATE,
        pogoEnd:         41.5 * Anarchia.FRAME_RATE,
        policePogoStart: 63.5 * Anarchia.FRAME_RATE,
        policePogoEnd:   72.5 * Anarchia.FRAME_RATE
    },{ // alien 5
        jumpOut:         19.5 * Anarchia.FRAME_RATE,
        randomJumps:     21.5 * Anarchia.FRAME_RATE,
        pogoStart:       33.0 * Anarchia.FRAME_RATE,
        pogoEnd:         42.0 * Anarchia.FRAME_RATE,
        policePogoStart: 63.0 * Anarchia.FRAME_RATE,
        policePogoEnd:   73.0 * Anarchia.FRAME_RATE
    },{ // alien 6
        jumpOut:         19.6 * Anarchia.FRAME_RATE,
        randomJumps:     21.6 * Anarchia.FRAME_RATE,
        pogoStart:       34.0 * Anarchia.FRAME_RATE,
        pogoEnd:         41.5 * Anarchia.FRAME_RATE,
        policePogoStart: 63.0 * Anarchia.FRAME_RATE,
        policePogoEnd:   72.5 * Anarchia.FRAME_RATE
    },{ // alien 7
        jumpOut:         19.7 * Anarchia.FRAME_RATE,
        randomJumps:     21.7 * Anarchia.FRAME_RATE,
        pogoStart:       31.5 * Anarchia.FRAME_RATE,
        pogoEnd:         41.8 * Anarchia.FRAME_RATE,
        policePogoStart: 63.5 * Anarchia.FRAME_RATE,
        policePogoEnd:   72.8 * Anarchia.FRAME_RATE
    }],

    // punks
    punks: [{
        // punk 0
        jumpIn: [{
            start:    37 * Anarchia.FRAME_RATE,
            end:      37.8 * Anarchia.FRAME_RATE
        },{
            start:    39 * Anarchia.FRAME_RATE,
            end:      39.8 * Anarchia.FRAME_RATE
        },{
            start:    41 * Anarchia.FRAME_RATE,
            end:      41.7 * Anarchia.FRAME_RATE
        },{
            start:    44 * Anarchia.FRAME_RATE,
            end:      44.5 * Anarchia.FRAME_RATE
        },{
            start:    47 * Anarchia.FRAME_RATE,
            end:      47.5 * Anarchia.FRAME_RATE
        }],
        policePogoStart: 64 * Anarchia.FRAME_RATE,
        policePogoEnd:   73 * Anarchia.FRAME_RATE
    },{
        // punk 1
        jumpIn: [{
            start:    37.1 * Anarchia.FRAME_RATE,
            end:      37.9 * Anarchia.FRAME_RATE
        },{
            start:    38.8 * Anarchia.FRAME_RATE,
            end:      39.7 * Anarchia.FRAME_RATE
        },{
            start:    41.1 * Anarchia.FRAME_RATE,
            end:      41.8 * Anarchia.FRAME_RATE
        },{
            start:    45 * Anarchia.FRAME_RATE,
            end:      45.4 * Anarchia.FRAME_RATE
        },{
            start:    48 * Anarchia.FRAME_RATE,
            end:      48.4 * Anarchia.FRAME_RATE
        }],
        policePogoStart: 64 * Anarchia.FRAME_RATE,
        policePogoEnd:   73 * Anarchia.FRAME_RATE
    }],

    // police
    police: {
        moveStart:    50 * Anarchia.FRAME_RATE,
        moveEnd:      60 * Anarchia.FRAME_RATE       
    },
    
    // humans
    humans: {
        jitterStart:   15.1 * Anarchia.FRAME_RATE,
        escapeStart:   52 * Anarchia.FRAME_RATE
    },
    
    // clouds
    dustclouds: {
        // dust cloud blue
        show:   54 * Anarchia.FRAME_RATE,
        hide:   85 * Anarchia.FRAME_RATE
    },
    
    // balloons
    balloons: [{
        show:       21 * Anarchia.FRAME_RATE,
        star:       21 * Anarchia.FRAME_RATE,
        anarchy:    22.5 * Anarchia.FRAME_RATE,
        tvtower:    24.5 * Anarchia.FRAME_RATE,
        cat:        25.5 * Anarchia.FRAME_RATE,
        flyback:    30 * Anarchia.FRAME_RATE,
        hide:       32 * Anarchia.FRAME_RATE 
    },{
        show:       47 * Anarchia.FRAME_RATE,
        aliens:     47.5 * Anarchia.FRAME_RATE,
        star:       48.5 * Anarchia.FRAME_RATE,
        moshpit:    50 * Anarchia.FRAME_RATE,
        hide:       52 * Anarchia.FRAME_RATE
    },{
        show:       52.5 * Anarchia.FRAME_RATE,
        moshpit:    53 * Anarchia.FRAME_RATE,
        hide:       58 * Anarchia.FRAME_RATE
    }],
        
    // combats
    combats: {
        stool: {
            raiseStart:     74 * Anarchia.FRAME_RATE,
            raiseEnd:       75 * Anarchia.FRAME_RATE,
            downStart:      82 * Anarchia.FRAME_RATE,
            downEnd:        84 * Anarchia.FRAME_RATE
        }
    }
}