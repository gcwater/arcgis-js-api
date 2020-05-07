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
// See http://js.arcgis.com/4.15/esri/copyright.txt for details.

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/tsSupport/assignHelper","../../../../core/tsSupport/awaiterHelper","../../../../core/tsSupport/generatorHelper","../../../../core/Accessor","../../../../core/arrayUtils","../../../../core/Handles","../../../../core/Logger","../../../../core/maybe","../../../../core/now","../../../../core/promiseUtils","../../../../core/scheduling","../../../../core/SetUtils","../../../../core/watchUtils","../../../../core/accessorSupport/decorators","../../../../geometry/support/aaBoundingRect","../../../../layers/graphics/dehydratedFeatures","../../../../tasks/support/QuantizationParameters","../../../../tasks/support/Query","./featureReference","./FeatureTile","../../terrain/tileUtils","../../../support/Scheduler"],(function(e,t,r,i,s,n,a,o,u,l,c,p,h,d,f,m,y,g,F,v,T,x,b,E,R,C){Object.defineProperty(t,"__esModule",{value:!0});var O=c.getLogger("esri.views.3d.layers.support.FeatureTileFetcher3D"),M=function(e){function t(t){var r=e.call(this,t)||this;return r.useTileCount=!1,r.updating=!1,r.updatingTotal=0,r.updatingRemaining=0,r.expectedFeatureDiff=0,r.maximumNumberOfFeaturesExceeded=!1,r.maximumNumberOfFeaturesExceededThrottle=1e3,r.maximumNumberOfFeaturesExceededNext=0,r._fullRatio=1,r._farRatio=1,r.changes={updates:{adds:new Array,removes:new Array},adds:new Array,removes:new Array},r.handles=new l,r._dirty=!1,r.featureTiles=new Map,r.displayingFeatureReferences=new Map,r.numDisplayingFeatureReferences=0,r.suspended=!0,r.pendingEdits=null,r}return r(t,e),Object.defineProperty(t.prototype,"maximumNumberOfFeatures",{set:function(e){e=e||1/0;var t=this._get("maximumNumberOfFeatures");e===t||e<1||(this._set("maximumNumberOfFeatures",e),this.maximumFeaturesUpdated(t,e))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"memoryFactor",{set:function(e){this.memoryFactor!==e&&(this._set("memoryFactor",e),this.setDirty())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"lodFactor",{set:function(e){this.lodFactor!==e&&(this._set("lodFactor",e),this.supportsResolution&&this.refetch())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"memoryForUnusedFeatures",{get:function(){var e=0;return this.featureTiles.forEach((function(t){return e+=t.estimatedUnusedSize})),e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"totalVertices",{get:function(){var e=0;return this.featureTiles.forEach((function(t){return e+=t.numVertices})),e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"totalFeatures",{get:function(){var e=0;return this.featureTiles.forEach((function(t){return e+=t.numFeatures})),e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"filterExtent",{set:function(e){if(e&&this.context.tilingScheme&&!e.spatialReference.equals(this.context.tilingScheme.spatialReference))O.error("#filterExtent=","extent needs to be in the same spatial reference as the tiling scheme");else{var t=this._get("filterExtent");if(!(t===e||t&&e&&t.equals(e))){var r=e?e.clone():null;this._set("filterExtent",r),this.reclip(r,t)}}},enumerable:!0,configurable:!0}),t.prototype.initialize=function(){var e=this;this.handles.add(y.on(this,"tileDescriptors","change",(function(){return e.setDirty()}),(function(){return e.setDirty()}))),this.objectIdField=this.context.objectIdField,this.FeatureReferenceClass=this.context.capabilities.supportsMultipleResolutions?b.MultiFeatureReference:b.SingleFeatureReference;var t=this.context.scheduler;p.isSome(t)&&this.handles.add(t.registerTask(C.Task.FEATURE_TILE_FETCHER,(function(t){return e.update(t)}),(function(){return e._dirty||e.maximumNumberOfFeaturesExceededNext>0}))),this.setDirty()},t.prototype.destroy=function(){var e=this;this.handles&&(this.handles.destroy(),this.handles=null),this.featureTiles.forEach((function(t){e.cancelFetchTile(t),e.removeTile(t)})),this.featureTiles.clear(),this.displayingFeatureReferences.clear(),this.pendingEdits&&(this.pendingEdits.controller.abort(),this.pendingEdits=null)},Object.defineProperty(t.prototype,"paused",{get:function(){return this.suspended||!!this.pendingEdits},enumerable:!0,configurable:!0}),t.prototype.restart=function(){var e=this;this.featureTiles.forEach((function(t){e.cancelFetchTile(t),e.clearTile(t),e.resetFetchTile(t)})),p.isSome(this.context.memoryCache)&&this.context.memoryCache.clear(),this.setDirty()},t.prototype.refetch=function(){var e=this;this.featureTiles.forEach((function(t){e.cancelFetchTile(t),e.resetFetchTile(t)})),p.isSome(this.context.memoryCache)&&this.context.memoryCache.clear(),this.setDirty()},t.prototype.suspend=function(){this.suspended||(this.suspended=!0,this.pause(),this.setDirty())},t.prototype.resume=function(){this.suspended&&(this.suspended=!1,this.unpause())},t.prototype.pause=function(){var e=this;this.paused&&(this.featureTiles.forEach((function(t){return e.cancelFetchTile(t)})),this.updated())},t.prototype.unpause=function(){this.paused||(this.setDirty(),this.updated())},Object.defineProperty(t.prototype,"availableFields",{get:function(){var e=null;return this.featureTiles.forEach((function(t){t.displayingFeatures&&0!==t.displayingFeatures.length&&(p.isNone(e)?e=m.createSetFromValues(u.keysOfSet(t.availableFields)):e.forEach((function(r){t.availableFields.has(r)||p.unwrap(e).delete(r)})))})),p.isSome(e)?e:new Set},enumerable:!0,configurable:!0}),t.prototype.applyEdits=function(e){var t=this;this.pendingEdits||(this.pendingEdits={edits:d.resolve(),count:0,controller:d.createAbortController()},this.pause()),this.pendingEdits.count++;var r=this.pendingEdits.edits.then((function(){return e.result.catch((function(e){if(d.isAbortError(e))throw e;return null})).then((function(e){return e?(t.applyEditsDeleteFeatures(e.deletedFeatures),t.applyEditsAddUpdateFeatures(e.addedFeatures,e.updatedFeatures,t.pendingEdits.controller.signal).then((function(){return e}))):e})).then((function(e){return 0==--t.pendingEdits.count&&(t.pendingEdits=null,p.isSome(t.context.memoryCache)&&t.context.memoryCache.clear(),t.unpause(),t.updated()),e}))}));return this.pendingEdits.edits=r,this.updated(),r},t.prototype.applyEditsDeleteFeatures=function(e){var t=this;if(0!==e.length){var r=new Set;e.forEach((function(e){return r.add(e.objectId)})),this.featureTiles.forEach((function(e){if(e.features){var i=e.features.filter((function(e){return!r.has(v.getObjectId(e,t.objectIdField))}));i.length!==e.features.length&&(e.setFeatures(i,0,e.availableFields),t.invalidateCounts())}}))}},t.prototype.applyEditsAddUpdateFeatures=function(e,t,r){return n(this,void 0,void 0,(function(){var i,s,n,o=this;return a(this,(function(a){switch(a.label){case 0:return i=[],s=new Set,e.forEach((function(e){return i.push(e.objectId)})),t.forEach((function(e){i.push(e.objectId),s.add(e.objectId)})),0===i.length?[2]:(n=[],this.featureTiles.forEach((function(e){var t=o.applyEditsAddUpdateTile(e,i,s,r);t&&n.push(t)})),[4,d.eachAlways(n)]);case 1:return a.sent(),[2]}}))}))},t.prototype.applyEditsAddUpdateTile=function(e,t,r,i){return n(this,void 0,void 0,(function(){var s,n,o,u,l,c,p,h=this;return a(this,(function(a){switch(a.label){case 0:return e.features?((s=this.createQuery(e)).resultType=void 0,s.cacheHint=!1,s.objectIds=t,[4,this.queryFeatures(s,i)]):[2];case 1:if(n=a.sent(),o=null,r.size>0&&(u=e.features.filter((function(e){return!r.has(v.getObjectId(e,h.objectIdField))}))).length!==e.features.length&&(o=u),n.features.length>0)for(o||(o=e.features.slice()),l=0,c=n.features;l<c.length;l++)p=c[l],o.push(p);return o&&(e.setFeatures(o,0,w(e.availableFields,n.fields)),this.invalidateCounts()),[2]}}))}))},t.prototype.queryFeatures=function(e,t){return this.context.query.queryFeaturesDehydrated(e,{signal:t,timeout:U})},t.prototype.setDirty=function(){this._dirty=!0,this.updated()},t.prototype.update=function(e){var t=this;if(this.maximumNumberOfFeaturesExceededNext&&h()>=this.maximumNumberOfFeaturesExceededNext&&this.updateMaximumNumberOfFeaturesExceeded(),this._dirty&&this.constructed){this._dirty=!1;var r=this.getListOfTiles();if(this.markTilesNotAlive(r),e.run((function(){return t.addTiles(r,e)}))&&e.run((function(){return t.filterExtentTiles(r,e)}))&&e.run((function(){return t.removeTiles(r,e)}))&&!e.done){var i=this.sortTiles(r);e.run((function(){return t.displayTiles(i,e)}))&&e.run((function(){return t.fetchTiles(i,e)}))&&e.run((function(){return t.updateMemoryEstimates(i,e)}))||this.setDirty(),this.updated()}else this.setDirty()}},t.prototype.markTilesNotAlive=function(e){for(var t=0,r=e;t<r.length;t++){r[t].alive=!1}},t.prototype.addTiles=function(e,t){var r=this;return!this.suspended&&(this.tileDescriptors.forEach((function(i){var s=r.featureTiles.get(i.id);s?s.alive=!0:t.done||(e.push(r.addTile(i)),t.madeProgress())})),t.hasProgressed)},t.prototype.filterExtentTiles=function(e,t){for(var r=0,i=e;r<i.length;r++){var s=i[r];if(t.done)break;s.alive&&(s.filtered=!s.intersects(this.filterExtent),s.filtered&&(this.clearTile(s),t.madeProgress()))}return t.hasProgressed},t.prototype.removeTiles=function(e,t){for(var r=e.length-1;r>=0&&!t.done;r--){var i=e[r];i.alive||(this.removeTile(i),r!==e.length-1&&(e[r]=e[e.length-1]),e.pop(),t.madeProgress())}return t.hasProgressed},t.prototype.sortTiles=function(e){return e.sort((function(e,t){return e.descriptor.loadPriority-t.descriptor.loadPriority})),e},t.prototype.displayTiles=function(e,t){for(var r=this,i=this.updateRatio(e),s=function(e){if(!t.run((function(){return function(e){var t=r._fullRatio<1?i(e)*r._farRatio:1;return e.reduceFeatures(t,r.memoryFactor,r.objectIdField)&&r.setDirty(),r.showTile(e)}(e)})))return n.setDirty(),"break"},n=this,a=0,o=e;a<o.length;a++){if("break"===s(o[a]))break}return t.hasProgressed},t.prototype.fetchTiles=function(e,t){var r=this;if(this.paused)return!1;for(var i=!1,s=function(e){if(!e.needsFetching)return"continue";var r=p.isSome(n.context.memoryCache)&&n.context.memoryCache.pop(e.id);if(r)return e.cache=r,n.setDirty(),n.scheduleUpdated(),t.madeProgress(),"continue";if(n.needsNumFeatures(e)){var s=d.createAbortController(),a=n.fetchTileCount(e,s.signal);n._handleRequest(e,a,s,(function(){return e.numFeatures=E.FAILED_FEATURE_COUNT})),i=!0,t.madeProgress()}return t.done?{value:!0}:void 0},n=this,a=0,o=e;a<o.length;a++){var u=s(o[a]);if("object"==typeof u)return u.value}if(i)return t.hasProgressed;for(var l=function(e){if(e.needsFetching){var i=d.createAbortController(),s=c.fetchTile(e,i.signal);if(c._handleRequest(e,s,i,(function(t){e.setFeatures([],0,null),r.invalidateCounts(),e.featuresMissing=!1,r.context.logFetchError(O,t)})),t.madeProgress(),t.done)return{value:!0}}},c=this,h=0,f=e;h<f.length;h++){var m=l(f[h]);if("object"==typeof m)return m.value}return t.hasProgressed},t.prototype.updateMemoryEstimates=function(e,t){var r=this;return e.some((function(e){return!t.run((function(){return e.updateMemoryEstimates()}))&&(r.setDirty(),!0)})),t.hasProgressed},t.prototype.reclip=function(e,t){var r=this;this.constructed&&(this.featureTiles.forEach((function(i){i.displayingFeatures&&0!==i.displayingFeatures.length&&(i.intersection(t,j),i.intersection(e,A),F.equals(j,A)||r.hideTileFeatures(i))})),this.featureTiles.forEach((function(e){return r.showTile(e)})),this.updated())},t.prototype.updated=function(){var e=this,t=0;this.paused||this.featureTiles.forEach((function(e){return e.isFetching?++t:0}));var r=this._dirty||t>0||!!this.pendingEdits;if(this._set("updating",r),r){var i=0,s=0,n=0,a=0,o=0,u=0,l=this.displayingFeatureReferences.size/this.numDisplayingFeatureReferences;this.featureTiles.forEach((function(t){if(++n,t.isFetching&&t.hasPreciseFeatureCount){var r=e.maximumFeaturesForTile(t)*(1-t.emptyFeatureRatio),i=t.displayingFeatures?t.displayingFeatures.length*l:0;u+=r-i}t.needsFetching?++o:t.numFeatures>0&&(++a,s+=t.numFeatures)})),o+=t;var c=0;s?(i=s,c=Math.min(o*s/a,s)):(i=n,c=o),u=Math.min(this.maximumNumberOfFeatures-this.features.length,u),this._set("updatingTotal",i),this._set("updatingRemaining",c),this._set("expectedFeatureDiff",u)}else this._set("updatingTotal",0),this._set("updatingRemaining",0),this._set("expectedFeatureDiff",0);this.debugger&&this.debugger.update(),this.updating||(this.maximumNumberOfFeaturesExceededNext=this.maximumNumberOfFeaturesExceededNext||h()+this.maximumNumberOfFeaturesExceededThrottle)},t.prototype.updateMaximumNumberOfFeaturesExceeded=function(){if(!this.updating){var e=!1;this.featureTiles.forEach((function(t){e=e||t.perTileMaximumNumberOfFeaturesExceeded})),this.maximumNumberOfFeaturesExceededNext=0,this._set("maximumNumberOfFeaturesExceeded",e)}},t.prototype.updateRatio=function(e){for(var t=function(e){for(var t=0,r=0,i=e;r<i.length;r++){var s=i[r];s.features&&s.features.length>0&&s.alive&&(t=Math.max(t,s.descriptor.lij[0]))}return t}(e),r=function(e){return 1/(1<<Math.max(0,t-e.descriptor.lij[0]))},i=0,s=0,n=0,a=e;n<a.length;n++){var o=a[n],u=o.numFeatures;i+=u,s+=u*r(o)}return this._fullRatio=Math.min(1,this.maximumNumberOfFeatures/i),this._farRatio=this.maximumNumberOfFeatures/s,this.scheduleUpdated(),r},t.prototype.maximumFeaturesUpdated=function(e,t){var r=this;e!==t&&(t>e&&this.featureTiles.forEach((function(e){if(e.featuresMissing){var t=r.maximumFeaturesForTile(e);e.features&&(e.features.length>=t||5===e.fetchStatus)||(r.cancelFetchTile(e),r.resetFetchTile(e))}})),this.setDirty())},t.prototype.addTile=function(e){var t=new E.FeatureTile(e);return this.featureTiles.set(t.id,t),this.resetFetchTile(t),this.referenceDisplayingFeaturesFromRelatedTiles(t),t},t.prototype.referenceDisplayingFeaturesFromRelatedTiles=function(e){var t=this,r=e.descriptor.resolution;this.featureTiles.forEach((function(i){if(i.displayingFeatures&&e!==i&&(!e.descriptor.lij||!i.descriptor.lij||R.tilesAreRelated(e.descriptor.lij,i.descriptor.lij))){e.displayingFeatures=e.displayingFeatures||[];for(var s=0,n=i.displayingFeatures;s<n.length;s++){var a=n[s];e.displayingFeatures.push(a);var o=t.displayingFeatureReferences.get(v.getObjectId(a,t.objectIdField));o.ref(o.feature,r),t.numDisplayingFeatureReferences++}}})),e.featureLimit=e.displayingFeatures?e.displayingFeatures.length:0},t.prototype.removeTile=function(e){this.clearTile(e),this.featureTiles.delete(e.id)},t.prototype.resetFetchTile=function(e){e.filtered=!e.intersects(this.filterExtent),e.filtered?e.needsFetching&&(e.fetchStatus=4):e.fetchStatus=0},t.prototype.cancelFetchTile=function(e){var t=e.requestController;p.isSome(t)&&(e.requestController=null,e.resetFetching(),t.abort())},t.prototype.fetchTileCount=function(e,t){return n(this,void 0,void 0,(function(){var r;return a(this,(function(i){switch(i.label){case 0:return r=e,[4,this.fetchCount(e,t)];case 1:return r.numFeatures=i.sent(),this.updateRatio(this.getListOfTiles()),[2,3===e.fetchStatus?1:0]}}))}))},t.prototype.fetchTile=function(e,t){return n(this,void 0,void 0,(function(){var r,i,s,n,o,u,l,c,p,h,d;return a(this,(function(a){switch(a.label){case 0:return(r=this.maximumFeaturesForTile(e))<=0?[2,D(e)]:(i=this.getMaxRecordCount(e),s=Math.ceil(r/i),_(e)||!this.context.capabilities.supportsMaxRecordCountFactor||e.numFeatures<=r&&s>x.MAX_MAX_RECORD_COUNT_FACTOR?[2,this.fetchPagedTile(e,t)]:((n=this.createQuery(e)).maxRecordCountFactor=Math.ceil(r/i),e.isRefetching&&e.features&&e.features.length>0&&(o=Math.ceil(e.features.length/(1-e.emptyFeatureRatio)/i),n.maxRecordCountFactor=Math.max(o+1,n.maxRecordCountFactor)),[4,this.queryFeatures(n,t)]));case 1:return u=a.sent(),l=u.features,c=u.exceededTransferLimit,p=u.fields,h=c?n.maxRecordCountFactor>=x.MAX_MAX_RECORD_COUNT_FACTOR?5:4:5,e.featuresMissing=l.length<e.numFeatures||c,d=this._removeEmptyFeatures(l),e.setFeatures(l,d,N(p)),this.invalidateCounts(),[2,h]}}))}))},t.prototype.fetchCount=function(e,t){return n(this,void 0,void 0,(function(){return a(this,(function(r){return[2,this.context.query.queryFeatureCount(this.createFeatureCountQuery(e),{signal:t})]}))}))},t.prototype.fetchPagedTile=function(e,t){return n(this,void 0,void 0,(function(){var r,i,s,n,o,u,l,c,p,h,d,f,m;return a(this,(function(a){switch(a.label){case 0:r=0,i=0,n=0,o=this.maximumFeaturesForTile(e)-n,u=this.getMaxRecordCount(e),l=null,a.label=1;case 1:return c=this.createQuery(e),p=this.setPagingParameters(c,r,o,u),[4,this.queryFeatures(c,t)];case 2:return h=a.sent(),d=h.features,f=h.exceededTransferLimit,m=h.fields,p&&(r+=c.num),n+=d.length,i+=this._removeEmptyFeatures(d),e.featuresMissing=r<e.numFeatures||f,s=s?s.concat(d):d,l=w(l,m),e.setFeatures(s,i,l),this.invalidateCounts(),this.setDirty(),o=this.maximumFeaturesForTile(e)-n,!p||!f||o<=0?[2,f?4:5]:[3,1];case 3:return[2]}}))}))},t.prototype.createFeatureCountQuery=function(e){var t=this.createQuery(e);return this.context.capabilities.supportsCacheHint&&(t.resultType=void 0,t.cacheHint=!0),t},t.prototype.createQuery=function(e){var t=this.context.createQuery(),r=e.descriptor.extent;if(r){var i=this.context.tilingScheme.spatialReference;t.geometry=F.toExtent(r,i)}return this.setResolutionParams(t,e),this.useTileQuery(e)?t.resultType="tile":this.context.capabilities.supportsCacheHint&&(t.cacheHint=!0),t},t.prototype.setPagingParameters=function(e,t,r,i){return!!this.context.capabilities.supportsPagination&&(e.start=t,r>0&&this.context.capabilities.supportsMaxRecordCountFactor?(e.maxRecordCountFactor=Math.ceil(r/i),e.num=Math.min(e.maxRecordCountFactor*i,r)):e.num=Math.min(i),!0)},t.prototype.getEffectiveTileResolution=function(e){if(null==e.descriptor.resolution)return null;var t="global"===this.context.viewingMode?this.context.tilingScheme.resolutionAtLevel(3):1/0;return Math.min(e.descriptor.resolution,t)/this.lodFactor},Object.defineProperty(t.prototype,"supportsResolution",{get:function(){return this.context.capabilities.supportsMultipleResolutions&&"point"!==this.context.geometryType},enumerable:!0,configurable:!0}),t.prototype.setResolutionParams=function(e,t){if(this.supportsResolution){var r=this.getEffectiveTileResolution(t);null!=r&&(this.context.capabilities.supportsQuantization?e.quantizationParameters=new T.default({mode:"view",originPosition:"upper-left",tolerance:r,extent:this.context.fullExtent}):"polyline"===this.context.geometryType&&(e.maxAllowableOffset=r))}},t.prototype._removeEmptyFeatures=function(e){for(var t=e.length,r=0;r<e.length;){var i=e[r];v.hasVertices(i.geometry)?++r:(e[r]=e[e.length-1],--e.length)}return t-e.length},t.prototype.needsNumFeatures=function(e){return this.useTileCount&&e.needsFeatureCount&&!_(e)},t.prototype.getMaxRecordCount=function(e){var t=this.context,r=t.tileMaxRecordCount,i=t.maxRecordCount;return this.useTileQuery(e)&&p.isSome(r)&&r>0&&this.context.capabilities.supportsResultType?r:p.isSome(i)&&i>0?i:S},t.prototype.useTileQuery=function(e){return(!_(e)||!this.context.capabilities.supportsCacheHint)&&this.context.capabilities.supportsResultType},t.prototype._handleRequest=function(e,t,r,i){var s=this;e.fetchStatus=e.needsRefetching?3:2,e.requestController=r;var n=!1;t.then((function(t){e.requestController=null,e.fetchStatus=t})).catch((function(t){e.requestController===r&&(e.requestController=null,e.fetchStatus=4),d.isAbortError(t)?n=!0:i(t)})).then((function(){n||s.setDirty(),s.scheduleUpdated()}))},t.prototype.scheduleUpdated=function(){var e=this;this.handles&&!this.handles.has("scheduleUpdated")&&this.handles.add(f.schedule((function(){e.handles.remove("scheduleUpdated"),e.updated()})),"scheduleUpdated")},t.prototype.showTile=function(e){if(e.displayingFeatures&&!e.needsDisplayUpdate)return!1;var t=e.features;if(0===e.featureLimit||!t){var r=e.displayingFeatures&&e.displayingFeatures.length>0;return this.hideTileFeatures(e),e.displayingFeatures=[],r}var i=e.descriptor.resolution,s=this.changes.updates,n=this.changes.adds,a=Math.min(e.featureLimit,t.length);e.featureLimit=a;for(var o=0;o<a;++o){var u=t[o],l=v.getObjectId(u,this.objectIdField),c=this.displayingFeatureReferences.get(l);if(c){var p=c.ref(u,i);p.oldVersion!==p.newVersion&&(s.removes.push(p.oldVersion),s.adds.push(p.newVersion))}else this.displayingFeatureReferences.set(l,new this.FeatureReferenceClass(u,i)),n.push(u);this.numDisplayingFeatureReferences++}return this.hideTileFeatures(e),this.applyChanges(),e.displayingFeatures=t.slice(0,a),!0},t.prototype.hideTile=function(e){this.cancelFetchTile(e),this.hideTileFeatures(e)},t.prototype.hideTileFeatures=function(e){if(e.displayingFeatures){for(var t=this.changes.updates,r=this.changes.removes,i=0,s=e.displayingFeatures;i<s.length;i++){var n=s[i],a=v.getObjectId(n,this.objectIdField),o=this.displayingFeatureReferences.get(a);if(o){var u=o.unref(e.descriptor.resolution);this.numDisplayingFeatureReferences--,u?u.oldVersion!==u.newVersion&&(null==u.newVersion?(this.displayingFeatureReferences.delete(a),r.push(u.oldVersion)):(t.adds.push(u.newVersion),t.removes.push(u.oldVersion))):console.error("Hiding unreferenced feature")}}this.applyChanges(),e.displayingFeatures=null}},t.prototype.applyChanges=function(){var e=this.changes.updates;e.removes.length>0&&(this.features.removeMany(e.removes),e.removes.length=0),e.adds.length>0&&(this.features.addMany(e.adds),e.adds.length=0);for(var t=this.changes.adds,r=this.changes.removes,i=Math.min(t.length,r.length),s=0;s<i;){var n=Math.min(s+q,i);this.features.addMany(t.slice(s,n)),this.features.removeMany(r.slice(s,n)),s=n}t.length>i&&this.features.addMany(0===s?t:t.slice(s)),r.length>i&&this.features.removeMany(0===s?r:r.slice(s)),t.length=0,r.length=0},t.prototype.clearTile=function(e){if(this.hideTile(e),e.features&&p.isSome(this.context.memoryCache)){var t=16+e.estimatedSize;this.context.memoryCache.put(e.id,e.cache,t)}e.setFeatures(null,0,null),this.invalidateCounts()},t.prototype.invalidateCounts=function(){this.notifyChange("totalVertices"),this.notifyChange("totalFeatures"),this.notifyChange("memoryForUnusedFeatures")},t.prototype.getListOfTiles=function(){var e=new Array(this.featureTiles.size),t=0;return this.featureTiles.forEach((function(r){return e[t++]=r})),e},Object.defineProperty(t.prototype,"storedFeatures",{get:function(){return this.getListOfTiles().reduce((function(e,t){return e+(t.features?t.features.length:0)}),0)},enumerable:!0,configurable:!0}),t.prototype.maximumFeaturesForTile=function(e){var t=e.hasPreciseFeatureCount?e.numFeatures:1/0,r=e.hasPreciseFeatureCount?t:this.maximumNumberOfFeatures,i=this._fullRatio<1?this._farRatio:1;return Math.min(Math.ceil(r*i/(1-e.emptyFeatureRatio)),t)},Object.defineProperty(t.prototype,"test",{get:function(){var e=this;return{update:function(t){return e.update(t)},getFeatureTileById:function(t){return e.featureTiles.get(t)},forEachFeatureTile:function(t){return e.featureTiles.forEach(t)}}},enumerable:!0,configurable:!0}),i([g.property({constructOnly:!0})],t.prototype,"features",void 0),i([g.property()],t.prototype,"tileDescriptors",void 0),i([g.property({value:1/0})],t.prototype,"maximumNumberOfFeatures",null),i([g.property({value:1})],t.prototype,"memoryFactor",null),i([g.property({value:1})],t.prototype,"lodFactor",null),i([g.property()],t.prototype,"useTileCount",void 0),i([g.property({readOnly:!0})],t.prototype,"updating",void 0),i([g.property({readOnly:!0})],t.prototype,"updatingTotal",void 0),i([g.property({readOnly:!0})],t.prototype,"updatingRemaining",void 0),i([g.property({readOnly:!0})],t.prototype,"expectedFeatureDiff",void 0),i([g.property({readOnly:!0})],t.prototype,"memoryForUnusedFeatures",null),i([g.property({readOnly:!0})],t.prototype,"maximumNumberOfFeaturesExceeded",void 0),i([g.property({constructOnly:!0})],t.prototype,"maximumNumberOfFeaturesExceededThrottle",void 0),i([g.property({readOnly:!0})],t.prototype,"totalVertices",null),i([g.property({readOnly:!0})],t.prototype,"totalFeatures",null),i([g.property()],t.prototype,"filterExtent",null),i([g.property({constructOnly:!0})],t.prototype,"context",void 0),t=i([g.subclass("esri.views.3d.layers.support.FeatureTileFetcher3D")],t)}(g.declared(o));function _(e){return"dummy-tile-full-extent"===e.id}function P(e){switch(e.geometryType){case"polyline":return!0;case"polygon":return e.capabilities&&e.capabilities.query&&e.capabilities.query.supportsQuantization;default:return!1}}function D(e){return e.setFeatures([],0,null),e.featuresMissing=!1,4}function N(e){return p.isNone(e)?new Set:m.createSetFromValues(e.map((function(e){return e.name})))}function w(e,t){if(p.isNone(e)||p.isNone(t))return N(t);for(var r=new Set,i=0,s=t;i<s.length;i++){var n=s[i].name;e.has(n)&&r.add(n)}return r}t.FeatureTileFetcher3D=M,t.contextCapabilitiesFromLayer=function(e){var t=e.capabilities.query;return{supportsMultipleResolutions:P(e),supportsPagination:!(!t||!t.supportsPagination),supportsResultType:!(!t||!t.supportsResultType),supportsCacheHint:!(!t||!t.supportsCacheHint),supportsQuantization:!(!t||!t.supportsQuantization),supportsQuantizationEditMode:!(!t||!t.supportsQuantizationEditMode),supportsMaxRecordCountFactor:!(!t||!t.supportsMaxRecordCountFactor),supportsFormatPBF:!(!t||!t.supportsFormatPBF)}};var S=2e3,j=F.create(),A=F.create(),U=6e5,q=200;t.default=M}));