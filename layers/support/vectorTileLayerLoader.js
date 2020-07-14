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

define(["require","exports","tslib","../../config","../../request","../../core/promiseUtils","../../core/urlUtils","../../views/2d/engine/vectorTiles/style/VectorTileSource"],(function(e,r,t,l,s,o,n,i){Object.defineProperty(r,"__esModule",{value:!0});var u=l.defaults&&l.defaults.io.corsEnabledServers;function a(e){if(e){var r=n.getOrigin(e);u&&-1===u.indexOf(r)&&u.push(r)}}function c(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];for(var t=void 0,l=0;l<e.length;++l)if(n.isProtocolRelative(e[l])){if(t){var s=t.split("://")[0];t=s+":"+e[l].trim()}}else t=n.isAbsolute(e[l])?e[l]:n.join(t,e[l]);return n.removeTrailingSlash(t)}function f(e,r,l,i,u){return t.__awaiter(this,void 0,void 0,(function(){var c,f,m,h,v,S;return t.__generator(this,(function(g){switch(g.label){case 0:return o.throwIfAborted(u),"string"!=typeof l?[3,2]:(a(h=n.normalize(l)),v=n.urlToObject(h),[4,s(v.path,t.__assign({query:{f:"json"},responseType:"json"},u))]);case 1:return m=g.sent(),c=h,f=h,[3,3];case 2:m={data:l},c=l.jsonUrl||null,f=i,g.label=3;case 3:return S=m.data,m.ssl&&(c&&(c=c.replace(/^http:/i,"https:")),f&&(f=f.replace(/^http:/i,"https:"))),p(S)?(e.styleUrl=c||null,[2,y(e,S,f,u)]):p(S)?[2,o.reject("You must specify the URL or the JSON for a service or for a style.")]:e.sourceUrl?[2,d(e,S,f,!1,r,u)]:(e.sourceUrl=c||null,[2,d(e,S,f,!0,r,u)])}}))}))}function p(e){return!!e.sources}function y(e,r,l,s){return t.__awaiter(this,void 0,void 0,(function(){var i,u,p,y,d,m;return t.__generator(this,(function(t){switch(t.label){case 0:return i=l?n.removeFile(l):n.appBaseUrl,e.styleBase=i,e.style=r,e.styleUrl&&a(e.styleUrl),u=[],r.sources&&r.sources.esri?(p=r.sources.esri).url?[4,f(e,"esri",c(i,p.url),void 0,s)]:[3,2]:[3,3];case 1:return t.sent(),[3,3];case 2:u.push(f(e,"esri",p,i,s)),t.label=3;case 3:for(y=0,d=Object.keys(r.sources);y<d.length;y++)"esri"!==(m=d[y])&&"vector"===r.sources[m].type&&(r.sources[m].url?u.push(f(e,m,c(i,r.sources[m].url),void 0,s)):u.push(f(e,m,r.sources[m],i,s)));return[4,o.all(u)];case 4:return t.sent(),[2]}}))}))}function d(e,r,l,s,u,p){return t.__awaiter(this,void 0,void 0,(function(){var y,d,m,h;return t.__generator(this,(function(t){if(y=l?n.removeTrailingSlash(l)+"/":n.appBaseUrl,d=function(e,r){if(e.hasOwnProperty("tileInfo"))return e;for(var t={xmin:-20037507.067161843,ymin:-20037507.067161843,xmax:20037507.067161843,ymax:20037507.067161843,spatialReference:{wkid:102100}},l=78271.51696400007,s=295828763.7957775,o=[],n=e.hasOwnProperty("minzoom")?parseFloat(e.minzoom):0,i=e.hasOwnProperty("maxzoom")?parseFloat(e.maxzoom):22,u=0;u<=i;u++)u>=n&&o.push({level:u,scale:s,resolution:l}),l/=2,s/=2;for(var f=0,p=e.tiles;f<p.length;f++){var y=p[f];a(c(r,y))}return{capabilities:"TilesOnly",initialExtent:t,fullExtent:t,minScale:0,maxScale:0,tiles:e.tiles,tileInfo:{rows:512,cols:512,dpi:96,format:"pbf",origin:{x:-20037508.342787,y:20037508.342787},lods:o,spatialReference:{wkid:102100}}}}(r,y),m=new i(u,y,d),!s&&e.primarySourceName in e.sourceNameToSource){if(!(h=e.sourceNameToSource[e.primarySourceName]).isCompatibleWith(m))return[2,o.resolve()];null!=m.fullExtent&&(null!=h.fullExtent?h.fullExtent.union(m.fullExtent):h.fullExtent=m.fullExtent.clone()),h.tileInfo.lods.length<m.tileInfo.lods.length&&(h.tileInfo=m.tileInfo)}return s?(e.sourceBase=y,e.source=r,e.validatedSource=d,e.primarySourceName=u,e.sourceUrl&&a(e.sourceUrl)):a(y),e.sourceNameToSource[u]=m,e.style?[2]:null==r.defaultStyles?[2,o.reject()]:"string"==typeof r.defaultStyles?[2,f(e,"",c(y,r.defaultStyles,"root.json"),void 0,p)]:[2,f(e,"",r.defaultStyles,c(y,"root.json"),p)]}))}))}r.loadMetadata=function(e,r){return t.__awaiter(this,void 0,void 0,(function(){var l,s,o,i,u,p;return t.__generator(this,(function(t){switch(t.label){case 0:return l={source:null,sourceBase:null,sourceUrl:null,validatedSource:null,style:null,styleBase:null,styleUrl:null,sourceNameToSource:{},primarySourceName:""},s="string"==typeof e?[e,null]:[null,e.jsonUrl],i=s[1],u=(o=s[0])?n.urlToObject(o):null,[4,f(l,"esri",e,i,r)];case 1:return t.sent(),a((p={layerDefinition:l.validatedSource,url:o,parsedUrl:u,serviceUrl:l.sourceUrl,style:l.style,styleUrl:l.styleUrl,spriteUrl:l.style.sprite&&c(l.styleBase,l.style.sprite),glyphsUrl:l.style.glyphs&&c(l.styleBase,l.style.glyphs),sourceNameToSource:l.sourceNameToSource,primarySourceName:l.primarySourceName}).spriteUrl),a(p.glyphsUrl),[2,p]}}))}))}}));