/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/accessorSupport/decorators/property","../../core/has","../../core/accessorSupport/ensureType","../../core/Logger","../../core/accessorSupport/decorators/subclass"],(function(e,r,o,t,a,s,c,n){"use strict";const l=e=>{let a=function(e){function o(){var r;return(r=e.apply(this,arguments)||this).minScale=0,r.maxScale=0,r}return r._inheritsLoose(o,e),r._createClass(o,[{key:"scaleRangeId",get:function(){return`${this.minScale},${this.maxScale}`}}]),o}(e);return o.__decorate([t.property({type:Number,nonNullable:!0,json:{write:!0}})],a.prototype,"minScale",void 0),o.__decorate([t.property({type:Number,nonNullable:!0,json:{write:!0}})],a.prototype,"maxScale",void 0),o.__decorate([t.property({readOnly:!0})],a.prototype,"scaleRangeId",null),a=o.__decorate([n.subclass("esri.layers.mixins.ScaleRangeLayer")],a),a};e.ScaleRangeLayer=l,Object.defineProperty(e,"__esModule",{value:!0})}));