/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../chunks/tslib.es6","../../../../core/Accessor","../../../../core/MapUtils","../../../../core/maybe","../../../../core/PooledArray","../../../../core/accessorSupport/decorators/property","../../../../core/has","../../../../core/accessorSupport/ensureType","../../../../core/Logger","../../../../core/accessorSupport/decorators/subclass","./ChangeSet","./Material","./rendererUtils","../materials/renderers/MergedRenderer"],(function(e,r,t,s,n,i,a,d,o,h,c,l,p,u,g,m){"use strict";e.SortedRenderGeometryRenderer=function(e){function t(){var r;return(r=e.apply(this,arguments)||this)._pending=new _,r._changes=new p.ChangeSet,r._materialRenderers=new Map,r._sortedMaterialRenderers=new a,r._hasHighlights=!1,r._hasWater=!1,r}r._inheritsLoose(t,e);var s=t.prototype;return s.dispose=function(){this._changes.prune(),this._materialRenderers.forEach((e=>e.dispose())),this._materialRenderers.clear(),this._sortedMaterialRenderers.clear()},s.stopAnimationsAtTime=function(e){this._sortedMaterialRenderers.forAll((r=>i.applySome(r.material.animation,(r=>r.stopAtTime(e)))))},s.commitChanges=function(){if(!this.updating)return!1;this._processAddsRemoves();const e=g.splitRenderGeometryChangeSetByMaterial(this._changes);let r=!1,t=!1,s=!1;return e.forEach(((e,n)=>{let i=this._materialRenderers.get(n);if(!i&&e.adds.length>0&&(i=new m(this.rctx,this.materialRepository,n),this._materialRenderers.set(n,i),r=!0,t=!0,s=!0),!i)return;const a=t||i.hasHighlights,d=s||i.hasWater;i.modify(e),t=t||a!==i.hasHighlights,s=s||d!==i.hasWater,i.isEmpty&&(this._materialRenderers.delete(n),i.dispose(),r=!0)})),this._changes.clear(),r&&this.updateSortedMaterialRenderers(),t&&(this._hasHighlights=n.someMap(this._materialRenderers,(e=>e.hasHighlights))),s&&(this._hasWater=n.someMap(this._materialRenderers,(e=>e.hasWater))),this.notifyChange("updating"),!0},s.add=function(e){if(0===e.length)return;const r=this._pending.empty;for(const t of e)this._pending.adds.add(t);r&&this.notifyChange("updating")},s.remove=function(e){const r=this._pending.empty;for(const t of e)this._pending.adds.has(t)?(this._pending.removed.add(t),this._pending.adds.delete(t)):this._pending.removed.has(t)||this._pending.removes.add(t);r&&!this._pending.empty&&this.notifyChange("updating")},s.modify=function(e,r){const t=0===this._changes.updates.length;for(const s of e){const e=this._changes.updates.pushNew();e.renderGeometry=s,e.updateType=r}t&&this._changes.updates.length>0&&this.notifyChange("updating")},s.updateLogic=function(e){let r=!1;return this._sortedMaterialRenderers.forAll((({materialRenderer:t})=>{t.updateLogic&&t.updateLogic(e)&&(r=!0)})),r},s.render=function(e,r){for(let t=0;t<this._sortedMaterialRenderers.length;t++){const s=this._sortedMaterialRenderers.data[t];u.materialPredicate(s.material,e)&&s.materialRenderer.render(null,e.pass,r,null)}},s.updateSortedMaterialRenderers=function(){this._sortedMaterialRenderers.clear();let e=0;this._materialRenderers.forEach(((r,t)=>{t.insertOrder=e++,this._sortedMaterialRenderers.push({material:t,materialRenderer:r})})),this._sortedMaterialRenderers.sort(((e,r)=>{const t=r.material.renderPriority-e.material.renderPriority;return 0!==t?t:e.material.insertOrder-r.material.insertOrder}))},s._processAddsRemoves=function(){this._changes.adds.clear(),this._changes.removes.clear(),this._changes.adds.pushArray(Array.from(this._pending.adds)),this._changes.removes.pushArray(Array.from(this._pending.removes));for(let e=0;e<this._changes.updates.length;){const r=this._changes.updates.data[e];this._pending.has(r.renderGeometry)?this._changes.updates.removeUnorderedIndex(e):e++}this._pending.clear()},r._createClass(t,[{key:"updating",get:function(){return!this._pending.empty||this._changes.updates.length>0}},{key:"hasHighlights",get:function(){return this._hasHighlights}},{key:"hasWater",get:function(){return this._hasWater}},{key:"rendersOccluded",get:function(){return n.someMap(this._materialRenderers,(e=>e.rendersOccluded))}},{key:"isEmpty",get:function(){return!this.updating&&0===this._materialRenderers.size}},{key:"test",get:function(){return{sortedMaterialRenderers:this._sortedMaterialRenderers}}}]),t}(s),t.__decorate([d.property()],e.SortedRenderGeometryRenderer.prototype,"rctx",void 0),t.__decorate([d.property()],e.SortedRenderGeometryRenderer.prototype,"materialRepository",void 0),t.__decorate([d.property()],e.SortedRenderGeometryRenderer.prototype,"updating",null),e.SortedRenderGeometryRenderer=t.__decorate([l.subclass("esri.views.3d.webgl-engine.lib.SortedRenderGeometryRenderer")],e.SortedRenderGeometryRenderer);let _=function(){function e(){this.adds=new Set,this.removes=new Set,this.removed=new Set}var t=e.prototype;return t.has=function(e){return this.adds.has(e)||this.removes.has(e)||this.removed.has(e)},t.clear=function(){this.adds.clear(),this.removes.clear(),this.removed.clear()},r._createClass(e,[{key:"empty",get:function(){return 0===this.adds.size&&0===this.removes.size&&0===this.removed.size}}]),e}();Object.defineProperty(e,"__esModule",{value:!0})}));