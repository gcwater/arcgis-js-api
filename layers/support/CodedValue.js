/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/JSONSupport","../../core/accessorSupport/decorators/property","../../core/has","../../core/accessorSupport/ensureType","../../core/Logger","../../core/accessorSupport/decorators/subclass"],(function(e,o,r,t,s,u,c,p,a){"use strict";var n;e.CodedValue=n=function(e){function r(o){var r;return(r=e.call(this,o)||this).name=null,r.code=null,r}return o._inheritsLoose(r,e),r.prototype.clone=function(){return new n({name:this.name,code:this.code})},r}(t.JSONSupport),r.__decorate([s.property({type:String,json:{write:!0}})],e.CodedValue.prototype,"name",void 0),r.__decorate([s.property({type:[String,Number],json:{write:!0}})],e.CodedValue.prototype,"code",void 0),e.CodedValue=n=r.__decorate([a.subclass("esri.layers.support.CodedValue")],e.CodedValue);var d=e.CodedValue;e.default=d,Object.defineProperty(e,"__esModule",{value:!0})}));