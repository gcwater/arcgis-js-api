/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../core/has","../../../../core/Handles","../../../../core/maybe","../../../../chunks/vec3","../../../../chunks/vec3f64","../../../../chunks/vec4","../../../../chunks/vec4f32","../../../../geometry/support/clipRay","../../../../geometry/support/frustum","../../../../geometry/support/lineSegment","../../../../geometry/support/ray","./LaserlineVisualElement","./Object3DVisualElement","../../webgl-engine/lib/GeometryUtil","../../webgl-engine/materials/RibbonLineMaterial"],(function(e,t,i,s,n,r,o,a,l,h,c,u,d,p,_,f,y){"use strict";let m=function(e){function i(t){var i;return(i=e.call(this,t)||this)._ray=d.create(),i._externalResources=null,i._handles=new s,i._isWorldDown=!1,i._start=o.create(),i._end=o.fromValues(1,0,0),i._width=1,i._color=l.fromValues(1,0,1,1),i._polygonOffset=!1,i._writeDepthEnabled=!0,i._innerWidth=0,i._innerColor=l.fromValues(1,1,1,1),i._stippleIntegerRepeats=!0,i._stipplePattern=null,i._stippleOffColor=null,i._falloff=0,i._extensionType=0,i._laserlineStyle=null,i._laserlineEnabled=!1,i._renderOccluded=4,i._fadedExtensions=R,i.applyProps(t),i}t._inheritsLoose(i,e);var _=i.prototype;return _.createExternalResources=function(){const e=new y.RibbonLineMaterial(this.materialParameters);this._handles.add(this.view.state.watch("camera",(()=>{this.updateGeometry()})));const t=new p.LaserlineVisualElement({view:this.view,attached:this._laserlineEnabled});this._externalResources={material:e,laserline:t}},_.destroyExternalResources=function(){n.isSome(this._externalResources)&&this._externalResources.laserline.destroy(),this._externalResources=null,this._handles.removeAll()},_.forEachExternalMaterial=function(e){n.isSome(this._externalResources)&&e(this._externalResources.material)},_.createGeometries=function(e){const t=[o.create(),o.create()],i=3===this.extensionType;i&&t.push(o.create(),o.create());const s=i?new Float32Array([1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0]):null,r=f.createPolylineGeometry(t,null,s);e.addGeometry(r,n.unwrap(this._externalResources).material),this.updateVertices(r)},_.updateVisibility=function(t){e.prototype.updateVisibility.call(this,t),n.isSome(this._externalResources)&&(this._externalResources.laserline.visible=t)},_.setStartEndFromWorldDownAtLocation=function(e){this._isWorldDown=!0,r.copy(this._start,e),this.view.renderCoordsHelper.worldUpAtPosition(e,this._end),r.subtract(this._end,e,this._end),d.fromPoints(this._start,this._end,this._ray),this.updateGeometry()},_.updateMaterial=function(){if(n.isNone(this._externalResources))return;this._externalResources.material.setParameterValues(this.materialParameters)},_.updateGeometry=function(){n.isSome(this.object)&&this.updateVertices(this.object.geometries[0])},_.updateVertices=function(e){const t=3===this._extensionType?this.updateLineSegmentFinite(w):this.updateLineSegmentInfinite(this._extensionType,w);this.updateVertexAttributes(e,t),n.isSome(this._externalResources)&&(this._externalResources.laserline.intersectsLine=t)},_.updateLineSegmentFinite=function(e){return u.fromPoints(this._start,this._end,e)},_.updateLineSegmentInfinite=function(e,t){const i=this.view.state.camera;switch(h.fromRay(this._ray,g),e){case 0:g.c0=-Number.MAX_VALUE;break;case 1:case 2:{const e=this._ray.origin,t=n.unwrapOr(this.view.elevationProvider.getElevation(e[0],e[1],e[2],this.view.renderCoordsHelper.spatialReference,"ground"),0),i=this.view.renderCoordsHelper.getAltitude(e);this._isWorldDown&&i<t&&r.negate(g.ray.direction,g.ray.direction),2===this._extensionType&&null!=t&&(g.c1=Math.abs(i-t));break}}if(!c.intersectClipRay(i.frustum,g))return u.fromPoints(this._start,this._end,t);const s=h.getStart(g,x),o=h.getEnd(g,b);return u.fromPoints(s,o,t)},_.updateVertexAttributes=function(e,t){const i=e.getMutableAttribute("position").data;if(3===this.extensionType){const e=u.pointAt(t,-this.fadedExtensions.start,x);i[0]=e[0],i[1]=e[1],i[2]=e[2];const s=u.pointAt(t,0,x);i[3]=s[0],i[4]=s[1],i[5]=s[2];const n=u.pointAt(t,1,x);i[6]=n[0],i[7]=n[1],i[8]=n[2];const r=u.pointAt(t,1+this.fadedExtensions.end,x);i[9]=r[0],i[10]=r[1],i[11]=r[2]}else{const e=u.pointAt(t,0,x);i[0]=e[0],i[1]=e[1],i[2]=e[2];const s=u.pointAt(t,1,x);i[3]=s[0],i[4]=s[1],i[5]=s[2]}n.isSome(this.object)&&this.object.geometryVertexAttrsUpdated(0)},t._createClass(i,[{key:"start",get:function(){return this._start},set:function(e){this._isWorldDown=!1,r.exactEquals(this._start,e)||(r.copy(this._start,e),d.fromPoints(this._start,this._end,this._ray),this.updateGeometry())}},{key:"end",get:function(){return this._end},set:function(e){this._isWorldDown=!1,r.exactEquals(this._end,e)||(r.copy(this._end,e),d.fromPoints(this._start,this._end,this._ray),this.updateGeometry())}},{key:"width",get:function(){return this._width},set:function(e){e!==this._width&&(this._width=e,this.updateMaterial())}},{key:"color",get:function(){return this._color},set:function(e){a.exactEquals(e,this._color)||(a.copy(this._color,e),this.updateMaterial())}},{key:"polygonOffset",get:function(){return this._polygonOffset},set:function(e){e!==this._polygonOffset&&(this._polygonOffset=e,this.updateMaterial())}},{key:"writeDepthEnabled",get:function(){return this._writeDepthEnabled},set:function(e){this._writeDepthEnabled!==e&&(this._writeDepthEnabled=e,this.updateMaterial())}},{key:"innerWidth",get:function(){return this._innerWidth},set:function(e){e!==this._innerWidth&&(this._innerWidth=e,this.updateMaterial())}},{key:"innerColor",get:function(){return this._innerColor},set:function(e){a.exactEquals(e,this._innerColor)||(a.copy(this._innerColor,e),this.updateMaterial())}},{key:"stippleIntegerRepeats",get:function(){return this._stippleIntegerRepeats},set:function(e){e!==this._stippleIntegerRepeats&&(this._stippleIntegerRepeats=e,this.updateMaterial())}},{key:"stipplePattern",get:function(){return this._stipplePattern},set:function(e){const t=n.isSome(e)!==n.isSome(this._stipplePattern);this._stipplePattern=e,t?this.recreate():this.updateMaterial()}},{key:"stippleOffColor",get:function(){return this._stippleOffColor},set:function(e){(n.isNone(e)||n.isNone(this._stippleOffColor)||!a.exactEquals(e,this._stippleOffColor))&&(this._stippleOffColor=n.isSome(e)?l.clone(e):null,this.updateMaterial())}},{key:"falloff",get:function(){return this._falloff},set:function(e){e!==this._falloff&&(this._falloff=e,this.updateMaterial())}},{key:"extensionType",get:function(){return this._extensionType},set:function(e){e!==this._extensionType&&(this._extensionType=e,this.updateGeometry())}},{key:"_laserlineAttached",get:function(){return this._laserlineEnabled&&n.isSome(this._laserlineStyle)}},{key:"laserlineStyle",get:function(){return this._laserlineStyle},set:function(e){this._laserlineStyle=e,n.isSome(this._externalResources)&&(this._externalResources.laserline.attached=this._laserlineAttached,n.isSome(e)&&(this._externalResources.laserline.style=e))}},{key:"laserlineEnabled",get:function(){return this._laserlineEnabled},set:function(e){this._laserlineEnabled!==e&&(this._laserlineEnabled=e,n.isSome(this._externalResources)&&(this._externalResources.laserline.attached=this._laserlineAttached))}},{key:"renderOccluded",get:function(){return this._renderOccluded},set:function(e){e!==this._renderOccluded&&(this._renderOccluded=e,this.updateMaterial())}},{key:"fadedExtensions",get:function(){return this._fadedExtensions},set:function(e){this._fadedExtensions=n.unwrapOr(e,R),this.recreateGeometry()}},{key:"materialParameters",get:function(){return{width:this._width,color:this._color,stippleOffColor:this._stippleOffColor,stipplePattern:this._stipplePattern,stippleIntegerRepeats:this._stippleIntegerRepeats,innerWidth:this._innerWidth,innerColor:this._innerColor,falloff:this._falloff,polygonOffset:this._polygonOffset,renderOccluded:this._renderOccluded,writeDepth:this._writeDepthEnabled}}}]),i}(_.Object3DVisualElement);const g=h.create(),x=o.create(),b=o.create(),w=u.create(),E=1/3,R={start:E,end:E};e.ExtendedLineVisualElement=m,Object.defineProperty(e,"__esModule",{value:!0})}));