/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../core/Error","../../../core/maybe","../../../layers/support/fieldUtils"],(function(e,t,n,l){"use strict";function i(e){const t=null!=e.normalizationField||null!=e.normalizationType,n=null!=e.minValue||null!=e.maxValue,l=!!e.sqlExpression&&e.supportsSQLExpression;return!t&&!n&&!l}function r(e){const{values:t,supportsNullCount:n}=e,l=t.filter((e=>null!=e)).length,i={count:l};return n&&(i.nullcount=t.length-l),i}function u(e){const{values:t,useSampleStdDev:n,supportsNullCount:l}=e;let i=Number.POSITIVE_INFINITY,r=Number.NEGATIVE_INFINITY,u=null,o=null,s=null,a=null,c=0;const f=null==e.minValue?-1/0:e.minValue,d=null==e.maxValue?1/0:e.maxValue;for(const p of t)Number.isFinite(p)?p>=f&&p<=d&&(u+=p,i=Math.min(i,p),r=Math.max(r,p),c++):"string"==typeof p&&c++;if(c&&null!=u){o=u/c;let e=0;for(const n of t)Number.isFinite(n)&&n>=f&&n<=d&&(e+=(n-o)**2);a=n?c>1?e/(c-1):0:c>0?e/c:0,s=Math.sqrt(a)}else i=null,r=null;const m={avg:o,count:c,max:r,min:i,stddev:s,sum:u,variance:a};return l&&(m.nullcount=t.length-c),m}function o(e,t){return t?(["avg","stddev","variance"].forEach((t=>{null!=e[t]&&(e[t]=Math.ceil(e[t]))})),e):e}function s(e,t,n,l){let i=null;switch(t){case"log":0!==e&&(i=Math.log(e)*Math.LOG10E);break;case"percent-of-total":Number.isFinite(l)&&0!==l&&(i=e/l*100);break;case"field":Number.isFinite(n)&&0!==n&&(i=e/n);break;case"natural-log":e>0&&(i=Math.log(e));break;case"square-root":e>0&&(i=e**.5)}return i}function a(e){const t=e.field,n=e.normalizationType,l=e.normalizationField;let i;return"log"===n?i="(NOT "+t+" = 0)":"field"===n?i="(NOT "+l+" = 0)":"natural-log"!==n&&"square-root"!==n||(i=`(${t} > 0)`),i}function c(e,n){return new t(e,n)}function f(e,t,n){const l=null!=t?e+" >= "+t:"",i=null!=n?e+" <= "+n:"";let r="";return r=l&&i?p(l,i):l||i,r?"("+r+")":""}function d(e,t,n,l){let i=null;return t?t.name!==e.objectIdField&&-1!==l.indexOf(t.type)||(i=c(n,"'field' should be one of these types: "+l.join(","))):i=c(n,"'field' is not defined in the layer schema"),i}function m(e,t,n){let i;return t?t.name!==e.objectIdField&&l.isNumericField(t)||(i=c(n,"'field' should be one of these numeric types: "+l.numericTypes.join(","))):i=c(n,"'field' is not defined in the layer schema"),i}function p(e,t){let l=n.isSome(e)?e:"";return n.isSome(t)&&t&&(l=l?"("+l+") AND ("+t+")":t),l}function h(e,t,n){const l=g({layer:e,fields:t});if(l.length)return c(n,"Unknown fields: "+l.join(", ")+". You can only use fields defined in the layer schema");const i=y({layer:e,fields:t});return i.length?c(n,"Unsupported fields: "+i.join(", ")+". You can only use fields that can be fetched i.e. AdapterFieldUsageInfo.supportsStatistics must be true"):void 0}function g(e){const t=e.layer;return e.fields.filter((e=>!t.getField(e)))}function y(e){const t=e.layer;return e.fields.filter((e=>{const n=t.getFieldUsageInfo(e);return!n||!n.supportsStatistics}))}e.calculateStatistics=u,e.calculateStringStatistics=r,e.createError=c,e.getNormalizedValue=s,e.getRangeExpr=f,e.getSQLFilterForNormalization=a,e.isNullCountSupported=i,e.mergeWhereClauses=p,e.processStatsResult=o,e.verifyBasicFieldValidity=h,e.verifyFieldType=d,e.verifyNumericField=m,Object.defineProperty(e,"__esModule",{value:!0})}));