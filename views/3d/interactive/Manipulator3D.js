/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../chunks/_rollupPluginBabelHelpers","../../../geometry","../../../core/compilerUtils","../../../core/Evented","../../../core/mathUtils","../../../core/maybe","../../../core/screenUtils","../../../core/accessorSupport/utils","../../../chunks/mat3","../../../chunks/mat3f64","../../../chunks/mat4","../../../chunks/mat4f64","../../../chunks/vec2","../../../chunks/vec3","../../../chunks/vec3f64","../../../geometry/projection","../../../geometry/projectionEllipsoid","../../../geometry/support/aaBoundingRect","../../../geometry/support/lineSegment","../../../geometry/support/plane","../../../geometry/support/ray","../../../geometry/support/vectorStacks","../../../layers/graphics/hydratedFeatures","../support/ElevationProvider","../support/geometryUtils/ray","../webgl-engine/lib/Camera","../webgl-engine/lib/Object3D","../webgl-engine/lib/WebGLLayer","../../../geometry/Point"],(function(e,t,i,n,s,o,r,a,c,l,h,u,d,_,f,g,m,y,p,v,b,L,S,R,j,w,O,A,E,T){"use strict";let P=function(){function e(e){this.idHint=0,this.camera=new O,this._elevation={offset:0,override:null},this.collisionType={type:"point"},this.collisionPriority=0,this._renderObjects=[],this.autoScaleRenderObjects=!0,this._available=!0,this._noDisplayCount=0,this._radius=10,this._worldSized=!1,this.focusMultiplier=2,this.touchMultiplier=2.5,this.worldOriented=!1,this._modelTransform=d.create(),this._worldFrame=null,this._renderLocation=g.create(),this._renderLocationDirty=!0,this._location=new T({x:0,y:0,z:0}),this._elevationAlignedLocation=new T,this._elevationAlignedLocationDirty=!0,this.interactive=!0,this.selectable=!1,this.grabbable=!0,this.cursor=null,this._grabbing=!1,this.dragging=!1,this._hovering=!1,this._selected=!1,this._state=0,this._focused=!1,this.events=new s.EventEmitter,this._screenLocation={screenPointArray:a.createScreenPointArray(),renderScreenPointArray:a.createRenderScreenPointArray3(),pixelSize:0},this._screenLocationDirty=!0,this._applyObjectTransform=null,this._engineResourcesAddedToStage=!1,this._engineResources=null,this._attached=!1,this._engineLayer=null,this._materialIdReferences=null,this._location.spatialReference=e.view.spatialReference;for(const t in e)this[t]=e[t];this.view.state&&this.view.state.camera&&this.camera.copyFrom(this.view.state.camera)}var i=e.prototype;return i.destroy=function(){this._removeResourcesFromStage(),this._engineResources=null,this.view=null,this.camera=null},i.disableDisplay=function(){return this._noDisplayCount++,1===this._noDisplayCount&&this._updateEngineObject(),{remove:c.once((()=>{this._noDisplayCount--,0===this._noDisplayCount&&this._updateEngineObject()}))}},i._updateElevationAlignedLocation=function(){this._elevationAlignedLocation.x=this.location.x,this._elevationAlignedLocation.y=this.location.y;const e=r.isSome(this._elevation.override)?this._elevation.override:this.location.z||0;this._elevationAlignedLocation.z=e+this._elevation.offset,this._elevationAlignedLocation.spatialReference=this.location.spatialReference,this._renderLocationDirty=!0,this._screenLocationDirty=!0,this._elevationAlignedLocationDirty=!1},i.grabbableForEvent=function(){return!0},i.updateStateEnabled=function(e,t){t?this.state|=e:this.state&=~e},i._setFocused=function(e){e!==this._focused&&(this._focused=e,this.events.emit("focus-changed",{action:!0===e?"focus":"unfocus"}))},i.ensureScreenLocation=function(){if(!this._screenLocationDirty)return;this._screenLocation.pixelSize=this.camera.computeScreenPixelSizeAt(this.renderLocation),this._screenLocationDirty=!1;let e;if(k(this._modelTransform)){const t=this._calculateModelTransformOffset(G);e=f.add(t,t,this.renderLocation)}else e=this.renderLocation;this.camera.projectToRenderScreen(e,this._screenLocation.renderScreenPointArray),this.camera.renderToScreen(this._screenLocation.renderScreenPointArray,this._screenLocation.screenPointArray)},i.intersectionDistance=function(e,t){if(!this.available)return null;const i=a.screenPointObjectToArray(e,M),s=this._getCollisionRadius(t),o=-1*this.collisionPriority;switch(this.collisionType.type){case"point":if(_.squaredDistance(this.screenLocation.screenPointArray,i)<s*s)return this.screenLocation.renderScreenPointArray[2]+o;break;case"line":{const e=this.collisionType.paths,t=this._getWorldToScreenObjectScale(),n=this._calculateObjectTransform(t,x),c=s*this.screenLocation.pixelSize,l=w.fromScreen(this.camera,i,z);if(r.isNone(l))return null;for(const i of e){if(0===i.length)continue;const e=f.transformMat4(W,i[0],n);for(let t=1;t<i.length;t++){const s=f.transformMat4(B,i[t],n),r=v.closestRayDistance2(v.fromPoints(e,s,F),l);if(null!=r&&r<c*c){const t=f.add(S.sv3d.get(),e,s);f.scale(t,t,.5);const i=a.castRenderScreenPointArray(S.sv3d.get());return this.camera.projectToRenderScreen(t,i),i[2]+o}f.copy(e,s)}}break}case"disc":{var c;const e=this.collisionType.direction,t=null!=(c=this.collisionType.offset)?c:g.ZEROS,n=this._getWorldToScreenObjectScale(),a=this._calculateObjectTransform(n,x),h=s*this.screenLocation.pixelSize,u=w.fromScreen(this.camera,i,z);if(r.isNone(u))return null;const d=l.fromMat4(I,a),_=f.transformMat3(H,e,d),m=f.transformMat4(U,t,a);b.fromPositionAndNormal(m,_,N);const y=V;if(b.intersectRay(N,u,y)&&f.squaredDistance(y,m)<h*h)return this.screenLocation.renderScreenPointArray[2]+o;break}case"ribbon":{const{paths:e,direction:t}=this.collisionType,n=this._getWorldToScreenObjectScale(),c=this._calculateObjectTransform(n,x),h=s*this.camera.computeScreenPixelSizeAt(this.renderLocation),u=w.fromScreen(this.camera,i,z);if(r.isNone(u))return null;const d=l.fromMat4(I,c),_=f.transformMat3(H,t,d),g=this._calculateModelTransformPosition(U);b.fromPositionAndNormal(g,_,N);const m=V;if(!b.intersectRay(N,u,m))break;for(const i of e){if(0===i.length)continue;const e=f.transformMat4(W,i[0],c);for(let t=1;t<i.length;t++){const n=f.transformMat4(B,i[t],c),s=v.distance2(v.fromPoints(e,n,F),m);if(null!=s&&s<h*h){const t=f.add(S.sv3d.get(),e,n);f.scale(t,t,.5);const i=a.castRenderScreenPointArray(S.sv3d.get());return this.camera.projectToRenderScreen(t,i),i[2]+o}f.copy(e,n)}}break}default:n.neverReached(this.collisionType)}return null},i.attach=function(e={manipulator3D:{}}){var t;if(!this.view._stage)return;const i=e.manipulator3D;if(r.isNone(i.engineLayerId)){const e=new E.WebGLLayer({isPickable:!1,updatePolicy:1});this.view._stage.add(e),i.engineLayerId=e.id,this._engineLayer=e}else null!=(t=this.view._stage)&&t.getObject&&(this._engineLayer=this.view._stage.getObject(i.engineLayerId));i.engineLayerReferences=(i.engineLayerReferences||0)+1,this._materialIdReferences=i.materialIdReferences,r.isNone(this._materialIdReferences)&&(this._materialIdReferences=new Map,i.materialIdReferences=this._materialIdReferences),this.camera.copyFrom(this.view.state.camera),this._attached=!0,this._updateEngineObject(),m.canProjectWithoutEngine(this._location.spatialReference,this.view.spatialReference)||(this.location=new T({x:0,y:0,z:0,spatialReference:this.view.spatialReference}))},i.detach=function(e={manipulator3D:{}}){const t=e.manipulator3D;t.engineLayerReferences--;const i=0===t.engineLayerReferences;i&&(t.engineLayerId=null),this._removeResourcesFromStage(i),this._engineResources=null,this._engineLayer=null,this._materialIdReferences=null,this._attached=!1},i.onViewChange=function(){this.camera.copyFrom(this.view.state.camera),this._screenLocationDirty=!0,this._updateEngineObject()},i.onElevationChange=function(e){m.projectPoint(this.location,q,e.spatialReference),p.containsPointObject(e.extent,q)&&(this.location=this._location)},i._evaluateElevationAlignment=function(e=this.location){if(r.isNone(this.elevationInfo))return!1;let t=null,i=0;const n=r.unwrapOr(this.elevationInfo.offset,0);switch(this.elevationInfo.mode){case"on-the-ground":t=r.unwrapOr(j.getElevationAtPoint(this.view.elevationProvider,e,"ground"),0);break;case"relative-to-ground":i=r.unwrapOr(j.getElevationAtPoint(this.view.elevationProvider,e,"ground"),0)+n;break;case"relative-to-scene":i=r.unwrapOr(j.getElevationAtPoint(this.view.elevationProvider,e,"scene"),0)+n;break;case"absolute-height":i=n}return(i!==this._elevation.offset||t!==this._elevation.override)&&(this._elevation.offset=i,this._elevation.override=t,!0)},i._updateEngineObject=function(){if(!this._attached)return;if(!this.available)return void this._removeResourcesFromStage();const e=this._getWorldToScreenObjectScale(),t=x;if(!0===this.autoScaleRenderObjects){const i=this._getFocusedSize(this._radius,this.focused)*e;this._calculateObjectTransform(i,t)}else this._calculateObjectTransform(e,t);const{objectsByState:i}=this._ensureEngineResources(),n=(this.focused?2:1)|(this.selected?8:4),s=this._noDisplayCount>0;for(const{stateMask:o,objects:r}of i){if(s){for(const e of r)e.setVisible(!1);continue}const e=!(0!=(15&o))||(n&o)==(15&o),i=!(0!=(65520&o))||(this.state&o)==(65520&o);if(e&&i)for(const n of r)n.setVisible(!0),n.transformation=t;else for(const t of r)t.setVisible(!1)}},i._ensureEngineResources=function(){if(r.isNone(this._engineResources)){const e=r.unwrap(this._engineLayer),t=[],i=new Set;this.renderObjects.forEach((({material:e})=>{i.has(e)||(t.push(e),i.add(e))}));const n=(e,t)=>{const{geometry:i,material:n,transform:s}=t;Array.isArray(i)?i.forEach((t=>e.addGeometry(t,n,s))):e.addGeometry(i,n,s)},s=new Map;this._renderObjects.forEach((e=>{const t=new A.Object3D({castShadow:!1});n(t,e);const i=e.stateMask||0,o=s.get(i)||[];o.push(t),s.set(i,o)}));const o=[];s.forEach(((e,t)=>o.push({stateMask:t,objects:e}))),this._engineResources={objectsByState:o,layer:e,materials:t}}return this._addResourcesToStage(),this._engineResources},i._addResourcesToStage=function(){if(this._engineResourcesAddedToStage||r.isNone(this._engineResources))return;const{objectsByState:e,layer:t,materials:i}=this._engineResources;i.forEach((e=>{const t=r.unwrap(this._materialIdReferences),i=t.get(e.id)||0;0===i&&this.view._stage.add(e),t.set(e.id,i+1)})),e.forEach((({objects:e})=>{t.addMany(e),this.view._stage.addMany(e)})),this._engineResourcesAddedToStage=!0},i._removeResourcesFromStage=function(e=!1){if(!this._engineResourcesAddedToStage||r.isNone(this._engineResources))return;const{objectsByState:t,layer:i,materials:n}=this._engineResources;t.forEach((({objects:e})=>{i.removeMany(e),this.view._stage.removeMany(e)})),n.forEach((e=>{const t=r.unwrap(this._materialIdReferences),i=t.get(e.id);1===i?(this.view._stage.remove(e),t.delete(e.id)):t.set(e.id,i-1)})),e&&this.view._stage.remove(i),this._engineResourcesAddedToStage=!1},i._getCollisionRadius=function(e){return this._getFocusedSize(this.radius,!0)*("touch"===e?this.touchMultiplier:1)},i._getFocusedSize=function(e,t){return e*(t?this.focusMultiplier:1)},i._getWorldToScreenObjectScale=function(){return this._worldSized?1:this.screenLocation.pixelSize},i._calculateModelTransformPosition=function(e){const t=this._getWorldToScreenObjectScale(),i=this._calculateObjectTransform(t,C);return f.set(e,i[12],i[13],i[14])},i._calculateModelTransformOffset=function(e){const t=this._calculateModelTransformPosition(e);return f.subtract(e,t,this.renderLocation)},i._calculateObjectTransform=function(e,t){return u.set(t,e,0,0,0,0,e,0,0,0,0,e,0,0,0,0,1),this._worldFrame&&u.multiply(t,t,this._worldFrame),u.multiply(t,t,this._modelTransform),t[12]+=this.renderLocation[0],t[13]+=this.renderLocation[1],t[14]+=this.renderLocation[2],t[15]=1,r.isSome(this._applyObjectTransform)&&this._applyObjectTransform(t),t},t._createClass(e,[{key:"elevationInfo",get:function(){return this._elevationInfo},set:function(e){this._elevationInfo=e,this._elevationAlignedLocationDirty=!0,this._renderLocationDirty=!0,this._updateEngineObject()}},{key:"renderObjects",get:function(){return this._renderObjects},set:function(e){this._removeResourcesFromStage(),this._engineResources=null,this._renderObjects=e.slice(),this._updateEngineObject()}},{key:"available",get:function(){return this._available},set:function(e){e!==this._available&&(this._available=e,this._updateEngineObject())}},{key:"radius",get:function(){return this._radius},set:function(e){e!==this._radius&&(this._radius=e,this._updateEngineObject())}},{key:"worldSized",get:function(){return this._worldSized},set:function(e){e!==this._worldSized&&(this._worldSized=e,this._updateEngineObject())}},{key:"modelTransform",get:function(){return this._modelTransform},set:function(e){k(e)&&(this._screenLocationDirty=!0),u.copy(this._modelTransform,e),this._updateEngineObject()}},{key:"renderLocation",get:function(){return this._renderLocationDirty&&(this._renderLocationDirty=!1,this.view.renderCoordsHelper.toRenderCoords(this.elevationAlignedLocation,this._renderLocation),this.worldOriented?(this._worldFrame||(this._worldFrame=d.create()),D(this.view,this._renderLocation,this._worldFrame)):this._worldFrame&&(this._worldFrame=null)),this._renderLocation},set:function(e){this.view.renderCoordsHelper.fromRenderCoords(e,this._location),this.elevationAlignedLocation=this._location}},{key:"location",get:function(){return this._location},set:function(e){R.clonePoint(e,this._location),this._renderLocationDirty=!0,this._screenLocationDirty=!0,this._elevationAlignedLocationDirty=!0,this._updateEngineObject(),this.events.emit("location-update",{location:this._location})}},{key:"elevationAlignedLocation",get:function(){return this._elevationAlignedLocationDirty?(this._evaluateElevationAlignment(),this._updateElevationAlignedLocation(),this._elevationAlignedLocation):this._elevationAlignedLocation},set:function(e){R.clonePoint(e,this._location),this._evaluateElevationAlignment(),this._location.z-=this._elevation.offset,this._updateElevationAlignedLocation(),this._updateEngineObject(),this.events.emit("location-update",{location:this._location})}},{key:"grabbing",get:function(){return this._grabbing},set:function(e){e!==this._grabbing&&(this._grabbing=e,this._setFocused(this._hovering||this._grabbing),this._updateEngineObject())}},{key:"hovering",get:function(){return this._hovering},set:function(e){e!==this._hovering&&(this._hovering=e,this._setFocused(this._hovering||this._grabbing),this._updateEngineObject())}},{key:"selected",get:function(){return this._selected},set:function(e){e!==this._selected&&(this._selected=e,this._updateEngineObject(),this.events.emit("select-changed",{action:e?"select":"deselect"}))}},{key:"state",get:function(){return this._state},set:function(e){e!==this._state&&(this._state=e,this._updateEngineObject())}},{key:"focused",get:function(){return this._focused}},{key:"screenLocation",get:function(){return this.ensureScreenLocation(),this._screenLocation}},{key:"applyObjectTransform",get:function(){return this._applyObjectTransform},set:function(e){this._applyObjectTransform=e,this._screenLocationDirty=!0,this._updateEngineObject()}},{key:"test",get:function(){let e=!1;if(r.isSome(this._engineResources))for(const t in this._engineResources.objectsByState){const i=this._engineResources.objectsByState[t];for(const t of i.objects)if(t.isVisible){e=!0;break}if(e)break}return{areAnyResourcesVisible:e}}}]),e}();function k(e){return 0!==e[12]||0!==e[13]||0!==e[14]}function D(e,t,i){switch(e.viewingMode){case"local":return u.identity(i),!0;case"global":{const n=y.getReferenceEllipsoid(e.renderCoordsHelper.spatialReference);return m.sphericalPCPFtoLonLatElevation(t,0,W,0,n.radius),m.computeLatLonToENURotation(o.deg2rad(W[1]),o.deg2rad(W[0]),i),!0}}}const M=a.createScreenPointArray(),F=v.create(),z=L.create(),I=h.create(),C=d.create(),x=d.create(),N=b.create(),W=g.create(),B=g.create(),V=g.create(),H=g.create(),U=g.create(),G=g.create(),q=new T({x:0,y:0,z:0,spatialReference:null});e.Manipulator3D=P,Object.defineProperty(e,"__esModule",{value:!0})}));