/*
 byte-data
 Bytes to and from numbers and strings.
 Copyright (c) 2017 Rafael da Silva Rocha.
 https://github.com/rochars/byte-data

 riffwave64
 Read & write wave files with 8, 16, 24, 32 PCM, 32 IEEE & 64-bit data.
 Copyright (c) 2017 Rafael da Silva Rocha.
 https://github.com/rochars/riffwave64
 https://tr2099.github.io

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


base64-arraybuffer is licensed as follows:

Copyright (c) 2012 Niklas von Hertzen

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

*/
(function(e){function g(h){if(f[h])return f[h].a;var a=f[h]={ma:h,ca:!1,a:{}};e[h].call(a.a,a,a.a,g);a.ca=!0;return a.a}var f={};g.o=e;g.g=f;g.b=function(e,a){g.c(e)||Object.defineProperty(e,"a",{configurable:!1,enumerable:!0,get:a})};g.h=function(e){var a=e&&e.la?function(){return e["default"]}:function(){return e};g.b(a,a);return a};g.c=function(e){return Object.prototype.hasOwnProperty.call(e,"a")};g.l="";return g(g.U=2)})([function(e,g,f){g=f(5);f=f(6);e.a.G=g.G;e.a.F=g.F;e.a.f=g.f;e.a.J=g.J;
e.a.i=g.i;e.a.I=g.I;e.a.m=g.m;e.a.T=f.T;e.a.L=f.L;e.a.A=f.A;e.a.u=f.u;e.a.H=f.H;e.a.$=f.$;e.a.s=f.s;e.a.v=f.v;e.a.C=f.C;e.a.D=f.D;e.a.j=f.j},function(e){function g(b){h[0]=b;return a[0]}var f=new Int8Array(4),h=new Int32Array(f.buffer,0,1),a=new Float32Array(f.buffer,0,1);e.a=g;e.a.fa=g;e.a.ia=function(b){a[0]=b;return h[0]}},function(e,g,f){function h(b){return c.W(b)}var a=f(3);e=f(4);f=f(7);var b=new e.ba,c=new f.aa;window.writeWavBytes=function(a,c,e,f){return b.M(a,c,e,f)};window.writeWavBase64=
function(c,k,e,f){c=b.M(c,k,e,f);return a.encode(c)};window.writeWavDataURI=function(c,k,e,f){c=b.M(c,k,e,f);return"data:audio/wav;base64,"+a.encode(c)};window.readWavBytes=h;window.readWavBase64=function(b){return h(new Uint8Array(a.decode(b)))};window.readWavDataURI=function(b){b=new Uint8Array(a.decode(b.replace("data:audio/wav;base64,","")));return c.W(b)};window.interleave=function(b){var a=[],c,d,e=b[0].length;for(c=0;c<e;c++)for(d=0;d<b.length;d++)a.push(b[d][c]);return a};window.deInterleave=
function(b,a){var c=[],d;for(d=0;d<a;d++)c[d]=[];d=0;for(var k;d<b.length;){for(k=0;k<a;k++)c[k].push(b[d+k]);d+=k}return c}},function(e,g){(function(){for(var e=new Uint8Array(256),h=0;64>h;h++)e["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(h)]=h;g.encode=function(a){a=new Uint8Array(a);var b,c=a.length,d="";for(b=0;b<c;b+=3)d+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[a[b]>>2],d+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(a[b]&
3)<<4|a[b+1]>>4],d+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(a[b+1]&15)<<2|a[b+2]>>6],d+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[a[b+2]&63];2===c%3?d=d.substring(0,d.length-1)+"\x3d":1===c%3&&(d=d.substring(0,d.length-2)+"\x3d\x3d");return d};g.decode=function(a){var b=.75*a.length,c=a.length,d=0;"\x3d"===a[a.length-1]&&(b--,"\x3d"===a[a.length-2]&&b--);var k=new ArrayBuffer(b),f=new Uint8Array(k);for(b=0;b<c;b+=4){var h=e[a.charCodeAt(b)];var g=
e[a.charCodeAt(b+1)];var l=e[a.charCodeAt(b+2)];var m=e[a.charCodeAt(b+3)];f[d++]=h<<2|g>>4;f[d++]=(g&15)<<4|l>>2;f[d++]=(l&3)<<6|m&63}return k}})()},function(e,g,f){function h(){this.l=this.g=0;this.b="";this.h=[];this.c=[];this.o={8:1,16:1,24:1,32:1,"32f":3,64:3};this.U={8:a.I,16:a.i,24:a.J,32:a.f,"32f":a.F,64:a.G}}var a=f(0);h.prototype.M=function(b,a,d,k){this.da(b,a,d);this.g=b;this.l=a;this.h=k.slice();this.b=d;this.ha();return this.ga(this.ea())};h.prototype.ka=function(b,a,d){var c=!1;4294967295>=
parseInt(d,10)/8*b*a&&(c=!0);if(1>a||!c||"number"!==typeof a||0!==a%1)throw Error("Invalid sample rate for this bit depth and number of channels.");};h.prototype.ja=function(b,a){var c=!1;65535>=parseInt(a,10)/8*b&&(c=!0);if(1>b||!c||"number"!==typeof b||0!==b%1)throw Error("Invalid number of channels.");};h.prototype.da=function(b,a,d){if("string"!==typeof d||!(d in this.o))throw Error('Bit depth must a string, one of: "8", "16", "24", "32", "32f", "64".');this.ja(b,d);this.ka(b,a,d)};h.prototype.ga=
function(b){return b.R.concat(a.f([b.S]),b.format,b.X,a.f([b.Y]),a.i([b.B]),a.i([b.V]),a.f([b.sampleRate]),a.f([b.P]),a.i([b.O]),a.i([b.w]),b.Z,a.f([b.K]),this.c)};h.prototype.ea=function(){var b=parseInt(this.b,10)/8;return{R:a.m("RIFF"),S:36+this.h.length*b,format:a.m("WAVE"),X:a.m("fmt "),Y:16,B:this.o[this.b],V:this.g,sampleRate:this.l,P:this.g*b*this.l,O:this.g*b,w:parseInt(this.b,10),Z:a.m("data"),K:this.h.length*b}};h.prototype.ha=function(){this.c=this.U[this.b](this.h);this.c.length%2&&this.c.push(0)};
e.a.ba=h},function(e,g,f){var h=f(1);e.a.G=function(a){for(var b=0,c=0,d=a.length,k=[];b<d;){if(0==a[b])k[c++]=0,k[c++]=0,k[c++]=0,k[c++]=0,k[c++]=0,k[c++]=0,k[c++]=0,k[c++]=0;else{var e=a[b],f=0;0>=e&&(f=2147483648,e=-e);var h=Math.floor(Math.log(e)/Math.log(2)),g=Math.floor(e/Math.pow(2,h)*Math.pow(2,52));e=g&4294967295;g/=Math.pow(2,32);f=f|h+1023<<20|g&1048575;a[b]=[f,e];k[c++]=a[b][1]&255;k[c++]=a[b][1]>>8&255;k[c++]=a[b][1]>>16&255;k[c++]=a[b][1]>>24&255;k[c++]=a[b][0]&255;k[c++]=a[b][0]>>8&
255;k[c++]=a[b][0]>>16&255;k[c++]=a[b][0]>>24&255}b++}return k};e.a.F=function(a){for(var b=0,c=0,d=a.length,e=[];b<d;)a[b]=h.ia(a[b]),e[c++]=a[b]&255,e[c++]=a[b]>>8&255,e[c++]=a[b]>>16&255,e[c++]=a[b]>>24&255,b++;return e};e.a.f=function(a){for(var b=0,c=0,d=a.length,e=[];b<d;)e[c++]=a[b]&255,e[c++]=a[b]>>8&255,e[c++]=a[b]>>16&255,e[c++]=a[b]>>24&255,b++;return e};e.a.J=function(a){for(var b=0,c=0,d=a.length,e=[];b<d;)e[c++]=a[b]&255,e[c++]=a[b]>>8&255,e[c++]=a[b]>>16&255,b++;return e};e.a.i=function(a){for(var b=
0,c=0,d=a.length,e=[];b<d;)e[c++]=a[b]&255,e[c++]=a[b]>>8&255,b++;return e};e.a.I=function(a){for(var b=0,c=0,d=a.length,e=[];b<d;)e[c++]=a[b]&255,b++;return e};e.a.m=function(a){for(var b=0,c=0,d=a.length,e=[];b<d;)e[c++]=a.charCodeAt(b),b++;return e}},function(e,g,f){var h=f(1);e.a.T=function(a){for(var b=[],c=0,d=a.length;c<d;)b[c]=a[c],127<b[c]&&(b[c]-=256),c+=1;return b};e.a.L=function(a){return a.slice()};e.a.A=function(a){for(var b=[],c=0,d=0,e=a.length;c<e;)b[d]=a[1+c]<<8|a[c],a[1+c]&128&&
(b[d]|=4294901760),d++,c+=2;return b};e.a.u=function(a){for(var b=[],c=0,d=0,e=a.length;c<e;)b[d]=a[1+c]<<8|a[c],d++,c+=2;return b};e.a.H=function(a){for(var b=[],c=0,d=0,e=a.length;c<e;)b[d]=a[2+c]<<16|a[1+c]<<8|a[c],b[d]=0<(b[d]&8388608)?b[d]|4278190080:b[d]&16777215,d++,c+=3;return b};e.a.$=function(a){for(var b=[],c=0,d=0,e=a.length;c<e;)b[d]=a[2+c]<<16|a[1+c]<<8|a[c],d++,c+=3;return b};e.a.s=function(a){for(var b=[],c=0,d=0,e=a.length;c<e;)b[d]=a[3+c]<<24|a[2+c]<<16|a[1+c]<<8|a[c],0>(b[d]&2147483648)&&
(b[d]&=4294967295),d++,c+=4;return b};e.a.v=function(a){for(var b=[],c=0,d=0,e=a.length;c<e;)b[d]=a[3+c]<<24|a[2+c]<<16|a[1+c]<<8|a[c],b[d]>>>=0,d++,c+=4;return b};e.a.C=function(a){for(var b=[],c=0,d=0,e=a.length;c<e;)b[d]=h.fa(a[3+c]<<24|a[2+c]<<16|a[1+c]<<8|a[c]),d++,c+=4;return b};e.a.D=function(a){for(var b=[],c=0,d=0,e=a.length;c<e;){var f,h=[a[c],a[1+c],a[2+c],a[3+c],a[4+c],a[5+c],a[6+c],a[7+c]];if("0,0,0,0,0,0,0,0"==h.toString())var g=0;else{g="";for(var l=0,m=h.length;l<m;){for(f=h[l].toString(2);8>
f.length;)f="0"+f;g=f+g;l++}f="1"+g.substr(12,52);h=1;for(l=m=0;l<f.length;)m+=h*parseInt(f.charAt(l),10),h/=2,l++;g=("1"==g.charAt(0)?-1:1)*m*Math.pow(2,parseInt(g.substr(1,11),2)-1023);g=2===g?0:g}b[d]=g;d++;c+=8}return b};e.a.j=function(a){for(var b="",c=0,d=a.length;c<d;)b+=String.fromCharCode(a[c]),c++;return b}},function(e,g,f){function h(){this.c={8:a.L,16:a.A,24:a.H,32:a.s,"32f":a.C,64:a.D}}var a=f(0);h.prototype.W=function(b){var a={};this.l(a,b);this.o(a,b);this.h(a,b);this.g(a,b);return a};
h.prototype.l=function(b,c){var d=this.b(c,"RIFF");b.R=a.j(c.slice(d,d+4));b.S=a.s(c.slice(d+4,d+8))[0]};h.prototype.o=function(b,c){var d=this.b(c,"WAVE");if(0==d)throw Error('Could not find the "WAVE" chunk');b.X=a.j(c.slice(d,d+4))};h.prototype.h=function(b,c){var d=this.b(c,"fmt ");if(0==d)throw Error('Could not find the "fmt " chunk');b.format=a.j(c.slice(d,d+4));b.Y=a.v(c.slice(d+4,d+8))[0];b.B=a.A(c.slice(d+8,d+10))[0];b.V=a.u(c.slice(d+10,d+12))[0];b.sampleRate=a.v(c.slice(d+12,d+16))[0];
b.P=a.v(c.slice(d+16,d+20))[0];b.O=a.u(c.slice(d+20,d+22))[0];b.w=a.u(c.slice(d+22,d+24))[0];3==b.B&&32==b.w?b.N="32f":b.N=b.w.toString()};h.prototype.g=function(b,c){var d=this.b(c,"data");if(0==d)throw Error("Could not find the data chunk");b.Z=a.j(c.slice(d,d+4));b.K=a.s(c.slice(d+4,d+8))[0];b.na=this.c[b.N](c.slice(d+8,d+8+b.K))};h.prototype.b=function(b,c){var d,e=0;for(d=0;d<b.length;d++)if(a.j(b.slice(d,d+4))==c){e=d;break}return e};e.a.aa=h}]);
