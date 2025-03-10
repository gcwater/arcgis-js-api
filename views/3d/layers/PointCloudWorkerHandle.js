/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../chunks/_rollupPluginBabelHelpers","../../../core/maybe","../../../core/workers/WorkerHandle"],(function(t,e,r,o){"use strict";let u=function(t){function o(e){return t.call(this,"PointCloudWorker","transform",e)||this}return e._inheritsLoose(o,t),o.prototype.getTransferList=function(t){const e=[t.geometryBuffer];if(r.isSome(t.primaryAttributeData)&&t.primaryAttributeData.buffer&&e.push(t.primaryAttributeData.buffer),r.isSome(t.modulationAttributeData)&&t.modulationAttributeData.buffer&&e.push(t.modulationAttributeData.buffer),r.isSome(t.filterAttributesData))for(const o of t.filterAttributesData)r.isSome(o)&&o.buffer&&e.push(o.buffer);for(const r of t.userAttributesData)r.buffer&&e.push(r.buffer);return e},o}(o.WorkerHandle);t.PointCloudWorkerHandle=u,Object.defineProperty(t,"__esModule",{value:!0})}));
