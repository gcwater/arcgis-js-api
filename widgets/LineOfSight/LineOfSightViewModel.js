/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/Logger","../../core/accessorSupport/decorators/property","../../core/has","../../core/accessorSupport/ensureType","../../core/accessorSupport/decorators/subclass","../../views/3d/interactive/analysisTools/lineOfSight/LineOfSightTool","../../views/3d/interactive/graphics/LineOfSight/LineOfSight","../support/InteractiveToolViewModel"],(function(e,t,o,r,i,s,n,l,c,a){"use strict";const p=o.getLogger("esri.widgets.LineOfSight.LineOfSightViewModel");let u=function(t){function o(e){var o;return(o=t.call(this,e)||this).supportedViewType="3d",o.model=new c.LineOfSight,o.observer=null,o.targets=new l.LineOfSightTargetCollection,o}e._inheritsLoose(o,t);var r=o.prototype;return r.start=function(){return this.createTool()},r.clear=function(){this.removeTool(),this.observer=null,this.targets.removeAll()},r.continue=function(){this.tool&&this.tool.continue()},r.stop=function(){this.tool&&this.tool.stop()},r.createToolParams=function(){return{toolConstructor:l.LineOfSightTool,constructorArguments:()=>({model:this.model})}},r.logUnsupportedError=function(){this.logError("LineOfSight widget is not implemented for MapView")},r.logError=function(...e){p.error(...e)},e._createClass(o,[{key:"state",get:function(){return this.isDisabled?"disabled":this.tool?this.tool.state:"ready"}}]),o}(a.InteractiveToolViewModel);return t.__decorate([r.property({readOnly:!0})],u.prototype,"state",null),t.__decorate([r.property()],u.prototype,"model",void 0),t.__decorate([r.property()],u.prototype,"tool",void 0),t.__decorate([r.property({aliasOf:"model.observer"})],u.prototype,"observer",void 0),t.__decorate([r.property({aliasOf:"model.targets"})],u.prototype,"targets",void 0),u=t.__decorate([n.subclass("esri.widgets.lineOfSight.LineOfSightViewModel")],u),u}));