/*
 riffwave64.js 1.5.9
Read & write wave files with 8, 16, 24, 32 PCM, 32 IEEE & 64-bit data.
Copyright (c) 2017 Rafael da Silva Rocha.
https://github.com/rochars/riffwave64
https://tr2099.github.io

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


int-bits is licensed as follows:

The MIT License (MIT) Copyright (c) 2015 Jam3

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
for(var m=new Int8Array(4),p=new Int32Array(m.buffer,0,1),q=new Float32Array(m.buffer,0,1),r=new Uint8Array(256),t=0;64>t;t++)r["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(t)]=t;
encode=function(a){a=new Uint8Array(a);var b,d=a.length,e="";for(b=0;b<d;b+=3)e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[a[b]>>2],e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(a[b]&3)<<4|a[b+1]>>4],e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(a[b+1]&15)<<2|a[b+2]>>6],e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[a[b+2]&63];2===d%3?e=e.substring(0,e.length-1)+"=":1===d%3&&(e=e.substring(0,e.length-
2)+"==");return e};decode=function(a){var b=.75*a.length,d=a.length,e=0;"="===a[a.length-1]&&(b--,"="===a[a.length-2]&&b--);var c=new ArrayBuffer(b),f=new Uint8Array(c);for(b=0;b<d;b+=4){var g=r[a.charCodeAt(b)];var h=r[a.charCodeAt(b+1)];var k=r[a.charCodeAt(b+2)];var l=r[a.charCodeAt(b+3)];f[e++]=g<<2|h>>4;f[e++]=(h&15)<<4|k>>2;f[e++]=(k&3)<<6|l&63}return c};var u=encode,w=decode;function x(){}
function y(a){var b=z,d;var e=0;for(d=30;d<a.length;d++)if("data"==A(a,d)){e=d;break}if(0==e)throw Error("Could not find the data chunk");d={D:A(a,0),F:B(a,4,4),H:A(a,8),format:A(a,12),I:B(a,16,4),i:B(a,20,2),G:B(a,22,2),sampleRate:B(a,24,4),C:B(a,28,4),B:B(a,32,2),g:B(a,34,2),J:A(a,e),w:B(a,e+4,4),v:[]};d.A=3==d.i&&32==d.g?"32f":d.g.toString();e+=8;var c=d.g,f=d.w,g=[],h=a.length-e;b={8:b.u,16:b.m,24:b.o,64:b.s};if(32==c)if(1==d.i)for(c=b=0;b<h&&!(g[c]=a[e+3+b]<<24|a[e+2+b]<<16|a[e+1+b]<<8|a[e+b],
c++,b+=4,b>=f););else for(c=b=0;b<h;){g[c]=a[e+3+b]<<24|a[e+2+b]<<16|a[e+1+b]<<8|a[e+b];var k=c;p[0]=g[c];g[k]=q[0];c++;b+=4;if(b>=f)break}else b[c](g,a,e,f,h);d.v=g;return d}function B(a,b,d){return 2===d?a[b]|a[b+1]<<8:a[b]|a[b+1]<<8|a[b+2]<<16|a[b+3]<<24}function A(a,b){return String.fromCharCode(a[b])+String.fromCharCode(a[b+1])+String.fromCharCode(a[b+2])+String.fromCharCode(a[b+3])}x.prototype.u=function(a,b,d,e,c){for(var f=0,g=0;f<c&&!(a[g]=b[d+f],g++,f++,f>=e););};
x.prototype.m=function(a,b,d,e,c){for(var f=0,g=0;f<c&&!(a[g]=b[d+1+f]<<8|b[d+f],g++,f+=2,f>=e););};x.prototype.o=function(a,b,d,e,c){for(var f=0,g=0;f<c&&!(a[g]=b[d+2+f]<<16|b[d+1+f]<<8|b[d+f],g++,f+=3,f>=e););};
x.prototype.s=function(a,b,d,e,c){for(var f=0,g=0;f<c;){for(var h,k=[b[d+f],b[d+1+f],b[d+2+f],b[d+3+f],b[d+4+f],b[d+5+f],b[d+6+f],b[d+7+f]],l="",n=0,v=k.length;n<v;){for(h=k[n].toString(2);8>h.length;)h="0"+h;l=h+l;n++}h="1"+l.substr(12,52);k=1;for(n=v=0;n<h.length;)v+=k*parseInt(h.charAt(n),10),k/=2,n++;l=("1"==l.charAt(0)?-1:1)*v*Math.pow(2,parseInt(l.substr(1,11),2)-1023);a[g]=2===l?0:l;g++;f+=8;if(f>=e)break}};
function C(a,b,d,e){var c=D;if(1>a||"number"!==typeof a||0!==a%1)throw Error("Number of channels must be a integer greater than zero.");if(1>b||214E7<b||"number"!==typeof b||0!==b%1)throw Error("Sample rate must be a int in the range of 1 - 2140000000.");if("string"!==typeof d||!(d in c.j))throw Error('Bit depth must a string, one of: "8", "16", "24", "32", "32f", "64".');if(a>c.l[parseInt(d,10)])throw Error("Max channels for "+d+" is "+c.l[parseInt(d,10)]);c.f=a;c.h=b;c.a=e.slice();c.c=d;switch(c.c){case "8":c.b=
c.a.slice();break;case "16":b=a=0;for(d=c.a.length;a<d;)c.b[b++]=c.a[a],c.b[b++]=c.a[a]>>8,a++;break;case "24":b=a=0;for(d=c.a.length;a<d;)c.b[b++]=c.a[a],c.b[b++]=c.a[a]>>8,c.b[b++]=c.a[a]>>16,a++;break;case "32":b=a=0;for(d=c.a.length;a<d;)c.b[b++]=c.a[a],c.b[b++]=c.a[a]>>8,c.b[b++]=c.a[a]>>16,c.b[b++]=c.a[a]>>24,a++;break;case "32f":b=a=0;for(d=c.a.length;a<d;){e=c.a;var f=a;q[0]=c.a[a];e[f]=p[0];c.b[b++]=c.a[a];c.b[b++]=c.a[a]>>8;c.b[b++]=c.a[a]>>16;c.b[b++]=c.a[a]>>24;a++}break;case "64":for(b=
a=0,d=c.a.length;a<d;){var g=c.a[a];f=e=0;switch(g){case 0:e=1073741824;break;default:0>=g&&(e=2147483648,g=-g);var h=Math.floor(Math.log(g)/Math.log(2));g=Math.floor(g/Math.pow(2,h)*Math.pow(2,52));f=g&4294967295;g/=Math.pow(2,32);e=e|h+1023<<20|g&1048575}c.a[a]=[e,f];c.b[b++]=c.a[a][1]&255;c.b[b++]=c.a[a][1]>>8&255;c.b[b++]=c.a[a][1]>>16&255;c.b[b++]=c.a[a][1]>>24&255;c.b[b++]=c.a[a][0]>>32&255;c.b[b++]=c.a[a][0]>>40&255;c.b[b++]=c.a[a][0]>>48&255;c.b[b++]=c.a[a][0]>>56&255;a++}}c.b.length%2&&c.b.push(0);
var k=parseInt(c.c,10)/8;a=36+c.a.length*k;b=c.j[c.c];d=c.f;e=c.h;f=c.f*k*c.h;h=c.f*k;g=parseInt(c.c,10);return[82,73,70,70].concat(E(a),[87,65,86,69],[102,109,116,32],E(16),[b,b>>8],[d,d>>8],E(e),E(f),[h,h>>8],[g,g>>8],[100,97,116,97],E(c.a.length*k),c.b)}function E(a){return[a,a>>8,a>>16,a>>24]}var D=new function(){this.h=this.f=0;this.c="";this.a=[];this.b=[];this.j={8:1,16:1,24:1,32:1,"32f":3,64:3};this.l={8:65530,16:32765,24:21843,32:16382,64:8191}},z=new x;
window.writeWavBytes=function(a,b,d,e){return C(a,b,d,e)};window.writeWavBase64=function(a,b,d,e){a=C(a,b,d,e);return u(a)};window.writeWavDataURI=function(a,b,d,e){a=C(a,b,d,e);return"data:audio/wav;base64,"+u(a)};window.readWavBytes=function(a){return y(a)};window.readWavBase64=function(a){return y(new Uint8Array(w(a)))};window.readWavDataURI=function(a){a=new Uint8Array(w(a.replace("data:audio/wav;base64,","")));return y(a)};
window.interleave=function(a){var b=[],d,e,c=a[0].length;for(d=0;d<c;d++)for(e=0;e<a.length;e++)b.push(a[e][d]);return b};window.deInterleave=function(a,b){var d=[],e;for(e=0;e<b;e++)d[e]=[];e=0;for(var c;e<a.length;){for(c=0;c<b;c++)d[c].push(a[e+c]);e+=c}return d};