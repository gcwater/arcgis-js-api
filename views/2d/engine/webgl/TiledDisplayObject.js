/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../core/has","../../../../chunks/mat3","../../../../chunks/mat3f32","../DisplayObject","../../tiling/TileKey"],(function(t,e,s,i,o,n,r){"use strict";let u=function(t){function s(e,s,i,n=i){var u;return(u=t.call(this)||this).triangleCountReportedInDebug=0,u.transforms={dvs:o.create(),tileMat3:o.create()},u.triangleCount=0,u.key=new r(e),u.bounds=s,u.size=i,u.coordRange=n,u}e._inheritsLoose(s,t);var n=s.prototype;return n.destroy=function(){this.texture&&(this.texture.dispose(),this.texture=null)},n.setTransform=function(t,e){const s=e/(t.resolution*t.pixelRatio),o=this.transforms.tileMat3,[n,r]=t.toScreenNoRotation([0,0],this.coords),u=this.size[0]/this.coordRange[0]*s,a=this.size[1]/this.coordRange[1]*s;i.set(o,u,0,0,0,a,0,n,r,1),i.multiply(this.transforms.dvs,t.displayViewMat3,o)},e._createClass(s,[{key:"coords",get:function(){return this._coords}},{key:"bounds",get:function(){return this._bounds},set:function(t){this._coords=[t[0],t[3]],this._bounds=t}}]),s}(n.DisplayObject);t.TiledDisplayObject=u,Object.defineProperty(t,"__esModule",{value:!0})}));