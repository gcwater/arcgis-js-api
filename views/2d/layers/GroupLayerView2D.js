/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../../../chunks/_rollupPluginBabelHelpers","../../../chunks/tslib.es6","../../../core/accessorSupport/decorators/property","../../../core/has","../../../core/accessorSupport/ensureType","../../../core/Logger","../../../core/accessorSupport/decorators/subclass","../engine/webgl/GroupContainer","./LayerView2D","../../layers/GroupLayerView"],(function(e,r,t,n,i,o,a,s,c,u){"use strict";let l=function(r){function t(){var e;return(e=r.apply(this,arguments)||this).container=new s.GroupContainer,e}e._inheritsLoose(t,r);var n=t.prototype;return n.attach=function(){this._updateStageChildren(),this.handles.add(this.layerViews.on("after-changes",(()=>this._updateStageChildren())),"grouplayerview2d")},n.detach=function(){this.handles.remove("grouplayerview2d"),this.container.removeAllChildren()},n.hitTest=function(e,r){return null},n.update=function(e){},n.moveStart=function(){},n.viewChange=function(){},n.moveEnd=function(){},n._updateStageChildren=function(){this.container.removeAllChildren(),this.layerViews.forEach(((e,r)=>this.container.addChildAt(e.container,r)))},t}(c.LayerView2DMixin(u));return l=r.__decorate([a.subclass("esri.views.2d.layers.GroupLayerView2D")],l),l}));