/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../kernel","../../../request","../../../core/urlUtils","../support/AttachmentInfo","../../../tasks/operations/urlUtils"],(function(t,e,o,n,r,s){"use strict";function a(t){const e=t.toJSON();return e.attachmentTypes&&(e.attachmentTypes=e.attachmentTypes.join(",")),e.keywords&&(e.keywords=e.keywords.join(",")),e.globalIds&&(e.globalIds=e.globalIds.join(",")),e.objectIds&&(e.objectIds=e.objectIds.join(",")),e.size&&(e.size=e.size.join(",")),e}function c(t,o){const s={};for(const a of t){const{parentObjectId:t,parentGlobalId:c,attachmentInfos:u}=a;for(const a of u){const{id:u}=a,d=n.addProxy(e.addTokenParameter(`${o}/${t}/attachments/${u}`)),l=r.fromJSON(a);l.set({url:d,parentObjectId:t,parentGlobalId:c}),s[t]?s[t].push(l):s[t]=[l]}}return s}function u(t,e,n){let r={query:s.mapParameters({...t.query,f:"json",...a(e)})};return n&&(r={...n,...r,query:{...n.query,...r.query}}),o(t.path+"/queryAttachments",r)}t.executeAttachmentQuery=u,t.processAttachmentQueryResult=c,Object.defineProperty(t,"__esModule",{value:!0})}));