/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/lang","../../core/accessorSupport/decorators/property","../../core/accessorSupport/ensureType","../../core/has","../../core/Logger","../../core/accessorSupport/decorators/subclass","./Element","../../popup/support/RelatedRecordsInfoFieldOrder"],(function(e,t,r,o,i,s,p,l,n,d){"use strict";var a;let y=a=function(t){function o(e){var r;return(r=t.call(this,e)||this).displayCount=null,r.displayType="list",r.editable=!0,r.orderByFields=null,r.relationshipId=null,r.type="relationship",r}return e._inheritsLoose(o,t),o.prototype.clone=function(){return new a({description:this.description,displayCount:this.displayCount,displayType:this.displayType,editable:this.editable,label:this.label,orderByFields:r.clone(this.orderByFields),relationshipId:this.relationshipId,visibilityExpression:this.visibilityExpression})},o}(n);return t.__decorate([o.property({type:Number,json:{write:!0}})],y.prototype,"displayCount",void 0),t.__decorate([o.property({type:["list"],json:{write:!0}})],y.prototype,"displayType",void 0),t.__decorate([o.property({type:Boolean,json:{write:!0}})],y.prototype,"editable",void 0),t.__decorate([o.property({type:[d],json:{write:!0}})],y.prototype,"orderByFields",void 0),t.__decorate([o.property({type:Number,json:{write:!0}})],y.prototype,"relationshipId",void 0),t.__decorate([o.property({type:["relationship"],json:{read:!1,write:!0}})],y.prototype,"type",void 0),y=a=t.__decorate([l.subclass("esri.form.elements.RelationshipElement")],y),y}));