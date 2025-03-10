/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../../../geometry/support/spatialReferenceUtils","./TileKey"],(function(t,o){"use strict";function r(t,o){return[t,o]}function i(t,o,r){return t[0]=o,t[1]=r,t}function n(t,o,r,i,n){return t[0]=o,t[1]=r,t[2]=i,t[3]=n,t}const e=new o("0/0/0/0");return function(){function o(t,o,r,i,n,e,s,l,h,u,a,c){this.level=t,this.resolution=o,this.scale=r,this.origin=i,this.first=n,this.last=e,this.size=s,this.norm=l,this.worldStart=h,this.worldEnd=u,this.worldSize=a,this.wrap=c}o.create=function(n,e,s){const l=t.getInfo(n.spatialReference),h=r(n.origin.x,n.origin.y),u=r(n.size[0]*e.resolution,n.size[1]*e.resolution),a=r(-1/0,-1/0),c=r(1/0,1/0),f=r(1/0,1/0);let g,m,w,d;return s&&(i(a,Math.max(0,Math.floor((s.xmin-h[0])/u[0])),Math.max(0,Math.floor((h[1]-s.ymax)/u[1]))),i(c,Math.max(0,Math.floor((s.xmax-h[0])/u[0])),Math.max(0,Math.floor((h[1]-s.ymin)/u[1]))),i(f,c[0]-a[0]+1,c[1]-a[1]+1)),n.isWrappable?(g=r(Math.ceil(Math.round((l.valid[1]-l.valid[0])/e.resolution)/n.size[0]),f[1]),m=r(Math.floor((l.origin[0]-h[0])/u[0]),a[1]),w=r(g[0]+m[0]-1,c[1]),d=!0):(m=a,w=c,g=f,d=!1),new o(e.level,e.resolution,e.scale,h,a,c,f,u,m,w,g,d)};var s=o.prototype;return s.normalizeCol=function(t){if(!this.wrap)return t;const o=this.worldSize[0];return t<0?o-1-Math.abs((t+1)%o):t%o},s.denormalizeCol=function(t,o){return this.wrap?this.worldSize[0]*o+t:t},s.getWorldForColumn=function(t){return this.wrap?Math.floor(t/this.worldSize[0]):0},s.getFirstColumnForWorld=function(t){return t*this.worldSize[0]+this.first[0]},s.getLastColumnForWorld=function(t){return t*this.worldSize[0]+this.first[0]+this.size[0]-1},s.getColumnForX=function(t){return(t-this.origin[0])/this.norm[0]},s.getXForColumn=function(t){return this.origin[0]+t*this.norm[0]},s.getRowForY=function(t){return(this.origin[1]-t)/this.norm[1]},s.getYForRow=function(t){return this.origin[1]-t*this.norm[1]},s.getTileBounds=function(t,o,r=!1){e.set(o);const i=r?e.col:this.denormalizeCol(e.col,e.world),s=e.row;return n(t,this.getXForColumn(i),this.getYForRow(s+1),this.getXForColumn(i+1),this.getYForRow(s)),t},s.getTileCoords=function(t,o,r=!1){e.set(o);const n=r?e.col:this.denormalizeCol(e.col,e.world);return Array.isArray(t)?i(t,this.getXForColumn(n),this.getYForRow(e.row)):(t.x=this.getXForColumn(n),t.y=this.getYForRow(e.row)),t},o}()}));
