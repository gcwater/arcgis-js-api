/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../chunks/_rollupPluginBabelHelpers","../../../core/mathUtils","../../../chunks/vec4","../../../geometry/support/aaBoundingRect","../webgl-engine/lib/localOrigin"],(function(e,t,r,s,i,n){"use strict";let a=function(){function e(e,t){this.index=e,this.renderTargets=t,this.extent=i.create(),this.resolution=0,this.viewport=i.create(),this.renderLocalOrigin=n.fromValues(0,0,0,"O"),this.pixelRatio=1,this.canvasGeometries={extents:[i.create(),i.create(),i.create()],numViews:0},this.validTargets=null,this.hasDrapedFeatureSource=!1,this.hasDrapedRasterSource=!1,this.hasTargetWithoutRasterImage=!1,this.index=e,this.validTargets=new Array(t.renderTargets.length).fill(!1)}var r=e.prototype;return r.getValidTarget=function(e){return this.validTargets[e]?this.renderTargets.getTarget(e):null},r.getColorTexture=function(e){const t=1===e?this.renderTargets.getTarget(0):2===e?this.renderTargets.getTarget(2):this.renderTargets.getTarget(4);return t?t.getTexture():null},r.getNormalTexture=function(e){const t=1===e?this.renderTargets.getTarget(3):null;return t?t.getTexture():null},r.draw=function(e,t){const r=this.computeRenderTargetValidityBitfield(),s=this.needsColorWithoutRasterImage;for(const i of this.renderTargets.renderTargets)1===i.type&&!1===s?this.validTargets[i.type]=!1:this.validTargets[i.type]=e.drawTarget(this,i,t);return r^this.computeRenderTargetValidityBitfield()?0:1},r.computeRenderTargetValidityBitfield=function(){const e=this.validTargets;return+e[0]|+e[1]<<1|+e[2]<<2|+e[3]<<3|+e[4]<<4},r.setupGeometryViewsCyclical=function(e){this.setupGeometryViewsDirect();const t=.001*e.range;if(this.extent[0]-t<=e.min){const t=this.canvasGeometries.extents[this.canvasGeometries.numViews++];i.offset(this.extent,e.range,0,t)}if(this.extent[2]+t>=e.max){const t=this.canvasGeometries.extents[this.canvasGeometries.numViews++];i.offset(this.extent,-e.range,0,t)}},r.setupGeometryViewsDirect=function(){this.canvasGeometries.numViews=1,i.set(this.canvasGeometries.extents[0],this.extent),s.set(this.viewport,0,0,this.resolution,this.resolution)},r.hasSomeSizedView=function(){for(let e=0;e<this.canvasGeometries.numViews;e++){const t=this.canvasGeometries.extents[e];if(t[0]!==t[2]&&t[1]!==t[3])return!0}return!1},r.applyViewport=function(e){const t=this.viewport;0===this.index?e.setViewport(t[0],t[1],t[2],t[3]):e.setViewport(t[0]+this.resolution,t[1],t[2],t[3])},t._createClass(e,[{key:"needsColorWithoutRasterImage",get:function(){return this.hasDrapedRasterSource&&this.hasDrapedFeatureSource&&this.hasTargetWithoutRasterImage}}]),e}();function o(e,t,s){return Math.min(r.nextHighestPowerOfTwo(Math.max(e,t)+256),s)}e.Overlay=a,e.computeOverlayResolution=o,Object.defineProperty(e,"__esModule",{value:!0})}));