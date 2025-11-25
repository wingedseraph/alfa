import{r as u,c as x,j as g}from"./index-fa8yplaJ.js";/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),h=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,r,s)=>s?s.toUpperCase():r.toLowerCase()),m=e=>{const t=h(e);return t.charAt(0).toUpperCase()+t.slice(1)},f=(...e)=>e.filter((t,r,s)=>!!t&&t.trim()!==""&&s.indexOf(t)===r).join(" ").trim(),C=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0};/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var b={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=u.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:r=2,absoluteStrokeWidth:s,className:a="",children:o,iconNode:n,...d},l)=>u.createElement("svg",{ref:l,...b,width:t,height:t,stroke:e,strokeWidth:s?Number(r)*24/Number(t):r,className:f("lucide",a),...!o&&!C(d)&&{"aria-hidden":"true"},...d},[...n.map(([p,i])=>u.createElement(p,i)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=(e,t)=>{const r=u.forwardRef(({className:s,...a},o)=>u.createElement(w,{ref:o,iconNode:t,className:f(`lucide-${v(m(e))}`,`lucide-${e}`,s),...a}));return r.displayName=m(e),r},y={default:"bg-card text-card-foreground hover:bg-muted",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",ghost:"bg-destructive text-destructive-foreground hover:bg-destructive/30",outline:"border border-border bg-card text-card-foreground hover:bg-muted"},$={lg:"px-6 py-3 text-base",md:"px-4 py-2 text-sm",sm:"px-3 py-1.5 text-sm"};function k(e){const t=x.c(10);let r,s,a,o,n;t[0]!==e?({children:r,className:a,size:o,variant:n,...s}=e,t[0]=e,t[1]=r,t[2]=s,t[3]=a,t[4]=o,t[5]=n):(r=t[1],s=t[2],a=t[3],o=t[4],n=t[5]);const d=a===void 0?"":a,l=o===void 0?"md":o,i=`rounded-3xl font-medium transition-colors ${y[n===void 0?"default":n]} ${$[l]} ${d}`;let c;return t[6]!==r||t[7]!==s||t[8]!==i?(c=g.jsx("button",{className:i,type:"button",...s,children:r}),t[6]=r,t[7]=s,t[8]=i,t[9]=c):c=t[9],c}function L(e){const t=x.c(3),{children:r,maxWidth:s,padding:a}=e,o=s===void 0?"7xl":s,n=a===void 0?"default":a,d=A,l=o==="7xl"?"max-w-7xl":"max-w-3xl",p=d(n,o),i=`mx-auto ${l} ${p}`;let c;return t[0]!==r||t[1]!==i?(c=g.jsx("div",{className:i,children:r}),t[0]=r,t[1]=i,t[2]=c):c=t[2],c}function A(e,t){return e==="page"?"px-4 py-12 sm:px-6 lg:px-8":t==="7xl"?"px-4 py-8 sm:px-6 lg:px-8":"px-4 py-12 sm:px-6 lg:px-8"}export{k as B,L as C,E as c};
