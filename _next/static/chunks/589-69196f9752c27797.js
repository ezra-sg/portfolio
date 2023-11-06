(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[589],{1025:function(e,t,a){"use strict";a.d(t,{Z:function(){return ValHome}});var r,n,l=a(7437),s=a(2926),i=a.n(s),c=a(4333),o=a.n(c),d=a(2265);function throttle(e,t){let a=0,r=null;return function(){for(var n=arguments.length,l=Array(n),s=0;s<n;s++)l[s]=arguments[s];let i=Date.now();!a||i-a>=t?(a=i,e.apply(this,l)):(r&&clearTimeout(r),r=setTimeout(()=>{a=i,e.apply(this,l)},t-(i-a)))}}(r=n||(n={})).playing="playing",r.paused="paused",r.stopped="stopped",r.complete="complete";let u=(0,d.createContext)(null);function AudioProvider(e){let{children:t}=e,[a,r]=(0,d.useState)({src:null,snippetId:null,title:null,transcript:null}),[n,s]=(0,d.useState)("stopped"),[i,c]=(0,d.useState)(null),[o,m]=(0,d.useState)(null),[h,f]=(0,d.useState)(null),[p,x]=(0,d.useState)(null),g=(0,d.useRef)(!1),b=(0,d.useRef)(new Map);function playAudio(e,t,a,n){r({snippetId:e,src:t,title:a,transcript:n}),setAudioStatus("playing",e)}function pauseAudio(){if(!a.snippetId)throw Error("Cannot pause audio when no snippetId is set");setAudioStatus("paused",a.snippetId)}function setAudioStatus(e,t){if("playing"===e){if(!i)return;let e=null!=o?o:new window.AudioContext;o||m(e);let t=null!=h?h:e.createAnalyser();if(h||(t.fftSize=2048,t.minDecibels=-70,t.maxDecibels=-20,f(t)),!p&&!g.current){let a=e.createMediaElementSource(i);x(a),a.connect(t),g.current=!0}t.connect(e.destination)}s(e)}function setAudioElementRef(e){c(e)}function subscribe(e,t){let a=b.current.get(e);if(a){a.push(t);return}b.current.set(e,[t])}function unsubscribe(e,t){let a=b.current.get(e);if(!a)return;let r=a.indexOf(t);a.splice(r,1),0===a.length&&b.current.delete(e)}function notify(e,t){let a=b.current.get(e);a&&a.forEach(e=>{e(t)})}function notifyAllStopped(e){b.current.forEach((t,a)=>{a!==e&&t.forEach(e=>{e("stopped")})})}return(0,d.useEffect)(()=>{let{snippetId:e}=a;e&&(notifyAllStopped(e),notify(e,n))},[n,a]),(0,l.jsx)(u.Provider,{value:{currentAudioData:a,audioPlaybackState:n,setAudioElementRef,setAudioStatus,playAudio,pauseAudio,subscribe,unsubscribe,audioElement:i,audioAnalyser:h},children:t})}function useAudioContext(){let e=(0,d.useContext)(u);if(!e)throw Error("useAudioContext must be used within an AudioProvider");return e}var m=a(9656),h=a(8910),f=a(178);let findNestedValue=(e,t)=>{let a=t.reduce((e,t)=>{if(e&&"object"==typeof e)return e[t]},e);return"string"==typeof a?a:void 0},useI18n=()=>{var e;let{language:t,translations:a}=null!==(e=(0,d.useContext)(f.A))&&void 0!==e?e:{};if([t,a].some(e=>void 0===e))throw Error("useI18n must be used within a LanguageProvider");return{t:e=>{var t;let r=e.split("."),n=null!==(t=findNestedValue(a,r))&&void 0!==t?t:e;return n}}};function prettyPrintTimestamp(e){let t=Math.floor(e),a=Math.floor(t/60),r=t%60,n="".concat(r<10?"0":"").concat(r),l="".concat(a<10?"0":"").concat(a);return"".concat(l,":").concat(n)}a(2278);let p=[.25,.5,.75,1,1.25,1.5,1.75];function GlobalAudioPlayer(e){var t;let{labelledBy:a,modalMode:r}=e,[s,i]=(0,d.useState)(!1),[c,o]=(0,d.useState)(1),[u,m]=(0,d.useState)(!1),[f,x]=(0,d.useState)(0),[g,b]=(0,d.useState)(0),v=(0,d.useRef)(null),A=(0,d.useRef)(null),_=(0,d.useRef)(null),j=(0,d.useRef)(null),w=(0,d.useRef)(null),y=(0,d.useRef)(!1),N=(0,d.useRef)(!1),k=(0,d.useRef)(null),E=(0,d.useRef)(null),{t:S}=useI18n(),{currentAudioData:C,audioPlaybackState:I,setAudioElementRef:R,setAudioStatus:L,audioElement:U}=useAudioContext(),T=I===n.playing,P="".concat(u?S("inputs.restart_audio_aria"):S("inputs.".concat(T?"pause":"play","_audio_aria"))," ").concat(C.title),D=prettyPrintTimestamp(f),M=prettyPrintTimestamp(g),B=(0,d.useCallback)(e=>{let t=e.target,a=![_,j].some(e=>{let{current:a}=e;return a.contains(t)});a&&i(!1)},[]);return w.current=B,(0,d.useEffect)(()=>{let e=A.current;if(!U)return;let handleAudioMetaLoaded=()=>{e.max=U.duration.toString(),b(U.duration)},handleAudioTimeUpdate=()=>{e.value=U.currentTime.toString(),x(U.currentTime)},updateAudioPosition=()=>{U.currentTime=Number(e.value)};return U.readyState>=1?handleAudioMetaLoaded():U.addEventListener("loadedmetadata",handleAudioMetaLoaded),U.addEventListener("timeupdate",handleAudioTimeUpdate),e.addEventListener("input",updateAudioPosition),()=>{U.removeEventListener("loadedmetadata",handleAudioMetaLoaded),U.removeEventListener("timeupdate",handleAudioTimeUpdate),e.removeEventListener("input",updateAudioPosition)}},[U]),(0,d.useEffect)(()=>{r||U===v.current||R(v.current)},[R,U,r]),(0,d.useEffect)(()=>{if(U&&k.current!==C.snippetId){var e;k.current=C.snippetId,U.src=null!==(e=C.src)&&void 0!==e?e:"",N.current=!1,U.load()}},[U,C]),(0,d.useEffect)(()=>{U&&(E.current&&(clearTimeout(E.current),E.current=null),I===n.playing?(U.currentTime===U.duration&&(U.currentTime=0),N.current&&U.play()):I===n.paused?U.pause():I===n.stopped?(U.pause(),U.currentTime=0):I===n.complete&&(E.current=setTimeout(()=>{L(n.stopped,C.snippetId)},3e3)))},[U,I,L,C]),(0,d.useEffect)(()=>{let unregisterDocumentClickawayListener=()=>{y.current&&(document.removeEventListener("mousedown",w.current),y.current=!1)};return s?y.current||(document.addEventListener("mousedown",w.current),y.current=!0):unregisterDocumentClickawayListener(),()=>{unregisterDocumentClickawayListener()}},[s]),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("div",{className:"flex items-center gap-2 text-2xl w-full text-amber-900 dark:text-orange-300",children:[(0,l.jsx)("button",{onClick:()=>{let e=T?n.paused:n.playing;L(e,C.snippetId),m(!1)},onKeyDown:e=>{[" ","Enter"].includes(e.key)&&(e.preventDefault(),L(n.paused,C.snippetId),m(!1))},"aria-label":P,title:P,className:"h-10 w-10 flex items-center justify-center flex-shrink-0","data-testid":"audio-player-play-button",children:T?(0,l.jsx)(h.SUn,{"aria-hidden":"true"}):u?(0,l.jsx)(h.zq9,{"aria-hidden":"true"}):(0,l.jsx)(h.Hm_,{"aria-hidden":"true"})}),(0,l.jsx)("code",{className:"text-xs",title:"".concat(S("inputs.audio_time_elapsed_title")," ").concat(C.title),children:D}),(0,l.jsx)("input",{ref:A,type:"range",min:"0",step:"0.1",defaultValue:0,"aria-label":"".concat(S("inputs.audio_scrubber_aria")," ").concat(C.title),className:"c-audio-player__scrubber"}),(0,l.jsx)("code",{className:"text-xs",title:"".concat(S("inputs.audio_time_total_title")," ").concat(C.title),children:M}),(0,l.jsxs)("div",{className:"relative",children:[(0,l.jsx)("button",{ref:j,"aria-label":"".concat(S("inputs.change_playback_speed_aria")," ").concat(C.title),title:"".concat(S("inputs.change_playback_speed_aria")," ").concat(C.title),"data-testid":"audio-player-speed-button",onClick:()=>i(!s),onKeyDown:e=>{[" ","Enter"].includes(e.key)&&(e.preventDefault(),i(!s))},className:"h-10 w-10 flex items-center justify-center",children:(0,l.jsx)(h.JKp,{"aria-hidden":"true"})}),(0,l.jsx)("ul",{ref:_,role:"menu",className:"".concat(r?"-top-60":""," absolute p-3 bg-amber-50 shadow-lg rounded-sm border-[1px] border-amber-900 dark:bg-stone-950 dark:border-orange-300"),hidden:!s,"aria-hidden":!s,"aria-label":"".concat(S("inputs.audio_speed_menu_label")," ").concat(C.title),"data-testid":"audio-player-speed-menu",onKeyDown:e=>{"Escape"===e.key&&i(!1)},children:p.map((e,t)=>(0,l.jsx)("li",{role:"menuitemradio","aria-checked":c===e,tabIndex:0,"aria-label":"".concat(S("inputs.audio_speed_item_label")," ").concat(e),className:"".concat(c===e?"font-bold":""," text-sm cursor-pointer my-2 hover:underline"),"data-testid":"audio-player-speed-option-".concat(t),onClick:()=>{U&&(U.playbackRate=e),o(e),i(!1)},onKeyDown:t=>{[" ","Enter"].includes(t.key)&&(t.preventDefault(),U&&(U.playbackRate=e),o(e),i(!1))},children:1===e?S("global.normal"):"".concat(e,"x")},"audio-speed-label-".concat(a,"-").concat(t)))})]}),(0,l.jsx)("button",{onClick:()=>{L(n.stopped,C.snippetId),m(!1)},onKeyDown:e=>{[" ","Enter"].includes(e.key)&&(e.preventDefault(),L(n.stopped,C.snippetId),m(!1))},"aria-label":"".concat(S("inputs.stop_audio_aria")," ").concat(C.title),title:"".concat(S("inputs.stop_audio_aria")," ").concat(C.title),className:"h-10 w-10 flex items-center justify-center","data-testid":"audio-player-stop-button",children:(0,l.jsx)(h.YG8,{"aria-hidden":"true"})})]}),!r&&(0,l.jsx)("audio",{ref:v,controls:!0,src:null!==(t=C.src)&&void 0!==t?t:void 0,"aria-labelledby":a,hidden:!0,"data-testid":"audio-player-audio-element",onEnded:()=>{L(n.complete,C.snippetId),m(!0)},onLoadStart:()=>{N.current=!1},onLoadedMetadata:()=>{N.current=!0,T&&(null==U||U.play())}})]})}a(4621);let x="w-[90vw] max-w-[1000px] min-h-[40vh] max-h-[80vh] md:max-h-[600px]",g='\n    a[href],\n    area[href],\n    audio,\n    input:not([disabled]),\n    select:not([disabled]),\n    textarea:not([disabled]),\n    button:not([disabled]),\n    iframe, object, embed,\n    [tabindex]:not([tabindex="-1"]),\n    [contenteditable]\n';function Modal(e){let{children:t,description:a,title:r,subtitle:n,trigger:s,footer:i}=e,[c,o]=(0,d.useState)(!1),u=(0,d.useRef)(null),m=(0,d.useRef)(null),f=(0,d.useRef)(null),p=(0,d.useRef)(null),b=(0,d.useRef)(null),v=(0,d.useRef)(!1),A=(0,d.useRef)(!1),{t:_}=useI18n();function cleanupListeners(){v.current&&(document.removeEventListener("mousedown",p.current),v.current=!1),A.current&&(document.removeEventListener("keydown",b.current),A.current=!1)}let j=(0,d.useCallback)(e=>{let t=e.target,a=!m.current.contains(t);a&&o(!1)},[]);p.current=j;let w=(0,d.useCallback)(e=>{var t,a;let r=Array.from(null!==(a=null===(t=u.current)||void 0===t?void 0:t.querySelectorAll(g))&&void 0!==a?a:[]),n=Array.from(document.querySelectorAll(g)),l=r[0],s=r[r.length-1],i=n[0],c=n[r.length-1];if("Tab"===e.key){if(e.shiftKey){document.activeElement===i?l.focus():document.activeElement===l&&s.focus(),e.preventDefault();return}document.activeElement===i?(l.focus(),e.preventDefault()):document.activeElement===s&&c.focus()}},[]);return b.current=w,(0,d.useEffect)(()=>{let e=u.current,handleDialogClose=()=>{o(!1)};return null==e||e.addEventListener("close",handleDialogClose),()=>{null==e||e.removeEventListener("close",handleDialogClose),cleanupListeners()}},[]),(0,d.useEffect)(()=>{var e,t,a;c?(v.current||(document.addEventListener("mousedown",p.current),v.current=!0),A.current||(document.addEventListener("keydown",b.current),A.current=!0),null===(e=u.current)||void 0===e||e.showModal(),document.body.setAttribute("inert","true"),document.body.style.overflow="hidden",document.body.style.filter="blur(2px)"):(cleanupListeners(),null===(t=u.current)||void 0===t||t.close(),document.body.removeAttribute("inert"),document.body.style.overflow="",document.body.style.filter=""),f.current&&(null===(a=u.current)||void 0===a||a.style.setProperty("--extra-padding-bottom","".concat(f.current.offsetHeight+16,"px")))},[c]),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("div",{role:"button","aria-haspopup":"dialog","aria-expanded":c,tabIndex:0,title:a,"data-testid":"modal-trigger",onClick:()=>o(!0),onKeyDown:e=>{[" ","Enter"].includes(e.key)&&(e.preventDefault(),o(!0))},children:s}),(0,l.jsx)("dialog",{ref:u,"aria-modal":"true",className:"".concat(c?"flex":""," ").concat(x," h-max fixed top-0 right-0 bottom-0 left-0 items-center justify-center overflow-hidden bg-transparent backdrop:bg-stone-900 backdrop:opacity-90"),children:(0,l.jsx)("div",{className:"relative ".concat(x," rounded-sm overflow-hidden flex h-max"),children:(0,l.jsxs)("div",{ref:m,className:"relative w-full bg-white dark:bg-stone-950 dark:text-amber-50",children:[(0,l.jsxs)("header",{className:"absolute top-0 left-0 right-0 shadow-sm flex justify-between items-center bg-amber-50 dark:bg-stone-900",children:[(0,l.jsxs)("div",{className:"ml-4 my-2 dark:text-amber-50",children:[(0,l.jsx)("h1",{className:"font-header",children:r}),(0,l.jsx)("p",{className:"text-xs italic",children:n})]}),(0,l.jsx)("button",{className:"h-8 w-8 m-4 flex items-center justify-center shrink-0 rounded-full border-[1px] border-amber-900 hover:border-[2px] dark:border-orange-300","data-testid":"modal-close-button",title:"".concat(_("modal.close_modal_label")," ").concat(r),"aria-label":"".concat(_("modal.close_modal_label")," ").concat(r),onClick:()=>o(!1),children:(0,l.jsx)(h.FU5,{className:"text-xl text-amber-900 dark:text-orange-300","aria-hidden":"true"})})]}),(0,l.jsx)("div",{className:"c-modal__content",children:t}),i&&(0,l.jsx)("footer",{ref:f,className:"sticky bottom-0 left-0 right-0 py-2 flex justify-center items-center shadow-sm bg-amber-50 dark:bg-stone-950",children:i})]})})})]})}function AudioBanner(){var e,t;let[a,r]=(0,d.useState)(!1),[s,i]=(0,d.useState)(!0),[c,o]=(0,d.useState)(!1),u=(0,d.useRef)(0),f=(0,d.useRef)(null),{t:p}=useI18n(),{audioPlaybackState:x,currentAudioData:g}=useAudioContext(),b=(0,l.jsxs)("div",{className:"flex gap-2 items-center justify-center cursor-pointer text-amber-900 dark:text-orange-300",children:[(0,l.jsx)(h.Q7r,{"aria-hidden":!0}),(0,l.jsx)(m.U,{className:"text-xs",children:p("audio.view_transcript_md")})]}),v=(0,l.jsx)("div",{className:"w-max m-auto",children:(0,l.jsx)(GlobalAudioPlayer,{labelledBy:"audio-banner-title",modalMode:!0})});return(0,d.useEffect)(()=>{let e=throttle(()=>{let e=window.scrollY||document.documentElement.scrollTop,t=e>u.current;u.current=e,t&&a&&(o(!0),f.current||(f.current=setTimeout(()=>{i(!0),f.current=null},500)))},100);return e(),document.addEventListener("scroll",e),()=>{document.removeEventListener("scroll",e)}},[a]),(0,d.useEffect)(()=>{x!==n.stopped&&(o(!1),i(!1)),r(x===n.stopped)},[x]),(0,l.jsxs)("div",{role:"region",className:"".concat(c?"-top-40":"top-0"," ").concat(s?"hidden":"flex"," fixed right-0 left-0 h-fit py-2 px-4 bg-amber-50 shadow-sm z-50 items-center justify-center flex-col transition-all duration-300 dark:bg-stone-950"),"aria-hidden":s,"aria-label":p("audio.audio_banner_aria"),children:[(0,l.jsx)("h3",{id:"audio-banner-title",className:"font-header text-sm",children:g.title}),(0,l.jsx)("div",{className:"max-w-lg m-auto",children:(0,l.jsx)(GlobalAudioPlayer,{labelledBy:"audio-banner-title",modalMode:!1})}),(0,l.jsx)(Modal,{trigger:b,description:"".concat(p("audio.open_transcript_modal")," ").concat(g.title),title:null!==(e=g.title)&&void 0!==e?e:"",subtitle:p("audio.audio_transcript"),footer:v,children:(0,l.jsx)(m.U,{children:null!==(t=g.transcript)&&void 0!==t?t:""})})]})}var b=a(4033),v=a(1396),A=a.n(v);function LanguageSwitcher(){let{t:e}=useI18n(),t=(0,b.usePathname)(),[a,r]=(0,d.useState)(!1),n=(0,d.useRef)(null),s=(0,d.useRef)(null),i=(0,d.useRef)(null),c=(0,d.useRef)(!1),o=(0,d.useRef)([{href:"/val/en",label:e("nav.english"),title:e("nav.english_link_description")},{href:"/val/es",label:e("nav.spanish"),title:e("nav.spanish_link_description")}]);function toggleLanguageMenu(){let e=!a;if(r(e),e){var t;null===(t=s.current)||void 0===t||t.focus()}}let u=(0,d.useCallback)(e=>{let t=e.target,a=![s,n].some(e=>{let{current:a}=e;return null==a?void 0:a.contains(t)});a&&r(!1)},[]);return i.current=u,(0,d.useEffect)(()=>{let unregisterDocumentClickawayListener=()=>{c.current&&(document.removeEventListener("mousedown",i.current),c.current=!1)};return a?c.current||(document.addEventListener("mousedown",i.current),c.current=!0):unregisterDocumentClickawayListener(),()=>{unregisterDocumentClickawayListener()}},[a]),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("button",{ref:n,id:"language-switcher-button","data-testid":"language-switcher-button","aria-haspopup":"listbox","aria-expanded":a,"aria-controls":"language-switcher-popup","aria-label":e("nav.language_button_label"),className:"h-8 w-8 flex justify-center items-center rounded-full shadow-lg hover:border-[2px] border-[1px] border-amber-900 bg-amber-50 dark:bg-stone-950 dark:border-orange-300",onClick:toggleLanguageMenu,children:(0,l.jsx)(h.$lZ,{className:"text-amber-900 dark:text-orange-300 h-5 w-5","aria-hidden":"true"})}),(0,l.jsx)("menu",{ref:s,id:"language-switcher-popup","data-testid":"language-switcher-popup",role:"region","aria-label":e("nav.language_popup_label"),hidden:!a,"aria-hidden":!a,className:"absolute top-8 right-8 shadow-lg p-3 bg-amber-50 border-[1px] border-amber-900 rounded-sm dark:bg-stone-950 dark:border-orange-300",children:o.current.map(e=>{let{href:a,label:r,title:n}=e;return(0,l.jsx)("li",{className:"flex items-center gap-2",role:"menuitem",children:(0,l.jsx)(A(),{href:a,title:n,"aria-current":a===t?"page":void 0,className:"".concat(a===t?"font-bold":""," text-amber-900 dark:text-orange-300 hover:underline"),children:r})},n)})})]})}var _=a(6691),j=a.n(_),w={src:"/_next/static/media/val--indian.e9b3cedf.jpg",height:1288,width:898,blurDataURL:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//CABEIAAgABgMBIgACEQEDEQH/xAAoAAEBAAAAAAAAAAAAAAAAAAAABAEBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhADEAAAAJhH/8QAHBAAAgICAwAAAAAAAAAAAAAAAwQBAhIiABMj/9oACAEBAAE/ALqvHWrAxjXYGcvcW/pnntWNef/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Af//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Af//Z",blurWidth:6,blurHeight:8};function Intro(){let{t:e}=useI18n();return(0,l.jsxs)("div",{className:"relative w-full h-[100svh] lg:flex lg:flex-row-reverse lg:gap-8 lg:justify-between lg:items-center xl:max-w-[1440px] xl:m-auto xl:px-12",children:[(0,l.jsx)(j(),{src:w,alt:e("val.hero.hero_image_alt"),priority:!0,className:"h-full w-full object-cover lg:lg-[100svh] lg:w-auto xl:h-[80svh]"}),(0,l.jsx)("div",{className:"absolute bottom-12 left-0 right-0 bg-amber-50 dark:bg-stone-950 py-4 lg:static lg:w-full lg:flex lg:justify-center",children:(0,l.jsxs)("hgroup",{className:"lg:w-fit lg:pl-4",children:[(0,l.jsx)(m.U,{className:"font-header text-5xl text-amber-900 dark:text-orange-300 text-center lg:text-left",children:e("val.hero.hero_text_md")}),(0,l.jsx)(m.U,{className:"mb-4 font-sans dark:text-amber-50 text-center font-semibold lg:text-left",children:e("val.hero.subtitle_md")}),(0,l.jsx)(m.U,{className:"font-sans dark:text-amber-50 text-center lg:text-left",children:e("val.hero.author_text_md")}),(0,l.jsx)(m.U,{className:"font-sans dark:text-amber-50 text-center lg:text-left text-sm",children:e("val.hero.interview_date_md")})]})})]})}function SectionZero(){let{t:e}=useI18n();return(0,l.jsx)("div",{className:"w-full bg-white dark:bg-stone-900 p-4 pt-12",children:(0,l.jsx)("div",{className:"m-auto max-w-[1000px]",children:(0,l.jsx)(m.U,{className:"".concat("first-letter:text-amber-900 first-letter:text-7xl first-letter:float-left first-letter:font-bold first-letter:mr-3 dark:first-letter:text-orange-300"," ").concat("font-serif mb-4 dark:text-white"),children:e("val.section_0.paragraph_1_md")})})})}function usePrefersDarkMode(){let[e,t]=(0,d.useState)(!1);return(0,d.useEffect)(()=>{let e=window.matchMedia("(prefers-color-scheme: dark)");t(e.matches);let listener=e=>{t(e.matches)};return e.addEventListener("change",listener),()=>{e.removeEventListener("change",listener)}},[]),e}let y="#fdba74";function AudioSpectrograph(e){let{snippetId:t}=e,a=(0,d.useRef)(y),r=(0,d.useRef)(!1),s=(0,d.useRef)(),i=(0,d.useRef)(null),c=(0,d.useRef)(null),o=usePrefersDarkMode(),{audioElement:u,subscribe:m,unsubscribe:h,audioAnalyser:f}=useAudioContext();function drawLineOnCanvas(e){let t=null==e?void 0:e.getContext("2d");if(!t)return;let r=Math.floor(e.height/2)+.5;t.beginPath(),t.moveTo(0,r),t.lineTo(e.width,r),t.strokeStyle=a.current,t.lineWidth=1,t.stroke()}let p=(0,d.useCallback)((e,t)=>{let n=i.current,l=null==n?void 0:n.getContext("2d");if(!n||!l)return;let o=n.width/24/2;e.getByteFrequencyData(t),l.clearRect(0,0,n.width,n.height),drawLineOnCanvas(n);for(let e=0;e<24;e++){let r=t[e],s=r/255,i=n.height*s,c=i/2;l.fillStyle=a.current,l.fillRect(e*o*2,n.height/2,o,c),l.fillRect(e*o*2,n.height-c-n.height/2,o,c)}r.current?s.current=window.requestAnimationFrame(()=>{var a;null===(a=c.current)||void 0===a||a.call(c,e,t)}):(l.clearRect(0,0,n.width,n.height),drawLineOnCanvas(n))},[]);return c.current=p,(0,d.useEffect)(()=>{drawLineOnCanvas(i.current)},[]),(0,d.useEffect)(()=>{a.current=o?y:"#78350f"},[o]),(0,d.useEffect)(()=>{let{playing:e}=n,handler=t=>{if(r.current=t===e,t===e&&u&&f&&i.current){var a;let e=f.frequencyBinCount,t=new Uint8Array(e);null===(a=c.current)||void 0===a||a.call(c,f,t)}};return m(t,handler),()=>{h(t,handler)}},[u,f,m,h,t]),(0,l.jsx)("canvas",{ref:i,className:"w-40 h-14"})}function AudioSnippet(e){let{src:t,title:a,transcript:r}=e,[s,i]=(0,d.useState)("play"),[c,o]=(0,d.useState)(!1),u=a.replaceAll(" ","-").toLowerCase(),{playAudio:m,pauseAudio:f,subscribe:p,unsubscribe:x,audioPlaybackState:g,currentAudioData:b}=useAudioContext();function handleButtonClick(){let{playing:e,paused:l,complete:s,stopped:i}=n;g===e&&b.snippetId===u?(f(),o(!1)):([l,s,i].includes(g)||b.snippetId!==u)&&m(u,t,a,r)}return(0,d.useEffect)(()=>{let handler=e=>{let{playing:t,paused:a,complete:r,stopped:l}=n;e===t?i("pause"):e===a?i("play"):e===r||c?(o(!0),i("restart")):e===l&&i("play")};return p(u,handler),()=>{x(u,handler)}},[a,p,x,u,c]),(0,l.jsxs)("div",{className:"flex flex-col items-center justify-center",children:[(0,l.jsxs)("h3",{className:"font-header dark:text-white",children:["Audio: ",a]}),(0,l.jsxs)("div",{className:"flex gap-2 items-center",children:[(0,l.jsxs)("button",{className:"text-amber-900 dark:text-orange-300",onClick:handleButtonClick,children:["play"===s&&(0,l.jsx)(h.Hm_,{className:"h-12 w-12","aria-hidden":!0}),"pause"===s&&(0,l.jsx)(h.SUn,{className:"h-12 w-12","aria-hidden":!0}),"restart"===s&&(0,l.jsx)(h.zq9,{className:"h-12 w-12","aria-hidden":!0})]}),(0,l.jsx)(AudioSpectrograph,{snippetId:u})]})]})}let N="font-serif mb-4 dark:text-white";function SectionOne(){let{t:e}=useI18n();return(0,l.jsx)("div",{className:"w-full bg-white dark:bg-stone-900 p-4",children:(0,l.jsxs)("div",{className:"m-auto max-w-[1000px]",children:[(0,l.jsx)("h2",{className:"text-3xl font-header mb-4 dark:text-white",children:'Part I: "Guy"'}),(0,l.jsx)(AudioSnippet,{src:"/audio/intro.m4a",title:"Ezra tests some audio",transcript:"test"}),(0,l.jsx)(m.U,{className:"".concat(N),children:e("val.section_1.paragraph_1_md")}),(0,l.jsx)(AudioSnippet,{src:"/audio/test-2.m4a",title:"Test #2",transcript:e("val.section_3.paragraph_3_md")}),(0,l.jsx)(m.U,{className:"".concat(N," first-letter:ml-8"),children:e("val.section_1.paragraph_2_md")}),(0,l.jsx)(m.U,{className:"".concat(N," first-letter:ml-8"),children:e("val.section_1.paragraph_3_md")}),(0,l.jsx)(m.U,{className:"".concat(N," first-letter:ml-8"),children:e("val.section_1.paragraph_4_md")}),(0,l.jsx)(m.U,{className:"".concat(N," first-letter:ml-8"),children:e("val.section_1.paragraph_5_md")}),(0,l.jsx)(m.U,{className:"".concat(N," first-letter:ml-8"),children:e("val.section_1.paragraph_6_md")})]})})}let k="font-serif mb-4 dark:text-white";function SectionTwo(){let{t:e}=useI18n();return(0,l.jsx)("div",{className:"w-full bg-white dark:bg-stone-900 p-4",children:(0,l.jsxs)("div",{className:"m-auto max-w-[1000px]",children:[(0,l.jsx)("h2",{className:"text-3xl font-header mb-4 dark:text-white",children:"Part II: Engineer"}),(0,l.jsx)(m.U,{className:"".concat(k),children:e("val.section_2.paragraph_1_md")}),(0,l.jsx)(m.U,{className:"".concat(k," first-letter:ml-8"),children:e("val.section_2.paragraph_2_md")}),(0,l.jsx)(m.U,{className:"".concat(k," first-letter:ml-8"),children:e("val.section_2.paragraph_3_md")}),(0,l.jsx)(m.U,{className:"".concat(k," first-letter:ml-8"),children:e("val.section_2.paragraph_4_md")}),(0,l.jsx)(m.U,{className:"".concat(k," first-letter:ml-8"),children:e("val.section_2.paragraph_5_md")}),(0,l.jsx)(m.U,{className:"".concat(k," first-letter:ml-8"),children:e("val.section_2.paragraph_6_md")})]})})}let E="font-serif mb-4 dark:text-white";function SectionThree(){let{t:e}=useI18n();return(0,l.jsx)("div",{className:"w-full bg-white dark:bg-stone-900 p-4",children:(0,l.jsxs)("div",{className:"m-auto max-w-[1000px]",children:[(0,l.jsx)("h2",{className:"text-3xl font-header mb-4 dark:text-white",children:"Part III: Snoopy"}),(0,l.jsx)(m.U,{className:"".concat(E),children:e("val.section_3.paragraph_1_md")}),(0,l.jsx)(m.U,{className:"".concat(E," first-letter:ml-8"),children:e("val.section_3.paragraph_2_md")}),(0,l.jsx)(m.U,{className:"".concat(E," first-letter:ml-8"),children:e("val.section_3.paragraph_3_md")}),(0,l.jsx)(m.U,{className:"".concat(E," first-letter:ml-8"),children:e("val.section_3.paragraph_4_md")}),(0,l.jsx)(m.U,{className:"".concat(E," first-letter:ml-8"),children:e("val.section_3.paragraph_5_md")}),(0,l.jsx)(m.U,{className:"".concat(E," first-letter:ml-8"),children:e("val.section_3.paragraph_6_md")})]})})}let S="font-serif mb-4 dark:text-white";function SectionFour(){let{t:e}=useI18n();return(0,l.jsx)("div",{className:"w-full bg-white dark:bg-stone-900 p-4",children:(0,l.jsxs)("div",{className:"m-auto max-w-[1000px]",children:[(0,l.jsx)("h2",{className:"text-3xl font-header mb-4 dark:text-white",children:"Part IV: Dr. Val"}),(0,l.jsx)(m.U,{className:"".concat(S),children:e("val.section_4.paragraph_1_md")}),(0,l.jsx)(m.U,{className:"".concat(S," first-letter:ml-8"),children:e("val.section_4.paragraph_2_md")}),(0,l.jsx)(m.U,{className:"".concat(S," first-letter:ml-8"),children:e("val.section_4.paragraph_3_md")}),(0,l.jsx)(m.U,{className:"".concat(S," first-letter:ml-8"),children:e("val.section_4.paragraph_4_md")}),(0,l.jsx)(m.U,{className:"".concat(S," first-letter:ml-8"),children:e("val.section_4.paragraph_5_md")}),(0,l.jsx)(m.U,{className:"".concat(S," first-letter:ml-8"),children:e("val.section_4.paragraph_6_md")})]})})}let C="font-serif mb-4 dark:text-white";function SectionFive(){let{t:e}=useI18n();return(0,l.jsx)("div",{className:"w-full bg-white dark:bg-stone-900 p-4",children:(0,l.jsxs)("div",{className:"m-auto max-w-[1000px]",children:[(0,l.jsx)("h2",{className:"text-3xl font-header mb-4 dark:text-white",children:"Part V: Lately"}),(0,l.jsx)(m.U,{className:"".concat(C),children:e("val.section_5.paragraph_1_md")}),(0,l.jsx)(m.U,{className:"".concat(C," first-letter:ml-8"),children:e("val.section_5.paragraph_2_md")}),(0,l.jsx)(m.U,{className:"".concat(C," first-letter:ml-8"),children:e("val.section_5.paragraph_3_md")}),(0,l.jsx)(m.U,{className:"".concat(C," first-letter:ml-8"),children:e("val.section_5.paragraph_4_md")}),(0,l.jsx)(m.U,{className:"".concat(C," first-letter:ml-8"),children:e("val.section_5.paragraph_5_md")}),(0,l.jsx)(m.U,{className:"".concat(C," first-letter:ml-8"),children:e("val.section_5.paragraph_6_md")})]})})}function ProgressTracker(e){let{sectionOneRef:t,sectionTwoRef:a,sectionThreeRef:r,sectionFourRef:n,sectionFiveRef:s}=e,[i,c]=(0,d.useState)(0),[o,u]=(0,d.useState)(!1),[m,h]=(0,d.useState)(!0),f=(0,d.useRef)(null),p=(0,d.useRef)(0),{t:x}=useI18n(),g=[{label:"I",ref:t},{label:"II",ref:a},{label:"III",ref:r},{label:"IV",ref:n},{label:"V",ref:s}];return(0,d.useEffect)(()=>{let e=throttle(()=>{let e,l,i=window.scrollY||document.documentElement.scrollTop,o=i>=p.current;i!==p.current&&u(!o),h(i<100),p.current=i;let d=t.current,m=a.current,x=r.current,g=n.current,b=s.current;if(!d||!m||!x||!g||!b)return;let v=d.clientHeight,A=m.clientHeight,_=x.clientHeight,j=g.clientHeight,w=b.clientHeight,y=d.offsetTop,N=m.offsetTop,k=x.offsetTop,E=g.offsetTop,S=b.offsetTop,C=Math.max(0,window.scrollY||document.documentElement.scrollTop),I=window.innerHeight||document.documentElement.clientHeight,R=C+I,getSectionProgressPercentage=(e,t)=>Math.min(100,Math.max(0,(C+I-e)/t*100));C+I<y?(e=0,l=0):y+v>R?(e=getSectionProgressPercentage(y,v),l=0):N+A>R?(e=getSectionProgressPercentage(N,A),l=20):k+_>R?(e=getSectionProgressPercentage(k,_),l=40):E+j>R?(e=getSectionProgressPercentage(E,j),l=60):(e=getSectionProgressPercentage(S,w),l=80);let L=l+1*e/5,U=Number(L.toFixed(0));c(U),f.current.style.setProperty("--progress-percent","".concat(U,"%"))},100);return e(),document.addEventListener("scroll",e),()=>{document.removeEventListener("scroll",e)}},[t,a,r,n,s]),(0,l.jsxs)("div",{ref:f,className:"c-progress-tracker ".concat(o?"c-progress-tracker--expanded":""),role:"progressbar","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":Number(i.toFixed(0)),hidden:m,"aria-hidden":m,onMouseOver:()=>u(!0),onMouseOut:()=>u(!1),children:[o&&(0,l.jsx)("div",{className:"absolute -top-14 right-0 left-0 rounded-md w-max bg-amber-50 p-2 font-header m-auto animate-fade-in-fast shadow-lg dark:bg-stone-950 dark:text-amber-50","aria-hidden":!0,children:x("nav.sections")}),(0,l.jsx)("div",{className:"absolute -top-6 h-6 w-full hidden lg:block"}),(0,l.jsx)("nav",{role:"navigation",className:"relative flex items-center justify-around w-full",children:g.map((e,t)=>(0,l.jsx)("button",{className:"".concat(o?"h-9 w-10 lg:w-8 lg:h-8 rounded-lg px-2":"h-1.5 w-1.5"," rounded-full flex items-center justify-center bg-amber-50 border-[1px] border-amber-900 transition-all z-10 hover:border-[2px] dark:bg-stone-900 dark:border-orange-300"),"aria-label":"".concat(x("nav.go_to_section_label")," ").concat(t+1),title:"".concat(x("nav.go_to_section_label")," ").concat(t+1),onClick:()=>scrollTo({top:e.ref.current.offsetTop,behavior:"instant"}),onFocus:()=>u(!0),children:o&&(0,l.jsx)("span",{className:"text-sm font-header text-amber-900 animate-fade-in-fast dark:text-orange-300",children:e.label})},"nav-button-".concat(t)))})]})}function ValHome(){let[e,t]=(0,d.useState)(!0),a=(0,d.useRef)(null),r=(0,d.useRef)(null),n=(0,d.useRef)(null),s=(0,d.useRef)(null),c=(0,d.useRef)(null),u=(0,d.useRef)(0);return(0,d.useEffect)(()=>{let e=throttle(()=>{let e=window.scrollY||document.documentElement.scrollTop,a=e>u.current;e!==u.current&&t(!a),u.current=e},100);return document.addEventListener("scroll",e),()=>{document.removeEventListener("scroll",e)}},[]),(0,l.jsx)(l.Fragment,{children:(0,l.jsx)("div",{className:"bg-amber-50 dark:bg-stone-950 w-[100svw] min-h-[100svh] max-w-full ".concat(i().variable," ").concat(o().variable),children:(0,l.jsxs)(AudioProvider,{children:[(0,l.jsx)(AudioBanner,{}),(0,l.jsx)("div",{hidden:!0,role:"region",className:"".concat(e?"opacity-100":"opacity-0"," transition-opacity fixed top-4 right-4 z-50"),children:(0,l.jsx)(LanguageSwitcher,{})}),(0,l.jsxs)("article",{children:[(0,l.jsx)("section",{children:(0,l.jsx)(Intro,{})}),(0,l.jsx)("section",{children:(0,l.jsx)(SectionZero,{})}),(0,l.jsx)("section",{ref:a,children:(0,l.jsx)(SectionOne,{})}),(0,l.jsx)("section",{ref:r,children:(0,l.jsx)(SectionTwo,{})}),(0,l.jsx)("section",{ref:n,children:(0,l.jsx)(SectionThree,{})}),(0,l.jsx)("section",{ref:s,children:(0,l.jsx)(SectionFour,{})}),(0,l.jsx)("section",{ref:c,children:(0,l.jsx)(SectionFive,{})})]}),(0,l.jsx)(ProgressTracker,{sectionOneRef:a,sectionTwoRef:r,sectionThreeRef:n,sectionFourRef:s,sectionFiveRef:c})]})})})}a(5809)},178:function(e,t,a){"use strict";a.d(t,{A:function(){return n}});var r=a(2265);let n=(0,r.createContext)(void 0)},4649:function(e,t,a){"use strict";a.d(t,{i:function(){return r}});let r={english:"en",spanish:"es"}},2278:function(){},4621:function(){},5809:function(){}}]);