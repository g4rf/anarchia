
/* animation start and end in frames; s * frame rate */
(function(startSecond, endSecond) {
    Anarchia.START_SECOND = startSecond;
    Anarchia.END_SECOND = endSecond;
    Anarchia.START_FRAME = startSecond * Anarchia.FRAME_RATE;
    Anarchia.END_FRAME = endSecond * Anarchia.FRAME_RATE;
})(0, 20);