/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../../core/has","../../../../core/mathUtils","../../../../core/maybe","../../webgl-engine/core/material/RenderTexture","../../webgl-engine/core/shaderLibrary/shading/PhysicallyBasedRenderingParameters.glsl","../../webgl-engine/core/shaderLibrary/util/AlphaDiscard.glsl","../../webgl-engine/core/shaderLibrary/util/EllipsoidMode","../../webgl-engine/lib/Texture"],(function(e,a,r,t,o,n,s,l,i){"use strict";function u(e,a){const r=new Map,o=(e,a)=>{if(t.isNone(e))return-1;if(r.has(e.id)){const t=r.get(e.id);return t.usage|=a,t.id}const o=r.size;return r.set(e.id,{id:o,usage:a}),o},s=a.pbrMetallicRoughness,l=s&&s.baseColorFactor,i=a.emissiveFactor,u=null==a.normalTexture&&null==a.emissiveTexture&&null==a.occlusionTexture&&(!s||null==s.metallicRoughnessTexture&&1===s.roughnessFactor&&(1===s.metallicFactor||0===s.metallicFactor)),m=u?n.PBRSchematicMRRValues[0]:s?s.metallicFactor:1,g=u?n.PBRSchematicMRRValues[1]:s?s.roughnessFactor:1,h="mask"===a.alphaMode?33:1,p={baseColorFactor:l?[l[0],l[1],l[2],l[3]]:[1,1,1,1],baseColorTextureId:o(s&&s.baseColorTexture,h),metallicRoughnessTextureId:o(s&&s.metallicRoughnessTexture,2),metallicFactor:m,roughnessFactor:g},f={alphaMode:a.alphaMode,alphaCutoff:a.alphaCutoff,doubleSided:a.doubleSided,cullFace:"none"===a.cullFace?0:"back"===a.cullFace?2:"front"===a.cullFace?1:void 0,normalTextureId:o(a.normalTexture,4),emissiveTextureId:o(a.emissiveTexture,16),occlusionTextureId:o(a.occlusionTexture,8),emissiveFactor:i?[i[0],i[1],i[2]]:[0,0,0],metallicRoughness:p,wrapTextures:!1,hasParametersFromSource:u},x=[];return r.forEach((({usage:a},r)=>{const o=t.isSome(e)&&e[r]&&e[r].formats,n=o?c(o.map((({name:e,format:a})=>({name:e,encoding:d[a]})))):[];x.push({id:r,usage:a,encodings:n})})),{material:f,textures:x}}function c(e){return e.sort(((e,a)=>e.encoding-a.encoding))}const d={ktx2:1,basis:2,dds:4,png:8,jpg:16,"ktx-etc2":32},m={[i.Texture.KTX2_ENCODING]:2,[i.Texture.BASIS_ENCODING]:2,[i.Texture.DDS_ENCODING]:4,"image/png":8,"image/jpg":16,"image/jpeg":16,"image/ktx":32};function g(e){const a=e&&e.materialDefinitions?Object.keys(e.materialDefinitions)[0]:null,t=e&&e.textureDefinitions?Object.keys(e.textureDefinitions)[0]:null,o=a&&e.materialDefinitions[a],n=t&&e.textureDefinitions[t],s=h();if(null!=o){const e=o.params;e.diffuse&&(s.metallicRoughness.baseColorFactor=[e.diffuse[0],e.diffuse[1],e.diffuse[2],1]),null!=e.doubleSided&&(s.doubleSided=e.doubleSided,s.cullFace=e.doubleSided?0:2),"none"!==e.cullFace&&"front"!==e.cullFace&&"back"!==e.cullFace||(s.cullFace="none"===e.cullFace?0:"back"===e.cullFace?2:1),e.transparency&&(s.metallicRoughness.baseColorFactor[3]=r.clamp(1-e.transparency,0,1)),(e.useVertexColorAlpha||s.metallicRoughness.baseColorFactor[3]<1)&&(s.alphaMode="blend")}const l=[];if(null!=n){const e=0;!n.wrap||"repeat"!==n.wrap[0]&&"repeat"!==n.wrap[1]||(s.wrapTextures=!0);let a=1;"rgba"===n.channels&&(s.alphaMode="blend",a|=32);const r=n.images.length-1,t=n.images[r],o=e=>e&&e.split("/").pop(),i=Array.isArray(n.encoding)?c(n.encoding.map(((e,a)=>({name:o(t.href[a]),encoding:m[e]||0})))):[{name:o(t.href),encoding:m[n.encoding]||0}];l.push({id:e,usage:a,encodings:i}),s.metallicRoughness.baseColorTextureId=e}return{material:s,textures:l}}const h=()=>({alphaMode:"opaque",alphaCutoff:s.defaultMaskAlphaCutoff,doubleSided:!0,cullFace:0,normalTextureId:-1,emissiveTextureId:-1,occlusionTextureId:-1,emissiveFactor:[0,0,0],metallicRoughness:{baseColorFactor:[.8,.8,.8,1],baseColorTextureId:-1,metallicRoughnessTextureId:-1,metallicFactor:0,roughnessFactor:.6},wrapTextures:!1,hasParametersFromSource:!0});function p(e,a,o,n){if(t.isNone(e)||null==e.data)return null;const s=e.data,l=!(s instanceof HTMLImageElement)||r.isPowerOfTwo(s.width)&&r.isPowerOfTwo(s.height),u=n.renderingContext.parameters.maxMaxAnisotropy,c=o&&!n.has(2)?1:u,d=l&&!e.downsampled&&c>1,m=o||!a.wrapTextures?f:x,g={mipmap:d,maxAnisotropy:c,encoding:M(e.encoding),wrap:m,components:1&e.usage?"opaque"===a.alphaMode?3:4:3,noUnpackFlip:!0};return new i.Texture(s,g)}const f={s:33071,t:33071},x={s:10497,t:10497};function T(e,a,t,n,i,u){const c=u.rendererTextureUsage,d=e=>R(n,t,e&c),m=a.metallicRoughness.baseColorFactor,g=r.clamp(a.metallicRoughness.baseColorFactor[3],0,1);e.baseColor=[m[0],m[1],m[2],g],e.hasParametersFromSource=!!a.hasParametersFromSource,e.usePBR=u.usePBR,e.mrrFactors=[a.metallicRoughness.metallicFactor,a.metallicRoughness.roughnessFactor,a.hasParametersFromSource?.2:.5],e.emissiveFactor=a.emissiveFactor,e.isIntegratedMesh=u.isIntegratedMesh,e.alphaCutoff="mask"===a.alphaMode?a.alphaCutoff:s.defaultMaskAlphaCutoff,e.alphaDiscardMode="opaque"===a.alphaMode?1:"mask"===a.alphaMode?2:3;const h=d(33);h&&(e.baseColorTexture=new o.RenderTexture(i,h));const p=d(2);p&&(e.metallicRoughnessTexture=new o.RenderTexture(i,p));const f=d(16);f&&(e.emissionTexture=new o.RenderTexture(i,f));const x=d(8);x&&(e.occlusionTexture=new o.RenderTexture(i,x));const T=d(4);T&&(e.normalTexture=new o.RenderTexture(i,T)),e.commonMaterialParameters.slicePlaneEnabled=u.slicePlaneEnabled,e.commonMaterialParameters.doubleSided=a.doubleSided,e.commonMaterialParameters.cullFace=a.cullFace,e.ellipsoidMode=l.getEllipsoidMode(u.viewSpatialReference)}function b(e){const r=e.has(1),t=e.has(0),o=a("disable-feature:i3s-basis")?0:3;return 24|(r?4|o:0)|(t?o:0)}function F(e,a){return e.find((e=>0!=(e.encoding&a)))}function R(e,a,r){if(t.isNone(e)||0===r)return null;for(let o=0;o<e.length;o++){const n=e[o];if(t.isSome(n)&&0!=(n.usage&r))return a[o].id}return null}function M(e){switch(e){case 1:return i.Texture.KTX2_ENCODING;case 2:return i.Texture.BASIS_ENCODING;case 4:return i.Texture.DDS_ENCODING;case 8:return"image/png";case 16:return"image/jpeg";case 32:return"image/ktx";default:return""}}e.configureMaterial=T,e.createTexture=p,e.getMaterialAndTextures=u,e.getMaterialAndTexturesFromShared=g,e.getSupportedEncodings=b,e.selectEncoding=F,Object.defineProperty(e,"__esModule",{value:!0})}));