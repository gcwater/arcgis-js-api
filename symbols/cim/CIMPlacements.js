/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports"],(function(t){"use strict";let s=function(){function t(){this.setIdentity()}var s=t.prototype;return s.getAngle=function(){return(null==this.rz||0===this.rz&&1!==this.rz_c&&0!==this.rz_s)&&(this.rz=Math.atan2(this.rz_s,this.rz_c)),this.rz},s.setIdentity=function(){this.tx=0,this.ty=0,this.tz=0,this.s=1,this.rx=0,this.ry=0,this.rz=0,this.rz_c=1,this.rz_s=0},s.setTranslate=function(t,s){this.tx=t,this.ty=s},s.setTranslateZ=function(t){this.tz=t},s.setRotateCS=function(t,s){this.rz=void 0,this.rz_c=t,this.rz_s=s},s.setRotate=function(t){this.rz=t,this.rz_c=void 0,this.rz_s=void 0},s.setRotateY=function(t){this.ry=t},s.setScale=function(t){this.s=t},s.setMeasure=function(t){this.m=t},t}(),i=function(){function t(){}return t.prototype.next=function(){return null},t}();t.EmptyPlacementCursor=i,t.Placement=s,Object.defineProperty(t,"__esModule",{value:!0})}));