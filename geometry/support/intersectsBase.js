/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","./contains"],(function(n,t){"use strict";function e(n,e){return t.extentContainsPoint(n,e)}function r(n,t){const e=n.hasZ&&t.hasZ;let r,o,i;if(n.xmin<=t.xmin){if(r=t.xmin,n.xmax<r)return!1}else if(r=n.xmin,t.xmax<r)return!1;if(n.ymin<=t.ymin){if(o=t.ymin,n.ymax<o)return!1}else if(o=n.ymin,t.ymax<o)return!1;if(e&&t.hasZ)if(n.zmin<=t.zmin){if(i=t.zmin,n.zmax<i)return!1}else if(i=n.zmin,t.zmax<i)return!1;return!0}function o(n,e){const{points:r,hasZ:o}=e,i=o?t.extentContainsCoords3D:t.extentContainsCoords2D;for(const t of r)if(i(n,t))return!0;return!1}const i=[0,0],s=[0,0],c=[0,0],f=[0,0],u=[i,s,c,f],x=[[c,i],[i,s],[s,f],[f,c]];function l(n,e){i[0]=n.xmin,i[1]=n.ymax,s[0]=n.xmax,s[1]=n.ymax,c[0]=n.xmin,c[1]=n.ymin,f[0]=n.xmax,f[1]=n.ymin;for(const r of u)if(t.polygonContainsCoords(e,r))return!0;for(const r of e.rings){if(!r.length)continue;let e=r[0];if(t.extentContainsCoords2D(n,e))return!0;for(let o=1;o<r.length;o++){const i=r[o];if(t.extentContainsCoords2D(n,i)||g(e,i,x))return!0;e=i}}return!1}function m(n,e){i[0]=n.xmin,i[1]=n.ymax,s[0]=n.xmax,s[1]=n.ymax,c[0]=n.xmin,c[1]=n.ymin,f[0]=n.xmax,f[1]=n.ymin;const r=e.paths;for(const o of r){if(!r.length)continue;let e=o[0];if(t.extentContainsCoords2D(n,e))return!0;for(let r=1;r<o.length;r++){const i=o[r];if(t.extentContainsCoords2D(n,i)||g(e,i,x))return!0;e=i}}return!1}const a=[0,0];function y(n){for(let t=0;t<n.length;t++){const e=n[t];for(let o=0;o<e.length-1;o++){const r=e[o],i=e[o+1];for(let e=t+1;e<n.length;e++)for(let t=0;t<n[e].length-1;t++){const o=n[e][t],s=n[e][t+1];if(h(r,i,o,s,a)&&!(a[0]===r[0]&&a[1]===r[1]||a[0]===o[0]&&a[1]===o[1]||a[0]===i[0]&&a[1]===i[1]||a[0]===s[0]&&a[1]===s[1]))return!0}}const r=e.length;if(!(r<=4))for(let n=0;n<r-3;n++){let t=r-1;0===n&&(t=r-2);const o=e[n],i=e[n+1];for(let r=n+2;r<t;r++){const n=e[r],t=e[r+1];if(h(o,i,n,t,a)&&!(a[0]===o[0]&&a[1]===o[1]||a[0]===n[0]&&a[1]===n[1]||a[0]===i[0]&&a[1]===i[1]||a[0]===t[0]&&a[1]===t[1]))return!0}}}return!1}function g(n,t,e){for(let r=0;r<e.length;r++)if(h(n,t,e[r][0],e[r][1]))return!0;return!1}function h(n,t,e,r,o){const[i,s]=n,[c,f]=t,[u,x]=e,[l,m]=r,a=l-u,y=i-u,g=c-i,h=m-x,C=s-x,p=f-s,d=h*g-a*p;if(0===d)return!1;const I=(a*C-h*y)/d,P=(g*C-p*y)/d;return I>=0&&I<=1&&P>=0&&P<=1&&(o&&(o[0]=i+I*(c-i),o[1]=s+I*(f-s)),!0)}function C(n){switch(n){case"esriGeometryEnvelope":case"extent":return r;case"esriGeometryMultipoint":case"multipoint":return o;case"esriGeometryPoint":case"point":return e;case"esriGeometryPolygon":case"polygon":return l;case"esriGeometryPolyline":case"polyline":return m}}n.extentIntersectsExtent=r,n.extentIntersectsMultipoint=o,n.extentIntersectsPoint=e,n.extentIntersectsPolygon=l,n.extentIntersectsPolyline=m,n.getFeatureExtentIntersector=C,n.isSelfIntersecting=y,n.segmentIntersects=h,Object.defineProperty(n,"__esModule",{value:!0})}));