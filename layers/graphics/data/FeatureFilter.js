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

define(["require","exports","tslib","../../../core/Error","../../../core/Logger","../../../core/maybe","../../../core/promiseUtils","../../../core/SetUtils","../../../geometry/support/aaBoundingRect","../../../geometry/support/boundsUtils","./attributeSupport","./optimizedFeatureQueryEngineAdapter","./spatialQuerySupport","./timeSupport","./utils","../../../tasks/support/Query"],(function(e,t,i,r,s,o,n,a,l,u,h,p,d,y,c,_){Object.defineProperty(t,"__esModule",{value:!0});var f=s.getLogger("esri.views.2d.layers.features.controllers.FeatureFilter"),m=function(){function e(e){var t=this;this._geometryBounds=l.create(),this._idToVisibility=new Map,this.check=function(e){var i=e.objectId,r=t._idToVisibility,s=t._applyFilter(e);return r.set(i,s?3:2),!!(1&r.get(i))},this._serviceInfo=e}return Object.defineProperty(e.prototype,"hash",{get:function(){return this._hash},enumerable:!0,configurable:!0}),e.prototype.clear=function(){var e=this._resetAllHiddenIds();return this.update(),{show:e,hide:[]}},e.prototype.invalidate=function(){var e=this;this._idToVisibility.forEach((function(t,i){e._idToVisibility.set(i,0)}))},e.prototype.setKnownIds=function(e){for(var t=0,i=e;t<i.length;t++){var r=i[t];this._idToVisibility.set(r,1)}},e.prototype.setTrue=function(e){var t=this,i=[],r=[],s=a.SetFromValues(e);return this._idToVisibility.forEach((function(e,o){var n=!!(1&t._idToVisibility.get(o)),a=s.has(o);!n&&a?i.push(o):n&&!a&&r.push(o),t._idToVisibility.set(o,a?3:0)})),{show:i,hide:r}},e.prototype.createQuery=function(){var e=this,t=e.geometry,i=e.spatialRel,r=e.where,s=e.timeExtent,o=e.objectIds;return _.fromJSON({geometry:t,spatialRel:i,where:r,timeExtent:s,objectIds:o})},e.prototype.update=function(e,t){return i.__awaiter(this,void 0,void 0,(function(){var r;return i.__generator(this,(function(i){switch(i.label){case 0:return this._hash=JSON.stringify(e),[4,c.normalizeQueryLike(e,null,t)];case 1:return r=i.sent(),[4,n.all([this._setGeometryFilter(r),this._setIdFilter(r),this._setAttributeFilter(r),this._setTimeFilter(r)])];case 2:return i.sent(),[2]}}))}))},e.prototype._setAttributeFilter=function(e){if(!e||!e.where)return this._clause=null,void(this.where=null);var t=h.getWhereClause(e.where,this._serviceInfo.fieldsIndex);if(t.isStandardized)this._clause=t;else{var i=new r("mapview - bad input","Unable to apply filter's definition expression, as expression is not standardized.",t);f.error(i)}this.where=e.where},e.prototype._setIdFilter=function(e){this._idsToShow=e&&e.objectIds&&a.SetFromValues(e.objectIds),this._idsToHide=e&&e.hiddenIds&&a.SetFromValues(e.hiddenIds),this.objectIds=e&&e.objectIds},e.prototype._setGeometryFilter=function(e){return i.__awaiter(this,void 0,void 0,(function(){var t,r,s;return i.__generator(this,(function(i){switch(i.label){case 0:return e&&e.geometry?(t=e.geometry,r=e.spatialRel||"esriSpatialRelIntersects",[4,d.getSpatialQueryOperator(r,t,this._serviceInfo.geometryType,this._serviceInfo.hasZ,this._serviceInfo.hasM)]):(this._spatialQueryOperator=null,this.geometry=null,this.spatialRel=null,[2]);case 1:return s=i.sent(),u.getBoundsXY(this._geometryBounds,t),this._spatialQueryOperator=s,this.geometry=t,this.spatialRel=r,[2]}}))}))},e.prototype._setTimeFilter=function(e){if(this.timeExtent=this._timeOperator=null,e&&e.timeExtent)if(this._serviceInfo.timeInfo)this.timeExtent=e.timeExtent,this._timeOperator=y.getTimeOperator(this._serviceInfo.timeInfo,e.timeExtent,p.optimizedFeatureQueryEngineAdapter);else{var t=new r("feature-layer-view:time-filter-not-available","Unable to apply time filter, as layer doesn't have time metadata.",e.timeExtent);f.error(t)}},e.prototype._applyFilter=function(e){return this._filterByGeometry(e)&&this._filterById(e)&&this._filterByTime(e)&&this._filterByExpression(e)},e.prototype._filterByExpression=function(e){return!this.where||this._clause.testFeature(e)},e.prototype._filterById=function(e){return(!this._idsToHide||!this._idsToHide.has(e.objectId))&&(!this._idsToShow||this._idsToShow.has(e.objectId))},e.prototype._filterByGeometry=function(e){return!this.geometry||!!this._earlyGeometryReject(e)&&this._spatialQueryOperator(e.geometry)},e.prototype._filterByTime=function(e){return!o.isSome(this._timeOperator)||this._timeOperator(e)},e.prototype._earlyGeometryReject=function(e){return!(!e.geometry||!e.geometry.coords.length)&&(!e.centroid||"esriSpatialRelContains"!==this.spatialRel||l.containsPoint(this._geometryBounds,e.centroid.coords))},e.prototype._resetAllHiddenIds=function(){var e=this,t=[];return this._idToVisibility.forEach((function(i,r){1&i||(e._idToVisibility.set(r,1),t.push(r))})),t},e}();t.default=m}));