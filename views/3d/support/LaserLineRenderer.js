/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../chunks/_rollupPluginBabelHelpers","../../../core/mathUtils","../../../core/maybe","../../../chunks/vec2f64","../../../chunks/vec3","../../../chunks/vec3f64","../../../chunks/vec4","../../../chunks/vec4f64","../../../geometry/support/clipRay","../../../geometry/support/frustum","../../../geometry/support/lineSegment","../../../geometry/support/plane","../../../geometry/support/ray","../../../chunks/sphere","./LaserlinePathData","../webgl-engine/lib/glUtil3D","../webgl-engine/lib/Util","../webgl-engine/materials/internal/MaterialUtil","../webgl-engine/shaders/LaserlinePathTechnique","../webgl-engine/shaders/LaserlineTechnique"],(function(e,t,i,n,s,a,r,c,h,l,o,_,u,d,f,p,g,m,b,P,V){"use strict";const E=r.create(),q=h.create(),L={glowColor:[1,.5,0],glowWidth:8,glowFalloff:8,innerColor:[1,1,1],innerWidth:1,globalAlpha:.75,angleCutoff:i.deg2rad(6),globalAlphaContrastBoost:2};function D(e,t,i,n){const s=E,r=q;a.transformMat4(s,t,n),a.copy(r,i),r[3]=0,c.transformMat4(r,r,n),u.fromPositionAndNormal(s,r,e)}let y=function(){function e(e,t={},i={contrastControlEnabled:!1}){this._renderCoordsHelper=e,this._config=i,this._technique=null,this._projInfo=h.create(),this._zScale=s.create(),this._heightManifoldEnabled=!1,this._heightManifoldTarget=r.create(),this._pointDistanceEnabled=!1,this._pointDistanceOrigin=r.create(),this._pointDistanceTarget=r.create(),this._lineVerticalPlaneEnabled=!1,this._lineVerticalPlaneSegment=_.create(),this._intersectsLineEnabled=!1,this._intersectsLineSegment=_.create(),this._intersectsLineRadius=3,this._intersectsLineInfinite=!1,this._pathVerticalPlaneEnabled=!1,this._pathVerticalPlaneData=null,this._pathTechnique=null,this.canRender=!0,this._tempNormal=r.create(),this._tempDir=r.create(),this._tempUp=r.create(),this._tempVec3A=r.create(),this._tempVec3B=r.create(),this._tempVec4=h.create(),this._tempPlane=u.create(),this._tempSphere=f.create(),this._params=b.copyParameters(t,L)}var i=e.prototype;return i.setParameterValues=function(e){b.updateParameters(this._params,e)&&this._requestRender()},i.initializeRenderContext=function(e){this._context=e;const t=e.renderContext.rctx;this._quadVAO=g.createQuadVAO(t),this._techniqueRepository=e.shaderTechniqueRep,this._techniqueConfig=new V.LaserlineTechniqueConfiguration;const i=new P.LaserlinePathTechniqueConfiguration;i.contrastControlEnabled=this._config.contrastControlEnabled,this._pathTechnique=this._techniqueRepository.acquire(P.LaserlinePathTechnique,i)},i.uninitializeRenderContext=function(){this._quadVAO=n.disposeMaybe(this._quadVAO),this._technique=n.releaseMaybe(this._technique),this._pathVerticalPlaneData=n.disposeMaybe(this._pathVerticalPlaneData),this._pathTechnique=n.releaseMaybe(this._pathTechnique)},i.render=function(e){const t=this.heightManifoldEnabled||this.pointDistanceEnabled||this.lineVerticalPlaneSegment||this.intersectsLineEnabled,i=this.pathVerticalPlaneEnabled;if(!t&&!i)return!0;const n=e.camera;return m.inverseProjectionInfo(n.projectionMatrix,n.fullWidth,n.fullHeight,this._projInfo,this._zScale),t&&this.renderUnified(e),i&&this.renderPath(e),!0},i.renderUnified=function(e){const t=e.rctx,i=this._selectTechnique(),n=i.program;t.useProgram(n),i.bindPipelineState(t),this._bindGlobalUniforms(e,n),this.bindHeightManifoldUniforms(e,n),this.bindPointDistanceUniforms(e,n),this.bindLineVerticalPlaneUniforms(e,n),this.bindIntersectsLineUniforms(e,n),i.bind(this._params,e.camera),t.bindVAO(this._quadVAO),t.drawArrays(5,0,4)},i.renderPath=function(e){if(n.isNone(this._pathVerticalPlaneData)||n.isNone(this._pathTechnique))return;const t=e.rctx,i=this._pathTechnique,s=i.program;t.useProgram(s),i.bindPipelineState(t),this._bindGlobalUniforms(e,s),i.bind(this._params,this._pathVerticalPlaneData.origin,e.camera),this._pathVerticalPlaneData.draw(e.rctx)},i.bindHeightManifoldUniforms=function(e,t){if(!this.heightManifoldEnabled)return;const i=this._tempVec3A,n=this._tempPlane;this._renderCoordsHelper.worldUpAtPosition(this._heightManifoldTarget,i),D(n,this._heightManifoldTarget,i,e.camera.viewMatrix),t.setUniform4fv("heightPlane",n)},i.bindPointDistanceUniforms=function(e,t){if(!this._pointDistanceEnabled)return;const i=e.camera,n=this._tempSphere;a.copy(n,this._pointDistanceOrigin),a.transformMat4(n,n,i.viewMatrix),n[3]=a.distance(this._pointDistanceOrigin,this._pointDistanceTarget),t.setUniform4f("pointDistanceSphere",n[0],n[1],n[2],n[3])},i.bindLineVerticalPlaneUniforms=function(e,t){if(!this._lineVerticalPlaneEnabled)return;const i=this._renderCoordsHelper,n=e.camera,s=this._tempPlane,r=this._tempVec3A,c=this._tempUp,h=this._tempDir,l=this._tempNormal;_.pointAt(this._lineVerticalPlaneSegment,.5,r),i.worldUpAtPosition(r,c),a.normalize(h,this._lineVerticalPlaneSegment.vector),a.cross(l,c,h),a.normalize(l,l),D(s,this._lineVerticalPlaneSegment.origin,l,n.viewMatrix),t.setUniform4fv("lineVerticalPlane",s);const o=this._tempVec3A;a.copy(o,this._lineVerticalPlaneSegment.origin),i.setAltitude(o,0),a.transformMat4(o,o,n.viewMatrix),t.setUniform3fv("lineVerticalStart",o);const u=this._tempVec3B;a.add(u,this._lineVerticalPlaneSegment.origin,this._lineVerticalPlaneSegment.vector),i.setAltitude(u,0),a.transformMat4(u,u,n.viewMatrix),t.setUniform3fv("lineVerticalEnd",u)},i.bindIntersectsLineUniforms=function(e,t){if(!this._intersectsLineEnabled)return;const i=S,n=R;if(this._intersectsLineInfinite){const t=e.camera;if(l.fromRay(d.wrap(this._intersectsLineSegment.origin,this._intersectsLineSegment.vector),M),M.c0=-Number.MAX_VALUE,!o.intersectClipRay(t.frustum,M))return;l.getStart(M,i),l.getEnd(M,n)}else a.copy(i,this._intersectsLineSegment.origin),a.add(n,this._intersectsLineSegment.origin,this._intersectsLineSegment.vector);const s=this._tempVec3A;a.transformMat4(s,i,e.camera.viewMatrix),t.setUniform3fv("intersectsLineStart",s);const r=this._tempVec4;a.copy(r,this._intersectsLineSegment.vector),this._tempVec4[3]=0,c.transformMat4(this._tempVec4,this._tempVec4,e.camera.viewMatrix),a.transformMat4(n,n,e.camera.viewMatrix),t.setUniform3fv("intersectsLineEnd",n),a.normalize(r,r),t.setUniform3f("intersectsLineDirection",r[0],r[1],r[2]),t.setUniform1f("intersectsLineRadius",this._intersectsLineRadius)},i._bindGlobalUniforms=function(e,t){const i=e.camera;t.setUniform4fv("projInfo",this._projInfo),t.setUniform2fv("zScale",this._zScale),t.setUniform2f("nearFar",i.near,i.far),this._heightManifoldEnabled?t.setUniform1f("maxPixelDistance",2*i.computeScreenPixelSizeAt(this._heightManifoldTarget)):this._pointDistanceEnabled?t.setUniform1f("maxPixelDistance",2*i.computeScreenPixelSizeAt(this._pointDistanceTarget)):this._lineVerticalPlaneEnabled&&t.setUniform1f("maxPixelDistance",2*i.computeScreenPixelSizeAt(this._lineVerticalPlaneSegment.origin)),t.bindTexture(e.offscreenRenderingHelper.linearDepthTexture,"depthMap"),t.bindTexture(e.offscreenRenderingHelper.mainColorTexture,"frameColor")},i._requestRender=function(){this._context&&this._context.requestRender()},i._selectTechnique=function(){return this._techniqueConfig.heightManifoldEnabled=this.heightManifoldEnabled,this._techniqueConfig.lineVerticalPlaneEnabled=this.lineVerticalPlaneEnabled,this._techniqueConfig.pointDistanceEnabled=this.pointDistanceEnabled,this._techniqueConfig.intersectsLineEnabled=this.intersectsLineEnabled,this._techniqueConfig.contrastControlEnabled=this._config.contrastControlEnabled,this._technique=this._techniqueRepository.releaseAndAcquire(V.LaserlineTechnique,this._techniqueConfig,this._technique),this._technique},t._createClass(e,[{key:"renderSlots",get:function(){return[this._config.contrastControlEnabled?17:16]}},{key:"needsLinearDepth",get:function(){return!0}},{key:"heightManifoldEnabled",get:function(){return this._heightManifoldEnabled},set:function(e){this._heightManifoldEnabled!==e&&(this._heightManifoldEnabled=e,this._requestRender())}},{key:"heightManifoldTarget",get:function(){return this._heightManifoldTarget},set:function(e){a.copy(this._heightManifoldTarget,e),this._requestRender()}},{key:"pointDistanceEnabled",get:function(){return this._pointDistanceEnabled},set:function(e){e!==this._pointDistanceEnabled&&(this._pointDistanceEnabled=e,this._requestRender())}},{key:"pointDistanceTarget",get:function(){return this._pointDistanceTarget},set:function(e){a.copy(this._pointDistanceTarget,e),this._requestRender()}},{key:"pointDistanceOrigin",get:function(){return this._pointDistanceOrigin},set:function(e){a.copy(this._pointDistanceOrigin,e),this._requestRender()}},{key:"lineVerticalPlaneEnabled",get:function(){return this._lineVerticalPlaneEnabled},set:function(e){e!==this._lineVerticalPlaneEnabled&&(this._lineVerticalPlaneEnabled=e,this._requestRender())}},{key:"lineVerticalPlaneSegment",get:function(){return this._lineVerticalPlaneSegment},set:function(e){_.copy(e,this._lineVerticalPlaneSegment),this._requestRender()}},{key:"intersectsLineEnabled",get:function(){return this._intersectsLineEnabled},set:function(e){e!==this._intersectsLineEnabled&&(this._intersectsLineEnabled=e,this._requestRender())}},{key:"intersectsLineSegment",get:function(){return this._intersectsLineSegment},set:function(e){_.copy(e,this._intersectsLineSegment),this._requestRender()}},{key:"intersectsLineRadius",get:function(){return this._intersectsLineRadius},set:function(e){e!==this._intersectsLineRadius&&(this._intersectsLineRadius=e,this._requestRender())}},{key:"intersectsLineInfinite",get:function(){return this._intersectsLineInfinite},set:function(e){e!==this._intersectsLineInfinite&&(this._intersectsLineInfinite=e,this._requestRender())}},{key:"pathVerticalPlaneEnabled",get:function(){return this._pathVerticalPlaneEnabled},set:function(e){e!==this._pathVerticalPlaneEnabled&&(this._pathVerticalPlaneEnabled=e,n.isSome(this._pathVerticalPlaneData)&&this._requestRender())}},{key:"pathVerticalPlaneVertices",set:function(e){n.isNone(this._pathVerticalPlaneData)&&(this._pathVerticalPlaneData=new p.LaserlinePathData(this._renderCoordsHelper)),this._pathVerticalPlaneData.vertices=e,this.pathVerticalPlaneEnabled&&this._requestRender()}},{key:"pathVerticalPlaneBuffers",set:function(e){n.isNone(this._pathVerticalPlaneData)&&(this._pathVerticalPlaneData=new p.LaserlinePathData(this._renderCoordsHelper)),this._pathVerticalPlaneData.buffers=e,this.pathVerticalPlaneEnabled&&this._requestRender()}}]),e}();const M=l.create(),S=r.create(),R=r.create();e.LaserLineRenderer=y,Object.defineProperty(e,"__esModule",{value:!0})}));