// COPYRIGHT © 2020 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.16/esri/copyright.txt for details.

define(["require","exports","../../../../core/maybe","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../support/geometryUtils","../../support/LaserLineRenderer","../../webgl-engine/shaders/Laserlines.glsl"],(function(e,t,n,i,r,s,o,h){Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e){this.view=null,this._angleCutoff=h.defaultAngleCutoff,this._style={},this._heightManifoldTarget=r.vec3f64.create(),this._heightManifoldEnabled=!1,this._intersectsLine=s.lineSegment.create(),this._intersectsLineEnabled=!1,this._intersectsLineInfinite=!1,this._pathVerticalPlaneBuffers=null;var t=!0;for(var n in e)n in this?"attached"===n?t=e[n]:this[n]=e[n]:console.error("Cannot set unknown property",n);this.attached=t}return e.prototype.destroy=function(){this.disposeRenderer()},Object.defineProperty(e.prototype,"attached",{get:function(){return!!this.renderer},set:function(e){e?this.ensureRenderer():this.disposeRenderer()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"angleCutoff",{get:function(){return this._angleCutoff},set:function(e){this._angleCutoff!==e&&(this._angleCutoff=e,this.syncAngleCutoff())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"style",{get:function(){return this._style},set:function(e){this._style=e,this.syncStyle()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"heightManifoldTarget",{get:function(){return this._heightManifoldEnabled?this._heightManifoldTarget:null},set:function(e){n.isSome(e)?(i.vec3.copy(this._heightManifoldTarget,e),this._heightManifoldEnabled=!0):this._heightManifoldEnabled=!1,this.syncRenderer(),this.syncHeightManifold()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"intersectsWorldUpAtLocation",{set:function(e){if(n.isNone(e))this.intersectsLine=null;else{var t=this.view.renderCoordsHelper.worldUpAtPosition(e,l);this.intersectsLine=s.lineSegment.fromValues(e,t),this.intersectsLineInfinite=!0}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"intersectsLine",{get:function(){return this._intersectsLineEnabled?this._intersectsLine:null},set:function(e){n.isSome(e)?(s.lineSegment.copy(e,this._intersectsLine),this._intersectsLineEnabled=!0):this._intersectsLineEnabled=!1,this.syncIntersectsLine(),this.syncRenderer()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"intersectsLineInfinite",{get:function(){return this._intersectsLineInfinite},set:function(e){this._intersectsLineInfinite=e,this.syncIntersectsLineInfinite()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"pathVerticalPlane",{get:function(){return this._pathVerticalPlaneBuffers},set:function(e){this._pathVerticalPlaneBuffers=e,this.syncPathVerticalPlane(),this.syncRenderer()},enumerable:!0,configurable:!0}),e.prototype.syncRenderer=function(){this.attached&&(this._intersectsLineEnabled||this._heightManifoldEnabled||n.isSome(this._pathVerticalPlaneBuffers))?this.ensureRenderer():this.disposeRenderer()},e.prototype.ensureRenderer=function(){n.isSome(this.renderer)||(this.renderer=new o.LaserLineRenderer(this.view.renderCoordsHelper,void 0,{contrastControlEnabled:!0}),this.syncStyle(),this.syncHeightManifold(),this.syncIntersectsLine(),this.syncIntersectsLineInfinite(),this.syncPathVerticalPlane(),this.syncAngleCutoff(),this.view._stage&&this.view._stage.addRenderPlugin(this.renderer.renderSlots,this.renderer))},e.prototype.syncStyle=function(){n.isNone(this.renderer)||(this.renderer.setParameterValues(this._style),null!=this._style.intersectsLineRadius&&(this.renderer.intersectsLineRadius=this._style.intersectsLineRadius))},e.prototype.syncAngleCutoff=function(){n.isNone(this.renderer)||this.renderer.setParameterValues({angleCutoff:this._angleCutoff})},e.prototype.syncHeightManifold=function(){n.isNone(this.renderer)||(this.renderer.heightManifoldEnabled=this._heightManifoldEnabled,this._heightManifoldEnabled&&(this.renderer.heightManifoldTarget=this._heightManifoldTarget))},e.prototype.syncIntersectsLine=function(){n.isNone(this.renderer)||(this.renderer.intersectsLineEnabled=this._intersectsLineEnabled,this._intersectsLineEnabled&&(this.renderer.intersectsLineSegment=this._intersectsLine))},e.prototype.syncIntersectsLineInfinite=function(){n.isNone(this.renderer)||(this.renderer.intersectsLineInfinite=this._intersectsLineInfinite)},e.prototype.syncPathVerticalPlane=function(){n.isNone(this.renderer)||(this.renderer.pathVerticalPlaneEnabled=n.isSome(this._pathVerticalPlaneBuffers),n.isSome(this._pathVerticalPlaneBuffers)&&(this.renderer.pathVerticalPlaneBuffers=this._pathVerticalPlaneBuffers))},e.prototype.disposeRenderer=function(){n.isSome(this.renderer)&&this.view._stage&&(this.view._stage.removeRenderPlugin(this.renderer),this.renderer=null)},e}();t.LaserlineVisualElement=a;var l=r.vec3f64.create()}));