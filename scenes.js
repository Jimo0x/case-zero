// Photos de l'enquête, dessinées procéduralement sur Canvas (aucune image externe).
const Scenes = (() => {
  const W = 960, H = 600;
  function rng(seed) { return () => (seed = (seed * 16807) % 2147483647) / 2147483647; }
  function grain(x, amount, seed) {
    const r = rng(seed), d = x.getImageData(0, 0, W, H);
    for (let i = 0; i < d.data.length; i += 4) { const n = (r() - .5) * amount; d.data[i] += n; d.data[i + 1] += n; d.data[i + 2] += n; }
    x.putImageData(d, 0, 0);
  }
  function stamp(x, txt) {
    x.font = "bold 20px monospace"; x.fillStyle = "rgba(0,0,0,.5)"; x.fillRect(14, 14, x.measureText(txt).width + 20, 32);
    x.fillStyle = "#e9f5e9"; x.fillText(txt, 24, 37);
    x.fillStyle = "rgba(255,255,255,.035)"; for (let y = 0; y < H; y += 3) x.fillRect(0, y, W, 1);
  }
  function parking(x) {
    let g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#0b0e14"); g.addColorStop(.45, "#151a22"); g.addColorStop(1, "#22252a"); x.fillStyle = g; x.fillRect(0, 0, W, H);
    x.fillStyle = "#1c2028"; x.fillRect(260, 120, 640, 210); // bâtiment
    for (let i = 0; i < 9; i++) { x.fillStyle = i === 6 ? "#e8d9a0" : "#283040"; x.fillRect(290 + i * 66, 160, 40, 50); }
    x.fillStyle = "#2c3340"; x.fillRect(560, 230, 70, 100); x.fillStyle = "#c9c19a"; x.font = "bold 13px sans-serif"; x.fillText("LABO", 577, 250);
    const cone = x.createRadialGradient(560, 300, 10, 560, 420, 340); cone.addColorStop(0, "rgba(255,226,150,.38)"); cone.addColorStop(1, "rgba(255,226,150,0)");
    x.fillStyle = cone; x.beginPath(); x.moveTo(540, 60); x.lineTo(300, H); x.lineTo(820, H); x.closePath(); x.fill();
    x.fillStyle = "#30343a"; x.fillRect(548, 40, 6, 300); x.fillStyle = "#fff4cc"; x.fillRect(530, 36, 42, 10);
    x.strokeStyle = "rgba(230,230,200,.25)"; x.lineWidth = 3; for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(80 + i * 160, 600); x.lineTo(240 + i * 120, 360); x.stroke(); }
    // guérite vide
    x.fillStyle = "#2a2f38"; x.fillRect(90, 270, 150, 140); x.fillStyle = "#0c0f14"; x.fillRect(110, 295, 110, 60);
    x.fillStyle = "#3a3f48"; x.fillRect(90, 255, 150, 18); x.fillStyle = "#77808c"; x.font = "11px sans-serif"; x.fillText("SÉCURITÉ", 135, 268);
    x.fillStyle = "#1f2228"; x.fillRect(150, 330, 30, 25); // chaise vide
    // voiture grise
    x.fillStyle = "#6f747b"; x.beginPath(); x.roundRect(400, 380, 300, 110, 22); x.fill();
    x.fillStyle = "#585d64"; x.beginPath(); x.moveTo(450, 382); x.lineTo(490, 320); x.lineTo(620, 320); x.lineTo(660, 382); x.fill();
    x.fillStyle = "#1a2230"; x.beginPath(); x.moveTo(470, 380); x.lineTo(500, 332); x.lineTo(610, 332); x.lineTo(640, 380); x.fill();
    x.fillStyle = "#ff3b30"; x.fillRect(408, 400, 34, 14); x.fillRect(658, 400, 34, 14); x.fillStyle = "rgba(255,59,48,.25)"; x.fillRect(395, 395, 60, 26); x.fillRect(645, 395, 60, 26);
    x.fillStyle = "#e9e9e2"; x.fillRect(495, 425, 110, 28); x.fillStyle = "#1b3d9b"; x.fillRect(495, 425, 12, 28);
    x.fillStyle = "#111"; x.font = "bold 15px monospace"; x.fillText("??-347-HF", 511, 445);
    x.fillStyle = "rgba(220,220,220,.18)"; for (let i = 0; i < 5; i++) { x.beginPath(); x.arc(390 - i * 14, 470 - i * 9, 10 + i * 4, 0, 7); x.fill(); } // gaz d'échappement
    x.fillStyle = "#0e0f12"; x.beginPath(); x.ellipse(460, 492, 32, 14, 0, 0, 7); x.ellipse(640, 492, 32, 14, 0, 0, 7); x.fill();
    grain(x, 34, 7); stamp(x, "CAM 03  PARKING   VEN 14   22:16:43");
  }
  function orion(x) {
    let g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#d8d4cc"); g.addColorStop(1, "#b9b2a6"); x.fillStyle = g; x.fillRect(0, 0, W, H);
    x.fillStyle = "#f4f4f0"; x.fillRect(80, 60, 420, 200); x.strokeStyle = "#999"; x.lineWidth = 6; x.strokeRect(80, 60, 420, 200);
    x.strokeStyle = "#2255aa"; x.lineWidth = 3; x.beginPath(); x.moveTo(120, 200); x.bezierCurveTo(200, 90, 300, 230, 440, 100); x.stroke();
    x.fillStyle = "#c22"; x.font = "bold 22px sans-serif"; x.fillText("HELIOS — Q3", 130, 110); x.fillStyle = "#333"; x.font = "16px sans-serif"; x.fillText("levée : jeudi 17", 130, 140);
    x.fillStyle = "#87a3c4"; x.fillRect(620, 40, 260, 230); x.fillStyle = "#cfe0f2"; x.fillRect(630, 50, 240, 210); x.fillStyle = "#5d7a3e"; x.fillRect(630, 200, 240, 60); // fenêtre
    x.fillStyle = "#5a4330"; x.beginPath(); x.ellipse(480, 470, 400, 120, 0, 0, 7); x.fill();
    x.fillStyle = "#6b5039"; x.beginPath(); x.ellipse(480, 460, 390, 112, 0, 0, 7); x.fill();
    for (const [cx, cy] of [[160, 360], [330, 330], [640, 330], [800, 360]]) { x.fillStyle = "#222"; x.beginPath(); x.roundRect(cx - 45, cy - 90, 90, 80, 14); x.fill(); }
    x.fillStyle = "#2b2b2f"; x.beginPath(); x.roundRect(330, 410, 170, 90, 6); x.fill(); x.fillStyle = "#4b6c9e"; x.fillRect(338, 418, 154, 74); // laptop
    x.fillStyle = "#ececec"; x.fillRect(250, 470, 60, 75); x.fillStyle = "#c0392b"; x.font = "10px sans-serif"; x.fillText("NovaTek", 255, 485); // carnet
    x.fillStyle = "#fff"; x.beginPath(); x.arc(720, 500, 22, 0, 7); x.fill(); x.fillStyle = "#4a2c18"; x.beginPath(); x.arc(720, 500, 16, 0, 7); x.fill(); // café
    // badge de Marc
    x.save(); x.translate(595, 372); x.rotate(-.18); x.fillStyle = "#1c5fd6"; x.beginPath(); x.roundRect(0, 0, 78, 50, 6); x.fill();
    x.fillStyle = "#fff"; x.fillRect(6, 8, 18, 22); x.font = "bold 8px sans-serif"; x.fillText("NOVATEK", 30, 16); x.font = "7px sans-serif"; x.fillText("M. DELORME", 30, 28); x.fillText("CTO · ACCÈS LABO", 30, 40);
    x.strokeStyle = "#ccc"; x.lineWidth = 2; x.beginPath(); x.moveTo(39, 0); x.bezierCurveTo(30, -40, 80, -40, 70, -10); x.stroke(); x.restore();
    grain(x, 14, 3); x.fillStyle = "rgba(0,0,0,.45)"; x.fillRect(W - 150, H - 40, 140, 28); x.fillStyle = "#fff"; x.font = "13px monospace"; x.fillText("14/11  16:20", W - 140, H - 21);
  }
  function concert(x) {
    x.fillStyle = "#07040c"; x.fillRect(0, 0, W, H);
    const cols = ["#e5172f", "#7b2ff7", "#ff8a3d", "#2fd1ff"];
    cols.forEach((c, i) => { const gx = 140 + i * 230; const g = x.createLinearGradient(gx, 0, gx, H); g.addColorStop(0, c + "cc"); g.addColorStop(1, c + "00");
      x.fillStyle = g; x.beginPath(); x.moveTo(gx - 6, 0); x.lineTo(gx - 160 + i * 40, H); x.lineTo(gx + 160 - i * 30, H); x.lineTo(gx + 6, 0); x.fill(); });
    x.fillStyle = "#1a1124"; x.fillRect(120, 300, 720, 30); x.fillStyle = "#000";
    x.beginPath(); x.ellipse(480, 255, 22, 30, 0, 0, 7); x.fill(); x.fillRect(458, 280, 44, 22); x.fillRect(500, 270, 70, 8); // guitariste
    const r = rng(11); for (let i = 0; i < 70; i++) { const px = r() * W, py = 420 + r() * 200, s = 22 + r() * 18; x.fillStyle = "#000"; x.beginPath(); x.arc(px, py, s, 0, 7); x.fill(); x.fillRect(px - s, py, s * 2, 200); }
    for (let i = 0; i < 6; i++) { const px = 120 + r() * 700, py = 360 + r() * 40; x.fillStyle = "#000"; x.fillRect(px, py, 10, 80); x.fillStyle = "#fffbe0"; x.beginPath(); x.arc(px + 5, py - 4, 6, 0, 7); x.fill(); }
    grain(x, 30, 5);
    // interface « story »
    x.fillStyle = "rgba(255,255,255,.85)"; for (let i = 0; i < 3; i++) x.fillRect(16 + i * 312, 12, 300, 3);
    x.fillStyle = "#c084fc"; x.beginPath(); x.arc(40, 46, 16, 0, 7); x.fill(); x.fillStyle = "#fff"; x.font = "bold 15px sans-serif"; x.fillText("sofia.rmd", 64, 44); x.font = "13px sans-serif"; x.fillText("📍 Le Transbordeur · Villeurbanne", 64, 62);
    x.fillStyle = "rgba(0,0,0,.55)"; x.beginPath(); x.roundRect(735, 36, 200, 70, 12); x.fill(); x.fillStyle = "#fff"; x.font = "bold 26px sans-serif"; x.fillText("21:57", 790, 72); x.font = "12px sans-serif"; x.fillText("ven. 14 nov. · 12 km", 770, 94);
    x.font = "bold 30px sans-serif"; x.fillText("2e rang 🎸🔥", 330, 560);
  }
  const draw = { parking, orion, concert };
  return { W, H, render(canvas, scene) { canvas.width = W; canvas.height = H; draw[scene](canvas.getContext("2d")); } };
})();
