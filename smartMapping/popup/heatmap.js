/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../chunks/_rollupPluginBabelHelpers","../../PopupTemplate","../../core/Error","../../intl/messages","./support/utils"],(function(e,r,n,t,a,l){"use strict";function s(e){return i.apply(this,arguments)}function i(){return(i=r._asyncToGenerator((function*(e){const{layer:r,renderer:n}=e;yield r.load();const a=n||r.renderer;if("heatmap"!==a.type)throw new t("heatmap-popup:invalid-parameters","renderer.type must be 'heatmap'");return{layer:r,renderer:a}}))).apply(this,arguments)}function o(e){return p.apply(this,arguments)}function p(){return(p=r._asyncToGenerator((function*(e){const[{renderer:r,layer:t},i]=yield Promise.all([s(e),a.fetchMessageBundle("esri/smartMapping/t9n/smartMapping")]);if(!r.field)return null;const{fieldInfos:o}=yield l.getFieldAndExpressionInfos({renderer:r,layer:t}),p=new n({content:yield l.getContentFromFieldInfos(t,{fieldInfos:o}),fieldInfos:o});return{primaryTemplate:{name:"heatmap",title:i.heatmap,value:p},secondaryTemplates:[]}}))).apply(this,arguments)}e.getTemplates=o,Object.defineProperty(e,"__esModule",{value:!0})}));