/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../chunks/_rollupPluginBabelHelpers","../chunks/tslib.es6","../Color","../request","../core/Error","../core/lang","../core/Logger","../core/LRUCache","../core/maybe","../core/promiseUtils","../core/string","../core/accessorSupport/decorators/property","../core/accessorSupport/ensureType","../core/has","../core/accessorSupport/decorators/subclass","../core/accessorSupport/decorators/writer","../layers/support/fieldUtils","./Renderer","./mixins/VisualVariablesMixin","../support/arcadeOnDemand","../symbols/CIMSymbol"],(function(e,t,r,i,s,o,n,l,a,c,u,p,y,f,h,d,m,g,b,_,S){"use strict";var v;const x=n.getLogger("esri.renderers.DictionaryRenderer"),w={type:"CIMSimpleLineCallout",lineSymbol:{type:"CIMLineSymbol",symbolLayers:[{type:"CIMSolidStroke",width:.5,color:[0,0,0,255]}]}};let M=v=function(t){function n(e){var r;return(r=t.call(this,e)||this)._ongoingRequests=new Map,r._symbolCache=new l(100),r.config=null,r.fieldMap=null,r.scaleExpression=null,r.scaleExpressionTitle=null,r.url=null,r.type="dictionary",r}e._inheritsLoose(n,t);var p=n.prototype;return p.writeData=function(e,t){e&&(t.scalingExpressionInfo={expression:e,returnType:"number"})},p.writeVisualVariables=function(e,r,i,s){null!=s&&s.origin||t.prototype.writeVisualVariables.call(this,e,r,i,s)},p.clone=function(){return new v({config:o.clone(this.config),scaleExpression:this.scaleExpression,scaleExpressionTitle:this.scaleExpressionTitle,fieldMap:o.clone(this.fieldMap),url:o.clone(this.url),visualVariables:o.clone(this.visualVariables)})},p.getSymbolAsync=function(){var t=e._asyncToGenerator((function*(e,t){let i;this._dictionaryPromise||(this._dictionaryPromise=this.fetchResources(t));try{i=yield this._dictionaryPromise}catch(m){if(c.isAbortError(m))return this._dictionaryPromise=null,null}const s={};if(this.fieldMap)for(const r of this._symbolFields){const t=this.fieldMap[r];if(t&&null!==e.attributes[t]&&void 0!==e.attributes[t]){const i=""+e.attributes[t];s[r]=i}else s[r]=""}const o=i(s,t);if(!o||"string"!=typeof o)return null;const n=u.numericHash(o).toString(),l=this._symbolCache.get(n);if(l)return l.catch((()=>{this._symbolCache.pop(n)})),l;const p=o.split(";"),y=[],f=[];for(const a of p)if(a&&0!==a.length)if(-1===a.indexOf("po:"))if(-1!==a.indexOf("|"))for(const e of a.split("|"))this._itemNames.has(e)&&y.push(e);else this._itemNames.has(a)&&y.push(a);else{const e=a.substr(3).split("|");if(3===e.length){const t=e[0],i=e[1];let s=e[2];if("DashTemplate"===i)s=s.split(" ").map((e=>Number(e)));else if("Color"===i){const e=new r(s).toRgba();s=[e[0],e[1],e[2],255*e[3]]}else s=Number(s);f.push({primitiveName:t,propertyName:i,value:s})}}const h=!a.isSome(e.geometry)||!e.geometry.hasZ&&"point"===e.geometry.type,d=this._cimPartsToCIMSymbol(y,f,h,t);return this._symbolCache.put(n,d,1),d}));function i(e,r){return t.apply(this,arguments)}return i}(),p.collectRequiredFields=function(){var t=e._asyncToGenerator((function*(e,t){yield this.collectVVRequiredFields(e,t),this.scaleExpression&&(yield m.collectArcadeFieldNames(e,t,this.scaleExpression));for(const r in this.fieldMap){const i=this.fieldMap[r];t.has(i)&&e.add(i)}}));function r(e,r){return t.apply(this,arguments)}return r}(),p.fetchResources=function(){var t=e._asyncToGenerator((function*(e){if(this._dictionaryPromise)return this._dictionaryPromise;if(!this.url)return void x.error("no valid URL!");const t=a.isSome(e)?e.abortOptions:null,r=i(this.url+"/resources/styles/dictionary-info.json",{responseType:"json",query:{f:"json"},...t}),[{data:o}]=yield Promise.all([r,_.loadArcade()]);if(!o)throw this._dictionaryPromise=null,new s("esri.renderers.DictionaryRenderer","Bad dictionary data!");const n=o.expression,l=o.authoringInfo;this._refSymbolUrlTemplate=this.url+"/"+o.cimRefTemplateUrl,this._itemNames=new Set(o.itemsNames),this._symbolFields=l.symbol;const c={};if(this.config){const e=this.config;for(const t in e)c[t]=e[t]}if(l.configuration)for(const i of l.configuration)c.hasOwnProperty(i.name)||(c[i.name]=i.value);const u=[];if(a.isSome(e)&&e.fields&&this.fieldMap)for(const i of this._symbolFields){const t=this.fieldMap[i],r=e.fields.filter((e=>e.name===t));r.length>0&&u.push({...r[0],name:i})}return this._dictionaryPromise=_.createDictionaryExpression(n,a.isSome(e)?e.spatialReference:null,u,c).then((e=>{const t={scale:0};return(r,i)=>{const s=e.repurposeFeature({geometry:null,attributes:r});return t.scale=a.isSome(i)?i.scale:void 0,e.evaluate({$feature:s,$view:t})}})).catch((e=>(x.error("Creating dictinoary expression failed:",e),null))),this._dictionaryPromise}));function r(e){return t.apply(this,arguments)}return r}(),p.getSymbol=function(){return null},p.getSymbols=function(){return[]},p.getAttributeHash=function(){return this.visualVariables&&this.visualVariables.reduce(((e,t)=>e+t.getAttributeHash()),"")},p.getMeshHash=function(){return`${this.url}-${JSON.stringify(this.fieldMap)}`},p.getSymbolFields=function(){return this._symbolFields},p._getSymbolPart=function(){var t=e._asyncToGenerator((function*(e,t){if(this._ongoingRequests.has(e))return this._ongoingRequests.get(e).then((e=>e.data));const r=this._refSymbolUrlTemplate.replace(/\{itemName\}/gi,e),s=i(r,{responseType:"json",query:{f:"json"},...t});this._ongoingRequests.set(e,s);try{return(yield s).data}catch(o){return this._ongoingRequests.delete(e),Promise.reject(o)}}));function r(e,r){return t.apply(this,arguments)}return r}(),p._combineSymbolParts=function(e,t,r){if(!e||0===e.length)return null;const i={...e[0]};if(e.length>1){i.symbolLayers=[];for(const t of e){const e=t;i.symbolLayers.unshift(...e.symbolLayers)}}return r&&(i.callout=w),{type:"CIMSymbolReference",symbol:i,primitiveOverrides:t}},p._cimPartsToCIMSymbol=function(){var t=e._asyncToGenerator((function*(e,t,r,i){const s=new Array(e.length);for(let n=0;n<e.length;n++)s[n]=this._getSymbolPart(e[n],i);const o=yield Promise.all(s);return new S({data:this._combineSymbolParts(o,t,r)})}));function r(e,r,i,s){return t.apply(this,arguments)}return r}(),e._createClass(n,[{key:"arcadeRequired",get:function(){return!0}}]),n}(b.VisualVariablesMixin(g));return t.__decorate([p.property({type:Object,json:{read:{source:"configuration"},write:{target:"configuration"}}})],M.prototype,"config",void 0),t.__decorate([p.property({type:Object,json:{write:!0}})],M.prototype,"fieldMap",void 0),t.__decorate([p.property({type:String,json:{read:{source:"scalingExpressionInfo.expression"},write:!0}})],M.prototype,"scaleExpression",void 0),t.__decorate([d.writer("scaleExpression")],M.prototype,"writeData",null),t.__decorate([p.property({type:String,json:{read:{source:"scalingExpressionInfo.title"},write:{target:"scalingExpressionInfo.title",overridePolicy(e){return{enabled:!!e&&!!this.scaleExpression}}}}})],M.prototype,"scaleExpressionTitle",void 0),t.__decorate([p.property({type:String,json:{write:!0}})],M.prototype,"url",void 0),t.__decorate([d.writer("visualVariables")],M.prototype,"writeVisualVariables",null),M=v=t.__decorate([h.subclass("esri.renderers.DictionaryRenderer")],M),M}));