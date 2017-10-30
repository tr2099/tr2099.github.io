/*
 byte-data
 Bytes to and from numbers and strings.
 Copyright (c) 2017 Rafael da Silva Rocha.
 https://github.com/rochars/byte-data

 %LICENSES%

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
(function(c){function h(g){if(f[g])return f[g].a;var a=f[g]={ka:g,ba:!1,a:{}};c[g].call(a.a,a,a.a,h);a.ba=!0;return a.a}var f={};h.o=c;h.g=f;h.b=function(c,a){h.c(c)||Object.defineProperty(c,"a",{configurable:!1,enumerable:!0,get:a})};h.h=function(c){var a=c&&c.ja?function(){return c["default"]}:function(){return c};h.b(a,a);return a};h.c=function(c){return Object.prototype.hasOwnProperty.call(c,"a")};h.l="";return h(h.J=2)})([function(c,h,f){h=f(5);f=f(6);c.a.G=h.G;c.a.F=h.F;c.a.f=h.f;c.a.I=h.I;
c.a.i=h.i;c.a.M=h.M;c.a.m=h.m;c.a.L=f.L;c.a.A=f.A;c.a.u=f.u;c.a.H=f.H;c.a.Z=f.Z;c.a.s=f.s;c.a.v=f.v;c.a.C=f.C;c.a.D=f.D;c.a.j=f.j},function(c){function h(b){g[0]=b;return a[0]}var f=new Int8Array(4),g=new Int32Array(f.buffer,0,1),a=new Float32Array(f.buffer,0,1);c.a=h;c.a.ea=h;c.a.ha=function(b){a[0]=b;return g[0]}},function(c,h,f){function g(a){return d.V(a)}var a=f(3);c=f(4);f=f(7);var b=new c.aa,d=new f.$;window.writeWavBytes=function(a,d,c,f){return b.N(a,d,c,f)};window.writeWavBase64=function(d,
l,c,f){d=b.N(d,l,c,f);return a.encode(d)};window.writeWavDataURI=function(d,l,c,f){d=b.N(d,l,c,f);return"data:audio/wav;base64,"+a.encode(d)};window.readWavBytes=g;window.readWavBase64=function(b){return g(new Uint8Array(a.decode(b)))};window.readWavDataURI=function(b){b=new Uint8Array(a.decode(b.replace("data:audio/wav;base64,","")));return d.V(b)};window.interleave=function(b){var a=[],d,e,c=b[0].length;for(d=0;d<c;d++)for(e=0;e<b.length;e++)a.push(b[e][d]);return a};window.deInterleave=function(b,
a){var d=[],e;for(e=0;e<a;e++)d[e]=[];e=0;for(var c;e<b.length;){for(c=0;c<a;c++)d[c].push(b[e+c]);e+=c}return d}},function(c,h){(function(){for(var c=new Uint8Array(256),g=0;64>g;g++)c["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(g)]=g;h.encode=function(a){a=new Uint8Array(a);var b,d=a.length,e="";for(b=0;b<d;b+=3)e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[a[b]>>2],e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(a[b]&
3)<<4|a[b+1]>>4],e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(a[b+1]&15)<<2|a[b+2]>>6],e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[a[b+2]&63];2===d%3?e=e.substring(0,e.length-1)+"\x3d":1===d%3&&(e=e.substring(0,e.length-2)+"\x3d\x3d");return e};h.decode=function(a){var b=.75*a.length,d=a.length,e=0;"\x3d"===a[a.length-1]&&(b--,"\x3d"===a[a.length-2]&&b--);var l=new ArrayBuffer(b),f=new Uint8Array(l);for(b=0;b<d;b+=4){var g=c[a.charCodeAt(b)];var h=
c[a.charCodeAt(b+1)];var k=c[a.charCodeAt(b+2)];var m=c[a.charCodeAt(b+3)];f[e++]=g<<2|h>>4;f[e++]=(h&15)<<4|k>>2;f[e++]=(k&3)<<6|m&63}return l}})()},function(c,h,f){function g(){this.l=this.g=0;this.b="";this.h=[];this.c=[];this.o={8:1,16:1,24:1,32:1,"32f":3,64:3};this.J={8:65530,16:32765,24:21843,32:16382,64:8191};this.ca={8:a.M,16:a.i,24:a.I,32:a.f,"32f":a.F,64:a.G}}var a=f(0);g.prototype.N=function(b,a,e,c){this.da(b,a,e);this.g=b;this.l=a;this.h=c.slice();this.b=e;this.ia();return this.ga(this.fa())};
g.prototype.da=function(a,d,e){if(1>a||"number"!==typeof a||0!==a%1)throw Error("Number of channels must be a integer greater than zero.");if(1>d||214E7<d||"number"!==typeof d||0!==d%1)throw Error("Sample rate must be a int in the range of 1 - 2140000000.");if("string"!==typeof e||!(e in this.o))throw Error('Bit depth must a string, one of: "8", "16", "24", "32", "32f", "64".');if(a>this.J[parseInt(e,10)])throw Error("Max channels for "+e+" is "+this.J[parseInt(e,10)]);};g.prototype.ga=function(b){return b.S.concat(a.f([b.T]),
b.format,b.W,a.f([b.X]),a.i([b.B]),a.i([b.U]),a.f([b.sampleRate]),a.f([b.R]),a.i([b.P]),a.i([b.w]),b.Y,a.f([b.K]),this.c)};g.prototype.fa=function(){var b=parseInt(this.b,10)/8;return{S:a.m("RIFF"),T:36+this.h.length*b,format:a.m("WAVE"),W:a.m("fmt "),X:16,B:this.o[this.b],U:this.g,sampleRate:this.l,R:this.g*b*this.l,P:this.g*b,w:parseInt(this.b,10),Y:a.m("data"),K:this.h.length*b}};g.prototype.ia=function(){this.c=this.ca[this.b](this.h);this.c.length%2&&this.c.push(0)};c.a.aa=g},function(c,h,f){var g=
f(1);c.a.G=function(a){for(var b=0,d=0,e=a.length,c=[];b<e;){if(0==a[b])c[d++]=0,c[d++]=0,c[d++]=0,c[d++]=0,c[d++]=0,c[d++]=0,c[d++]=0,c[d++]=0;else{var f=a[b],g=0;0>=f&&(g=2147483648,f=-f);var h=Math.floor(Math.log(f)/Math.log(2)),k=Math.floor(f/Math.pow(2,h)*Math.pow(2,52));f=k&4294967295;k/=Math.pow(2,32);g=g|h+1023<<20|k&1048575;a[b]=[g,f];c[d++]=a[b][1]&255;c[d++]=a[b][1]>>8&255;c[d++]=a[b][1]>>16&255;c[d++]=a[b][1]>>24&255;c[d++]=a[b][0]>>32&255;c[d++]=a[b][0]>>40&255;c[d++]=a[b][0]>>48&255;
c[d++]=a[b][0]>>56&255}b++}return c};c.a.F=function(a){for(var b=0,d=0,e=a.length,c=[];b<e;)a[b]=g.ha(a[b]),c[d++]=a[b]&255,c[d++]=a[b]>>8&255,c[d++]=a[b]>>16&255,c[d++]=a[b]>>24&255,b++;return c};c.a.f=function(a){for(var b=0,d=0,e=a.length,c=[];b<e;)c[d++]=a[b]&255,c[d++]=a[b]>>8&255,c[d++]=a[b]>>16&255,c[d++]=a[b]>>24&255,b++;return c};c.a.I=function(a){for(var b=0,d=0,e=a.length,c=[];b<e;)c[d++]=a[b]&255,c[d++]=a[b]>>8&255,c[d++]=a[b]>>16&255,b++;return c};c.a.i=function(a){for(var b=0,d=0,e=
a.length,c=[];b<e;)c[d++]=a[b]&255,c[d++]=a[b]>>8&255,b++;return c};c.a.M=function(a){return a.slice()};c.a.m=function(a){for(var b=0,d=0,e=a.length,c=[];b<e;)c[d++]=a.charCodeAt(b),b++;return c}},function(c,h,f){var g=f(1);c.a.L=function(a){for(var b=[],d=0,e=0;d<a.length;)b[e]=a[d],e++,d++;return b};c.a.A=function(a){for(var b=[],d=0,e=0;d<a.length;)b[e]=a[1+d]<<8|a[d],a[1+d]&128&&(b[e]|=4294901760),e++,d+=2;return b};c.a.u=function(a){for(var b=[],d=0,e=0;d<a.length;)b[e]=a[1+d]<<8|a[d],e++,d+=
2;return b};c.a.H=function(a){for(var b=[],d=0,e=0;d<a.length;)b[e]=a[2+d]<<16|a[1+d]<<8|a[d],b[e]=0<(b[e]&8388608)?b[e]|4278190080:b[e]&16777215,e++,d+=3;return b};c.a.Z=function(a){for(var b=[],d=0,e=0;d<a.length;)b[e]=a[2+d]<<16|a[1+d]<<8|a[d],e++,d+=3;return b};c.a.s=function(a){for(var b=[],d=0,e=0;d<a.length;)b[e]=a[3+d]<<24|a[2+d]<<16|a[1+d]<<8|a[d],0>(b[e]&2147483648)&&(b[e]&=4294967295),e++,d+=4;return b};c.a.v=function(a){for(var b=[],d=0,e=0;d<a.length;)b[e]=a[3+d]<<24|a[2+d]<<16|a[1+d]<<
8|a[d],b[e]>>>=0,e++,d+=4;return b};c.a.C=function(a){for(var b=[],d=0,e=0;d<a.length;)b[e]=g.ea(a[3+d]<<24|a[2+d]<<16|a[1+d]<<8|a[d]),e++,d+=4;return b};c.a.D=function(a){for(var b=[],d=0,e=0;d<a.length;){var c,f=[a[d],a[1+d],a[2+d],a[3+d],a[4+d],a[5+d],a[6+d],a[7+d]];if("0,0,0,0,0,0,0,0"==f.toString())var g=0;else{g="";for(var h=0,k=f.length;h<k;){for(c=f[h].toString(2);8>c.length;)c="0"+c;g=c+g;h++}c="1"+g.substr(12,52);f=1;for(h=k=0;h<c.length;)k+=f*parseInt(c.charAt(h),10),f/=2,h++;g=("1"==g.charAt(0)?
-1:1)*k*Math.pow(2,parseInt(g.substr(1,11),2)-1023);g=2===g?0:g}b[e]=g;e++;d+=8}return b};c.a.j=function(a){for(var b="",d=0;d<a.length;)b+=String.fromCharCode(a[d]),d++;return b}},function(c,h,f){function g(){this.c={8:a.L,16:a.A,24:a.H,32:a.s,"32f":a.C,64:a.D}}var a=f(0);g.prototype.V=function(a){var b={};this.l(b,a);this.o(b,a);this.h(b,a);this.g(b,a);return b};g.prototype.l=function(b,d){var c=this.b(d,"RIFF");b.S=a.j(d.slice(c,c+4));b.T=a.s(d.slice(c+4,c+8))[0]};g.prototype.o=function(b,d){var c=
this.b(d,"WAVE");if(0==c)throw Error('Could not find the "WAVE" chunk');b.W=a.j(d.slice(c,c+4))};g.prototype.h=function(b,d){var c=this.b(d,"fmt ");if(0==c)throw Error('Could not find the "fmt " chunk');b.format=a.j(d.slice(c,c+4));b.X=a.v(d.slice(c+4,c+8))[0];b.B=a.A(d.slice(c+8,c+10))[0];b.U=a.u(d.slice(c+10,c+12))[0];b.sampleRate=a.v(d.slice(c+12,c+16))[0];b.R=a.v(d.slice(c+16,c+20))[0];b.P=a.u(d.slice(c+20,c+22))[0];b.w=a.u(d.slice(c+22,c+24))[0];3==b.B&&32==b.w?b.O="32f":b.O=b.w.toString()};
g.prototype.g=function(b,c){var d=this.b(c,"data");if(0==d)throw Error("Could not find the data chunk");b.Y=a.j(c.slice(d,d+4));b.K=a.s(c.slice(d+4,d+8))[0];b.la=this.c[b.O](c.slice(d+8,d+8+b.K))};g.prototype.b=function(b,c){var d,f=0;for(d=0;d<b.length;d++)if(a.j(b.slice(d,d+4))==c){f=d;break}return f};c.a.$=g}]);
