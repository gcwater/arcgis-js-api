/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../chunks/_rollupPluginBabelHelpers","../../Basemap","../../Ground","../../WebScene","../../core/has","../../core/accessorSupport/ensureType","../../core/accessorSupport/extensions/serializableProperty/type","../../layers/GroupLayer","../../layers/KMLLayer","../../layers/mixins/operationalLayerModuleMap","../../layers/mixins/operationalLayers","../../layers/support/Sublayer","../../layers/support/source/DataLayerSource","../../layers/support/source/MapLayerSource","./utils"],(function(e,t,n,r,a,y,p,o,s,u,i,l,c,f,m,d){"use strict";function b(e){return h.apply(this,arguments)}function h(){return(h=t._asyncToGenerator((function*(e){return x(null,{typeName:"json",type:e},new d.ScanContext)}))).apply(this,arguments)}function g(e,t,n){return N.apply(this,arguments)}function N(){return(N=t._asyncToGenerator((function*(e,t,n){switch(t.typeName){case"array":yield k(e,t,n);break;case"union":yield M(e,t,n);break;case"json":yield x(e,t,n);break;case"native":yield v(e,t,n);break;case"enum":yield _(e,t,n)}}))).apply(this,arguments)}function v(e,t,n){return T.apply(this,arguments)}function T(){return(T=t._asyncToGenerator((function*(e,t,n){n.addProperty({name:e,type:E(t),default:t.default})}))).apply(this,arguments)}function S(e){const t=e.slice();return t.sort(),t}function _(e,t,n){return w.apply(this,arguments)}function w(){return(w=t._asyncToGenerator((function*(e,t,n){const r=t.values.slice();t.nullable&&r.push(null),n.currentClass&&n.currentClass.typeValue&&"type"===e?n.addProperty({name:e,type:"string",enum:`"${n.currentClass.typeValue}"`}):n.addProperty({name:e,type:E(t),enum:S(r).map((e=>"string"==typeof e?`"${e}"`:`${e}`)).join("|"),default:t.default})}))).apply(this,arguments)}function k(e,t,n){return j.apply(this,arguments)}function j(){return(j=t._asyncToGenerator((function*(e,t,n){yield g(`${e}[]`,t.elementType,n)}))).apply(this,arguments)}function L(e,t){if("json"===e.typeName){const t=e.type.__accessorMetadata__,n=t&&t.properties&&t.properties&&t.properties.type,r=n&&ee(n),a=r&&r.type,y=a||n&&n.type;if(y&&Array.isArray(y)&&1===y.length&&"string"==typeof y[0])return a?y[0]:Q(n,y[0])}return t}function M(e,t,n){return P.apply(this,arguments)}function P(){return(P=t._asyncToGenerator((function*(e,t,n){const r=[];for(const a of t.types)if("native"!==a.type.typeName&&t.key){const t=`${e}<${L(a.type,a.value)}>`;yield g(t,a.type,n)}else r.push(a.type);if(r.length){const a=r.map(E);t.nullable&&a.push("null"),a.sort(),n.addProperty({type:a.join("|"),name:e,default:t.default})}}))).apply(this,arguments)}function C(e,t){return G.apply(this,arguments)}function G(){return(G=t._asyncToGenerator((function*(e,t){return e.type===a&&"layers"===t?V("web-scene/operational-layers"):e.type!==n||"baseLayers"!==t&&"baseMapLayers"!==t?e.type===n&&"elevationLayers"===t||e.type===r&&"layers"===t?V("web-scene/ground"):e.type===s&&"layers"===t?V("web-scene/operational-layers",(e=>e!==s)):e.type!==f.JoinTableDataSource||"leftTableSource"!==t&&"rightTableSource"!==t?"definitionExpression"===t&&-1!==["esri.layers.SceneLayer","esri.layers.FeatureLayer","esri.layers.ImageryLayer","esri.layers.support.Sublayer","esri.layers.buildingSublayers.BuildingComponentSublayer","esri.layers.CSVLayer"].indexOf(e.type.prototype.declaredClass)?{typeName:"union",key:"type",nullable:!0,types:[{type:{typeName:"native",type:String},value:"string"}]}:null:K({key:"type",base:null,typeMap:{"data-layer":f.DataLayerSource,"map-layer":m.MapLayerSource}}):V("web-scene/basemap")}))).apply(this,arguments)}function O(e,t,n){return $.apply(this,arguments)}function $(){return($=t._asyncToGenerator((function*(e,t,n){const r=yield C(e,t);return r||H(n)}))).apply(this,arguments)}function A(e){return e.prototype.declaredClass.replace(/\./g,"/")}function x(e,t,n){return I.apply(this,arguments)}function I(){return(I=t._asyncToGenerator((function*(e,t,n){const r=t.type.__accessorMetadata__,a=A(t.type),y=r&&r.properties;if(!y)return e&&n.addProperty({name:e,type:"unknown"}),null;let p=a,o=null;const s=e&&e.match(/<([^>]+)>$/);s&&(p+=`--${s[1]}`,o=s[1]),t.type===c&&(p+=`--${n.currentClass.name}`,o=n.currentClass.name);const u=n.seen.get(p);if(u&&e)return n.addProperty({name:e,type:u}),u;const i={type:t.type,name:a,id:p,properties:[]};e&&(n.addProperty({name:e,type:i}),i.typeValue=o),n.push(e,i);for(const l in y){const e=y[l],r=te(e);if(!r||!r.enabled)continue;if(t.type===c){const e="esri/layers/TileLayer"===n.stack[n.stack.length-2].klass.name;if(e&&c.test.isMapImageLayerOverridePolicy(r.overridePolicy)||!e&&c.test.isTileImageLayerOverridePolicy(r.overridePolicy))continue}const a=r.target;if("string"==typeof a||null==a){const r=yield O(t,l,e);if(!r)continue;yield g("string"==typeof a?a:l,r,n)}else yield B(t,a,n)}return n.pop()}))).apply(this,arguments)}function B(e,t,n){return J.apply(this,arguments)}function J(){return(J=t._asyncToGenerator((function*(e,t,n){for(const r in t){let a=yield C(e,r);if(!a){const e=t[r];a=e.types?K(e.types):U(e.type),a.default=e.default,a=z(a)}yield g(r,a,n)}}))).apply(this,arguments)}function V(e,t){return D.apply(this,arguments)}function D(){return(D=t._asyncToGenerator((function*(e,t){const n={typeName:"union",key:"layerType",types:[]};for(const r in l.supportedTypes[e]){if("web-scene/operational-layers"===e&&"ArcGISTiledElevationServiceLayer"===r)continue;const a=yield i.typeModuleMap[r]();a&&(t&&!t(a)||a!==u&&n.types.push({type:{typeName:"json",type:a},value:r}))}if(0===n.types.length)return null;return{typeName:"array",elementType:1===n.types.length?n.types[0].type:n}}))).apply(this,arguments)}function E(e){switch(e.typeName){case"array":return`${E(e.elementType)}[]`;case"union":{const t=e.types.map((e=>E(e.type)));return e.nullable&&t.push("null"),t.sort(),`${t.join(" | ")}`}case"native":switch(e.type){case Number:return"number";case p.Integer:return"integer";case String:return"string";case Boolean:return"boolean";case Object:return"object";default:return"unknown"}case"json":return e.type.prototype.declaredClass;case"enum":return"string";default:return}}function F(e){const t=e.prototype.itemType&&e.prototype.itemType.Type;if(!t)return{typeName:"array",elementType:{typeName:"native",type:null}};if("function"==typeof t)return{typeName:"array",elementType:U(t)};if(t.typeMap){const e=[];for(const n in t.typeMap){const r=t.typeMap[n];e.push({type:U(r),value:Z(r)?null:n})}return{typeName:"array",elementType:{typeName:"union",key:"string"==typeof t.key?t.key:"type",types:e}}}}function W(e){if("json"!==e.typeName)return null;const t=e.type.__accessorMetadata__,n=t&&t.properties&&t.properties.type,r=n&&ee(n),a=r&&r.type,y=a||n&&n.type;return y&&Array.isArray(y)&&"string"==typeof y[0]?a||n.type.map((e=>Q(n,e))):null}function z(e){if("array"===e.typeName)return e.elementType=z(e.elementType),e;const t=W(e);return t?{typeName:"union",key:"type",types:t.map((t=>({value:t,type:e})))}:e}function H(e){const t=ee(e);return t.types?K(t.types):!t.type&&e.types?K(e.types):z(R(e))}function K(e){if(Array.isArray(e))return{typeName:"array",elementType:K(e[0])};const t=[];for(const n in e.typeMap){const r=e.typeMap[n];t.push({type:U(r),value:Z(r)?null:n})}return{typeName:"union",key:"string"==typeof e.key?e.key:"type",types:t}}function q(e){return null!=e&&e.isJSONMapWriter}function Q(e,t){const n=te(e);if(q(n.writer)){const e={value:""};return n.writer(t,e,"value"),e.value}return t}function R(e){const t=ee(e),n=te(e),r=U(t&&t.type||e.type);return t&&void 0!==t.default&&"function"!=typeof t.default&&(r.default=Q(e,t.default)),n.allowNull&&(r.nullable=!0),r}function U(e){return e?p.isLongFormType(e)?X(e):Array.isArray(e)?"string"==typeof e[0]||"number"==typeof e[0]?{typeName:"enum",values:e}:e.length>1?{typeName:"union",key:null,types:e.map((e=>({type:U(e),value:null})))}:{typeName:"array",elementType:U(e[0])}:o.isCollection(e)?F(e):Z(e)?{typeName:"native",type:e}:Y(e)?{typeName:"json",type:e}:{typeName:"native",type:null}:{typeName:"native",type:null}}function X(e){switch(e.type){case"native":return{typeName:"native",type:e.value};case"array":return{typeName:"array",elementType:U(e.value)};case"one-of":return{typeName:"union",key:null,types:e.values.map((e=>({type:X(e),value:null})))};default:return}}function Y(e){let t=e;for(;t;){if(t.prototype&&("esri.core.JSONSupport"===t.prototype.declaredClass||"esri.core.MultiOriginJSONSupport"===t.prototype.declaredClass))return!0;t=Object.getPrototypeOf(t)}return!1}function Z(e){return e===String||e===Boolean||e===Number||e===p.Integer||e===Object}function ee(e){if(!e.json)return null;const t=e.json.origins,n=e.json,r=t&&t["web-scene"],a=t&&t["web-document"];return r||a||n||null}function te(e){if(!e.json)return null;const t=e.json.origins,n=e.json.write,r=t&&t["web-scene"]&&t["web-scene"].write,a=t&&t["web-document"]&&t["web-document"].write;return r||a||n||null}e.scan=b,Object.defineProperty(e,"__esModule",{value:!0})}));