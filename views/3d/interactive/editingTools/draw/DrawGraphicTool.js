/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../../../chunks/_rollupPluginBabelHelpers","../../../../../chunks/tslib.es6","../../../../../Graphic","../../../../../core/has","../../../../../core/Evented","../../../../../core/HandleOwner","../../../../../core/maybe","../../../../../core/watchUtils","../../../../../core/accessorSupport/decorators/property","../../../../../core/accessorSupport/ensureType","../../../../../core/Logger","../../../../../core/accessorSupport/decorators/subclass","../../../../../layers/GraphicsLayer","../../../../../support/elevationInfoUtils","../settings","./DrawOperation","./drawSurfaces","../../visualElements/OutlineVisualElement","../../visualElements/VerticesVisualElement","../../../layers/graphics/GraphicState","../../../../draw/support/createUtils","../../../../draw/support/surfaceCoordinateSystems","../../../../interactive/InteractiveToolBase"],(function(e,t,i,r,a,o,n,s,l,c,p,h,u,d,y,_,m,v,w,f,V,g,G,E){"use strict";function O(e){switch(e){case"point":case"polyline":case"polygon":return e;case"circle":case"rectangle":return"segment";default:return null}}e.DrawGraphicTool=function(e){function i(t){var i;return(i=e.call(this,t)||this).drawOperation=null,i._createGraphic=null,i._createGraphicState=null,i._outlineVisualElement=null,i._verticesVisualElement=null,i._activeVertexVisualElement=null,i.hasZ=!0,i.defaultZ=0,i.elevationInfo=null,i.snapToScene=!1,i.snappingManager=null,i.mode=null,i.geometryType=null,i.type="draw-3d",i}t._inheritsLoose(i,e);var a=i.prototype;return a.initialize=function(){const e=s.unwrapOr(this.elevationInfo,{mode:this.hasZ?"absolute-height":"on-the-ground",offset:0});this._internalGraphicsLayer=new d({elevationInfo:e,listMode:"hide",internal:!0}),this.view.map.layers.add(this._internalGraphicsLayer),this.drawOperation=new m.DrawOperation({view:this.view,manipulators:this.manipulators,geometryType:O(this.geometryType),drawingMode:this.mode,hasZ:this.hasZ,defaultZ:this.defaultZ,snapToSceneEnabled:this.snapToScene,sceneDrawSurface:new v.SceneDrawSurface(this.view,e,[this._internalGraphicsLayer]),elevationDrawSurface:new v.ElevationDrawSurface(e,this.defaultZ,this.view,this._internalGraphicsLayer),hasM:!1,elevationInfo:e,snappingManager:this.snappingManager}),this.drawOperation.on("vertex-add",(e=>this.onVertexAdd(e))),this.drawOperation.on("vertex-remove",(e=>this.onVertexRemove(e))),this.drawOperation.on("vertex-update",(e=>this.onVertexUpdate(e))),this.drawOperation.on("cursor-update",(e=>this.onCursorUpdate(e))),this.drawOperation.on("complete",(e=>this.onComplete(e))),this.complete()},a.destroy=function(){this.drawOperation.destroy(),this.drawOperation=null,this._destroyAllVisualisations(),this.view.map.remove(this._internalGraphicsLayer),this._set("view",null)},a.onInputEvent=function(e){this.drawOperation.onInputEvent(e)},a._getCreateGeometry=function(e={operationComplete:!1}){if(null==this.drawOperation||0===this.drawOperation.numVertices)return null;const t=this.drawOperation.stagedVertex,i=this.drawOperation.committedVertices,r=i.slice();s.isSome(t)&&r.push(this.drawOperation.coordinateHelper.pointToArray(t));const a=s.isSome(t)?this.drawOperation.coordinateHelper.pointToArray(t):i.splice(-1)[0],o={regularVertices:null,activeVertex:null,full:null,outline:null},n=r.length,l=this.drawOperation.spatialReference,c="3d"===this.view.type&&"global"===this.view.viewingMode;switch(this.geometryType){case"point":o.regularVertices=i,o.activeVertex=a,o.full=this.drawOperation.coordinateHelper.createPointFromArray(r[0]);break;case"polyline":o.regularVertices=i,o.activeVertex=a,n>0&&(o.full=g.createPolyline([r],l,c));break;case"polygon":o.regularVertices=i,o.activeVertex=a,n>0&&(o.full=g.createPolygon([r],l,c,!0));break;case"circle":if(n>0){const t=G.createViewAlignedCoordinateSystem(this.view,r[0]);if(1===n&&e.operationComplete){const e=r[0],i=t.makeMapPoint(e[0]+S*this.view.resolution,e[1]);o.full=g.createCircle([e,i],t,!0)}else 2===n&&(o.full=this.forceUniformSize?g.createCircle(r,t,this.centered):g.createEllipse(r,t,this.centered))}break;case"rectangle":if(n>0){const t=G.createViewAlignedCoordinateSystem(this.view,r[0]);if(1===n&&e.operationComplete){const e=r[0],i=t.makeMapPoint(e[0]+S*this.view.resolution,e[1]);o.full=g.createSquare([e,i],t,!0)}else 2===n&&(o.full=this.forceUniformSize?g.createSquare(r,t,this.centered):g.createRectangle(r,t,this.centered))}break;default:return null}switch(this.geometryType){case"point":break;case"polyline":case"polygon":n>1&&(o.outline=g.createPolyline([r],l,c));break;case"circle":case"rectangle":s.isSome(o.full)&&"polygon"===o.full.type&&(o.outline=g.createPolygon(o.full.rings,l,c))}return o},a._destroyAllVisualisations=function(){this._destroyCreateGraphic(),this._destroyOutlineVisualElement(),this._destroyVerticesVisualElement(),this._destroyStagedVerticesVisualElement()},a._destroyCreateGraphic=function(){s.isSome(this._createGraphic)&&(this._internalGraphicsLayer.remove(this._createGraphic),this._createGraphic=s.destroyMaybe(this._createGraphic)),this._createGraphicState=null,this.handles.remove(T)},a._destroyOutlineVisualElement=function(){this._outlineVisualElement=s.destroyMaybe(this._outlineVisualElement)},a._destroyVerticesVisualElement=function(){this._verticesVisualElement=s.destroyMaybe(this._verticesVisualElement)},a._destroyStagedVerticesVisualElement=function(){this._activeVertexVisualElement=s.destroyMaybe(this._activeVertexVisualElement)},a._updateCreateGraphic=function(){const e=this._getCreateGeometry();if(s.isNone(e))return void this._destroyAllVisualisations();const t=this._internalGraphicsLayer.elevationInfo;s.isSome(e.outline)?s.isNone(this._outlineVisualElement)?(this._outlineVisualElement=new w.OutlineVisualElement({view:this.view,geometry:e.outline,elevationInfo:t,isDraped:s.isSome(this._createGraphicState)?this._createGraphicState.isDraped:"on-the-ground"===y.getEffectiveElevationMode(this.hasZ,t),attached:!1}),_.settings.visualElements.lineGraphics.outline.apply(this._outlineVisualElement),_.settings.visualElements.lineGraphics.shadowStyle.apply(this._outlineVisualElement),this._outlineVisualElement.attached=!0,this._outlineVisualElement.laserlineEnabled=!0):this._outlineVisualElement.geometry=e.outline:this._destroyOutlineVisualElement(),s.isSome(e.regularVertices)?s.isNone(this._verticesVisualElement)?(this._verticesVisualElement=new f.VerticesVisualElement({view:this.view,spatialReference:this.view.spatialReference,vertices:e.regularVertices,elevationInfo:t,renderOccluded:_.settings.reshapeManipulators.vertex.renderOccluded,attached:!1}),this._verticesVisualElement.attached=!0):this._verticesVisualElement.vertices=e.regularVertices:this._destroyVerticesVisualElement(),s.isSome(e.activeVertex)?s.isNone(this._activeVertexVisualElement)?(this._activeVertexVisualElement=new f.VerticesVisualElement({view:this.view,spatialReference:this.view.spatialReference,vertices:[e.activeVertex],elevationInfo:t,renderOccluded:_.settings.reshapeManipulators.vertex.renderOccluded,attached:!1}),this._activeVertexVisualElement.color=_.settings.colorToVec4(_.settings.reshapeManipulators.selected.color),this._activeVertexVisualElement.attached=!0):this._activeVertexVisualElement.vertices=[e.activeVertex]:this._destroyStagedVerticesVisualElement(),s.isSome(e.full)?s.isNone(this._createGraphic)?(this._createGraphic=new r({geometry:e.full,symbol:this.createGraphicSymbol,sourceLayer:this._internalGraphicsLayer,...this.graphicProperties}),this._internalGraphicsLayer.add(this._createGraphic),this.view.maskOccludee(this._createGraphic),this._createGraphicState=new V.GraphicState({graphic:this._createGraphic}),this.handles.add([this.view.trackGraphicState(this._createGraphicState),l.init(this._createGraphicState,"isDraped",(e=>{s.isSome(this._outlineVisualElement)&&(this._outlineVisualElement.isDraped=e)}))],T),this.notifyChange("createGraphic")):this._createGraphic.geometry=e.full:this._destroyCreateGraphic()},a.reset=function(){},a.redo=function(){this.drawOperation.redo()},a.undo=function(){this.drawOperation.undo()},a.completeCreateOperation=function(){this.drawOperation.complete()},a.activate=function(){},a.deactivate=function(){this.drawOperation.isCompleted||this.drawOperation.cancel()},a.getVertexCoords=function(){return this.drawOperation.vertices},a.onVertexAdd=function(e){this._updateCreateGraphic(),this.emit("vertex-add",e)},a.onVertexRemove=function(e){this._updateCreateGraphic(),this.emit("vertex-remove",e)},a.onVertexUpdate=function(e){this._updateCreateGraphic(),this.emit("vertex-update",e)},a.onCursorUpdate=function(e){this._updateCreateGraphic(),this.emit("cursor-update",e)},a.onComplete=function(e){this._updateCreateGraphic();let t=null;if(this.drawOperation.isCompleted){const e=this._getCreateGeometry({operationComplete:!0});s.isSome(e)&&(t=new r({geometry:e.full,symbol:this.createGraphicSymbol,sourceLayer:this._internalGraphicsLayer,...this.graphicProperties}))}this.emit("complete",{graphic:t,...e})},t._createClass(i,[{key:"updating",get:function(){var e,t;return null!=(e=null==(t=this.drawOperation)?void 0:t.updating)&&e}},{key:"createGraphic",get:function(){return this._createGraphic}},{key:"enabled",set:function(e){this.drawOperation.interactive=e,this._set("enabled",e)}},{key:"centered",set:function(e){this._set("centered",e),this._updateCreateGraphic()}},{key:"forceUniformSize",set:function(e){this._set("forceUniformSize",e),this._updateCreateGraphic()}},{key:"canRedo",get:function(){return this.drawOperation.canRedo}},{key:"canUndo",get:function(){return this.drawOperation.canUndo}}]),i}(n.HandleOwnerMixin(o.EventedMixin(E.InteractiveToolBase))),i.__decorate([c.property()],e.DrawGraphicTool.prototype,"drawOperation",void 0),i.__decorate([c.property({readOnly:!0})],e.DrawGraphicTool.prototype,"updating",null),i.__decorate([c.property({constructOnly:!0,nonNullable:!0})],e.DrawGraphicTool.prototype,"view",void 0),i.__decorate([c.property()],e.DrawGraphicTool.prototype,"createGraphicSymbol",void 0),i.__decorate([c.property()],e.DrawGraphicTool.prototype,"createGraphic",null),i.__decorate([c.property({value:!0})],e.DrawGraphicTool.prototype,"enabled",null),i.__decorate([c.property({value:!0})],e.DrawGraphicTool.prototype,"centered",null),i.__decorate([c.property({value:!0})],e.DrawGraphicTool.prototype,"forceUniformSize",null),i.__decorate([c.property({constructOnly:!0})],e.DrawGraphicTool.prototype,"graphicProperties",void 0),i.__decorate([c.property({constructOnly:!0})],e.DrawGraphicTool.prototype,"hasZ",void 0),i.__decorate([c.property({nonNullable:!0})],e.DrawGraphicTool.prototype,"defaultZ",void 0),i.__decorate([c.property({constructOnly:!0})],e.DrawGraphicTool.prototype,"elevationInfo",void 0),i.__decorate([c.property()],e.DrawGraphicTool.prototype,"snapToScene",void 0),i.__decorate([c.property()],e.DrawGraphicTool.prototype,"snappingManager",void 0),i.__decorate([c.property({constructOnly:!0})],e.DrawGraphicTool.prototype,"mode",void 0),i.__decorate([c.property({constructOnly:!0})],e.DrawGraphicTool.prototype,"geometryType",void 0),i.__decorate([c.property({readOnly:!0})],e.DrawGraphicTool.prototype,"type",void 0),e.DrawGraphicTool=i.__decorate([u.subclass("esri.views.3d.interactive.editingTools.draw3D.DrawTool")],e.DrawGraphicTool);const S=48,T="create-graphic";Object.defineProperty(e,"__esModule",{value:!0})}));