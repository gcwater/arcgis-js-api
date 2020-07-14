// COPYRIGHT © 2020 Esri
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
// See http://js.arcgis.com/4.16/esri/copyright.txt for details.

define(["require","exports","tslib","../../../../request","../../../../core/has","../../../../core/ItemCache","../../../../core/maybe","../../../../core/MemCache","../../../../core/promiseUtils","../../../../core/workers","../../../../geometry/support/aaBoundingRect","../vectorTiles/VectorTile","./GeometryUtils","./GlyphMosaic","./GlyphSource","./SpriteMosaic","./TileIndex","../../tiling/TileKey"],(function(e,t,r,i,o,n,s,a,l,c,u,h,p,_,d,f,g,y){Object.defineProperty(t,"__esModule",{value:!0});var T=new n(10),b=new Map,v=function(){function e(e,t,r,i,o,n){this._vectorTileLayer=e,this.devicePixelRatio=t,this.allowUpdates=r,this._container=i,this._memCache=o,this._enableCachingWorkerTiles=n,this._spriteMosaic=null,this._glyphMosaic=null,this._connection=null,this._updateToAbortController=new Map,this._ongoingTileRequests=new Map,this._ongoingRequestToController=new Map}return e.prototype.destroy=function(){this._updateToAbortController&&this._updateToAbortController.forEach((function(e){return e.abort()})),this._ongoingTileRequests&&this.abortAll(),this._connection&&(this._connection.close(),this._connection=null),this._vectorTileLayer=null,this._spriteMosaic&&(this._spriteMosaic.dispose(),this._spriteMosaic=null),this._glyphMosaic&&(this._glyphMosaic.dispose(),this._glyphMosaic=null)},Object.defineProperty(e.prototype,"spriteMosaic",{get:function(){var e=this;return this._spriteSourcePromise.then((function(){return e._spriteMosaic}))},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"glyphMosaic",{get:function(){return this._glyphMosaic},enumerable:!0,configurable:!0}),e.prototype.start=function(e){return r.__awaiter(this,void 0,void 0,(function(){var t,i,n,s,a,u=this;return r.__generator(this,(function(h){for(n in t=this._vectorTileLayer.sourceNameToSource,i=[],t)i.push(this._fetchTileMap(t[n],e));return this._spriteSourcePromise=this._vectorTileLayer.loadSpriteSource(this.devicePixelRatio,e),this._spriteSourcePromise.then((function(e){u._spriteMosaic=new f(1024,1024,250),u._spriteMosaic.setSpriteSource(e),o("stable-symbol-rendering")&&u._spriteMosaic.preloadSpriteItems()})),s=this._vectorTileLayer.styleRepository,a=new d(s.glyphs),this._glyphMosaic=new _(1024,1024,a),this._broadcastPromise=c.open("WorkerTileHandler",{client:this,scheduler:e.scheduler,signal:e.signal}).then((function(t){return u._connection=t,l.all(u._connection.broadcast("setLayers",{style:s.styleJSON,enableCachingTiles:u._enableCachingWorkerTiles},r.__assign({},e)))})),[2,l.all(i)]}))}))},e.prototype.updateStyle=function(){return r.__awaiter(this,void 0,void 0,(function(){var e,t=this;return r.__generator(this,(function(r){switch(r.label){case 0:return[4,this._broadcastPromise];case 1:return r.sent(),this._updateToAbortController.forEach((function(e){return e.abort()})),this._updateToAbortController.clear(),e=this._vectorTileLayer.styleRepository,this._broadcastPromise=l.create((function(r,i){l.all(t._connection.broadcast("updateStyle",e.styleJSON)).then(r,i)})),[2,this._broadcastPromise]}}))}))},e.prototype.abortTileUpdate=function(e){this._updateToAbortController.has(e)&&(this._updateToAbortController.get(e).abort(),this._updateToAbortController.delete(e))},e.prototype.updateTile=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var i,o,n,s,a=this;return r.__generator(this,(function(r){switch(r.label){case 0:return this.allowUpdates&&e.isReady?[4,this._broadcastPromise]:[2];case 1:return r.sent(),i=Math.round(p.degToByte(t.state.rotation)),e.rotation===i?[2,null]:(n=e.key,this._updateToAbortController.has(n.id)&&((o=this._updateToAbortController.get(n.id)).abort(),this._updateToAbortController.delete(n.id)),o=l.createAbortController(),e.rotation=i,s=e.client.invoke("updateSymbols",{key:e.id,rotation:i},{signal:o.signal}).then((function(t){a._updateToAbortController.delete(n.id),e.isReady&&e.updateSymbolData(t)})).catch((function(e){l.isAbortError(e)||a._updateToAbortController.delete(n.id)})),this._updateToAbortController.set(e.id,o),[2,s])}}))}))},e.prototype.updateTileData=function(e){for(var t,r=e.tileId,i=this._container.children,o=0;o<i.length;o++)if((t=i[o]).id===r){t.updateTileData(e.tileData);break}},e.prototype.getVectorTile=function(e,t,i,o){return r.__awaiter(this,void 0,void 0,(function(){var n,c,p,_,d,f,g;return r.__generator(this,(function(r){switch(r.label){case 0:return n=new y(e,t,i,0),s.isSome(this._memCache)&&(c=this._memCache.get(n.id),s.isSome(c))?(c.reference(),[2,c]):[4,this._getVectorTileData(n)];case 1:return p=r.sent(),l.throwIfAborted(o),s.isSome(this._memCache)&&(_=this._memCache.get(n.id),s.isSome(_))?(_.reference(),[2,_]):this._vectorTileLayer?(d=this._vectorTileLayer.tileInfo,f=d.getTileBounds(u.create(),n),g=new h.VectorTile(n,this._vectorTileLayer.styleRepository,f,[512,512],0,!1),p&&p.tileData?(g.setData(p.tileData,p.client),s.isSome(this._memCache)&&(g.reference(),this._memCache.put(g.key.id,g,g.getMemoryUsage()*g.referenced,a.MIN_PRIORITY))):g.setData(null,null),[2,g]):[2,null]}}))}))},e.prototype.releaseVectorTile=function(e){s.isNone(this._memCache)||e.release()||this._memCache.updateSize(e.key.id,e,e.getMemoryUsage()*e.referenced)},e.prototype.fetchTileData=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var i,o,n,s;return r.__generator(this,(function(r){switch(r.label){case 0:return[4,this._getRefKeys(e,t)];case 1:for(s in i=r.sent(),o=this._vectorTileLayer.sourceNameToSource,n=[],o)n.push(s);return[2,this._getSourcesData(n,i,t)]}}))}))},e.prototype.parseTileData=function(e,t,i){return r.__awaiter(this,void 0,void 0,(function(){var n,s,a,l,c,u,h,_,d=this;return r.__generator(this,(function(f){switch(f.label){case 0:return(n=e&&e.data)?(s=n.sourceName2DataAndRefKey,a=n.transferList,0===Object.keys(s).length?[2,null]:[4,this._broadcastPromise]):[2,null];case 1:return f.sent(),l=Math.round(p.degToByte(t)),[4,this._connection.getAvailableClient()];case 2:return[4,(c=f.sent()).invoke("createTileAndParse",{key:e.key.id,rotation:l,cacheTile:this.allowUpdates,sourceName2DataAndRefKey:s},r.__assign(r.__assign({},i),{transferList:a})).catch((function(){return d._enableCachingWorkerTiles&&c.invoke("destructTileData",e.key.id).catch((function(){})),null}))];case 3:if(u=f.sent(),o("esri-vector-tiles-debug")){for(_ in h={},s)h[_]=s[_].refKey;return[2,{tileData:u,client:c,refKeys:h}]}return[2,{tileData:u,client:c}]}}))}))},Object.defineProperty(e.prototype,"updating",{get:function(){return this._ongoingTileRequests.size>0},enumerable:!0,configurable:!0}),e.prototype.abortAll=function(){this._ongoingRequestToController.forEach((function(e){return e.abort()})),this._ongoingRequestToController.clear(),this._ongoingTileRequests.clear()},e.prototype.getSprites=function(e){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(t){switch(t.label){case 0:return[4,this._spriteSourcePromise];case 1:return t.sent(),[2,this._spriteMosaic.getSpriteItems(e)]}}))}))},e.prototype.getGlyphs=function(e){return this._glyphMosaic.getGlyphItems(e.font,e.codePoints)},e.prototype.getStyleRepository=function(){return this._vectorTileLayer.styleRepository},e.prototype._getTilePayload=function(e,t,o){return r.__awaiter(this,void 0,void 0,(function(){var n,s,a,l;return r.__generator(this,(function(c){switch(c.label){case 0:return n=y.pool.acquire(e.id),s=this._vectorTileLayer.sourceNameToSource,a=s[t],l=a.getSourceTileUrl(n.level,n.row,n.col),y.pool.release(n),[4,i(l,r.__assign({responseType:"array-buffer"},o))];case 1:return[2,{protobuff:c.sent().data,sourceName:t}]}}))}))},e.prototype._fetchTileMap=function(e,t){if(e.capabilities.operations.supportsTileMap&&e.tileIndex)return l.resolve();if(!e.tileMapURL)return l.resolve();var r=T.get(e.tileMapURL);if(r)return e.tileIndex=r,l.resolve();if(b.has(e.tileMapURL))return b.get(e.tileMapURL).then((function(t){e.tileIndex=new g(t.data)}));var o=i(e.tileMapURL,t);return o.then((function(t){e.tileIndex=new g(t.data),b.delete(e.tileMapURL),T.put(e.tileMapURL,e.tileIndex)})),b.set(e.tileMapURL,o),o},e.prototype._getRefKeys=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var i,o,n,s,a;return r.__generator(this,(function(r){for(n in i=this._vectorTileLayer.sourceNameToSource,o=new Array,i)s=i[n],a=s.getRefKey(e,t),o.push(a);return[2,l.eachAlways(o)]}))}))},e.prototype._getSourcesData=function(e,t,i){return r.__awaiter(this,void 0,void 0,(function(){var o,n,s,a,c,u,h;return r.__generator(this,(function(r){switch(r.label){case 0:for(o=[],u=0;u<t.length;u++)null==t[u].value||null==e[u]?o.push(null):(n=this._getTilePayload(t[u].value,e[u],i),o.push(n));return[4,l.eachAlways(o)];case 1:for(s=r.sent(),a={},c=[],u=0;u<s.length;u++)s[u].value&&s[u].value&&s[u].value.protobuff&&s[u].value.protobuff.byteLength>0&&(h=t[u].value.id,a[s[u].value.sourceName]={refKey:h,protobuff:s[u].value.protobuff},c.push(s[u].value.protobuff));return[2,{sourceName2DataAndRefKey:a,transferList:c}]}}))}))},e.prototype._getVectorTileData=function(e){return r.__awaiter(this,void 0,void 0,(function(){var t,i,o,n,s=this;return r.__generator(this,(function(r){return t=e.id,this._ongoingTileRequests.has(t)?[2,this._ongoingTileRequests.get(t)]:(i=new AbortController,o={signal:i.signal},n=this._getParsedVectorTileData(e,o).then((function(e){return s._ongoingTileRequests.delete(t),s._ongoingRequestToController.delete(t),e})).catch((function(){return s._ongoingTileRequests.delete(t),s._ongoingRequestToController.delete(t),null})),this._ongoingTileRequests.set(t,n),this._ongoingRequestToController.set(t,i),[2,n])}))}))},e.prototype._getParsedVectorTileData=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var i;return r.__generator(this,(function(r){switch(r.label){case 0:return[4,this.fetchTileData(e,t)];case 1:return i=r.sent(),[2,this.parseTileData({key:e,data:i},0,t)]}}))}))},e}();t.TileHandler=v}));