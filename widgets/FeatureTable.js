/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../chunks/_rollupPluginBabelHelpers","../chunks/tslib.es6","../intl","../core/Collection","../core/HandleOwner","../core/watchUtils","../core/accessorSupport/decorators/aliasOf","../core/has","../core/accessorSupport/decorators/cast","../core/Logger","../core/accessorSupport/decorators/property","../core/accessorSupport/decorators/subclass","./Widget","./FeatureTable/FeatureTableViewModel","./FeatureTable/Grid/support/ButtonMenu","./FeatureTable/Grid/support/ButtonMenuItem","./support/widgetUtils","./support/decorators/messageBundle","./support/jsxFactory","../intl/locale","../intl/substitute","../intl/messages"],(function(e,t,n,l,o,i,s,r,a,d,u,c,h,m,p,g,_,v,f,w,b,y){"use strict";const M={header:!0,menu:!0,menuItems:{clearSelection:!0,refreshData:!0,toggleColumns:!0},selectionColumn:!0},C={base:"esri-feature-table",header:"esri-feature-table__header",title:"esri-feature-table__title",content:"esri-feature-table__content",loader:"esri-feature-table__loader",loaderContainer:"esri-feature-table__loader-container",menuContainer:"esri-feature-table__menu",menuIcon:"esri-icon-handle-horizontal",menuItemGroupOpenedIcon:"esri-icon-down",menuItemGroupClosedIcon:"esri-icon-right",checkmarkIcon:"esri-icon-check-mark",widget:"esri-widget"};let I=function(t){function n(e,n){var o;return(o=t.call(this,e,n)||this).attachmentsEnabled=null,o.columns=new l,o.editingEnabled=null,o.fieldConfigs=null,o.filterGeometry=null,o.grid=null,o.highlightOnRowSelectEnabled=!0,o.label=void 0,o.layer=null,o.messages=null,o.menu=null,o.menuConfig=null,o.pageSize=50,o.view=null,o.viewModel=new m,o.visibleElements={...M},o}e._inheritsLoose(n,t);var o=n.prototype;return o.initialize=function(){var t,n,l,o=this;const s=function(){var t=e._asyncToGenerator((function*(){return o.messages=yield y.fetchMessageBundle("esri/widgets/FeatureTable/t9n/FeatureTable")}));return function(){return t.apply(this,arguments)}}();s(),this.handles.add([w.onLocaleChange(s),i.on(this,"grid.selectedItems","change",(e=>this._onSelectionChange(e))),i.watch(this,["viewModel.store.querying","viewModel.store.syncing","grid.size"],(()=>this.scheduleRender())),i.on(this,"viewModel.columns","change",(()=>this._updateMenuItems())),i.watch(this,"menuConfig",(()=>this._syncMenuConfig())),i.watch(this,"messages",(()=>{var e;this.menu.label=null==(e=this.messages)?void 0:e.options,this._updateMenuItems()}))]),this._set("menu",new p({label:null==(t=this.messages)?void 0:t.options,iconClass:C.menuIcon,...this.menuConfig}));const{attachmentsEnabled:r,relatedRecordsEnabled:a}=this;null==(n=this.viewModel)||null==(l=n.store)||l.set({attachmentsEnabled:r,relatedRecordsEnabled:a})},o.destroy=function(){var e;this.clearSelection(),this.handles.removeAll(),null==(e=this.menu)||e.destroy()},o.castVisibleElements=function(e){var t;const n={...M,...e};return null==(t=this.grid)||t.set("visibleElements",{...this.grid.visibleElements,selectionColumn:n.selectionColumn}),n},o.clearHighlights=function(){},o.clearSelection=function(){},o.deselectRows=function(){},o.hideColumn=function(e){var t;null==(t=this.grid)||t.hideColumn(e),this._updateMenuItems()},o.refresh=function(){},o.showColumn=function(e){var t;null==(t=this.grid)||t.showColumn(e),this._updateMenuItems()},o.sortColumn=function(){},o.selectRows=function(){},o.scrollToIndex=function(){},o.render=function(){var e;return f.tsx("div",{bind:this,class:this.classes(C.base,C.widget)},this.visibleElements.header?this._renderHeader():null,f.tsx("div",{class:C.content},"disabled"!==this.state&&(null==(e=this.grid)?void 0:e.render())))},o._renderHeader=function(){return f.tsx("div",{key:"header",class:C.header},this._renderLoader(),this._renderTitle(),this.visibleElements.menu?this._renderMenu():null)},o._renderTitle=function(){return f.tsx("div",{class:C.title,key:"title"},this._getTitle())},o._getTitle=function(){const{grid:e,layer:{title:t},messages:n,viewModel:{size:l}}=this;return e?b.substitute(n.header,{title:t,count:l,selected:e.selectedItems.length||0}):""},o._renderLoader=function(){const{state:e,store:t}=this.viewModel,n="loading"===e||t.syncing||t.querying;return f.tsx("div",{class:C.loaderContainer},n?f.tsx("div",{class:C.loader,key:"loader"}):null)},o._renderMenu=function(){return f.tsx("div",{class:C.menuContainer},this.menu.render())},o._onSelectionChange=function(e){const{added:t,removed:n}=e;this.emit("selection-change",{added:[...t],removed:[...n]})},o._syncMenuConfig=function(){var e;null==(e=this.menu)||e.set({...this.menuConfig,items:this._getMenuItems()})},o._updateMenuItems=function(){var e;null==(e=this.menu)||e.set("items",this._getMenuItems())},o._getMenuItems=function(){var e;const t=null==(e=this.menuConfig)?void 0:e.items,n=this._getDefaultMenuItems(),l=[];return(null==n?void 0:n.length)&&l.push(...n),(null==t?void 0:t.length)&&l.push(...t),l},o._getDefaultMenuItems=function(){var e;const{messages:t,viewModel:n,visibleElements:l}=this,{menuItems:o}=l,i=[];return(null==o?void 0:o.clearSelection)&&i.push(new g({selectionEnabled:!1,label:null==t?void 0:t.clearSelection,clickFunction:()=>this.clearSelection()})),(null==o?void 0:o.refreshData)&&i.push(new g({selectionEnabled:!1,label:null==t?void 0:t.refreshData,clickFunction:()=>this.refresh()})),(null==o?void 0:o.toggleColumns)&&i.push(new g({iconClass:C.menuItemGroupClosedIcon,label:null==t?void 0:t.toggleColumns,clickFunction:this._toggleMenuItemSelectedIcon,items:null==n||null==(e=n.columns)?void 0:e.items.map((({header:e,hidden:t,path:n})=>new g({label:e||n,selected:!t,selectionEnabled:!0,iconClass:C.checkmarkIcon,clickFunction:()=>this._toggleColumnFromMenuItem(n)})))})),i.length?i:null},o._toggleMenuItemSelectedIcon=function({item:e}){null==e||e.set("iconClass",null!=e&&e.selected?C.menuItemGroupOpenedIcon:C.menuItemGroupClosedIcon)},o._toggleColumnFromMenuItem=function(e){const{grid:t,viewModel:n}=this,l=n.findColumn(e);null!=l&&l.hidden?t.showColumn(e):t.hideColumn(e)},n}(o.HandleOwnerMixin(h));return t.__decorate([s.aliasOf("viewModel.attachmentsEnabled")],I.prototype,"attachmentsEnabled",void 0),t.__decorate([s.aliasOf("viewModel.columns")],I.prototype,"columns",void 0),t.__decorate([s.aliasOf("viewModel.editingEnabled")],I.prototype,"editingEnabled",void 0),t.__decorate([s.aliasOf("viewModel.fieldConfigs")],I.prototype,"fieldConfigs",void 0),t.__decorate([s.aliasOf("viewModel.filterGeometry")],I.prototype,"filterGeometry",void 0),t.__decorate([s.aliasOf("viewModel.grid")],I.prototype,"grid",void 0),t.__decorate([s.aliasOf("viewModel.highlightOnRowSelectEnabled")],I.prototype,"highlightOnRowSelectEnabled",void 0),t.__decorate([u.property({aliasOf:{source:"messages.widgetLabel",overridable:!0}})],I.prototype,"label",void 0),t.__decorate([s.aliasOf("viewModel.layer")],I.prototype,"layer",void 0),t.__decorate([u.property(),v.messageBundle("esri/widgets/FeatureTable/t9n/FeatureTable")],I.prototype,"messages",void 0),t.__decorate([u.property({readOnly:!0})],I.prototype,"menu",void 0),t.__decorate([u.property()],I.prototype,"menuConfig",void 0),t.__decorate([s.aliasOf("viewModel.pageSize")],I.prototype,"pageSize",void 0),t.__decorate([s.aliasOf("viewModel.relatedRecordsEnabled")],I.prototype,"relatedRecordsEnabled",void 0),t.__decorate([s.aliasOf("viewModel.state")],I.prototype,"state",void 0),t.__decorate([s.aliasOf("viewModel.view")],I.prototype,"view",void 0),t.__decorate([u.property()],I.prototype,"viewModel",void 0),t.__decorate([u.property()],I.prototype,"visibleElements",void 0),t.__decorate([a.cast("visibleElements")],I.prototype,"castVisibleElements",null),t.__decorate([s.aliasOf("viewModel.clearHighlights")],I.prototype,"clearHighlights",null),t.__decorate([s.aliasOf("viewModel.clearSelection")],I.prototype,"clearSelection",null),t.__decorate([s.aliasOf("viewModel.deselectRows")],I.prototype,"deselectRows",null),t.__decorate([s.aliasOf("viewModel.refresh")],I.prototype,"refresh",null),t.__decorate([s.aliasOf("viewModel.sortColumn")],I.prototype,"sortColumn",null),t.__decorate([s.aliasOf("viewModel.selectRows")],I.prototype,"selectRows",null),t.__decorate([s.aliasOf("viewModel.scrollToIndex")],I.prototype,"scrollToIndex",null),I=t.__decorate([c.subclass("esri.widgets.FeatureTable")],I),I}));