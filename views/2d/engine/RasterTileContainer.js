/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../chunks/_rollupPluginBabelHelpers","../../../geometry/support/aaBoundingRect","../viewpointUtils","./brushes","./RasterTile","./webgl/enums","./webgl/TileContainer"],(function(e,t,i,s,r,n,o,l){"use strict";let a=function(e){function l(){var t;return(t=e.apply(this,arguments)||this).isCustomTilingScheme=!1,t}t._inheritsLoose(l,e);var a=l.prototype;return a.createTile=function(e){const t=this._getTileBounds(e);return new n.RasterTile(e,t,this._tileInfoView.tileInfo.size)},a.destroyTile=function(){},a.prepareRenderPasses=function(t){const i=t.registerRenderPass({name:"bitmap (tile)",brushes:[r.brushes.raster],target:()=>this.children.map((e=>e.bitmap)),drawPhase:o.WGLDrawPhase.MAP});return[...e.prototype.prepareRenderPasses.call(this,t),i]},a.doRender=function(t){this.visible&&t.drawPhase===o.WGLDrawPhase.MAP&&e.prototype.doRender.call(this,t)},a._getTileBounds=function(e){const t=this._tileInfoView.getTileBounds(i.create(),e);if(this.isCustomTilingScheme&&e.world){const{tileInfo:i}=this._tileInfoView,r=s.getWorldWidth(i.spatialReference);if(r){const{resolution:s}=i.lodAt(e.level),n=r/s%i.size[0],o=n?(i.size[0]-n)*s:0;t[0]-=o*e.world,t[2]-=o*e.world}}return t},l}(l.default);e.RasterTileContainer=a,Object.defineProperty(e,"__esModule",{value:!0})}));