/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../../../chunks/_rollupPluginBabelHelpers","../../../../../core/maybe","../../../../webgl/BufferObject","../../../../webgl/FramebufferObject","../../../../../core/has","../../../../webgl/enums","../../../../webgl/RenderingContext","../../../../../chunks/builtins","../../../../webgl/Texture","../../../../webgl/VertexArrayObject","./FreeList"],(function(t,e,i,r,s,n,h,d,u,a,f,c){"use strict";const o=32767,l=o<<16|o;let y=function(){function t(t,e,i){const r=new Uint32Array(e*i);this.strideInt=i,this.bufferType=t,this.dirty={start:1/0,end:0},this.cpu=r,this.gpu=null,this.clear()}var s=t.prototype;return s.destroy=function(){i.andThen(this.gpu,(t=>t.dispose()))},s.clear=function(){this.dirty.start=1/0,this.dirty.end=0,this.freeList=new c.FreeList({start:0,end:this.cpu.length/this.strideInt}),this.fillPointer=0},s.maxAvailableSpace=function(){return this.freeList.maxAvailableSpace()},s.insert=function(t,e,r,s){const n=r*this.strideInt,h=e*this.strideInt*Uint32Array.BYTES_PER_ELEMENT,d=new Uint32Array(t,h,n),u=i.unwrapOrThrow(this.freeList.firstFit(r),"First fit region must be defined"),a=u*this.strideInt,f=n*this.strideInt,c=u-e;if(0!==s)for(let i=0;i<d.length;i++)d[i]+=s;return this.cpu.set(d,a),this.dirty.start=Math.min(this.dirty.start,a),this.dirty.end=Math.max(this.dirty.end,a+f),this.fillPointer=Math.max(this.fillPointer,a+f),c},s.free=function(t,e,i){const r=t*this.strideInt,s=(t+e)*this.strideInt;if(!0===i)for(let n=t;n!==t+e;n++)this.cpu[n*this.strideInt]=l;this.dirty.start=Math.min(this.dirty.start,r),this.dirty.end=Math.max(this.dirty.end,s),this.freeList.free(t,e)},s.upload=function(t){if(this.dirty.end){if(i.isNone(this.gpu))return this.gpu=this._createBuffer(t),this.dirty.start=1/0,void(this.dirty.end=0);this.gpu.setSubData(this.cpu,this.dirty.start,this.dirty.start,this.dirty.end),this.dirty.start=1/0,this.dirty.end=0}},s._createBuffer=function(t){const e=35048;return"index"===this.bufferType?r.createIndex(t,e,this.cpu):r.createVertex(t,e,this.cpu)},e._createClass(t,[{key:"bufferSize",get:function(){return this.cpu.length/this.strideInt}}]),t}();t.Buffer=y,Object.defineProperty(t,"__esModule",{value:!0})}));