/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../core/compilerUtils","../../../core/uid","../../../geometry/SpatialReference","../../../layers/graphics/dehydratedFeatures","../../../layers/graphics/featureConversionUtils","../../../layers/support/Field","./zscale"],(function(t,e,r,n,i,o,s,a){"use strict";function h(t,e){return e}function u(t,e,r,n){switch(r){case 0:return f(t,e+n,0);case 1:return"lowerLeft"===t.originPosition?f(t,e+n,1):p(t,e+n,1)}}function c(t,e,r,n){switch(r){case 2:return f(t,e,2);default:return u(t,e,r,n)}}function l(t,e,r,n){switch(r){case 2:return f(t,e,3);default:return u(t,e,r,n)}}function d(t,e,r,n){switch(r){case 3:return f(t,e,3);default:return c(t,e,r,n)}}function f({translate:t,scale:e},r,n){return t[n]+r*e[n]}function p({translate:t,scale:e},r,n){return t[n]-r*e[n]}let y=function(){function t(t){this.options=t,this.geometryTypes=["point","multipoint","polyline","polygon"],this.previousCoordinate=[0,0],this.transform=null,this.applyTransform=h,this.lengths=[],this.currentLengthIndex=0,this.toAddInCurrentPath=0,this.vertexDimension=0,this.coordinateBuffer=null,this.coordinateBufferPtr=0,this.AttributesConstructor=function(){}}var f=t.prototype;return f.createFeatureResult=function(){return new i.DehydratedFeatureSetClass},f.finishFeatureResult=function(t){if(this.options.applyTransform&&(t.transform=null),this.AttributesConstructor=function(){},this.coordinateBuffer=null,this.lengths.length=0,!t.hasZ)return;const e=a.getGeometryZScaler(t.geometryType,this.options.sourceSpatialReference,t.spatialReference);if(e)for(const r of t.features)e(r.geometry)},f.createSpatialReference=function(){return new n},f.addField=function(t,e){t.fields.push(s.fromJSON(e));const r=t.fields.map((t=>t.name));this.AttributesConstructor=function(){for(const t of r)this[t]=null}},f.addFeature=function(t,e){const r=this.options.maxStringAttributeLength?this.options.maxStringAttributeLength:0;if(r>0)for(const n in e.attributes){const t=e.attributes[n];"string"==typeof t&&t.length>r&&(e.attributes[n]="")}t.features.push(e)},f.addQueryGeometry=function(t,e){const{queryGeometry:r,queryGeometryType:n}=e,i=o.unquantizeOptimizedGeometry(r.clone(),r,!1,!1,this.transform),s=o.convertToGeometry(i,n,!1,!1);let a=null;switch(n){case"esriGeometryPoint":a="point";break;case"esriGeometryPolygon":a="polygon";break;case"esriGeometryPolyline":a="polyline";break;case"esriGeometryMultipoint":a="multipoint"}s.type=a,t.queryGeometryType=n,t.queryGeometry=s},f.prepareFeatures=function(t){switch(this.transform=t.transform,this.options.applyTransform&&t.transform&&(this.applyTransform=this.deriveApplyTransform(t)),this.vertexDimension=2,t.hasZ&&this.vertexDimension++,t.hasM&&this.vertexDimension++,t.geometryType){case"point":this.addCoordinate=(t,e,r)=>this.addCoordinatePoint(t,e,r),this.createGeometry=t=>this.createPointGeometry(t);break;case"polygon":this.addCoordinate=(t,e,r)=>this.addCoordinatePolygon(t,e,r),this.createGeometry=t=>this.createPolygonGeometry(t);break;case"polyline":this.addCoordinate=(t,e,r)=>this.addCoordinatePolyline(t,e,r),this.createGeometry=t=>this.createPolylineGeometry(t);break;case"multipoint":this.addCoordinate=(t,e,r)=>this.addCoordinateMultipoint(t,e,r),this.createGeometry=t=>this.createMultipointGeometry(t);break;case"mesh":case"extent":break;default:e.neverReached(t.geometryType)}},f.createFeature=function(){return this.lengths.length=0,this.currentLengthIndex=0,this.previousCoordinate[0]=0,this.previousCoordinate[1]=0,new i.DehydratedFeatureClass(r.generateUID(),null,new this.AttributesConstructor)},f.allocateCoordinates=function(){const t=this.lengths.reduce(((t,e)=>t+e),0);this.coordinateBuffer=new Float64Array(t*this.vertexDimension),this.coordinateBufferPtr=0},f.addLength=function(t,e,r){0===this.lengths.length&&(this.toAddInCurrentPath=e),this.lengths.push(e)},f.createPointGeometry=function(t){const e={type:"point",x:0,y:0,spatialReference:t.spatialReference,hasZ:!!t.hasZ,hasM:!!t.hasM};return e.hasZ&&(e.z=0),e.hasM&&(e.m=0),e},f.addCoordinatePoint=function(t,e,r){switch(e=this.applyTransform(this.transform,e,r,0),r){case 0:t.x=e;break;case 1:t.y=e;break;case 2:t.hasZ?t.z=e:t.m=e;break;case 3:t.m=e}},f.transformPathLikeValue=function(t,e){let r=0;return e<=1&&(r=this.previousCoordinate[e],this.previousCoordinate[e]+=t),this.applyTransform(this.transform,t,e,r)},f.addCoordinatePolyline=function(t,e,r){this.dehydratedAddPointsCoordinate(t.paths,e,r)},f.addCoordinatePolygon=function(t,e,r){this.dehydratedAddPointsCoordinate(t.rings,e,r)},f.addCoordinateMultipoint=function(t,e,r){0===r&&t.points.push([]);const n=this.transformPathLikeValue(e,r);t.points[t.points.length-1].push(n)},f.createPolygonGeometry=function(t){return{type:"polygon",rings:[[]],spatialReference:t.spatialReference,hasZ:!!t.hasZ,hasM:!!t.hasM}},f.createPolylineGeometry=function(t){return{type:"polyline",paths:[[]],spatialReference:t.spatialReference,hasZ:!!t.hasZ,hasM:!!t.hasM}},f.createMultipointGeometry=function(t){return{type:"multipoint",points:[],spatialReference:t.spatialReference,hasZ:!!t.hasZ,hasM:!!t.hasM}},f.dehydratedAddPointsCoordinate=function(t,e,r){0===r&&0==this.toAddInCurrentPath--&&(t.push([]),this.toAddInCurrentPath=this.lengths[++this.currentLengthIndex]-1,this.previousCoordinate[0]=0,this.previousCoordinate[1]=0);const n=this.transformPathLikeValue(e,r),i=t[t.length-1];0===r&&i.push(new Float64Array(this.coordinateBuffer.buffer,this.coordinateBufferPtr*Float64Array.BYTES_PER_ELEMENT,this.vertexDimension)),this.coordinateBuffer[this.coordinateBufferPtr++]=n},f.deriveApplyTransform=function(t){const{hasZ:e,hasM:r}=t;return e&&r?d:e?c:r?l:u},t}();t.DehydratedFeatureSetParserContext=y,Object.defineProperty(t,"__esModule",{value:!0})}));