/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../chunks/_rollupPluginBabelHelpers","../CIMCursor","../CurveHelper"],(function(e,t,n,i){"use strict";const s=.001;let r=function(){function e(){}return e.local=function(){return null===e.instance&&(e.instance=new e),e.instance},e.prototype.execute=function(e,t,n){return new o(e,t,n)},e}();r.instance=null;let o=function(e){function r(t,n,r){var o;return(o=e.call(this,t,!0,!0)||this)._curveHelper=new i.CurveHelper,o._angleToLine=void 0===n.angleToLine||n.angleToLine,o._offset=void 0!==n.offset?n.offset*r:0,o._relativeTo=n.relativeTo,o._position=void 0!==n.startPointOffset?n.startPointOffset*r:0,o._epsilon=s*r,o}t._inheritsLoose(r,e);var o=r.prototype;return o.processPath=function(e){const t=this._position;if("SegmentMidpoint"===this._relativeTo){for(this.iteratePath||(this._segmentCount=e.length,this._curSegment=1,this.iteratePath=!0);this._curSegment<this._segmentCount;){const t=this._curSegment;this._curSegment++;const i=e[t-1],s=e[t],r=this._curveHelper.calculateLength(i,s);if(r<this._epsilon)continue;const o=.5+this._position/r,[l,a]=this._curveHelper.getAngleCS(i,s,o),c=n.getCoord2D(i,s,o);return this.internalPlacement.setTranslate(c[0]-this._offset*a,c[1]+this._offset*l),this._angleToLine&&this.internalPlacement.setRotateCS(l,a),this.internalPlacement}return this.iteratePath=!1,null}"LineEnd"===this._relativeTo&&n.reversePath(e);const i=this.onLine(e,t);return"LineEnd"===this._relativeTo&&n.reversePath(e),i},o.onLine=function(e,t){let i,s=!1;switch(this._relativeTo){case"LineMiddle":default:i=this._curveHelper.calculatePathLength(e)/2+t;break;case"LineBeginning":i=t;break;case"LineEnd":i=t,s=!0}const r=e.length;let o,l=0,a=e[0];for(let c=1;c<r;++c){o=a,a=e[c];const t=this._curveHelper.calculateLength(o,a);if(l+t>i){const e=(i-l)/t,[r,c]=this._curveHelper.getAngleCS(o,a,e),h=n.getCoord2D(o,a,e),u=s?this._offset:-this._offset;return this.internalPlacement.setTranslate(h[0]-u*c,h[1]+u*r),this._angleToLine&&(s?this.internalPlacement.setRotateCS(-r,-c):this.internalPlacement.setRotateCS(r,c)),this.internalPlacement}l+=t}return null},r}(n.PathTransformationCursor);e.PlacementOnLine=r,Object.defineProperty(e,"__esModule",{value:!0})}));