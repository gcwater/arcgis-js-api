/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../../../chunks/_rollupPluginBabelHelpers","../../../chunks/tslib.es6","../../../core/maybe","../../../core/watchUtils","../../../core/accessorSupport/decorators/property","../../../core/has","../../../core/accessorSupport/ensureType","../../../core/Logger","../../../core/accessorSupport/decorators/subclass","./LayerView3D","./TiledLayerView3D","../terrain/RasterTile","../../layers/ImageryTileLayerView","../../layers/LayerView","../../layers/RefreshableLayerView","../../support/drapedUtils","../../webgl/capabilities"],(function(e,t,r,i,a,n,s,l,o,c,d,y,h,u,p,m,g){"use strict";let f=function(t){function a(){var e;return(e=t.apply(this,arguments)||this).type="imagery-tile-3d",e.isAlignedMapTile=!0,e}e._inheritsLoose(a,t);var n=a.prototype;return n.initialize=function(){this.layer.increaseRasterJobHandlerUsage();const e=this.updateFullExtent();this.addResolvingPromise(e);const t=i.whenTrueOnce(this.view,"basemapTerrain.tilingSchemeLocked").then((()=>{const e=this.view.basemapTerrain.tilingScheme,{tileInfo:t}=this.layer,r=["png","png24","png32","jpg","mixed"].indexOf(t.format)>-1&&e.compatibleWith(t);this.isAlignedMapTile=r;const i=r?t:e.toTileInfo();this._set("tileInfo",i),this.updatingHandles.add(this,"layer.renderer",(()=>this.refresh())),this.updatingHandles.add(this,"layer.interpolation",(()=>this.refresh())),this.updatingHandles.add(this,"layer.bandIds",(()=>this.refresh())),this.updatingHandles.add(this,"layer.multidimensionalDefinition",(()=>this.refresh()))}));this.addResolvingPromise(t)},n.destroy=function(){this.layer.decreaseRasterJobHandlerUsage(),this.view=null},n.fetchTile=function(){var t=e._asyncToGenerator((function*(e,t,i,a){const n=this.tileInfo,s=this._canSymbolizeInWebGL(),l={tileInfo:n,requestRawData:s,signal:r.unwrap(a.signal),requestAsImageElement:this.isAlignedMapTile},o=yield this.layer.fetchTile(e,t,i,l);if(o instanceof HTMLImageElement)return o;let c=o&&o.pixelBlock;if(!c)return this._blankTile;if(!s&&(c=yield this.layer.applyRenderer(o),null==c))return this._blankTile;const d=new y([e,t,i],c,n.size[0],n.size[1]);return s?(d.symbolizerRenderer=this.layer.symbolizer.rendererJSON,d.symbolizerParameters=this.layer.symbolizer.generateWebGLParameters(this._getSymbolizerOptions(e)),d.transformGrid=o.transformGrid):d.isRendereredSource=!0,d.interpolation=this.layer.interpolation,d.bandIds=this.layer.bandIds,d}));function i(e,r,i,a){return t.apply(this,arguments)}return i}(),n._getSymbolizerOptions=function(e){const t=this.tileInfo.lodAt(e).resolution;return{pixelBlock:null,isGCS:this.view.spatialReference.isGeographic,resolution:{x:t,y:t},bandIds:this.layer.bandIds}},n.ensureSymbolizerParameters=function(e){this._canSymbolizeInWebGL()&&JSON.stringify(e.symbolizerRenderer)!==JSON.stringify(this.layer.symbolizer.rendererJSON)&&(e.symbolizerParameters=this.layer.symbolizer.generateWebGLParameters(this._getSymbolizerOptions(e.lij[0])))},n.createFetchPopupFeaturesQueryGeometry=function(e,t){return m.createQueryGeometry(e,t,this.view)},n.refresh=function(){this.emit("data-changed")},n.doRefresh=function(){var t=e._asyncToGenerator((function*(e){this.suspended||this.emit("data-changed")}));function r(e){return t.apply(this,arguments)}return r}(),n._canSymbolizeInWebGL=function(){return g().supportsTextureFloat&&this.layer.symbolizer.canRenderInWebGL},e._createClass(a,[{key:"_blankTile",get:function(){const e=document.createElement("canvas"),t=e.getContext("2d"),[r,i]=this.tileInfo.size;return e.width=r,e.height=i,t.clearRect(0,0,r,i),t.getImageData(0,0,r,i)}},{key:"imageFormatIsOpaque",get:function(){return"jpg"===this.layer.tileInfo.format}},{key:"hasMixedImageFormats",get:function(){return"mixed"===this.layer.tileInfo.format}},{key:"dataLevelRange",get:function(){const e=this.tileInfo.lods,t=this.layer.tileInfo.lods,r=e[0].scale,i=t[t.length-1].scale;return this.levelRangeFromScaleRange(r,i)}}]),a}(h.ImageryTileLayerView(p.RefreshableLayerView(d.TiledLayerView3D(c.LayerView3D(u)))));return t.__decorate([a.property({readOnly:!0})],f.prototype,"_blankTile",null),t.__decorate([a.property({readOnly:!0})],f.prototype,"imageFormatIsOpaque",null),t.__decorate([a.property({readOnly:!0})],f.prototype,"hasMixedImageFormats",null),t.__decorate([a.property({readOnly:!0})],f.prototype,"dataLevelRange",null),f=t.__decorate([o.subclass("esri.views.3d.layers.ImageryTileLayerView3D")],f),f}));