/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["../../../chunks/_rollupPluginBabelHelpers","../../../chunks/tslib.es6","../../../core/watchUtils","../../../core/accessorSupport/decorators/property","../../../core/has","../../../core/accessorSupport/ensureType","../../../core/Logger","../../../core/accessorSupport/decorators/subclass","../../Widget","../BuildingDisciplinesViewModel","./BuildingDisciplinesNode","../../support/widgetUtils","../../support/jsxFactory"],(function(e,i,s,t,o,r,d,l,n,c,a,p,g){"use strict";const u={expand:"expand",collapse:"collapse",hideSublayer:"hideSublayer",showSublayer:"showSublayer"},h={base:`${"esri-building-disciplines-tree"}`};let _=function(i){function t(e){var s;return(s=i.call(this,e)||this)._defaultViewModel=new c,s.viewModel=s._defaultViewModel,s.messages=u,s.toggleSiblingsVisibility=!1,s._childWidgets=[],s._updateChildWidgets=()=>{s._destroyChildWidgets(),s.viewModel&&(s._childWidgets=s.viewModel.root.children.toArray().reverse().map((e=>new a({node:e,messages:s.messages,toggleSiblingsVisibility:s.toggleSiblingsVisibility}))))},s}e._inheritsLoose(t,i);var o=t.prototype;return o.initialize=function(){this.own(s.on(this,"viewModel.root.children","after-changes",this._updateChildWidgets,this._updateChildWidgets,this._updateChildWidgets),s.init(this,["messages","toggleSiblingsVisibility"],this._updateChildWidgets))},o.destroy=function(){this._destroyChildWidgets(),this.viewModel!==this._defaultViewModel&&this._defaultViewModel.destroy()},o.render=function(){return g.tsx("div",{role:"tree",class:h.base},this._childWidgets.map((e=>e.render())))},o._destroyChildWidgets=function(){this._childWidgets.forEach((e=>e.destroy())),this._childWidgets=[]},t}(n);return i.__decorate([t.property({type:c})],_.prototype,"viewModel",void 0),i.__decorate([t.property()],_.prototype,"messages",void 0),i.__decorate([t.property({nonNullable:!0})],_.prototype,"toggleSiblingsVisibility",void 0),i.__decorate([t.property()],_.prototype,"_childWidgets",void 0),_=i.__decorate([l.subclass("esri.widgets.BuildingExplorer.BuildingDisciplinesTree.BuildingDisciplinesTree")],_),_}));