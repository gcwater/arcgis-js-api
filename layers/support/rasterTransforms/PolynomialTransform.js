/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../../../chunks/_rollupPluginBabelHelpers","../../../chunks/tslib.es6","../../../geometry","../../../core/accessorSupport/decorators/property","../../../core/has","../../../core/accessorSupport/ensureType","../../../core/Logger","../../../core/accessorSupport/decorators/enumeration","../../../core/accessorSupport/decorators/reader","../../../core/accessorSupport/decorators/subclass","../../../core/accessorSupport/decorators/writer","./BaseRasterTransform","../../../geometry/Point","../../../geometry/Extent"],(function(e,r,t,o,n,i,s,f,c,l,a,p,u,y){"use strict";function h(e,r,t){const{x:o,y:n}=r;if(t<2){return{x:e[0]+o*e[2]+n*e[4],y:e[1]+o*e[3]+n*e[5]}}if(2===t){const r=o*o,t=n*n,i=o*n;return{x:e[0]+o*e[2]+n*e[4]+r*e[6]+i*e[8]+t*e[10],y:e[1]+o*e[3]+n*e[5]+r*e[7]+i*e[9]+t*e[11]}}const i=o*o,s=n*n,f=o*n,c=i*o,l=i*n,a=o*s,p=n*s;return{x:e[0]+o*e[2]+n*e[4]+i*e[6]+f*e[8]+s*e[10]+c*e[12]+l*e[14]+a*e[16]+p*e[18],y:e[1]+o*e[3]+n*e[5]+i*e[7]+f*e[9]+s*e[11]+c*e[13]+l*e[15]+a*e[17]+p*e[19]}}function d(e,r,t){const{xmin:o,ymin:n,xmax:i,ymax:s,spatialReference:f}=r;let c=[];if(t<2)c.push({x:o,y:s}),c.push({x:i,y:s}),c.push({x:o,y:n}),c.push({x:i,y:n});else{let e=10;for(let r=0;r<e;r++)c.push({x:o,y:n+(s-n)*r/(e-1)}),c.push({x:i,y:n+(s-n)*r/(e-1)});e=8;for(let r=1;r<=e;r++)c.push({x:o+(i-o)*r/e,y:n}),c.push({x:o+(i-o)*r/e,y:s})}c=c.map((r=>h(e,r,t)));const l=c.map((e=>e.x)),a=c.map((e=>e.y));return new y({xmin:Math.min.apply(null,l),xmax:Math.max.apply(null,l),ymin:Math.min.apply(null,a),ymax:Math.max.apply(null,a),spatialReference:f})}function m(e){const[r,t,o,n,i,s]=e,f=o*s-i*n,c=i*n-o*s;return[(i*t-r*s)/f,(o*t-r*n)/c,s/f,n/c,-i/f,-o/c]}let x=function(r){function t(){var e;return(e=r.apply(this,arguments)||this).polynomialOrder=1,e.type="polynomial",e}e._inheritsLoose(t,r);var o=t.prototype;return o.readForwardCoefficients=function(e,r){const{coeffX:t,coeffY:o}=r;if(null==t||!t.length||null==o||!o.length||t.length!==o.length)return null;const n=[];for(let i=0;i<t.length;i++)n.push(t[i]),n.push(o[i]);return n},o.writeForwardCoefficients=function(e,r,t){const o=[],n=[];for(let i=0;i<(null==e?void 0:e.length);i++)i%2==0?o.push(e[i]):n.push(e[i]);r.coeffX=o,r.coeffY=n},o.readInverseCoefficients=function(e,r){const{inverseCoeffX:t,inverseCoeffY:o}=r;if(null==t||!t.length||null==o||!o.length||t.length!==o.length)return null;const n=[];for(let i=0;i<t.length;i++)n.push(t[i]),n.push(o[i]);return n},o.writeInverseCoefficients=function(e,r,t){const o=[],n=[];for(let i=0;i<(null==e?void 0:e.length);i++)i%2==0?o.push(e[i]):n.push(e[i]);r.inverseCoeffX=o,r.inverseCoeffY=n},o.forwardTransform=function(e){if("point"===e.type){const r=h(this.forwardCoefficients,e,this.polynomialOrder);return new u({x:r.x,y:r.y,spatialReference:e.spatialReference})}return d(this.forwardCoefficients,e,this.polynomialOrder)},o.inverseTransform=function(e){if("point"===e.type){const r=h(this.inverseCoefficients,e,this.polynomialOrder);return new u({x:r.x,y:r.y,spatialReference:e.spatialReference})}return d(this.inverseCoefficients,e,this.polynomialOrder)},e._createClass(t,[{key:"inverseCoefficients",get:function(){let e=this._get("inverseCoefficients");const r=this._get("forwardCoefficients");return!e&&r&&this.polynomialOrder<2&&(e=m(r)),e},set:function(e){this._set("inverseCoefficients",e)}}]),t}(p);return r.__decorate([o.property({json:{write:!0}})],x.prototype,"polynomialOrder",void 0),r.__decorate([o.property()],x.prototype,"forwardCoefficients",void 0),r.__decorate([c.reader("forwardCoefficients",["coeffX","coeffY"])],x.prototype,"readForwardCoefficients",null),r.__decorate([a.writer("forwardCoefficients")],x.prototype,"writeForwardCoefficients",null),r.__decorate([o.property({json:{write:!0}})],x.prototype,"inverseCoefficients",null),r.__decorate([c.reader("inverseCoefficients",["inverseCoeffX","inverseCoeffY"])],x.prototype,"readInverseCoefficients",null),r.__decorate([a.writer("inverseCoefficients")],x.prototype,"writeInverseCoefficients",null),r.__decorate([o.property()],x.prototype,"affectsPixelSize",void 0),r.__decorate([f.enumeration({PolynomialXform:"polynomial"})],x.prototype,"type",void 0),x=r.__decorate([l.subclass("esri.layers.support.rasterTransforms.PolynomialTransform")],x),x}));