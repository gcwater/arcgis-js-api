/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports"],(function(t){"use strict";function e(){e=function(t,e){return new r(t,void 0,e)};var t=RegExp.prototype,n=new WeakMap;function r(t,e,o){var u=new RegExp(t,e);return n.set(u,o||n.get(t)),h(u,r.prototype)}function o(t,e){var r=n.get(e);return Object.keys(r).reduce((function(e,n){return e[n]=t[r[n]],e}),Object.create(null))}return p(r,RegExp),r.prototype.exec=function(e){var n=t.exec.call(this,e);return n&&(n.groups=o(n,this)),n},r.prototype[Symbol.replace]=function(e,r){if("string"==typeof r){var u=n.get(this);return t[Symbol.replace].call(this,e,r.replace(/\$<([^>]+)>/g,(function(t,e){return"$"+u[e]})))}if("function"==typeof r){var i=this;return t[Symbol.replace].call(this,e,(function(){var t=arguments;return"object"!=typeof t[t.length-1]&&(t=[].slice.call(t)).push(o(t,i)),r.apply(this,t)}))}return t[Symbol.replace].call(this,e,r)},e.apply(this,arguments)}function n(t){var e;if("undefined"!=typeof Symbol&&(Symbol.asyncIterator&&(e=t[Symbol.asyncIterator]),null==e&&Symbol.iterator&&(e=t[Symbol.iterator])),null==e&&(e=t["@@asyncIterator"]),null==e&&(e=t["@@iterator"]),null==e)throw new TypeError("Object is not async iterable");return e.call(t)}function r(t){this.wrapped=t}function o(t){var e,n;function o(t,r){return new Promise((function(o,i){var c={key:t,arg:r,resolve:o,reject:i,next:null};n?n=n.next=c:(e=n=c,u(t,r))}))}function u(e,n){try{var o=t[e](n),c=o.value,a=c instanceof r;Promise.resolve(a?c.wrapped:c).then((function(t){a?u("return"===e?"return":"next",t):i(o.done?"return":"normal",t)}),(function(t){u("throw",t)}))}catch(l){i("throw",l)}}function i(t,r){switch(t){case"return":e.resolve({value:r,done:!0});break;case"throw":e.reject(r);break;default:e.resolve({value:r,done:!1})}(e=e.next)?u(e.key,e.arg):n=null}this._invoke=o,"function"!=typeof t.return&&(this.return=void 0)}function u(t){return function(){return new o(t.apply(this,arguments))}}function i(t){return new r(t)}function c(t,e,n,r,o,u,i){try{var c=t[u](i),a=c.value}catch(l){return void n(l)}c.done?e(a):Promise.resolve(a).then(r,o)}function a(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var u=t.apply(e,n);function i(t){c(u,r,o,i,a,"next",t)}function a(t){c(u,r,o,i,a,"throw",t)}i(void 0)}))}}function l(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function f(t,e,n){return e&&l(t.prototype,e),n&&l(t,n),t}function p(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&h(t,e)}function s(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,h(t,e)}function y(t){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function h(t,e){return(h=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function v(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function b(t,e,n){return(b=v()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var o=new(Function.bind.apply(t,r));return n&&h(o,n.prototype),o}).apply(null,arguments)}function w(t){return-1!==Function.toString.call(t).indexOf("[native code]")}function d(t){var e="function"==typeof Map?new Map:void 0;return(d=function(t){if(null===t||!w(t))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,n)}function n(){return b(t,arguments,y(this).constructor)}return n.prototype=Object.create(t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),h(n,t)})(t)}function m(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}o.prototype["function"==typeof Symbol&&Symbol.asyncIterator||"@@asyncIterator"]=function(){return this},o.prototype.next=function(t){return this._invoke("next",t)},o.prototype.throw=function(t){return this._invoke("throw",t)},o.prototype.return=function(t){return this._invoke("return",t)},t._assertThisInitialized=m,t._asyncIterator=n,t._asyncToGenerator=a,t._awaitAsyncGenerator=i,t._createClass=f,t._inheritsLoose=s,t._wrapAsyncGenerator=u,t._wrapNativeSuper=d,t._wrapRegExp=e}));