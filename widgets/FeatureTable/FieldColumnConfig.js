/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/accessorSupport/decorators/property","../../core/has","../../core/accessorSupport/ensureType","../../core/Logger","../../core/accessorSupport/decorators/subclass","../FeatureForm/FieldConfig"],(function(e,o,r,t,i,s,c,n){"use strict";let p=function(o){function r(e){var r;return(r=o.call(this,e)||this).direction=null,r.formatFunction=null,r.menuConfig=null,r.sortable=!0,r.visible=!0,r}return e._inheritsLoose(r,o),r}(n);return o.__decorate([r.property()],p.prototype,"direction",void 0),o.__decorate([r.property()],p.prototype,"formatFunction",void 0),o.__decorate([r.property()],p.prototype,"menuConfig",void 0),o.__decorate([r.property()],p.prototype,"sortable",void 0),o.__decorate([r.property()],p.prototype,"visible",void 0),p=o.__decorate([c.subclass("esri.widgets.FeatureTable.FieldColumnConfig")],p),p}));