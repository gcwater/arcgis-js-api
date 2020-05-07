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
// See http://js.arcgis.com/4.15/esri/copyright.txt for details.

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","dojo/i18n!../nls/common","dojo/i18n!./Expand/nls/Expand","../core/accessorSupport/decorators","./Widget","./Expand/ExpandViewModel","./support/widget"],(function(e,t,o,n,s,r,i,a,d,p){var l="esri-expand esri-widget",c="esri-expand--auto",x="esri-expand--drawer",u="esri-expand--floating",v="esri-expand__container",h="esri-expand__container--expanded",_="esri-expand__panel",y="esri-widget--button",b="esri-icon-font-fallback-text",g="esri-collapse__icon",f="esri-expand__icon--expanded",w="esri-expand__icon-number",m="esri-expand__icon-number--expanded",C="esri-icon-expand",M="esri-icon-collapse",T="esri-expand__content",I="esri-expand__content--expanded",O="esri-expand__mask",k="esri-expand__mask--expanded";return function(e){function t(t){var o=e.call(this,t)||this;return o.autoCollapse=null,o.collapseTooltip="",o.content="",o.expanded=null,o.expandTooltip="",o.group=null,o.iconNumber=0,o.label=r.widgetLabel,o.mode="auto",o.view=null,o.viewModel=new d,o}return o(t,e),Object.defineProperty(t.prototype,"collapseIconClass",{get:function(){return M},set:function(e){e?this._override("collapseIconClass",e):this._clearOverride("collapseIconClass")},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"expandIconClass",{get:function(){return p.isWidget(this.content)?this.content.iconClass:C},set:function(e){e?this._override("expandIconClass",e):this._clearOverride("expandIconClass")},enumerable:!0,configurable:!0}),t.prototype.expand=function(){this.viewModel.expanded=!0},t.prototype.collapse=function(){this.viewModel.expanded=!1},t.prototype.toggle=function(){this.viewModel.expanded=!this.viewModel.expanded},t.prototype.render=function(){var e,t,o,n,r,i=this.viewModel.expanded,a=this.mode,d=this.expandTooltip||s.expand,C=this.collapseTooltip||s.collapse,M=i?C:d,N=this.collapseIconClass,E=this.expandIconClass,H=((e={})[f]=i,e[N]=i,e[E]=!i,e);N===E&&(H[N]=!0);var j=((t={})[h]=i,t),L=((o={})[I]=i,o),S=((n={})[k]=i,n),W=this.iconNumber,P=W&&!i?p.tsx("span",{key:"expand__icon-number",class:w},W):null,q=W&&i?p.tsx("span",{key:"expand__expand-icon-number",class:this.classes(w,m)},W):null,D=((r={})[c]="auto"===a,r[x]="drawer"===a,r[u]="floating"===a,r),V=this.id+"_controls_content";return p.tsx("div",{class:this.classes(l,D)},p.tsx("div",{bind:this,onclick:this._toggle,class:this.classes(O,S)}),p.tsx("div",{class:this.classes(v,j)},p.tsx("div",{class:_},p.tsx("div",{bind:this,onclick:this._toggle,onkeydown:this._toggle,"aria-controls":V,"aria-expanded":i?"true":"false",title:M,role:"button",tabindex:"0",class:y},P,p.tsx("span",{"aria-hidden":"true",class:this.classes(g,H)}),p.tsx("span",{class:b},M)),q),p.tsx("div",{id:V,role:"region",class:this.classes(T,L)},this._renderContent())))},t.prototype._toggle=function(){this.toggle()},t.prototype._renderContent=function(){var e=this.content;return"string"==typeof e?p.tsx("div",{innerHTML:e}):p.isWidget(e)?e.render():e instanceof HTMLElement?p.tsx("div",{bind:e,afterCreate:this._attachToNode}):p.hasDomNode(e)?p.tsx("div",{bind:e.domNode,afterCreate:this._attachToNode}):null},t.prototype._attachToNode=function(e){e.appendChild(this)},n([i.aliasOf("viewModel.autoCollapse")],t.prototype,"autoCollapse",void 0),n([i.property({dependsOn:["content"]}),p.renderable()],t.prototype,"collapseIconClass",null),n([i.property(),p.renderable()],t.prototype,"collapseTooltip",void 0),n([i.property(),p.renderable()],t.prototype,"content",void 0),n([i.aliasOf("viewModel.expanded"),p.renderable()],t.prototype,"expanded",void 0),n([i.property({dependsOn:["content"]}),p.renderable()],t.prototype,"expandIconClass",null),n([i.property(),p.renderable()],t.prototype,"expandTooltip",void 0),n([i.aliasOf("viewModel.group")],t.prototype,"group",void 0),n([i.property(),p.renderable()],t.prototype,"iconNumber",void 0),n([i.property()],t.prototype,"label",void 0),n([i.property(),p.renderable()],t.prototype,"mode",void 0),n([i.aliasOf("viewModel.view"),p.renderable()],t.prototype,"view",void 0),n([i.property({type:d}),p.renderable("viewModel.state")],t.prototype,"viewModel",void 0),n([p.accessibleHandler()],t.prototype,"_toggle",null),t=n([i.subclass("esri.widgets.Expand")],t)}(i.declared(a))}));