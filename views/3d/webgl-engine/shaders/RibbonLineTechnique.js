/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["require","exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../chunks/tslib.es6","../../../../core/maybe","../core/shaderLibrary/Slice.glsl","../core/shaderLibrary/output/OutputHighlight.glsl","../core/shaderLibrary/shading/MultipassTerrainTest.glsl","../core/shaderLibrary/shading/VisualVariables.glsl","../core/shaderLibrary/util/View.glsl","../core/shaderTechnique/ReloadableShaderModule","../core/shaderTechnique/ShaderTechnique","../core/shaderTechnique/ShaderTechniqueConfiguration","../lib/OrderIndependentTransparency","../lib/Program","../lib/StencilUtils","../../../../chunks/RibbonLine.glsl","../../../webgl/renderState"],(function(e,t,i,r,o,a,n,s,l,p,c,d,u,f,h,m,b,g){"use strict";const v=new Map([["position",0],["subdivisionFactor",1],["uv0",2],["auxpos1",3],["auxpos2",4],["size",6],["sizeFeatureAttribute",6],["color",5],["colorFeatureAttribute",5],["opacityFeatureAttribute",7]]);let y=function(e){function t(t,i,r){var o;return(o=e.call(this,t,i,r)||this).stippleTextureRepository=t.stippleTextureRepository,o}i._inheritsLoose(t,e);var r=t.prototype;return r.initializeProgram=function(e){const i=t.shader.get(),r=this.configuration,o=i.build({OITEnabled:0===r.transparencyPassType,output:r.output,slicePlaneEnabled:r.slicePlaneEnabled,sliceHighlightDisabled:!1,sliceEnabledForVertexPrograms:!1,stippleEnabled:r.stippleEnabled,stippleOffColorEnabled:r.stippleOffColorEnabled,stippleUVMaxEnabled:r.stippleIntegerRepeatsEnabled,stippleIntegerRepeatsEnabled:r.stippleIntegerRepeatsEnabled,roundCaps:r.roundCaps,roundJoins:r.roundJoins,vvColor:r.vvColor,vvSize:r.vvSize,vvInstancingEnabled:!0,vvOpacity:r.vvOpacity,falloffEnabled:r.falloffEnabled,innerColorEnabled:r.innerColorEnabled,multipassTerrainEnabled:r.multipassTerrainEnabled,cullAboveGround:r.cullAboveGround});return new h.Program(e.rctx,o,v)},r.dispose=function(){e.prototype.dispose.call(this),this.stippleTextureRepository.release(this.stipplePattern),this.stipplePattern=null,this.stippleTextureBind=null},r.bindPass=function(e,t){if(p.bindProjectionMatrix(this.program,t.camera.projectionMatrix),4===this.configuration.output&&n.bindOutputHighlight(this.program,t),t.multipassTerrainEnabled&&(this.program.setUniform2fv("inverseViewport",t.inverseViewport),s.bindMultipassTerrainTexture(this.program,t)),this.program.setUniform1f("intrinsicWidth",e.width),this.program.setUniform4fv("intrinsicColor",e.color),this.program.setUniform1f("miterLimit","miter"!==e.join?0:e.miterLimit),this.program.setUniform2fv("cameraNearFar",t.camera.nearFar),this.program.setUniform1f("pixelRatio",t.camera.pixelRatio),this.program.setUniform2f("screenSize",t.camera.fullViewport[2],t.camera.fullViewport[3]),l.bindVisualVariablesUniformsWithOpacity(this.program,e),this.stipplePattern!==e.stipplePattern){const t=e.stipplePattern;this.stippleTextureBind=this.stippleTextureRepository.swap(this.stipplePattern,t),this.stipplePattern=t}if(this.configuration.stippleEnabled){const i=o.isSome(this.stippleTextureBind)?this.stippleTextureBind(this.program)*t.camera.pixelRatio:1;if(this.program.setUniform1f("stipplePatternPixelSizeInv",1/i),this.configuration.stippleOffColorEnabled){const t=o.unwrap(e.stippleOffColor);this.program.setUniform4f("stippleOffColor",t[0],t[1],t[2],t.length>3?t[3]:1)}}this.configuration.falloffEnabled&&this.program.setUniform1f("falloff",e.falloff),this.configuration.innerColorEnabled&&(this.program.setUniform4fv("innerColor",o.unwrapOr(e.innerColor,e.color)),this.program.setUniform1f("innerWidth",e.innerWidth*t.camera.pixelRatio))},r.bindDraw=function(e){p.bindView(this.program,e),a.bindSliceUniformsWithOrigin(this.program,this.configuration,e),this.program.rebindTextures()},r.setPipelineState=function(e,t){const i=this.configuration,r=3===e,o=2===e;return g.makePipelineState({blending:0===i.output||7===i.output?r?f.blendingDefault:f.OITBlending(e):null,depthTest:{func:f.OITDepthTest(e)},depthWrite:r?!i.transparent&&i.writeDepth&&g.defaultDepthWriteParams:f.OITDepthWrite(e),colorWrite:g.defaultColorWriteParams,stencilWrite:i.sceneHasOcludees?m.stencilWriteMaskOn:null,stencilTest:i.sceneHasOcludees?t?m.stencilToolMaskBaseParams:m.stencilBaseAllZerosParams:null,polygonOffset:r||o?i.polygonOffset&&T:f.OITPolygonOffset})},r.initializePipeline=function(){const e=this.configuration,t=e.polygonOffset&&T;return e.occluder&&(this._occluderPipelineTransparent=g.makePipelineState({blending:f.blendingDefault,polygonOffset:t,depthTest:m.depthCompareAlways,depthWrite:null,colorWrite:g.defaultColorWriteParams,stencilWrite:null,stencilTest:m.stencilToolTransparentOccluderParams}),this._occluderPipelineOpaque=g.makePipelineState({blending:f.blendingDefault,polygonOffset:t,depthTest:m.depthCompareAlways,depthWrite:null,colorWrite:g.defaultColorWriteParams,stencilWrite:m.stencilWriteMaskOff,stencilTest:m.stencilToolMaskOccluderParams}),this._occluderPipelineMaskWrite=g.makePipelineState({blending:null,polygonOffset:t,depthTest:m.depthCompareLess,depthWrite:null,colorWrite:null,stencilWrite:m.stencilWriteMaskOn,stencilTest:m.stencilToolMaskBaseParams})),this._occludeePipelineState=this.setPipelineState(this.configuration.transparencyPassType,!0),this.setPipelineState(this.configuration.transparencyPassType,!1)},r.getPipelineState=function(e,t){return t?this._occludeePipelineState:this.configuration.occluder?11===e?this._occluderPipelineTransparent:10===e?this._occluderPipelineOpaque:this._occluderPipelineMaskWrite:this.pipeline},i._createClass(t,[{key:"primitiveType",get:function(){return 5}}]),t}(d.ShaderTechnique);y.shader=new c.ReloadableShaderModule(b.RibbonLineShader,(()=>new Promise((function(t,i){e(["./RibbonLine.glsl"],t,i)}))));const T={factor:0,units:-4};let P=function(e){function t(){var t;return(t=e.apply(this,arguments)||this).output=0,t.occluder=!1,t.slicePlaneEnabled=!1,t.transparent=!1,t.polygonOffset=!1,t.writeDepth=!1,t.stippleEnabled=!1,t.stippleOffColorEnabled=!1,t.stippleIntegerRepeatsEnabled=!1,t.roundCaps=!1,t.roundJoins=!1,t.vvSize=!1,t.vvColor=!1,t.vvOpacity=!1,t.falloffEnabled=!1,t.innerColorEnabled=!1,t.sceneHasOcludees=!1,t.transparencyPassType=3,t.multipassTerrainEnabled=!1,t.cullAboveGround=!1,t}return i._inheritsLoose(t,e),t}(u.ShaderTechniqueConfiguration);r.__decorate([u.parameter({count:8})],P.prototype,"output",void 0),r.__decorate([u.parameter()],P.prototype,"occluder",void 0),r.__decorate([u.parameter()],P.prototype,"slicePlaneEnabled",void 0),r.__decorate([u.parameter()],P.prototype,"transparent",void 0),r.__decorate([u.parameter()],P.prototype,"polygonOffset",void 0),r.__decorate([u.parameter()],P.prototype,"writeDepth",void 0),r.__decorate([u.parameter()],P.prototype,"stippleEnabled",void 0),r.__decorate([u.parameter()],P.prototype,"stippleOffColorEnabled",void 0),r.__decorate([u.parameter()],P.prototype,"stippleIntegerRepeatsEnabled",void 0),r.__decorate([u.parameter()],P.prototype,"roundCaps",void 0),r.__decorate([u.parameter()],P.prototype,"roundJoins",void 0),r.__decorate([u.parameter()],P.prototype,"vvSize",void 0),r.__decorate([u.parameter()],P.prototype,"vvColor",void 0),r.__decorate([u.parameter()],P.prototype,"vvOpacity",void 0),r.__decorate([u.parameter()],P.prototype,"falloffEnabled",void 0),r.__decorate([u.parameter()],P.prototype,"innerColorEnabled",void 0),r.__decorate([u.parameter()],P.prototype,"sceneHasOcludees",void 0),r.__decorate([u.parameter({count:4})],P.prototype,"transparencyPassType",void 0),r.__decorate([u.parameter()],P.prototype,"multipassTerrainEnabled",void 0),r.__decorate([u.parameter()],P.prototype,"cullAboveGround",void 0),t.RibbonLineTechnique=y,t.RibbonLineTechniqueConfiguration=P,t.ribbonVertexAttributeLocations=v,Object.defineProperty(t,"__esModule",{value:!0})}));