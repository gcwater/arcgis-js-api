// COPYRIGHT © 2019 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/next/esri/copyright.txt for details.

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/tsSupport/generatorHelper","../../../core/tsSupport/awaiterHelper","../../../Graphic","../../../core/Logger","../../../core/promiseUtils","../../../core/screenUtils","../../../core/watchUtils","../../../core/accessorSupport/decorators","../../../layers/support/rasterFunctions/pixelUtils","../engine/ImageryBitmapSource","./BitmapLayerView2D","./LayerView2D","./support/ExportStrategy","../../layers/ImageryLayerView","../../layers/LayerView","../../layers/RefreshableLayerView"],function(e,t,r,i,n,a,o,s,p,l,u,c,y,h,d,g,f,m,x,v){var w=s.getLogger("esri.views.2d.layers.ImageryLayerView2D");return function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._exportImageVersion=-1,t}return r(t,e),Object.defineProperty(t.prototype,"pixelData",{get:function(){if(this.updating)return null;var e=this.strategy.container.children;if(1===e.length&&e[0].source)return{extent:e[0].source.extent,pixelBlock:e[0].source.originalPixelBlock};if(e.length>1){var t=this.view.extent,r=e.map(function(e){return e.source}).filter(function(e){return e.extent&&e.extent.intersects(t)}).map(function(e){return{extent:e.extent,pixelBlock:e.originalPixelBlock}}),i=y.mosaicPixelData(r,t);return i?{extent:i.extent,pixelBlock:i.pixelBlock}:null}return null},enumerable:!0,configurable:!0}),t.prototype.hitTest=function(e,t){if(this.suspended)return p.resolve(null);var r=this.view.toMap(l.createScreenPoint(e,t));return p.resolve(new o({attributes:{},geometry:r}))},t.prototype.update=function(e){this.strategy.update(e)},t.prototype.attach=function(){var e=this;this.layer.increaseRasterJobHandlerUsage();var t=this.layer.version>=10,r=this.layer.version>=10.1?this.layer.imageMaxHeight:2048,i=this.layer.version>=10.1?this.layer.imageMaxWidth:2048;this.strategy=new f({container:this.container,imageNormalizationSupported:t,imageMaxHeight:r,imageMaxWidth:i,fetchSource:this.fetchImage.bind(this),requestUpdate:function(){return e.requestUpdate()}}),this.handles.add([u.init(this,"layer.exportImageServiceParameters.version",function(t){e._exportImageVersion!==t&&(e._exportImageVersion=t,e.requestUpdate())}),this.watch("timeExtent",function(){return e.requestUpdate()}),this.layer.on("redraw",function(){e.strategy.updateExports(function(t){t.source instanceof HTMLImageElement?t.requestRender():e.layer.applyRenderer({pixelBlock:t.source.pixelBlock}).then(function(r){var i=t.source;i.pixelBlock=r.pixelBlock,i.filter=function(t){return e.layer.applyFilter(t)},e.container.requestRender()})})})],"imagerylayerview-update")},t.prototype.detach=function(){this.layer.decreaseRasterJobHandlerUsage(),this.strategy.destroy(),this.container.removeAllChildren(),this.handles.remove("imagerylayerview-update"),this._exportImageVersion=-1},t.prototype.moveStart=function(){},t.prototype.viewChange=function(){},t.prototype.moveEnd=function(){this.requestUpdate()},t.prototype.doRefresh=function(e){return a(this,void 0,void 0,function(){return n(this,function(e){return this.requestUpdate(),[2]})})},t.prototype.isUpdating=function(){return this.attached&&(this.strategy.updating||this.updateRequested)},t.prototype.fetchImage=function(e,t,r,i){var n=this;return this._exportImageVersion=this.get("layer.exportImageServiceParameters.version"),i=i||{},i.timeExtent=this.timeExtent,i.requestAsImageElement=!0,this.layer.fetchImage(e,t,r,i).then(function(e){return e.imageElement?e.imageElement:n.layer.applyRenderer(e.pixelData,{signal:i.signal}).then(function(t){var r=new h.default(t.pixelBlock,t.extent.clone(),e.pixelData.pixelBlock);return r.filter=function(e){return n.layer.applyFilter(e)},r})}).catch(function(e){throw p.isAbortError(e)||w.error(e),e})},i([c.property({dependsOn:["updating"]})],t.prototype,"pixelData",null),i([c.property()],t.prototype,"strategy",void 0),i([c.property({dependsOn:["strategy.updating"]})],t.prototype,"updating",void 0),t=i([c.subclass("esri.views.2d.layers.ImageryLayerView2D")],t)}(c.declared(m.ImageryLayerView(v.RefreshableLayerView(d.BitmapLayerView2D(g.LayerView2D(x))))))});