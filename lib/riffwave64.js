/*!
 * riffwave64.js: Create wave files with 8, 16, 24, 32 PCM, 32 IEEE & 64 bit depth audio.
 * by Rafael da Silva Rocha
 * https://github.com/rochars/riffwave64
 *
 * Based on RIFFWAVE.js v0.03 by Pedro Ladaria.
 *
 * Adapted to support 8, 24, 32 PCM, 32 IEEE & 64 bit based on many references:
 * Prof. Peter Kabal (on everything):
 *  http://www-mmsp.ece.mcgill.ca/Documents/AudioFormats/WAVE/WAVE.html
 * Chris Rudmin (on 32-bit PCM):
 *  https://github.com/chris-rudmin/Recorderjs
 * Matt DesLauriers (on 32-bit IEEE):
 *  https://github.com/Jam3/int-bits
 * and also:
 * https://stackoverflow.com/a/11617848
 * https://stackoverflow.com/questions/15935365/convert-float-to-bytes-in-javascript-without-float32array
 * https://en.wikipedia.org/wiki/Audio_bit_depth
 * And many more. Thanks.
 *
 * rw64 = new RiffWave64();
 * wavFile = rw64.write(1, 48000, 24, samples);
 * 
 */

class RiffWave64 {

    constructor() {
        this.bytes_ = [];
        this.int8_ = new Int8Array(4);
        this.int32_ = new Int32Array(this.int8_.buffer, 0, 1);
        this.float32_ = new Float32Array(this.int8_.buffer, 0, 1);
        // 1 = standard PCM
        // 3 = IEEE
        this.headerFormats_ = {
            '8': 1,
            '16': 1,
            '24': 1,
            '32': 1,
            '32f': 3, 
            '48': 1,
            '64': 3
        };
    }

    /**
     * Create and return a wave file.
     *
     * @param {number} numChannels The number of channels
     *     (1 for mono, 2 stereo and so on).
     * @param {number} sampleRate The sample rate.
     *     Ints like 8000, 44100, 48000, 192000, etc.
     * @param {number} bitDepth The audio bit depth.
     *     one of "8", "16", "24", "32", "32f", "64".
     * @param {!Array<number>} samples List of samples to be written.
     */
    write(numChannels, sampleRate, bitDepth, samples) {
        this.numChannels_ = numChannels;
        this.sampleRate_ = sampleRate;
        let i;
        if (bitDepth === '8') {
            for(i=0; i<samples.length; i++) {
                samples[i] += 128;
            }
        }else if (bitDepth === '32f') {
            for (i=0; i<samples.length; i++) {
                samples[i] = this.unpack_(
                    samples[i] * (1 / 21474836478));
            }
        }else if (bitDepth === '64') {
            for (i=0; i<samples.length; i++) {
                samples[i] = this.toFloat64_(
                    samples[i] * (1 / 9223372036854775808));
            }
        }
        this.samples_ = samples;
        this.bitDepth_ = bitDepth;
        this.splitSamples_();
        let header = this.createWaveFileHeader_();
        return this.createWaveFile_(header);
    }

    /**
     * Return an array of bytes representing the wave file.
     */
    createWaveFile_(header) {
        return header.chunkId.concat(
            this.u32ToArray_(header.chunkSize),
            header.format,
            header.subChunk1Id,
            this.u32ToArray_(header.subChunk1Size),
            this.u16ToArray_(header.audioFormat),
            this.u16ToArray_(header.numChannels),
            this.u32ToArray_(header.sampleRate),
            this.u32ToArray_(header.byteRate),
            this.u16ToArray_(header.blockAlign),
            this.u16ToArray_(header.bitsPerSample),
            header.subChunk2Id,
            this.u32ToArray_(header.subChunk2Size),
            this.bytes_);
    }

    /**
     * Return a structure with the wave file header data.
     */
    createWaveFileHeader_() {
        let bitDepth = parseInt(this.bitDepth_);
        let samplesLength = this.samples_.length;
        return {
            chunkId      : [0x52,0x49,0x46,0x46],
            chunkSize    : 36 + samplesLength * (bitDepth >> 3),
            format       : [0x57,0x41,0x56,0x45],
            subChunk1Id  : [0x66,0x6d,0x74,0x20],
            subChunk1Size: 16,
            audioFormat  : this.headerFormats_[this.bitDepth_],
            numChannels  : this.numChannels_,
            sampleRate   : this.sampleRate_,
            byteRate     : ((this.numChannels_ * bitDepth) >> 3) * this.sampleRate_,
            blockAlign   : (this.numChannels_ * bitDepth) >> 3,
            bitsPerSample: bitDepth,
            subChunk2Id  : [0x64,0x61,0x74,0x61], 
            subChunk2Size: samplesLength * (bitDepth >> 3)
        };
    }

    /**
     * Unpack a 32bit integer to an array of bytes.
     * @param {number} i A int32 number.
     */
    u32ToArray_(i) {
        return [i&0xFF, (i>>8)&0xFF, (i>>16)&0xFF, (i>>24)&0xFF];
    }

    /**
     * Split a 16bit integer to an array of bytes.
     * @param {number} i A int16 number.
     */    
    u16ToArray_(i) {
        return [i&0xFF, (i>>8)&0xFF];
    }

    /**
     * Split each sample to an array of bytes
     * to be written on the file.
     */
    splitSamples_() {
        let j = 0;
        let i = 0;
        let len = this.samples_.length;
        let bitDepth = parseInt(this.bitDepth_);
        for (i=0; i<len; i++) {
            if (bitDepth === 8) {
                this.bytes_[j++] = this.samples_[i] & 0xFF;
            } else if (bitDepth === 16) { 
                this.bytes_[j++] = this.samples_[i] & 0xFF;
                this.bytes_[j++] = (this.samples_[i] >> 8) & 0xFF;
            } else if (bitDepth === 24) {
                this.bytes_[j++] = this.samples_[i] & 0xFF;
                this.bytes_[j++] = (this.samples_[i] >> 8) & 0xFF;
                this.bytes_[j++] = (this.samples_[i] >> 16) & 0xFF;
            } else if (bitDepth === 32) {
                this.bytes_[j++] = this.samples_[i] & 0xFF;
                this.bytes_[j++] = (this.samples_[i] >> 8) & 0xFF;
                this.bytes_[j++] = (this.samples_[i] >> 16) & 0xFF;
                this.bytes_[j++] = (this.samples_[i] >> 24) & 0xFF;
            } else if (bitDepth === 64) {
                this.bytes_[j++] = this.samples_[i][1] & 0xFF;
                this.bytes_[j++] = (this.samples_[i][1] >> 8) & 0xFF;
                this.bytes_[j++] = (this.samples_[i][1] >> 16) & 0xFF;
                this.bytes_[j++] = (this.samples_[i][1] >> 24) & 0xFF;
                this.bytes_[j++] = (this.samples_[i][0] >> 32) & 0xFF;
                this.bytes_[j++] = (this.samples_[i][0] >> 40) & 0xFF;
                this.bytes_[j++] = (this.samples_[i][0] >> 48) & 0xFF;
                this.bytes_[j++] = (this.samples_[i][0] >> 56) & 0xFF;
            }
        }
    }

    /**
     * Unpack a float64 number.
     * @param {number} value A float64 number.
     */
    toFloat64_(value) {
        let hiWord = 0;
        let loWord = 0;
        switch (value) {
            case +0.0:
                hiWord = 0x40000000;
                break;
            case -0.0:
                hiWord = 0xC0000000;
                break;
            default:
                if (value <= -0.0) {
                    hiWord = 0x80000000;
                    value = -value;
                }
                let exponent = Math.floor(
                    Math.log(value) / Math.log(2));
                let significand = Math.floor(
                    (value / Math.pow(2, exponent)) * Math.pow(2, 52));
                loWord = significand & 0xFFFFFFFF;
                significand /= Math.pow(2, 32);
                exponent += 1023;
                if (exponent >= 0x7FF) {
                    exponent = 0x7FF;
                    significand = 0;
                } else if (exponent < 0) {
                    exponent = 0;
                }
                hiWord = hiWord | (exponent << 20);
                hiWord = hiWord | (significand & ~(-1 << 20));
                break;
        }
        return [hiWord, loWord];
    }

    /**
     * unpack() thanks to https://github.com/Jam3/int-bits
     * Copyright (c) 2015 Jam3. License at the bottom of this file.
     *
     * Unpack a float32 number.
     * @param {number} f A float32 number.
     */
    unpack_(f) {
        this.float32_[0] = f;
        return this.int32_[0];
    }
}

/*
 * riffwave64 is licensed as follows:
 *
 * Copyright (c) 2017 Rafael da Silva Rocha.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *
 * int-bits is licensed as follows:
 *
 * The MIT License (MIT) Copyright (c) 2015 Jam3
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
