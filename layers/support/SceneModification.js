/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../geometry","../../core/JSONSupport","../../core/lang","../../core/Warning","../../core/accessorSupport/decorators/property","../../core/accessorSupport/ensureType","../../core/has","../../core/Logger","../../core/accessorSupport/decorators/subclass","../../core/accessorSupport/decorators/writer","../../core/accessorSupport/decorators/persistable","../../geometry/projection","../../geometry/Polygon"],(function(e,r,t,o,s,c,a,p,i,n,l,u,y,f,d){"use strict";var g;let m=g=function(r){function t(e){var t;return(t=r.call(this,e)||this).geometry=null,t.type="clip",t}e._inheritsLoose(t,r);var o=t.prototype;return o.writeGeometry=function(e,r,t,o){if(o.layer&&o.layer.spatialReference&&!o.layer.spatialReference.equals(this.geometry.spatialReference)){if(!f.canProjectWithoutEngine(e.spatialReference,o.layer.spatialReference))return void(o&&o.messages&&o.messages.push(new c("scenemodification:unsupported","Scene modifications with incompatible spatial references are not supported",{modification:this,spatialReference:o.layer.spatialReference,context:o})));const s=new d;f.projectPolygon(e,s,o.layer.spatialReference),r[t]=s.toJSON(o)}else r[t]=e.toJSON(o);delete r[t].spatialReference},o.clone=function(){return new g({geometry:s.clone(this.geometry),type:this.type})},t}(o.JSONSupport);return r.__decorate([a.property({type:d}),y.persistable()],m.prototype,"geometry",void 0),r.__decorate([u.writer(["web-scene","portal-item"],"geometry")],m.prototype,"writeGeometry",null),r.__decorate([a.property({type:["clip","mask","replace"],nonNullable:!0}),y.persistable()],m.prototype,"type",void 0),m=g=r.__decorate([l.subclass("esri.layers.support.SceneModification")],m),m}));