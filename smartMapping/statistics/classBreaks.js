/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../core/Error","../../core/maybe","./support/utils","../support/utils","../support/adapters/support/layerUtils"],(function(e,a,i,s,r,l){"use strict";const n=5;function t(e){return o.apply(this,arguments)}function o(){return(o=e._asyncToGenerator((function*(e){if(!e||!e.layer||!e.field&&!e.valueExpression)throw new a("class-breaks:missing-parameters","'layer' and 'field' or 'valueExpression' parameters are required");if(e.valueExpression&&!e.view)throw new a("class-breaks:missing-parameters","View is required when 'valueExpression' is specified");const t=[0,2,1,3,5],{layer:o,...u}=e,p=l.createLayerAdapter(o,t),m={layerAdapter:p,...u};if(m.normalizationType=r.getNormalizationType(m),m.numClasses=m.numClasses||n,!p)throw new a("class-breaks:invalid-parameters","'layer' must be one of these types: "+l.getLayerTypeLabels(t).join(", "));const d=i.isSome(m.signal)?{signal:m.signal}:null;yield p.load(d);const c=m.field,f=m.minValue,y=m.maxValue,h=null!=f||null!=y,w=m.classificationMethod,v="percent-of-total"===m.normalizationType,z=!1!==m.analyzeData,b=c?p.getField(c):null,g=yield r.getFieldsList({field:m.field,normalizationField:m.normalizationField,valueExpression:m.valueExpression}),k=s.verifyBasicFieldValidity(p,g,"class-breaks:invalid-parameters");if(k)throw k;if(b){const e=s.verifyNumericField(p,b,"class-breaks:invalid-parameters");if(e)throw e}if(m.valueExpression&&m.normalizationType)throw new a("class-breaks:invalid-parameters","Normalization is not allowed when 'valueExpression' is specified");if(h)if(z){if(v&&null==m.normalizationTotal)throw new a("class-breaks:missing-parameters","'normalizationTotal' is required when 'normalizationType' is 'precent-of-total' and 'minValue', 'maxValue' are specified")}else{if(null==f||null==y)throw new a("class-breaks:missing-parameters","Both 'minValue' and 'maxValue' are required when 'analyzeData' is false");if(f>=y)throw new a("class-breaks:invalid-parameters","'minValue' should be less than 'maxValue'");if(w&&"equal-interval"!==w)throw new a("class-breaks:invalid-parameters","'classificationMethod' other than 'equal-interval' is not allowed when 'analyzeData' is false");if(v&&null==m.normalizationTotal)throw new a("class-breaks:missing-parameters","'normalizationTotal' is required when 'normalizationType' is 'precent-of-total' and 'analyzeData' is false")}else if(!z)throw new a("class-breaks:missing-parameters","Both 'minValue' and 'maxValue' are required when 'analyzeData' is false");return m}))).apply(this,arguments)}function u(e){return p.apply(this,arguments)}function p(){return(p=e._asyncToGenerator((function*(e){const{layerAdapter:a,...i}=yield t(e);return a.classBreaks(i)}))).apply(this,arguments)}return u}));