/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../core/has","../../core/maybe","../SimpleFillSymbol","../SimpleLineSymbol","../SimpleMarkerSymbol","../TextSymbol","./defaultsJSON"],(function(o,e,l,r,t,S,n,m){"use strict";const y=S.fromJSON(m.defaultPointSymbolJSON),i=t.fromJSON(m.defaultPolylineSymbolJSON),u=r.fromJSON(m.defaultPolygonSymbolJSON),f=n.fromJSON(m.defaultTextSymbolJSON);function b(o){if(l.isNone(o))return null;switch(o.type){case"mesh":return null;case"point":case"multipoint":return y;case"polyline":return i;case"polygon":case"extent":return u}return null}const a=S.fromJSON(m.errorPointSymbolJSON),s=t.fromJSON(m.errorPolylineSymbolJSON),N=r.fromJSON(m.errorPolygonSymbolJSON);o.defaultPointSymbol2D=y,o.defaultPolygonSymbol2D=u,o.defaultPolylineSymbol2D=i,o.defaultTextSymbol2D=f,o.errorPointSymbol2D=a,o.errorPolygonSymbol2D=N,o.errorPolylineSymbol2D=s,o.getDefaultSymbol2D=b,Object.defineProperty(o,"__esModule",{value:!0})}));