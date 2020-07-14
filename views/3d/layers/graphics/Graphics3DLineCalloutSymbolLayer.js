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

define(["require","exports","tslib","../../../../Color","../../../../core/maybe","../../../../core/screenUtils","./ElevationAligners","./elevationAlignmentUtils","./ElevationContext","./Graphics3DObject3DGraphicLayer","./Graphics3DSymbolLayer","./graphicUtils","./pointUtils","./symbolComplexity","../../webgl-engine/lib/Geometry","../../webgl-engine/lib/GeometryData","../../webgl-engine/lib/Util","../../webgl-engine/materials/LineCalloutMaterial"],(function(e,t,r,n,a,i,o,l,s,p,c,d,u,m,h,y,f,v){var g,O;Object.defineProperty(t,"__esModule",{value:!0});var b=f.VertexAttrConstants,C=function(e){function t(t,r){var n=e.call(this,t,null,r,E)||this;return n._elevationOptions={supportsOffsetAdjustment:!0,supportsOnTheGround:!1},n.ensureDrapedStatus(!1),n}return r.__extends(t,e),t.prototype.doLoad=function(){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(e){return this._material=new v(this.materialParameters,this._getIdHint("_lineCallout_common")),this._context.stage.add(3,this._material),[2]}))}))},t.prototype.destroy=function(){e.prototype.destroy.call(this),this._material&&(this._context.stage.remove(3,this._material.id),this._material=null)},t.prototype.perInstanceMaterialParameters=function(e){var t=this.materialParameters;return t.screenOffset=e.screenOffset||[0,0],t.centerOffsetUnits=e.centerOffsetUnits||"world",t},Object.defineProperty(t.prototype,"materialParameters",{get:function(){var e=this.symbol,t=e.callout,r=a.isSome(t.color)?n.toUnitRGBA(t.color):[0,0,0,0];r[3]*=this._getLayerOpacity();var o=i.pt2px(t.size||0),l=null;if(e.verticalOffset){var s=e.verticalOffset,p=s.screenLength,c=s.minWorldLength,d=s.maxWorldLength;l={screenLength:i.pt2px(p),minWorldLength:c||0,maxWorldLength:null!=d?d:1/0}}var u=a.isSome(t.border)&&a.isSome(t.border.color)?n.toUnitRGBA(t.border.color):null,m="object"===e.symbolLayers.getItemAt(0).type,h=!m,y=m?0:void 0,f="label-3d"===e.type;return{color:r,size:o,verticalOffset:l,screenSizePerspective:this._context.screenSizePerspectiveEnabled?this._context.sharedResources.screenSizePerspectiveSettings:null,screenOffset:[0,0],centerOffsetUnits:"world",borderColor:u,occlusionTest:h,shaderPolygonOffset:y,depthHUDAlignStart:f,slicePlaneEnabled:this._context.slicePlaneEnabled}},enumerable:!0,configurable:!0}),t.prototype._defaultElevationInfoNoZ=function(){return U},t.prototype.createGraphics3DGraphic=function(e){var t=e.renderingInfo,r=e.graphic,n=this.setGraphicElevationContext(r,new s.ElevationContext,t.elevationOffset||0),i=t.symbol,o="on-the-ground"===this._elevationContext.mode&&("cim"===i.type||!i.symbolLayers.some((function(e){return"object"===e.type||"text"===e.type})));if("label-3d"!==i.type&&o)return null;var l=d.computeCentroid(r.geometry);if(a.isNone(l))return null;var p="graphic"+r.uid;return this._createAs3DShape(l,n,t,p,r.uid)},t.prototype.layerOpacityChanged=function(){return this._material.setParameterValues(this.materialParameters),!0},t.prototype.layerElevationInfoChanged=function(e,r,n){var i=this,o=this._elevationContext.mode,s=l.elevationModeChangeUpdateType(t.elevationModeChangeTypes,n,o);return s!==l.SymbolUpdateType.UPDATE?s:(e.forEach((function(e){var t=r(e);a.isSome(t)&&i.updateGraphicElevationContext(e.graphic,t)})),s)},t.prototype.slicePlaneEnabledChanged=function(){return this._material.setParameterValues({slicePlaneEnabled:this._context.slicePlaneEnabled}),!0},t.prototype.physicalBasedRenderingChanged=function(){return!0},t.prototype.pixelRatioChanged=function(){return!0},t.prototype.setGraphicElevationContext=function(t,r,n){void 0===n&&(n=0);var a=e.prototype.setGraphicElevationContext.call(this,t,r);return a.addOffsetRenderUnits(n),a},t.prototype.updateGraphicElevationContext=function(e,t){this.setGraphicElevationContext(e,t.elevationContext,t.metadata.elevationOffset),t.needsElevationUpdates=l.needsElevationUpdates2D(t.elevationContext.mode)},t.prototype.updateGeometry=function(e,t){return!1},t.prototype.computeComplexity=function(){return{primitivesPerFeature:2,primitivesPerCoordinate:0,estimated:!1,memory:m.emptySymbolComplexity.memory}},t.prototype.createVertexData=function(e){var t,r=e.translation,n=e.centerOffset;if(!r&&!n)return _;var a=r?{size:3,data:[r[0],r[1],r[2]]}:_[b.POSITION],i=n?{size:4,data:[n[0],n[1],n[2],n[3]]}:_[b.AUXPOS1];return(t={})[b.POSITION]=a,t[b.NORMAL]=_[b.NORMAL],t[b.AUXPOS1]=i,t},t.prototype.getOrCreateMaterial=function(e,t){var r,n=this.perInstanceMaterialParameters(e),a=v.uniqueMaterialIdentifier(n);return a===this._material.uniqueMaterialIdentifier?{material:this._material,isUnique:!1}:e.materialCollection?((r=e.materialCollection.getMaterial(a))||(r=new v(n,t+"_lineCallout_shared"),e.materialCollection.addMaterial(a,r)),{material:r,isUnique:!1}):{material:r=new v(n,t+"_lineCallout_unique"),isUnique:!0}},t.prototype._createAs3DShape=function(e,t,r,n,a){var i=new y.GeometryData(this.createVertexData(r),P,"point"),s=[new h(i,n)],c=this.getOrCreateMaterial(r,n),d=u.createStageObjectForHUD(this._context,e,s,[c.material],null,null,t,n,this._context.layer.uid,a);if(null===d)return null;var m=o.perObjectElevationAligner,f=new p(this,d.object,s,c.isUnique?[c.material]:null,null,m,t);return f.metadata={elevationOffset:r.elevationOffset||0},f.alignedSampledElevation=d.sampledElevation,f.needsElevationUpdates=l.needsElevationUpdates2D(t.mode),u.extendPointGraphicElevationContext(f,e,this._context.elevationProvider),f},t.elevationModeChangeTypes={definedChanged:l.SymbolUpdateType.UPDATE,staysOnTheGround:l.SymbolUpdateType.UPDATE,onTheGroundChanged:l.SymbolUpdateType.RECREATE},t}(c.Graphics3DSymbolLayer);t.Graphics3DLineCalloutSymbolLayer=C;var _=((g={})[b.POSITION]={size:3,data:[0,0,0]},g[b.NORMAL]={size:3,data:[0,0,1]},g[b.AUXPOS1]={size:4,data:[0,0,0,1]},g),x=new Uint32Array([0]),P=((O={})[b.POSITION]=x,O[b.NORMAL]=x,O[b.AUXPOS1]=x,O),U={mode:"relative-to-ground",offset:0},E={ignoreDrivers:!0,renderPriority:0,renderPriorityStep:1};t.default=C}));