/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../core/ObjectStack","../../chunks/mat4","../../chunks/vec3","../../chunks/vec3f64","../../chunks/vec4","../../chunks/vec4f64","./clipRay","./plane","./vectorStacks"],(function(e,t,r,n,c,o,i,s,f,a){"use strict";function u(e){return e?[f.create(e[0]),f.create(e[1]),f.create(e[2]),f.create(e[3]),f.create(e[4]),f.create(e[5])]:[f.create(),f.create(),f.create(),f.create(),f.create(),f.create()]}function l(){return[c.create(),c.create(),c.create(),c.create(),c.create(),c.create(),c.create(),c.create()]}function m(e,t=u()){for(let r=0;r<6;r++)f.copy(e[r],t[r])}function p(e,t,c,i=B){const s=r.multiply(a.sm4d.get(),t,e);r.invert(s,s);for(let r=0;r<8;++r){const e=o.transformMat4(a.sv4d.get(),A[r],s);n.set(i[r],e[0]/e[3],e[1]/e[3],e[2]/e[3])}P(c,i)}function P(e,t){f.fromPoints(t[4],t[0],t[3],e[0]),f.fromPoints(t[1],t[5],t[6],e[1]),f.fromPoints(t[4],t[5],t[1],e[2]),f.fromPoints(t[3],t[2],t[6],e[3]),f.fromPoints(t[0],t[1],t[2],e[4]),f.fromPoints(t[5],t[4],t[7],e[5])}function d(e,t){for(let r=0;r<6;r++)if(f.isSphereFullyInside(e[r],t))return!1;return!0}function y(e,t){return V(e,s.fromRay(t,b.get()))}function g(e,t){for(let r=0;r<6;r++){const n=e[r];if(!f.clipInfinite(n,t))return!1}return!0}function h(e,t,r){return V(e,s.fromLineSegmentAndDirection(t,r,b.get()))}function k(e,t){for(let r=0;r<6;r++){if(f.signedDistance(e[r],t)>0)return!1}return!0}function v(e,t){for(let r=0;r<6;r++)if(f.isAABBFullyInside(e[r],t))return!1;return!0}function V(e,t){for(let r=0;r<6;r++)if(!f.clip(e[r],t))return!1;return!0}const S={bottom:[5,1,0,4],near:[0,1,2,3],far:[5,4,7,6],right:[1,5,6,2],left:[4,0,3,7],top:[7,3,2,6]},A=[i.fromValues(-1,-1,-1,1),i.fromValues(1,-1,-1,1),i.fromValues(1,1,-1,1),i.fromValues(-1,1,-1,1),i.fromValues(-1,-1,1,1),i.fromValues(1,-1,1,1),i.fromValues(1,1,1,1),i.fromValues(-1,1,1,1)],b=new t.ObjectStack(s.create),B=l();e.computePlanes=P,e.copy=m,e.create=u,e.createPoints=l,e.fromMatrix=p,e.intersectClipRay=g,e.intersectsAABB=v,e.intersectsLineSegment=h,e.intersectsPoint=k,e.intersectsRay=y,e.intersectsSphere=d,e.planePointIndices=S,Object.defineProperty(e,"__esModule",{value:!0})}));