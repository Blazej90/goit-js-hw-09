function e(e,t){return new Promise(((o,n)=>{const s=Math.random()>.3;setTimeout((()=>{s?o({position:e,delay:t}):n({position:e,delay:t})}),t)}))}document.addEventListener("DOMContentLoaded",(()=>{const t=document.querySelector(".form");t.addEventListener("submit",(async o=>{o.preventDefault();const n=new FormData(t),s=parseInt(n.get("delay"),10),a=parseInt(n.get("step"),10),i=parseInt(n.get("amount"),10);for(let t=0;t<i;t++){const o=t+1,n=s+t*a;try{const t=await e(o,n);console.log(`✅ Fulfilled promise ${t.position} in ${t.delay}ms`)}catch(e){console.log(`❌ Rejected promise ${e.position} in ${e.delay}ms`)}}}))}));
//# sourceMappingURL=03-promises.7adda986.js.map
