(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[476],{8393:function(e,t,n){Promise.resolve().then(n.bind(n,2810))},2810:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return Starfield}});var r=n(7437),i=n(2265),a=n(4033);function Starfield(){let e=function(){let[e,t]=(0,i.useState)(!1);return(0,i.useEffect)(()=>{let e=window.matchMedia("(prefers-reduced-motion: reduce)");t(e.matches);let listener=e=>{t(e.matches)};return e.addEventListener("change",listener),()=>{e.removeEventListener("change",listener)}},[]),e}(),t="true"===(0,a.useSearchParams)().get("fps"),n=t&&!e,[l,o]=(0,i.useState)(0),c=(0,i.useRef)([]),u=(0,i.useRef)({}),f=(0,i.useRef)(0),s=(0,i.useRef)(Date.now()),d=(0,i.useRef)(Date.now()),h=(0,i.useRef)(null),m=(0,i.useRef)(null),w=(0,i.useRef)();function cancelAnimation(){m.current&&window.cancelAnimationFrame(m.current)}let v=(0,i.useCallback)(()=>{let e=h.current,t=null==e?void 0:e.getContext("2d");if(!e||!t)return;f.current++;let n=Date.now(),r=n-s.current;r>=1e3&&(o(f.current),f.current=0,s.current=n);let i=e.width,a=e.height;t.fillStyle="black",t.fillRect(0,0,i,a),c.current.forEach(e=>{if(e.size>1){let n=function(e){if(u.current[e])return u.current[e];let t=[],n=.5*e;for(let r=0;r<8;r++){let i=Math.PI/4*r,a=r%2==0?e:n,l=Math.cos(i)*a,o=Math.sin(i)*a;t.push([l,o])}return u.current[e]=t,t}(e.size),r=n.map(t=>[t[0]+e.x,t[1]+e.y]);t.beginPath(),t.moveTo(r[0][0],r[0][1]);for(let e=0;e<r.length;e++){let n=r[e][0],i=r[e][1],a=r[(e+1)%r.length][0],l=r[(e+1)%r.length][1],o=(n+a)/2,c=(i+l)/2,u=(o+n)/2,f=(c+i)/2,s=(o+a)/2,d=(c+l)/2;t.bezierCurveTo(u,f,s,d,a,l)}t.fillStyle="#".concat(e.color),t.fill()}else t.fillStyle="#".concat(e.color),t.beginPath(),t.arc(e.x,e.y,e.size,0,2*Math.PI),t.fill()})},[]),p=(0,i.useCallback)(()=>{let t=Date.now(),n=t-d.current;d.current=t;let r=8*(n/1e3);c.current.forEach(e=>{e.x+=r*e.parallax,e.y+=r*e.parallax,e.x<0-e.size?e.x=window.innerWidth-e.size:e.x>window.innerWidth+e.size&&(e.x=0-e.size),e.y<0-e.size?e.y=window.innerHeight-e.size:e.y>window.innerHeight+e.size&&(e.y=0-e.size)}),v(),w.current&&!e&&(m.current=window.requestAnimationFrame(w.current))},[v,e]);return w.current=p,(0,i.useEffect)(()=>{let e;let resizeHandler=()=>{var e;cancelAnimation(),function(){let e=h.current;if(!e)return;let t=window.innerHeight,n=window.innerWidth;e.height=t,e.width=n,c.current=function(e,t){let n=["f4e1e1","ffd9bc","fffde8","edfeff","f7edff"],r=["c93636","ff940a","fce00c","5761f2","8a66c4"],i=Math.ceil(t*e*.001),a=[];for(let l=0;l<i;l++){let i=Math.abs(function(e,t){let n=0,r=0;for(;0===n;)n=Math.random();for(;0===r;)r=Math.random();return 1*(Math.sqrt(-2*Math.log(n))*Math.cos(2*Math.PI*r))+.2}(0,0)),l=+Math.max(i,.8).toFixed(2),o=function(e){if(0===e.length)return;let t=Math.floor(Math.random()*e.length);return e[t]}(Math.random()>.98?r:n),c=+Math.random().toFixed(2);a.push({color:o,size:l,parallax:c,x:Math.random()*t,y:Math.random()*e})}return a}(t,n)}(),null===(e=w.current)||void 0===e||e.call(w)},t=(e=null,function(){for(var t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];e&&clearTimeout(e),e=setTimeout(()=>{resizeHandler(...n),e=null},100)});return resizeHandler(),window.addEventListener("resize",t),window.addEventListener("focus",t),()=>{cancelAnimation(),window.removeEventListener("resize",t),window.removeEventListener("focus",t)}},[]),(0,i.useEffect)(()=>{if(!e){var t;cancelAnimation(),null===(t=w.current)||void 0===t||t.call(w)}},[e]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"fixed top-0 right-0 bottom-0 left-0 bg-black"}),n&&(0,r.jsxs)("div",{className:"fixed top-4 left-4 text-green-500 z-50","data-testid":"starfield-fps-meter",children:["FPS: ",l]}),(0,r.jsx)("canvas",{ref:h,className:"fixed top-0 right-0 bottom-0 left-0 z-0 animate-fade-in"})]})}},622:function(e,t,n){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r=n(2265),i=Symbol.for("react.element"),a=Symbol.for("react.fragment"),l=Object.prototype.hasOwnProperty,o=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c={key:!0,ref:!0,__self:!0,__source:!0};function q(e,t,n){var r,a={},u=null,f=null;for(r in void 0!==n&&(u=""+n),void 0!==t.key&&(u=""+t.key),void 0!==t.ref&&(f=t.ref),t)l.call(t,r)&&!c.hasOwnProperty(r)&&(a[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===a[r]&&(a[r]=t[r]);return{$$typeof:i,type:e,key:u,ref:f,props:a,_owner:o.current}}t.Fragment=a,t.jsx=q,t.jsxs=q},7437:function(e,t,n){"use strict";e.exports=n(622)},4033:function(e,t,n){e.exports=n(290)}},function(e){e.O(0,[971,864,744],function(){return e(e.s=8393)}),_N_E=e.O()}]);