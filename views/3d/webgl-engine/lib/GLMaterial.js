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

define(["require","exports","tslib","./AutoDisposable"],(function(e,t,n,i){Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){function t(t){var n=e.call(this)||this;return n.material=t.material,n.techniqueRep=t.techniqueRep,n.output=t.output,n}return n.__extends(t,e),t.prototype.getTechnique=function(){return this.technique},t.prototype.getPipelineState=function(e,t){return this.getTechnique().pipeline},t.prototype.ensureResources=function(e){return 2},t.prototype.ensureParameters=function(e){},t}(i.AutoDisposable);t.GLMaterial=r}));