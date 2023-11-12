(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[855],{1261:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return ProgressTracker}});var n=r(7437),a=r(2265);r(5809);var o=r(1906),l=r(1951),s=r(8910),c=r(4033),i=r(1396),u=r.n(i);function LanguageSwitcher(){let{t:e}=(0,l.Q)(),t=(0,c.usePathname)(),[r,o]=(0,a.useState)(!1),i=(0,a.useRef)(null),d=(0,a.useRef)(null),g=(0,a.useRef)(null),m=(0,a.useRef)(!1),f=(0,a.useRef)([{href:"/val/en",label:e("nav.english"),title:e("nav.english_link_description")},{href:"/val/es",label:e("nav.spanish"),title:e("nav.spanish_link_description")}]);function toggleLanguageMenu(){let e=!r;if(o(e),e){var t;null===(t=d.current)||void 0===t||t.focus()}}let h=(0,a.useCallback)(e=>{let t=e.target,r=![d,i].some(e=>{let{current:r}=e;return null==r?void 0:r.contains(t)});r&&o(!1)},[]);return g.current=h,(0,a.useEffect)(()=>{let unregisterDocumentClickawayListener=()=>{m.current&&(document.removeEventListener("mousedown",g.current),m.current=!1)};return r?m.current||(document.addEventListener("mousedown",g.current),m.current=!0):unregisterDocumentClickawayListener(),()=>{unregisterDocumentClickawayListener()}},[r]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("button",{ref:i,id:"language-switcher-button","data-testid":"language-switcher-button","aria-haspopup":"listbox","aria-expanded":r,"aria-controls":"language-switcher-popup","aria-label":e("nav.language_button_label"),className:"h-8 w-8 flex justify-center items-center rounded-full shadow-lg hover:border-[2px] border-[1px] border-amber-900 bg-amber-50 dark:bg-stone-950 dark:border-orange-300",onClick:toggleLanguageMenu,children:(0,n.jsx)(s.$lZ,{className:"text-amber-900 dark:text-orange-300 h-5 w-5","aria-hidden":"true"})}),(0,n.jsx)("menu",{ref:d,id:"language-switcher-popup","data-testid":"language-switcher-popup",role:"region","aria-label":e("nav.language_popup_label"),hidden:!r,"aria-hidden":!r,className:"absolute bottom-12 shadow-lg p-3 bg-amber-50 border-[1px] border-amber-900 rounded-sm dark:bg-stone-950 dark:border-orange-300",children:f.current.map(e=>{let{href:r,label:a,title:o}=e;return(0,n.jsx)("li",{className:"flex items-center gap-2",role:"menuitem",children:(0,n.jsx)(u(),{href:r,title:o,"aria-current":r===t?"page":void 0,className:"".concat(r===t?"font-bold":""," text-amber-900 dark:text-orange-300 hover:underline"),children:a})},o)})})]})}function ProgressTracker(e){let{sectionOneRef:t,sectionTwoRef:r,sectionThreeRef:s,sectionFourRef:c,sectionFiveRef:i}=e,[u,d]=(0,a.useState)(0),[g,m]=(0,a.useState)(!1),[f,h]=(0,a.useState)(!0),p=(0,a.useRef)(null),b=(0,a.useRef)(0),{t:v}=(0,l.Q)(),x=[{label:"I",ref:t},{label:"II",ref:r},{label:"III",ref:s},{label:"IV",ref:c},{label:"V",ref:i}];return(0,a.useEffect)(()=>{let e=(0,o.Z)(()=>{let e,n,a=window.scrollY||document.documentElement.scrollTop,o=a>=b.current;a!==b.current&&m(!o),h(a<100),b.current=a;let l=t.current,u=r.current,g=s.current,f=c.current,v=i.current;if(!l||!u||!g||!f||!v)return;let x=l.clientHeight,w=u.clientHeight,_=g.clientHeight,k=f.clientHeight,y=v.clientHeight,j=l.offsetTop,N=u.offsetTop,E=g.offsetTop,P=f.offsetTop,T=v.offsetTop,S=Math.max(0,window.scrollY||document.documentElement.scrollTop),C=window.innerHeight||document.documentElement.clientHeight,O=S+C,getSectionProgressPercentage=(e,t)=>Math.min(100,Math.max(0,(S+C-e)/t*100));S+C<j?(e=0,n=0):j+x>O?(e=getSectionProgressPercentage(j,x),n=0):N+w>O?(e=getSectionProgressPercentage(N,w),n=20):E+_>O?(e=getSectionProgressPercentage(E,_),n=40):P+k>O?(e=getSectionProgressPercentage(P,k),n=60):(e=getSectionProgressPercentage(T,y),n=80);let I=n+1*e/5,L=Number(I.toFixed(0));d(L),p.current.style.setProperty("--progress-percent","".concat(L,"%"))},100);return e(),document.addEventListener("scroll",e),()=>{document.removeEventListener("scroll",e)}},[t,r,s,c,i]),(0,n.jsxs)("div",{ref:p,className:"c-progress-tracker ".concat(g?"c-progress-tracker--expanded":""),role:"progressbar","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":Number(u.toFixed(0)),hidden:f,"aria-hidden":f,onMouseOver:()=>m(!0),children:[g&&(0,n.jsxs)("div",{className:"absolute -top-14 right-0 left-12 m-auto w-max flex gap-4 animate-fade-in-fast",children:[(0,n.jsx)("div",{className:"rounded-md bg-amber-50 p-2 font-header shadow-lg dark:bg-stone-950 dark:text-amber-50","aria-hidden":!0,children:v("nav.sections")}),(0,n.jsx)("div",{className:"flex items-center",children:(0,n.jsx)(LanguageSwitcher,{})})]}),(0,n.jsx)("div",{className:"absolute -top-6 h-6 w-full hidden lg:block"}),(0,n.jsx)("nav",{role:"navigation",className:"relative flex items-center justify-around w-full",children:x.map((e,t)=>(0,n.jsx)("button",{className:"".concat(g?"h-9 w-10 lg:w-8 lg:h-8 rounded-lg px-2":"h-1.5 w-1.5"," rounded-full flex items-center justify-center bg-amber-50 border-[1px] border-amber-900 transition-all z-10 hover:border-[2px] dark:bg-stone-900 dark:border-orange-300"),"aria-label":"".concat(v("nav.go_to_section_label")," ").concat(t+1),title:"".concat(v("nav.go_to_section_label")," ").concat(t+1),onClick:()=>scrollTo({top:e.ref.current.offsetTop,behavior:"instant"}),onFocus:()=>m(!0),children:g&&(0,n.jsx)("span",{className:"text-sm font-header text-amber-900 animate-fade-in-fast dark:text-orange-300",children:e.label})},"nav-button-".concat(t)))})]})}},1906:function(e,t,r){"use strict";function throttle(e,t){let r=0,n=null;return function(){for(var a=arguments.length,o=Array(a),l=0;l<a;l++)o[l]=arguments[l];let s=Date.now();!r||s-r>=t?(r=s,e.apply(this,o)):(n&&clearTimeout(n),n=setTimeout(()=>{r=s,e.apply(this,o)},t-(s-r)))}}r.d(t,{Z:function(){return throttle}})},5809:function(){},1396:function(e,t,r){e.exports=r(8326)},1172:function(e,t,r){"use strict";r.d(t,{w_:function(){return GenIcon}});var n=r(2265),a={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},o=n.createContext&&n.createContext(a),__assign=function(){return(__assign=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},__rest=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var a=0,n=Object.getOwnPropertySymbols(e);a<n.length;a++)0>t.indexOf(n[a])&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]]);return r};function Tree2Element(e){return e&&e.map(function(e,t){return n.createElement(e.tag,__assign({key:t},e.attr),Tree2Element(e.child))})}function GenIcon(e){return function(t){return n.createElement(IconBase,__assign({attr:__assign({},e.attr)},t),Tree2Element(e.child))}}function IconBase(e){var elem=function(t){var r,a=e.attr,o=e.size,l=e.title,s=__rest(e,["attr","size","title"]),c=o||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),n.createElement("svg",__assign({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,a,s,{className:r,style:__assign(__assign({color:e.color||t.color},t.style),e.style),height:c,width:c,xmlns:"http://www.w3.org/2000/svg"}),l&&n.createElement("title",null,l),e.children)};return void 0!==o?n.createElement(o.Consumer,null,function(e){return elem(e)}):elem(a)}}}]);