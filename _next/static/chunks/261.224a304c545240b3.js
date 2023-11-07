(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[261],{1261:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return ProgressTracker}});var n=t(7437),a=t(2265);t(5809);var l=t(1906),o=t(1951),s=t(8910),c=t(4033),i=t(1396),u=t.n(i);function LanguageSwitcher(){let{t:e}=(0,o.Q)(),r=(0,c.usePathname)(),[t,l]=(0,a.useState)(!1),i=(0,a.useRef)(null),d=(0,a.useRef)(null),g=(0,a.useRef)(null),m=(0,a.useRef)(!1),f=(0,a.useRef)([{href:"/val/en",label:e("nav.english"),title:e("nav.english_link_description")},{href:"/val/es",label:e("nav.spanish"),title:e("nav.spanish_link_description")}]);function toggleLanguageMenu(){let e=!t;if(l(e),e){var r;null===(r=d.current)||void 0===r||r.focus()}}let b=(0,a.useCallback)(e=>{let r=e.target,t=![d,i].some(e=>{let{current:t}=e;return null==t?void 0:t.contains(r)});t&&l(!1)},[]);return g.current=b,(0,a.useEffect)(()=>{let unregisterDocumentClickawayListener=()=>{m.current&&(document.removeEventListener("mousedown",g.current),m.current=!1)};return t?m.current||(document.addEventListener("mousedown",g.current),m.current=!0):unregisterDocumentClickawayListener(),()=>{unregisterDocumentClickawayListener()}},[t]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("button",{ref:i,id:"language-switcher-button","data-testid":"language-switcher-button","aria-haspopup":"listbox","aria-expanded":t,"aria-controls":"language-switcher-popup","aria-label":e("nav.language_button_label"),className:"h-8 w-8 flex justify-center items-center rounded-full shadow-lg hover:border-[2px] border-[1px] border-amber-900 bg-amber-50 dark:bg-stone-950 dark:border-orange-300",onClick:toggleLanguageMenu,children:(0,n.jsx)(s.$lZ,{className:"text-amber-900 dark:text-orange-300 h-5 w-5","aria-hidden":"true"})}),(0,n.jsx)("menu",{ref:d,id:"language-switcher-popup","data-testid":"language-switcher-popup",role:"region","aria-label":e("nav.language_popup_label"),hidden:!t,"aria-hidden":!t,className:"absolute bottom-12 shadow-lg p-3 bg-amber-50 border-[1px] border-amber-900 rounded-sm dark:bg-stone-950 dark:border-orange-300",children:f.current.map(e=>{let{href:t,label:a,title:l}=e;return(0,n.jsx)("li",{className:"flex items-center gap-2",role:"menuitem",children:(0,n.jsx)(u(),{href:t,title:l,"aria-current":t===r?"page":void 0,className:"".concat(t===r?"font-bold":""," text-amber-900 dark:text-orange-300 hover:underline"),children:a})},l)})})]})}function ProgressTracker(e){let{sectionOneRef:r,sectionTwoRef:t,sectionThreeRef:s,sectionFourRef:c,sectionFiveRef:i}=e,[u,d]=(0,a.useState)(0),[g,m]=(0,a.useState)(!1),[f,b]=(0,a.useState)(!0),h=(0,a.useRef)(null),p=(0,a.useRef)(0),{t:x}=(0,o.Q)(),v=[{label:"I",ref:r},{label:"II",ref:t},{label:"III",ref:s},{label:"IV",ref:c},{label:"V",ref:i}];return(0,a.useEffect)(()=>{let e=(0,l.Z)(()=>{let e,n,a=window.scrollY||document.documentElement.scrollTop,l=a>=p.current;a!==p.current&&m(!l),b(a<100),p.current=a;let o=r.current,u=t.current,g=s.current,f=c.current,x=i.current;if(!o||!u||!g||!f||!x)return;let v=o.clientHeight,w=u.clientHeight,k=g.clientHeight,j=f.clientHeight,_=x.clientHeight,N=o.offsetTop,P=u.offsetTop,S=g.offsetTop,E=f.offsetTop,L=x.offsetTop,T=Math.max(0,window.scrollY||document.documentElement.scrollTop),y=window.innerHeight||document.documentElement.clientHeight,C=T+y,getSectionProgressPercentage=(e,r)=>Math.min(100,Math.max(0,(T+y-e)/r*100));T+y<N?(e=0,n=0):N+v>C?(e=getSectionProgressPercentage(N,v),n=0):P+w>C?(e=getSectionProgressPercentage(P,w),n=20):S+k>C?(e=getSectionProgressPercentage(S,k),n=40):E+j>C?(e=getSectionProgressPercentage(E,j),n=60):(e=getSectionProgressPercentage(L,_),n=80);let H=n+1*e/5,I=Number(H.toFixed(0));d(I),h.current.style.setProperty("--progress-percent","".concat(I,"%"))},100);return e(),document.addEventListener("scroll",e),()=>{document.removeEventListener("scroll",e)}},[r,t,s,c,i]),(0,n.jsxs)("div",{ref:h,className:"c-progress-tracker ".concat(g?"c-progress-tracker--expanded":""),role:"progressbar","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":Number(u.toFixed(0)),hidden:f,"aria-hidden":f,onMouseOver:()=>m(!0),children:[g&&(0,n.jsxs)("div",{className:"absolute -top-14 right-0 left-12 m-auto w-max flex gap-4 animate-fade-in-fast",children:[(0,n.jsx)("div",{className:"rounded-md bg-amber-50 p-2 font-header shadow-lg dark:bg-stone-950 dark:text-amber-50","aria-hidden":!0,children:x("nav.sections")}),(0,n.jsx)("div",{className:"flex items-center",children:(0,n.jsx)(LanguageSwitcher,{})})]}),(0,n.jsx)("div",{className:"absolute -top-6 h-6 w-full hidden lg:block"}),(0,n.jsx)("nav",{role:"navigation",className:"relative flex items-center justify-around w-full",children:v.map((e,r)=>(0,n.jsx)("button",{className:"".concat(g?"h-9 w-10 lg:w-8 lg:h-8 rounded-lg px-2":"h-1.5 w-1.5"," rounded-full flex items-center justify-center bg-amber-50 border-[1px] border-amber-900 transition-all z-10 hover:border-[2px] dark:bg-stone-900 dark:border-orange-300"),"aria-label":"".concat(x("nav.go_to_section_label")," ").concat(r+1),title:"".concat(x("nav.go_to_section_label")," ").concat(r+1),onClick:()=>scrollTo({top:e.ref.current.offsetTop,behavior:"instant"}),onFocus:()=>m(!0),children:g&&(0,n.jsx)("span",{className:"text-sm font-header text-amber-900 animate-fade-in-fast dark:text-orange-300",children:e.label})},"nav-button-".concat(r)))})]})}},5809:function(){},1396:function(e,r,t){e.exports=t(8326)}}]);