/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","./_rollupPluginBabelHelpers","./tslib.es6","../Color","../core/JSONSupport","../core/lang","../core/accessorSupport/decorators/property","../core/accessorSupport/ensureType","../core/has","../core/Logger","../core/accessorSupport/decorators/subclass","../symbols/support/materialUtils"],(function(r,o,e,t,l,s,n,c,u,a,p,i){"use strict";var d;r.LineCallout3DBorder$2=d=function(r){function e(){var o;return(o=r.apply(this,arguments)||this).color=new t("white"),o}return o._inheritsLoose(e,r),e.prototype.clone=function(){return new d({color:s.clone(this.color)})},e}(l.JSONSupport),e.__decorate([n.property(i.colorAndTransparencyProperty)],r.LineCallout3DBorder$2.prototype,"color",void 0),r.LineCallout3DBorder$2=d=e.__decorate([p.subclass("esri.symbols.callouts.LineCallout3DBorder")],r.LineCallout3DBorder$2);var L=r.LineCallout3DBorder$2,B=Object.freeze({__proto__:null,get LineCallout3DBorder(){return r.LineCallout3DBorder$2},default:L});r.LineCallout3DBorder=B,r.LineCallout3DBorder$1=L}));