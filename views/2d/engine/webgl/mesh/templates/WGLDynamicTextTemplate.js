/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../../../../../../chunks/_rollupPluginBabelHelpers","../../../../../../core/screenUtils","../../alignmentUtils","../../color","../../definitions","../../number","../../materialKey/MaterialKey","./util","./WGLBaseTextTemplate","./WGLDynamicMeshTemplate","../../../../layers/features/textUtils"],(function(t,e,i,n,o,a,r,s,l,c,_){"use strict";const h=5,p=24;function u(t,e,i,n){return"string"==typeof t.text?t.text:"function"==typeof t.text?t.text(e,i,n):""}return function(l){function c(t,i,c){var _;(_=l.call(this,t)||this)._horizontalAlignment="center",_._verticalAlignment="middle",_._textToGlyphs=new Map,_._minMaxZoom=a.i1616to32(Math.round(i*o.MIN_MAX_ZOOM_PRECISION_FACTOR),Math.round(c*o.MIN_MAX_ZOOM_PRECISION_FACTOR));const p=t.scaleFactor||1;if(_._cimTextLayer=t,s.isFunction(t.color)){const e=(e,i,o)=>n.premultiplyAlphaRGBA(t.color(e,i,o));_._dynamicPropertyMap.set("_color",e)}else _._color=n.premultiplyAlphaRGBA(t.color);if(s.isFunction(t.color)){const e=(e,i,o)=>n.premultiplyAlphaRGBA(t.outlineColor(e,i,o));_._dynamicPropertyMap.set("_haloColor",e)}else _._haloColor=n.premultiplyAlphaRGBA(t.outlineColor);let u;s.isFunction(t.size)||(u=Math.min(Math.round(e.pt2px(t.size*t.sizeRatio)),127));const m=(i,n,o)=>s.isFunction(t.size)?Math.min(Math.round(e.pt2px(t.size(i,n,o)*t.sizeRatio)),127):u;if(_._dynamicPropertyMap.set("_size",m),s.isFunction(t.outlineSize)){const i=(i,n,o)=>Math.min(Math.floor(h*e.pt2px(t.outlineSize(i,n,o)*t.sizeRatio)),127);_._dynamicPropertyMap.set("_haloSize",i)}else _._haloSize=Math.min(Math.floor(h*e.pt2px(t.outlineSize*t.sizeRatio)),127);let f;s.isFunction(t.offsetX)||(f=Math.round(e.pt2px(t.offsetX*t.sizeRatio)));const y=(i,n,o)=>s.isFunction(t.offsetX)?Math.round(e.pt2px(t.offsetX(i,n,o)*t.sizeRatio)):f;let M;_._dynamicPropertyMap.set("_xOffset",y),s.isFunction(t.offsetY)||(M=Math.round(e.pt2px(t.offsetY*t.sizeRatio)));const d=(i,n,o)=>s.isFunction(t.offsetY)?Math.round(e.pt2px(t.offsetY(i,n,o)*t.sizeRatio)):M;_._dynamicPropertyMap.set("_yOffset",d),s.isFunction(t.angle)?_._dynamicPropertyMap.set("_angle",t.angle):_._angle=t.angle,s.isFunction(t.horizontalAlignment)?_._dynamicPropertyMap.set("_horizontalAlignment",t.horizontalAlignment):_._horizontalAlignment=t.horizontalAlignment,s.isFunction(t.verticalAlignment)?_._dynamicPropertyMap.set("_verticalAlignment",t.verticalAlignment):_._verticalAlignment=t.verticalAlignment,_._scaleFactor=p,s.isFunction(t.text)?_._dynamicPropertyMap.set("_text",t.text):_._text=t.text;const x=Math.min(Math.round(e.pt2px(t.referenceSize*t.sizeRatio)),127);_._referenceSize=Math.round(Math.sqrt(256*x)),_._materialKey=t.materialKey;const g=r.TextMaterialKey.load(_._materialKey);return g.sdf=!0,_._bitset=(1===t.alignment?1:0)|(t.colorLocked?1:0)<<1,_._materialKey=g.data,_._decoration="none",_._lineHeight=1,_._lineWidth=512,_._textPlacement=t.markerPlacement,_._effects=t.effects,_._isCIM=!0,_}t._inheritsLoose(c,l),c.fromCIMText=function(t,e){const[i,n]=s.getMinMaxZoom(t.scaleInfo,e);return new c(t,i,n)};var m=c.prototype;return m.analyze=function(){var e=t._asyncToGenerator((function*(t,e,i,n){const o=e.readLegacyFeature(),a=u(this._cimTextLayer,o,i,n),r=yield t.getMosaicItem(this._cimTextLayer.cim,_.codepoints(a));return this._textToGlyphs.set(a,r.glyphMosaicItems),r}));function i(t,i,n,o){return e.apply(this,arguments)}return i}(),m.bindFeature=function(t,e,n){const o=t.readLegacyFeature();if(this._dynamicPropertyMap.forEach(((t,i)=>{this[i]=t(o,e,n)})),!this._text||0===this._text.length)return void(this._shapingInfo=null);this._size*=this._scaleFactor,this._scale=this._size/p,this._xOffset*=this._scaleFactor,this._yOffset*=this._scaleFactor,this._xAlignD=i.getXAnchorDirection(this._horizontalAlignment||"center"),this._yAlignD=i.getYAnchorDirection(this._verticalAlignment||"baseline");const a=this._textToGlyphs.get(this._text);this.bindTextInfo(a,!1)},c}(l(c))}));