/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../../../chunks/_rollupPluginBabelHelpers","../../../../../core/colorUtils","../../../../../core/Evented","../../../../../core/Handles","../../../../../core/mathUtils","../../../../../core/maybe","../../../../../chunks/mat4","../../../../../chunks/mat4f64","../../../../../chunks/vec3","../../../../../chunks/vec3f64","../../Manipulator3D","../../manipulatorUtils","../dragEventPipeline3D","../settings","./config","./Manipulation","./moveUtils","../../../webgl-engine/lib/GeometryUtil","../../../../interactive/dragEventPipeline"],(function(e,t,a,r,i,n,o,s,l,u,c,p,d,h,m,M,g,_,f,v){"use strict";let y=function(e){function g(t){var a;return(a=e.call(this)||this)._handles=new i,a._radius=M.DISC_RADIUS,a.events=new r,a._tool=t.tool,a._view=t.view,null!=t.radius&&(a._radius=t.radius),a.createManipulator(),a.forEachManipulator((e=>a._tool.manipulators.add(e))),a}t._inheritsLoose(g,e);var y=g.prototype;return y.destroy=function(){this._handles.destroy(),this.forEachManipulator((e=>{this._tool.manipulators.remove(e),e.destroy()}))},y.forEachManipulator=function(e){e(this._manipulator,0)},y.createGraphicDragPipeline=function(e,t,a){const r=o.unwrap(t.graphic.geometry).spatialReference;return _.createGraphicMoveDragPipeline(t,a,(t=>this.createDragPipeline(((a,r,i,n,o)=>t(a,e(a,r,i,n,o),i)),r)),this._view.state.viewingMode)},y.createDragPipeline=function(e,t){const a=this._view;return v.createManipulatorDragEventPipeline(this._manipulator,((r,i,n,o,s)=>{const l=i.next((e=>({...e,manipulatorType:0}))).next(h.screenToZConstrained(a,r.renderLocation,t)).next(v.addScreenDelta());e(r,l,n,o,s)}))},y.updateManipulator=function(){const e=this._radius/M.DISC_RADIUS,t=m.settings.zManipulator.height*e,r=m.settings.zManipulator.coneHeight*e,i=m.settings.zManipulator.coneWidth*e,n=m.settings.zManipulator.width*e,o=[c.fromValues(0,0,0),c.fromValues(0,0,t)],u=f.createTubeGeometry(o,n/2,16,!1),p=f.createConeGeometry(r,i/2,16,!1),h=[c.fromValues(0,0,0),c.fromValues(0,0,t+r)],g=(e=>{const a=l.create();if(s.translate(a,a,[0,0,t]),s.rotateX(a,a,Math.PI/2),e){const t=1+2*e/i;s.scale(a,a,[t,t,t])}return a})(0),_=(e,t)=>{const r=a.darken(m.settings.zManipulator.color,t);return[r.r/255,r.g/255,r.b/255,m.settings.zManipulator.color.a*e]},v=d.createManipulatorMaterial(_(1,.25),1),y=d.createManipulatorMaterial(_(1,0),1),w=d.createManipulatorMaterial(_(.7,0),m.settings.zManipulator.renderOccluded),k=d.createManipulatorMaterial(_(.85,0),m.settings.zManipulator.renderOccluded);this._manipulator.renderObjects=[{geometry:p,transform:g,material:v,stateMask:1},{geometry:u,material:v,stateMask:1},{geometry:p,transform:g,material:y,stateMask:2},{geometry:u,material:y,stateMask:2},{geometry:p,transform:g,material:w,stateMask:1},{geometry:u,material:w,stateMask:1},{geometry:p,transform:g,material:k,stateMask:2},{geometry:u,material:k,stateMask:2}],this._manipulator.radius=n/2+2,this._manipulator.collisionType={type:"line",paths:[h]}},y.createManipulator=function(){const e=new p.Manipulator3D({view:this._view,autoScaleRenderObjects:!1,worldSized:!1,selectable:!1,cursor:"ns-resize",elevationInfo:this.elevationInfo,worldOriented:!0,collisionPriority:1.6});e.applyObjectTransform=e=>{const t=this._view.state.camera,a=w;this._view.renderCoordsHelper.toRenderCoords(this._manipulator.elevationAlignedLocation,a);const r=u.dist(t.eye,a),i=t.computeRenderPixelSizeAtDist(r),o=u.subtract(k,a,t.eye);u.normalize(o,o);const s=D;this._view.renderCoordsHelper.worldUpAtPosition(w,s);const l=Math.abs(u.dot(o,s)),c=u.cross(k,o,s),p=u.cross(k,c,s),d=n.clamp(l,.01,1),h=1-Math.sqrt(1-d*d)/d/t.fullWidth,g=this._radius/M.DISC_RADIUS,_=m.settings.zManipulator.width*g;u.scale(p,u.normalize(p,p),(1/h-1)*r+i*_),e[12]-=k[0],e[13]-=k[1],e[14]-=k[2]},this._manipulator=e,this.updateManipulator()},t._createClass(g,[{key:"radius",get:function(){return this._radius},set:function(e){e!==this._radius&&(this._radius=e,this.updateManipulator())}},{key:"test",get:function(){return{manipulator:this._manipulator}}}]),g}(g.Manipulation);const w=c.create(),k=c.create(),D=c.create();e.MoveZManipulation=y,Object.defineProperty(e,"__esModule",{value:!0})}));