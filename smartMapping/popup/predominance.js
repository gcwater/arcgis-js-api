/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../chunks/_rollupPluginBabelHelpers","../../PopupTemplate","../../core/Error","../../intl/messages","../../intl/substitute","../../popup/ExpressionInfo","../../popup/FieldInfo","./support/utils","../statistics/support/predominanceUtils"],(function(e,n,t,o,i,r,s,f,a,l){"use strict";function p(e,n){return e.legendOptions&&e.legendOptions.title?e.legendOptions.title:n.competingFields}function d(e,n){return{fieldInfo:new f({fieldName:"expression/predominant-category"}),expressionInfo:new s({name:"predominant-category",title:n.predominantCategory,expression:l.getArcadeForPredominantCategoryAlias(e)})}}function m(e,n){const t=e.map((e=>e.fieldName));return{fieldInfo:new f({fieldName:"expression/predominant-value",format:{digitSeparator:!0,places:1}}),expressionInfo:new s({name:"predominant-value",title:n.predominantCategoryValue,expression:l.getArcadeForPredominantCategoryValue(t),returnType:"number"})}}function u(e,n){const t=e.map((e=>e.fieldName));return{fieldInfo:new f({fieldName:"expression/predominant-margin",format:{digitSeparator:!0,places:0}}),expressionInfo:new s({name:"predominant-margin",title:n.marginOfVictory,expression:l.getArcadeForPredominanceMargin(t),returnType:"number"})}}function I(e,n){const t=e.map((e=>e.fieldName));return{fieldInfo:new f({fieldName:"expression/predominant-strength",format:{digitSeparator:!0,places:0}}),expressionInfo:new s({name:"predominant-strength",title:n.strengthOfPredominance,expression:l.getArcadeForStrengthOfPredominance(t),returnType:"number"})}}function c(e,n){return{fieldInfo:new f({fieldName:"expression/predominant-categories-list"}),expressionInfo:new s({name:"predominant-categories-list",title:n.listOfCategories,expression:l.getArcadeForOrderedFields(e)})}}function g(e,n){const t=e.map((e=>e.fieldName));return{fieldInfo:new f({fieldName:"expression/predominant-total",format:{digitSeparator:!0,places:0}}),expressionInfo:new s({name:"predominant-total",title:n.sumOfCategories,expression:l.getArcadeForSumOfFields(t),returnType:"number"})}}function x(e,n){const o=d(e.fieldInfos,n),i=new t({expressionInfos:[o.expressionInfo],fieldInfos:[o.fieldInfo],content:r.substitute(n.predominantCategoryContent,{expression:`<b>{${o.fieldInfo.fieldName}}</b>`})});return{name:"predominant-category",title:n.predominantCategory,value:i}}function y(e,n){const{fieldInfos:o}=e,i=d(o,n),s=m(o,n),f=new t({expressionInfos:[s.expressionInfo,i.expressionInfo],fieldInfos:[s.fieldInfo,i.fieldInfo],content:r.substitute(n.predominantCategoryValueContent,{expression1:`<b>{${i.fieldInfo.fieldName}}</b>`,expression2:`<b>{${s.fieldInfo.fieldName}}</b>`})});return{name:"predominant-category-value",title:n.predominantCategoryValue,value:f}}function b(e,n){const{fieldInfos:o}=e,i=d(o,n),s=m(o,n),f=u(o,n),a=new t({expressionInfos:[s.expressionInfo,i.expressionInfo,f.expressionInfo],fieldInfos:[s.fieldInfo,i.fieldInfo,f.fieldInfo],title:r.substitute(n.mostCommon,{expression:"{expression/predominant-category}"}),content:r.substitute(n.predominantCategoryValueMarginContent,{expression1:`<b>{${i.fieldInfo.fieldName}}</b>`,expression2:`<b>{${s.fieldInfo.fieldName}}</b>`,expression3:`<b>{${f.fieldInfo.fieldName}}</b>`})});return{name:"predominant-category-value-margin",title:n.marginOfVictory,value:a}}function h(e,n){const{fieldInfos:o}=e,i=d(o,n),s=m(o,n),f=I(o,n),a=new t({expressionInfos:[s.expressionInfo,i.expressionInfo,f.expressionInfo],fieldInfos:[s.fieldInfo,i.fieldInfo,f.fieldInfo],content:r.substitute(n.predominantCategoryStrengthContent,{expression1:`{${s.fieldInfo.fieldName}}`,expression2:`<b>{${i.fieldInfo.fieldName}}</b>`,expression3:`<b>{${f.fieldInfo.fieldName}}%</b>`})});return{name:"predominant-category-strength",title:n.strengthOfPredominance,value:a}}function N(e,n){const{renderer:o,fieldInfos:i}=e,s=d(i,n),f=m(i,n),a=I(i,n),l=c(i,n),u=new t({expressionInfos:[s.expressionInfo,f.expressionInfo,a.expressionInfo,l.expressionInfo],fieldInfos:[s.fieldInfo,f.fieldInfo,a.fieldInfo,l.fieldInfo],title:p(o,n),content:[{type:"text",text:r.substitute(n.predominantCategoryStrengthContent,{expression1:`{${f.fieldInfo.fieldName}}`,expression2:`<b>{${s.fieldInfo.fieldName}}</b>`,expression3:`<b>{${a.fieldInfo.fieldName}}%</b>`})},{type:"text",text:`{${l.fieldInfo.fieldName}}`}]});return{name:"predominant-categories-list",title:n.orderedListOfValues,value:u}}function C(e,n){const{fieldInfos:o}=e,i=d(o,n),s=m(o,n),f=I(o,n),a=g(o,n),l=new t({expressionInfos:[s.expressionInfo,i.expressionInfo,a.expressionInfo,f.expressionInfo],fieldInfos:[s.fieldInfo,i.fieldInfo,a.fieldInfo,f.fieldInfo],content:r.substitute(n.predominantCategoryTotalStrengthContent,{expression1:`{${s.fieldInfo.fieldName}}`,expression2:`<b>{${i.fieldInfo.fieldName}}</b>`,expression3:`<b>{${f.fieldInfo.fieldName}}%</b>`,expression4:`{${a.fieldInfo.fieldName}}`})});return{name:"predominant-category-total-strength",title:n.predominantCategoryWithTotalAndStrength,value:l}}function w(e,n){const{renderer:o,fieldInfos:i}=e,s=d(i,n),f=m(i,n),a=I(i,n),l=new t({expressionInfos:[f.expressionInfo,s.expressionInfo,a.expressionInfo],fieldInfos:[f.fieldInfo,s.fieldInfo,a.fieldInfo],title:p(o,n),content:[{type:"text",text:r.substitute(n.predominantCategoryStrengthContent,{expression1:`{${f.fieldInfo.fieldName}}`,expression2:`<b>{${s.fieldInfo.fieldName}}</b>`,expression3:`<b>{${a.fieldInfo.fieldName}}%</b>`})},{type:"media",mediaInfos:{type:"pie-chart",value:{fields:i.map((e=>e.fieldName))}}}]});return{name:"predominant-category-chart",title:n.predominantCategoryWithChart,value:l}}function $(e,n){const t=e.authoringInfo,i="predominance"===t.type?t.fields:[];if(!i||!i.length)throw new o("predominance-popup:insufficient-info","unable to find input fields in authoringInfo");return i.map((e=>a.getFieldInfo(n,e)))}function v(e){return O.apply(this,arguments)}function O(){return(O=n._asyncToGenerator((function*(e){const{layer:n,renderer:t}=e;yield n.load();const i=t||n.renderer;if("unique-value"!==i.type)throw new o("predmoinance-popup:invalid-parameters","renderer.type must be 'unique-value'");return{renderer:i,fieldInfos:$(i,n)}}))).apply(this,arguments)}function T(e){return F.apply(this,arguments)}function F(){return(F=n._asyncToGenerator((function*(e){const[n,t]=yield Promise.all([v(e),i.fetchMessageBundle("esri/smartMapping/t9n/smartMapping")]);return[x(n,t),y(n,t),b(n,t),C(n,t),N(n,t),h(n,t),w(n,t)]}))).apply(this,arguments)}function P(e){return S.apply(this,arguments)}function S(){return(S=n._asyncToGenerator((function*(e){const[n,t]=yield Promise.all([v(e),i.fetchMessageBundle("esri/smartMapping/t9n/smartMapping")]),o=N(n,t),r=yield T(e);return{primaryTemplate:o,secondaryTemplates:r.filter((e=>e.name!==o.name))}}))).apply(this,arguments)}e.getAllTemplates=T,e.getTemplates=P,Object.defineProperty(e,"__esModule",{value:!0})}));