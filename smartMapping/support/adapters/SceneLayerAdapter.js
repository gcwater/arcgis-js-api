/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../../../chunks/_rollupPluginBabelHelpers","../../../chunks/tslib.es6","../../../Graphic","../../../core/arrayUtils","../../../core/Error","../../../core/maybe","../../../core/promiseUtils","../../../core/watchUtils","../../../core/accessorSupport/decorators/property","../../../core/has","../../../core/accessorSupport/ensureType","../../../core/Logger","../../../core/accessorSupport/decorators/subclass","../../../layers/support/fieldUtils","../../../rest/support/FeatureSet","../../statistics/support/utils","../utils","./FeatureLayerAdapter","./LayerAdapter","./support/utils"],(function(e,t,r,a,s,i,n,o,l,u,c,d,p,m,h,f,y,g,F,_){"use strict";let v=function(t){function l(e){return t.call(this,e)||this}e._inheritsLoose(l,t);var u=l.prototype;return u._hasCachedStatistics=function(e){return this.layer.hasCachedStatistics(e)},u._updateQuery=function(e,t=[],r=[]){if(!r.length)return e;const a=this.layer.objectIdField,s=e.clone(),i=t.filter((e=>{const t=this.layer.getField(e);return-1===r.indexOf(t.name)})),n=i.some((e=>this.layer.getField(e).name===a));return s.outFields=n?i:[...i,a],s},u._fetchFeaturesFromMemory=function(){var t=e._asyncToGenerator((function*(e,t,r){if(!e)throw new s("scene-layer-adapter:insufficient-data","view is required to fetch the features from layerView");const a=yield e.whenLayerView(this.layer),i=n.createAbortController(),l=o.whenFalseOnce(a,"updating",i.signal);yield n.timeout(l,5e3,i);const u=yield _.getMissingFields(this,r,a),c=this._updateQuery(t,r,u),d=(yield a.queryFeatures(c)).features;return u.length?a.whenGraphicAttributes(d,u):d}));function r(e,r,a){return t.apply(this,arguments)}return r}(),u._fetchFeaturesJSONFromMemory=function(){var t=e._asyncToGenerator((function*(e,t,r){return this._fetchFeaturesFromMemory(e,t,r).then(_.ensureFeaturesJSON)}));function r(e,r,a){return t.apply(this,arguments)}return r}(),u._fetchFeaturesForStats=function(e){return y.getFieldsList({field:e.field,normalizationField:e.normalizationField,valueExpression:e.valueExpression}).then((t=>this.getSampleFeatures({sampleSize:-1,view:e.view,returnGeometry:e.returnGeometry,requiredFields:t,signal:e.signal})))},u._generateFeatureSetForCachedHistogram=function(e,t=e.minimum,a=e.maximum,s){const i=[];for(let r=0;r<s;r++)i[r]=0;const n=e.counts.length,o=e.minimum,l=e.maximum;for(let r=0;r<n;r++){const u=(r+.5)/n,c=((1-u)*o+u*l-t)/(a-t)*s;c>=0&&c<=s&&(i[c===s?s-1:Math.floor(c)]+=e.counts[r])}const u=[];i.forEach(((e,t)=>{const a=new r({attributes:{}});a.attributes.EXPR_1=t+1,a.attributes.countOFExpr=e,u.push(a)}));const c=new h;return c.features=u,c},u._getCachedStatistics=function(e,t){const r=this.layer;return e.valueExpression||e.sqlExpression||e.sqlWhere||e.minValue||e.maxValue?Promise.reject(new s("scene-layer-adapter:not-supported","This Layer does not support calculating statistics when 'valueExpression', 'sqlExpression', 'sqlWhere', 'minValue' or 'maxValue' is specified")):r.queryCachedStatistics(t&&t.name,{signal:e.signal}).then((e=>{const t=e.stats,{min:r,max:a,totalValuesCount:s}=t;let{avg:i,stddev:n,sum:o,variance:l,count:u}=t;return 0===r&&0===a||(i=0===i?null:i,o=0===o?null:o,n=0===n?null:n,l=0===l?null:l,u=0===u?null:u),null==u&&(null!=o&&null!=i?u=Math.round(o/i):null!=s&&(u=s)),{avg:i,count:u,max:a,min:r,stddev:n,sum:o,variance:l}}))},u._getSummaryStatisticsFromMemory=function(){var t=e._asyncToGenerator((function*(e,t){const r={field:e.field,valueExpression:e.valueExpression,normalizationField:e.normalizationField,view:e.view,signal:e.signal},a=e.features?e.features:yield this._fetchFeaturesForStats(r);if(!(a&&a.length))throw new s("scene-layer-adapter:insufficient-data","No features are available to calculate statistics");const i=m.isDateField(t),n={...e};if("percent-of-total"===n.normalizationType){const e=(yield _.calculateStatsFromMemory({field:n.field},a)).sum;if(null==e)throw new s("scene-layer-adapter:invalid","invalid normalizationTotal");n.normalizationTotal=e}const o=yield _.calculateStatsFromMemory(n,a,i);return _.processSummaryStatisticsResult(o)}));function r(e,r){return t.apply(this,arguments)}return r}(),u._getCachedStatisticsForUniqueValues=function(e,t){const a=this.layer,i=t&&t.name,n=t&&this.getFieldDomain(e.field);return e.valueExpression||e.sqlExpression||e.sqlWhere?Promise.reject(new s("scene-layer-adapter:not-supported","This Layer does not support calculating statistics when 'valueExpression', 'sqlExpression' or 'sqlWhere' is specified")):a.queryCachedStatistics(i,{signal:e.signal}).then((s=>{const n=s.stats;if(!n.mostFrequentValues)return Promise.reject();const o=s.labels&&s.labels.labels,l={},u=[],c="countOF"+i;n.mostFrequentValues.forEach((e=>{const s=new r({attributes:{}});s.attributes[i]=t&&t.name!==a.objectIdField&&(m.isNumericField(t)||m.isDateField(t))?Number(e.value):e.value,s.attributes[c]=e.count,u.push(s)})),o&&o.forEach((e=>{l[e.value]=e.label}));const d=new h;return d.features=u,_.getUniqueValuesFromFeatureSet(d,this,e.field,l,e.signal)})).then((t=>_.createUVResult(t,n,e.returnAllCodedValues)))},u._getUniqueValuesFromMemory=function(e,t){const r=t&&this.getFieldDomain(e.field),a={field:e.field,valueExpression:e.valueExpression,view:e.view,signal:e.signal};return(e.features?Promise.resolve(e.features):this._fetchFeaturesForStats(a)).then((t=>_.calculateUniqueValuesFromMemory(e,t,r)))},u._getCachedStatisticsForHistogram=function(e,t){const r=this.layer;return e.valueExpression||e.sqlExpression||e.sqlWhere||e.normalizationType?Promise.reject(new s("scene-layer-adapter:not-supported","This Layer does not support calculating statistics when 'valueExpression' or 'sqlExpression' or 'sqlWhere' or 'normalizationType' is specified")):r.queryCachedStatistics(t&&t.name,{signal:e.signal}).then((t=>{const r=t.stats,{minValue:a,maxValue:s}=e,i=null!=a?a:r.min,n=null!=s?s:r.max,o=e.numBins||10,l=this._generateFeatureSetForCachedHistogram(r.histogram,i,n,o);return _.getHistogramFromFeatureSet(l,i,n,o)}))},u._getClassBreaksFromMemory=function(){var t=e._asyncToGenerator((function*(e){const t={field:e.field,valueExpression:e.valueExpression,normalizationField:e.normalizationField,view:e.view,signal:e.signal},r=e.features?e.features:yield this._fetchFeaturesForStats(t);if(!(r&&r.length))throw new s("scene-layer-adapter:insufficient-data","No features are available to calculate statistics");const a={...e};if("percent-of-total"===a.normalizationType){const e=(yield _.calculateStatsFromMemory({field:a.field},r)).sum;if(null==e)throw new s("scene-layer-adapter:invalid","invalid normalizationTotal");a.normalizationTotal=e}return _.calculateClassBreaksFromMemory(a,r)}));function r(e){return t.apply(this,arguments)}return r}(),u._getHistogramFromMemory=function(e){const t={field:e.field,valueExpression:e.valueExpression,normalizationField:e.normalizationField,view:e.view,signal:e.signal};return(e.features?Promise.resolve(e.features):this._fetchFeaturesForStats(t)).then((t=>{if(!(t&&t.length))throw new s("scene-layer-adapter:insufficient-data","No features are available to calculate histogram");const{field:r,normalizationType:a,valueExpression:i,classificationMethod:n,minValue:o,maxValue:l,view:u}=e;let c=null;if((!n||"equal-interval"===n)&&!a)c=null!=o&&null!=l?Promise.resolve({min:o,max:l}):this.summaryStatistics({field:r,valueExpression:i,features:t,view:u,signal:e.signal}).then((e=>e.count?{min:e.min,max:e.max}:Promise.reject(new s("feature-layer-adapter:insufficient-data","No features are available to calculate histogram"))));else{const r={...e};r.features=t,c=this._getBinParamsFromMemory(r)}return c.then((r=>_.calculateHistogramFromMemory(e,r,t)))}))},u._getBinParamsFromMemory=function(){var t=e._asyncToGenerator((function*(e){const{field:t,valueExpression:r,classificationMethod:a,standardDeviationInterval:s,normalizationType:i,normalizationField:n,minValue:o,maxValue:l,features:u,view:c}=e;return this._getClassBreaksFromMemory({field:t,valueExpression:r,normalizationType:i,normalizationField:n,classificationMethod:a,standardDeviationInterval:s,minValue:o,maxValue:l,numClasses:e.numBins,features:u,view:c}).then((e=>{const r=e.normalizationTotal,a=e.classBreakInfos,s=f.getSQLFilterForNormalization({field:t,normalizationType:i,normalizationField:n});return _.generateBinParams({field:t,normalizationType:i,normalizationField:n,normalizationTotal:r,classBreaks:a,where:s,layer:this})}))}));function r(e){return t.apply(this,arguments)}return r}(),u.getField=function(e=""){return this.layer.getField(e)},u.getFieldUsageInfo=function(e){const t=this.getField(e);if(!t)return null;const r=this.layer.getFieldUsageInfo(t.name);return{supportsLabelingInfo:r.supportsLabelingInfo,supportsPopupTemplate:r.supportsPopupTemplate,supportsRenderer:r.supportsRenderer,supportsLayerQuery:r.supportsLayerQuery,supportsStatistics:!0}},u.getFieldDomain=function(e,t){return this._featureLayerAdapter?this._featureLayerAdapter.getFieldDomain(e,t):null},u.summaryStatistics=function(e){const t=this.getField(e.field);return this._featureLayerAdapter?this._featureLayerAdapter.summaryStatistics(e):this._hasCachedStatistics(t&&t.name)?this._getCachedStatistics(e,t).catch((()=>(n.throwIfAborted(e.signal),this._getSummaryStatisticsFromMemory(e,t)))):this._getSummaryStatisticsFromMemory(e,t)},u.uniqueValues=function(e){const t=this.getField(e.field);return this._featureLayerAdapter?this._featureLayerAdapter.uniqueValues(e):this._hasCachedStatistics(t&&t.name)?this._getCachedStatisticsForUniqueValues(e,t).catch((()=>(n.throwIfAborted(e.signal),this._getUniqueValuesFromMemory(e,t)))):this._getUniqueValuesFromMemory(e,t)},u.histogram=function(e){const t=this.getField(e.field);return this._featureLayerAdapter?this._featureLayerAdapter.histogram(e):this._hasCachedStatistics(t&&t.name)?this._getCachedStatisticsForHistogram(e,t).catch((()=>(n.throwIfAborted(e.signal),this._getHistogramFromMemory(e)))):this._getHistogramFromMemory(e)},u.classBreaks=function(e){const t=this.getField(e.field);return this._featureLayerAdapter?this._featureLayerAdapter.classBreaks(e):this._hasCachedStatistics(t&&t.name)?Promise.reject(new s("scene-layer-adapter:not-supported","Cached stats not supported")):this._getClassBreaksFromMemory(e)},u.queryFeatureCount=function(e,t){return this._featureLayerAdapter?this._featureLayerAdapter.queryFeatureCount(e,t):Promise.reject(new s("scene-layer-adapter:not-supported","SceneLayer without associated FeatureLayer does not support count query"))},u.generateRenderer=function(e,t){return this._featureLayerAdapter?this._featureLayerAdapter.generateRenderer(e,t):Promise.reject(new s("scene-layer-adapter:not-supported","SceneLayer without associated FeatureLayer does not support generateRenderer operation"))},u.heatmapStatistics=function(e){return this._featureLayerAdapter?this._featureLayerAdapter.heatmapStatistics(e):Promise.reject(new s("scene-layer-adapter:not-supported","SceneLayer without associated FeatureLayer does not support heatmapStatistics operation"))},u.predominantCategories=function(){var t=e._asyncToGenerator((function*(e){if(this._featureLayerAdapter)return this._featureLayerAdapter.predominantCategories(e);throw new s("scene-layer-adapter:not-supported","SceneLayer without associated FeatureLayer does not support predominantCategories")}));function r(e){return t.apply(this,arguments)}return r}(),u.getSampleFeatures=function(){var t=e._asyncToGenerator((function*(e,t){const{view:r,sampleSize:s,requiredFields:i,returnGeometry:o,signal:l}=e,u=1,c="json"===t,d=this.layer.createQuery();d.outFields=i,d.returnGeometry=!!o,d.where=null,d.num=s;let p=[];try{if(p=c?yield this._fetchFeaturesJSONFromMemory(r,d,i):yield this._fetchFeaturesFromMemory(r,d,i),p.length&&s>0&&s<=p.length)return a.pickRandom(p,s,u)}catch(h){n.throwIfAborted(l)}let m=null;if(this._featureLayerAdapter){const r={...e};delete r.view,m=yield this._featureLayerAdapter.getSampleFeatures(r,t)}return m&&m.length?m:a.pickRandom(p,p.length,u)}));function r(e,r){return t.apply(this,arguments)}return r}(),u.load=function(e){const t=this.layer.load(e).then((t=>{const r=t.associatedLayer;if(this.geometryType=t.geometryType,i.isSome(r)){this._featureLayerAdapter=new g({layer:r});return this._featureLayerAdapter.load(e).then((()=>{this.objectIdField=this._featureLayerAdapter.objectIdField,this.supportsSQLExpression=this._featureLayerAdapter.supportsSQLExpression,this.minScale=this._featureLayerAdapter.minScale,this.maxScale=this._featureLayerAdapter.maxScale,this.fullExtent=this._featureLayerAdapter.fullExtent}))}this.objectIdField=t.objectIdField,this.supportsSQLExpression=!1,this.hasQueryEngine=!1,this.fullExtent=t.fullExtent}));return this.addResolvingPromise(t),Promise.resolve(this)},l}(F);return t.__decorate([l.property({constructOnly:!0})],v.prototype,"layer",void 0),v=t.__decorate([p.subclass("esri.smartMapping.support.adapters.SceneLayerAdapter")],v),v}));