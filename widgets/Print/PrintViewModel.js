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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/tsSupport/generatorHelper","../../core/tsSupport/awaiterHelper","../../core/tsSupport/assignHelper","../../intl","../../request","../../Viewpoint","../../core/arrayUtils","../../core/Error","../../core/Handles","../../core/Loadable","../../core/promiseUtils","../../core/accessorSupport/decorators","../../geometry/Extent","../../tasks/PrintTask","../../tasks/support/fileFormat","../../tasks/support/layoutTemplate","../../tasks/support/PrintParameters","../../views/2d/viewpointUtils"],(function(e,t,r,o,i,n,a,l,s,p,u,c,d,f,v,h,y,m,w,S,g,O){return function(e){function t(t){var r=e.call(this,t)||this;return r._handles=new d,r._viewpoint=null,r.allowedFormats="all",r.allowedLayouts="all",r.view=null,r.printServiceUrl=null,r.updateDelay=1e3,r.templatesInfo=null,r.scaleEnabled=!1,r.error=null,r.print=r.print.bind(r),r}return r(t,e),t.prototype.destroy=function(){this._handles.destroy(),this._handles=null,this.view=null},Object.defineProperty(t.prototype,"_printTask",{get:function(){return new m(this.printServiceUrl,{updateDelay:this.updateDelay})},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"state",{get:function(){return"loading"===this.loadStatus?"initializing":this.error||"failed"===this.loadStatus?"error":this.get("view.ready")&&"loaded"===this.loadStatus?"ready":"disabled"},enumerable:!0,configurable:!0}),t.prototype.load=function(e){return this.addResolvingPromise(this._loadServiceDescription(e)),v.resolve(this)},t.prototype.print=function(e){var t;if(!this.view)return v.reject(new c("print:view-required","view is not set"));this.scaleEnabled?(this._viewpoint||(this._viewpoint=this.view.viewpoint.clone()),t=this._getExtent(this._viewpoint,e.outScale)):(this._viewpoint=null,t=this._getExtent(this.view.viewpoint)),function(e){e.layoutOptions||(e.layoutOptions={}),e.layoutOptions.customTextElements||(e.layoutOptions.customTextElements=[]),u.find(e.layoutOptions.customTextElements,(function(e){return"date"in e}))||e.layoutOptions.customTextElements.push({date:l.formatDate(Date.now(),l.convertDateFormatToIntlOptions("short-date"))})}(e);var r=new g({view:this.view,template:e,extent:t});return this._printTask.execute(r).catch((function(e){return v.reject(new c("print:export-error","An error occurred while exporting the web map.",{error:e}))}))},t.prototype._loadServiceDescription=function(e){return n(this,void 0,void 0,(function(){var t;return i(this,(function(r){switch(r.label){case 0:return[4,this._getPrintTemplatesFromService(e)];case 1:return t=r.sent(),this._set("templatesInfo",t),[2]}}))}))},t.prototype._getPrintTemplatesFromService=function(e){var t=this;return-1===this.printServiceUrl.toLowerCase().split("/").indexOf("gpserver")?(this.error=new c("print:invalid-print-service-url","Can't fetch print templates information from provided URL",{url:this.printServiceUrl}),v.reject(this.error)):s(this.printServiceUrl,a({},e,{query:{f:"json"},timeout:6e4})).then((function(e){var r=e&&e.data,o=r&&r.parameters,i=null,n=null;return o.forEach((function(e){var r,o=e.choiceList&&e.choiceList.slice();o&&o.length&&e.defaultValue&&(r=o.indexOf(e.defaultValue)),r>-1&&(o.splice(r,1),o.unshift(e.defaultValue));var a=function(e,t){var r="all"===t?e:e.filter((function(e){return t.indexOf(e)>-1}));return 0===r.length?e:r};if("Format"===e.name){var l=a(o.map(w.fromJSON),t.allowedFormats),s=w.fromJSON(e.defaultValue);i={defaultValue:u.includes(l,s)?s:l[0],choiceList:l}}else if("Layout_Template"===e.name){var p,c=void 0;(o=o.filter((function(e){return"map_only"!==e.toLowerCase()}))).some((function(e,t){var r=e.toLowerCase();return r.indexOf("letter")>-1&&r.indexOf("landscape")>-1?(p=t,!0):r.indexOf("a4")>-1&&r.indexOf("landscape")>-1&&(p=t,!1)})),p&&(c=o[p],o.splice(p,1),o.unshift(c));l=a(o.map(S.fromJSON),t.allowedLayouts),s=S.fromJSON(e.defaultValue);n={defaultValue:u.includes(l,s)?s:l[0],choiceList:l}}})),t.error=null,{format:i,layout:n}})).catch((function(e){throw t.error=new c("print:unavailable-service-info","Can't fetch templates info from service",{error:e}),t.error}))},t.prototype._getExtent=function(e,t){var r=t||this.view.scale,o=this.get("view.size"),i=e?e.targetGeometry:null;return O.getExtent(new y,new p({scale:r,targetGeometry:i}),o)},o([h.property()],t.prototype,"allowedFormats",void 0),o([h.property()],t.prototype,"allowedLayouts",void 0),o([h.property()],t.prototype,"view",void 0),o([h.property()],t.prototype,"printServiceUrl",void 0),o([h.property({dependsOn:["printServiceUrl"],type:m})],t.prototype,"_printTask",null),o([h.property({dependsOn:["view.ready","error","loadStatus"],readOnly:!0})],t.prototype,"state",null),o([h.property()],t.prototype,"updateDelay",void 0),o([h.property({readOnly:!0})],t.prototype,"templatesInfo",void 0),o([h.property()],t.prototype,"scaleEnabled",void 0),o([h.property()],t.prototype,"error",void 0),t=o([h.subclass("esri.widgets.Print.PrintViewModel")],t)}(h.declared(f))}));