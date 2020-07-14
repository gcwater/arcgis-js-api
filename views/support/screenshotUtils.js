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

define(["require","exports","tslib","../../core/compilerUtils","../../core/mathUtils"],(function(t,i,e,a,h){Object.defineProperty(i,"__esModule",{value:!0});function r(t,i){var e=t||{},r=e.format,n=e.quality,o=e.rotation,l=e.disableSlice,g=d(t,i.padding),u=function(t,i){var e={x:0,y:0,width:i.width,height:i.height};if(t&&t.area){null!=t.area.x&&(e.x=Math.floor(t.area.x)),null!=t.area.y&&(e.y=Math.floor(t.area.y));var a=null!=t.area.width?Math.floor(t.area.width):null,h=null!=t.area.height?Math.floor(t.area.height):null;if(e.width=i.width-e.x,e.height=i.height-e.y,null!=a&&null!=h)e.width=Math.min(e.width,a),e.height=Math.min(e.height,h);else if(null==a&&null!=h){var r=Math.min(e.width,a);e.height=r/e.width*e.height,e.width=r}else if(null!=a&&null==h){var n=Math.min(e.height,h);e.width=n/e.height*e.width,e.height=n}}return function(t,i){var e=Math.floor(Math.max(t.x,0)),a=Math.floor(Math.max(t.y,0)),h=Math.floor(Math.min(t.width,i.width-e)),r=Math.floor(Math.min(t.height,i.height-a)),n={x:e,y:a,width:h,height:r},o=n.width/n.height,l=t.width/t.height;if(l===o)return n;if(l>o){var g=Math.floor(n.width/l),d=n.height-g;return{x:n.x,y:Math.floor(n.y+d/2),width:n.width,height:g}}var u=Math.floor(n.height*l),f=n.width-u;return{x:Math.floor(n.x+f/2),y:n.y,width:u,height:n.height}}(function(t,i){if(!i||null==i.width||null==i.height)return t;var e=i.width/i.height,a=t.width/t.height;if(a===e)return t;if(a<e){var h=Math.floor(t.height*e);return t.x-=(h-t.width)/2,t.width=h,t}var r=Math.floor(t.width/e);return t.y-=(r-t.height)/2,t.height=r,t}(e,t),i)}(t,{width:i.width-g.left-g.right,height:i.height-g.top-g.bottom}),c=function(t,i){if(!t)return i;var e=t.width,a=t.height;if(null!=e&&null!=a)return{width:Math.floor(e),height:Math.floor(a)};if(null==e&&null==a)return i;var h=i.width/i.height;if(null==a)return{width:Math.floor(e),height:Math.floor(e/h)};return{width:Math.floor(a*h),height:Math.floor(a)}}(t,u),m=c.width,s=c.height,M=function(t){switch(t){case"png":case"jpg":case"jpeg":return t;case null:case void 0:return f;default:return a.neverReached(t),f}}(r),p=w[M];return{format:M,quality:h.clamp(null!=n?n:p,0,100),area:u,width:m,height:s,rotation:o,disableSlice:!!l,ignoreBackground:!(!t||!t.ignoreBackground),ignorePadding:!(!t||!t.ignorePadding)}}function n(t,i){var e=u[i.format],a=i.quality/100;return t.toDataURL(e,a)}function o(t,i,e){return e||(e=function(){l||((l=document.createElement("canvas")).width=1,l.height=1);return l}()),e.getContext("2d").createImageData(t,i)}i.completeUserSettings=r,i.toRenderSettings=function(t,i){var e=r(t,i),a=e.area,h=e.width/a.width,n=d(e,i.padding),o=n.left+n.right,l=n.top+n.bottom,g=i.width-o,u=i.height-l,f=Math.floor(g*h+o),w=Math.floor(u*h+l),c=t&&t.layers?t.layers:[],m=e.ignoreBackground,s=e.ignorePadding;return{framebufferWidth:f,framebufferHeight:w,region:{x:Math.floor(a.x*h)+n.left,y:Math.floor(a.y*h)+n.top,width:e.width,height:e.height},format:e.format,quality:e.quality,rotation:e.rotation,pixelRatio:h,layers:c,disableSlice:e.disableSlice,ignoreBackground:m,ignorePadding:s}},i.encodeResult=function(t,i,e,a){a.premultipliedAlpha&&function(t){for(var i=t.data,e=i.length,a=0;a<e;a+=4){var h=i[a+3];if(h>0){var r=h/255;i[a+0]=i[a+0]/r,i[a+1]=i[a+1]/r,i[a+2]=i[a+2]/r}}}(t),e.width=t.width,e.height=t.height;var h=e.getContext("2d");h.putImageData(t,0,0),a.flipY&&function(t){t.save(),t.globalCompositeOperation="copy",t.scale(1,-1),t.translate(0,-t.canvas.height),t.drawImage(t.canvas,0,0),t.restore()}(h);var r=h.getImageData(0,0,t.width,t.height),o=n(e,i);return e.width=0,e.height=0,{dataUrl:o,data:r}},i.toDataUrl=n,i.createEmptyImageData=function(t,i,e){if(!t||!i)throw new Error("Cannot construct image data without dimensions");if(g)try{return new ImageData(t,i)}catch(t){g=!1}return o(t,i,e)},i.wrapImageData=function(t,i,e,a){if(!i||!e)throw new Error("Cannot construct image data without dimensions");if(g)try{return new ImageData(t,i,e)}catch(t){g=!1}var h=o(i,e,a);return h.data.set(t,0),h},i.resampleHermite=function(t,i,e,a,h,r,n,o){void 0===a&&(a=0),void 0===h&&(h=0),void 0===r&&(r=t.width-a),void 0===n&&(n=t.height-h),void 0===o&&(o=!1);for(var l=t.data,g=i.width,d=i.height,u=i.data,f=r/g,w=n/d,c=Math.ceil(f/2),m=Math.ceil(w/2),s=t.width,M=0;M<d;M++)for(var p=0;p<g;p++){for(var v=4*(p+(o?d-M-1:M)*g),y=0,x=0,b=0,j=0,D=0,S=0,I=(M+.5)*w,q=Math.floor(M*w);q<(M+1)*w;q++)for(var R=Math.abs(I-(q+.5))/m,P=(p+.5)*f,U=R*R,_=Math.floor(p*f);_<(p+1)*f;_++){var C=Math.abs(P-(_+.5))/c,k=Math.sqrt(U+C*C);if(!(k>=1)){var B=2*k*k*k-3*k*k+1,E=4*(a+_+(h+q)*s);S+=B*l[E+3],x+=B,!e&&l[E+3]<255&&(B=B*l[E+3]/255),b+=B*l[E],j+=B*l[E+1],D+=B*l[E+2],y+=B}}u[v]=b/y,u[v+1]=j/y,u[v+2]=D/y,u[v+3]=S/x}return i},i.screenshotSuperSampleSettings=function(t,i,a){if(!i)return t;var h=t.framebufferWidth,r=t.framebufferHeight,n=t.pixelRatio,o=t.region,l=d(t,a),g=l.left+l.right,u=l.top+l.bottom,f=h-g,w=r-u,c=Math.min(8,Math.min((2048-g)/f,(2048-u)/w));return c<1.5?t:e.__assign(e.__assign({},t),{framebufferWidth:Math.round(f*c)+g,framebufferHeight:Math.round(w*c)+u,pixelRatio:n*c,resample:{region:{x:Math.round((o.x-l.left)*c)+l.left,y:Math.round((o.y-l.top)*c)+l.top,width:Math.round(o.width*c),height:Math.round(o.height*c)},width:h,height:r}})};var l=null,g=!0;function d(t,i){return!i||t&&t.ignorePadding?c:i}var u={png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg"},f="jpg",w={png:100,jpg:98,jpeg:98},c={top:0,right:0,bottom:0,left:0}}));