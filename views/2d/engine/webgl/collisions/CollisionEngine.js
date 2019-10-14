// COPYRIGHT © 2019 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/next/esri/copyright.txt for details.

define(["require","exports","../../../../../core/Error","../../../../../core/iteratorUtils","../../../../../core/Logger","../../../../../core/mathUtils","../definitions","./CollisionBucket","./LayerCollisionInfo"],function(e,i,_,p,t,a,o,n,v){Object.defineProperty(i,"__esModule",{value:!0});var x=o.TILE_SIZE/o.COLLISION_BUCKET_SIZE,w=x,m=t.getLogger("esri.views.2d.engine.webgl.collisions.CollisionEngine"),r=function(){function e(e){this._layers=new Map,this._collisionBuckets=new Map,this._didError=!1,this._tilingScheme=e}return Object.defineProperty(e.prototype,"collisionInfos",{get:function(){return p.valuesOfMap(this._layers)},enumerable:!0,configurable:!0}),e.prototype.registerLayerView=function(e,i){if(!this._layers.has(e)){var t=v.default.create(e,i,this.collisionInfos,this._tilingScheme);this._layers.set(e,t),this._collisionBuckets.forEach(function(e){return e.onRegisterLayer(t.index)})}},e.prototype.unregisterLayerView=function(e){var r=this;if(this._layers.has(e)){var o=this._layers.get(e);v.default.delete(o.index,this.collisionInfos),this._layers.delete(e),this._collisionBuckets.forEach(function(e,i){var t=e.getTile(o.index);t&&(e.onUnregisterLayer(o.index),e.canDelete()&&r._collisionBuckets.delete(i),t.reference&&(t.reference.isDirty=!1))})}},e.prototype.addTile=function(e,i){var t=i.key.id;if(this._layers.has(e)){this._collisionBuckets.has(t)||this._collisionBuckets.set(t,new n.default(i.key,this._layers.size));var r=this._getIndex(e);this._collisionBuckets.get(t).getTile(r).reference=i}},e.prototype.removeTile=function(e,i){if(this._layers.has(e)&&this._collisionBuckets.has(i)){var t=this._getIndex(e),r=this._collisionBuckets.get(i).getTile(t);r.dirty=!1,r.reference=null}},e.prototype.run=function(e,i){var t=p.valuesOfMap(this._collisionBuckets).sort(function(e,i){return e.key.compareRowMajor(i.key)}),r=!0,o=e.renderingOptions.labelCollisionsEnabled&&!this._didError,n=this.collisionInfos;try{for(var s=0,l=t;s<l.length;s++){var a=l[s];r=r||a.isDirty;for(var c=0;c<this._layers.size;c++){var f=v.default.find(c,n);a.computeNeighbors(this._collisionBuckets),a.reset(e,r,f)}}for(var u=0;u<this._layers.size;u++){f=v.default.find(u,n);for(var h=0,g=t;h<g.length;h++){a=g[h];this._run(o,a,f,i)}}}catch(e){m.error(new _("mapview-labeling","Encountered an error during decluttering. Disabling collisions",e)),this._didError=!0}for(var y=0,d=t;y<d.length;y++){(a=d[y]).ready()}},e.prototype._run=function(e,i,t,r){var o=i.getReference(t.index);o&&o.hasData&&(o.key.level!==r?this._resetLabelsMinZoom(i,t):this._runVisibility(e,i,o,t,r))},e.prototype._resetLabelsMinZoom=function(e,i){if(e&&"polyline"!==i.geometryType){var t=e.getReference(i.index);if(t&&t.hasData)for(var r=i.layerView.tileRenderer.featuresView.attributeView,o=0,n=t.displayObjects;o<n.length;o++){var s=n[o];r.setLabelMinZoom(s.id,255)}}},e.prototype._checkLabelsVisible=function(e,i){var t=!i.filter||!!(e&o.FILTER_FLAG_0),r=!i.effect||i.effect.excludedLabelsVisible||!!(e&o.EFFECT_FLAG_0);return t&&r},e.prototype._runVisibility=function(e,i,t,r,o){for(var n=r.layerView.tileRenderer.featuresView.attributeView,s=0,l=t.displayObjects.sort(function(e,i){return n.getLabelMinZoom(e.id)-n.getLabelMinZoom(i.id)});s<l.length;s++){var a=l[s];if(a.metrics.length){var c="polyline"===r.geometryType?0:10*(o-1),f=n.getFilterFlags(a.id),u=this._checkLabelsVisible(f,r.layerView);if(e)for(var h=0;h<a.metrics.length;h++){var g=a.metrics[h],y=u?-1!==g.minZoom?g.minZoom:this._computeLabelVisibility(a,g,r.index,i,t,g.baseZoom,o):255;c=Math.max(y,c)}n.setLabelMinZoom(a.id,c);for(var d=0,_=a.metrics;d<_.length;d++){(g=_[d]).minZoom=c}}}},e.prototype._computeLabelVisibility=function(e,i,t,r,o,n,s){for(var l=n,a=i.xBucket,c=i.yBucket,f=i.xOverflow,u=i.yOverflow,h=a-f,g=a+f+1,y=c+u+1,d=c-u;d<y;d++)for(var _=h;_<g;_++)if(!(_<-x||d<-w||x<_||w<d))for(var p=0;p<=t;p++){var v=this._getRelativeSubBucket(p,r,o,_,d);if(v)for(var m=0,b=v;m<b.length;m++){var L=b[m];if(L.id!==e.id){var k=this._compareLabels(i,L,l,s);l=Math.max(k,l)}}}return l},e.prototype._compareLabels=function(e,i,t,r){var o=10*(r+1);if(-1===i.minZoom||i.minZoom>o)return t;var n=e.findCollisionDelta(i),s=a.clamp(Math.floor(10*(n+r)),0,255);return i.minZoom>=s?t:Math.max(t,s)},e.prototype._getNeighboringTile=function(e,i,t,r,o){var n=3*(1+o)+(1+r),s=i.neighbors[n];return s&&s.getTile(e)},e.prototype._getRelativeSubBucket=function(e,i,t,r,o){var n=a.sign(Math.floor(r/4)),s=a.sign(Math.floor(o/4)),l=this._getNeighboringTile(e,i,t,n,s);return l&&l.reference&&l.index&&l.reference.hasData?l.index[o-4*s][r-4*n]:null},e.prototype._getIndex=function(e){return this._layers.get(e).index},e}();i.CollisionEngine=r});