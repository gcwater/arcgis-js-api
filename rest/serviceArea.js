/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../chunks/_rollupPluginBabelHelpers","../request","../core/queryUtils","../geometry/support/normalizeUtils","./networkService","./utils","./support/ServiceAreaSolveResult"],(function(e,r,t,i,a,s,o,n){"use strict";const l=i.createQueryParamsHelper({accumulateAttributes:{name:"accumulateAttributeNames"},attributeParameterValues:!0,defaultBreaks:!0,facilities:!0,outSpatialReference:{name:"outSR",getter:e=>e.outSpatialReference.wkid},pointBarriers:{name:"barriers"},polylineBarriers:!0,polygonBarriers:!0,restrictionAttributes:{name:"restrictionAttributeNames"},returnPointBarriers:{name:"returnBarriers"},travelMode:!0});function u(e,r,t){return c.apply(this,arguments)}function c(){return(c=r._asyncToGenerator((function*(e,r,i){const u=[],c=[],p={},f={},m=o.parseUrl(e);return r.facilities&&r.facilities.features&&s.collectGeometries(r.facilities.features,c,"facilities.features",p),r.pointBarriers&&r.pointBarriers.features&&s.collectGeometries(r.pointBarriers.features,c,"pointBarriers.features",p),r.polylineBarriers&&r.polylineBarriers.features&&s.collectGeometries(r.polylineBarriers.features,c,"polylineBarriers.features",p),r.polygonBarriers&&r.polygonBarriers.features&&s.collectGeometries(r.polygonBarriers.features,c,"polygonBarriers.features",p),a.normalizeCentralMeridian(c).then((e=>{for(const r in p){const t=p[r];u.push(r),f[r]=e.slice(t[0],t[1])}return s.isInputGeometryZAware(f,u)?s.fetchServiceDescription(m.path).catch((()=>({dontCheck:!0}))):Promise.resolve({dontCheck:!0})})).then((e=>{("dontCheck"in e?e.dontCheck:e.hasZ)||s.dropZValuesOffInputGeometry(f,u);for(const t in f)f[t].forEach(((e,i)=>{r.get(t)[i].geometry=e}));let a={query:{...m.query,f:"json",...l.toQueryParams(r)}};return i&&(a={...i,...a}),t(`${m.path}/solveServiceArea`,a)})).then((e=>n.fromJSON(e.data)))}))).apply(this,arguments)}e.solve=u,Object.defineProperty(e,"__esModule",{value:!0})}));