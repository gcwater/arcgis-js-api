/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../../../chunks/_rollupPluginBabelHelpers","../../../../../chunks/tslib.es6","../../../../../Color","../../../../../core/Accessor","../../../../../core/accessorSupport/decorators/property","../../../../../core/has","../../../../../core/accessorSupport/ensureType","../../../../../core/Logger","../../../../../core/accessorSupport/decorators/subclass"],(function(e,o,r,i,t,n,a,p,s,g){"use strict";e.LineOfSightLaserLineConfiguration=function(e){function r(o){var r;return(r=e.call(this,o)||this).enabled=!0,r.glowColor=new i([255,127,0]),r.glowWidth=8,r.innerColor=new i([255,255,255]),r.innerWidth=.75,r.globalAlpha=.75,r}return o._inheritsLoose(r,e),r}(t),r.__decorate([n.property({type:Boolean})],e.LineOfSightLaserLineConfiguration.prototype,"enabled",void 0),r.__decorate([n.property({type:i})],e.LineOfSightLaserLineConfiguration.prototype,"glowColor",void 0),r.__decorate([n.property({type:Number})],e.LineOfSightLaserLineConfiguration.prototype,"glowWidth",void 0),r.__decorate([n.property({type:i})],e.LineOfSightLaserLineConfiguration.prototype,"innerColor",void 0),r.__decorate([n.property({type:Number})],e.LineOfSightLaserLineConfiguration.prototype,"innerWidth",void 0),r.__decorate([n.property({type:Number})],e.LineOfSightLaserLineConfiguration.prototype,"globalAlpha",void 0),e.LineOfSightLaserLineConfiguration=r.__decorate([g.subclass("esri.views.3d.interactive.analysisTools.lineOfSight.LineOfSightLaserLineConfiguration")],e.LineOfSightLaserLineConfiguration),e.LineOfSightObserverConfiguration=function(e){function r(o){var r;return(r=e.call(this,o)||this).size=.5,r.color=new i([255,127,0,.75]),r}return o._inheritsLoose(r,e),r}(t),r.__decorate([n.property({type:Number})],e.LineOfSightObserverConfiguration.prototype,"size",void 0),r.__decorate([n.property({type:i})],e.LineOfSightObserverConfiguration.prototype,"color",void 0),e.LineOfSightObserverConfiguration=r.__decorate([g.subclass("esri.views.3d.interactive.analysisTools.lineOfSight.LineOfSightObserverConfiguration")],e.LineOfSightObserverConfiguration),e.LineOfSightTargetConfiguration=function(e){function r(o){var r;return(r=e.call(this,o)||this).size=.5,r.visibleColor=new i([3,252,111,.75]),r.occludedColor=new i([252,3,69,.75]),r.undefinedColor=new i([127,127,127,.75]),r}return o._inheritsLoose(r,e),r}(t),r.__decorate([n.property({type:Number})],e.LineOfSightTargetConfiguration.prototype,"size",void 0),r.__decorate([n.property({type:i})],e.LineOfSightTargetConfiguration.prototype,"visibleColor",void 0),r.__decorate([n.property({type:i})],e.LineOfSightTargetConfiguration.prototype,"occludedColor",void 0),r.__decorate([n.property({type:i})],e.LineOfSightTargetConfiguration.prototype,"undefinedColor",void 0),e.LineOfSightTargetConfiguration=r.__decorate([g.subclass("esri.views.3d.interactive.analysisTools.lineOfSight.LineOfSightTargetConfiguration")],e.LineOfSightTargetConfiguration);let f=function(e){function r(o){var r;return(r=e.call(this,o)||this).innerWidth=2,r.outerWidth=8,r.visibleInnerColor=new i([3,252,111,1]),r.visibleOuterColor=new i([3,252,111,.15]),r.occludedInnerColor=new i([252,3,69,1]),r.occludedOuterColor=new i([252,3,69,.1]),r.undefinedInnerColor=new i([255,255,255,1]),r.undefinedOuterColor=new i([127,127,127,.2]),r}return o._inheritsLoose(r,e),r}(t);r.__decorate([n.property({type:Number})],f.prototype,"innerWidth",void 0),r.__decorate([n.property({type:Number})],f.prototype,"outerWidth",void 0),r.__decorate([n.property({type:i})],f.prototype,"visibleInnerColor",void 0),r.__decorate([n.property({type:i})],f.prototype,"visibleOuterColor",void 0),r.__decorate([n.property({type:i})],f.prototype,"occludedInnerColor",void 0),r.__decorate([n.property({type:i})],f.prototype,"occludedOuterColor",void 0),r.__decorate([n.property({type:i})],f.prototype,"undefinedInnerColor",void 0),r.__decorate([n.property({type:i})],f.prototype,"undefinedOuterColor",void 0),e.LineOfSightToolConfiguration=function(r){function i(o){var i;return(i=r.call(this,o)||this).laserLine=new e.LineOfSightLaserLineConfiguration,i.observer=new e.LineOfSightObserverConfiguration,i.target=new e.LineOfSightTargetConfiguration,i.lineOfSight=new f,i}return o._inheritsLoose(i,r),i}(t),r.__decorate([n.property({type:e.LineOfSightLaserLineConfiguration})],e.LineOfSightToolConfiguration.prototype,"laserLine",void 0),r.__decorate([n.property({type:e.LineOfSightObserverConfiguration})],e.LineOfSightToolConfiguration.prototype,"observer",void 0),r.__decorate([n.property({type:e.LineOfSightTargetConfiguration})],e.LineOfSightToolConfiguration.prototype,"target",void 0),r.__decorate([n.property({type:f})],e.LineOfSightToolConfiguration.prototype,"lineOfSight",void 0),e.LineOfSightToolConfiguration=r.__decorate([g.subclass("esri.views.3d.interactive.analysisTools.lineOfSight.LineOfSightToolConfiguration")],e.LineOfSightToolConfiguration),e.LineOfSightConfiguration=f,Object.defineProperty(e,"__esModule",{value:!0})}));