/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","../../../../chunks/_rollupPluginBabelHelpers","../../state/controllers/GamepadKeyboardController","../../../input/InputHandler"],(function(e,t,r,a){"use strict";let o=function(e){function a(t,r){var a;return(a=e.call(this,!0)||this).view=t,a.disableMovements={pan:!0,zoom:!1,ascend:!0,rotate:!1,mode:2},a.keyToNumber={[r.left]:0,[r.right]:1,[r.forward]:2,[r.backward]:3,[r.up]:4,[r.down]:5,[r.headingLeft]:6,[r.headingRight]:7,[r.tiltUp]:8,[r.tiltDown]:9,[r.zoomIn]:10,[r.zoomOut]:11},a.registerIncoming("key-down",null,(e=>a.handleKeyDown(e))),a.registerIncoming("key-up",null,(e=>a.handleKeyUp(e))),a.registerIncoming("blur",null,(()=>a.handleBlur())),a}t._inheritsLoose(a,e);var o=a.prototype;return o.handleKeyDown=function(e){if(e.data.native.ctrlKey||e.data.native.metaKey)return;const t=this.keyToNumber[e.data.key];null!=t&&(this.cameraControllerKeyboard&&this.cameraControllerKeyboard.active||(this.cameraControllerKeyboard=new r.GamepadKeyboardController({view:this.view,disableMovements:this.disableMovements}),this.view.state.switchCameraController(this.cameraControllerKeyboard)),this.cameraControllerKeyboard.active&&(this.cameraControllerKeyboard.activateDirection(t),e.stopPropagation()))},o.handleBlur=function(){this.cameraControllerKeyboard&&this.cameraControllerKeyboard.active&&(this.cameraControllerKeyboard.finishController(),this.cameraControllerKeyboard=null)},o.handleKeyUp=function(e){if(e.data.native.ctrlKey||e.data.native.metaKey)return;const t=this.keyToNumber[e.data.key];null!=t&&this.cameraControllerKeyboard&&this.cameraControllerKeyboard.active&&(this.cameraControllerKeyboard.deactivateDirection(t),e.stopPropagation())},a}(a.InputHandler);e.KeyboardNavigation=o,Object.defineProperty(e,"__esModule",{value:!0})}));