/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../../../chunks/_rollupPluginBabelHelpers","../../../chunks/tslib.es6","../../../core/JSONSupport","../../../core/accessorSupport/decorators/property","../../../core/has","../../../core/accessorSupport/ensureType","../../../core/Logger","../../../core/accessorSupport/decorators/subclass","../../../layers/support/exifUtils"],(function(e,r,t,o,n,i,p,a,d){"use strict";var l;const s={1:{id:1,rotation:0,mirrored:!1},2:{id:2,rotation:0,mirrored:!0},3:{id:3,rotation:180,mirrored:!1},4:{id:4,rotation:180,mirrored:!0},5:{id:5,rotation:-90,mirrored:!0},6:{id:6,rotation:90,mirrored:!1},7:{id:7,rotation:90,mirrored:!0},8:{id:8,rotation:-90,mirrored:!1}};let c=l=function(r){function t(e){var t;return(t=r.call(this,e)||this).contentType=null,t.exifInfo=null,t.id=null,t.globalId=null,t.keywords=null,t.name=null,t.parentGlobalId=null,t.parentObjectId=null,t.size=null,t.url=null,t}return e._inheritsLoose(t,r),t.prototype.clone=function(){return new l({contentType:this.contentType,exifInfo:this.exifInfo,id:this.id,globalId:this.globalId,keywords:this.keywords,name:this.name,parentGlobalId:this.parentGlobalId,parentObjectId:this.parentObjectId,size:this.size,url:this.url})},e._createClass(t,[{key:"orientationInfo",get:function(){const{exifInfo:e}=this,r=d.getExifValue({exifName:"Exif IFD0",tagName:"Orientation",exifInfo:e});return s[r]||null}}]),t}(t.JSONSupport);return r.__decorate([o.property({type:String})],c.prototype,"contentType",void 0),r.__decorate([o.property()],c.prototype,"exifInfo",void 0),r.__decorate([o.property({readOnly:!0})],c.prototype,"orientationInfo",null),r.__decorate([o.property({type:i.Integer})],c.prototype,"id",void 0),r.__decorate([o.property({type:String})],c.prototype,"globalId",void 0),r.__decorate([o.property({type:String})],c.prototype,"keywords",void 0),r.__decorate([o.property({type:String})],c.prototype,"name",void 0),r.__decorate([o.property({json:{read:!1}})],c.prototype,"parentGlobalId",void 0),r.__decorate([o.property({json:{read:!1}})],c.prototype,"parentObjectId",void 0),r.__decorate([o.property({type:i.Integer})],c.prototype,"size",void 0),r.__decorate([o.property({json:{read:!1}})],c.prototype,"url",void 0),c=l=r.__decorate([a.subclass("esri.layers.support.AttachmentInfo")],c),c}));