/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../../../../chunks/_rollupPluginBabelHelpers","../../../../core/promiseUtils","./WorkerTile","./style/StyleRepository"],(function(e,t,r,s){"use strict";return function(){function n(){this._spriteInfo={},this._glyphInfo={}}var o=n.prototype;return o.reset=function(){return this._spriteInfo={},this._glyphInfo={},Promise.resolve()},o.getLayers=function(){var e;return null==(e=this._styleRepository)?void 0:e.layers},o.createTileAndParse=function(){var s=e._asyncToGenerator((function*(e,s){const{key:n}=e,o={};for(const t of Object.keys(e.sourceName2DataAndRefKey)){const r=e.sourceName2DataAndRefKey[t];o[t]=r.refKey}const i=new r(n,o,this,this._styleRepository);try{return yield i.parse(e,this._vectorTileLayerMaxBuffers,s)}catch(l){if(i.setObsolete(),i.release(),!t.isAbortError(l))throw l;return null}}));function n(e,t){return s.apply(this,arguments)}return n}(),o.updateStyle=function(e){if(!e||0===e.length||!this._styleRepository)return;const t=this._styleRepository;for(const r of e){const e=r.type,s=r.data;switch(e){case 0:t.setPaintProperties(s.layer,s.paint);break;case 1:t.setLayoutProperties(s.layer,s.layout);break;case 3:t.deleteStyleLayer(s.layer);break;case 2:t.setStyleLayer(s.layer,s.index)}}},o.setStyle=function(e){this._styleRepository=new s(e.style),this._spriteInfo={},this._glyphInfo={},this._vectorTileLayerMaxBuffers=e.vectorTileLayerMaxBuffers},o.fetchSprites=function(e,t,r){const s=[],n=this._spriteInfo;return e.forEach((e=>{void 0===n[e.name]&&s.push(e)})),0===s.length?Promise.resolve():t.invoke("getSprites",s,{signal:r&&r.signal}).then((e=>{for(const t in e){const r=e[t];n[t]=r}}))},o.getSpriteItems=function(){return this._spriteInfo},o.fetchGlyphs=function(e,t,r,s,n){const o=[];let i=this._glyphInfo[t];return i?r.forEach((e=>{i[e]||o.push(e)})):(i=this._glyphInfo[t]=[],r.forEach((e=>o.push(e)))),0===o.length?Promise.resolve():s.invoke("getGlyphs",{tileID:e,font:t,codePoints:o},n).then((e=>{for(let t=0;t<e.length;t++)e[t]&&(i[t]=e[t])}))},o.getGlyphItems=function(e){return this._glyphInfo[e]},n}()}));