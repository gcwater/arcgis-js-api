/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["./chunks/_rollupPluginBabelHelpers","./chunks/tslib.es6","./core/JSONSupport","./core/timeUtils","./core/accessorSupport/decorators/property","./core/has","./core/accessorSupport/ensureType","./core/Logger","./core/accessorSupport/decorators/subclass","./portal/timeUnitKebabDictionary"],(function(e,t,r,i,o,n,s,a,c,u){"use strict";var l;let p=l=function(t){function r(e){var r;return(r=t.call(this,e)||this).value=0,r.unit="milliseconds",r}e._inheritsLoose(r,t);var o=r.prototype;return o.toMilliseconds=function(){return i.convertTime(this.value,this.unit,"milliseconds")},o.clone=function(){return new l({value:this.value,unit:this.unit})},r}(r.JSONSupport);return t.__decorate([o.property({type:Number,json:{write:!0},nonNullable:!0})],p.prototype,"value",void 0),t.__decorate([o.property({type:u.timeUnitKebabDictionary.apiValues,json:{type:u.timeUnitKebabDictionary.jsonValues,read:u.timeUnitKebabDictionary.read,write:u.timeUnitKebabDictionary.write},nonNullable:!0})],p.prototype,"unit",void 0),p=l=t.__decorate([c.subclass("esri.TimeInterval")],p),p}));