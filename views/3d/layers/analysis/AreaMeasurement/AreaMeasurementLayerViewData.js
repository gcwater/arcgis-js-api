/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../../../chunks/_rollupPluginBabelHelpers","../../../../../chunks/tslib.es6","../../../../../core/Accessor","../../../../../core/maybe","../../../../../core/accessorSupport/decorators/property","../../../../../core/has","../../../../../core/accessorSupport/ensureType","../../../../../core/Logger","../../../../../core/accessorSupport/decorators/subclass","./AreaMeasurementPathHelper","../support/UnitNormalizer"],(function(e,r,a,t,o,s,n,p,i,u,c,y){"use strict";e.AreaMeasurementLayerViewData=function(e){function a(){var r;return(r=e.apply(this,arguments)||this).measurementData=null,r.unitNormalizer=new y.UnitNormalizer,r.path=new c.AreaMeasurement3DPathHelper,r.lastDraggedVertex=null,r}return r._inheritsLoose(a,e),a.prototype.destroy=function(){this.measurementData=null,this.path=o.destroyMaybe(this.path)},r._createClass(a,[{key:"validMeasurement",get:function(){return this.path.isValidPolygon}}]),a}(t),a.__decorate([s.property()],e.AreaMeasurementLayerViewData.prototype,"measurementData",void 0),a.__decorate([s.property()],e.AreaMeasurementLayerViewData.prototype,"validMeasurement",null),a.__decorate([s.property()],e.AreaMeasurementLayerViewData.prototype,"unitNormalizer",void 0),a.__decorate([s.property()],e.AreaMeasurementLayerViewData.prototype,"path",void 0),a.__decorate([s.property()],e.AreaMeasurementLayerViewData.prototype,"lastDraggedVertex",void 0),a.__decorate([s.property()],e.AreaMeasurementLayerViewData.prototype,"cursorPoint",void 0),e.AreaMeasurementLayerViewData=a.__decorate([u.subclass("esri.views.3d.layers.analysis.AreaMeasurement3D.AreaMeasurementLayerViewData")],e.AreaMeasurementLayerViewData),Object.defineProperty(e,"__esModule",{value:!0})}));