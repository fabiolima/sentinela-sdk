(function(t,i){typeof exports=="object"&&typeof module<"u"?module.exports=i():typeof define=="function"&&define.amd?define(i):(t=typeof globalThis<"u"?globalThis:t||self,t["Sentinela SDK"]=i())})(this,function(){"use strict";var x=Object.defineProperty;var b=(t,i,r)=>i in t?x(t,i,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[i]=r;var c=(t,i,r)=>(b(t,typeof i!="symbol"?i+"":i,r),r),A=(t,i,r)=>{if(!i.has(t))throw TypeError("Cannot "+r)};var g=(t,i,r)=>{if(i.has(t))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(t):i.set(t,r)};var m=(t,i,r)=>(A(t,i,"access private method"),r);var d,p;let t;const i=new Uint8Array(16);function r(){if(!t&&(t=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!t))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return t(i)}const o=[];for(let e=0;e<256;++e)o.push((e+256).toString(16).slice(1));function h(e,n=0){return o[e[n+0]]+o[e[n+1]]+o[e[n+2]]+o[e[n+3]]+"-"+o[e[n+4]]+o[e[n+5]]+"-"+o[e[n+6]]+o[e[n+7]]+"-"+o[e[n+8]]+o[e[n+9]]+"-"+o[e[n+10]]+o[e[n+11]]+o[e[n+12]]+o[e[n+13]]+o[e[n+14]]+o[e[n+15]]}const l={randomUUID:typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};function y(e,n,s){if(l.randomUUID&&!n&&!e)return l.randomUUID();e=e||{};const a=e.random||(e.rng||r)();if(a[6]=a[6]&15|64,a[8]=a[8]&63|128,n){s=s||0;for(let u=0;u<16;++u)n[s+u]=a[u];return n}return h(a)}function w(){return y()}function D(){const e=window.localStorage.getItem("sentinela-userid");if(!e){const n=w();return window.localStorage.setItem("sentinela-userid",n),n}return e}function f(){return console.log("https://sentinela-analytics.onrender.com"),"https://sentinela-analytics.onrender.com"}function I(){return"userAgentData"in navigator?navigator.userAgentData.mobile:"maxTouchPoints"in navigator?navigator.maxTouchPoints>0:!1}function U(){return"userAgentData"in navigator?navigator.userAgentData.platform:navigator.platform}function S(){return{mobile:I(),platform:U(),appVersion:navigator.appVersion,userAgent:navigator.userAgent,width:window.innerWidth,height:window.innerHeight}}class v{constructor({domain:n}){g(this,d);c(this,"endpoint");c(this,"domain");c(this,"userId");this.domain=n,this.endpoint=f(),this.userId=D(),m(this,d,p).call(this)}async onError(n){try{await this.sendError(n)}catch(s){console.error(s)}}async sendError(n){const s=S();n={...n,...s,user_id:this.userId,date:new Date().toISOString(),href:location.href,referrer:document.referrer||null,domain:this.domain};const a=`${this.endpoint}/errors`;return fetch(a,{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({...n})})}}return d=new WeakSet,p=function(){window.addEventListener("error",n=>this.onError({source:"global",message:n.error.message,stack:n.error.stack,filename:n.filename,lineno:n.lineno,colno:n.colno}))},v});
