/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../Color","../../core/handleUtils","../../core/maybe","../../core/memoize","../../core/SetUtils","../../core/unitUtils","../../core/watchUtils","../../core/accessorSupport/decorators/property","../../core/has","../../core/accessorSupport/ensureType","../../core/Logger","../../core/accessorSupport/decorators/subclass","../../chunks/vec3","../../chunks/vec4f64","../../geometry/projectionEllipsoid","../../geometry/support/ray","../../layers/support/ElevationQuery","../../views/3d/webgl-engine/lib/Intersector","../../views/3d/webgl-engine/lib/intersectorUtilsConversions","./ElevationProfileLine"],(function(e,t,r,n,o,i,s,l,c,a,u,p,d,y,v,_,h,f,m,w,g,I){"use strict";const b=2e5;let x=function(t){function a(e){var n;return(n=t.call(this,e)||this).type="view",n.color=new r("#cf4ccf"),n.viewVisualizationEnabled=!0,n.include=null,n.exclude=null,n.numSamplesForPreview=50,n.numSamplesPerChunk=25,n._getQueryElevationDependencies=i.memoize(((e,t,r,n,i,s,l)=>({inputGraphicUid:o.isSome(e)?D(e):null,visibleLayers:t,maxIntersectionDistance:r,intersectOptions:n,view:i,stationary:s,spatialReference:l}))),n._vecA=_.create(),n._vecB=_.create(),n._ray=f.create(),n}e._inheritsLoose(a,t);var u=a.prototype;return u.queryElevation=function(){var t=e._asyncToGenerator((function*(e,{noDataValue:t,signal:r}){const n=this.queryElevationDependencies;if(o.isNone(n))throw new Error("ElevationProfileLineInput: no dependencies");const{intersectOptions:i,view:s,spatialReference:l}=n,c=s.renderCoordsHelper,a=s.sceneIntersectionHelper,u=this._intersector,p=this._vecA,d=this._vecA,y=this._vecB,_=this._ray,h=yield m.GeometryDescriptor.fromGeometry(e).project(l,r),w=h.coordinates,g=w.length;for(let o=0;o<g;++o){var I;const e=w[o];v.set(y,e.x,e.y,null!=(I=e.z)?I:0),c.toRenderCoords(y,l,y),c.setAltitude(p,b,y);const r=f.fromPoints(p,y,_);a.computeIntersection(r,u,i);const s=E(n,u.results.all);s?(s.getIntersectionPoint(d),c.fromRenderCoords(d,d,l),e.z=d[2]):e.z=t}return{geometry:h.export(),noDataValue:t}}));function r(e,r){return t.apply(this,arguments)}return r}(),u.attach=function(e){const r=()=>this._onChange();return n.handlesGroup([t.prototype.attach.call(this,e),this.watch("queryElevationDependencies",r),c.on(this,"include","change",r,r,r),c.on(this,"exclude","change",r,r,r),c.on(e,"view.elevationProvider","elevation-change",r)])},e._createClass(a,[{key:"minDemResolution",get:function(){var e,t,r;const n=null==(e=this._viewModel)?void 0:e.view;if(o.isNone(n)||"3d"!==n.type)return null;const i=null==(t=n.pointsOfInterest)||null==(r=t.focus)?void 0:r.renderLocation;if(!i)return null;return n.state.camera.computeRenderPixelSizeAt(i)*l.getMetersPerVerticalUnitForSR(n.spatialReference)}},{key:"queryElevationDependencies",get:function(){return o.applySome(this._view,(e=>this._getQueryElevationDependencies(this._viewModel.input,this._visibleLayers,this._maxIntersectionDistance,this._intersectOptions,e,e.stationary,e.spatialReference)))}},{key:"_visibleLayers",get:function(){const e=this._view,t=o.applySome(e,(e=>{var t,r;return null==(t=e.map)||null==(r=t.allLayers)?void 0:r.filter((e=>e.visible)).toArray()}));return o.unwrapOr(t,[])}},{key:"_intersectOptions",get:function(){const e=this._view;if(o.isNone(e))return{};const t=e.externalToInternalIntersectOptions({include:this.include,exclude:this.exclude}),r=e.externalToInternalIntersectOptions({exclude:this._pointCloudLayers});return t.exclude=s.union(t.exclude,r.exclude),t}},{key:"_pointCloudLayers",get:function(){const e=this._view;return o.isNone(e)?[]:e.allLayerViews.toArray().filter((e=>{var t;return"point-cloud"===(null==(t=e.layer)?void 0:t.type)})).map((e=>e.layer))}},{key:"_view",get:function(){const e=this._viewModel.view;return o.isSome(e)&&"3d"===e.type?e:null}},{key:"_maxIntersectionDistance",get:function(){const e=this._view;return o.isNone(e)||!e.renderCoordsHelper?Number.POSITIVE_INFINITY:h.getReferenceEllipsoid(e.spatialReference).radius/e.renderCoordsHelper.unitInMeters}},{key:"_intersector",get:function(){const e=this._view;if(o.isNone(e))return null;const t=new w.Intersector(e.state.viewingMode),r=t.options;return r.hud=!1,r.invisibleTerrain=!1,r.backfacesTerrain=!1,r.selectionMode=!1,r.store=2,t}}]),a}(I.ElevationProfileLine);function E({view:e,inputGraphicUid:t,maxIntersectionDistance:r},n){for(let i=0;i<n.length;i++){const s=n[i];if(s.distanceInRenderSpace>r)continue;const l=g.toGraphic(s,e);if(o.isNone(l)||D(l)!==t)return s}return null}function D(e){if(e.layer&&"objectIdField"in e.layer){const t=e.attributes[e.layer.objectIdField];if(t)return`o-${e.layer.id}-${t}`}return`u-${e.uid}`}return t.__decorate([a.property({type:r,nonNullable:!0})],x.prototype,"color",void 0),t.__decorate([a.property()],x.prototype,"viewVisualizationEnabled",void 0),t.__decorate([a.property()],x.prototype,"include",void 0),t.__decorate([a.property()],x.prototype,"exclude",void 0),t.__decorate([a.property({readOnly:!0})],x.prototype,"minDemResolution",null),t.__decorate([a.property()],x.prototype,"queryElevationDependencies",null),t.__decorate([a.property()],x.prototype,"_visibleLayers",null),t.__decorate([a.property()],x.prototype,"_intersectOptions",null),t.__decorate([a.property()],x.prototype,"_pointCloudLayers",null),t.__decorate([a.property()],x.prototype,"_view",null),t.__decorate([a.property()],x.prototype,"_maxIntersectionDistance",null),t.__decorate([a.property()],x.prototype,"_intersector",null),x=t.__decorate([y.subclass("esri.widgets.ElevationProfile.ElevationProfileLineView")],x),x}));