if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let o={};const d=e=>n(e,c),t={module:{uri:c},exports:o,require:d};i[c]=Promise.all(s.map((e=>t[e]||d(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-1e687c96.js",revision:null},{url:"assets/index-5ad0c180.css",revision:null},{url:"index.html",revision:"c5b0ab5461c7bbb9322d01d5c6f640c9"},{url:"registerSW.js",revision:"8b526a0b5be5727f55c257c1eefd571d"},{url:"favicon.ico",revision:"a3c0eaa1c010020dc7101adf138aec73"},{url:"apple-touch-icon.png",revision:"825aad50b6aae57a292063cbd859bc6f"},{url:"pwa-192x192.png",revision:"724a6b30f1a6f8b2a9b6588b4284d852"},{url:"pwa-512x512.png",revision:"5444c0c20706d711877eb6cd8fbbf56f"},{url:"manifest.webmanifest",revision:"f762fdef91d03c5dda5f76ed4c6dc47b"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
