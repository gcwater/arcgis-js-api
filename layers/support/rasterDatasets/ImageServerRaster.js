/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../../../chunks/_rollupPluginBabelHelpers","../../../chunks/tslib.es6","../../../geometry","../../../core/Error","../../../core/maybe","../../../core/urlUtils","../../../core/accessorSupport/decorators/property","../../../core/has","../../../core/accessorSupport/ensureType","../../../core/Logger","../../../core/accessorSupport/decorators/subclass","../RasterInfo","../RasterStorageInfo","../serviceTileInfoProperty","../TileInfo","../TilemapCache","./BaseRaster","../rasterFunctions/pixelUtils","../rasterTransforms/GCSShiftTransform","../../../rest/support/FeatureSet","../../../geometry/SpatialReference","../../../geometry/Extent","../../../geometry/Point"],(function(e,t,i,s,n,a,r,l,o,u,c,h,m,f,p,d,y,x,v,g,S,T,b){"use strict";let I=function(t){function i(){var e;return(e=t.apply(this,arguments)||this)._levelOffset=0,e._slices=null,e._tilemapCache=null,e.datasetFormat="RasterTileServer",e}e._inheritsLoose(i,t);var r=i.prototype;return r.open=function(){var t=e._asyncToGenerator((function*(e){yield this.init();const t=e&&e.signal,i=this.sourceJSON?{data:this.sourceJSON}:yield this.request(this.url,{query:{f:"json"},signal:t});i.ssl&&(this.url=this.url.replace(/^http:/i,"https:"));const r=i.data;if(this.sourceJSON=r,!r)throw new s("imageserverraster:open","cannot initialize tiled image service, missing service info");if(!r.tileInfo)throw new s("imageserverraster:open","use ImageryLayer to open non-tiled image services");this._fixScaleInServiceInfo();const l=["jpg","jpeg","png","png8","png24","png32","mixed"];this.tileType=r.cacheType,null==this.tileType&&(l.indexOf(r.tileInfo.format.toLowerCase())>-1?this.tileType="Map":"lerc"===r.tileInfo.format.toLowerCase()?this.tileType="Elevation":this.tileType="Raster"),this.datasetName=r.name.slice(r.name.indexOf("/")+1);const o=yield this._fetchRasterInfo({signal:t});if(!n.isSome(o))throw new s("image-server-raster:open","cannot initialize image service");{const e="Map"===this.tileType?f.readServiceTileInfo(r.tileInfo,r):p.fromJSON(r.tileInfo),{extent:t,pixelSize:i}=o,s=.5/o.width*i.x;let n,a;const l=e.lodAt(Math.max.apply(null,e.lods.map((e=>e.level))));"Map"!==this.tileType&&0!==r.maxScale&&("Raster"===this.tileType?(n=e.lods.filter((e=>e.resolution===i.x))[0],n||(n=e.lods[e.lods.length-1])):(n=e.lods.filter((e=>Math.abs(e.scale-r.maxScale)<s))[0],n||(n=e.lods.filter((e=>e.scale>r.maxScale)).sort(((e,t)=>e.scale>t.scale?1:-1))[0])),i.x=i.y=n.resolution,o.width=Math.ceil((t.xmax-t.xmin)/i.x-.1),o.height=Math.ceil((t.ymax-t.ymin)/i.y-.1)),n||(n=l);const u=e.lodAt(Math.min.apply(null,e.lods.map((e=>e.level))));"Map"===this.tileType?this._levelOffset=e.lods[0].level:0!==r.minScale&&"Elevation"===this.tileType&&(a=e.lods.filter((e=>Math.abs(e.scale-r.minScale)<s))[0],this._levelOffset=a.level-u.level),a||(a=u);const c=Math.max(i.x,i.y);(Math.abs(i.x-i.y)>s||!e.lods.some((e=>Math.abs(e.resolution-c)<s)))&&(i.x=i.y=n.resolution,o.width=Math.ceil((t.xmax-t.xmin)/i.x-.1),o.height=Math.ceil((t.ymax-t.ymin)/i.y-.1));const h=n.level-a.level,[d,y]=e.size,x=[];e.lods.forEach((e=>{e.level>=a.level&&e.level<=n.level&&x.push({x:e.resolution,y:e.resolution})})),x.sort(((e,t)=>e.x-t.x));const v=this.computeBlockBoundary(t,d,y,e.origin,x,h),g=x.length>1?x.slice(1):null;o.storageInfo=new m({blockWidth:e.size[0],blockHeight:e.size[1],pyramidBlockWidth:e.size[0],pyramidBlockHeight:e.size[1],pyramidResolutions:g,compression:e.format,origin:e.origin,firstPyramidLevel:1,maximumPyramidLevel:h,tileInfo:e,blockBoundary:v}),this._fixGCSShift(o),this._set("rasterInfo",o)}if(r.capabilities.toLowerCase().indexOf("tilemap")>-1){const e={tileInfo:o.storageInfo.tileInfo,parsedUrl:a.urlToObject(this.url),url:this.url,tileServers:[],type:"tile"};this._tilemapCache=new d.TilemapCache({layer:e})}}));function i(e){return t.apply(this,arguments)}return i}(),r.fetchRawTile=function(){var t=e._asyncToGenerator((function*(e,t,i,s={}){const{storageInfo:n,extent:a}=this.rasterInfo,r=n.maximumPyramidLevel-e+this._levelOffset,l=`${this.url}/tile/${r}/${t}/${i}`,o=this._slices?{sliceId:s.sliceId||0}:null,{data:u}=yield this.request(l,{query:o,responseType:"array-buffer",signal:s.signal});if(!u)return null;const c=yield this.decodePixelBlock(u,{width:n.tileInfo.size[0],height:n.tileInfo.size[1],planes:null,pixelType:null,isPoint:"Elevation"===this.tileType}),h=n.blockBoundary[e];if("jpg"!==n.compression||i>h.minCol&&i<h.maxCol&&t>h.minRow&&t<h.maxRow)return c;const{origin:m,blockWidth:f,blockHeight:p}=n,{x:d,y}=this.getPyramidPixelSize(e),v=Math.round((a.xmin-m.x)/d)%f,g=Math.round((a.xmax-m.x)/d)%f,S=Math.round((m.y-a.ymax)/y)%p,T=Math.round((m.y-a.ymin)/y)%p,b=i===h.minCol?v:0,I=t===h.minRow?S:0,_=i===h.maxCol?g:f,w=t===h.maxRow?T:p;return x.setValidBoundary(c,{x:b,y:I},{width:_-b,height:w-I}),c}));function i(e,i,s){return t.apply(this,arguments)}return i}(),r.getSliceIndex=function(e){if(null==e||!e.length||!this._slices)return null;const t=e;for(let i=0;i<this._slices.length;i++){const e=this._slices[i].multidimensionalDefinition;if(e.length===t.length&&!e.some((e=>{const i=t.filter((t=>e.variableName===t.variableName&&t.dimensionName===e.dimensionName))[0];if(!i)return!0;return(Array.isArray(e.values[0])?e.values[0][0]:e.values[0])!==(Array.isArray(i.values[0])?i.values[0][0]:i.values[0])})))return i}return null},r.fetchVariableStatisticsHistograms=function(){var t=e._asyncToGenerator((function*(e,t){const i=this.request(this.url+"/statistics",{query:{variable:e,f:"json"},signal:t}).then((e=>{var t;return null==(t=e.data)?void 0:t.statistics})),s=this.request(this.url+"/histograms",{query:{variable:e,f:"json"},signal:t}).then((e=>{var t;return null==(t=e.data)?void 0:t.histograms})),n=yield Promise.all([i,s]);return n[0]&&n[0].forEach((e=>{e.avg=e.mean,e.stddev=e.standardDeviation})),{statistics:n[0]||null,histograms:n[1]||null}}));function i(e,i){return t.apply(this,arguments)}return i}(),r.computeBestPyramidLevelForLocation=function(){var t=e._asyncToGenerator((function*(e,t={}){if(!this._tilemapCache)return 0;let i=this.identifyPixelLocation(e,0,n.unwrap(t.datumTransformation));if(null===i)return null;let s=0;const{maximumPyramidLevel:a}=this.rasterInfo.storageInfo;let r=a-s+this._levelOffset;const l=i.srcLocation;for(;r>=0;){try{if("available"===(yield this._tilemapCache.fetchAvailability(r,i.row,i.col,t)))break}catch{}if(r--,s++,i=this.identifyPixelLocation(l,s,n.unwrap(t.datumTransformation)),null===i)return null}return-1===r||null==i?null:s}));function i(e){return t.apply(this,arguments)}return i}(),r._fetchRasterInfo=function(){var t=e._asyncToGenerator((function*(e){const t=this.sourceJSON,i=Math.ceil((t.extent.xmax-t.extent.xmin)/t.pixelSizeX-.1),s=Math.ceil((t.extent.ymax-t.extent.ymin)/t.pixelSizeY-.1),n=S.fromJSON(t.spatialReference||t.extent.spatialReference);if("Map"===this.tileType)return new h({width:i,height:s,bandCount:3,extent:T.fromJSON(t.extent),spatialReference:n,pixelSize:new b({x:t.pixelSizeX,y:t.pixelSizeY,spatialReference:n}),pixelType:"u8",statistics:null,keyProperties:{DataType:"processed"}});const{slice:a,signal:r}=e,l=!!t.hasRasterAttributeTable&&this.request(this.url+"/rasterAttributeTable",{query:{slice:a,f:"json"},signal:r}).then((e=>g.fromJSON(e.data))).catch((()=>null)),o=!!t.hasColormap&&this.request(this.url+"/colormap",{query:{slice:a,f:"json"},signal:r}).then((e=>{var t;return null==(t=e.data)?void 0:t.colormap})),u=!!t.hasHistograms&&this.request(this.url+"/histograms",{query:{slice:a,f:"json"},signal:r}).then((e=>{var t;return null==(t=e.data)?void 0:t.histograms})),c=this.request(this.url+"/keyProperties",{query:{f:"json"},signal:r}).then((e=>e.data)).catch((()=>{})),m=!!t.hasMultidimensions&&this._fetchMultidimensionalInfo(),f=!!t.hasMultidimensions&&this.request(this.url+"/slices",{query:{f:"json"},signal:r}).then((e=>e.data&&e.data.slices)).catch((()=>{}));return Promise.all([l,o,u,c,m,f]).then((e=>{let a=null;if(t.minValues&&t.minValues.length===t.bandCount){a=[];for(let e=0;e<t.minValues.length;e++)a.push({min:t.minValues[e],max:t.maxValues[e],avg:t.meanValues[e],stddev:t.stdvValues[e]})}return this._slices=e[5]||null,new h({width:i,height:s,bandCount:t.bandCount,extent:T.fromJSON(t.extent),spatialReference:n,pixelSize:new b({x:t.pixelSizeX,y:t.pixelSizeY,spatialReference:n}),pixelType:t.pixelType.toLowerCase(),statistics:a,attributeTable:e[0]||null,colormap:e[1]||null,histograms:e[2]||null,keyProperties:e[3]||{},multidimensionalInfo:e[4]||null})}))}));function i(e){return t.apply(this,arguments)}return i}(),r._fetchMultidimensionalInfo=function(){var t=e._asyncToGenerator((function*(e){var t;const i=yield this.request(this.url+"/multidimensionalInfo",{query:{f:"json"},signal:e}).then((e=>{var t;return null==(t=e.data)?void 0:t.multidimensionalInfo}));return null!=(t=i.variables)&&t.length&&i.variables.forEach((e=>{var t;null!=(t=e.statistics)&&t.length&&e.statistics.forEach((e=>{e.avg=e.mean,e.stddev=e.standardDeviation}))})),i}));function i(e){return t.apply(this,arguments)}return i}(),r._fixScaleInServiceInfo=function(){const{sourceJSON:e}=this;e.minScale&&e.minScale<0&&(e.minScale=0),e.maxScale&&e.maxScale<0&&(e.maxScale=0)},r._fixGCSShift=function(e){const{extent:t,spatialReference:i}=e;0===t.xmin&&360===t.xmax&&i.wkid&&i.isGeographic&&(e.nativeExtent=e.extent,e.transform=new v,e.extent=e.transform.forwardTransform(t))},i}(y);return t.__decorate([r.property({type:String,json:{write:!0}})],I.prototype,"datasetFormat",void 0),t.__decorate([r.property()],I.prototype,"tileType",void 0),I=t.__decorate([c.subclass("esri.layers.support.rasterDatasets.ImageServerRaster")],I),I}));