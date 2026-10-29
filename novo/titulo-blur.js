// Identidade do título grande (igual à página inicial): entra do desfoque para o nítido,
// tem um eco desfocado atrás e pontos de desfoque orgânicos nas pontas da palavra.
// Uso: <script src="titulo-blur.js"></script> no fim da página (pega o primeiro <h1>).
(() => {
  const css = `
@property --ax{syntax:"<percentage>";inherits:false;initial-value:42%}
@property --ay{syntax:"<percentage>";inherits:false;initial-value:40%}
@property --bx{syntax:"<percentage>";inherits:false;initial-value:60%}
@property --by{syntax:"<percentage>";inherits:false;initial-value:62%}
.tb-wrap{position:relative;display:inline-block}
.tb-wrap h1{position:relative;animation:tbEntra 1.1s cubic-bezier(.2,.7,.2,1) both}
.tb-wrap h1:before{content:attr(data-eco);position:absolute;left:14px;top:12px;white-space:pre;color:rgba(14,14,16,.22);filter:blur(10px);z-index:-1;pointer-events:none}
@keyframes tbEntra{from{opacity:0;filter:blur(14px);transform:translateY(10px)}to{opacity:1;filter:blur(0);transform:none}}
.tb-lupa{position:absolute;z-index:3;width:76px;height:112px;pointer-events:none;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);
  --m:radial-gradient(closest-side at var(--ax) var(--ay),#000 0%,rgba(0,0,0,.7) 35%,transparent 100%),radial-gradient(closest-side at var(--bx) var(--by),#000 0%,rgba(0,0,0,.55) 30%,transparent 100%);
  -webkit-mask-image:var(--m);mask-image:var(--m)}
.tb-lupa.l1{animation:tbB1 9s ease-in-out infinite alternate,tbAmeba 6s ease-in-out infinite alternate}
.tb-lupa.l2{animation:tbB2 12s ease-in-out infinite alternate,tbAmeba 8s ease-in-out infinite alternate-reverse}
.tb-lupa.l3{width:64px;height:96px;animation:tbB3 10s ease-in-out infinite alternate,tbAmeba 7s ease-in-out infinite alternate}
@keyframes tbB1{0%{left:-34px;top:-6px}50%{left:-26px;top:22px}100%{left:-32px;top:6px}}
@keyframes tbB2{0%{left:var(--fimA);top:-14px}50%{left:calc(var(--fimA) - 10px);top:4px}100%{left:calc(var(--fimA) + 4px);top:-8px}}
@keyframes tbB3{0%{left:var(--fimB);top:var(--topoB)}50%{left:calc(var(--fimB) - 8px);top:calc(var(--topoB) + 14px)}100%{left:calc(var(--fimB) + 4px);top:calc(var(--topoB) + 6px)}}
@keyframes tbAmeba{0%{--ax:38%;--ay:36%;--bx:62%;--by:64%}50%{--ax:55%;--ay:30%;--bx:42%;--by:70%}100%{--ax:46%;--ay:48%;--bx:60%;--by:40%}}
@media (prefers-reduced-motion:reduce){.tb-wrap h1,.tb-lupa{animation:none!important}}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  const h = document.querySelector("h1"); if (!h) return;
  const w = document.createElement("div"); w.className = "tb-wrap"; h.parentNode.insertBefore(w, h); w.appendChild(h);
  h.setAttribute("data-eco", h.innerText);
  w.insertAdjacentHTML("afterbegin", '<div class="tb-lupa l1" aria-hidden="true"></div><div class="tb-lupa l2" aria-hidden="true"></div><div class="tb-lupa l3" aria-hidden="true"></div>');
  // mede onde terminam a 1ª e a última linha para os pontos ficarem nas pontas da palavra
  function medir(){
    const rg = document.createRange(), base = w.getBoundingClientRect();
    rg.selectNodeContents(h); const rects = [...rg.getClientRects()]; if (!rects.length) return;
    const primeira = rects[0], ultima = rects[rects.length - 1];
    w.style.setProperty("--fimA", (primeira.right - base.left - 30) + "px");
    w.style.setProperty("--fimB", (ultima.right - base.left - 24) + "px");
    w.style.setProperty("--topoB", (ultima.top - base.top - 10) + "px");
  }
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(medir); addEventListener("resize", medir);
})();
