/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../geometry","../../core/JSONSupport","../../core/accessorSupport/decorators/property","../../core/has","../../core/accessorSupport/ensureType","../../core/Logger","../../core/accessorSupport/decorators/subclass","../../geometry/SpatialReference"],(function(e,r,o,t,p,s,n,i,a,c){"use strict";let y=function(r){function o(e){var o;return(o=r.call(this,e)||this).contains=!0,o.dynamicLayerInfos=null,o.gdbVersion=null,o.geometryPrecision=null,o.layerDefinitions=null,o.layerIds=null,o.maxAllowableOffset=null,o.outSpatialReference=null,o.returnGeometry=!1,o.searchFields=null,o.searchText=null,o}return e._inheritsLoose(o,r),o}(t.JSONSupport);return r.__decorate([p.property({type:Boolean,json:{write:{enabled:!0,isRequired:!0}}})],y.prototype,"contains",void 0),r.__decorate([p.property({type:[Object],json:{read:{source:"dynamicLayers"},write:{target:"dynamicLayers"}}})],y.prototype,"dynamicLayerInfos",void 0),r.__decorate([p.property({type:String,json:{write:!0}})],y.prototype,"gdbVersion",void 0),r.__decorate([p.property({type:Number,json:{write:!0}})],y.prototype,"geometryPrecision",void 0),r.__decorate([p.property({type:[Object],json:{write:!0}})],y.prototype,"layerDefinitions",void 0),r.__decorate([p.property({type:[Number],json:{write:!0}})],y.prototype,"layerIds",void 0),r.__decorate([p.property({type:Number,json:{write:!0}})],y.prototype,"maxAllowableOffset",void 0),r.__decorate([p.property({type:c,json:{read:{source:"outSR"},write:{target:"outSR"}}})],y.prototype,"outSpatialReference",void 0),r.__decorate([p.property({type:Boolean,json:{write:{enabled:!0,isRequired:!0}}})],y.prototype,"returnGeometry",void 0),r.__decorate([p.property({type:[String],json:{write:!0}})],y.prototype,"searchFields",void 0),r.__decorate([p.property({type:String,json:{write:!0}})],y.prototype,"searchText",void 0),y=r.__decorate([a.subclass("esri.rest.support.FindParameters")],y),y.from=n.ensureType(y),y}));