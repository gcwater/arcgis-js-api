/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../chunks/_rollupPluginBabelHelpers","./maybe"],(function(t,i){"use strict";return function(){function s(t=Number.POSITIVE_INFINITY){this.size=0,this._start=0,this.maxSize=t,this._buffer=isFinite(t)?new Array(t):[]}var e=s.prototype;return e.enqueue=function(t){if(this.size===this.maxSize){const i=this._buffer[this._start];return this._buffer[this._start]=t,this._start=(this._start+1)%this.maxSize,i}return isFinite(this.maxSize)?this._buffer[(this._start+this.size++)%this.maxSize]=t:this._buffer[this._start+this.size++]=t,null},e.dequeue=function(){if(0===this.size)return null;const t=this._buffer[this._start];return this._buffer[this._start]=null,this.size--,this._start=(this._start+1)%this.maxSize,t},e.peek=function(){return 0===this.size?null:this._buffer[this._start]},e.find=function(t){if(0===this.size)return null;for(const s of this._buffer)if(i.isSome(s)&&t(s))return s;return null},e.clear=function(t){let s=this.dequeue();for(;i.isSome(s);)t&&t(s),s=this.dequeue()},t._createClass(s,[{key:"entries",get:function(){return this._buffer}}]),s}()}));