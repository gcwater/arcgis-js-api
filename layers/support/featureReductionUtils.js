/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../core/Error","../../core/object","./FeatureReduction","./FeatureReductionCluster","./FeatureReductionSelection"],(function(e,t,n,r,u,o){"use strict";const c={key:"type",base:r.default,typeMap:{selection:o}};function s(e,t){const n=(t=t.layerDefinition||t).featureReduction;if(n)switch(n.type){case"selection":return o.fromJSON(n);case"cluster":return u.fromJSON(n)}return null}function i(e,t,r,u){const o=a(e,{},u);o&&n.setDeepValue(r,o,t)}function a(e,n,r){return e?"selection"!==e.type?(r.messages&&r.messages.push(new t("featureReduction:unsupported",`FeatureReduction of type '${e.declaredClass}' are not supported in scenes.`,{featureReduction:e,context:r})),null):e.write(n,r):null}e.read=s,e.webSceneFeatureReductionTypes=c,e.write=a,e.writeTarget=i,Object.defineProperty(e,"__esModule",{value:!0})}));
