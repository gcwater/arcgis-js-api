/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../geometry/support/buffer/types"],(function(e,t){"use strict";function n(e,t,n){const r=e.typedBuffer,f=e.typedBufferStride,d=t.typedBuffer,u=t.typedBufferStride,l=n?n.count:t.count;let o=(n&&n.dstIndex?n.dstIndex:0)*f,c=(n&&n.srcIndex?n.srcIndex:0)*u;for(let i=0;i<l;++i)r[o]=d[c],r[o+1]=d[c+1],o+=f,c+=u}function r(e,r,f){const d=e.typedBuffer,u=e.typedBufferStride,l=r.typedBuffer,o=r.typedBufferStride,c=f?f.count:r.count;let i=(f&&f.dstIndex?f.dstIndex:0)*u,s=(f&&f.srcIndex?f.srcIndex:0)*o;if(t.isInteger(r.elementType)){const e=t.maximumValue(r.elementType);if(t.isSigned(r.elementType))for(let t=0;t<c;++t)d[i]=Math.max(l[s]/e,-1),d[i+1]=Math.max(l[s+1]/e,-1),i+=u,s+=o;else for(let t=0;t<c;++t)d[i]=l[s]/e,d[i+1]=l[s+1]/e,i+=u,s+=o}else n(e,r,f);return e}function f(e,t,n,r){var f,d;const u=e.typedBuffer,l=e.typedBufferStride,o=null!=(f=null==r?void 0:r.count)?f:e.count;let c=(null!=(d=null==r?void 0:r.dstIndex)?d:0)*l;for(let i=0;i<o;++i)u[c]=t,u[c+1]=n,c+=l}var d=Object.freeze({__proto__:null,copy:n,normalizeIntegerBuffer:r,fill:f});e.copy=n,e.fill=f,e.normalizeIntegerBuffer=r,e.vec2=d}));