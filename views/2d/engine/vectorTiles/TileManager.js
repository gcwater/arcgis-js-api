/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../../core/LRUCache","../../../../core/maybe","../../tiling/TileCoverage","../../tiling/TileKey"],(function(e,i,t,l,s){"use strict";const n=512,o=1e-6,r=(e,i)=>e+1/(1<<2*i);let a=function(){function e(e,t){this._tiles=new Map,this._tileCache=new i(40,(e=>e.dispose())),this._viewSize=[0,0],this._visibleTiles=new Map,this.acquireTile=e.acquireTile,this.releaseTile=e.releaseTile,this.tileInfoView=e.tileInfoView,this._container=t}var a=e.prototype;return a.destroy=function(){for(const[e,i]of this._tiles)i.dispose();this._tiles=null,this._tileCache.clear(),this._tileCache=null},a.update=function(e){this._updateCacheSize(e);const i=this.tileInfoView,t=i.getTileCoverage(e.state,0,"smallest"),{spans:n,lodInfo:o}=t,{level:r}=o,a=new Set,c=new Set;for(const{row:l,colFrom:d,colTo:f}of n)for(let e=d;e<=f;e++){const i=s.getId(r,l,o.normalizeCol(e),o.getWorldForColumn(e)),t=this._getOrAcquireTile(i);a.add(i),t.processed()?this._addToContainer(t):c.add(new s(i))}for(const[l,s]of this._tiles)s.isCoverage=a.has(l);for(const l of c)this._findPlaceholdersForMissingTiles(l,a);let h=!1;for(const[l,s]of this._tiles)s.neededForCoverage=a.has(l),s.neededForCoverage||s.isHoldingForFade&&i.intersects(t,s.key)&&a.add(l),s.isFading&&(h=!0);for(const[l,s]of this._tiles)a.has(l)||this._releaseTile(l);return l.pool.release(t),!h},a.clear=function(){this._tiles.clear(),this._tileCache.clear(),this._visibleTiles.clear()},a.clearCache=function(){this._tileCache.clear()},a._findPlaceholdersForMissingTiles=function(e,i){const t=[];for(const[s,n]of this._tiles)this._addPlaceholderChild(t,n,e,i);const l=t.reduce(r,0);Math.abs(1-l)<o||this._addPlaceholderParent(e.id,i)},a._addPlaceholderChild=function(e,i,t,l){i.key.level<=t.level||!i.hasData()||h(t,i.key)&&(this._addToContainer(i),l.add(i.id),e.push(i.key.level-t.level))},a._addPlaceholderParent=function(e,i){let t=e;for(;;){if(t=c(t),!t||i.has(t))return;const e=this._getTile(t);if(e&&e.hasData())return this._addToContainer(e),void i.add(e.id)}},a._getOrAcquireTile=function(e){let i=this._tiles.get(e);return i||(i=this._tileCache.pop(e),i||(i=this.acquireTile(new s(e))),this._tiles.set(e,i),i)},a._getTile=function(e){let i=this._tiles.get(e);return i||(i=this._tileCache.pop(e),i&&this._tiles.set(e,i),i)},a._releaseTile=function(e){const i=this._tiles.get(e);this.releaseTile(i),this._removeFromContainer(i),this._tiles.delete(e),i.hasData()?this._tileCache.put(e,i,1):i.dispose()},a._addToContainer=function(e){let i;const l=[],s=this._container;if(s.contains(e))return;const n=this._visibleTiles;for(const[o,r]of n)this._canConnectDirectly(e,r)&&l.push(r),t.isNone(i)&&this._canConnectDirectly(r,e)&&(i=r);if(t.isSome(i)){for(const t of l)i.childrenTiles.delete(t),e.childrenTiles.add(t),t.parentTile=e;i.childrenTiles.add(e),e.parentTile=i}else for(const t of l)e.childrenTiles.add(t),t.parentTile=e;n.set(e.id,e),s.addChild(e)},a._removeFromContainer=function(e){if(this._visibleTiles.delete(e.id),this._container.removeChild(e),t.isSome(e.parentTile)){e.parentTile.childrenTiles.delete(e);for(const i of e.childrenTiles)t.isSome(e.parentTile)&&e.parentTile.childrenTiles.add(i)}for(const i of e.childrenTiles)i.parentTile=e.parentTile;e.parentTile=null,e.childrenTiles.clear()},a._canConnectDirectly=function(e,i){const t=e.key;let{level:l,row:s,col:n,world:o}=i.key;const r=this._visibleTiles;for(;l>0;){if(l--,s>>=1,n>>=1,t.level===l&&t.row===s&&t.col===n&&t.world===o)return!0;if(r.has(`${l}/${s}/${n}/${o}`))return!1}return!1},a._updateCacheSize=function(e){const i=e.state.size;if(i[0]===this._viewSize[0]&&i[1]===this._viewSize[1])return;const t=Math.ceil(i[0]/n)+1,l=Math.ceil(i[1]/n)+1;this._viewSize[0]=i[0],this._viewSize[1]=i[1],this._tileCache.maxSize=5*t*l},e}();function c(e){const[i,t,l,s]=e.split("/"),n=parseInt(i,10);return 0===n?null:`${n-1}/${parseInt(t,10)>>1}/${parseInt(l,10)>>1}/${parseInt(s,10)}`}function h(e,i){const t=i.level-e.level;return e.row===i.row>>t&&e.col===i.col>>t&&e.world===i.world}e.TileManager=a,Object.defineProperty(e,"__esModule",{value:!0})}));