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

define(["require","exports","tslib","../../../../../../core/Error","../../../../../../core/Logger","../../util/Matcher"],(function(e,r,t,n,a,i){Object.defineProperty(r,"__esModule",{value:!0});var c=a.getLogger("esri/views/2d/engine/webgl/mesh/factories/matcherUtils");r.createMatcher=function(e,r,a){return t.__awaiter(this,void 0,void 0,(function(){return t.__generator(this,(function(t){if(!a)return[2,new i.GraphicMatcher(e)];switch(a.type){case"simple":case"dot-density":return[2,i.FeatureMatcher.fromBasicRenderer(a,e,r)];case"unique-value":return[2,i.MapMatcher.fromUVRenderer(a,e,r)];case"class-breaks":return[2,i.IntervalMatcher.fromCBRenderer(a,e,r)];case"dictionary":return[2,i.DictionaryMatcher.fromDictionaryRenderer(a,e,r)];default:return c.error(new n("mapview-mesh:invalid-renderer","Unable to handle unknown renderer type")),[2,null]}return[2]}))}))}}));