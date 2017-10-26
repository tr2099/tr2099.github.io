/*!
 * 2099 Sweep Composer
 * https://tr2099.github.io/
 * See LICENSE for copyright information.
 *
 */

class TR2099 {

    constructor() {
        this._samples = [];
        this._amplitude = 0;
        this._sampleRate = 0;
        this._bitDepth = 0;
        this._sumSamples = false;
        this._waveform = {
            "noise": noise,
            "square": square,
            "sawtooth": sawtooth,
            "sine": sine,
            "triangle": triangle
        };
    }

    sequenceToDataURI(sequence, bitDepth, sampleRate, sum, attack, release, stereo, fx) {
        this._sumSamples = sum;
        this._sampleRate = sampleRate;
        this._bitDepth = bitDepth;
        this._attack = attack;
        this._release = release;
        this._setAmplitude(fx.decimate);
        var sampleSequence = this._getSamples(sequence);
        // FIXME rectification should happen with the other
        //  filters, but it sounds awful when waves are sum
        if (fx.rectify) {
            rectifier(sampleSequence, fx.rectify);
        }
        sum ? this._sum(sampleSequence) : this._sequence(sampleSequence);
        if (fx.lpf) {
            lowPassFilter(this._samples, fx.lpf, this._sampleRate, 1);
        }
        if (fx.dither) {
            dithering(this._samples, fx.dither);
        }
        this._gain();
        if (fx.decimate) {
            this._fixDecimated(sequence.length);
        }
        //let rw64 = new RiffWave64();
        if (bitDepth === '4') {
            //this._bitDepth = 4;
        } else if(bitDepth === '8') {
            this._fix8BitRange();
        } else if(bitDepth == '32f') {
            this._fix32IEEERange();
        } else if(bitDepth == '64') {
            this._fix64BitRange();
        }
        let numChannels = 1;
        if (stereo) {
            let stereoSamples = [
                this._samples,
                this._samples
            ];
            this._samples = interleave(stereoSamples);
            numChannels = 2;
        }
        return writeWavDataURI(
            numChannels, this._sampleRate, this._bitDepth, this._samples);
    }

    _fix8BitRange() {
        for(var i=0; i<this._samples.length; i++) {
            this._samples[i] += 127;
        }
    }

    _fix32IEEERange() {
        for(var i=0; i<this._samples.length; i++) {
            this._samples[i] /= 2147483648;
        }
    }

    _fix64BitRange() {
        for(var i=0; i<this._samples.length; i++) {
            this._samples[i] /= 9223372036854775808;
        }
    }

    _setAmplitude(decimate) {
        let bitDepth = decimate ? parseInt(decimate) : parseInt(this._bitDepth);
        this._amplitude = BitDepths[bitDepth] * 0.7;
    }

    // FIXME decimation is a FX, does not belong here
    _fixDecimated(sequenceLen) {
        let i;
        for (i = 0; i < this._samples.length; i++) {
            if (this._samples[i] > 0) {
                this._samples[i] = parseInt(this._samples[i]) / this._amplitude;
            }else {
                this._samples[i] = parseInt(this._samples[i]) / (this._amplitude + 1);
            }
        }
        this._amplitude = BitDepths[parseInt(this._bitDepth)] * 0.7;
        if (this._sumSamples)
            this._amplitude = this._amplitude / sequenceLen;
        this._gain();
    }

    _getSamples(sequence) {
        var phi0 = 0;
        var phase = 0;
        var data = [];
        var i = 0;
        var x = 0;
        var numSamples = 0;
        var actualduration = 0;
        var sample = 0;
        var delta = 0;
        for (i = 0; i < sequence.length; i++) {
            data[i] = {
                "samples": [],
                "waveform": sequence[i].waveform,
                "time": sequence[i].time
            };
            numSamples = Math.round(this._sampleRate * sequence[i].time);
            actualduration = numSamples / this._sampleRate;
            for (x = 0; x < numSamples; x++) {
                delta = x / numSamples;
                sample = this._waveform[sequence[i].waveform](
                        actualduration * delta,
                        delta,
                        phase,
                        sequence[i],
                        phi0);
                data[i].samples.push(sample);
            }
            phase = 2 * Math.PI * actualduration *
                (sequence[i].start + (sequence[i].end - sequence[i].start) / 2);
            phi0 = phi0 + phase;
        }
        return data;
    }

    _sequence(sampleSequence) {
        var samples = [];
        var i;
        var z;
        for (i = 0; i < sampleSequence.length; i++) {
            for (z = 0; z < sampleSequence[i].samples.length; z++) {
                samples.push(sampleSequence[i].samples[z]);
            }
        }
        this._samples = samples;
    }

    _sum(sampleSequence) {
        var biggest = 0;
        var biggest_i = 0;
        var different_times = false;
        var final = [];
        var i;
        var j;
        this._amplitude = this._amplitude / sampleSequence.length;
        for (i = 0; i < sampleSequence.length; i++) {
            if (sampleSequence[i].time * this._sampleRate > biggest) {
                biggest = sampleSequence[i].time * this._sampleRate;
                biggest_i = i;
                if (i > 0) different_times = true;
            }
        }
        for (i = 0; i < biggest; i++) {
            final[i] = 0;
        }
        for (i = 0; i < sampleSequence.length; i++) {
            for (j = 0; j < sampleSequence[i].samples.length; j++) {
                if (different_times) {
                    // light fade out to avoid clip, but not on the longest sample
                    if (j > sampleSequence[i].samples.length / 1.1)
                        this._releaseOnSum(
                            sampleSequence, this._sampleRate, j, i, biggest_i);
                }
                final[j] = parseFloat(sampleSequence[i].samples[j]) +
                    parseFloat(final[j]);
            }
        }
        this._samples = final;
    }

    _releaseOnSum(sequence, j, i, biggest_i) {
        var actualdurationx = sequence[i].samples.length / this._sampleRate;
        var fadeOutx = (actualdurationx) * 0.1;
        var numSamplesx = Math.round(this._sampleRate * actualdurationx);
        var tx = 0;
        var deltax = 0;
        actualdurationx = numSamplesx / this._sampleRate;
        deltax = j / numSamplesx;
        tx = actualdurationx * deltax;
        if (i != biggest_i) {
            sequence[i].samples[j] = sequence[i].samples[j] /
                (fadeOutx / (actualdurationx - tx) *
                    fadeOutx / (actualdurationx - tx));
        }
    }

    _gain() {
        var real_amplitude;
        var i;
        for (i = 0; i < this._samples.length; i++) {
            real_amplitude = this._attackDecay(i);
            if (this._samples[i] > 0) {
                this._samples[i] = this._samples[i] * real_amplitude;
            }else {
                this._samples[i] = this._samples[i] * (real_amplitude + 1);
            }
        }
    }

    _attackDecay(i) {
        var attack = 100 - this._attack;
        var t;
        var delta;
        var real_amplitude;
        var actualduration = this._samples.length / this._sampleRate;
        var fadeIn = actualduration * (attack / 100);
        var fadeOut = (actualduration - fadeIn) * (this._release / 100);
        var numSamples = Math.round(this._sampleRate * actualduration);
        actualduration = numSamples / this._sampleRate;
        delta = i / numSamples;
        t = actualduration * delta;
        if (t > fadeIn) {
            if (t < actualduration - fadeOut) {
                real_amplitude = this._amplitude;
            } else {
                //real_amplitude = amplitude / (fadeOut / (actualduration - t));
                real_amplitude = this._amplitude / (
                    (fadeOut / (actualduration - t) * fadeOut /
                        (actualduration - t))
                );
            }
        } else {
            //real_amplitude = amplitude / (fadeIn / t); // fade in
            if (fadeIn) {
                real_amplitude = this._amplitude / (fadeIn / t * fadeIn / t);
            } else {
                real_amplitude = this._amplitude;
            }
        }
        return real_amplitude;
    }
}
