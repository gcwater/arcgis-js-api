/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../../../chunks/_rollupPluginBabelHelpers","../../../../../chunks/tslib.es6","../../../../../geometry","../../../../../core/Evented","../../../../../core/HandleOwner","../../../../../core/Handles","../../../../../core/lang","../../../../../core/maybe","../../../../../core/promiseUtils","../../../../../core/screenUtils","../../../../../core/accessorSupport/decorators/property","../../../../../core/accessorSupport/ensureType","../../../../../core/has","../../../../../core/Logger","../../../../../core/accessorSupport/decorators/subclass","../../../../../layers/graphics/dehydratedFeatureComparison","../../SnappingDragPipelineStep","../../SnappingVisualizer3D","./DrawManipulator","../../../../draw/DrawingMode","../../../../interactive/coordinateHelper","../../../../interactive/dragEventPipeline","../../../../interactive/editGeometry/EditGeometryHelper","../../../../interactive/snapping/SnappingContext","../../../../support/Scheduler","../../../../interactive/editGeometry/EditGeometry","../../../../../geometry/Point"],(function(e,t,i,n,r,a,o,s,p,c,d,h,l,g,u,m,y,_,v,x,f,S,w,T,V,D,M,k){"use strict";function b(e,t,i){const n=e.x-t.x,r=e.y-t.y;return n*n+r*r<=i}e.DrawOperation=function(e){function i(t){var i;return(i=e.call(this,t)||this)._manipulator=null,i._stagedVertex=null,i.elevationInfo=null,i.snapToSceneEnabled=null,i._handles=new o,i._snappingPipeline=new _.SnappingPipeline,i._createOperationCompleted=!1,i._pointerDownStates=new Set,i._snappingTask=null,i}t._inheritsLoose(i,e);var n=i.prototype;return n.initialize=function(){var e,t;this.coordinateHelper=S.createCoordinateHelper(this.hasZ,this.hasM,this.view.spatialReference,this.view.viewingMode);const i=null==(e=this.view)||null==(t=e.resourceController)?void 0:t.scheduler;this._frameTask=i?i.registerTask(D.TaskPriority.SNAPPING):D.ImmediateTask,this._editGeometry=new T.EditGeometryHelper(new M.EditGeometry(this.coordinateHelper),"segment"===this.geometryType?"polyline":this.geometryType),this._activeComponent=new M.Component(this._editGeometry.editGeometry),this._editGeometry.editGeometry.components.push(this._activeComponent),this._editGeometry.on(["vertex-add","vertex-update","vertex-remove"],(e=>{const t=e.vertices.map((e=>({componentIndex:0,vertexIndex:e.index,coordinates:this.coordinateHelper.toArray(e.pos)}))),i=t.map((e=>e.coordinates));switch(e.type){case"vertex-add":this.emit(e.type,{...e,added:i,vertices:t});break;case"vertex-update":this.emit(e.type,{...e,updated:i,vertices:t});break;case"vertex-remove":this.emit(e.type,{...e,removed:i,vertices:t})}})),this._manipulator=new x.DrawManipulator({grabbableForEvent:e=>"click"!==this.drawingMode||"touch"===e.pointerType&&this._snappingEnabled&&1===this._pointerDownStates.size}),this.manipulators.add(this._manipulator),this._manipulator.grabbable="point"!==this.geometryType;const n=this.createManipulatorDragPipeline(this._manipulator),r=this._manipulator.events.on("immediate-double-click",(e=>{this._manipulator.dragging||"point"===this.geometryType||(this.complete(),e.stopPropagation())})),a=this._manipulator.events.on("immediate-click",(e=>{if(this._manipulator.dragging)return;const t=this._activeComponent,i=this._closeOnClickVertexIndex(e.screenPoint);if(p.isSome(i))this.discardStagedVertex(),this.complete();else{const i=this._screenToMap(e.screenPoint);if(p.isSome(i))switch(this.drawingMode){case"freehand":"point"===this.geometryType&&(this.hasStagedVertex?this.commitStagedVertex():this._editGeometry.appendVertex(this.coordinateHelper.fromPoint(i)),this.complete());break;case"click":case"hybrid":this._snappingTask=p.abortMaybe(this._snappingTask),this.hasStagedVertex?this.commitStagedVertex():this._editGeometry.appendVertex(this.coordinateHelper.fromPoint(i)),("point"===this.geometryType||"segment"===this.geometryType&&2===t.vertices.length||"segment"===this.geometryType&&"hybrid"===this.drawingMode&&1===t.vertices.length)&&this.complete()}}e.stopPropagation()}));this._handles.add([n,a,r])},n.createManipulatorDragPipeline=function(e){switch(this.drawingMode){case"click":return this.createManipulatorDragPipelineClick(e);case"freehand":return this.createManipulatorDragPipelineFreehand(e);case"hybrid":return this.createManipulatorDragPipelineHybrid(e)}},n.createManipulatorDragPipelineClick=function(e){return w.createManipulatorDragEventPipeline(e,((e,t,i,n)=>{const r="touch"===n&&this._snappingEnabled;!this.isCompleted&&r&&(t.next(this._screenToMapDragEventStep()).next((e=>("start"===e.action&&(this.stagedVertex=e.mapStart,("segment"===this.geometryType||r&&0===this.numVertices)&&this.commitStagedVertex()),e))).next(this._snappingPipeline.createSnapDragEventPipelineStep({predicate:()=>r,cancel:i,snappingManager:this.snappingManager,snappingContext:new V.SnappingContext({geometry:this._editGeometry,elevationInfo:this.elevationInfo,pointer:n,visualizer:new v.SnappingVisualizer3D}),updatingHandles:this.updatingHandles}),this._snappingPipeline.next).next((e=>(r&&(this.stagedVertex=e.mapEnd,"end"===e.action&&this.commitStagedVertex()),e))).next((e=>("end"===e.action&&("segment"!==this.geometryType&&"point"!==this.geometryType||this.complete()),e))),i.next((()=>{r&&p.isSome(this.snappingManager)&&this.snappingManager.doneSnapping()})))}))},n.createManipulatorDragPipelineFreehand=function(e){return w.createManipulatorDragEventPipeline(e,((e,t)=>{this.isCompleted||t.next(this._screenToMapDragEventStep()).next((e=>("start"===e.action&&(this.stagedVertex=e.mapStart,"segment"===this.geometryType&&this.commitStagedVertex()),e))).next((e=>{switch(e.action){case"start":case"update":this.stagedVertex=e.mapEnd,"polygon"!==this.geometryType&&"polyline"!==this.geometryType||this.commitStagedVertex();break;case"end":this.complete()}return e}))}))},n.createManipulatorDragPipelineHybrid=function(e){return w.createManipulatorDragEventPipeline(e,((e,t)=>{this.isCompleted||t.next(this._screenToMapDragEventStep()).next((e=>("start"===e.action&&(this.stagedVertex=e.mapStart,this.commitStagedVertex()),e))).next((e=>{switch(e.action){case"start":case"update":this.stagedVertex=e.mapEnd,"polygon"!==this.geometryType&&"polyline"!==this.geometryType||this.commitStagedVertex();break;case"end":"segment"!==this.geometryType&&"point"!==this.geometryType||this.complete()}return e}))}))},n.destroy=function(){this._handles.destroy(),this._handles=null,this._editGeometry.destroy(),this._frameTask.remove()},n.onInputEvent=function(e){switch(e.type){case"pointer-down":this._pointerDownStates.add(e.pointerId);break;case"pointer-up":this._pointerDownStates.delete(e.pointerId)}switch(e.type){case"pointer-move":return this._onPointerMove(e);case"hold":return this._onHold(e)}},n.redo=function(){this._editGeometry.redo()},n.undo=function(){p.isSome(this.snappingManager)&&this.snappingManager.doneSnapping(),this._editGeometry.undo()},n.complete=function(e=!1){p.abortMaybe(this._snappingTask),p.isSome(this.snappingManager)&&this.snappingManager.doneSnapping(),"polyline"===this.geometryType||"polygon"===this.geometryType?this.discardStagedVertex():this.commitStagedVertex();const t="polyline"===this.geometryType&&this.numVertices<2||"polygon"===this.geometryType&&this.numVertices<3;this._createOperationCompleted=!t,(this.isCompleted||e)&&this.emit("complete",{vertices:this.vertices.map(((e,t)=>({componentIndex:0,vertexIndex:t,coordinates:e}))),aborted:e,type:"complete"})},n.cancel=function(){this.complete(!0)},n.commitStagedVertex=function(){if(this._snappingTask=p.abortMaybe(this._snappingTask),p.isSome(this._stagedVertex)){const e=this._stagedVertex;this._stagedVertex=null,this._editGeometry.appendVertex(this.coordinateHelper.fromPoint(e))}},n.discardStagedVertex=function(){this._stagedVertex=null},n._onPointerMove=function(e){var i=this;if(p.abortMaybe(this._snappingTask),this._manipulator.dragging||this._pointerDownStates.has(e.pointerId)||this._manipulator.grabbing||!this._manipulator.interactive)return;const n=d.createScreenPoint(e.x,e.y),r=this._closeOnClickVertexIndex(n);if(p.isSome(r)){this.discardStagedVertex();const e={componentIndex:0,vertexIndex:r,coordinates:this.coordinateHelper.toArray(this._activeComponent.vertices[r].pos)};this.emit("cursor-update",{updated:null,vertices:[e],operation:"apply",type:"vertex-update"})}else{const r=this._screenToMap(n);if(this._manipulator.cursor=p.isSome(r)?"crosshair":null,p.isSome(r))if(p.isSome(this.snappingManager)){const n=this.snappingManager,a=new V.SnappingContext({geometry:this._editGeometry,elevationInfo:this.elevationInfo,pointer:e.pointerType,visualizer:new v.SnappingVisualizer3D});this.stagedVertex=n.update(r,a),this._snappingTask=c.createTask(function(){var e=t._asyncToGenerator((function*(e){const t=yield i._frameTask.schedule((()=>n.snap(r,a,e)),e);t.valid&&(yield i._frameTask.schedule((()=>{i.stagedVertex=t.apply()}),e))}));return function(t){return e.apply(this,arguments)}}()),this.updatingHandles.addPromise(this._snappingTask.promise)}else this.stagedVertex=r}e.stopPropagation()},n._onHold=function(e){p.abortMaybe(this._snappingTask),"click"===this.drawingMode&&"touch"===e.pointerType&&this._snappingEnabled&&(this.stagedVertex=e.mapPoint),e.stopPropagation()},n._screenToMapDragEventStep=function(){let e=null;return t=>{if("start"===t.action&&(e=this._screenToMap(t.screenStart)),p.isNone(e))return null;const i=this._screenToMap(t.screenEnd);return p.isSome(i)?{...t,mapStart:e,mapEnd:i}:null}},n._screenToMap=function(e){return this._getDrawSurface().screenToMap(e)},n._mapToScreen=function(e){return this._getDrawSurface().mapToScreen(e)},n._getDrawSurface=function(){if(!this.coordinateHelper.hasZ)return this.elevationDrawSurface.defaultZ=null,this.elevationDrawSurface;let e=this.defaultZ,t=!1;p.isSome(this.elevationInfo)&&"absolute-height"===this.elevationInfo.mode&&(t=!0),p.isSome(this.snapToSceneEnabled)&&(t=this.snapToSceneEnabled),p.isSome(this.elevationInfo)&&"on-the-ground"===this.elevationInfo.mode&&(t=!1);const i=this._activeComponent.vertices.length;return("segment"===this.geometryType||"polygon"===this.geometryType)&&i>0&&(e=this.coordinateHelper.getZ(this._activeComponent.vertices[0].pos),t=!1),t?this.sceneDrawSurface:(this.elevationDrawSurface.defaultZ=e,this.elevationDrawSurface)},n._vertexWithinPointerDistance=function(e,t){const i=25,n=this._mapToScreen(e);return!!p.isSome(n)&&b(n,t,i)},n._closeOnClickVertexIndex=function(e){const t=this._activeComponent;if("polygon"===this.geometryType&&t.vertices.length>2){if(this._vertexWithinPointerDistance(this.coordinateHelper.toPoint(t.vertices[0].pos,P),e))return 0;if(this._vertexWithinPointerDistance(this.coordinateHelper.toPoint(t.vertices[t.vertices.length-1].pos,P),e))return t.vertices.length-1}return null},t._createClass(i,[{key:"drawingMode",set:function(e){this._set("drawingMode",null!=e?e:f.defaultDrawingMode)}},{key:"updating",get:function(){return this.updatingHandles.updating}},{key:"isCompleted",get:function(){return this._createOperationCompleted}},{key:"_snappingEnabled",get:function(){return p.isSome(this.snappingManager)&&this.snappingManager.options.effectiveEnabled}},{key:"canRedo",get:function(){return this._editGeometry.canRedo}},{key:"canUndo",get:function(){return this._editGeometry.canUndo}},{key:"interactive",get:function(){return this._manipulator.interactive},set:function(e){this._manipulator.interactive=e}},{key:"numVertices",get:function(){return p.isSome(this._stagedVertex)?this._activeComponent.vertices.length+1:this._activeComponent.vertices.length}},{key:"numCommittedVertices",get:function(){return this._activeComponent.vertices.length}},{key:"vertices",get:function(){const e=this.committedVertices;return p.isSome(this._stagedVertex)&&e.push(this.coordinateHelper.pointToArray(this._stagedVertex)),e}},{key:"committedVertices",get:function(){return this._activeComponent.vertices.map((e=>this.coordinateHelper.toArray(e.pos)))}},{key:"spatialReference",get:function(){return this.view.spatialReference}},{key:"hasStagedVertex",get:function(){return p.isSome(this._stagedVertex)}},{key:"stagedVertex",get:function(){return this._stagedVertex},set:function(e){if(p.isNone(e))this.discardStagedVertex();else{if(p.isNone(this._stagedVertex))this._stagedVertex=s.clone(e);else{if(y.pointEquals(this._stagedVertex,e))return;this._stagedVertex.x=e.x,this._stagedVertex.y=e.y,this._stagedVertex.z=e.z,this._stagedVertex.m=e.m,this._stagedVertex.hasZ=e.hasZ,this._stagedVertex.hasM=e.hasM,this._stagedVertex.spatialReference=e.spatialReference}this.emit("cursor-update",{updated:null,vertices:[{componentIndex:0,vertexIndex:this._activeComponent.vertices.length,coordinates:this.coordinateHelper.pointToArray(e)}],operation:"apply",type:"vertex-update"})}}}]),i}(r.EventedMixin(a.HandleOwner)),i.__decorate([h.property({constructOnly:!0})],e.DrawOperation.prototype,"view",void 0),i.__decorate([h.property({value:f.defaultDrawingMode})],e.DrawOperation.prototype,"drawingMode",null),i.__decorate([h.property({constructOnly:!0})],e.DrawOperation.prototype,"geometryType",void 0),i.__decorate([h.property({constructOnly:!0})],e.DrawOperation.prototype,"elevationInfo",void 0),i.__decorate([h.property()],e.DrawOperation.prototype,"snapToSceneEnabled",void 0),i.__decorate([h.property({constructOnly:!0})],e.DrawOperation.prototype,"manipulators",void 0),i.__decorate([h.property({constructOnly:!0})],e.DrawOperation.prototype,"hasZ",void 0),i.__decorate([h.property({constructOnly:!0})],e.DrawOperation.prototype,"hasM",void 0),i.__decorate([h.property()],e.DrawOperation.prototype,"defaultZ",void 0),i.__decorate([h.property({constructOnly:!0})],e.DrawOperation.prototype,"sceneDrawSurface",void 0),i.__decorate([h.property({constructOnly:!0})],e.DrawOperation.prototype,"elevationDrawSurface",void 0),i.__decorate([h.property({constructOnly:!0})],e.DrawOperation.prototype,"snappingManager",void 0),i.__decorate([h.property({readOnly:!0})],e.DrawOperation.prototype,"updating",null),e.DrawOperation=i.__decorate([m.subclass("esri.views.3d.interactive.editingTools.draw3D.DrawOperation")],e.DrawOperation);const P=new k({x:0,y:0,z:0});Object.defineProperty(e,"__esModule",{value:!0})}));