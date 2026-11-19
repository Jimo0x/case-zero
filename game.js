const C = window.CASE, KEY = "casezero:" + C.id;
const ALL_CLUES = {}; // id → indice (avec la source)
C.documents.forEach(d => d.clues.forEach(c => ALL_CLUES[c.id] = { ...c, src: d.title }));
C.chats.forEach(ch => ch.clues.forEach(c => ALL_CLUES[c.id] = { ...c, src: ch.title }));
C.photos.forEach(p => p.hotspots.forEach(h => ALL_CLUES[h.clue.id] = { ...h.clue, src: p.title }));

const fresh = () => ({ found: [], started: Date.now(), wrong: 0, solved: null, board: { pins: {}, links: [] }, seenIntro: false });
let S = load(), section = "dossier", sel = { docs: C.documents[0].id, chats: C.chats[0].id, photos: C.photos[0].id };
function load() { try { return JSON.parse(localStorage.getItem(KEY)) || fresh(); } catch { return fresh(); } }
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { /* stockage indisponible */ } }

function discover(id) {
  if (S.found.includes(id)) return toast("Déjà noté dans le carnet.");
  S.found.push(id); save(); renderNotebook(); toast("🔎 Nouvel indice : " + ALL_CLUES[id].text, 4200);
}
function renderNotebook() {
  const n = S.found.length, tot = Object.keys(ALL_CLUES).length;
  $("#clueCount").textContent = `${n} / ${tot} indices`;
  $("#clues").innerHTML = S.found.slice().reverse().map(id => { const c = ALL_CLUES[id]; return `<div class="clue"><div class="t">${c.time ? c.time + " · " : ""}${esc(c.src)}</div>${esc(c.text)}</div>`; }).join("")
    || `<div class="dim" style="font-size:13px;margin-top:10px">Aucun indice pour l'instant. Examinez les pièces du dossier.</div>`;
}
setInterval(() => { const s = Math.floor(((S.solved ? S.solved.at : Date.now()) - S.started) / 1000); $("#clock").textContent = `⏱ ${String(s / 60 | 0).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`; }, 500);

$$(".navi").forEach(n => n.onclick = () => { section = n.dataset.s; $$(".navi").forEach(x => x.classList.toggle("on", x === n)); render(); });
$("#reset").onclick = () => { if (confirm("Effacer votre progression ?")) { S = fresh(); save(); location.reload(); } };
const suspect = id => C.suspects.find(s => s.id === id);

function render() { ({ dossier, docs, chats, photos, board, timeline, accuse })[section](); }

function dossier() {
  $("#stage").innerHTML = `<div class="kicker">Dossier</div><h1>${esc(C.title)}</h1><p style="max-width:780px;line-height:1.7" class="muted">${esc(C.intro)}</p>
    <h2 style="margin-top:24px">Personnes d'intérêt</h2><div class="grid g2" style="max-width:980px">${C.suspects.map(s => `<div class="card suspect"><div class="face" style="background:${s.color}">${s.name.split(" ").map(w => w[0]).join("")}</div>
      <div><b>${esc(s.name)}</b><div class="red" style="font-size:12px;font-weight:600">${esc(s.role)}</div><div class="muted" style="font-size:13px;margin-top:4px">${esc(s.bio)}</div></div></div>`).join("")}</div>`;
}
function docs() {
  const d = C.documents.find(x => x.id === sel.docs);
  let body = esc(d.body);
  d.clues.forEach(c => { const spot = esc(c.spot); body = body.replace(spot, `<span class="spot ${S.found.includes(c.id) ? "found" : ""}" data-c="${c.id}">${spot}</span>`); });
  $("#stage").innerHTML = `<div class="split"><div class="list">${C.documents.map(x => `<div class="item clickable ${x.id === d.id ? "on" : ""}" data-d="${x.id}">${x.icon} ${esc(x.title)}</div>`).join("")}</div>
    <div><h2>${d.icon} ${esc(d.title)}</h2><div class="dim" style="font-size:12px;margin-bottom:12px">Cliquez sur un passage qui vous semble important.</div><div class="paper" id="paper">${body}</div></div></div>`;
  $$("[data-d]").forEach(e => e.onclick = () => { sel.docs = e.dataset.d; docs(); });
  $("#paper").onclick = e => { const s = e.target.closest(".spot"); if (s) { discover(s.dataset.c); docs(); } else toast("Rien de particulier ici…", 1200); };
}
function chats() {
  const ch = C.chats.find(x => x.id === sel.chats), left = ch.with[0];
  $("#stage").innerHTML = `<div class="split"><div class="list">${C.chats.map(x => `<div class="item clickable ${x.id === ch.id ? "on" : ""}" data-ch="${x.id}">💬 ${esc(x.title)}</div>`).join("")}</div>
    <div><h2>${esc(ch.title)}</h2><div class="dim" style="font-size:12px;margin-bottom:12px">Messagerie saisie sur les téléphones professionnels. Cliquez sur un message pour l'épingler.</div>
    <div class="chatwin">${ch.messages.map(([who, t, txt], i) => { const s = suspect(who), clue = ch.clues.find(c => c.msg === i);
      return `<div class="msg ${who === left ? "l" : "r"} ${clue && S.found.includes(clue.id) ? "found" : ""}" data-i="${i}"><div class="h" style="color:${s ? s.color : "#aaa"}">${s ? esc(s.name.split(" ")[0]) : "Léa"} · ${t}</div>${esc(txt)}</div>`; }).join("")}</div></div></div>`;
  $$("[data-ch]").forEach(e => e.onclick = () => { sel.chats = e.dataset.ch; chats(); });
  $$(".msg").forEach(m => m.onclick = () => { const c = ch.clues.find(c => c.msg === +m.dataset.i); if (c) { discover(c.id); chats(); } else toast("Message sans importance.", 1200); });
}
function photos() {
  const p = C.photos.find(x => x.id === sel.photos);
  $("#stage").innerHTML = `<div class="split"><div class="list">${C.photos.map(x => `<div class="item clickable ${x.id === p.id ? "on" : ""}" data-p="${x.id}">🖼 ${esc(x.title)}</div>`).join("")}</div>
    <div><h2>${esc(p.title)}</h2><div class="dim" style="font-size:12px;margin-bottom:12px">Survolez pour utiliser la loupe ×2,5, cliquez sur un détail pour l'examiner.</div>
    <div class="photo-wrap" id="pw"><canvas id="ph" style="width:min(100%,900px)"></canvas><div class="lens" id="lens"></div></div></div></div>`;
  $$("[data-p]").forEach(e => e.onclick = () => { sel.photos = e.dataset.p; photos(); });
  const cv = $("#ph"); Scenes.render(cv, p.scene); const url = cv.toDataURL(), lens = $("#lens"), Z = 2.5;
  p.hotspots.forEach(h => { if (S.found.includes(h.clue.id)) $("#pw").insertAdjacentHTML("beforeend", `<div class="mark" style="left:${h.x * 100}%;top:${h.y * 100}%"></div>`); });
  $("#pw").onmousemove = e => { const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    lens.style.display = "block"; lens.style.left = x - 85 + "px"; lens.style.top = y - 85 + "px";
    lens.style.backgroundImage = `url(${url})`; lens.style.backgroundSize = `${r.width * Z}px ${r.height * Z}px`; lens.style.backgroundPosition = `${-x * Z + 85}px ${-y * Z + 85}px`; };
  $("#pw").onmouseleave = () => lens.style.display = "none";
  $("#pw").onclick = e => { const r = cv.getBoundingClientRect(), fx = (e.clientX - r.left) / r.width, fy = (e.clientY - r.top) / r.height;
    const h = p.hotspots.find(h => Math.hypot((fx - h.x) * 1.6, fy - h.y) < h.r * 1.6); if (h) { discover(h.clue.id); photos(); } else toast("Vous ne remarquez rien de spécial à cet endroit.", 1200); };
}
function board() {
  $("#stage").innerHTML = `<div class="row between" style="margin-bottom:10px"><div><h2 style="margin:0">Tableau d'enquête</h2><div class="dim" style="font-size:12px">Glissez les fiches. Cliquez sur une fiche puis sur une autre pour les relier d'un fil rouge (re-cliquez un fil pour le retirer).</div></div>
    <button class="btn ghost sm" id="clearLinks">Retirer tous les fils</button></div><div id="board"><svg id="strings"></svg></div>`;
  const B = $("#board"), items = [...C.suspects.map(s => ({ id: "s_" + s.id, text: s.name, sub: s.role, s: true, color: s.color })), ...S.found.map(id => ({ id, text: ALL_CLUES[id].text, sub: ALL_CLUES[id].time || "" }))];
  let picked = null;
  items.forEach((it, i) => {
    const p = S.board.pins[it.id] || (S.board.pins[it.id] = it.s ? { x: 40 + i * 230, y: 30 } : { x: 30 + (i - 4) % 4 * 225, y: 170 + Math.floor((i - 4) / 4) * 140 });
    const el = document.createElement("div"); el.className = "pin" + (it.s ? " s" : ""); el.dataset.id = it.id; el.style.left = p.x + "px"; el.style.top = p.y + "px";
    el.innerHTML = `${it.s ? `<div style="height:6px;background:${it.color};margin:-12px -12px 8px;border-radius:3px 3px 0 0"></div>` : ""}${esc(it.text)}${it.sub ? `<div style="color:#8a7a66;font-weight:400;font-size:11px;margin-top:4px">${esc(it.sub)}</div>` : ""}`;
    B.appendChild(el);
    el.onmousedown = e => { const ox = e.clientX - p.x, oy = e.clientY - p.y; let moved = false;
      const mv = ev => { moved = true; p.x = ev.clientX - ox; p.y = ev.clientY - oy; el.style.left = p.x + "px"; el.style.top = p.y + "px"; strings(); };
      const up = () => { removeEventListener("mousemove", mv); removeEventListener("mouseup", up); save();
        if (!moved) { if (picked && picked !== it.id) { S.board.links.push([picked, it.id]); save(); $$(".pin").forEach(x => x.classList.remove("sel")); picked = null; strings(); }
          else { picked = picked === it.id ? null : it.id; $$(".pin").forEach(x => x.classList.toggle("sel", x.dataset.id === picked)); } } };
      addEventListener("mousemove", mv); addEventListener("mouseup", up); };
  });
  function strings() {
    $("#strings").innerHTML = S.board.links.map(([a, b], i) => { const A = S.board.pins[a], Bp = S.board.pins[b]; if (!A || !Bp) return "";
      const x1 = A.x + 90, y1 = A.y, x2 = Bp.x + 90, y2 = Bp.y, my = Math.max(y1, y2) + 40;
      return `<path d="M${x1} ${y1} Q ${(x1 + x2) / 2} ${my} ${x2} ${y2}" stroke="#d01b2f" stroke-width="2.5" fill="none" style="pointer-events:stroke;cursor:pointer" data-l="${i}"/>`; }).join("");
    $$("#strings path").forEach(p => p.onclick = () => { S.board.links.splice(+p.dataset.l, 1); save(); strings(); });
  }
  strings(); $("#clearLinks").onclick = () => { S.board.links = []; save(); strings(); };
}
function timeline() {
  const ev = S.found.map(id => ALL_CLUES[id]).filter(c => c.time).sort((a, b) => a.time.localeCompare(b.time));
  $("#stage").innerHTML = `<h2>Chronologie de vendredi</h2><div class="dim" style="font-size:12px;margin-bottom:20px">Reconstituée automatiquement à partir des indices horodatés. Repérez les incohérences.</div>
    <div class="tl">${ev.map(c => `<div class="ev"><span class="tm">${c.time}</span>${esc(c.text)}<div class="dim" style="font-size:11px;margin-top:3px">${esc(c.src)}</div></div>`).join("") || `<div class="empty">Aucun événement daté pour l'instant.</div>`}</div>`;
}
function accuse() {
  const sol = C.solution, pick = { culprit: null, method: null, proof: [] };
  if (S.solved) return result();
  $("#stage").innerHTML = `<h2>Formuler l'accusation</h2><div class="dim" style="font-size:12px;margin-bottom:16px">Une erreur coûte des points. ${S.wrong ? `<span class="red">${S.wrong} accusation(s) erronée(s).</span>` : ""}</div>
    <div class="grid g3" style="align-items:start"><div><div class="kicker">1 · Coupable</div>${C.suspects.map(s => `<div class="choice" data-k="culprit" data-v="${s.id}"><b>${esc(s.name)}</b><div class="dim" style="font-size:12px">${esc(s.role)}</div></div>`).join("")}</div>
    <div><div class="kicker">2 · Méthode</div>${sol.methods.map(m => `<div class="choice" data-k="method" data-v="${m.id}">${esc(m.text)}</div>`).join("")}</div>
    <div><div class="kicker">3 · Deux preuves décisives</div>${S.found.map(id => `<div class="choice" data-k="proof" data-v="${id}" style="font-size:12.5px">${esc(ALL_CLUES[id].text)}</div>`).join("") || `<div class="dim">Trouvez d'abord des indices.</div>`}</div></div>
    <button class="btn" id="go" style="margin-top:16px">⚖ Accuser</button>`;
  $$(".choice").forEach(c => c.onclick = () => {
    const k = c.dataset.k, v = c.dataset.v;
    if (k === "proof") { pick.proof = pick.proof.includes(v) ? pick.proof.filter(x => x !== v) : pick.proof.concat(v).slice(-2); }
    else pick[k] = v;
    $$(".choice").forEach(x => x.classList.toggle("on", x.dataset.k === "proof" ? pick.proof.includes(x.dataset.v) : pick[x.dataset.k] === x.dataset.v));
  });
  $("#go").onclick = () => {
    if (!pick.culprit || !pick.method || pick.proof.length < 2) return toast("Choisissez un coupable, une méthode et deux preuves.");
    const okC = pick.culprit === sol.culprit, okM = pick.method === sol.method, okP = pick.proof.every(p => sol.proof.includes(p));
    if (okC && okM && okP) { S.solved = { at: Date.now() }; save(); return result(); }
    S.wrong++; save();
    toast(!okC ? "Le suspect a un alibi solide… Reprenez la chronologie." : !okM ? "Bon suspect, mais ce n'est pas comme ça qu'il est entré." : "Le coupable est le bon, mais vos preuves ne tiendraient pas devant un juge.", 5000);
    accuse();
  };
}
function result() {
  const secs = Math.floor((S.solved.at - S.started) / 1000), tot = Object.keys(ALL_CLUES).length;
  const score = Math.max(100, 1000 - S.wrong * 150 - Math.max(0, secs - 300) + S.found.length * 20);
  $("#stage").innerHTML = `<div style="max-width:780px"><div class="kicker">Affaire résolue</div><div class="verdict">${esc(suspect(C.solution.culprit).name)} est coupable.</div>
    <div class="grid g3" style="margin:20px 0"><div class="stat"><div class="l">Score</div><div class="v red">${score}</div></div><div class="stat"><div class="l">Temps</div><div class="v">${Math.floor(secs / 60)} min ${secs % 60} s</div></div>
    <div class="stat"><div class="l">Indices</div><div class="v">${S.found.length}/${tot}</div></div></div>
    <div class="card"><h3>Ce qui s'est passé</h3><p style="line-height:1.8">${esc(C.solution.explanation)}</p></div></div>`;
}

$("#caseTitle").textContent = C.title; $("#introTitle").textContent = C.title; $("#introText").textContent = C.intro;
if (!S.seenIntro) { modal("introModal"); S.seenIntro = true; save(); }
renderNotebook(); render();
