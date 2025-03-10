/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/JSONSupport","../../core/accessorSupport/decorators/property","../../core/has","../../core/accessorSupport/ensureType","../../core/Logger","../../core/accessorSupport/decorators/subclass","../Lighting"],(function(e,r,o,t,n,i,s,c,p,l){"use strict";var u;e.SlideEnvironment=u=function(e){function o(){var r;return(r=e.apply(this,arguments)||this).lighting=new l,r}return r._inheritsLoose(o,e),o.prototype.clone=function(){return new u({lighting:l.prototype.clone.call(this.lighting)})},o}(t.JSONSupport),o.__decorate([n.property({type:l,json:{write:!0}})],e.SlideEnvironment.prototype,"lighting",void 0),e.SlideEnvironment=u=o.__decorate([p.subclass("esri.webscene.Environment")],e.SlideEnvironment),Object.defineProperty(e,"__esModule",{value:!0})}));
