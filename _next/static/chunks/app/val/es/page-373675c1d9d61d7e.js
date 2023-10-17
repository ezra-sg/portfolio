(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[695],{7373:function(e,t,a){Promise.resolve().then(a.bind(a,7734))},7734:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return ValPageEn}});var n=a(7437),i=a(7397),r=a(9351),s=a(1643);function ValPageEn(){return(0,n.jsx)(r.A.Provider,{value:{language:s.i.spanish},children:(0,n.jsx)(i.Z,{})})}},7397:function(e,t,a){"use strict";a.d(t,{Z:function(){return ValHome}});var n=a(7437),i=a(5193),r=a.n(i),s=a(9117),l=a.n(s),o=a(2265),A=a(8910),u=a(4033),d=a(1396),c=a.n(d),h=JSON.parse('{"nav.english-link-description":"Switch the language to English","nav.english":"English","nav.language-button-label":"Switch language","nav.popup-label":"Language switcher popup","nav.spanish-link-description":"Cambiar el idioma a espa\xf1ol","nav.spanish":"Espa\xf1ol","intro.hero-text":"Goose","intro.subtitle":"An afternoon with Valentine Guzm\xe1n","intro.interview-date":"October 2023","intro.author-text":"By Ezra Sowden-Guzm\xe1n","intro.hero-image-alt":"A black and white headshot of Val with long hair, clean shaven, and wearing a patterned vest. A wide smile sits on his face."}'),g=JSON.parse('{"nav.english-link-description":"Switch the language to English","nav.english":"English","nav.language-button-label":"cambiar de idioma","nav.popup-label":"Ventana emergente de cambio de idioma","nav.spanish-link-description":"Cambiar el idioma a espa\xf1ol","nav.spanish":"Espa\xf1ol","intro.hero-text":"Goose","intro.subtitle":"Una tarde con Valent\xedn Guzm\xe1n","intro.interview-date":"Octubre 2023","intro.author-text":"Por Ezra Sowden-Guzm\xe1n","intro.hero-image-alt":"Una foto en blanco y negro de Val con el pelo largo, bien afeitado y con un chaleco estampado. Una amplia sonrisa se dibuja en su rostro."}'),m=a(9351);let x={en:h,es:g},useI18n=()=>{var e;let{language:t}=null!==(e=(0,o.useContext)(m.A))&&void 0!==e?e:{};if(void 0===t)throw Error("useI18n must be used within a LanguageProvider");return{t:e=>{var a,n;return null!==(n=null===(a=x[t])||void 0===a?void 0:a[e])&&void 0!==n?n:e}}};function LanguageSwitcher(){let{t:e}=useI18n(),t=(0,u.usePathname)(),[a,i]=(0,o.useState)(!1),r=(0,o.useRef)(null),s=(0,o.useRef)(null),l=(0,o.useRef)([{href:"/val/en",label:e("nav.english"),title:e("nav.english-link-description")},{href:"/val/es",label:e("nav.spanish"),title:e("nav.spanish-link-description")}]);return(0,o.useEffect)(()=>{let handleClickOutside=e=>{let t=e.target,a=![s,r].some(e=>{let{current:a}=e;return null==a?void 0:a.contains(t)});a&&i(!1)};return document.addEventListener("mousedown",handleClickOutside),()=>{document.removeEventListener("mousedown",handleClickOutside)}},[]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("button",{ref:r,id:"language-switcher-button","data-testid":"language-switcher-button","aria-haspopup":"listbox","aria-expanded":a,"aria-controls":"language-switcher-popup","aria-label":e("nav.language-button-label"),className:"h-8 w-8 flex justify-center items-center rounded-full border-[1px] border-amber-900 bg-amber-50 dark:bg-slate-950 dark:border-amber-50 shadow-lg",onClick:function(){i(!a)},children:(0,n.jsx)(A.$lZ,{className:"text-amber-900 dark:text-amber-50 h-5 w-5"})}),(0,n.jsx)("menu",{ref:s,id:"language-switcher-popup","data-testid":"language-switcher-popup",role:"region","aria-label":e("nav.popup-label"),hidden:!a,"aria-hidden":!a,className:"absolute top-8 right-8 shadow-lg p-3 bg-amber-100",children:l.current.map(e=>{let{href:a,label:i,title:r}=e;return(0,n.jsxs)("li",{className:"flex items-center gap-2",children:[(0,n.jsx)(A.MVI,{className:a===t?"text-black":"text-transparent"}),(0,n.jsx)(c(),{href:a,title:r,children:i})]},r)})})]})}var b=a(6691),p=a.n(b),f={src:"/_next/static/media/val--indian.e9b3cedf.jpg",height:1288,width:898,blurDataURL:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//CABEIAAgABgMBIgACEQEDEQH/xAAoAAEBAAAAAAAAAAAAAAAAAAAABAEBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhADEAAAAJhH/8QAHBAAAgICAwAAAAAAAAAAAAAAAwQBAhIiABMj/9oACAEBAAE/ALqvHWrAxjXYGcvcW/pnntWNef/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Af//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Af//Z",blurWidth:6,blurHeight:8};function Intro(){let{t:e}=useI18n();return(0,n.jsxs)("div",{className:"relative w-full h-[100svh] md:flex md:flex-row-reverse md:gap-8 md:justify-between md:items-center xl:h-[80svh] xl:max-w-[1440px] xl:m-auto xl:pt-[20svh] xl:px-12",children:[(0,n.jsx)(p(),{src:f,alt:e("intro.hero-image-alt"),priority:!0,className:"h-full w-full object-cover md:h-[100svh] xl:h-[80svh] md:w-auto"}),(0,n.jsx)("div",{className:"absolute md:static bottom-12 left-0 right-0 bg-amber-50 dark:bg-slate-950 py-4 md:w-full md:flex md:justify-center",children:(0,n.jsxs)("div",{className:"md:w-fit md:pl-4",children:[(0,n.jsx)("h1",{className:"font-header text-5xl text-amber-900 dark:text-amber-50 text-center md:text-left",children:e("intro.hero-text")}),(0,n.jsx)("h2",{className:"mb-4 font-sans dark:text-amber-50 text-center font-bold md:text-left",children:e("intro.subtitle")}),(0,n.jsxs)("p",{className:"font-sans dark:text-amber-50 text-center md:text-left",children:[e("intro.author-text"),(0,n.jsx)("br",{}),(0,n.jsx)("span",{className:"text-sm",children:e("intro.interview-date")})]})]})})]})}function ValHome(){return(0,n.jsxs)("div",{className:"bg-amber-50 dark:bg-slate-950 w-[100svw] min-h-[100svh] ".concat(r().variable," ").concat(l().variable),children:[(0,n.jsx)("header",{className:"absolute top-4 right-4 z-50",children:(0,n.jsx)(LanguageSwitcher,{})}),(0,n.jsx)("article",{children:(0,n.jsx)(Intro,{})})]})}},9351:function(e,t,a){"use strict";a.d(t,{A:function(){return i}});var n=a(2265);let i=(0,n.createContext)(void 0)},1643:function(e,t,a){"use strict";a.d(t,{i:function(){return n}});let n={english:"en",spanish:"es"}}},function(e){e.O(0,[582,724,891,971,864,744],function(){return e(e.s=7373)}),_N_E=e.O()}]);