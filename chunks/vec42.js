/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../geometry/support/buffer/math/common"],(function(e,t){"use strict";function r(e,r,f){if(e.count!==r.count)return void t.logger.error("source and destination buffers need to have the same number of elements");const o=e.count,n=f[0],u=f[1],d=f[2],c=f[3],s=f[4],i=f[5],a=f[6],p=f[7],y=f[8],m=f[9],B=f[10],l=f[11],h=f[12],S=f[13],g=f[14],b=f[15],v=e.typedBuffer,M=e.typedBufferStride,_=r.typedBuffer,R=r.typedBufferStride;for(let t=0;t<o;t++){const e=t*M,r=t*R,f=_[r],o=_[r+1],j=_[r+2],x=_[r+3];v[e]=n*f+s*o+y*j+h*x,v[e+1]=u*f+i*o+m*j+S*x,v[e+2]=d*f+a*o+B*j+g*x,v[e+3]=c*f+p*o+l*j+b*x}}function f(e,r,f){if(e.count!==r.count)return void t.logger.error("source and destination buffers need to have the same number of elements");const o=e.count,n=f[0],u=f[1],d=f[2],c=f[3],s=f[4],i=f[5],a=f[6],p=f[7],y=f[8],m=e.typedBuffer,B=e.typedBufferStride,l=r.typedBuffer,h=r.typedBufferStride;for(let t=0;t<o;t++){const e=t*B,r=t*h,f=l[r],o=l[r+1],S=l[r+2],g=l[r+3];m[e]=n*f+c*o+a*S,m[e+1]=u*f+s*o+p*S,m[e+2]=d*f+i*o+y*S,m[e+3]=g}}function o(e,t,r){const f=Math.min(e.count,t.count),o=e.typedBuffer,n=e.typedBufferStride,u=t.typedBuffer,d=t.typedBufferStride;for(let c=0;c<f;c++){const e=c*n,t=c*d;o[e]=r*u[t],o[e+1]=r*u[t+1],o[e+2]=r*u[t+2],o[e+3]=r*u[t+3]}}function n(e,t,r){const f=Math.min(e.count,t.count),o=e.typedBuffer,n=e.typedBufferStride,u=t.typedBuffer,d=t.typedBufferStride;for(let c=0;c<f;c++){const e=c*n,t=c*d;o[e]=u[t]>>r,o[e+1]=u[t+1]>>r,o[e+2]=u[t+2]>>r,o[e+3]=u[t+3]>>r}}var u=Object.freeze({__proto__:null,transformMat4:r,transformMat3:f,scale:o,shiftRight:n});e.scale=o,e.shiftRight=n,e.transformMat3=f,e.transformMat4=r,e.vec4=u}));