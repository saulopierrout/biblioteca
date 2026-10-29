// Robô pequeno do canto (2D, leve), compartilhado pelas páginas internas.
// A página define window.DICAS_ROBO = ["...", ...] antes de carregar este arquivo.
(() => {
  const PIX = {
    pincel:[".......##","......###",".....###.","....###..","...###...","..##.....",".###.....","###......","##......."],
    play:["..#####..",".#.....#.","#..#....#","#..##...#","#..###..#","#..##...#","#..#....#",".#.....#.","..#####.."]
  };
  const alfa = (t, x, y) => { const s = Math.sin(x*12.9898 + y*78.233)*43758.5453, f = s - Math.floor(s); return .55 + .45*(.5 + .5*Math.sin(t*.0035*(.6 + f) + f*20)); };
  document.body.insertAdjacentHTML("beforeend", `
    <div class="mini" id="mini" role="button" tabindex="0" aria-label="Robô assistente: clique para uma dica"><canvas width="168" height="168"></canvas></div>
    <div class="mini-balao" id="miniBalao" role="status" aria-live="polite"><div class="cab">DICA</div><p></p><button aria-label="Fechar dica">✕</button></div>`);
  const cv = document.querySelector("#mini canvas"), g = cv.getContext("2d"), S = cv.width, balao = document.getElementById("miniBalao");
  let mx = innerWidth, my = innerHeight, icone = null, ate = 0, troca = 0, piscar = 0, n = -1;
  addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });
  setInterval(() => { piscar = 7; }, 3600);
  (function quadro(t){
    if (!document.hidden){
      g.clearRect(0,0,S,S); const c = S/2, R = S*.46;
      const gr = g.createRadialGradient(c - R*.35, c - R*.4, R*.1, c, c, R); gr.addColorStop(0,"#fff"); gr.addColorStop(.7,"#EDEDEB"); gr.addColorStop(1,"#C9C9CC");
      g.fillStyle = gr; g.beginPath(); g.arc(c,c,R,0,7); g.fill();
      g.fillStyle = "#0C0C0F"; g.beginPath(); g.arc(c,c,R*.74,0,7); g.fill();
      g.shadowColor = "rgba(229,25,75,.9)"; g.shadowBlur = 10; g.strokeStyle = "#E5194B"; g.lineWidth = S*.018; g.beginPath(); g.arc(c,c,R*.66,0,7); g.stroke();
      g.strokeStyle = "#FF7A99"; g.lineWidth = S*.022; g.beginPath(); g.arc(c,c,R*.66,t*.002,t*.002 + .7); g.stroke(); g.shadowBlur = 0;
      g.fillStyle = "#101014"; g.beginPath(); g.arc(c,c,R*.58,0,7); g.fill();
      const r = cv.getBoundingClientRect(), ox = Math.max(-1, Math.min(1, (mx - r.left - r.width/2)/400))*S*.05, oy = Math.max(-1, Math.min(1, (my - r.top - r.height/2)/400))*S*.04;
      g.save(); g.beginPath(); g.arc(c,c,R*.56,0,7); g.clip(); g.shadowColor = "rgba(255,255,255,.9)"; g.shadowBlur = 8; g.fillStyle = "#fff";
      if (icone && t < ate){
        const m = PIX[icone], cel = S*.052, f = Math.min(1, (t - troca)/320);
        for (let y=0;y<9;y++) for (let x=0;x<9;x++) if (m[y][x] === "#"){ g.globalAlpha = f*alfa(t,x,y); g.fillRect(c - 4.5*cel + ox*.4 + x*cel, c - 4.5*cel + oy*.4 + y*cel, cel*.8, cel*.8); }
      } else {
        const cel = S*.03, h = piscar > 0 ? 1 : 5;
        [-1,1].forEach(l => { for (let y=0;y<h;y++) for (let x=0;x<3;x++) g.fillRect(c + l*S*.09 - 1.5*cel + x*cel*1.15 + ox, c - S*.07 + (5-h)*cel*.6 + y*cel*1.15 + oy, cel, cel); });
        g.shadowColor = "rgba(229,25,75,.95)"; g.fillStyle = "#FF5A7F";
        [[-2,0],[2,0],[-1,1],[0,1],[1,1]].forEach(([x,y]) => g.fillRect(c + x*cel*1.15 - cel/2 + ox, c + S*.1 + y*cel*1.15 + oy, cel, cel));
      }
      g.restore(); g.globalAlpha = 1; if (piscar > 0) piscar--;
    }
    requestAnimationFrame(quadro);
  })(0);
  const fala = () => { const L = window.DICAS_ROBO || []; if (!L.length) return; n = (n + 1) % L.length; balao.querySelector("p").textContent = L[n]; balao.classList.add("aberto"); };
  const mini = document.getElementById("mini");
  mini.addEventListener("click", fala);
  mini.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " "){ e.preventDefault(); fala(); } });
  balao.querySelector("button").onclick = () => balao.classList.remove("aberto");
  addEventListener("keydown", e => { if (e.key === "Escape") balao.classList.remove("aberto"); });
  window.roboMostra = ic => { icone = ic; troca = performance.now(); ate = troca + 1800; };
})();
