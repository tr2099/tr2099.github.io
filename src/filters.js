/*!
 * 2099 Sweep Composer
 * https://tr2099.github.io/
 * See LICENSE for copyright information.
 *
 * lowPassFilter() was based on pydub's low_pass_filter:
 * https://github.com/jiaaro/pydub/blob/master/pydub/effects.py#L187
 *
 */

/* Decimator */
function decimator(samples) {
    var i;
    for(i=0;i<samples.length;i++) {
        samples[i] = parseFloat(samples[i]).toPrecision(1);
    }
}

/* Rectifier */
function rectifier(sampleSequence, rectification_type) {
    var i;
    var z;
    for(z=0;z<sampleSequence.length;z++) {
        if (sampleSequence[z].waveform != noise)  {
            for (i=0;i<sampleSequence[z].samples.length;i++) {
                if (rectification_type == 1) {
                    if (sampleSequence[z].samples[i] < 0) {
                        sampleSequence[z].samples[i] = sampleSequence[z].samples[i] / 4;
                    }
                }else{
                    if (sampleSequence[z].samples[i] < 0) {
                        sampleSequence[z].samples[i] *=-1;
                        sampleSequence[z].samples[i] = sampleSequence[z].samples[i] / 10;
                    }
                }
                sampleSequence[z].samples[i] = realignRectified(
                    sampleSequence[z].samples[i], rectification_type);
            }
        }
    }
    function realignRectified(sample, rectification_type) {
        if (rectification_type == 1) {
            sample = sample - 1 / 4.1;
            if (sample > 0) {
                sample = sample * 1.3;
            }else {
                sample = sample * 2;
            }
        }else {
            sample = sample - 1 / 4;
            if (sample < 0) {
                sample = sample * 4.2; 
            }else {
                sample = sample * 1.4; 
            }
        }
        return sample;
    }
}

/* Dither */
function dithering(samples, max) {
    var i;
    for (i=0;i<samples.length;i++) {
        var dit = Math.floor((Math.random() * max) + 1) *
            (Math.floor(Math.random() * 2) === 1 ? 1 : -1);
        if (samples[i] > 0) {
            samples[i] -= max * 0.001;
            dit = dit * -0.001;
        }else {
            samples[i] += max * 0.001;
            dit = dit * 0.001;
        }
        samples[i] += dit;
    }
}

/* LPF */
function lowPassFilter(samples, cutoff, frameRate, channels) {
    var RC = 1.0 / (cutoff * 2 * Math.PI);
    var dt = 1.0 / frameRate;
    var alpha = dt / (RC + dt);
    var last_val = [];
    var i;
    var j;
    var offset;
    for (i=0; i < channels;i++) {
        last_val[i] = samples[i];
    }
    for (i =0; i < samples.length; i++) {
        for (j =0;j< channels;j++) {
            offset = (i * channels) + j;
            last_val[j] = last_val[j] + (alpha * (samples[offset] - last_val[j]));
            samples[offset] = last_val[j];
        }
    }
}
