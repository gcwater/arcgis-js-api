/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/jsonMap","../../core/JSONSupport","../../core/accessorSupport/decorators/property","../../core/has","../../core/accessorSupport/ensureType","../../core/Logger","../../core/accessorSupport/decorators/subclass"],(function(e,r,s,o,t,p,i,c,n){"use strict";const a=new s.JSONMap({esriJobMessageTypeInformative:"informative",esriJobMessageTypeProcessDefinition:"process-definition",esriJobMessageTypeProcessStart:"process-start",esriJobMessageTypeProcessStop:"process-stop",esriJobMessageTypeWarning:"warning",esriJobMessageTypeError:"error",esriJobMessageTypeEmpty:"empty",esriJobMessageTypeAbort:"abort"});let u=function(r){function s(e){var s;return(s=r.call(this,e)||this).description=null,s.type=null,s}return e._inheritsLoose(s,r),s}(o.JSONSupport);return r.__decorate([t.property({type:String,json:{write:!0}})],u.prototype,"description",void 0),r.__decorate([t.property({type:String,json:{read:a.read,write:a.write}})],u.prototype,"type",void 0),u=r.__decorate([n.subclass("esri.rest.support.GPMessage")],u),u}));