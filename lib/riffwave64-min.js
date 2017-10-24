/*
 riffwave64.js
Read & write wave files with 8, 16, 24, 32 PCM, 32 IEEE & 64-bit audio.
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
for(var n=new Int8Array(4),p=new Int32Array(n.buffer,0,1),q=new Float32Array(n.buffer,0,1),u=new Uint8Array(256),v=0;64>v;v++)u["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(v)]=v;
encode=function(a){a=new Uint8Array(a);var d,c=a.length,f="";for(d=0;d<c;d+=3)f+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[a[d]>>2],f+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(a[d]&3)<<4|a[d+1]>>4],f+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(a[d+1]&15)<<2|a[d+2]>>6],f+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[a[d+2]&63];2===c%3?f=f.substring(0,f.length-1)+"=":1===c%3&&(f=f.substring(0,f.length-
2)+"==");return f};decode=function(a){var d=.75*a.length,c=a.length,f=0;"="===a[a.length-1]&&(d--,"="===a[a.length-2]&&d--);var b=new ArrayBuffer(d),e=new Uint8Array(b);for(d=0;d<c;d+=4){var h=u[a.charCodeAt(d)];var g=u[a.charCodeAt(d+1)];var k=u[a.charCodeAt(d+2)];var l=u[a.charCodeAt(d+3)];e[f++]=h<<2|g>>4;e[f++]=(g&15)<<4|k>>2;e[f++]=(k&3)<<6|l&63}return b};var w=encode,x=decode;function y(){this.g=this.f=0;this.c="";this.a=[];this.b=[];this.j={8:1,16:1,24:1,32:1,"32f":3,64:3}}
function z(a,d,c,f){var b=new y;b.f=a;b.g=d;b.a=f.slice();b.c=c;switch(b.c){case "8":b.b=b.a.slice();break;case "16":d=a=0;for(c=b.a.length;a<c;)b.b[d++]=b.a[a],b.b[d++]=b.a[a]>>8,a++;break;case "24":d=a=0;for(c=b.a.length;a<c;)b.b[d++]=b.a[a],b.b[d++]=b.a[a]>>8,b.b[d++]=b.a[a]>>16,a++;break;case "32":d=a=0;for(c=b.a.length;a<c;)b.b[d++]=b.a[a],b.b[d++]=b.a[a]>>8,b.b[d++]=b.a[a]>>16,b.b[d++]=b.a[a]>>24,a++;break;case "32f":d=a=0;for(c=b.a.length;a<c;){f=b.a;var e=a;q[0]=b.a[a];f[e]=p[0];b.b[d++]=
b.a[a];b.b[d++]=b.a[a]>>8;b.b[d++]=b.a[a]>>16;b.b[d++]=b.a[a]>>24;a++}break;case "64":for(d=a=0,c=b.a.length;a<c;){var h=b.a[a];e=f=0;switch(h){case 0:f=1073741824;break;default:0>=h&&(f=2147483648,h=-h);var g=Math.floor(Math.log(h)/Math.log(2));h=Math.floor(h/Math.pow(2,g)*Math.pow(2,52));e=h&4294967295;h/=Math.pow(2,32);f=f|g+1023<<20|h&1048575}b.a[a]=[f,e];b.b[d++]=b.a[a][1]&255;b.b[d++]=b.a[a][1]>>8&255;b.b[d++]=b.a[a][1]>>16&255;b.b[d++]=b.a[a][1]>>24&255;b.b[d++]=b.a[a][0]>>32&255;b.b[d++]=
b.a[a][0]>>40&255;b.b[d++]=b.a[a][0]>>48&255;b.b[d++]=b.a[a][0]>>56&255;a++}}b.b.length%2&&b.b.push(0);var k=parseInt(b.c,10)/8;a=36+b.a.length*k;d=b.j[b.c];c=b.f;f=b.g;e=b.f*k*b.g;g=b.f*k;h=parseInt(b.c,10);return[82,73,70,70].concat(A(a),[87,65,86,69],[102,109,116,32],A(16),[d,d>>8],[c,c>>8],A(f),A(e),[g,g>>8],[h,h>>8],[100,97,116,97],A(b.a.length*k),b.b)}function A(a){return[a,a>>8,a>>16,a>>24]}
function C(a){var d={w:a[16]|a[17]<<8|a[18]<<16|a[19]<<24,format:a[12]|a[13]<<8|a[14]<<16|a[15]<<24,v:a[16]|a[17]<<8|a[18]<<16|a[19]<<24,h:a[20]|a[21]<<8,u:a[22]|a[23]<<8,sampleRate:a[24]|a[25]<<8|a[26]<<16|a[27]<<24,s:a[28]|a[29]<<8|a[30]<<16|a[31]<<24,o:a[32]|a[33]<<8,i:a[34]|a[35]<<8,offset:0,l:[]},c;a:{var f=a.length;for(c=30;c<f;c++){var b=new Uint8Array([a[c],a[c+1],a[c+2],a[c+3]]);if("data"==String.fromCharCode(b[0])+String.fromCharCode(b[1])+String.fromCharCode(b[2])+String.fromCharCode(b[3]))break a}c=
void 0}d.A=a[c]|a[c+1]<<8|a[c+2]<<16|a[c+3]<<24;d.m=a[c+4]|a[c+5]<<8|a[c+6]<<16|a[c+7]<<24;c+=8;var e=d.h;f=d.m;b=[];var h=a.length-c;switch(d.i){case 8:for(var g=e=0;e<h&&!(b[g]=a[c+e],g++,e+=1,e>=f););break;case 16:for(g=e=0;e<h&&!(b[g]=a[c+1+e]<<8|a[c+e],a[c+1+e]&128&&(b[g]|=4294901760),g++,e+=2,e>=f););break;case 24:for(g=e=0;e<h&&!(b[g]=a[c+2+e]<<16|a[c+1+e]<<8|a[c+e],b[g]=0<(b[g]&8388608)?b[g]|4278190080:b[g]&16777215,g++,e+=3,e>=f););break;case 32:if(1==e)for(g=e=0;e<h&&!(b[g]=a[c+3+e]<<24|
a[c+2+e]<<16|a[c+1+e]<<8|a[c+e],g++,e+=4,e>=f););else for(g=e=0;e<h;){b[g]=a[c+3+e]<<24|a[c+2+e]<<16|a[c+1+e]<<8|a[c+e];var k=g;p[0]=b[g];b[k]=q[0];g++;e+=4;if(e>=f)break}break;case 64:for(g=e=0;e<h;){var l,r=[a[c+e],a[c+1+e],a[c+2+e],a[c+3+e],a[c+4+e],a[c+5+e],a[c+6+e],a[c+7+e]],m="",t=r.length;for(k=0;k<t;k++){for(l=r[k].toString(2);8>l.length;)l="0"+l;m=l+m}l="1"==m.charAt(0)?-1:1;r=parseInt(m.substr(1,11),2)-1023;m="1"+m.substr(12,52);t=1;var B=0;for(k=0;k<m.length;)B+=t*parseInt(m.charAt(k),
10),t/=2,k++;k=l*B*Math.pow(2,r);2==k&&(k=0);b[g]=k;g++;e+=8;if(e>=f)break}}d.l=b;return d}window.writeWavBytes=function(a,d,c,f){return z(a,d,c,f)};window.writeWavBase64=function(a,d,c,f){a=z(a,d,c,f);return w(a)};window.writeWavDataURI=function(a,d,c,f){a=z(a,d,c,f);return"data:audio/wav;base64,"+w(a)};window.readWavBytes=function(a){return C(a)};window.readWavBase64=function(a){return C(new Uint8Array(x(a)))};
window.readWavDataURI=function(a){a=new Uint8Array(x(a.replace("data:audio/wav;base64,","")));return C(a)};window.interleave=function(a){var d=[],c,f,b=a[0].length;for(c=0;c<b;c++)for(f=0;f<a.length;f++)d.push(a[f][c]);return d};window.deInterleave=function(a,d){var c=[],f;for(f=0;f<d;f++)c[f]=[];f=0;for(var b;f<a.length;){for(b=0;b<d;b++)c[b].push(a[f+b]);f+=b}return c};