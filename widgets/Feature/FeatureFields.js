/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/watchUtils","../../core/accessorSupport/decorators/aliasOf","../../core/has","../../core/accessorSupport/ensureType","../../core/Logger","../../core/accessorSupport/decorators/property","../../core/accessorSupport/decorators/subclass","../Widget","./FeatureFields/FeatureFieldsViewModel","./support/FeatureElementInfo","../support/uriUtils","../support/widgetUtils","../support/decorators/messageBundle","../support/jsxFactory"],(function(e,t,s,r,i,o,l,a,n,d,u,f,c,p,_,m){"use strict";const h={base:"esri-feature-fields",fieldHeader:"esri-feature-fields__field-header",fieldData:"esri-feature-fields__field-data",fieldDataDate:"esri-feature-fields__field-data--date",esriTable:"esri-widget__table"};let y=function(t){function r(e,s){var r;return(r=t.call(this,e,s)||this)._featureElementInfo=null,r.attributes=null,r.description=null,r.expressionInfos=null,r.fieldInfos=null,r.title=null,r.viewModel=new u,r.messages=null,r.messagesURIUtils=null,r}e._inheritsLoose(r,t);var i=r.prototype;return i.initialize=function(){this._featureElementInfo=new f,s.init(this,["viewModel.description","viewModel.title"],(()=>this._setupFeatureElementInfo()))},i.destroy=function(){this._featureElementInfo.destroy()},i.renderFieldInfo=function(e,t){const{attributes:s}=this.viewModel,r=e.fieldName,i=e.label||r,o=s?null==s[r]?"":s[r]:"",l=!(!e.format||!e.format.dateFormat),a="number"==typeof o&&!l?this._forceLTR(o):c.autoLink(this.messagesURIUtils,o),n={[h.fieldDataDate]:l};return m.tsx("tr",{key:`fields-element-info-row-${r}-${t}`},m.tsx("th",{key:`fields-element-info-row-header-${r}-${t}`,class:h.fieldHeader,innerHTML:i}),m.tsx("td",{key:`fields-element-info-row-data-${r}-${t}`,class:this.classes(h.fieldData,n),innerHTML:a}))},i.renderFields=function(){const{formattedFieldInfos:e}=this.viewModel;return e.length?m.tsx("table",{class:h.esriTable,summary:this.messages.fieldsSummary},m.tsx("tbody",null,e.map(((e,t)=>this.renderFieldInfo(e,t))))):null},i.render=function(){var e;return m.tsx("div",{class:h.base},null==(e=this._featureElementInfo)?void 0:e.render(),this.renderFields())},i._setupFeatureElementInfo=function(){const{description:e,title:t}=this;this._featureElementInfo.set({description:e,title:t})},i._forceLTR=function(e){return`&lrm;${e}`},r}(d);return t.__decorate([r.aliasOf("viewModel.attributes")],y.prototype,"attributes",void 0),t.__decorate([r.aliasOf("viewModel.description")],y.prototype,"description",void 0),t.__decorate([r.aliasOf("viewModel.expressionInfos")],y.prototype,"expressionInfos",void 0),t.__decorate([r.aliasOf("viewModel.fieldInfos")],y.prototype,"fieldInfos",void 0),t.__decorate([r.aliasOf("viewModel.title")],y.prototype,"title",void 0),t.__decorate([a.property({type:u})],y.prototype,"viewModel",void 0),t.__decorate([a.property(),_.messageBundle("esri/widgets/Feature/t9n/Feature")],y.prototype,"messages",void 0),t.__decorate([a.property(),_.messageBundle("esri/widgets/support/t9n/uriUtils")],y.prototype,"messagesURIUtils",void 0),y=t.__decorate([n.subclass("esri.widgets.Feature.FeatureFields")],y),y}));