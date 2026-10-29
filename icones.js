// Ícones de linha fina, usados em todo o site (os ícones em pixels ficam só na tela do robô).
// Uso: ico("nome", tamanho) devolve um <svg> que herda a cor do texto (currentColor).
window.ICO = {
  // seções da biblioteca
  skills:  "M13 2 4 14h7l-1 8 9-12h-7z",
  sites:   "M3 5h18v14H3zM3 9h18M6 7h.01M9 7h.01",
  cursos:  "m2 9 10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5",
  codigos: "m8 8-5 4 5 4M16 8l5 4-5 4M14 5l-4 14",
  livros:  "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5",
  animacao:"M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zm-2 5.5 5 3.5-5 3.5z",
  protocolos:"M8 3h8v3H8zM6 4.5H5V21h14V4.5h-1M9 13l2 2 4-4",
  // categorias
  video:   "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zm-2 5.5 5 3.5-5 3.5z",
  escudo:  "M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z",
  grafico: "M4 20V11M10 20V5M16 20v-8M21 20H3",
  mega:    "M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1zM15 9a3 3 0 0 1 0 6M18 6a7 7 0 0 1 0 12",
  onda:    "M3 12h1M7 8v8M11 5v14M15 9v6M19 7v10M22 12h-1",
  pincel:  "M18 3 9 12l3 3 9-9zM9 12c-3 0-5 2-5 5 0 1-1 2-2 2 3 2 9 2 10-4",
  controle:"M6 9h12a4 4 0 0 1 4 4v1a3 3 0 0 1-5.5 1.6L15 14H9l-1.5 1.6A3 3 0 0 1 2 14v-1a4 4 0 0 1 4-4zM7 11v3M5.5 12.5h3M16 12h.01M18 13.5h.01",
  engren:  "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM12 2v3M12 19v3M4.9 4.9 7 7M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1",
  presente:"M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zm0 0c2-4 6-4 6-1.5S15 8 12 8z",
  // protocolos
  foguete: "M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 15l-3-3c2-5 6-8.5 13-9 .5 7-4 11-9 13zM14.5 9.5h.01",
  pessoas: "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21v-1a6 6 0 0 1 12 0v1M16 3.5a4 4 0 0 1 0 7M18 21v-1a6 6 0 0 0-3-5.2",
  app:     "M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM11 18h2",
  youtube: "M3 7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zM10 9l5 3-5 3z",
  conversa:"M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z",
  robo:    "M12 2v3M5 8h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2zM9 13h.01M15 13h.01M9 17h6",
  terminal:"M4 4h16v16H4zM8 9l3 3-3 3M13 15h4",
  lupa:    "M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm9 16-3.5-3.5"
};
window.ico = (nome, tam = 20) => `<svg class="ic" width="${tam}" height="${tam}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${(window.ICO[nome] || window.ICO.skills)}"/></svg>`;
