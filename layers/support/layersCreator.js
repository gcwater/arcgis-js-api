/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../chunks/_rollupPluginBabelHelpers","../../core/Collection","../../core/has","../../core/promiseUtils","./lazyLayerLoader","../../portal/PortalItem","../../portal/support/featureCollectionUtils","../../portal/support/portalLayers","../../renderers/support/styleUtils"],(function(e,r,a,y,t,n,i,o,l,L){"use strict";function p(e,r,a){return c.apply(this,arguments)}function c(){return(c=r._asyncToGenerator((function*(e,r,a){if(!r)return;const y=[];for(const t of r){const e=M(t,a);"GroupLayer"===t.layerType?y.push(W(e,t,a)):y.push(e)}const n=yield t.eachAlways(y);for(const t of n)!t.value||a.filter&&!a.filter(t.value)||e.add(t.value)}))).apply(this,arguments)}const u={ArcGISFeatureLayer:"FeatureLayer",ArcGISImageServiceLayer:"ImageryLayer",ArcGISMapServiceLayer:"MapImageLayer",PointCloudLayer:"PointCloudLayer",ArcGISSceneServiceLayer:"SceneLayer",IntegratedMeshLayer:"IntegratedMeshLayer",BuildingSceneLayer:"BuildingSceneLayer",ArcGISTiledElevationServiceLayer:"ElevationLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",ArcGISTiledMapServiceLayer:"TileLayer",GroupLayer:"GroupLayer",WebTiledLayer:"WebTileLayer",CSV:"CSVLayer",VectorTileLayer:"VectorTileLayer",WMS:"WMSLayer",DefaultTileLayer:"TileLayer",KML:"KMLLayer",RasterDataLayer:"UnsupportedLayer"},s={ArcGISTiledElevationServiceLayer:"ElevationLayer",DefaultTileLayer:"ElevationLayer",RasterDataElevationLayer:"UnsupportedLayer"},S={ArcGISTiledMapServiceLayer:"TileLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",OpenStreetMap:"OpenStreetMapLayer",WebTiledLayer:"WebTileLayer",VectorTileLayer:"VectorTileLayer",ArcGISImageServiceLayer:"UnsupportedLayer",WMS:"UnsupportedLayer",ArcGISMapServiceLayer:"UnsupportedLayer",DefaultTileLayer:"TileLayer"},d={ArcGISFeatureLayer:"FeatureLayer",ArcGISImageServiceLayer:"ImageryLayer",ArcGISImageServiceVectorLayer:"ImageryLayer",ArcGISMapServiceLayer:"MapImageLayer",ArcGISStreamLayer:"StreamLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",ArcGISTiledMapServiceLayer:"TileLayer",BingMapsAerial:"BingMapsLayer",BingMapsRoad:"BingMapsLayer",BingMapsHybrid:"BingMapsLayer",CSV:"CSVLayer",DefaultTileLayer:"TileLayer",GeoRSS:"GeoRSSLayer",GroupLayer:"GroupLayer",KML:"KMLLayer",OGCFeatureLayer:"OGCFeatureLayer",SubtypeGroupLayer:"UnsupportedLayer",VectorTileLayer:"VectorTileLayer",WFS:"WFSLayer",WMS:"WMSLayer",WebTiledLayer:"WebTileLayer"},I={ArcGISFeatureLayer:"FeatureLayer"},T={ArcGISImageServiceLayer:"ImageryLayer",ArcGISImageServiceVectorLayer:"ImageryLayer",ArcGISMapServiceLayer:"MapImageLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",ArcGISTiledMapServiceLayer:"TileLayer",OpenStreetMap:"OpenStreetMapLayer",VectorTileLayer:"VectorTileLayer",WebTiledLayer:"WebTileLayer",BingMapsAerial:"BingMapsLayer",BingMapsRoad:"BingMapsLayer",BingMapsHybrid:"BingMapsLayer",WMS:"WMSLayer",DefaultTileLayer:"TileLayer"};function M(e,r){return f.apply(this,arguments)}function f(){return(f=r._asyncToGenerator((function*(e,r){return g(yield m(e,r),e,r)}))).apply(this,arguments)}function g(e,r,a){return G.apply(this,arguments)}function G(){return(G=r._asyncToGenerator((function*(e,r,a){const y=new e;return y.read(r,a.context),"group"===y.type&&A(r)&&(yield w(y,r,a.context)),yield L.loadStyleRenderer(y,a.context),y}))).apply(this,arguments)}function m(e,r){return v.apply(this,arguments)}function v(){return(v=r._asyncToGenerator((function*(e,r){const a=r.context,y=b(a);let t=e.layerType||e.type;!t&&r&&r.defaultLayerType&&(t=r.defaultLayerType);const L=y[t];let p=L?n.layerLookupMap[L]:n.layerLookupMap.UnknownLayer;const c=a&&a.portal;if(h(e)){if(e.itemId){const r=new i({id:e.itemId,portal:c});yield r.load();const a=(yield l.selectLayerClassPath(r)).className||"UnknownLayer";p=n.layerLookupMap[a]}}else"ArcGISFeatureLayer"===t?(yield o.isMapNotesLayer(e,c))?p=n.layerLookupMap.MapNotesLayer:(yield o.isRouteLayer(e,c))?p=n.layerLookupMap.RouteLayer:A(e)&&(p=n.layerLookupMap.GroupLayer):e.wmtsInfo&&e.wmtsInfo.url&&e.wmtsInfo.layerIdentifier?p=n.layerLookupMap.WMTSLayer:"WFS"===t&&"2.0.0"!==e.wfsInfo.version&&(p=n.layerLookupMap.UnsupportedLayer);return p()}))).apply(this,arguments)}function A(e){if("ArcGISFeatureLayer"!==e.layerType||h(e))return!1;const r=e.featureCollection;return!!(r&&r.layers&&r.layers.length>1)}function h(e){return"Feature Collection"===e.type}function b(e){let r;switch(e.origin){case"web-scene":switch(e.layerContainerType){case"basemap":r=S;break;case"ground":r=s;break;default:r=u}break;default:switch(e.layerContainerType){case"basemap":r=T;break;case"tables":r=I;break;default:r=d}}return r}function W(e,r,a){return k.apply(this,arguments)}function k(){return(k=r._asyncToGenerator((function*(e,r,y){const t=new a,n=p(t,Array.isArray(r.layers)?r.layers:[],y),i=yield e;if(yield n,"group"===i.type)return i.layers.addMany(t),i}))).apply(this,arguments)}function w(e,r,a){return C.apply(this,arguments)}function C(){return(C=r._asyncToGenerator((function*(e,r,a){const y=n.layerLookupMap.FeatureLayer,t=yield y(),i=r.featureCollection,o=i.showLegend,l=i.layers.map((e=>{const r=new t;return r.read(e,a),null!=o&&r.read({showLegend:o},a),r}));e.layers.addMany(l)}))).apply(this,arguments)}e.populateOperationalLayers=p,Object.defineProperty(e,"__esModule",{value:!0})}));