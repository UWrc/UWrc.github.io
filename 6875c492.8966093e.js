(window.webpackJsonp=window.webpackJsonp||[]).push([[18,9,30,40],{104:function(e,t,a){"use strict";a.d(t,"a",(function(){return u})),a.d(t,"b",(function(){return g}));var n=a(0),r=a.n(n);function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function c(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?c(Object(a),!0).forEach((function(t){l(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=r.a.createContext({}),m=function(e){var t=r.a.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},u=function(e){var t=m(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,l=e.originalType,c=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),u=m(a),d=n,g=u["".concat(c,".").concat(d)]||u[d]||p[d]||l;return a?r.a.createElement(g,o(o({ref:t},s),{},{components:a})):r.a.createElement(g,o({ref:t},s))}));function g(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=a.length,c=new Array(l);c[0]=d;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o.mdxType="string"==typeof e?e:n,c[1]=o;for(var s=2;s<l;s++)c[s]=a[s];return r.a.createElement.apply(null,c)}return r.a.createElement.apply(null,a)}d.displayName="MDXCreateElement"},108:function(e,t,a){"use strict";var n=a(2),r=a(0),l=a.n(r),c=a(112),o=a(103),i=a(105),s=a(126),m=a(125),u=a(119),p=a(107),d=a(106),g=a(111),h=a.n(g),f=a(114),y=function(e){var t=Object(r.useRef)(!1),n=Object(r.useRef)(null),c=Object(f.useHistory)(),i=Object(o.a)().siteConfig,s=(void 0===i?{}:i).baseUrl,m=function(){t.current||(Promise.all([fetch(s+"search-doc.json").then((function(e){return e.json()})),fetch(s+"lunr-index.json").then((function(e){return e.json()})),Promise.all([a.e(48),a.e(53)]).then(a.bind(null,188)),a.e(34).then(a.t.bind(null,187,7))]).then((function(e){!function(e,t,a){new a({searchDocs:e,searchIndex:t,inputSelector:"#search_input_react",handleSelected:function(e,t,a){var n=s+a.url;document.createElement("a").href=n,c.push(n)}})}(e[0],e[1],e[2].default)})),t.current=!0)},u=Object(r.useCallback)((function(t){n.current.contains(t.target)||n.current.focus(),e.handleSearchBarToggle(!e.isSearchBarExpanded)}),[e.isSearchBarExpanded]);return l.a.createElement("div",{className:"navbar__search",key:"search-box"},l.a.createElement("span",{"aria-label":"expand searchbar",role:"button",className:h()("search-icon",{"search-icon-hidden":e.isSearchBarExpanded}),onClick:u,onKeyDown:u,tabIndex:0}),l.a.createElement("input",{id:"search_input_react",type:"search",placeholder:"Search","aria-label":"Search",className:h()("navbar__search-input",{"search-bar-expanded":e.isSearchBarExpanded},{"search-bar":!e.isSearchBarExpanded}),onClick:m,onMouseOver:m,onFocus:u,onBlur:u,ref:n}))},b=a(120),v=a(113),E=a(127),k=a(115),j=a(116),O=a(117),N=a(45),w=a.n(N),_=a(121);a(46);function x(e){return l.a.createElement("div",{className:"scroll-notifier",style:{visibility:e.useScrollNotifier?"visible":"hidden",width:100*e.scrollPercent+"%"}})}var C="right";var P=function(e){var t,a,c=Object(o.a)().siteConfig,i=void 0===c?{}:c,s=!1;try{s=window.location.pathname!=i.baseUrl}catch(se){}var m=Object(o.a)(),u=m.siteConfig.themeConfig,g=u.navbar,h=(g=void 0===g?{}:g).title,f=void 0===h?"":h,N=g.items,P=void 0===N?[]:N,T=g.hideOnScroll,S=void 0!==T&&T,B=g.style,D=void 0===B?void 0:B,I=u.colorMode,L=(I=void 0===I?{}:I).disableSwitch,M=void 0!==L&&L,A=m.isClient,R=Object(r.useState)(!1),F=R[0],H=R[1],J=Object(r.useState)(!1),U=J[0],$=J[1],W=Object(v.a)(),z=W.isDarkTheme,V=W.setLightTheme,K=W.setDarkTheme,X=Object(E.a)(S),Y=X.navbarRef,q=X.isNavbarVisible,G=Object(O.a)(),Q=G.logoLink,Z=G.logoLinkProps,ee=G.logoImageUrl,te=G.logoAlt;Object(k.a)(F);var ae=Object(r.useCallback)((function(){H(!0)}),[H]),ne=Object(r.useCallback)((function(){H(!1)}),[H]),re=Object(r.useCallback)((function(e){return e.target.checked?K():V()}),[V,K]),le=Object(j.a)();Object(r.useEffect)((function(){le===j.b.desktop&&H(!1)}),[le]);var ce=function(e){return{leftItems:e.filter((function(e){var t;return"left"===(null!==(t=e.position)&&void 0!==t?t:C)})),rightItems:e.filter((function(e){var t;return"right"===(null!==(t=e.position)&&void 0!==t?t:C)}))}}(P),oe=ce.leftItems,ie=ce.rightItems;return l.a.createElement(l.a.Fragment,null,l.a.createElement("nav",{ref:Y,className:Object(p.a)("navbar","navbar--fixed-top",(t={"navbar--dark":"dark"===D,"navbar--primary":"primary"===D,"navbar-sidebar--show":F},t[w.a.navbarHideable]=S,t[w.a.navbarHidden]=!q,t)),style:{position:"sticky"}},l.a.createElement("div",{className:"navbar__inner"},l.a.createElement("div",{className:"navbar__items"},null!=P&&0!==P.length&&l.a.createElement("div",{"aria-label":"Navigation bar toggle",className:"navbar__toggle",role:"button",tabIndex:0,onClick:ae,onKeyDown:ae},l.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 30 30",role:"img",focusable:"false"},l.a.createElement("title",null,"Menu"),l.a.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeMiterlimit:"10",strokeWidth:"2",d:"M4 7h22M4 15h22M4 23h22"}))),l.a.createElement(d.a,Object(n.a)({className:"navbar__brand",to:Q},Z),null!=ee&&l.a.createElement("img",{key:A,className:"navbar__logo",src:ee,alt:te}),null!=f&&l.a.createElement("strong",{className:Object(p.a)("navbar__title",(a={},a[w.a.hideLogoText]=U,a))},f)),oe.map((function(e,t){return l.a.createElement(_.a,Object(n.a)({},e,{key:t}))}))),l.a.createElement("div",{className:"navbar__items navbar__items--right"},ie.map((function(e,t){return l.a.createElement(_.a,Object(n.a)({},e,{key:t}))})),!M&&l.a.createElement(b.a,{className:w.a.displayOnlyInLargeViewport,"aria-label":"Dark mode toggle",checked:z,onChange:re}),l.a.createElement(y,{handleSearchBarToggle:$,isSearchBarExpanded:U}))),l.a.createElement("div",{role:"presentation",className:"navbar-sidebar__backdrop",onClick:ne}),l.a.createElement("div",{className:"navbar-sidebar"},l.a.createElement("div",{className:"navbar-sidebar__brand"},l.a.createElement(d.a,Object(n.a)({className:"navbar__brand",onClick:ne,to:Q},Z),null!=ee&&l.a.createElement("img",{key:A,className:"navbar__logo",src:ee,alt:te}),null!=f&&l.a.createElement("strong",{className:"navbar__title"},f)),!M&&F&&l.a.createElement(b.a,{"aria-label":"Dark mode toggle in sidebar",checked:z,onChange:re})),l.a.createElement("div",{className:"navbar-sidebar__items"},l.a.createElement("div",{className:"menu"},l.a.createElement("ul",{className:"menu__list"},P.map((function(e,t){return l.a.createElement(_.a,Object(n.a)({mobile:!0},e,{onClick:ne,key:t}))}))))))),l.a.createElement(x,{useScrollNotifier:s,scrollPercent:e.scrollPercent}))},T=a(122),S=(a(47),a(124));function B(e){var t=e.children;return l.a.createElement(s.a,null,l.a.createElement(m.a,null,t))}t.a=function(e){var t=Object(o.a)().siteConfig,a=t.favicon,r=t.title,s=t.themeConfig,m=s.image,p=s.metadatas,d=t.url,g=e.children,h=e.title,f=e.noFooter,y=e.description,b=e.image,v=e.keywords,E=e.permalink,k=h?h+" | "+r:r,j=b||m,O=Object(i.a)(j,{absolute:!0}),N=Object(i.a)(a),w=1,_=1;try{w=document.body.scrollHeight-window.innerHeight,_=Math.min(1,window.scrollY/w)}catch(C){}var x=Object(S.a)()[0];return l.a.createElement(B,null,l.a.createElement(c.a,null,l.a.createElement("html",{lang:"en"}),k&&l.a.createElement("title",null,k),k&&l.a.createElement("meta",{property:"og:title",content:k}),a&&l.a.createElement("link",{rel:"shortcut icon",href:N}),y&&l.a.createElement("meta",{name:"description",content:y}),y&&l.a.createElement("meta",{property:"og:description",content:y}),v&&v.length&&l.a.createElement("meta",{name:"keywords",content:v.join(",")}),j&&l.a.createElement("meta",{property:"og:image",content:O}),j&&l.a.createElement("meta",{property:"twitter:image",content:O}),j&&l.a.createElement("meta",{name:"twitter:image:alt",content:"Image for "+k}),E&&l.a.createElement("meta",{property:"og:url",content:d+E}),E&&l.a.createElement("link",{rel:"canonical",href:d+E}),l.a.createElement("meta",{name:"twitter:card",content:"summary_large_image"})),l.a.createElement(c.a,null,p.map((function(e,t){return l.a.createElement("meta",Object(n.a)({key:"metadata_"+t},e))}))),l.a.createElement(u.a,null),l.a.createElement(P,{scrollPercent:_}),l.a.createElement("div",{className:"main-wrapper",ref:x},g),!f&&l.a.createElement(T.a,null))}},128:function(e,t,a){"use strict";const n=(e,{target:t=document.body}={})=>{const a=document.createElement("textarea"),n=document.activeElement;a.value=e,a.setAttribute("readonly",""),a.style.contain="strict",a.style.position="absolute",a.style.left="-9999px",a.style.fontSize="12pt";const r=document.getSelection();let l=!1;r.rangeCount>0&&(l=r.getRangeAt(0)),t.append(a),a.select(),a.selectionStart=0,a.selectionEnd=e.length;let c=!1;try{c=document.execCommand("copy")}catch(o){}return a.remove(),l&&(r.removeAllRanges(),r.addRange(l)),n&&n.focus(),c};e.exports=n,e.exports.default=n},129:function(e,t){e.exports.parse=function(e){var t=e.split(",").map((function(e){return function(e){if(/^-?\d+$/.test(e))return parseInt(e,10);var t;if(t=e.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)){var a=t[1],n=t[2],r=t[3];if(a&&r){var l=[],c=(a=parseInt(a))<(r=parseInt(r))?1:-1;"-"!=n&&".."!=n&&"\u2025"!=n||(r+=c);for(var o=a;o!=r;o+=c)l.push(o);return l}}return[]}(e)}));return 0===t.length?[]:1===t.length?Array.isArray(t[0])?t[0]:t:t.reduce((function(e,t){return Array.isArray(e)||(e=[e]),Array.isArray(t)||(t=[t]),e.concat(t)}))}},131:function(e,t,a){"use strict";var n=a(2),r=a(0),l=a.n(r),c=a(106),o=a(132),i=a(6),s=a(107),m=a(103),u=(a(58),a(59)),p=a.n(u),d=function(e){return function(t){var a,n=t.id,r=Object(i.a)(t,["id"]),c=Object(m.a)().siteConfig,o=(c=void 0===c?{}:c).themeConfig,u=(o=void 0===o?{}:o).navbar,d=(u=void 0===u?{}:u).hideOnScroll,g=void 0!==d&&d;return n?l.a.createElement(e,r,l.a.createElement("a",{"aria-hidden":"true",tabIndex:-1,className:Object(s.a)("anchor",(a={},a[p.a.enhancedAnchor]=!g,a)),id:n}),r.children,l.a.createElement("a",{"aria-hidden":"true",tabIndex:-1,className:"hash-link",href:"#"+n,title:"Direct link to heading"},"#")):l.a.createElement(e,r)}},g=a(60),h=a.n(g),f={code:function(e){var t=e.children;return"string"==typeof t?t.includes("\n")?l.a.createElement(o.a,e):l.a.createElement("code",e):t},a:function(e){return l.a.createElement(c.a,e)},pre:function(e){return l.a.createElement("div",Object(n.a)({className:h.a.mdxCodeBlock},e))},h1:d("h1"),h2:d("h2"),h3:d("h3"),h4:d("h4"),h5:d("h5"),h6:d("h6")};t.a=f},132:function(e,t,a){"use strict";var n=a(2),r=a(0),l=a.n(r),c=a(107),o=a(134),i=a(128),s=a.n(i),m=a(129),u=a.n(m),p=a(103),d=a(133),g=a(57),h=a.n(g);function f(e){return l.a.createElement("div",{style:{width:"12px",height:"12px",marginBottom:"16px",borderRadius:"50%",backgroundColor:e.color,marginLeft:e.margin?"8px":"0"}})}var y=/{([\d,-]+)}/,b=function(e){void 0===e&&(e=["js","jsBlock","jsx","python","html"]);var t={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},python:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"}},a=["highlight-next-line","highlight-start","highlight-end"].join("|"),n=e.map((function(e){return"(?:"+t[e].start+"\\s*("+a+")\\s*"+t[e].end+")"})).join("|");return new RegExp("^\\s*(?:"+n+")\\s*$")},v=/title=".*"/;t.a=function(e){var t=e.children,a=e.className,i=e.metastring,m=Object(p.a)().siteConfig.themeConfig.prism,g=void 0===m?{}:m,E=Object(r.useState)(!1),k=E[0],j=E[1],O=Object(r.useState)(!1),N=O[0],w=O[1];Object(r.useEffect)((function(){w(!0)}),[]);var _=Object(r.useRef)(null),x=[],C="",P=!1,T=Object(d.a)();if(i&&y.test(i)){var S=i.match(y)[1];x=u.a.parse(S).filter((function(e){return e>0}))}i&&v.test(i)&&(C=i.match(v)[0].split("title=")[1].replace(/"+/g,"")),i&&i.includes("terminal=true")&&(P=!0);var B=a&&a.replace(/language-/,"");!B&&g.defaultLanguage&&(B=g.defaultLanguage);var D=t.replace(/\n$/,"");if(0===x.length&&void 0!==B){for(var I,L="",M=function(e){switch(e){case"js":case"javascript":case"ts":case"typescript":return b(["js","jsBlock"]);case"jsx":case"tsx":return b(["js","jsBlock","jsx"]);case"html":return b(["js","jsBlock","html"]);case"python":case"py":return b(["python"]);default:return b()}}(B),A=t.replace(/\n$/,"").split("\n"),R=0;R<A.length;){var F=R+1,H=A[R].match(M);if(null!==H){switch(H.slice(1).reduce((function(e,t){return e||t}),void 0)){case"highlight-next-line":L+=F+",";break;case"highlight-start":I=F;break;case"highlight-end":L+=I+"-"+(F-1)+","}A.splice(R,1)}else R+=1}x=u.a.parse(L),D=A.join("\n")}var J=function(){s()(D),j(!0),setTimeout((function(){return j(!1)}),2e3)};return l.a.createElement(o.a,Object(n.a)({},o.b,{key:String(N),theme:T,code:D,language:B}),(function(e){var t,a,r=e.className,o=e.style,i=e.tokens,s=e.getLineProps,m=e.getTokenProps;return l.a.createElement(l.a.Fragment,null,C&&l.a.createElement("div",{style:o,className:h.a.codeBlockTitle},C),l.a.createElement("div",{className:h.a.codeBlockContent},l.a.createElement("button",{ref:_,type:"button","aria-label":"Copy code to clipboard",className:Object(c.a)(h.a.copyButton,(t={},t[h.a.copyButtonWithTitle]=C,t)),onClick:J},k?"Copied":"Copy"),l.a.createElement("div",{tabIndex:0,className:Object(c.a)(r,h.a.codeBlock,(a={},a[h.a.codeBlockWithTitle]=C,a))},l.a.createElement("div",{className:h.a.codeBlockLines,style:o},P&&l.a.createElement("div",{style:{display:"flex"}},l.a.createElement(f,{color:"#ff5f56",margin:!1}),l.a.createElement(f,{color:"#ffbd2e",margin:!0}),l.a.createElement(f,{color:"#27c93f",margin:!0})),i.map((function(e,t){1===e.length&&""===e[0].content&&(e[0].content="\n");var a=s({line:e,key:t});return x.includes(t+1)&&(a.className=a.className+" docusaurus-highlight-code-line"),l.a.createElement("div",Object(n.a)({key:t},a),e.map((function(e,t){return l.a.createElement("span",Object(n.a)({key:t},m({token:e,key:t})))})))}))))))}))}},133:function(e,t,a){"use strict";var n={plain:{color:"#bfc7d5",backgroundColor:"#292d3e"},styles:[{types:["comment"],style:{color:"rgb(105, 112, 152)",fontStyle:"italic"}},{types:["string","inserted"],style:{color:"rgb(195, 232, 141)"}},{types:["number"],style:{color:"rgb(247, 140, 108)"}},{types:["builtin","char","constant","function"],style:{color:"rgb(130, 170, 255)"}},{types:["punctuation","selector"],style:{color:"rgb(199, 146, 234)"}},{types:["variable"],style:{color:"rgb(191, 199, 213)"}},{types:["class-name","attr-name"],style:{color:"rgb(255, 203, 107)"}},{types:["tag","deleted"],style:{color:"rgb(255, 85, 114)"}},{types:["operator"],style:{color:"rgb(137, 221, 255)"}},{types:["boolean"],style:{color:"rgb(255, 88, 116)"}},{types:["keyword"],style:{fontStyle:"italic"}},{types:["doctype"],style:{color:"rgb(199, 146, 234)",fontStyle:"italic"}},{types:["namespace"],style:{color:"rgb(178, 204, 214)"}},{types:["url"],style:{color:"rgb(221, 221, 221)"}}]},r=a(103),l=a(113);t.a=function(){var e=Object(r.a)().siteConfig.themeConfig.prism,t=void 0===e?{}:e,a=Object(l.a)().isDarkTheme,c=t.theme||n,o=t.darkTheme||c;return a?o:c}},134:function(e,t,a){"use strict";a.d(t,"b",(function(){return c}));var n=a(19),r={plain:{backgroundColor:"#2a2734",color:"#9a86fd"},styles:[{types:["comment","prolog","doctype","cdata","punctuation"],style:{color:"#6c6783"}},{types:["namespace"],style:{opacity:.7}},{types:["tag","operator","number"],style:{color:"#e09142"}},{types:["property","function"],style:{color:"#9a86fd"}},{types:["tag-id","selector","atrule-id"],style:{color:"#eeebff"}},{types:["attr-name"],style:{color:"#c4b9fe"}},{types:["boolean","string","entity","url","attr-value","keyword","control","directive","unit","statement","regex","at-rule","placeholder","variable"],style:{color:"#ffcc99"}},{types:["deleted"],style:{textDecorationLine:"line-through"}},{types:["inserted"],style:{textDecorationLine:"underline"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["important"],style:{color:"#c4b9fe"}}]},l=a(0),c={Prism:n.a,theme:r};function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var s=/\r\n|\r|\n/,m=function(e){0===e.length?e.push({types:["plain"],content:"",empty:!0}):1===e.length&&""===e[0].content&&(e[0].empty=!0)},u=function(e,t){var a=e.length;return a>0&&e[a-1]===t?e:e.concat(t)},p=function(e,t){var a=e.plain,n=Object.create(null),r=e.styles.reduce((function(e,a){var n=a.languages,r=a.style;return n&&!n.includes(t)||a.types.forEach((function(t){var a=i({},e[t],r);e[t]=a})),e}),n);return r.root=a,r.plain=i({},a,{backgroundColor:null}),r};function d(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&-1===t.indexOf(n)&&(a[n]=e[n]);return a}var g=function(e){function t(){for(var t=this,a=[],n=arguments.length;n--;)a[n]=arguments[n];e.apply(this,a),o(this,"getThemeDict",(function(e){if(void 0!==t.themeDict&&e.theme===t.prevTheme&&e.language===t.prevLanguage)return t.themeDict;t.prevTheme=e.theme,t.prevLanguage=e.language;var a=e.theme?p(e.theme,e.language):void 0;return t.themeDict=a})),o(this,"getLineProps",(function(e){var a=e.key,n=e.className,r=e.style,l=i({},d(e,["key","className","style","line"]),{className:"token-line",style:void 0,key:void 0}),c=t.getThemeDict(t.props);return void 0!==c&&(l.style=c.plain),void 0!==r&&(l.style=void 0!==l.style?i({},l.style,r):r),void 0!==a&&(l.key=a),n&&(l.className+=" "+n),l})),o(this,"getStyleForToken",(function(e){var a=e.types,n=e.empty,r=a.length,l=t.getThemeDict(t.props);if(void 0!==l){if(1===r&&"plain"===a[0])return n?{display:"inline-block"}:void 0;if(1===r&&!n)return l[a[0]];var c=n?{display:"inline-block"}:{},o=a.map((function(e){return l[e]}));return Object.assign.apply(Object,[c].concat(o))}})),o(this,"getTokenProps",(function(e){var a=e.key,n=e.className,r=e.style,l=e.token,c=i({},d(e,["key","className","style","token"]),{className:"token "+l.types.join(" "),children:l.content,style:t.getStyleForToken(l),key:void 0});return void 0!==r&&(c.style=void 0!==c.style?i({},c.style,r):r),void 0!==a&&(c.key=a),n&&(c.className+=" "+n),c}))}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(){var e=this.props,t=e.Prism,a=e.language,n=e.code,r=e.children,l=this.getThemeDict(this.props),c=t.languages[a];return r({tokens:function(e){for(var t=[[]],a=[e],n=[0],r=[e.length],l=0,c=0,o=[],i=[o];c>-1;){for(;(l=n[c]++)<r[c];){var p=void 0,d=t[c],g=a[c][l];if("string"==typeof g?(d=c>0?d:["plain"],p=g):(d=u(d,g.type),g.alias&&(d=u(d,g.alias)),p=g.content),"string"==typeof p){var h=p.split(s),f=h.length;o.push({types:d,content:h[0]});for(var y=1;y<f;y++)m(o),i.push(o=[]),o.push({types:d,content:h[y]})}else c++,t.push(d),a.push(p),n.push(0),r.push(p.length)}c--,t.pop(),a.pop(),n.pop(),r.pop()}return m(o),i}(void 0!==c?t.tokenize(n,c,a):[n]),className:"prism-code language-"+a,style:void 0!==l?l.root:{},getLineProps:this.getLineProps,getTokenProps:this.getTokenProps})},t}(l.Component);t.a=g},135:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=a(107),c=a(104),o=a(112),i=a(106),s=a(131),m=a(105),u=a(63),p=a.n(u),d=["January","February","March","April","May","June","July","August","September","October","November","December"];t.a=function(e){var t,a,n,u,g,h=e.children,f=e.frontMatter,y=e.metadata,b=e.truncated,v=e.isBlogPostPage,E=void 0!==v&&v,k=y.date,j=y.permalink,O=y.tags,N=y.readingTime,w=f.author,_=f.title,x=f.image,C=f.keywords,P=f.author_url||f.authorURL,T=f.author_title||f.authorTitle,S=f.author_image_url||f.authorImageURL,B=Object(m.a)(x,{absolute:!0});return r.a.createElement(r.a.Fragment,null,r.a.createElement(o.a,null,C&&C.length&&r.a.createElement("meta",{name:"keywords",content:C.join(",")}),x&&r.a.createElement("meta",{property:"og:image",content:B}),x&&r.a.createElement("meta",{property:"twitter:image",content:B}),x&&r.a.createElement("meta",{name:"twitter:image:alt",content:"Image for "+_})),r.a.createElement("article",{className:E?void 0:"margin-bottom--xl"},(t=E?"h1":"h2",a=k.substring(0,10).split("-"),n=a[0],u=d[parseInt(a[1],10)-1],g=parseInt(a[2],10),r.a.createElement("header",null,r.a.createElement(t,{className:Object(l.a)("margin-bottom--sm",p.a.blogPostTitle)},E?_:r.a.createElement(i.a,{to:j},_)),r.a.createElement("div",{className:"margin-vert--md"},r.a.createElement("time",{dateTime:k,className:p.a.blogPostDate},u," ",g,", ",n," ",N&&r.a.createElement(r.a.Fragment,null," \xb7 ",Math.ceil(N)," min read"))),r.a.createElement("div",{className:"avatar margin-vert--md"},S&&r.a.createElement("a",{className:"avatar__photo-link avatar__photo",href:P,target:"_blank",rel:"noreferrer noopener"},r.a.createElement("img",{src:S,alt:w})),r.a.createElement("div",{className:"avatar__intro"},w&&r.a.createElement(r.a.Fragment,null,r.a.createElement("h4",{className:"avatar__name"},r.a.createElement("a",{href:P,target:"_blank",rel:"noreferrer noopener"},w)),r.a.createElement("small",{className:"avatar__subtitle"},T)))))),r.a.createElement("section",{className:"markdown"},r.a.createElement(c.a,{components:s.a},h)),(O.length>0||b)&&r.a.createElement("footer",{className:"row margin-vert--lg"},O.length>0&&r.a.createElement("div",{className:"col"},r.a.createElement("strong",null,"Tags:"),O.map((function(e){var t=e.label,a=e.permalink;return r.a.createElement(i.a,{key:a,className:"margin-horiz--sm",to:a},t)}))),b&&r.a.createElement("div",{className:"col text--right"},r.a.createElement(i.a,{to:y.permalink,"aria-label":"Read more about "+_},r.a.createElement("strong",null,"Read More"))))))}},81:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(108),c=a(135),o=a(106);t.default=function(e){var t=e.metadata,a=e.items,n=t.allTagsPath,i=t.name,s=t.count;return r.a.createElement(l.a,{title:'Posts tagged "'+i+'"',description:'Blog | Tagged "'+i+'"'},r.a.createElement("div",{className:"container margin-vert--lg"},r.a.createElement("div",{className:"row"},r.a.createElement("main",{className:"col col--8 col--offset-2"},r.a.createElement("h1",null,s," ",function(e,t){return e>1?t+"s":t}(s,"post"),' tagged with "',i,'"'),r.a.createElement(o.a,{href:n},"View All Tags"),r.a.createElement("div",{className:"margin-vert--xl"},a.map((function(e){var t=e.content;return r.a.createElement(c.a,{key:t.metadata.permalink,frontMatter:t.frontMatter,metadata:t.metadata,truncated:!0},r.a.createElement(t,null))})))))))}}}]);