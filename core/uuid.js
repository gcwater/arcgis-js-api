/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","./global"],(function(e,t){"use strict";function n(){const e=o.getRandomValues(new Uint16Array(8));e[3]=4095&e[3]|16384,e[4]=16383&e[4]|32768;const t=t=>e[t].toString(16);return t(0)+t(1)+"-"+t(2)+"-"+t(3)+"-"+t(4)+"-"+t(5)+t(6)+t(7)}const o=t.crypto||t.msCrypto;e.generateUUID=n,Object.defineProperty(e,"__esModule",{value:!0})}));
