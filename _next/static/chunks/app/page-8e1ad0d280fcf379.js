(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{2242:function(e,t,n){Promise.resolve().then(n.bind(n,6945)),Promise.resolve().then(n.t.bind(n,8326,23))},6945:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return Starfield}});var r=n(7437),i=n(2265),a=n(4033);function debounce(e,t){let n=null;return function(){for(var r=arguments.length,i=Array(r),a=0;a<r;a++)i[a]=arguments[a];n&&clearTimeout(n),n=setTimeout(()=>{e(...i),n=null},t)}}function sample(e){if(0===e.length)return;let t=Math.floor(Math.random()*e.length);return e[t]}function initStars(e,t){let n=["f4e1e1","ffd9bc","fffde8","edfeff","f7edff"],r=["c93636","ff940a","fce00c","5761f2","8a66c4"],i=Math.ceil(t*e*.001),a=[];for(let o=0;o<i;o++){let i=Math.abs(getRandomNumberGaussian(.2,1)),o=+Math.max(i,.8).toFixed(2),c=sample(Math.random()>.98?r:n),u=+Math.random().toFixed(2);a.push({color:c,size:o,parallax:u,x:Math.random()*t,y:Math.random()*e})}return a}function getRandomNumberGaussian(e,t){let n=0,r=0;for(;0===n;)n=Math.random();for(;0===r;)r=Math.random();return Math.sqrt(-2*Math.log(n))*Math.cos(2*Math.PI*r)*t+e}function usePrefersReducedMotion(){let[e,t]=(0,i.useState)(!1);return(0,i.useEffect)(()=>{let e=window.matchMedia("(prefers-reduced-motion: reduce)");t(e.matches);let listener=e=>{t(e.matches)};return e.addEventListener("change",listener),()=>{e.removeEventListener("change",listener)}},[]),e}let o={};function getDiamondVertices(e){if(o[e])return o[e];let t=[],n=.5*e;for(let r=0;r<8;r++){let i=Math.PI/4*r,a=r%2==0?e:n,o=Math.cos(i)*a,c=Math.sin(i)*a;t.push([o,c])}return o[e]=t,t}function drawDotOnCanvas(e,t){e.fillStyle="#".concat(t.color),e.beginPath(),e.arc(t.x,t.y,t.size,0,2*Math.PI),e.fill()}function drawDiamondOnCanvas(e,t){let n=getDiamondVertices(t.size),r=n.map(e=>[e[0]+t.x,e[1]+t.y]);e.beginPath(),e.moveTo(r[0][0],r[0][1]);for(let t=0;t<r.length;t++){let n=r[t][0],i=r[t][1],a=r[(t+1)%r.length][0],o=r[(t+1)%r.length][1],c=(n+a)/2,u=(i+o)/2,l=(c+n)/2,s=(u+i)/2,f=(c+a)/2,d=(u+o)/2;e.bezierCurveTo(l,s,f,d,a,o)}e.fillStyle="#".concat(t.color),e.fill()}function Starfield(){let e=usePrefersReducedMotion(),t="true"===(0,a.useSearchParams)().get("fps"),n=t&&!e,[o,c]=(0,i.useState)(0),u=(0,i.useRef)([]),l=(0,i.useRef)(0),s=(0,i.useRef)(Date.now()),f=(0,i.useRef)(Date.now()),d=(0,i.useRef)(!1),h=(0,i.useRef)(null),m=(0,i.useRef)(null),w=(0,i.useRef)();function cancelAnimation(e){d.current=!0,null!==e&&window.cancelAnimationFrame(e)}function resetCanvas(){let e=h.current;if(!e)return;let t=window.innerHeight,n=window.innerWidth;e.height=t,e.width=n,u.current=initStars(t,n)}function trackTime(){l.current++;let e=Date.now(),t=e-s.current;t>=1e3&&(c(l.current),l.current=0,s.current=e)}function drawStars(){let e=h.current,t=null==e?void 0:e.getContext("2d");if(!e||!t){e?console.error("canvas context not found"):console.error("canvas not found");return}trackTime();let n=e.width,r=e.height;t.fillStyle="black",t.fillRect(0,0,n,r),u.current.forEach(e=>{e.size>1?drawDiamondOnCanvas(t,e):drawDotOnCanvas(t,e)})}function drift(){if(d.current)return;let t=Date.now(),n=t-f.current;f.current=t;let r=8*(n/1e3);u.current.forEach(e=>{e.x+=r*e.parallax,e.y+=r*e.parallax,e.x<0-e.size?e.x=window.innerWidth-e.size:e.x>window.innerWidth+e.size&&(e.x=0-e.size),e.y<0-e.size?e.y=window.innerHeight-e.size:e.y>window.innerHeight+e.size&&(e.y=0-e.size)}),drawStars(),w.current&&!e&&(m.current=window.requestAnimationFrame(w.current))}return w.current=drift,(0,i.useEffect)(()=>{let resizeHandler=()=>{var e;cancelAnimation(m.current),resetCanvas(),d.current=!1,null===(e=w.current)||void 0===e||e.call(w)},e=debounce(resizeHandler,100);return resizeHandler(),window.addEventListener("resize",e),window.addEventListener("focus",e),()=>{cancelAnimation(m.current),window.removeEventListener("resize",e),window.removeEventListener("focus",e)}},[]),(0,i.useEffect)(()=>{if(cancelAnimation(m.current),!e){var t;d.current=!1,null===(t=w.current)||void 0===t||t.call(w)}},[e]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"fixed top-0 right-0 bottom-0 left-0 bg-black"}),n&&(0,r.jsxs)("div",{className:"fixed top-4 left-4 text-green-500 z-50","data-testid":"starfield-fps-meter",children:["FPS: ",o]}),(0,r.jsx)("canvas",{ref:h,className:"fixed top-0 right-0 bottom-0 left-0 z-0 animate-fade-in"})]})}}},function(e){e.O(0,[42,971,472,744],function(){return e(e.s=2242)}),_N_E=e.O()}]);