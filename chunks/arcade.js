/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["require","exports","../arcade/arcadeCompiler","../arcade/arcadeRuntime","./languageUtils","../arcade/parser","../arcade/treeAnalysis","../core/has","../core/promiseUtils","../intl/moment"],(function(e,t,n,r,c,i,s,u,o,a){"use strict";const l=["feature","angle","bearing","centroid","envelopeintersects","extent","geometry","isselfintersecting","ringisclockwise"];function p(){if(u("csp-restrictions"))return!1;try{return new Function("function* test() {}; return true")()}catch(e){return!1}}const f=p();let d=!1,S=!1,m=null,y=[];function b(e,t){if(!0===t.useAsync||!0===e.isAsync)return h(e,t);if(u("csp-restrictions")){return function(t){return r.executeScript(e,t)}}return n.compileScript(e,t)}function h(e,t){if(null===m)throw new Error("Async Arcade must be enabled for this script");if(u("csp-restrictions")||!1===f){return function(t){return m.executeScript(e,t)}}return n.compileScript(e,t,!0)}function x(e){r.extend(e),n.extend(e,"sync"),null===m?y.push(e):(n.extend(e,"async"),m.extend(e))}function A(e,t=[]){return i.parseScript(e,t)}function g(e,t,n=""){return i.validateScript(e,t,n)}function F(e,t,n,r=""){return i.scriptCheck(e,t,n,r)}function w(e,t,n=[]){return E(i.parseScript(e,n),t)}function E(e,t){if(!0===t.useAsync||!0===e.isAsync){if(null===m)throw new Error("Async Arcade must be enabled for this script");return m.executeScript(e,t)}return r.executeScript(e,t)}function G(e,t){return r.referencesMember(e,t)}function U(e,t){return r.referencesFunction(e,t)}function v(e,t=!1){return i.extractFieldLiterals(e)}function P(e,t=[]){return void 0===e.usesGeometry&&s.findScriptDependencies(e,t),!0===e.usesGeometry}let M=null;function k(){return M||(M=o.all([new Promise((function(t,n){e(["../geometry/geometryEngine"],t,n)})),new Promise((function(t,n){e(["../arcade/functions/geomsync"],t,n)}))]).then((([e,t])=>(S=!0,t.setGeometryEngine(e),!0))),M)}let C=null;function D(){return null!==C||(C=n.enableAsyncSupport().then((()=>new Promise((function(t,n){e(["../arcade/arcadeAsyncRuntime"],t,n)})))).then((e=>{m=e;for(const t of y)m.extend(t),n.extend(t,"async");return y=null,!0}))),C}function L(){return d}function _(){return!!m}function I(){return S}let O=null;function R(){return O||(O=D().then((()=>o.all([new Promise((function(t,n){e(["../arcade/featureSetUtils"],t,n)})),new Promise((function(t,n){e(["../arcade/functions/featuresetbase"],t,n)})),new Promise((function(t,n){e(["../arcade/functions/featuresetgeom"],t,n)})),new Promise((function(t,n){e(["../arcade/functions/featuresetstats"],t,n)})),new Promise((function(t,n){e(["../arcade/functions/featuresetstring"],t,n)}))]).then((([e,t,r,c,i])=>(H=e,m.extend([t,r,c,i]),n.extend([t,r,c,i],"async"),d=!0,!0))))),O)}function T(e,t=[]){return void 0===e.usesFeatureSet&&s.findScriptDependencies(e,t),!0===e.usesFeatureSet}function j(e,t=[]){return void 0===e.isAsync&&s.findScriptDependencies(e,t),!0===e.isAsync}function q(e,t){if(t){for(const n of t)if(G(e,n))return!0;return!1}return!1}function z(e,t,n=[],r=!1){return o.create(((c,i)=>{const s="string"==typeof e?A(e):e,u=[];u.push(K()),s&&(!1===I()&&(P(s)||r)&&u.push(k()),!1===_()&&(!0===s.isAsync||t)&&u.push(D()),!1===L()&&(T(s)||q(s,n))&&u.push(R())),u?o.all(u).then((()=>{c(!0)}),i):c(!0)}))}function B(e){if(P(e))return!0;const t=s.findFunctionCalls(e);let n=!1;for(let r=0;r<t.length;r++)if(l.indexOf(t[r])>-1){n=!0;break}return n}let H=null;function J(){return H}function K(){return null!==N||(N=a.loadMoment().then((e=>(c.MomentLibrary.Moment=e,!0)))),N}let N=null;var Q=Object.freeze({__proto__:null,compileScript:b,extend:x,parseScript:A,validateScript:g,scriptCheck:F,parseAndExecuteScript:w,executeScript:E,referencesMember:G,referencesFunction:U,extractFieldLiterals:v,scriptUsesGeometryEngine:P,enableGeometrySupport:k,enableAsyncSupport:D,isFeatureSetSupportEnabled:L,isAsyncEnabled:_,isGeometryEnabled:I,enableFeatureSetSupport:R,scriptUsesFeatureSet:T,scriptIsAsync:j,loadScriptDependencies:z,scriptTouchesGeometry:B,featureSetUtils:J,load:K});t.arcade=Q,t.compileScript=b,t.enableAsyncSupport=D,t.enableFeatureSetSupport=R,t.enableGeometrySupport=k,t.executeScript=E,t.extend=x,t.extractFieldLiterals=v,t.featureSetUtils=J,t.isAsyncEnabled=_,t.isFeatureSetSupportEnabled=L,t.isGeometryEnabled=I,t.load=K,t.loadScriptDependencies=z,t.parseAndExecuteScript=w,t.parseScript=A,t.referencesFunction=U,t.referencesMember=G,t.scriptCheck=F,t.scriptIsAsync=j,t.scriptTouchesGeometry=B,t.scriptUsesFeatureSet=T,t.scriptUsesGeometryEngine=P,t.validateScript=g}));