/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../chunks/_rollupPluginBabelHelpers","../../../Color","../../../core/has","../../../core/handleUtils","../../../chunks/vec3","../../../chunks/vec3f64","./visualElements/ExtendedLineVisualElement","./visualElements/ParallelLineVisualElement","./visualElements/PointVisualElement","./visualElements/RightAngleQuadVisualElement","../../interactive/snapping/Settings","../../interactive/snapping/snappingUtils","../../interactive/snapping/SnappingVisualizer"],(function(e,n,t,i,a,l,o,r,s,d,u,c,p,f){"use strict";let g=function(e){function i(){return e.apply(this,arguments)||this}n._inheritsLoose(i,e);var f=i.prototype;return f.visualizeIntersectionPoint=function(e,n){const{coordinateHelper:i,elevationInfo:l,view:o}=n;return a.destroyHandle(new d.PointVisualElement({view:o,primitive:"circle",geometry:i.createPoint(e.intersectionPoint),elevationInfo:l,size:20,outlineSize:2,color:[0,0,0,0],outlineColor:t.toUnitRGBA(c.defaults.orange),pixelSnappingEnabled:!1}))},f.visualizePoint=function(e,n){const{coordinateHelper:i,elevationInfo:l,view:o}=n;return a.destroyHandle(new d.PointVisualElement({view:o,primitive:"circle",geometry:i.createPoint(e.point),elevationInfo:l,size:20,outlineSize:2,color:[0,0,0,0],outlineColor:t.toUnitRGBA(c.defaults.orange),pixelSnappingEnabled:!1}))},f.visualizeLine=function(e,n){const{coordinateHelper:t,elevationInfo:i,view:l}=n;return a.destroyHandle(this.createLineSegmentHintFromMap(e.type,e.lineStart,e.lineEnd,t,i,l,e.fadeLeft,e.fadeRight))},f.visualizeParallelSign=function(e,n){const{coordinateHelper:i,elevationInfo:o,view:r}=n,d=p.anyMapPointToRender(e.lineStart,i,o,n.view),u=p.anyMapPointToRender(e.lineEnd,i,o,n.view),f=l.lerp(u,d,u,.5),g=new s.ParallelLineVisualElement({view:r,attached:!1,offset:c.defaults.parallelLineHintOffset,length:c.defaults.parallelLineHintLength,width:c.defaults.parallelLineHintWidth,color:t.toUnitRGBA(c.defaults.orange),location:f,renderOccluded:16});return g.setDirectionFromPoints(d,f),g.attached=!0,a.destroyHandle(g)},f.visualizeRightAngleQuad=function(e,n){const{coordinateHelper:i,elevationInfo:l,view:o}=n;return a.destroyHandle(new u.RightAngleQuadVisualElement({view:o,attached:!0,color:t.toUnitRGBA(c.defaults.orange),renderOccluded:2,outlineRenderOccluded:16,outlineColor:t.toUnitRGBA(c.defaults.orange),outlineSize:c.defaults.rightAngleHintOutlineSize,size:c.defaults.rightAngleHintSize,geometry:{previous:p.anyMapPointToRender(e.previousVertex,i,l,o),center:p.anyMapPointToRender(e.centerVertex,i,l,o),next:p.anyMapPointToRender(e.nextVertex,i,l,o)}}))},f.createLineSegmentHintFromMap=function(e,n,t,i,a,l,r=!0,s=!0){const d=o.create(),u=o.create();return p.anyMapPointsToRenderWithEqualZ(n,t,i,a,l,d,u),this.createLineSegmentHint(e,l,d,u,r,s)},f.createLineSegmentHint=function(e,n,i,a,l=!0,o=!0){const s=new r.ExtendedLineVisualElement({view:n,extensionType:3,start:i,end:a,color:t.toUnitRGBA(c.defaults.orange),renderOccluded:16});switch(e){case 0:s.width=c.defaults.lineHintWidthTarget,s.fadedExtensions={start:0,end:c.defaults.lineHintFadedExtensions};break;case 2:s.width=c.defaults.lineHintWidthReference,s.fadedExtensions={start:0,end:0};break;case 1:s.width=c.defaults.lineHintWidthReference,s.fadedExtensions={start:l?c.defaults.lineHintFadedExtensions:0,end:o?c.defaults.lineHintFadedExtensions:0}}return s.attached=!0,s},i}(f.SnappingVisualizer);e.SnappingVisualizer3D=g,Object.defineProperty(e,"__esModule",{value:!0})}));