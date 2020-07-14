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

define(["require","exports","tslib"],(function(e,n,r){function t(e){var n=e.type;return e instanceof KeyboardEvent||"keyup"===n||"keydown"===n||"keypress"===n}Object.defineProperty(n,"__esModule",{value:!0}),n.accessibleHandler=function(){return function(e,n){if(!e[n])throw new TypeError("Cannot auto bind undefined function '"+n+"'");return{value:(o=e[n],function(e){for(var n=[],a=1;a<arguments.length;a++)n[a-1]=arguments[a];t(e)?"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.stopPropagation(),e.target.click()):o.call.apply(o,r.__spreadArrays([this,e],n))})};var o}}}));