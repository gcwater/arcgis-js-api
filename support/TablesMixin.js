/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../chunks/_rollupPluginBabelHelpers","../chunks/tslib.es6","../core/Collection","../core/collectionUtils","../core/Logger","../core/accessorSupport/decorators/property","../core/has","../core/accessorSupport/ensureType","../core/accessorSupport/decorators/subclass"],(function(e,t,r,s,o,n,i,a,l,c){"use strict";const u="esri.support.TablesMixin",p=n.getLogger(u);function f(e){return e&&"group"===e.type}function b(e,t,r){if(e)for(let s=0,o=e.length;s<o;s++){const o=e.getItemAt(s);if(o[t]===r)return o;if(f(o)){const e=b(o.tables,t,r);if(e)return e}}}const d=e=>{let n=function(e){function r(...r){var o;return(o=e.call(this,...r)||this).tables=new s,o.tables.on("after-add",(e=>{const r=e.item;r.parent&&r.parent!==t._assertThisInitialized(o)&&"tables"in r.parent&&r.parent.tables.remove(r),r.parent=t._assertThisInitialized(o),"feature"!==r.type&&p.error(`Layer 'title:${r.title}, id:${r.id}' of type '${r.type}' is not supported as a table and will therefore be ignored.`)})),o.tables.on("after-remove",(e=>{e.item.parent=null})),o}t._inheritsLoose(r,e);var n=r.prototype;return n.destroy=function(){const e=this.tables.removeAll();for(const t of e)t.destroy();this.tables.destroy()},n.findTableById=function(e){return b(this.tables,"id",e)},n.findTableByUid=function(e){return b(this.tables,"uid",e)},t._createClass(r,[{key:"tables",set:function(e){this._set("tables",o.referenceSetter(e,this._get("tables")))}}]),r}(e);return r.__decorate([i.property()],n.prototype,"tables",null),n=r.__decorate([c.subclass(u)],n),n};e.TablesMixin=d,Object.defineProperty(e,"__esModule",{value:!0})}));