/*
 riffwave64 is licensed as follows:

 Copyright (c) 2017 Rafael da Silva Rocha.

 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the
 "Software"), to deal in the Software without restriction, including
 without limitation the rights to use, copy, modify, merge, publish,
 distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to
 the following conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


 int-bits is licensed as follows:

 The MIT License (MIT) Copyright (c) 2015 Jam3

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
var RiffWave64=function(){this.bytes_=[];this.int8_=new Int8Array(4);this.int32_=new Int32Array(this.int8_.buffer,0,1);this.float32_=new Float32Array(this.int8_.buffer,0,1);this.headerFormats_={8:1,16:1,24:1,32:1,"32f":3,48:1,64:3}};
RiffWave64.prototype.write=function(a,b,d,c){this.numChannels_=a;this.sampleRate_=b;if("32f"===d)for(a=0;a<c.length;a++)c[a]=this.unpack_(c[a]);else if("64"===d)for(a=0;a<c.length;a++)c[a]=this.toFloat64_(c[a]);this.samples_=c;this.bitDepth_=d;this.splitSamples_();d=this.createWaveFileHeader_();return this.createWaveFile_(d)};
RiffWave64.prototype.createWaveFile_=function(a){return a.chunkId.concat(this.u32ToArray_(a.chunkSize),a.format,a.subChunk1Id,this.u32ToArray_(a.subChunk1Size),this.u16ToArray_(a.audioFormat),this.u16ToArray_(a.numChannels),this.u32ToArray_(a.sampleRate),this.u32ToArray_(a.byteRate),this.u16ToArray_(a.blockAlign),this.u16ToArray_(a.bitsPerSample),a.subChunk2Id,this.u32ToArray_(a.subChunk2Size),this.bytes_)};
RiffWave64.prototype.createWaveFileHeader_=function(){var a=parseInt(this.bitDepth_),b=this.samples_.length;return{chunkId:[82,73,70,70],chunkSize:36+b*(a>>3),format:[87,65,86,69],subChunk1Id:[102,109,116,32],subChunk1Size:16,audioFormat:this.headerFormats_[this.bitDepth_],numChannels:this.numChannels_,sampleRate:this.sampleRate_,byteRate:(this.numChannels_*a>>3)*this.sampleRate_,blockAlign:this.numChannels_*a>>3,bitsPerSample:a,subChunk2Id:[100,97,116,97],subChunk2Size:b*(a>>3)}};
RiffWave64.prototype.u32ToArray_=function(a){return[a&255,a>>8&255,a>>16&255,a>>24&255]};RiffWave64.prototype.u16ToArray_=function(a){return[a&255,a>>8&255]};
RiffWave64.prototype.splitSamples_=function(){var a=0,b,d=this.samples_.length,c=parseInt(this.bitDepth_);for(b=0;b<d;b++)8===c?this.bytes_[a++]=this.samples_[b]&255:16===c?(this.bytes_[a++]=this.samples_[b]&255,this.bytes_[a++]=this.samples_[b]>>8&255):24===c?(this.bytes_[a++]=this.samples_[b]&255,this.bytes_[a++]=this.samples_[b]>>8&255,this.bytes_[a++]=this.samples_[b]>>16&255):32===c?(this.bytes_[a++]=this.samples_[b]&255,this.bytes_[a++]=this.samples_[b]>>8&255,this.bytes_[a++]=this.samples_[b]>>
16&255,this.bytes_[a++]=this.samples_[b]>>24&255):64===c&&(this.bytes_[a++]=this.samples_[b][1]&255,this.bytes_[a++]=this.samples_[b][1]>>8&255,this.bytes_[a++]=this.samples_[b][1]>>16&255,this.bytes_[a++]=this.samples_[b][1]>>24&255,this.bytes_[a++]=this.samples_[b][0]>>32&255,this.bytes_[a++]=this.samples_[b][0]>>40&255,this.bytes_[a++]=this.samples_[b][0]>>48&255,this.bytes_[a++]=this.samples_[b][0]>>56&255)};
RiffWave64.prototype.toFloat64_=function(a){var b=0,d=0;switch(a){case 0:b=1073741824;break;case -0:b=3221225472;break;default:-0>=a&&(b=2147483648,a=-a);var c=Math.floor(Math.log(a)/Math.log(2));a=Math.floor(a/Math.pow(2,c)*Math.pow(2,52));d=a&4294967295;a/=Math.pow(2,32);c+=1023;2047<=c?(c=2047,a=0):0>c&&(c=0);b=b|c<<20|a&1048575}return[b,d]};RiffWave64.prototype.unpack_=function(a){this.float32_[0]=a;return this.int32_[0]};