/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../chunks/vec4f64"],(function(e,E){"use strict";var t;e.ElevationProfileState=void 0,(t=e.ElevationProfileState||(e.ElevationProfileState={})).Disabled="disabled",t.Ready="ready",t.Creating="creating",t.Created="created",t.Selecting="selecting",t.Selected="selected";const _=-5e5,i={noDataValue:_,demResolution:"auto",maximumAutoTileRequests:150,ignoreInvisibleLayers:!0},l=100,o=500,r=.1,a=3e3,A=1e4,L=300,S=1e5,T=1,s=400,I=" ― ",R={width:3,outlineSize:0,falloff:0,outlineColor:E.fromArray([1,1,1,0]),renderOccluded:16},d={size:14,borderStyle:"solid",borderWidth:3,borderColor:"#ffffff",boxShadow:"0px 0px 0px 5px rgba(255,255,255,0.2)"},O=10,n={progress:1,hasZ:!1,samples:[],statistics:null,spatialReference:null};e.DEFAULT_DEM_RESOLUTION=r,e.DEFAULT_ELEVATION_PROFILE_QUERY_OPTIONS=i,e.DELAY_AFTER_PREVIEW_MILLIS=o,e.DENSIFICATION_MAX_SAMPLES=a,e.ERROR_RESULT=n,e.FORMAT_PRECISION=T,e.HOVERED_POINTS_STYLE=d,e.LARGE_CHART_SAMPLES=A,e.MAX_CHART_RATIO=L,e.MAX_TOTAL_SAMPLES=S,e.NOT_AVAILABLE=I,e.NO_DATA_VALUE=_,e.PORTRAIT_MODE_PIXEL_BREAKPOINT=s,e.PROFILE_LINES_STYLE_3D=R,e.SLOPE_MIN_SAMPLE_DISTANCE=O,e.UPDATE_THROTTLE_MILLIS=l,Object.defineProperty(e,"__esModule",{value:!0})}));