/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../core/maybe","../../../core/uuid","../../../layers/support/BuildingFilterBlock","../../../layers/support/BuildingFilterModeSolid","../../../layers/support/BuildingFilterModeXRay"],(function(e,t,i,r,n,o){"use strict";const l="__BUILDING_EXPLORER_FILTER__";function s(){return`${i.generateUUID()}${l}`}function u(e){const t="string"==typeof e?e:e.id;return!!t&&-1!==t.indexOf(l)}function f(e,i){for(const r of e.items)for(const e of r.filters.items){if(!u(e))continue;const r=i(e);if(t.isSome(r))return r}return null}function c(e,i){t.isNone(i)||e.forEach((e=>{e.filters=e.filters.filter((e=>!u(e))).concat([i]),e.activeFilterId=i.id}))}function d(e){const t=p(e);return t?new r({filterExpression:t,filterMode:new o}):null}function a(e){const t=p(e);return t?new r({filterExpression:t,filterMode:new n}):null}function p(e){return e.filter((e=>!!e)).map((e=>`(${e})`)).join(" AND ")}e.generateFilterId=s,e.getFilterBlockSolid=a,e.getFilterBlockXRay=d,e.getValueFromFilters=f,e.isBuildingExplorerFilter=u,e.setFilterOnLayers=c,Object.defineProperty(e,"__esModule",{value:!0})}));