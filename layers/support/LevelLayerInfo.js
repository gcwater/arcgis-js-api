/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/JSONSupport","../../core/accessorSupport/decorators/property","../../core/has","../../core/accessorSupport/ensureType","../../core/Logger","../../core/accessorSupport/decorators/subclass"],(function(e,r,t,o,l,p,i,n){"use strict";let s=function(r){function t(e){var t;return(t=r.call(this,e)||this).layerId=null,t.levelIdField=null,t.facilityIdField=null,t.longNameField=null,t.shortNameField=null,t.levelNumberField=null,t.verticalOrderField=null,t}return e._inheritsLoose(t,r),t}(t.JSONSupport);return r.__decorate([o.property({type:String,json:{write:!0}})],s.prototype,"layerId",void 0),r.__decorate([o.property({type:String,json:{write:!0}})],s.prototype,"levelIdField",void 0),r.__decorate([o.property({type:String,json:{write:!0}})],s.prototype,"facilityIdField",void 0),r.__decorate([o.property({type:String,json:{write:!0}})],s.prototype,"longNameField",void 0),r.__decorate([o.property({type:String,json:{write:!0}})],s.prototype,"shortNameField",void 0),r.__decorate([o.property({type:String,json:{write:!0}})],s.prototype,"levelNumberField",void 0),r.__decorate([o.property({type:String,json:{write:!0}})],s.prototype,"verticalOrderField",void 0),s=r.__decorate([n.subclass("esri.layers.support.LevelLayerInfo")],s),s}));