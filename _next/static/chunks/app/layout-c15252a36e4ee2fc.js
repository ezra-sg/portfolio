(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{1419:function(e,t,n){Promise.resolve().then(n.t.bind(n,2853,23)),Promise.resolve().then(n.t.bind(n,3994,23)),Promise.resolve().then(n.t.bind(n,6096,23))},863:function(e,t){"use strict";let n;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{DOMAttributeNames:function(){return r},isEqualNode:function(){return isEqualNode},default:function(){return initHeadManager}});let r={acceptCharset:"accept-charset",className:"class",htmlFor:"for",httpEquiv:"http-equiv",noModule:"noModule"};function reactElementToDOM(e){let{type:t,props:n}=e,l=document.createElement(t);for(let e in n){if(!n.hasOwnProperty(e)||"children"===e||"dangerouslySetInnerHTML"===e||void 0===n[e])continue;let a=r[e]||e.toLowerCase();"script"===t&&("async"===a||"defer"===a||"noModule"===a)?l[a]=!!n[e]:l.setAttribute(a,n[e])}let{children:a,dangerouslySetInnerHTML:o}=n;return o?l.innerHTML=o.__html||"":a&&(l.textContent="string"==typeof a?a:Array.isArray(a)?a.join(""):""),l}function isEqualNode(e,t){if(e instanceof HTMLElement&&t instanceof HTMLElement){let n=t.getAttribute("nonce");if(n&&!e.getAttribute("nonce")){let r=t.cloneNode(!0);return r.setAttribute("nonce",""),r.nonce=n,n===e.nonce&&e.isEqualNode(r)}}return e.isEqualNode(t)}function initHeadManager(){return{mountedInstances:new Set,updateHead:e=>{let t={};e.forEach(e=>{if("link"===e.type&&e.props["data-optimized-fonts"]){if(document.querySelector('style[data-href="'+e.props["data-href"]+'"]'))return;e.props.href=e.props["data-href"],e.props["data-href"]=void 0}let n=t[e.type]||[];n.push(e),t[e.type]=n});let r=t.title?t.title[0]:null,l="";if(r){let{children:e}=r.props;l="string"==typeof e?e:Array.isArray(e)?e.join(""):""}l!==document.title&&(document.title=l),["meta","base","link","style","script"].forEach(e=>{n(e,t[e]||[])})}}}n=(e,t)=>{let n=document.getElementsByTagName("head")[0],r=n.querySelector("meta[name=next-head-count]"),l=Number(r.content),a=[];for(let t=0,n=r.previousElementSibling;t<l;t++,n=(null==n?void 0:n.previousElementSibling)||null){var o;(null==n?void 0:null==(o=n.tagName)?void 0:o.toLowerCase())===e&&a.push(n)}let i=t.map(reactElementToDOM).filter(e=>{for(let t=0,n=a.length;t<n;t++){let n=a[t];if(isEqualNode(n,e))return a.splice(t,1),!1}return!0});a.forEach(e=>{var t;return null==(t=e.parentNode)?void 0:t.removeChild(e)}),i.forEach(e=>n.insertBefore(e,r)),r.content=(l-a.length+i.length).toString()},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2389:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{requestIdleCallback:function(){return n},cancelIdleCallback:function(){return r}});let n="undefined"!=typeof self&&self.requestIdleCallback&&self.requestIdleCallback.bind(window)||function(e){let t=Date.now();return self.setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-t))}})},1)},r="undefined"!=typeof self&&self.cancelIdleCallback&&self.cancelIdleCallback.bind(window)||function(e){return clearTimeout(e)};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3994:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{handleClientScriptLoad:function(){return handleClientScriptLoad},initScriptLoader:function(){return initScriptLoader},default:function(){return p}});let r=n(1024),l=n(8533),a=r._(n(4887)),o=l._(n(2265)),i=n(1852),u=n(863),d=n(2389),c=new Map,s=new Set,f=["onLoad","onReady","dangerouslySetInnerHTML","children","onError","strategy","stylesheets"],insertStylesheets=e=>{if(a.default.preinit){e.forEach(e=>{a.default.preinit(e,{as:"style"})});return}{let t=document.head;e.forEach(e=>{let n=document.createElement("link");n.type="text/css",n.rel="stylesheet",n.href=e,t.appendChild(n)})}},loadScript=e=>{let{src:t,id:n,onLoad:r=()=>{},onReady:l=null,dangerouslySetInnerHTML:a,children:o="",strategy:i="afterInteractive",onError:d,stylesheets:p}=e,y=n||t;if(y&&s.has(y))return;if(c.has(t)){s.add(y),c.get(t).then(r,d);return}let afterLoad=()=>{l&&l(),s.add(y)},h=document.createElement("script"),m=new Promise((e,t)=>{h.addEventListener("load",function(t){e(),r&&r.call(this,t),afterLoad()}),h.addEventListener("error",function(e){t(e)})}).catch(function(e){d&&d(e)});for(let[n,r]of(a?(h.innerHTML=a.__html||"",afterLoad()):o?(h.textContent="string"==typeof o?o:Array.isArray(o)?o.join(""):"",afterLoad()):t&&(h.src=t,c.set(t,m)),Object.entries(e))){if(void 0===r||f.includes(n))continue;let e=u.DOMAttributeNames[n]||n.toLowerCase();h.setAttribute(e,r)}"worker"===i&&h.setAttribute("type","text/partytown"),h.setAttribute("data-nscript",i),p&&insertStylesheets(p),document.body.appendChild(h)};function handleClientScriptLoad(e){let{strategy:t="afterInteractive"}=e;"lazyOnload"===t?window.addEventListener("load",()=>{(0,d.requestIdleCallback)(()=>loadScript(e))}):loadScript(e)}function loadLazyScript(e){"complete"===document.readyState?(0,d.requestIdleCallback)(()=>loadScript(e)):window.addEventListener("load",()=>{(0,d.requestIdleCallback)(()=>loadScript(e))})}function addBeforeInteractiveToCache(){let e=[...document.querySelectorAll('[data-nscript="beforeInteractive"]'),...document.querySelectorAll('[data-nscript="beforePageRender"]')];e.forEach(e=>{let t=e.id||e.getAttribute("src");s.add(t)})}function initScriptLoader(e){e.forEach(handleClientScriptLoad),addBeforeInteractiveToCache()}function Script(e){let{id:t,src:n="",onLoad:r=()=>{},onReady:l=null,strategy:u="afterInteractive",onError:d,stylesheets:c,...f}=e,{updateScripts:p,scripts:y,getIsSsr:h,appDir:m,nonce:_}=(0,o.useContext)(i.HeadManagerContext),b=(0,o.useRef)(!1);(0,o.useEffect)(()=>{let e=t||n;b.current||(l&&e&&s.has(e)&&l(),b.current=!0)},[l,t,n]);let v=(0,o.useRef)(!1);if((0,o.useEffect)(()=>{v.current||("afterInteractive"===u?loadScript(e):"lazyOnload"===u&&loadLazyScript(e),v.current=!0)},[e,u]),("beforeInteractive"===u||"worker"===u)&&(p?(y[u]=(y[u]||[]).concat([{id:t,src:n,onLoad:r,onReady:l,onError:d,...f}]),p(y)):h&&h()?s.add(t||n):h&&!h()&&loadScript(e)),m){if(c&&c.forEach(e=>{a.default.preinit(e,{as:"style"})}),"beforeInteractive"===u)return n?(a.default.preload(n,f.integrity?{as:"script",integrity:f.integrity}:{as:"script"}),o.default.createElement("script",{nonce:_,dangerouslySetInnerHTML:{__html:"(self.__next_s=self.__next_s||[]).push("+JSON.stringify([n])+")"}})):(f.dangerouslySetInnerHTML&&(f.children=f.dangerouslySetInnerHTML.__html,delete f.dangerouslySetInnerHTML),o.default.createElement("script",{nonce:_,dangerouslySetInnerHTML:{__html:"(self.__next_s=self.__next_s||[]).push("+JSON.stringify([0,{...f}])+")"}}));"afterInteractive"===u&&n&&a.default.preload(n,f.integrity?{as:"script",integrity:f.integrity}:{as:"script"})}return null}Object.defineProperty(Script,"__nextScript",{value:!0});let p=Script;("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2853:function(){},6096:function(e){e.exports={style:{fontFamily:"'__Inter_e66fe9', '__Inter_Fallback_e66fe9'",fontStyle:"normal"},className:"__className_e66fe9"}}},function(e){e.O(0,[971,472,744],function(){return e(e.s=1419)}),_N_E=e.O()}]);