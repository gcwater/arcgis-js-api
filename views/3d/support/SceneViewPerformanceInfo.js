/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../../../core/maybe","../layers/support/MemoryManagedLayerView","./LayerPerformanceInfo","../terrain/terrainUtils"],(function(e,r,o,s){"use strict";return function(t){this.totalMemory=0,this.usedMemory=0,this.quality=1,this.load=0,this.terrainMemory=0,this.edgesMemory=0,this.layerPerformanceInfos=new Array;const a=t.resourceController.memoryController;this.totalMemory=1048576*a.maxMemory,this.usedMemory=Math.round(a.usedMemory*this.totalMemory),this.quality=a.memoryFactor,this.load=t.resourceController.scheduler.load,this.terrainMemory=t.basemapTerrain?t.basemapTerrain.getUsedMemory():0;const i=t._stage&&t._stage.renderView&&t._stage.renderView.edgeView;this.edgesMemory=e.isSome(i)?i.usedMemory:0,t.allLayerViews.items.forEach((e=>{(r.isMemoryManagedLayerView(e)||s.isSurfaceLayerView(e))&&this.layerPerformanceInfos.push(new o(e,t))})),this.layerPerformanceInfos.sort(((e,r)=>r.memory-e.memory))}}));