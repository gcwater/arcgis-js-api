/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../chunks/_rollupPluginBabelHelpers","../../core/Error","../../core/maybe","../../intl/messages","../../renderers/support/AuthoringInfo","../../renderers/support/AuthoringInfoVisualVariable","../../renderers/support/numberUtils","../../renderers/visualVariables/OpacityVariable","../heuristics/outline","./size","./type","./support/utils","../statistics/predominantCategories","../statistics/summaryStatistics","../statistics/support/predominanceUtils","../support/adapters/support/layerUtils","../../chunks/predominance"],(function(e,i,a,n,r,l,s,t,o,p,u,m,d,y,c,b,f,h){"use strict";function g(e){return v.apply(this,arguments)}function v(){return(v=i._asyncToGenerator((function*(e){if(!(e&&e.layer&&e.view&&e.fields&&e.fields.length))throw new a("predominance-renderer:missing-parameters","'layer', 'view' and 'fields' parameters are required");if(e.fields.length<2)throw new a("predominance-renderer:invalid-parameters","Minimum 2 fields are required");if(e.fields.length>10)throw new a("predominance-renderer:invalid-parameters","Maximum 10 fields are supported");const i={...e};i.symbolType=i.symbolType||"2d",i.defaultSymbolEnabled=null==i.defaultSymbolEnabled||i.defaultSymbolEnabled,i.includeOpacityVariable=e.includeOpacityVariable||!1,i.includeSizeVariable=e.includeSizeVariable||!1,i.sortBy=null==i.sortBy?"count":i.sortBy;const r=[0,2,1,3,5],l=f.createLayerAdapter(i.layer,r);if(i.layer=l,!l)throw new a("predominance-renderer:invalid-parameters","'layer' must be one of these types: "+f.getLayerTypeLabels(r).join(", "));const s=n.isSome(i.signal)?{signal:i.signal}:null;yield l.load(s);const t=l.geometryType,o=i.symbolType.indexOf("3d")>-1;if(i.outlineOptimizationEnabled="polygon"===t&&i.outlineOptimizationEnabled,i.includeSizeVariable||(i.sizeOptimizationEnabled=("point"===t||"multipoint"===t||"polyline"===t)&&i.sizeOptimizationEnabled),"mesh"===t)i.symbolType="3d-volumetric",i.colorMixMode=i.colorMixMode||"replace",i.edgesType=i.edgesType||"none",i.sizeOptimizationEnabled=!1;else{if(o&&("polyline"===t||"polygon"===t))throw new a("predominance-renderer:not-supported","3d symbols are not supported for polyline and polygon layers");if(i.symbolType.indexOf("3d-volumetric")>-1&&(!i.view||"3d"!==i.view.type))throw new a("predominance-renderer:invalid-parameters","'view' parameter should be an instance of SceneView when 'symbolType' parameter is '3d-volumetric' or '3d-volumetric-uniform'")}const p=i.fields.map((e=>e.name)),u=d.verifyBasicFieldValidity(l,p,"predominance-renderer:invalid-parameters");if(u)throw u;return i}))).apply(this,arguments)}function w(e){return S.apply(this,arguments)}function S(){return(S=i._asyncToGenerator((function*(e){let i=e.predominanceScheme,a=null,r=null;const l=yield d.getBasemapInfo(e.basemap,e.view);if(a=n.isSome(l.basemapId)?l.basemapId:null,r=n.isSome(l.basemapTheme)?l.basemapTheme:null,i)return{scheme:h.cloneScheme(i),basemapId:a,basemapTheme:r};const s=h.getSchemes({basemap:a,basemapTheme:r,geometryType:e.geometryType,numColors:e.numColors,theme:e.theme,worldScale:e.worldScale,view:e.view});return s&&(i=s.primaryScheme,a=s.basemapId,r=s.basemapTheme),{scheme:i,basemapId:a,basemapTheme:r}}))).apply(this,arguments)}function T(e,i,a,n){return V.apply(this,arguments)}function V(){return(V=i._asyncToGenerator((function*(e,i,a,n){const s=yield r.fetchMessageBundle("esri/smartMapping/t9n/smartMapping"),t=e.layer,o={layer:e.layer,view:e.view,signal:e.signal},[u,c]=yield Promise.all([y({layer:t,fields:n,view:e.view,signal:e.signal}),e.outlineOptimizationEnabled?p(o):null]);let b=u;u&&u.predominantCategoryInfos||(b={predominantCategoryInfos:n.map((e=>({value:e,count:0})))});const f=c&&c.opacity,h=yield m.createRenderer({layer:t,basemap:e.basemap,valueExpression:i.valueExpression,valueExpressionTitle:s.predominantCategory,numTypes:-1,defaultSymbolEnabled:e.defaultSymbolEnabled,sortBy:e.sortBy,typeScheme:a,statistics:{uniqueValueInfos:b.predominantCategoryInfos},legendOptions:e.legendOptions,outlineOptimizationEnabled:!1,sizeOptimizationEnabled:(!e.includeSizeVariable||!e.sizeOptimizationEnabled)&&e.sizeOptimizationEnabled,symbolType:e.symbolType,colorMixMode:e.colorMixMode,edgesType:e.edgesType,view:e.view,signal:e.signal}),{renderer:g,basemapId:v,basemapTheme:w,uniqueValueInfos:S,excludedUniqueValueInfos:T}=h,V=g.uniqueValueInfos,z={};for(const r of e.fields){const e=t.getField(r.name);z[e.name]=r.label||e&&e.alias||r.name}if(V.forEach(((e,i)=>{const a=z[e.value];e.label=a,S[i].label=a})),e.includeSizeVariable){let i=t.geometryType,n=null;if("polygon"===i){const r=a.sizeScheme,l=r.background;g.backgroundFillSymbol=d.createSymbol(i,{type:e.symbolType,color:l.color,outline:d.getSymbolOutlineFromScheme(l,i,f)}),n=r.marker.size,i="point"}else if("polyline"===i){n=a.width}else{n=a.size}const r=d.createColors(a.colors,V.length);V.forEach(((l,s)=>{const t=d.createSymbol(i,{type:e.symbolType,color:r[s],size:n,outline:d.getSymbolOutlineFromScheme(a,i,f),meshInfo:{colorMixMode:e.colorMixMode,edgesType:e.edgesType}});l.symbol=t,S[s].symbol=t.clone()}))}return c&&c.visualVariables&&c.visualVariables.length&&(g.visualVariables=c.visualVariables.map((e=>e.clone()))),g.authoringInfo=new l({type:"predominance",fields:[...n]}),{renderer:g,predominantCategoryInfos:S,excludedCategoryInfos:T,predominanceScheme:a,basemapId:v,basemapTheme:w}}))).apply(this,arguments)}function z(e,i,a){return E.apply(this,arguments)}function E(){return(E=i._asyncToGenerator((function*(e,i,a){const n=yield r.fetchMessageBundle("esri/smartMapping/t9n/smartMapping");return u.createVisualVariables({layer:e.layer,basemap:e.basemap,valueExpression:i.valueExpression,sqlExpression:i.statisticsQuery.sqlExpression,sqlWhere:i.statisticsQuery.sqlWhere,sizeScheme:a,sizeOptimizationEnabled:e.sizeOptimizationEnabled,worldScale:e.symbolType.indexOf("3d-volumetric")>-1,legendOptions:{title:n.sumOfCategories},view:e.view,signal:e.signal})}))).apply(this,arguments)}function x(e,i){return O.apply(this,arguments)}function O(){return(O=i._asyncToGenerator((function*(e,i){const a=yield r.fetchMessageBundle("esri/smartMapping/t9n/smartMapping"),n=yield c({layer:e.layer,valueExpression:i.valueExpression,sqlExpression:i.statisticsQuery.sqlExpression,sqlWhere:i.statisticsQuery.sqlWhere,view:e.view,signal:e.signal}),p=null==n.avg||null==n.stddev,u=1/e.fields.length*100;let m=p?100:n.avg+1.285*n.stddev;m>100&&(m=100);const d=t.round([u,m],{strictBounds:!0}),y=new o({valueExpression:i.valueExpression,stops:[{value:d[0],opacity:.15},{value:d[1],opacity:1}],legendOptions:{title:a.strengthOfPredominance}}),b=new s({type:"opacity",minSliderValue:n.min,maxSliderValue:n.max});return{visualVariable:y,statistics:n,defaultValuesUsed:p,authoringInfo:new l({visualVariables:[b]})}}))).apply(this,arguments)}function I(e){return M.apply(this,arguments)}function M(){return(M=i._asyncToGenerator((function*(e){const i=yield g(e),a=i.layer,n=(yield w({basemap:i.basemap,geometryType:a.geometryType,numColors:i.fields.length,predominanceScheme:i.predominanceScheme,worldScale:i.symbolType.indexOf("3d-volumetric")>-1,view:i.view})).scheme,r=i.fields.map((e=>e.name)),l=b.getPredominanceExpressions(a,r),s=T(i,l.predominantCategory,n,r),t=i.includeSizeVariable?z(i,l.size,n.sizeScheme):null,o=i.includeOpacityVariable?x(i,l.opacity):null,[p,u,m]=yield Promise.all([s,t,o]),d=[],y=[];if(u&&(Array.prototype.push.apply(d,u.visualVariables.map((e=>e.clone()))),delete u.sizeScheme,p.size=u,Array.prototype.push.apply(y,u.authoringInfo.visualVariables.map((e=>e.clone())))),m&&(d.push(m.visualVariable.clone()),p.opacity=m,Array.prototype.push.apply(y,m.authoringInfo.visualVariables.map((e=>e.clone())))),d.length){const e=p.renderer.visualVariables||[];Array.prototype.push.apply(e,d),p.renderer.visualVariables=e,p.renderer.authoringInfo.visualVariables=y}return p}))).apply(this,arguments)}e.createRenderer=I,Object.defineProperty(e,"__esModule",{value:!0})}));