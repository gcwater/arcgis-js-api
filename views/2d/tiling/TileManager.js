/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../core/maybe","./TileCoverage","./TileKey"],(function(e,i,t,l){"use strict";const s=1e-6;let r=function(){function e(e){this._tiles=new Map,this.buffer=0,this.acquireTile=e.acquireTile,this.releaseTile=e.releaseTile,this.tileInfoView=e.tileInfoView,this.buffer=e.buffer}var r=e.prototype;return r.destroy=function(){},r.clear=function(){this._tiles.forEach((e=>this._releaseTile(e)))},r.tileKeys=function(){const e=[];return this._tiles.forEach(((i,t)=>e.push(t))),e},r.update=function(e){const i=this.tileInfoView.getTileCoverage(e.state,this.buffer,"closest"),{spans:s,lodInfo:r}=i,{level:n}=r,a=[],o=[],d=new Set,h=new Set;for(const{row:t,colFrom:c,colTo:u}of s)for(let e=c;e<=u;e++){const i=l.getId(n,t,r.normalizeCol(e),r.getWorldForColumn(e)),s=this._getOrAcquireTile(a,i);d.add(i),s.isReady?s.visible=!0:h.add(s.key)}h.forEach((e=>this._addPlaceholders(d,e))),this._tiles.forEach((e=>{d.has(e.key.id)||(o.push(e.key.id),this._releaseTile(e))})),t.pool.release(i);return{hasMissingTiles:h.size>0,added:a,removed:o}},r._getOrAcquireTile=function(e,i){if(!this._tiles.has(i)){const t=this.acquireTile(new l(i));e.push(i),this._tiles.set(i,t),t.visible=!1}return this._tiles.get(i)},r._getTile=function(e){return this._tiles.get(e)},r._releaseTile=function(e){this._tiles.delete(e.key.id),this.releaseTile(e)},r._addPlaceholders=function(e,i){const t=this._addPlaceholderChildren(e,i);if(!(Math.abs(1-t)<s)){if(!this._addPlaceholderParent(e,i)){this._getTile(i.id).visible=!0}}},r._addPlaceholderChildren=function(e,i){let t=0;return this._tiles.forEach((l=>{t+=this._addPlaceholderChild(e,l,i)})),t},r._addPlaceholderChild=function(e,i,t){if(i.key.level<=t.level||!i.hasData||!t.contains(i.key))return 0;i.visible=!0,e.add(i.key.id);return 1/(1<<2*(i.key.level-t.level))},r._addPlaceholderParent=function(e,t){let l=t.getParentKey(),s=0,r=null;for(;i.isSome(l);){if(e.has(l.id))return!0;const i=this._getTile(l.id);if(null!=i&&i.isReady)return i.visible=!0,e.add(i.key.id),!0;null!=i&&i.hasData&&i.patchCount>s&&(s=i.patchCount,r=i),l=l.getParentKey()}return!!r&&(r.visible=!0,e.add(r.key.id),!0)},e}();e.TileManager=r,Object.defineProperty(e,"__esModule",{value:!0})}));