/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../../../chunks/_rollupPluginBabelHelpers","../../../chunks/tslib.es6","../../../core/Evented","../../../core/HandleOwner","../../../core/watchUtils","../../../core/accessorSupport/decorators/property","../../../core/has","../../../core/accessorSupport/ensureType","../../../core/Logger","../../../core/accessorSupport/decorators/subclass","./support/ButtonMenu","../../support/widgetUtils"],(function(e,t,o,r,n,i,s,d,l,a,c,u){"use strict";const p={sortAscIcon:"esri-icon-arrow-up",sortDescIcon:"esri-icon-arrow-down",menuContainer:"esri-column__menu-container",menuIcon:"esri-icon-handle-horizontal",sorter:"esri-column__sorter"},h={keyboardSort1:"Enter",keyboardSort2:"Spacebar"};let m=function(t){function o(o){var r;return(r=t.call(this,o)||this)._menuContainer=null,r.activeRowIndex=null,r.autoWidth=!1,r.cellValueFormatFunction=({value:e})=>u.renderingSanitizer.sanitize(e),r.flexGrow=1,r.footerRenderFunction=null,r.frozen=!1,r.grid=null,r.header=null,r.headerRenderFunction=t=>{const{root:o}=t,{header:n,headerMenuEnabled:i,path:s,sortable:d}=e._assertThisInitialized(r);if(r.removeCellContent(o),d)return r.headerSorterRenderFunction(t),void(i&&r.headerMenuRenderFunction(t));i&&r.headerMenuRenderFunction(t);const l=n||s;o.innerHTML!==l&&(o.innerHTML=l)},r.headerMenuRenderFunction=({root:e})=>{var t,o;(null==(t=r.menu)||null==(o=t.items)?void 0:o.length)&&e.appendChild(r._menuContainer)},r.headerSorterRenderFunction=({root:t})=>{var o;const{header:n,path:i,sortElement:s}=e._assertThisInitialized(r),d=n||i;if(!s)return void(t.innerHTML=d);s.innerHTML!==d&&s.setAttribute("innerHTML",d),t.appendChild(s);const l=null==(o=r.grid)?void 0:o.getSlotElementByName(t.slot),a=null==l?void 0:l.parentElement;a&&!a.onkeydown&&(a.onkeydown=({key:e})=>{e!==h.keyboardSort1&&e!==h.keyboardSort2||s.click()})},r.hidden=!1,r.headerMenuEnabled=!0,r.menu=null,r.menuConfig=null,r.messages=null,r.messagesCommon=null,r.renderFunction=({root:e,column:t,rowData:o})=>{const n=r.getCellValue(t,o),i=r.cellValueFormatFunction({column:t,rowData:o,value:n});e.innerHTML!==i&&(e.innerHTML=i)},r.resizable=!0,r.sortable=!0,r.sortElement=null,r.textAlign="start",r.width=200,r}e._inheritsLoose(o,t);var r=o.prototype;return r.initialize=function(){const{messages:e,path:t}=this;this._set("sortElement",this.createSortElement()),this.sortElement.setAttribute("path",t),this._menuContainer=document.createElement("div"),this._menuContainer.classList.add(p.menuContainer),this.menu=new c({label:null==e?void 0:e.options,iconClass:p.menuIcon,...this.menuConfig}),this.menu.container=this._menuContainer,this.menu.set("items",this.getMenuItems()),this.handles.add([n.watch(this,"hidden",(()=>{var e;return null==(e=this.menu)?void 0:e.set("open",!1)}))])},r.destroy=function(){var e;null==(e=this.menu)||e.destroy()},r.getMenuItems=function(){const{menuConfig:e,sortable:t}=this,o=null==e?void 0:e.items,r=this.getSortMenuItems(),n=[];return t&&n.push(...r),(null==o?void 0:o.length)&&n.push(...o),n.length?n:null},r.getSortMenuItems=function(){const{messages:e}=this;return[{selected:"asc"===this.direction,iconClass:p.sortAscIcon,label:null==e?void 0:e.sortAsc,autoCloseMenu:!0,clickFunction:()=>this.set("direction","asc"!==this.direction?"asc":null)},{selected:"desc"===this.direction,iconClass:p.sortDescIcon,label:null==e?void 0:e.sortDesc,autoCloseMenu:!0,clickFunction:()=>this.set("direction","desc"!==this.direction?"desc":null)}]},r.getCellValue=function(e,t){var o;return null!=(o=null==t?void 0:t.item[null==e?void 0:e.path])?o:""},r.createSortElement=function(){const{direction:e,header:t,path:o}=this,r=t||o,n=document.createElement("vaadin-grid-sorter");return n.classList.add(p.sorter),n.setAttribute("path",o),e&&n.setAttribute("direction",e),n.innerHTML=r,n.setAttribute("title",r),n},r.removeCellContent=function(e){if(e)for(;e.firstChild;)try{e.removeChild(e.firstChild)}catch(t){}},e._createClass(o,[{key:"direction",get:function(){return this._get("direction")||null},set:function(e){this.sortable&&(this.sortElement&&(e?this.sortElement.direction!==e&&this.sortElement.setAttribute("direction",e):this.sortElement.removeAttribute("direction")),this._set("direction",e))}},{key:"path",set:function(e){this.sortElement&&this.sortElement.path!==e&&this.sortElement.setAttribute("path",e),this._set("path",e)}}]),o}(r.HandleOwnerMixin(o.EventedAccessor));return t.__decorate([i.property()],m.prototype,"activeRowIndex",void 0),t.__decorate([i.property()],m.prototype,"autoWidth",void 0),t.__decorate([i.property()],m.prototype,"cellValueFormatFunction",void 0),t.__decorate([i.property()],m.prototype,"direction",null),t.__decorate([i.property()],m.prototype,"flexGrow",void 0),t.__decorate([i.property()],m.prototype,"footerRenderFunction",void 0),t.__decorate([i.property()],m.prototype,"frozen",void 0),t.__decorate([i.property()],m.prototype,"grid",void 0),t.__decorate([i.property()],m.prototype,"header",void 0),t.__decorate([i.property()],m.prototype,"headerRenderFunction",void 0),t.__decorate([i.property()],m.prototype,"headerMenuRenderFunction",void 0),t.__decorate([i.property()],m.prototype,"headerSorterRenderFunction",void 0),t.__decorate([i.property()],m.prototype,"hidden",void 0),t.__decorate([i.property()],m.prototype,"headerMenuEnabled",void 0),t.__decorate([i.property()],m.prototype,"menu",void 0),t.__decorate([i.property()],m.prototype,"menuConfig",void 0),t.__decorate([i.property()],m.prototype,"messages",void 0),t.__decorate([i.property()],m.prototype,"messagesCommon",void 0),t.__decorate([i.property()],m.prototype,"path",null),t.__decorate([i.property()],m.prototype,"renderFunction",void 0),t.__decorate([i.property()],m.prototype,"resizable",void 0),t.__decorate([i.property()],m.prototype,"sortable",void 0),t.__decorate([i.property({readOnly:!0})],m.prototype,"sortElement",void 0),t.__decorate([i.property()],m.prototype,"textAlign",void 0),t.__decorate([i.property()],m.prototype,"width",void 0),m=t.__decorate([a.subclass("esri.widgets.FeatureTable.Grid.Column")],m),m}));