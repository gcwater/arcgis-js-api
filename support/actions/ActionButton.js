/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/accessorSupport/decorators/property","../../core/has","../../core/accessorSupport/ensureType","../../core/Logger","../../core/accessorSupport/decorators/subclass","./ActionBase"],(function(e,t,s,i,r,o,c,a){"use strict";var n;let u=n=function(t){function s(e){var s;return(s=t.call(this,e)||this).image=null,s.type="button",s}return e._inheritsLoose(s,t),s.prototype.clone=function(){return new n({active:this.active,className:this.className,disabled:this.disabled,id:this.id,indicator:this.indicator,title:this.title,visible:this.visible,image:this.image})},s}(a);return t.__decorate([s.property()],u.prototype,"image",void 0),u=n=t.__decorate([c.subclass("esri.support.Action.ActionButton")],u),u}));
