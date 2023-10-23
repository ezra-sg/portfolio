(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{9457:function(e,t,n){Promise.resolve().then(n.bind(n,5029)),Promise.resolve().then(n.t.bind(n,4724,23)),Promise.resolve().then(n.t.bind(n,4244,23))},5029:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return Starfield}});var r=n(7437),i=n(2265),o=n(4033),a=n(6223);let c={};function Starfield(){let e=function(){let[e,t]=(0,i.useState)(!1);return(0,i.useEffect)(()=>{let e=window.matchMedia("(prefers-reduced-motion: reduce)");t(e.matches);let listener=e=>{t(e.matches)};return e.addEventListener("change",listener),()=>{e.removeEventListener("change",listener)}},[]),e}(),t="true"===(0,o.useSearchParams)().get("fps"),n=t&&!e,[l,u]=(0,i.useState)(0),f=(0,i.useRef)([]),s=(0,i.useRef)(0),d=(0,i.useRef)(Date.now()),h=(0,i.useRef)(Date.now()),m=(0,i.useRef)(!1),w=(0,i.useRef)(null),v=(0,i.useRef)(null),g=(0,i.useRef)();function cancelAnimation(e){m.current=!0,null!==e&&window.cancelAnimationFrame(e)}return g.current=function(){if(m.current)return;let t=Date.now(),n=t-h.current;h.current=t;let r=8*(n/1e3);f.current.forEach(e=>{e.x+=r*e.parallax,e.y+=r*e.parallax,e.x<0-e.size?e.x=window.innerWidth-e.size:e.x>window.innerWidth+e.size&&(e.x=0-e.size),e.y<0-e.size?e.y=window.innerHeight-e.size:e.y>window.innerHeight+e.size&&(e.y=0-e.size)}),function(){let e=w.current,t=null==e?void 0:e.getContext("2d");if(!e||!t){e?console.error("canvas context not found"):console.error("canvas not found");return}!function(){s.current++;let e=Date.now(),t=e-d.current;t>=1e3&&(u(s.current),s.current=0,d.current=e)}();let n=e.width,r=e.height;t.fillStyle="black",t.fillRect(0,0,n,r),f.current.forEach(e=>{e.size>1?!function(e,t){let n=function(e){if(c[e])return c[e];let t=[],n=.5*e;for(let r=0;r<8;r++){let i=Math.PI/4*r,o=r%2==0?e:n,a=Math.cos(i)*o,c=Math.sin(i)*o;t.push([a,c])}return c[e]=t,t}(t.size),r=n.map(e=>[e[0]+t.x,e[1]+t.y]);e.beginPath(),e.moveTo(r[0][0],r[0][1]);for(let t=0;t<r.length;t++){let n=r[t][0],i=r[t][1],o=r[(t+1)%r.length][0],a=r[(t+1)%r.length][1],c=(n+o)/2,l=(i+a)/2,u=(c+n)/2,f=(l+i)/2,s=(c+o)/2,d=(l+a)/2;e.bezierCurveTo(u,f,s,d,o,a)}e.fillStyle="#".concat(t.color),e.fill()}(t,e):(t.fillStyle="#".concat(e.color),t.beginPath(),t.arc(e.x,e.y,e.size,0,2*Math.PI),t.fill())})}(),g.current&&!e&&(v.current=window.requestAnimationFrame(g.current))},(0,i.useEffect)(()=>{let resizeHandler=()=>{var e;cancelAnimation(v.current),function(){let e=w.current;if(!e)return;let t=window.innerHeight,n=window.innerWidth;e.height=t,e.width=n,f.current=function(e,t){let n=["f4e1e1","ffd9bc","fffde8","edfeff","f7edff"],r=["c93636","ff940a","fce00c","5761f2","8a66c4"],i=Math.ceil(t*e*.001),o=[];for(let a=0;a<i;a++){let i=Math.abs(function(e,t){let n=0,r=0;for(;0===n;)n=Math.random();for(;0===r;)r=Math.random();return 1*(Math.sqrt(-2*Math.log(n))*Math.cos(2*Math.PI*r))+.2}(0,0)),a=+Math.max(i,.8).toFixed(2),c=function(e){if(0===e.length)return;let t=Math.floor(Math.random()*e.length);return e[t]}(Math.random()>.98?r:n),l=+Math.random().toFixed(2);o.push({color:c,size:a,parallax:l,x:Math.random()*t,y:Math.random()*e})}return o}(t,n)}(),m.current=!1,null===(e=g.current)||void 0===e||e.call(g)},e=(0,a.Z)(resizeHandler,100);return resizeHandler(),window.addEventListener("resize",e),window.addEventListener("focus",e),()=>{cancelAnimation(v.current),window.removeEventListener("resize",e),window.removeEventListener("focus",e)}},[]),(0,i.useEffect)(()=>{if(cancelAnimation(v.current),!e){var t;null===(t=g.current)||void 0===t||t.call(g)}},[e]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"fixed top-0 right-0 bottom-0 left-0 bg-black"}),n&&(0,r.jsxs)("div",{className:"fixed top-4 left-4 text-green-500 z-50","data-testid":"starfield-fps-meter",children:["FPS: ",l]}),(0,r.jsx)("canvas",{ref:w,className:"fixed top-0 right-0 bottom-0 left-0 z-0 animate-fade-in"})]})}},6223:function(e,t,n){"use strict";function debounce(e,t){let n=null;return function(){for(var r=arguments.length,i=Array(r),o=0;o<r;o++)i[o]=arguments[o];n&&clearTimeout(n),n=setTimeout(()=>{e(...i),n=null},t)}}n.d(t,{Z:function(){return debounce}})}},function(e){e.O(0,[657,971,864,744],function(){return e(e.s=9457)}),_N_E=e.O()}]);