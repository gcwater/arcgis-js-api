/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../chunks/_rollupPluginBabelHelpers","../../../core/screenUtils","../engine/webgl/alignmentUtils","../engine/webgl/definitions","../engine/webgl/mesh/templates/shapingUtils","../engine/webgl/util/BidiText"],(function(e,t,n,i,l,o,s){"use strict";function a(e,t,n){return r.apply(this,arguments)}function r(){return(r=t._asyncToGenerator((function*(e,t,a){const r=i.getXAnchorDirection("center"),g=i.getYAnchorDirection("middle"),c=t.textureManager.rasterizeItem(e.toJSON(),window.devicePixelRatio||1,null,a),[,h]=s.bidiText(e.text),p=(yield c).glyphMosaicItems;return o.shapeGlyphs(p,h,{angle:e.angle||0,xOffset:n.pt2px(e.xoffset||0),yOffset:n.pt2px(e.yoffset||0),lineHeight:l.MAGIC_LABEL_LINE_HEIGHT*Math.max(.25,Math.min(e.lineHeight,4)),maxLineWidth:Math.max(32,Math.min(n.pt2px(e.lineWidth),512)),decoration:e.font.decoration,scale:Math.min(Math.round(n.pt2px(e.font.size)),127)/l.GLYPH_SIZE,hAlign:r,vAlign:g,isCIM:!1}).boundsT}))).apply(this,arguments)}e.getTextBounds=a,Object.defineProperty(e,"__esModule",{value:!0})}));