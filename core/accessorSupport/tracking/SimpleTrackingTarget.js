/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports"],(function(t){"use strict";let n=function(){function t(t){this._notify=t,this._accessed=[],this._handles=[],this._invalidCount=0}var n=t.prototype;return n.destroy=function(){this._accessed.length=0,this.clear()},n.onInvalidated=function(){this._invalidCount++},n.onCommitted=function(){const t=this._invalidCount;if(1===t)return this._invalidCount=0,void this._notify();this._invalidCount=t>0?t-1:0},n.onObservableAccessed=function(t){this._accessed.includes(t)||this._accessed.push(t)},n.onTrackingEnd=function(){const t=this._handles,n=this._accessed;for(let e=0;e<n.length;++e)t.push(n[e].observe(this));n.length=0},n.clear=function(){const t=this._handles;for(let n=0;n<t.length;++n)t[n].remove();t.length=0},t}();t.SimpleTrackingTarget=n,Object.defineProperty(t,"__esModule",{value:!0})}));
