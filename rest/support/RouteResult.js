/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../Graphic","../../core/JSONSupport","../../core/accessorSupport/decorators/property","../../core/has","../../core/accessorSupport/ensureType","../../core/Logger","../../core/accessorSupport/decorators/subclass","./DirectionsFeatureSet"],(function(e,r,o,t,s,p,c,u,i,n){"use strict";let a=function(r){function o(e){var o;return(o=r.call(this,e)||this).directions=null,o.route=null,o.routeName=null,o.stops=null,o}return e._inheritsLoose(o,r),o}(t.JSONSupport);return r.__decorate([s.property({type:n,json:{write:!0}})],a.prototype,"directions",void 0),r.__decorate([s.property({type:o,json:{write:!0}})],a.prototype,"route",void 0),r.__decorate([s.property({type:String,json:{write:!0}})],a.prototype,"routeName",void 0),r.__decorate([s.property({type:[o],json:{write:!0}})],a.prototype,"stops",void 0),a=r.__decorate([i.subclass("esri.rest.support.RouteResult")],a),a}));