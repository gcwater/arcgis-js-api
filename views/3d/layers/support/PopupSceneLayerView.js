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

define(["require","exports","tslib","../../../../core/Error","../../../../core/maybe","../../../../core/promiseUtils","../../../../core/SetUtils","../../../../core/accessorSupport/decorators","../../../../layers/support/fieldUtils","../../../layers/support/popupUtils"],(function(e,t,r,n,o,p,s,i,u,a){Object.defineProperty(t,"__esModule",{value:!0}),t.PopupSceneLayerView=function(e){return function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r.__extends(t,e),t.prototype._validateFetchPopupFeatures=function(e){var t=this.layer;return t.popupEnabled?a.getFetchPopupTemplate(t,e)?void 0:new n("scenelayerview3d:fetchPopupFeatures","Layer does not define a popup template",{layer:t}):new n("scenelayerview3d:fetchPopupFeatures","Popups are disabled",{layer:t})},t.prototype.prepareFetchPopupFeatures=function(e){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(e){return[2]}))}))},t.prototype.fetchPopupFeatures=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var e,n,i,c,l,h,d,f,y,v,F;return r.__generator(this,(function(r){switch(r.label){case 0:return(e=this._validateFetchPopupFeatures(t))?[2,p.reject(e)]:(n=o.isSome(t)?t.clientGraphics:null)&&0!==n.length?(i=[],c=[],h=u.unpackFieldNames,d=[this.layer.fields],[4,a.getRequiredFields(this.layer,a.getFetchPopupTemplate(this.layer,t))]):[2,p.resolve([])];case 1:return l=h.apply(void 0,d.concat([r.sent()])),[4,this.prepareFetchPopupFeatures(l)];case 2:for(r.sent(),f=new Set,y=0,v=n;y<v.length;y++)F=v[y],u.populateMissingFields(l,F,f)?c.push(F):i.push(F);return 0===c.length?[2,p.resolve(i)]:[2,this.whenGraphicAttributes(c,s.valuesOfSet(f)).catch((function(){return c})).then((function(e){return i.concat(e)}))]}}))}))},t=r.__decorate([i.subclass("esri.views.3d.layers.support.PopupSceneLayerView")],t)}(e)}}));