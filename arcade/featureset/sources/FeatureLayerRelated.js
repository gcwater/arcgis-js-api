/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../../../chunks/_rollupPluginBabelHelpers","../../../Graphic","../support/FeatureSet","../support/IdSet","../support/shared","../../../core/promiseUtils","../../../rest/support/RelationshipQuery"],(function(e,t,i,r,s,n,a){"use strict";return function(i){function l(e){var t;return(t=i.call(this,e)||this).declaredClass="esri.arcade.featureset.sources.FeatureLayerRelated",t._findObjectId=-1,t._requestStandardised=!1,t._removeGeometry=!1,t._overrideFields=null,t.featureObjectId=null,t.relatedLayer=null,t.relationship=null,e.spatialReference&&(t.spatialReference=e.spatialReference),t._transparent=!0,t._maxProcessing=1e3,t._layer=e.layer,t._wset=null,t._findObjectId=e.objectId,t.featureObjectId=e.objectId,t.relationship=e.relationship,t.relatedLayer=e.relatedLayer,void 0!==e.outFields&&(t._overrideFields=e.outFields),void 0!==e.includeGeometry&&(t._removeGeometry=!1===e.includeGeometry),t}e._inheritsLoose(l,i);var d=l.prototype;return d._maxQueryRate=function(){return s.defaultMaxRecords},d.end=function(){return this._layer},d.optimisePagingFeatureQueries=function(){},d.load=function(){return null===this._loadPromise&&(this._loadPromise=n.create(((e,t)=>{n.all([this._layer.load(),this.relatedLayer.load()]).then((()=>{this._initialiseFeatureSet(),e(this)}),t)}))),this._loadPromise},d.nativeCapabilities=function(){return this.relatedLayer.nativeCapabilities()},d._initialiseFeatureSet=function(){if(null==this.spatialReference&&(this.spatialReference=this._layer.spatialReference),this.geometryType=this.relatedLayer.geometryType,this.fields=this.relatedLayer.fields.slice(0),null!==this._overrideFields)if(1===this._overrideFields.length&&"*"===this._overrideFields[0])this._overrideFields=null;else{const e=[],t=[];for(const i of this.fields)if("oid"===i.type)e.push(i),t.push(i.name);else for(const r of this._overrideFields)if(r.toLowerCase()===i.name.toLowerCase()){e.push(i),t.push(i.name);break}this.fields=e,this._overrideFields=t}const e=this._layer.nativeCapabilities();e&&(this._databaseType=e.databaseType,this._requestStandardised=e.requestStandardised),this.objectIdField=this.relatedLayer.objectIdField,this.globalIdField=this.relatedLayer.globalIdField,this.hasM=this.relatedLayer.supportsM,this.hasZ=this.relatedLayer.supportsZ,this.typeIdField=this.relatedLayer.typeIdField,this.types=this.relatedLayer.types},d.databaseType=function(){return this.relatedLayer.databaseType().then((()=>(this._databaseType=this.relatedLayer._databaseType,this._databaseType)))},d.isTable=function(){return this.relatedLayer.isTable()},d._isInFeatureSet=function(){return s.IdState.InFeatureSet},d._candidateIdTransform=function(e){return e},d._getSet=function(e){return null===this._wset?this._ensureLoaded().then((()=>this._getFilteredSet("",null,null,null,e))).then((e=>(this._wset=e,e))):n.resolve(this._wset)},d._changeFeature=function(e){const i={};for(const t of this.fields)i[t.name]=e.attributes[t.name];return new t({geometry:!0===this._removeGeometry?null:e.geometry,attributes:i})},d._getFilteredSet=function(e,t,i,s,n){return this.databaseType().then((()=>{if(this.isTable()&&t&&null!==e&&""!==e){return new r([],[],!0,null)}const l=this._layer.nativeCapabilities();if(!1===l.canQueryRelated){return new r([],[],!0,null)}if(l.capabilities.queryRelated&&l.capabilities.queryRelated.supportsPagination)return this._getFilteredSetUsingPaging(e,t,i,s,n);let d="",o=!1;null!==s&&l.capabilities&&l.capabilities.queryRelated&&!0===l.capabilities.queryRelated.supportsOrderBy&&(d=s.constructClause(),o=!0);const u=new a;u.objectIds=[this._findObjectId];const c=null!==this._overrideFields?this._overrideFields:this._fieldsIncludingObjectId(this.relatedLayer.fields?this.relatedLayer.fields.map((e=>e.name)):["*"]);u.outFields=c,u.relationshipId=this.relationship.id,u.where="1=1";let h=!0;return!0===this._removeGeometry&&(h=!1),u.returnGeometry=h,this._requestStandardised&&(u.sqlFormat="standard"),u.outSpatialReference=this.spatialReference,u.orderByFields=""!==d?d.split(","):null,l.source.queryRelatedFeatures(u).then((s=>{this._checkCancelled(n);const a=s[this._findObjectId]?s[this._findObjectId].features:[],l=[];for(let e=0;e<a.length;e++)this._featureCache[a[e].attributes[this._layer.objectIdField]]=a[e],l.push(a[e].attributes[this._layer.objectIdField]);const d=t&&null!==e&&""!==e,u=null!=i;return new r(d||u?l:[],d||u?[]:l,o,null)}))}))},d._fieldsIncludingObjectId=function(e){if(null===e)return[this.objectIdField];const t=e.slice(0);if(t.indexOf("*")>-1)return t;let i=!1;for(const r of t)if(r.toUpperCase()===this.objectIdField.toUpperCase()){i=!0;break}return!1===i&&t.push(this.objectIdField),t},d._getFilteredSetUsingPaging=function(e,t,i,s,a){try{let n="",l=!1;const d=this._layer.nativeCapabilities();return null!==s&&d&&d.capabilities.queryRelated&&!0===d.capabilities.queryRelated.supportsOrderBy&&(n=s.constructClause(),l=!0),this.databaseType().then((()=>{const s="1=1";let o=this._maxQueryRate();const u=d.capabilities.query.maxRecordCount;void 0!==u&&u<o&&(o=u);const c=t&&null!==e&&""!==e,h=null!=i;let f=null,y=!0;!0===this._removeGeometry&&(y=!1);const p=null!==this._overrideFields?this._overrideFields:this._fieldsIncludingObjectId(this.relatedLayer.fields?this.relatedLayer.fields.map((e=>e.name)):["*"]);return f=new r(c||h?["GETPAGES"]:[],c||h?[]:["GETPAGES"],l,{outFields:p.join(","),resultRecordCount:o,resultOffset:0,objectIds:[this._findObjectId],where:s,orderByFields:n,returnGeometry:y,returnIdsOnly:"false",internal:{set:[],lastRetrieved:0,lastPage:0,fullyResolved:!1}}),this._expandPagedSet(f,o,0,0,a).then((()=>f))}))}catch(l){return n.reject(l)}},d._expandPagedSet=function(e,t,i,r,s){return this._expandPagedSetFeatureSet(e,t,i,r,s)},d._clonePageDefinition=function(e){return null===e?null:!0!==e.groupbypage?{groupbypage:!1,outFields:e.outFields,resultRecordCount:e.resultRecordCount,resultOffset:e.resultOffset,where:e.where,objectIds:e.objectIds,orderByFields:e.orderByFields,returnGeometry:e.returnGeometry,returnIdsOnly:e.returnIdsOnly,internal:e.internal}:{groupbypage:!0,outFields:e.outFields,resultRecordCount:e.resultRecordCount,useOIDpagination:e.useOIDpagination,generatedOid:e.generatedOid,groupByFieldsForStatistics:e.groupByFieldsForStatistics,resultOffset:e.resultOffset,outStatistics:e.outStatistics,geometry:e.geometry,where:e.where,objectIds:e.objectIds,orderByFields:e.orderByFields,returnGeometry:e.returnGeometry,returnIdsOnly:e.returnIdsOnly,internal:e.internal}},d._getPhysicalPage=function(e,t,i){try{const t=e.pagesDefinition.internal.lastRetrieved,r=t,s=e.pagesDefinition.internal.lastPage,n=this._layer.nativeCapabilities(),l=new a;return!0===this._requestStandardised&&(l.sqlFormat="standard"),l.relationshipId=this.relationship.id,l.objectIds=e.pagesDefinition.objectIds,l.resultOffset=e.pagesDefinition.internal.lastPage,l.resultRecordCount=e.pagesDefinition.resultRecordCount,l.outFields=e.pagesDefinition.outFields.split(","),l.where=e.pagesDefinition.where,l.orderByFields=""!==e.pagesDefinition.orderByFields?e.pagesDefinition.orderByFields.split(","):null,l.returnGeometry=e.pagesDefinition.returnGeometry,l.outSpatialReference=this.spatialReference,n.source.queryRelatedFeatures(l).then((n=>{if(this._checkCancelled(i),e.pagesDefinition.internal.lastPage!==s)return 0;const a=n[this._findObjectId]?n[this._findObjectId].features:[];for(let t=0;t<a.length;t++)e.pagesDefinition.internal.set[r+t]=a[t].attributes[this._layer.objectIdField];for(let e=0;e<a.length;e++)this._featureCache[a[e].attributes[this._layer.objectIdField]]=a[e];const l=!n[this._findObjectId]||!1===n[this._findObjectId].exceededTransferLimit;return a.length!==e.pagesDefinition.resultRecordCount&&l&&(e.pagesDefinition.internal.fullyResolved=!0),e.pagesDefinition.internal.lastRetrieved=t+a.length,e.pagesDefinition.internal.lastPage+=e.pagesDefinition.resultRecordCount,a.length}))}catch(r){return n.reject(r)}},d._getFeatures=function(e,t,i,r){const s=[];-1!==t&&void 0===this._featureCache[t]&&s.push(t);const a=this._maxQueryRate();if(!0===this._checkIfNeedToExpandKnownPage(e,a))return this._expandPagedSet(e,a,0,0,r).then((()=>this._getFeatures(e,t,i,r)));let l=0;for(let n=e._lastFetchedIndex;n<e._known.length&&(l++,l<=i&&(e._lastFetchedIndex+=1),!("GETPAGES"!==e._known[n]&&void 0===this._featureCache[e._known[n]]&&(e._known[n]!==t&&s.push(e._known[n]),s.length>i)))&&!(l>=i&&0===s.length);n++);return 0===s.length?n.resolve("success"):n.reject(new Error("Unaccounted for Features. Not in Feature Collection"))},d._refineSetBlock=function(e,t,i){return n.resolve(e)},d._stat=function(e,t,i,r,s,a,l){return n.resolve({calculated:!1})},d._canDoAggregates=function(e,t,i,r,s){return n.resolve(!1)},d.relationshipMetaData=function(){return this.relatedLayer.relationshipMetaData()},d.serviceUrl=function(){return this.relatedLayer.serviceUrl()},d.queryAttachments=function(e,t,i,r){return this.relatedLayer.queryAttachments(e,t,i,r)},d.getFeatureByObjectId=function(e,t){return this.relatedLayer.getFeatureByObjectId(e,t)},d.getOwningSystemUrl=function(){return this.relatedLayer.getOwningSystemUrl()},d.getIdentityUser=function(){return this.relatedLayer.getIdentityUser()},e._createClass(l,[{key:"gdbVersion",get:function(){return this.relatedLayer.gdbVersion}}]),l}(i)}));