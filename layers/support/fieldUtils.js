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

define(["require","exports","tslib","@dojo/framework/shim/array","../../core/Error","../../core/maybe","../../core/object","../../core/promiseUtils","../../core/SetUtils","./domains","../../support/arcadeOnDemand","@dojo/framework/shim/Promise"],(function(e,n,i,r,t,a,l,o,u,s,d){function c(e,n,i){if(e)for(var r=0,t=e;r<t.length;r++){var a=t[r],o=l.getDeepValue(a,n),u=o&&"function"!=typeof o&&v(i,o);u&&l.setDeepValue(a,u.name,n)}}Object.defineProperty(n,"__esModule",{value:!0}),n.rendererFields=["field","field2","field3","normalizationField","rotationInfo.field","proportionalSymbolInfo.field","proportionalSymbolInfo.normalizationField","colorInfo.field","colorInfo.normalizationField"],n.visualVariableFields=["field","normalizationField"],n.fixRendererFields=function(e,i){if(null!=e&&null!=i)for(var r=0,t=Array.isArray(e)?e:[e];r<t.length;r++){var a=t[r];if(c(n.rendererFields,a,i),"visualVariables"in a&&a.visualVariables)for(var l=0,o=a.visualVariables;l<o.length;l++){var u=o[l];c(n.visualVariableFields,u,i)}}},n.fixTimeInfoFields=function(e,n){if(null!=e&&null!=n)if("startField"in e){var i=v(n,e.startField),r=v(n,e.endField);e.startField=i&&i.name||null,e.endField=r&&r.name||null}else{var t=v(n,e.startTimeField),a=v(n,e.endTimeField);e.startTimeField=t&&t.name||null,e.endTimeField=a&&a.name||null}};var f=new Set;function g(e,n){return e&&n?(f.clear(),m(f,e,n),u.valuesOfSet(f).sort()):[]}function m(e,n,i){if(i)if(n&&n.length)if(r.includes(i,"*"))for(var t=0,a=n;t<a.length;t++){var l=a[t].name;e.add(l)}else for(var o=0,u=i;o<u.length;o++){F(e,n,c=u[o])}else{if(r.includes(i,"*"))return e.clear(),void e.add("*");for(var s=0,d=i;s<d.length;s++){var c=d[s];e.add(c)}}}function F(e,n,i){if(n&&n.length){var r=v(n,i);r&&e.add(r.name)}else"string"==typeof i&&e.add(i)}function v(e,n){if("string"!=typeof n)return null;if(null!=e){n=n.toLowerCase();for(var i=0,r=e;i<r.length;i++){var t=r[i];if(t&&t.name.toLowerCase()===n)return t}}return null}function p(e,n,r){return i.__awaiter(this,void 0,void 0,(function(){var t,a,l,o,u;return i.__generator(this,(function(i){switch(i.label){case 0:return r?[4,d.loadArcade()]:[2];case 1:for(t=i.sent().arcadeUtils,a=t.extractFieldNames(r),l=0,o=a;l<o.length;l++)u=o[l],F(e,n,u);return[2]}}))}))}function h(e,n){for(var i=0,r=e;i<r.length;i++){var t=r[i];if(t&&t.valueType&&t.valueType===n)return t.name}return null}function y(e,n){return i.__awaiter(this,void 0,void 0,(function(){var r,t;return i.__generator(this,(function(i){return n?(r=n.fields,(t=l.getDeepValue("elevationInfo.featureExpressionInfo",n))?[2,t.collectRequiredFields(e,r)]:[2]):[2]}))}))}function _(e,n){return i.__awaiter(this,void 0,void 0,(function(){var r,t;return i.__generator(this,(function(a){switch(a.label){case 0:return r=n.labelingInfo,t=n.fields,r&&r.length?[4,o.all(r.map((function(n){return function(e,n,r){return i.__awaiter(this,void 0,void 0,(function(){var t,a,l,o,u;return i.__generator(this,(function(i){switch(i.label){case 0:return r?(t=r.getLabelExpression(),a=r.where,"arcade"!==t.type?[3,2]:[4,p(e,n,t.expression)]):[2];case 1:return i.sent(),[3,3];case 2:(l=t.expression.match(/{[^}]*}/g))&&l.forEach((function(i){F(e,n,i.slice(1,-1))})),i.label=3;case 3:return o=/['"]+/g,a&&(3===(u=a.split(" ")).length&&F(e,n,u[0].replace(o,"")),7===u.length&&(F(e,n,u[0].replace(o,"")),F(e,n,u[4].replace(o,"")))),[2]}}))}))}(e,t,n)})))]:[2];case 1:return a.sent(),[2]}}))}))}function b(e){return"number"==typeof e&&!isNaN(e)&&isFinite(e)}function I(e){return null===e||b(e)}n.fixFields=g,n.collectFields=m,n.collectField=F,n.unpackFieldNames=function(e,n){return n&&e?r.includes(n,"*")?e.map((function(e){return e.name})):n:[]},n.packFields=function(e,n,i){if(void 0===i&&(i=1),!n||!e)return[];if(r.includes(n,"*"))return["*"];var t=g(e,n);return t.length/e.length>=i?["*"]:t},n.getField=v,n.hasField=function(e,n){if(!e||!n||"string"!=typeof n)return!1;n=n.toLowerCase();for(var i=0,r=e;i<r.length;i++){var t=r[i];if(t&&t.name.toLowerCase()===n)return!0}return!1},n.collectArcadeFieldNames=p,n.getDisplayFieldName=function(e){var n=e.displayField,i=e.fields;return n||(i&&i.length?h(i,"name-or-title")||h(i,"unique-identifier")||h(i,"type-or-category")||function(e){for(var n=0,i=e;n<i.length;n++){var r=i[n];if(r&&r.name){var t=r.name.toLowerCase();if(t.indexOf("name")>-1||t.indexOf("title")>-1)return r.name}}return null}(i):null)},n.getElevationFields=function(e){return i.__awaiter(this,void 0,void 0,(function(){var n;return i.__generator(this,(function(i){switch(i.label){case 0:return e?[4,y(n=new Set,e)]:[2,[]];case 1:return i.sent(),[2,u.valuesOfSet(n).sort()]}}))}))},n.collectElevationFields=y,n.collectFeatureReductionFields=function(e,n,r){return i.__awaiter(this,void 0,void 0,(function(){return i.__generator(this,(function(t){switch(t.label){case 0:return n&&r&&"cluster"===r.type&&r.fields?[4,o.all(r.fields.map((function(r){return function(e,n,r){return i.__awaiter(this,void 0,void 0,(function(){return i.__generator(this,(function(i){return r.outStatistic.onStatisticValueExpression?p(e,n,r.outStatistic.onStatisticValueExpression):e.add(r.outStatistic.onStatisticField),[2]}))}))}(e,n.fields,r)})))]:[2];case 1:return t.sent(),[2]}}))}))},n.collectFilterFields=function(n,r,a){return i.__awaiter(this,void 0,void 0,(function(){var l,o;return i.__generator(this,(function(i){switch(i.label){case 0:return r&&a&&(a.where&&"1=1"!==a.where||a.timeExtent)?(r.timeInfo&&a.timeExtent&&m(n,r.fields,[r.timeInfo.startField,r.timeInfo.endField]),a.where?[4,new Promise((function(n,i){e(["../../core/sql/WhereClause"],n,i)}))]:[3,2]):[2];case 1:if(l=i.sent(),!(o=l.WhereClause.create(a.where,r.fieldsIndex)).isStandardized)throw new t("fieldUtils:collectFilterFields","Where clause is not standardized");m(n,r.fields,o.fieldNames),i.label=2;case 2:return[2]}}))}))},n.getTimeFields=function(e){return i.__awaiter(this,void 0,void 0,(function(){var n;return i.__generator(this,(function(i){return e&&(n="timeInfo"in e&&e.timeInfo)?[2,g(e.fields,[e.trackIdField,n.startField,n.endField])]:[2,[]]}))}))},n.getFeatureEditFields=function(e){if(!e)return[];var n="editFieldsInfo"in e&&e.editFieldsInfo;return n?g(e.fields,[n&&n.creatorField,n&&n.creationDateField,n&&n.editorField,n&&n.editDateField]):[]},n.getFeatureGeometryFields=function(e){if(!e)return[];var n="geometryProperties"in e&&e.geometryProperties;return n?g(e.fields,[n&&n.shapeAreaFieldName,n&&n.shapeLengthFieldName]):[]},n.getLabelingFields=function(e){return i.__awaiter(this,void 0,void 0,(function(){var n;return i.__generator(this,(function(i){switch(i.label){case 0:return e?[4,_(n=new Set,e)]:[2,[]];case 1:return i.sent(),[2,u.valuesOfSet(n).sort()]}}))}))},n.collectLabelingFields=_,n.getFieldDefaultValue=function(e){var n=e.defaultValue;return void 0!==n&&E(e,n)?n:e.nullable?null:void 0};var T="isInteger"in Number?Number.isInteger:function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e};function w(e){return null===e||T(e)}function V(e){return null!=e&&"string"==typeof e}function S(e){return null===e||V(e)}function N(){return!0}function E(e,n){var i;switch(e.type){case"date":case"integer":case"long":case"small-integer":case"esriFieldTypeDate":case"esriFieldTypeInteger":case"esriFieldTypeLong":case"esriFieldTypeSmallInteger":i=e.nullable?w:T;break;case"double":case"single":case"esriFieldTypeSingle":case"esriFieldTypeDouble":i=e.nullable?I:b;break;case"string":case"esriFieldTypeString":i=e.nullable?S:V;break;default:i=N}return 1===arguments.length?i:i(n)}n.isValueMatchingFieldType=E,n.numericTypes=["integer","small-integer","single","double"];var x,R,D=u.SetFromValues(i.__spreadArrays(n.numericTypes,["esriFieldTypeInteger","esriFieldTypeSmallInteger","esriFieldTypeSingle","esriFieldTypeDouble"]));function A(e){return null!=e&&D.has(e.type)}function O(e,n){return e.nullable&&null===n?null:A(e)&&!L(e.type,Number(n))?x.OUT_OF_RANGE:E(e,n)?e.domain?s.validateDomainValue(e.domain,n):null:R.INVALID_TYPE}function L(e,n){var i="string"==typeof e?U(e):e;return!!i&&(i.isInteger?T(n)&&n>=i.min&&n<=i.max:n>=i.min&&n<=i.max)}function U(e){switch(e){case"esriFieldTypeSmallInteger":case"small-integer":return n.smallIntegerRange;case"esriFieldTypeInteger":case"integer":return n.integerRange;case"esriFieldTypeSingle":case"single":return n.singleRange;case"esriFieldTypeDouble":case"double":return n.doubleRange}}function k(e,n,i){if(!n||!n.attributes||!e){if(a.isSome(i))for(var r=0,t=e;r<t.length;r++){var l=t[r];i.add(l)}return!0}for(var o=n.attributes,u=!1,s=0,d=e;s<d.length;s++){if(!((l=d[s])in o)){if(u=!0,!a.isSome(i))break;i.add(l)}}return u}n.isNumericField=A,n.isStringField=function(e){return null!=e&&("string"===e.type||"esriFieldTypeString"===e.type)},n.isDateField=function(e){return null!=e&&("date"===e.type||"esriFieldTypeDate"===e.type)},n.isValidFieldValue=function(e,n){return null===O(e,n)},function(e){e.OUT_OF_RANGE="numeric-range-validation-error::out-of-range"}(x=n.NumericRangeValidationError||(n.NumericRangeValidationError={})),function(e){e.INVALID_TYPE="type-validation-error::invalid-type"}(R=n.TypeValidationError||(n.TypeValidationError={})),n.sanitizeNullFieldValue=function(e){return null==e||"number"==typeof e&&isNaN(e)?null:e},n.validateFieldValue=O,n.isNumberInRange=L,n.getFieldRange=function(e){var n=s.getDomainRange(e.domain);return n||(A(e)?U(e.type):void 0)},n.getNumericTypeForValue=function(e){if(!b(e))return null;if(T(e)){if(e>=n.smallIntegerRange.min&&e<=n.smallIntegerRange.max)return"esriFieldTypeSmallInteger";if(e>=n.integerRange.min&&e<=n.integerRange.max)return"esriFieldTypeInteger"}return e>=n.singleRange.min&&e<=n.singleRange.max?"esriFieldTypeSingle":"esriFieldTypeDouble"},n.smallIntegerRange={min:-32768,max:32767,isInteger:!0},n.integerRange={min:-2147483648,max:2147483647,isInteger:!0},n.singleRange={min:-34e37,max:12e37,isInteger:!1},n.doubleRange={min:-Number.MAX_VALUE,max:Number.MAX_VALUE,isInteger:!1},n.validationErrorToString=function(e,n,i){switch(e){case s.DomainValidationError.INVALID_CODED_VALUE:return"Value "+i+" is not in the coded domain - field: "+n.name+", domain: "+JSON.stringify(n.domain);case s.DomainValidationError.VALUE_OUT_OF_RANGE:return"Value "+i+" is out of the range of valid values - field: "+n.name+", domain: "+JSON.stringify(n.domain);case R.INVALID_TYPE:return"Value "+i+" is not a valid value for the field type - field: "+n.name+", type: "+n.type+", nullable: "+n.nullable;case x.OUT_OF_RANGE:var r=U(n.type),t=r.min,a=r.max;return"Value "+i+" is out of range for the number type - field: "+n.name+", type: "+n.type+", value range is "+t+" to "+a}},n.featureHasFields=function(e,n){return!k(e,n,null)},n.populateMissingFields=k,n.getExpressionFields=function(e,n){return i.__awaiter(this,void 0,void 0,(function(){var r,t,a,l;return i.__generator(this,(function(i){switch(i.label){case 0:r=new Set,t=0,a=n,i.label=1;case 1:return t<a.length?(l=a[t],[4,p(r,e.fields,l)]):[3,4];case 2:i.sent(),i.label=3;case 3:return t++,[3,1];case 4:return[2,u.valuesOfSet(r).sort()]}}))}))}}));