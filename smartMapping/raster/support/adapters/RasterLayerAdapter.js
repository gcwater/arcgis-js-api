/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../../../../chunks/_rollupPluginBabelHelpers","../../../../chunks/tslib.es6","../../../../core/Loadable","../../../../core/maybe","../../../../core/accessorSupport/decorators/property","../../../../core/has","../../../../core/accessorSupport/ensureType","../../../../core/Logger","../../../../core/accessorSupport/decorators/subclass"],(function(t,e,r,s,o,a,i,n,p){"use strict";let c=function(e){function r(){var t;return(t=e.apply(this,arguments)||this).type="raster-layer-adapter",t}t._inheritsLoose(r,e);var o=r.prototype;return o.updateRasterInfo=function(){var e=t._asyncToGenerator((function*(t){this.rasterInfo=yield this.generateRasterInfo(t),this.renderingRule=null==t?void 0:t.renderingRule}));function r(t){return e.apply(this,arguments)}return r}(),o.updateRasterInfoWithEstimatedStats=function(){var e=t._asyncToGenerator((function*(t){const e=this.rasterInfo;if(!s.isSome(e.histograms)||!s.isSome(e.statistics)){const{statistics:r,histograms:o}=yield this.estimateStatisticsHistograms(t);s.isSome(e.statistics)||(e.statistics=r),s.isSome(e.histograms)||(e.histograms=o)}}));function r(t){return e.apply(this,arguments)}return r}(),r}(r);return e.__decorate([o.property()],c.prototype,"layer",void 0),e.__decorate([o.property()],c.prototype,"rasterInfo",void 0),e.__decorate([o.property()],c.prototype,"renderingRule",void 0),e.__decorate([o.property({readOnly:!0})],c.prototype,"type",void 0),c=e.__decorate([p.subclass("esri.smartMapping.support.adapters.RasterLayerAdapter")],c),c}));