/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../chunks/tslib.es6","../../../../core/Accessor","../../../../core/has","../../../../core/accessorSupport/decorators/property","../../../../core/accessorSupport/ensureType","../../../../core/Logger","../../../../core/accessorSupport/decorators/subclass","../../../../core/libs/rbush/PooledRBush","../../../../geometry/support/aaBoundingBox","../../../../layers/graphics/dehydratedFeatures"],(function(e,t,n,i,s,r,a,o,d,c,u,p){"use strict";e.SpatialIndex2D=function(e){function n(t){var n;return(n=e.call(this,t)||this)._index=new c.PooledRBush(9,s("csp-restrictions")?e=>({minX:e.extent[0],minY:e.extent[1],maxX:e.extent[2],maxY:e.extent[3]}):[".extent[0]",".extent[1]",".extent[2]",".extent[3]"]),n._missing=new Set,n._boundsByFeature=new Map,n.spatialReference=null,n.hasZ=null,n.hasM=null,n.objectIdField=null,n.updating=!1,n}t._inheritsLoose(n,e);var i=n.prototype;return i.setup=function(e){this._addMany(e)},i.destroy=function(){this._missing.clear(),this._index.destroy(),this._index=null,this._boundsByFeature.clear(),this._boundsByFeature=null},i.update=function(){this._missing.size>0&&(this._addMany(Array.from(this._missing.values())),this.updating=!1,this._missing.clear())},i.queryGraphicUIDsInExtent=function(e,t,n){t.equals(this.spatialReference)&&(l.minX=e[0],l.minY=e[1],l.maxX=e[2],l.maxY=e[3],this.update(),this._index.search(l,(e=>n(e.graphic.uid))))},i.add=function(e){this._missing.add(e),this.updating=!0},i.remove=function(e){if(this._missing.delete(e))return void(this.updating=this._missing.size>0);this._index.remove(e);const t=p.getObjectId(e.graphic,this._get("objectIdField"));null!=t&&this._boundsByFeature.delete(t)},i._addMany=function(e){if(0===e.length)return;const t=this._get("objectIdField");for(const n of e){n.computeExtent(this.spatialReference);const e=p.getObjectId(n.graphic,t);null!=e&&this._boundsByFeature.set(e,n.extent)}this._index.load(e)},i.clear=function(){this._index.clear(),this._missing.clear(),this._boundsByFeature.clear(),this.updating=!1},i.forEachInBounds=function(e,t){l.minX=e[0],l.minY=e[1],l.maxX=e[2],l.maxY=e[3],this.update(),this._index.search(l,(e=>{t(e)}))},i.getBounds=function(e,t){this.update();const n=this._boundsByFeature.get(e);return n?u.fromRect(t,n):null},t._createClass(n,[{key:"updatingRemaining",get:function(){return this._missing.size}}]),n}(i),n.__decorate([r.property({constructOnly:!0})],e.SpatialIndex2D.prototype,"spatialReference",void 0),n.__decorate([r.property({constructOnly:!0})],e.SpatialIndex2D.prototype,"hasZ",void 0),n.__decorate([r.property({constructOnly:!0})],e.SpatialIndex2D.prototype,"hasM",void 0),n.__decorate([r.property({constructOnly:!0})],e.SpatialIndex2D.prototype,"objectIdField",void 0),n.__decorate([r.property()],e.SpatialIndex2D.prototype,"updating",void 0),n.__decorate([r.property({readOnly:!0})],e.SpatialIndex2D.prototype,"updatingRemaining",null),e.SpatialIndex2D=n.__decorate([d.subclass("esri.views.3d.layers.graphics.SpatialIndex2D")],e.SpatialIndex2D);const l={minX:0,minY:0,maxX:0,maxY:0};Object.defineProperty(e,"__esModule",{value:!0})}));