/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../chunks/_rollupPluginBabelHelpers","../../../core/maybe","../../../core/unitUtils","./constants"],(function(t,e,n,i,o){"use strict";function a(t,e){const a=t.length;if(0===a)return null;const s=t[0],l=s.sampledZ;let c=l,v=l,p=0,f=0,g=null,S=null,_=n.isSome(l)?l:0,E=0,h=0,x=n.isSome(l)?1:0,d=0,P=0;const N=i.getMetersPerUnitForSR(e),M=i.getMetersPerVerticalUnitForSR(e),C=o.SLOPE_MIN_SAMPLE_DISTANCE/N,y=2*C,D=new m,H=new m,U=()=>{O(),D.copy(H),H.reset()},w=(t,e)=>{U();const n=D||t-D.start>y?t:D.start+C;H.restart(n,e)},O=()=>{if(D.isHole||H.isHole)return;const t=H.avgElevation-D.avgElevation,e=H.start-D.start,n=t*M,o=e*N,a=i.convertUnit(Math.atan2(n,o),"radians","degrees");a>0?(E+=a,g=u(g,a),d++):a<0&&(h-=a,S=u(S,-a),P++)};n.isSome(s.sampledZ)&&w(s.distance,s.sampledZ);for(let i=1;i<a;++i){const e=t[i-1],o=t[i],a=o.sampledZ;if(n.isNone(a)){H.isHole||U();continue}x++,_+=a,c=r(c,a),v=u(v,a),H.isHole||o.distance-H.start>=C?w(o.distance,a):H.insert(a);const s=e.sampledZ;if(n.isSome(s)){const t=a-s;t>0?p+=t:t<0&&(f-=t)}}return U(),0===x?null:{maxDistance:t[a-1].distance,minElevation:c,maxElevation:v,avgElevation:0===x?null:_/x,elevationGain:p,elevationLoss:f,maxPositiveSlope:g,maxNegativeSlope:S,avgPositiveSlope:0===d?null:E/d,avgNegativeSlope:0===P?null:h/P}}function s(t){const e=t.filter(n.isSome),i=e.length;if(0===i)return null;const o=e[0];if(1===i)return o;let a=o.maxDistance,s=o.minElevation,l=o.maxElevation,c=o.maxPositiveSlope,m=o.maxNegativeSlope;for(let n=1;n<e.length;++n){const t=e[n];a=u(a,t.maxDistance),s=r(s,t.minElevation),l=u(l,t.maxElevation),c=u(c,t.maxPositiveSlope),m=u(m,t.maxNegativeSlope)}return{maxDistance:a,minElevation:s,maxElevation:l,avgElevation:null,elevationGain:null,elevationLoss:null,maxPositiveSlope:c,maxNegativeSlope:m,avgPositiveSlope:null,avgNegativeSlope:null}}function l(t){let e=null,o=null,a=null;for(const s of t){if(n.isNone(s))continue;const{statistics:t,spatialReference:l}=s;if(n.isNone(t))continue;const m=i.getMetersPerUnitForSR(l);e=u(e,c(t.maxDistance,m));const v=i.getMetersPerVerticalUnitForSR(l);a=r(a,c(t.minElevation,v)),o=u(o,c(t.maxElevation,v))}return{minDistance:0,maxDistance:n.unwrapOr(e,0),minElevation:n.unwrapOr(a,0),maxElevation:n.unwrapOr(o,0)}}function r(t,e){return n.isNone(e)?t:n.isSome(t)?Math.min(t,e):e}function u(t,e){return n.isNone(e)?t:n.isSome(t)?Math.max(t,e):e}function c(t,e){return n.isSome(t)&&n.isSome(e)?t*e:null}let m=function(){function t(){this._start=0,this._totalElevation=0,this._sampleCount=0}var n=t.prototype;return n.copy=function(t){this._start=t._start,this._sampleCount=t._sampleCount,this._totalElevation=t._totalElevation},n.reset=function(){this._start=0,this._sampleCount=0,this._totalElevation=0},n.restart=function(t,e){this._start=t,this._sampleCount=1,this._totalElevation=e},n.insert=function(t){++this._sampleCount,this._totalElevation+=t},e._createClass(t,[{key:"avgElevation",get:function(){return this._totalElevation/this._sampleCount}},{key:"isHole",get:function(){return 0===this._sampleCount}},{key:"start",get:function(){return this._start}}]),t}();t.getBoundsInMeters=l,t.getStatistics=a,t.mergeStatistics=s,Object.defineProperty(t,"__esModule",{value:!0})}));