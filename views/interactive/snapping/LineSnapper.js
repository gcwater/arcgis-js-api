/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../chunks/_rollupPluginBabelHelpers","../../../core/maybe","../../../chunks/vec2f64","./SnappingAlgorithm","./snappingUtils","./candidates/LineSnappingCandidate","../../support/geometry2dUtils"],(function(e,t,n,o,i,r,s,a){"use strict";let p=function(e){function i(){return e.apply(this,arguments)||this}t._inheritsLoose(i,e);var p=i.prototype;return p.snapNewVertex=function(e,t){const n=t.geometry.editGeometry.components[0],o=n.edges.length,i=[];if(o<1)return i;const s=t.coordinateHelper,a=r.anyMapPointToScreenPoint(e,s,t.elevationInfo,this.view),p=n.edges[o-1];let d=p;do{this.edgeExceedsShortLineThreshold(d,t)&&this._processCandidateProposal(d.left.pos,d.right.pos,e,a,t,i),d=d.left.left}while(d&&d!==p);return i},p.snapExistingVertex=function(e,t){const o=[],i=n.unwrap(t.vertexHandle),s=i.component;if(s.edges.length<2)return o;const a=t.coordinateHelper,p=r.anyMapPointToScreenPoint(e,a,t.elevationInfo,this.view),d=i.left,l=i.right;d&&l&&this.edgeExceedsShortLineThreshold(d,t)&&this.edgeExceedsShortLineThreshold(l,t)&&this._processCandidateProposal(d.left.pos,l.right.pos,e,p,t,o);const h=s.edges[0];let c=h;do{c!==i.left&&c!==i.right&&this.edgeExceedsShortLineThreshold(c,t)&&this._processCandidateProposal(c.left.pos,c.right.pos,e,p,t,o),c=c.right.right}while(c&&c!==h);return o},p._processCandidateProposal=function(e,t,n,i,p,d){const l=a.projectPointToLine(o.create(),n,e,t),h=p.coordinateHelper,c=h.fromXYZ(l,h.getZ(n,0));r.squareDistance(i,r.anyMapPointToScreenPoint(c,h,p.elevationInfo,this.view))<this.squaredProximityTreshold(p.pointer)&&d.push(new s.LineSnappingCandidate({coordinateHelper:p.coordinateHelper,lineStart:e,lineEnd:t,targetPoint:c}))},i}(i.SnappingAlgorithm);e.LineSnapper=p,Object.defineProperty(e,"__esModule",{value:!0})}));