(window.webpackJsonp=window.webpackJsonp||[]).push([[22,23,45],{55:function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return u}));var n=r(0),o=r.n(n),a=r(7),i=r.n(a);function u(e){return o.a.createElement("div",{key:e.idx,className:"d-flex justify-content-center mb-5"},e.statItems)}u.propTypes={idx:i.a.number.isRequired,statItems:i.a.arrayOf(i.a.element).isRequired}},56:function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return U}));var n=r(0),o=r.n(n),a=r(7),i=r.n(a);var u=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e};function c(e,t){return e(t={exports:{}},t.exports),t.exports}var l=c((function(e){function t(){return e.exports=t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},t.apply(this,arguments)}e.exports=t}));var s=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")};function f(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var p=function(e,t,r){return t&&f(e.prototype,t),r&&f(e,r),e},y=c((function(e){function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(n){return"function"==typeof Symbol&&"symbol"===t(Symbol.iterator)?e.exports=r=function(e){return t(e)}:e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":t(e)},r(n)}e.exports=r}));var b=function(e,t){return!t||"object"!==y(t)&&"function"!=typeof t?u(e):t},m=c((function(e){function t(r){return e.exports=t=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},t(r)}e.exports=t})),d=c((function(e){function t(r,n){return e.exports=t=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},t(r,n)}e.exports=t}));var v=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)};var h=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e},g=Object.prototype.propertyIsEnumerable;function O(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}function w(e){var t=Object.getOwnPropertyNames(e);return Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(e))),t.filter((function(t){return g.call(e,t)}))}var j,E=Object.assign||function(e,t){for(var r,n,o=O(e),a=1;a<arguments.length;a++){r=arguments[a],n=w(Object(r));for(var i=0;i<n.length;i++)o[n[i]]=r[n[i]]}return o},x=c((function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var r=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(c){o=!0,a=c}finally{try{!n&&u.return&&u.return()}finally{if(o)throw a}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};function n(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}var o,a=(o=E)&&o.__esModule?o:{default:o},i=function(e){return e};t.default=function(e){var t=Array.isArray(e)&&2===e.length?e:[e,null],o=r(t,2),u=o[0],c=o[1];return function(e){for(var t=arguments.length,r=Array(t>1?t-1:0),o=1;o<t;o++)r[o-1]=arguments[o];var l=r.map((function(e){return u[e]})).filter(i);return"string"==typeof l[0]||"function"==typeof c?{key:e,className:c?c.apply(void 0,n(l)):l.join(" ")}:{key:e,style:a.default.apply(void 0,[{}].concat(n(l)))}}},e.exports=t.default})),P=(j=x)&&j.__esModule&&Object.prototype.hasOwnProperty.call(j,"default")?j.default:j,S=function(e){function t(e){var r;return s(this,t),(r=b(this,m(t).call(this,e))).hasLoaded=!1,r}return v(t,e),p(t,[{key:"componentDidMount",value:function(){var e=this;this.hasLoaded=!0,this.timeout=setTimeout((function(){e.forceUpdate()}),20)}},{key:"componentDidUpdate",value:function(){clearTimeout(this.timeout)}},{key:"componentWillUnmount",value:function(){clearTimeout(this.timeout)}},{key:"render",value:function(){var e=this.props,t=e.delay,r=e.values,n=e.number,a=e.duration,i=e.theme,u=this.hasLoaded?n:0,c={transitionDuration:"".concat(a,"ms"),transitionDelay:"".concat(t,"ms"),transform:"translate(0, ".concat(u,"em)")};return o.a.createElement("div",l({},i(2,"group"),{style:c}),r.map((function(e){return o.a.createElement("div",l({key:e},i(e,"number")),e)})))}}]),t}(n.PureComponent);h(S,"propTypes",{delay:i.a.number,values:i.a.array,number:i.a.number,duration:i.a.number,theme:i.a.func}),h(S,"defaultProps",{values:[9,8,7,6,5,4,3,2,1,0],number:0,delay:0,duration:700});var I=function(e){function t(e){var r;return s(this,t),r=b(this,m(t).call(this,e)),h(u(u(r)),"renderReels",(function(e,n){var a=0,i=0,u=r.props.duration,c=[9,8,7,6,5,4,3,2,1,0];return e.map((function(e,l){var s=e.type,f=e.value;switch(s){case t.TYPE_INT:case t.TYPE_FRACTION:return o.a.createElement(o.a.Fragment,{key:s+l},t.getNumbers(f).map((function(e){var t=o.a.createElement(S,{theme:n,duration:u,key:s+a,delay:r.delay(a),number:e,values:c});return a++,t})));default:var p=o.a.createElement(S,{theme:n,key:s+i,values:[f]});return i++,p}}))})),h(u(u(r)),"getParts",(function(e){for(var r=[],n=null,o=0;o<e.length;o++){var a=!isNaN(parseInt(e[o],10)),i=a?t.TYPE_INT:t.TYPE_STRING;n===t.TYPE_INT&&a||n===t.TYPE_STRING&&!a?r[r.length-1].value+=e[o]:r.push({type:i,value:e[o]}),n=i}return r})),r.state={text:""},r}return v(t,e),p(t,null,[{key:"getNumbers",value:function(e){return e.toString().split("").map((function(e){return parseInt(e,10)}))}}]),p(t,[{key:"delay",value:function(e){var t=this.state.delayArray,r=this.props.delay;if(!t)return 0;var n=t.indexOf(e);return(n>-1?n+1:0)*r}},{key:"render",value:function(){var e=P(this.props.theme),t=this.getParts(this.props.text);return o.a.createElement("div",l({"aria-label":this.props.text},e(0,"container")),o.a.createElement("div",l({role:"presentation"},e(1,"reel")),this.renderReels(t,e)))}}],[{key:"getDerivedStateFromProps",value:function(e,r){var n=+t.stripNonNumbers(r.text),o=+t.stripNonNumbers(e.text);if(n===o)return null;for(var a=t.getNumbers(n),i=t.getNumbers(o),u=[],c=0;c<i.length;c++)i[c]!==a[c]&&u.push(c);return{text:e.text,delayArray:u}}}]),t}(n.PureComponent);h(I,"TYPE_STRING","string"),h(I,"TYPE_INT","integer"),h(I,"TYPE_FRACTION","fraction"),h(I,"stripNonNumbers",(function(e){return e&&(e.match(/\d/g)||[]).join("")})),h(I,"propTypes",{text:i.a.string.isRequired,duration:i.a.number,delay:i.a.number,theme:i.a.any}),h(I,"defaultProps",{duration:700,delay:85,theme:{reel:"react-reel__reel",group:"react-reel__group",number:"react-reel__number"}});var T=I;function _(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function k(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function A(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?k(Object(r),!0).forEach((function(t){_(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):k(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function N(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==u.return||u.return()}finally{if(o)throw a}}return r}}(e,t)||C(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function R(e){return function(e){if(Array.isArray(e))return D(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||C(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function C(e,t){if(e){if("string"==typeof e)return D(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?D(e,t):void 0}}function D(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var Y=function(e){var t=Object(n.useRef)(e);return Object(n.useEffect)((function(){t.current=e}),[e]),t},L="\ud83d\udca1react-cool-inview: the browser doesn't support Intersection Observer, please install polyfill: https://github.com/wellyshen/react-cool-inview#intersection-observer-polyfill",M="\ud83d\udca1react-cool-inview: the browser doesn't support Intersection Observer v2, fallback to v1 behavior",V=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ref,r=e.root,o=e.rootMargin,a=e.threshold,i=void 0===a?0:a,u=e.trackVisibility,c=e.delay,l=e.unobserveOnEnter,s=void 0!==l&&l,f=e.onChange,p=e.onEnter,y=e.onLeave,b=Object(n.useState)({inView:!1,scrollDirection:{}}),m=N(b,2),d=m[0],v=m[1],h=Object(n.useRef)(!1),g=Object(n.useRef)({}),O=Object(n.useRef)(!1),w=Object(n.useRef)(null),j=Object(n.useRef)(!1),E=Y(f),x=Y(p),P=Y(y),S=Object(n.useRef)(null),I=t||S,T=Object(n.useCallback)((function(){!O.current&&w.current&&(w.current.observe(I.current),O.current=!0)}),[I]),_=Object(n.useCallback)((function(){O.current&&w.current&&(w.current.disconnect(),O.current=!1)}),[]);return Object(n.useEffect)((function(){return I.current?"IntersectionObserver"in window&&"IntersectionObserverEntry"in window?(w.current=new IntersectionObserver((function(e){var t=N(e,1)[0],r=t.intersectionRatio,n=t.isIntersecting,o=t.boundingClientRect,a=o.x,c=o.y,l=t.isVisible,f={},p=Array.isArray(i)?Math.min.apply(Math,R(i)):i,y=void 0!==n?n:r>0;p>0&&(y=r>=p),a<g.current.x&&(f.horizontal="left"),a>g.current.x&&(f.horizontal="right"),g.current.x=a,c<g.current.y&&(f.vertical="up"),c>g.current.y&&(f.vertical="down"),g.current.y=c;var b={entry:t,scrollDirection:f,observe:T,unobserve:_};u&&(void 0!==l||j.current||(console.warn(M),j.current=!0),void 0!==l&&(y=l)),y&&!h.current&&(s&&_(),x.current&&x.current(b)),!y&&h.current&&P.current&&P.current(b),E.current&&E.current(A(A({},b),{},{inView:y})),v({inView:y,scrollDirection:f,entry:t}),h.current=y}),{root:r,rootMargin:o,threshold:i,trackVisibility:u,delay:c}),T(),function(){_()}):(console.error(L),function(){return null}):function(){return null}}),[I,s,r,o,JSON.stringify(i),u,c,T,_]),A(A({ref:I},d),{},{observe:T,unobserve:_})},F={reel:{height:"1em",display:"flex",alignItems:"flex-end",overflowY:"hidden",fontSize:"64px",fontWeight:"300",color:"white",lineHeight:"0.95em"},group:{transitionDelay:"0ms",transitionTimingFunction:"ease-in-out",transform:"translate(0, 0)",height:"1em"},number:{height:"1em"}};function U(e){var t=V({unobserveOnEnter:!0}),r=t.ref,n=t.inView?o.a.createElement(T,{text:e.value,theme:F}):o.a.createElement(o.a.Fragment,null);return o.a.createElement("div",{className:"col-4",ref:r},o.a.createElement("div",{className:"rounded d-flex justify-content-center align-items-center flex-column",style:{height:"200px",backgroundColor:e.backgroundColor}},n,o.a.createElement("p",{className:"stat-caption text-white"},e.caption)))}U.propTypes={value:i.a.string.isRequired,backgroundColor:i.a.string,caption:i.a.string.isRequired}},65:function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return s}));var n=r(0),o=r.n(n),a=r(7),i=r.n(a),u=r(56),c=r(55),l={GLAUCOUS:"#6883BA",YALE_BLUE:"#033860",CHINA_ROSE:"#AB4E68",SPANISH_VIOLET:"#4B2E83",LIGHT_FRENCH_BEIGE:"#B7A57A"};function s(e){return o.a.createElement("div",null,e.statItems&&function(e){for(var t=Object.entries(e),r=Object.values(l),n=[],a=[o.a.createElement(u.default,{key:0,idx:0,caption:t[0][0],value:t[0][1],backgroundColor:r[0]})],i=1;i<t.length;i++){i%3==0&&(n.push(a),a=[]);var s=o.a.createElement(u.default,{key:i,caption:t[i][0],value:t[i][1],backgroundColor:r[i%r.length]});a.push(s)}return n.push(a),n.map((function(e,t){return o.a.createElement(c.default,{key:t,idx:t,statItems:e})}))}(e.statItems))}s.propTypes={statItems:i.a.object.isRequired}}}]);