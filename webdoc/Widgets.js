/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../chunks/_rollupPluginBabelHelpers","../chunks/tslib.es6","../core/JSONSupport","../core/lang","../core/accessorSupport/decorators/property","../core/accessorSupport/ensureType","../core/has","../core/Logger","../core/accessorSupport/decorators/subclass","./widgets/FloorFilter","./widgets/Range","./widgets/TimeSlider"],(function(e,r,o,t,i,s,l,n,c,p,u,a){"use strict";var d;let g=d=function(r){function o(e){var o;return(o=r.call(this,e)||this).range=null,o.timeSlider=null,o.floorFilter=null,o}return e._inheritsLoose(o,r),o.prototype.clone=function(){return new d(t.clone({range:this.range,timeSlider:this.timeSlider,floorFilter:this.floorFilter}))},o}(o.JSONSupport);return r.__decorate([i.property({type:u,json:{write:!0}})],g.prototype,"range",void 0),r.__decorate([i.property({type:a,json:{write:!0}})],g.prototype,"timeSlider",void 0),r.__decorate([i.property({type:p,json:{write:!0}})],g.prototype,"floorFilter",void 0),g=d=r.__decorate([c.subclass("esri.webdoc.Widgets")],g),g}));