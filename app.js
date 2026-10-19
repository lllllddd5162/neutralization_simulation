/* 중화 반응 연구소 — 시뮬레이션 엔진 */
"use strict";

/* ---------------- 물질 · 이온 ---------------- */
const SOL = {
  HCl:{t:"a",v:1,ion:"Cl",n:"HCl"}, HNO3:{t:"a",v:1,ion:"NO3",n:"HNO<sub>3</sub>"}, HBr:{t:"a",v:1,ion:"Br",n:"HBr"},
  HA:{t:"a",v:1,ion:"A",n:"HA"}, HB:{t:"a",v:1,ion:"Bm",n:"HB"}, HX:{t:"a",v:1,ion:"Xm",n:"HX"},
  H2SO4:{t:"a",v:2,ion:"SO4",n:"H<sub>2</sub>SO<sub>4</sub>"}, H2A:{t:"a",v:2,ion:"A2",n:"H<sub>2</sub>A"}, H2X:{t:"a",v:2,ion:"X2",n:"H<sub>2</sub>X"},
  NaOH:{t:"b",v:1,ion:"Na",n:"NaOH"}, KOH:{t:"b",v:1,ion:"K",n:"KOH"}, BOH:{t:"b",v:1,ion:"B",n:"BOH"}, XOH:{t:"b",v:1,ion:"Xp",n:"XOH"},
  CaOH2:{t:"b",v:2,ion:"Ca",n:"Ca(OH)<sub>2</sub>"}, BaOH2:{t:"b",v:2,ion:"Ba",n:"Ba(OH)<sub>2</sub>"},
  XOH2:{t:"b",v:2,ion:"Xc",n:"X(OH)<sub>2</sub>"}, YOH2:{t:"b",v:2,ion:"Yc",n:"Y(OH)<sub>2</sub>"}
};
const ION = {
  H:{l:"H⁺",q:1,c:"#ef6f4f"}, OH:{l:"OH⁻",q:-1,c:"#4f8be0"},
  Cl:{l:"Cl⁻",q:-1,c:"#3fae8f"}, NO3:{l:"NO₃⁻",q:-1,c:"#58b38a"}, Br:{l:"Br⁻",q:-1,c:"#8b6bd1"},
  A:{l:"A⁻",q:-1,c:"#5d7fb3"}, Bm:{l:"B⁻",q:-1,c:"#7d8fb0"}, Xm:{l:"X⁻",q:-1,c:"#6b9a9e"},
  SO4:{l:"SO₄²⁻",q:-2,c:"#3d6fa3"}, A2:{l:"A²⁻",q:-2,c:"#3d5e9e"}, X2:{l:"X²⁻",q:-2,c:"#44708a"},
  Na:{l:"Na⁺",q:1,c:"#f2c14e"}, K:{l:"K⁺",q:1,c:"#c58be0"}, B:{l:"B⁺",q:1,c:"#f0a35e"}, Xp:{l:"X⁺",q:1,c:"#e6a0b8"},
  Ca:{l:"Ca²⁺",q:2,c:"#e08f3c"}, Ba:{l:"Ba²⁺",q:2,c:"#d9893f"}, Xc:{l:"X²⁺",q:2,c:"#d98c6a"}, Yc:{l:"Y²⁺",q:2,c:"#c98a58"},
  W:{l:"H₂O",q:0,c:"#dbe6f1"}
};
const EPS = 1e-9;
const $ = (s, r = document) => r.querySelector(s);
const h = (tag, attrs = {}, html = "") => { const e = document.createElement(tag); for (const k in attrs) { if (k === "class") e.className = attrs[k]; else if (k.startsWith("on")) e.addEventListener(k.slice(2), attrs[k]); else e.setAttribute(k, attrs[k]); } if (html) e.innerHTML = html; return e; };

/* ---------------- 숫자 표기 ---------------- */
function frac(x) {
  if (Math.abs(x - Math.round(x)) < 1e-6) return String(Math.round(x));
  for (let d = 2; d <= 12; d++) { const n = x * d; if (Math.abs(n - Math.round(n)) < 1e-6) return `${Math.round(n)}/${d}`; }
  return (Math.round(x * 100) / 100).toString();
}
function fmt(x, unit) {
  if (Math.abs(x) < EPS) return "0";
  const s = frac(x);
  if (!unit) return s;
  if (s === "1") return unit;
  return s.includes("/") ? `${s}${unit}` : `${s}${unit}`;
}
function scaleFor(vals, cap = 45) {
  let f = 1;
  for (let k = 1; k <= 24; k++) if (vals.every(v => Math.abs(v * k - Math.round(v * k)) < 1e-6)) { f = k; break; }
  const tot = vals.reduce((a, v) => a + v, 0) * f;
  if (tot <= cap) return f;
  for (const d of [2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24, 30, 40, 50, 60, 100, 120]) {
    if (tot / d <= cap && vals.every(v => Math.abs(v * f / d - Math.round(v * f / d)) < 1e-6)) return f / d;
  }
  return f;
}

/* ---------------- 혼합 계산 ---------------- */
function mix(parts) {
  let H = 0, OH = 0, vol = 0; const spec = {}; const order = [];
  let acidN = 0, baseN = 0;
  for (const p of parts) {
    const d = SOL[p.s]; vol += p.vol || 0;
    if (!(d.ion in spec)) { spec[d.ion] = 0; order.push(d.ion); }
    spec[d.ion] += p.n;
    if (d.t === "a") { H += p.n * d.v; acidN += p.n; } else { OH += p.n * d.v; baseN += p.n; }
  }
  const r = Math.min(H, OH);
  const before = { H, OH, ...spec }, after = { H: H - r, OH: OH - r, ...spec };
  const liq = H - OH > EPS ? "산성" : OH - H > EPS ? "염기성" : "중성";
  const sum = (o, f) => Object.keys(o).reduce((a, k) => a + (f(k) ? o[k] : 0), 0);
  const total = o => sum(o, () => true), cat = o => sum(o, k => ION[k].q > 0), an = o => sum(o, k => ION[k].q < 0);
  return { parts, H, OH, water: r, vol, spec, order, before, after, liq, acidN, baseN,
    totalBefore: total(before), totalAfter: total(after), catAfter: cat(after), anAfter: an(after),
    kinds: Object.keys(after).filter(k => after[k] > EPS).length, nSol: parts.length };
}
const liqBadge = l => `<span class="badge ${l === "산성" ? "b-acid" : l === "염기성" ? "b-base" : "b-neu"}">${l}</span>`;
const BTB = { "산성": "#f6e27a", "중성": "#9fd89a", "염기성": "#86b2ea" };
const partText = parts => parts.map(p => `${SOL[p.s].n} ${p.vol != null ? p.vol + " mL" : ""}`.trim()).join(" + ");

/* ---------------- 캔버스 공통 ---------------- */
function mkCanvas(parent, w, hgt) {
  const c = h("canvas"); parent.appendChild(c);
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  c.width = w * dpr; c.height = hgt * dpr; c.style.aspectRatio = `${w}/${hgt}`;
  const ctx = c.getContext("2d"); ctx.scale(dpr, dpr); ctx.W = w; ctx.H = hgt;
  return ctx;
}
function rng(seed) { let s = seed >>> 0 || 1; return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296; }

function drawShape(ctx, kind, x, y, r) {
  ctx.lineWidth = 1.4; ctx.strokeStyle = "#222";
  const fill = kind.startsWith("f") ? (kind === "fcirc" ? "#777" : "#222") : "#fff";
  ctx.fillStyle = fill; ctx.beginPath();
  const k = kind.replace(/^f/, "");
  if (k === "circ") ctx.arc(x, y, r * .8, 0, Math.PI * 2);
  else if (k === "sq") ctx.rect(x - r * .72, y - r * .72, r * 1.44, r * 1.44);
  else if (k === "tri") { ctx.moveTo(x, y - r * .9); ctx.lineTo(x + r * .85, y + r * .65); ctx.lineTo(x - r * .85, y + r * .65); ctx.closePath(); }
  else if (k === "star") { for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .42 : r * .95; ctx.lineTo(x + rr * Math.cos(a), y + rr * Math.sin(a)); } ctx.closePath(); }
  else if (k === "diam") { ctx.moveTo(x, y - r); ctx.lineTo(x + r * .8, y); ctx.lineTo(x, y + r); ctx.lineTo(x - r * .8, y); ctx.closePath(); }
  ctx.fill(); ctx.stroke();
}
function drawIon(ctx, ion, x, y, r, sym) {
  if (ion === "W") {
    ctx.fillStyle = "rgba(160,185,210,.55)"; ctx.beginPath(); ctx.arc(x, y, r * .55, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#56708c"; ctx.font = `${Math.max(7, r * .55)}px Noto Sans KR, sans-serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("H₂O", x, y + .5);
    return;
  }
  if (sym && sym[ion]) { drawShape(ctx, sym[ion], x, y, r); return; }
  const d = ION[ion]; const big = Math.abs(d.q) === 2 ? 1.18 : 1;
  ctx.fillStyle = d.c; ctx.strokeStyle = "rgba(0,0,0,.35)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(x, y, r * big, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = "#1d2530"; ctx.font = `700 ${Math.max(8, r * .78)}px Noto Sans KR, sans-serif`;
  ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(d.l, x, y + .5);
}
function drawBeaker(ctx, x, y, w, hh, liquid, label) {
  const lt = y + hh * .2;
  ctx.fillStyle = liquid || "#e6f0f8"; ctx.fillRect(x, lt, w, y + hh - lt);
  ctx.strokeStyle = "#1d2530"; ctx.lineWidth = 2; ctx.lineJoin = "round";
  ctx.beginPath(); ctx.moveTo(x - 6, y - 4); ctx.lineTo(x, y); ctx.lineTo(x, y + hh); ctx.lineTo(x + w, y + hh); ctx.lineTo(x + w, y); ctx.lineTo(x + w + 6, y - 4); ctx.stroke();
  if (label) { ctx.fillStyle = "#5d6878"; ctx.font = "12px Noto Sans KR, sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "alphabetic"; ctx.fillText(label, x + w / 2, lt + 15); }
  return { x, y: lt, w, h: y + hh - lt };
}
function layoutCells(n, box, seed, top = 0) {
  const ratio = box.w / Math.max(1, box.h - top);
  let cols = Math.max(1, Math.ceil(Math.sqrt(n * ratio))), rows = Math.ceil(n / cols);
  while (rows * cols < n) rows++;
  const cw = box.w / cols, ch = (box.h - top) / rows;
  const r = rng(seed), cells = [];
  for (let i = 0; i < rows * cols; i++) cells.push(i);
  for (let i = cells.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [cells[i], cells[j]] = [cells[j], cells[i]]; }
  return { pos: cells.slice(0, n).map(c => ({ x: box.x + (c % cols + .5) * cw + (r() - .5) * cw * .25, y: box.y + top + (Math.floor(c / cols) + .5) * ch + (r() - .5) * ch * .25 })), rad: Math.max(6, Math.min(16, Math.min(cw, ch) * .36)) };
}
const isShown = (ion, filter) => filter === "all" || (filter === "cation" ? ION[ion].q > 0 : ION[ion].q < 0);

/* ---------------- 혼합 용액 카드 ---------------- */
class MixView {
  constructor(el, o) {
    this.el = el; this.o = Object.assign({ unit: "", filter: "all", btb: false, sym: null, showTable: true, perVol: false, water: true }, o);
    this.state = "before"; this.useSym = !!o.sym; this.filter = this.o.filter; this.btb = this.o.btb;
    this.build();
  }
  build() {
    const o = this.o; this.el.innerHTML = "";
    const bar = h("div", { class: "ctrls" });
    this.bStart = h("button", { class: "btn red", onclick: () => this.run() }, "▶ 반응 시작");
    this.bReset = h("button", { class: "btn ghost", onclick: () => { this.state = "before"; this.draw(); } }, "↺ 반응 전");
    bar.append(this.bStart, this.bReset);
    const tb = h("label", { class: "toggle" }, `<input type="checkbox" ${this.btb ? "checked" : ""}> BTB 용액 넣기`);
    tb.querySelector("input").onchange = e => { this.btb = e.target.checked; this.draw(); }; bar.append(tb);
    if (o.sym) { const ts = h("label", { class: "toggle" }, `<input type="checkbox" checked> 기호 모형으로 보기`); ts.querySelector("input").onchange = e => { this.useSym = e.target.checked; this.draw(); }; bar.append(ts); }
    const seg = h("div", { class: "seg" });
    [["all", "모든 이온"], ["cation", "양이온만"], ["anion", "음이온만"]].forEach(([k, t]) => { const b = h("button", { class: this.filter === k ? "on" : "", onclick: () => { this.filter = k; [...seg.children].forEach(x => x.classList.toggle("on", x === b)); this.draw(); } }, t); seg.append(b); });
    bar.append(seg); this.el.append(bar);
    this.grid = h("div", { class: "mixes" }); this.el.append(this.grid);
    this.cards = o.mixes.map((m, i) => {
      const card = h("div", { class: "mix" });
      const res = mix(m.parts);
      card.innerHTML = `<div class="mh"><span class="ml">${m.label || ""}</span><span class="mc">${m.desc || partText(m.parts)}</span></div>`;
      const ctx = mkCanvas(card, 300, 205);
      const info = h("div"); card.append(info);
      this.grid.append(card);
      return { m, res, ctx, info, seed: 7 + i * 31 };
    });
    this.legend = h("div", { class: "legend" }); this.el.append(this.legend);
    this.note = h("div", { class: "note" }); this.el.append(this.note);
    this.draw();
  }
  particlesFor(c, state) {
    const counts = state === "after" ? c.res.after : c.res.before;
    const f = scaleFor(Object.values(c.res.before));
    const list = [];
    for (const k of Object.keys(counts)) { const n = Math.round(counts[k] * f); for (let i = 0; i < n; i++) list.push(k); }
    if (state === "after" && this.o.water) for (let i = 0; i < Math.round(c.res.water * f); i++) list.push("W");
    return { list, f };
  }
  draw(anim) {
    const symNow = this.useSym ? this.o.sym : null;
    let maxF = 1; const legendIons = new Set();
    this.cards.forEach(c => {
      const ctx = c.ctx; ctx.clearRect(0, 0, ctx.W, ctx.H);
      const liqNow = this.state === "after" ? c.res.liq : null;
      const col = this.btb ? (this.state === "after" ? BTB[c.res.liq] : "#e9f0e6") : "#e6f0f8";
      const box = drawBeaker(ctx, 24, 14, ctx.W - 48, ctx.H - 26, col);
      const { list: all, f } = this.particlesFor(c, this.state === "after" ? "after" : "before"); maxF = Math.max(maxF, f);
      const shown = all.filter(k => k === "W" ? this.filter === "all" : isShown(k, this.filter));
      if (shown.length > 90) { ctx.fillStyle = "#5d6878"; ctx.font = "13px Noto Sans KR, sans-serif"; ctx.textAlign = "center"; ctx.fillText("입자가 많아 모형을 생략했어요", ctx.W / 2, box.y + box.h / 2); }
      else {
        const L = layoutCells(shown.length, { x: box.x + 6, y: box.y + 6, w: box.w - 12, h: box.h - 12 }, c.seed);
        shown.forEach((k, i) => { if (k !== "W") legendIons.add(k); drawIon(ctx, k, L.pos[i].x, L.pos[i].y, L.rad, symNow); });
        c.layout = { L, shown };
      }
      c.info.innerHTML = this.o.showTable ? this.table(c.res) : (liqNow ? `<div class="note">액성 ${liqBadge(liqNow)}</div>` : "");
    });
    this.legend.innerHTML = symNow ? "" : [...legendIons].map(k => `<span><i style="background:${ION[k].c}"></i>${ION[k].l}</span>`).join("");
    this.note.innerHTML = (Math.abs(maxF - 1) > EPS ? `입자 1개 = ${frac(1 / maxF)}${this.o.unit || "개"}로 나타냈어요. ` : "") +
      (this.state === "before" ? "지금은 <b>반응 전</b>(이온화만 된 상태)이에요. ▶ 반응 시작을 눌러 보세요." : "<b>반응 후</b> 모습이에요. H⁺과 OH⁻이 1 : 1로 만나 물(H₂O)이 되었어요.") +
      (symNow ? " 기호 모형을 끄면 이온 이름이 보여요." : "");
  }
  table(r) {
    const u = this.o.unit, keys = ["H", "OH", ...r.order.filter(k => k !== "H" && k !== "OH")];
    const rows = keys.map(k => {
      const b = r.before[k], a = r.after[k];
      return `<tr><td>${ION[k].l}${k === "H" || k === "OH" ? " <span style='color:#b23a3a'>알짜</span>" : " <span style='color:#8a94a3'>구경꾼</span>"}</td><td>${fmt(b, u)}</td><td>${Math.abs(a - b) < EPS ? "0" : "−" + fmt(b - a, u)}</td><td>${this.state === "after" ? fmt(a, u) : "?"}</td></tr>`;
    }).join("");
    const done = this.state === "after";
    const pv = this.o.perVol && r.vol ? `<tr class="sum"><td>단위 부피당 전체 이온</td><td colspan="3">${done ? fmt(r.totalAfter / r.vol, u) + " / mL" : "?"}</td></tr>` : "";
    return `<table class="t"><tr><th>이온</th><th>반응 전</th><th>변화량</th><th>반응 후</th></tr>${rows}
      <tr class="sum"><td>생성된 물</td><td colspan="3">${done ? fmt(r.water, u) : "?"}</td></tr>
      <tr class="sum"><td>전체 이온 수</td><td colspan="3">${done ? fmt(r.totalAfter, u) + ` (양 ${fmt(r.catAfter, u)} · 음 ${fmt(r.anAfter, u)})` : "?"}</td></tr>${pv}
      <tr class="sum"><td>액성</td><td colspan="3">${done ? liqBadge(r.liq) : "?"}</td></tr></table>`;
  }
  run() {
    if (this.busy) return; this.state = "before"; this.draw(); this.busy = true; this.bStart.disabled = true;
    const symNow = this.useSym ? this.o.sym : null;
    const plan = this.cards.map(c => {
      if (!c.layout) return null;
      const { L, shown } = c.layout;
      const Hs = shown.map((k, i) => k === "H" ? i : -1).filter(i => i >= 0), Os = shown.map((k, i) => k === "OH" ? i : -1).filter(i => i >= 0);
      const f = scaleFor(Object.values(c.res.before));
      const nr = Math.round(c.res.water * f);
      const pairs = []; for (let i = 0; i < Math.min(nr, Hs.length, Os.length); i++) pairs.push([Hs[i], Os[i]]);
      return { c, L, shown, pairs };
    });
    const t0 = performance.now(), D = 1100;
    const step = now => {
      const t = Math.min(1, (now - t0) / D), e = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      plan.forEach(p => {
        if (!p) return; const ctx = p.c.ctx; ctx.clearRect(0, 0, ctx.W, ctx.H);
        const col = this.btb ? "#e9f0e6" : "#e6f0f8";
        drawBeaker(ctx, 24, 14, ctx.W - 48, ctx.H - 26, col);
        const moving = new Set(p.pairs.flat());
        p.shown.forEach((k, i) => { if (!moving.has(i)) drawIon(ctx, k, p.L.pos[i].x, p.L.pos[i].y, p.L.rad, symNow); });
        p.pairs.forEach(([a, b]) => {
          const A = p.L.pos[a], B = p.L.pos[b], mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
          if (t < .85) {
            drawIon(ctx, "H", A.x + (mx - A.x) * e, A.y + (my - A.y) * e, p.L.rad, symNow);
            drawIon(ctx, "OH", B.x + (mx - B.x) * e, B.y + (my - B.y) * e, p.L.rad, symNow);
          } else drawIon(ctx, "W", mx, my, p.L.rad * 1.2);
        });
      });
      if (t < 1) requestAnimationFrame(step);
      else { this.state = "after"; this.busy = false; this.bStart.disabled = false; this.draw(); }
    };
    requestAnimationFrame(step);
  }
}

/* ---------------- 적정(첨가) 단계 보기 ---------------- */
class TitView {
  constructor(el, o) {
    this.el = el; this.o = Object.assign({ unit: "", filter: "all", sym: null, labels: ["(가)", "(나)", "(다)", "(라)", "(마)"] }, o);
    this.useSym = !!o.sym; this.filter = this.o.filter; this.steps = (o.steps || []).slice(); this.build();
  }
  states() {
    const o = this.o, out = [{ parts: [{ s: o.init.s, vol: o.init.vol, n: o.init.n }], added: 0 }];
    let tot = 0;
    this.steps.forEach(v => { tot += v; out.push({ parts: [{ s: o.init.s, vol: o.init.vol, n: o.init.n }, { s: o.add.s, vol: tot, n: o.add.conc * tot }], added: v, tot }); });
    return out;
  }
  build() {
    const o = this.o; this.el.innerHTML = "";
    const bar = h("div", { class: "ctrls" });
    if (o.editable) {
      const b = h("button", { class: "btn", onclick: () => { if (this.steps.length < 4) { this.steps.push(o.stepVol || 10); this.render(); } } }, `+ ${SOL[o.add.s].n} ${o.stepVol || 10} mL 넣기`);
      const r = h("button", { class: "btn ghost", onclick: () => { this.steps = []; this.render(); } }, "↺ 처음으로");
      bar.append(b, r);
    }
    if (o.sym) { const ts = h("label", { class: "toggle" }, `<input type="checkbox" ${this.useSym ? "checked" : ""}> 기호 모형으로 보기`); ts.querySelector("input").onchange = e => { this.useSym = e.target.checked; this.render(); }; bar.append(ts); }
    const seg = h("div", { class: "seg" });
    [["all", "모든 이온"], ["cation", "양이온만"], ["anion", "음이온만"]].forEach(([k, t]) => { const b = h("button", { class: this.filter === k ? "on" : "", onclick: () => { this.filter = k; [...seg.children].forEach(x => x.classList.toggle("on", x === b)); this.render(); } }, t); seg.append(b); });
    bar.append(seg); this.el.append(bar);
    this.row = h("div", { class: "mixes" }); this.el.append(this.row);
    this.tbl = h("div"); this.el.append(this.tbl);
    this.legend = h("div", { class: "legend" }); this.el.append(this.legend);
    this.note = h("div", { class: "note" }); this.el.append(this.note);
    this.render();
  }
  render() {
    const o = this.o, sts = this.states(), symNow = this.useSym ? o.sym : null; this.row.innerHTML = "";
    const res = sts.map(s => mix(s.parts));
    const f = scaleFor([Math.max(...res.map(r => r.totalBefore))].concat(res.flatMap(r => Object.values(r.before))), 45);
    const seen = new Set();
    sts.forEach((s, i) => {
      const r = res[i], card = h("div", { class: "mix" });
      const desc = i === 0 ? `${SOL[o.init.s].n} ${o.init.vol} mL` : `${SOL[o.add.s].n} ${s.added} mL 더 넣음 (누적 ${s.tot} mL)`;
      card.innerHTML = `<div class="mh"><span class="ml">${o.labels[i] || ""}</span><span class="mc">${desc}</span></div>`;
      const ctx = mkCanvas(card, 300, 190);
      const box = drawBeaker(ctx, 24, 12, ctx.W - 48, ctx.H - 22, "#e6f0f8");
      const list = [];
      for (const k of Object.keys(r.after)) { if (!isShown(k, this.filter)) continue; const n = Math.round(r.after[k] * f); for (let j = 0; j < n; j++) list.push(k); }
      if (list.length <= 90) { const L = layoutCells(list.length, { x: box.x + 6, y: box.y + 6, w: box.w - 12, h: box.h - 12 }, 11 + i * 17); list.forEach((k, j) => { seen.add(k); drawIon(ctx, k, L.pos[j].x, L.pos[j].y, L.rad, symNow); }); }
      card.append(h("div", { class: "note" }, `액성 ${liqBadge(r.liq)}`));
      this.row.append(card);
    });
    const ions = [...new Set(res.flatMap(r => Object.keys(r.after)))];
    const u = o.unit;
    this.tbl.innerHTML = `<table class="t"><tr><th>이온</th>${sts.map((s, i) => `<th>${o.labels[i] || ""}</th>`).join("")}</tr>` +
      ions.filter(k => isShown(k, this.filter) && res.some(r => (r.after[k] || 0) > EPS)).map(k => `<tr><td>${symNow && symNow[k] ? symLabel(symNow[k]) : ION[k].l}</td>${res.map(r => `<td>${fmt(r.after[k] || 0, u)}</td>`).join("")}</tr>`).join("") +
      `<tr class="sum"><td>생성된 물</td>${res.map(r => `<td>${fmt(r.water, u)}</td>`).join("")}</tr></table>`;
    this.legend.innerHTML = symNow ? "" : [...seen].map(k => `<span><i style="background:${ION[k].c}"></i>${ION[k].l}</span>`).join("");
    this.note.innerHTML = (Math.abs(f - 1) > EPS ? `입자 1개 = ${frac(1 / f)}${u || "개"}로 나타냈어요. ` : "") + "줄어드는 이온은 알짜 이온(H⁺ 또는 OH⁻), 그대로인 이온은 처음 용액의 구경꾼 이온, 새로 늘어나는 이온은 넣어 준 용액의 구경꾼 이온이에요.";
  }
}
const symLabel = k => ({ tri: "△", ftri: "▲", sq: "□", fsq: "■", circ: "○", fcirc: "●", star: "☆", diam: "◇" }[k] || k);

/* ---------------- 그래프 ---------------- */
class Plot {
  constructor(parent, w = 560, hh = 300) { this.ctx = mkCanvas(parent, w, hh); this.pad = { l: 52, r: 16, t: 16, b: 42 }; }
  frame(xmin, xmax, ymin, ymax, xl, yl, xt) {
    const c = this.ctx, p = this.pad; c.clearRect(0, 0, c.W, c.H);
    this.X = x => p.l + (x - xmin) / (xmax - xmin) * (c.W - p.l - p.r);
    this.Y = y => c.H - p.b - (y - ymin) / (ymax - ymin) * (c.H - p.t - p.b);
    c.strokeStyle = "#1d2530"; c.lineWidth = 1.2; c.beginPath(); c.moveTo(p.l, p.t); c.lineTo(p.l, c.H - p.b); c.lineTo(c.W - p.r, c.H - p.b); c.stroke();
    c.fillStyle = "#5d6878"; c.font = "12px Noto Sans KR, sans-serif"; c.textAlign = "center"; c.fillText(xl, (p.l + c.W - p.r) / 2, c.H - 8);
    c.save(); c.translate(14, (p.t + c.H - p.b) / 2); c.rotate(-Math.PI / 2); c.fillText(yl, 0, 0); c.restore();
    (xt || []).forEach(v => { c.fillStyle = "#5d6878"; c.fillText(frac(v), this.X(v), c.H - p.b + 15); c.strokeStyle = "#e3e8ee"; c.beginPath(); c.moveTo(this.X(v), p.t); c.lineTo(this.X(v), c.H - p.b); c.stroke(); });
  }
  line(pts, color, dash, w = 2) { const c = this.ctx; c.save(); c.strokeStyle = color; c.lineWidth = w; c.setLineDash(dash || []); c.beginPath(); pts.forEach((q, i) => i ? c.lineTo(this.X(q[0]), this.Y(q[1])) : c.moveTo(this.X(q[0]), this.Y(q[1]))); c.stroke(); c.restore(); }
  dot(x, y, color, label) { const c = this.ctx; c.fillStyle = color; c.beginPath(); c.arc(this.X(x), this.Y(y), 4, 0, Math.PI * 2); c.fill(); if (label) { c.fillStyle = "#1d2530"; c.font = "700 12px Noto Sans KR, sans-serif"; c.textAlign = "center"; c.fillText(label, this.X(x), this.Y(y) - 9); } }
  vline(x, color) { const c = this.ctx, p = this.pad; c.save(); c.strokeStyle = color; c.setLineDash([4, 4]); c.beginPath(); c.moveTo(this.X(x), p.t); c.lineTo(this.X(x), c.H - p.b); c.stroke(); c.restore(); }
  text(x, y, s, color, align = "left") { const c = this.ctx; c.fillStyle = color; c.font = "700 12px Noto Sans KR, sans-serif"; c.textAlign = align; c.fillText(s, this.X(x), this.Y(y)); }
}

/* 온도 그래프 : mode series(전체 부피 같게) / tit(첨가) */
class TempView {
  constructor(el, o) { this.el = el; this.o = o; this.build(); }
  build() {
    const o = this.o; this.el.innerHTML = "";
    const cols = h("div", { class: "cols" }); this.el.append(cols);
    const left = h("div"), right = h("div"); cols.append(left, right);
    this.plot = new Plot(left, 520, 300);
    this.ctl = h("div", { class: "ctrls" }); left.append(this.ctl);
    this.side = right;
    if (o.mode === "series") {
      this.sel = 0;
      const seg = h("div", { class: "seg" });
      o.points.forEach((pt, i) => { const b = h("button", { class: i === 0 ? "on" : "", onclick: () => { this.sel = i; [...seg.children].forEach(x => x.classList.toggle("on", x === b)); this.draw(); } }, pt[2] || `${pt[0]} : ${pt[1]}`); seg.append(b); });
      this.ctl.append(h("span", { class: "note" }, "혼합 용액 고르기 "), seg);
    } else {
      this.v = o.start || 0;
      const lab = h("span", { class: "ctrl" }, `<label>넣어 준 ${SOL[o.base.s].n}</label>`);
      const rg = h("input", { type: "range", min: 0, max: o.max, step: o.stepV || 0.5, value: this.v }); const out = h("b");
      rg.oninput = () => { this.v = +rg.value; out.textContent = `${frac(this.v)} mL`; this.draw(); };
      out.textContent = `${frac(this.v)} mL`; lab.append(rg, out); this.ctl.append(lab);
    }
    this.mixEl = h("div"); this.side.append(this.mixEl);
    this.draw();
  }
  mixAt(va, vb) { const o = this.o; return mix([{ s: o.acid.s, vol: va, n: o.acid.conc * va }, { s: o.base.s, vol: vb, n: o.base.conc * vb }]); }
  temp(r) { return 20 + (this.o.tk || 60) * r.water / Math.max(r.vol, 1e-9); }
  draw() {
    const o = this.o, P = this.plot;
    if (o.mode === "series") {
      const res = o.points.map(p => this.mixAt(p[0], p[1])), T = res.map(r => this.temp(r));
      const lo = Math.min(...T), hi = Math.max(...T);
      P.frame(0, o.points.length + 1, lo - (hi - lo) * .25 - .1, hi + (hi - lo) * .2 + .1, `${SOL[o.acid.s].n.replace(/<[^>]+>/g, "")} : ${SOL[o.base.s].n.replace(/<[^>]+>/g, "")} 부피(mL)`, "최고 온도(℃)");
      const c = P.ctx; c.fillStyle = "#5d6878"; c.font = "12px Noto Sans KR, sans-serif"; c.textAlign = "center";
      o.points.forEach((p, i) => { c.fillText(`${p[0]} : ${p[1]}`, P.X(i + 1), c.H - P.pad.b + 15); });
      if (o.joined !== false) P.line(T.map((t, i) => [i + 1, t]), "#9aa7b5", null, 1.2);
      T.forEach((t, i) => P.dot(i + 1, t, i === this.sel ? "#b23a3a" : "#23426b", o.points[i][2]));
      this.side.firstChild && this.mixInfo(res[this.sel], o.points[this.sel]);
    } else {
      const N = 240, pts = [];
      for (let i = 0; i <= N; i++) { const v = o.max * i / N; pts.push([v, this.temp(this.mixAt(o.acid.vol, v))]); }
      const ys = pts.map(p => p[1]); const lo = 20, hi = Math.max(...ys);
      P.frame(0, o.max, lo - .5, hi + (hi - lo) * .15 + .3, `넣어 준 ${SOL[o.base.s].n.replace(/<[^>]+>/g, "")} 수용액의 부피(mL)`, "온도(℃)", o.ticks || [0, o.max]);
      P.line(pts, "#23426b");
      const vn = o.acid.conc * o.acid.vol * SOL[o.acid.s].v / (o.base.conc * SOL[o.base.s].v);
      if (vn <= o.max) { P.vline(vn, "#b23a3a"); P.text(vn, hi + (hi - lo) * .08, "중화점", "#b23a3a", "center"); }
      (o.marks || []).forEach(([v, l]) => P.dot(v, this.temp(this.mixAt(o.acid.vol, v)), "#23426b", l));
      P.dot(this.v, this.temp(this.mixAt(o.acid.vol, this.v)), "#b23a3a");
      this.mixInfo(this.mixAt(o.acid.vol, this.v), [o.acid.vol, this.v]);
    }
  }
  mixInfo(r, pt) {
    const u = this.o.unit || "";
    this.mixEl.innerHTML = "";
    const pan = h("div", { class: "panel" });
    pan.innerHTML = `<h3>${SOL[this.o.acid.s].n} ${frac(pt[0])} mL + ${SOL[this.o.base.s].n} ${frac(pt[1])} mL</h3>
      <div class="kv"><b>H⁺ (반응 전)</b><span>${fmt(r.H, u)}</span><b>OH⁻ (반응 전)</b><span>${fmt(r.OH, u)}</span>
      <b>생성된 물</b><span>${fmt(r.water, u)}</span><b>액성</b><span>${liqBadge(r.liq)}</span></div>
      <div class="note">생성된 물 분자 수가 많을수록 중화열이 많이 발생해요. 첨가 실험에서 중화점 이후에는 물이 더 생기지 않고, 차가운 염기 수용액이 섞여 온도가 내려가요.</div>`;
    this.mixEl.append(pan);
    const mv = h("div"); this.mixEl.append(mv);
    new MixView(mv, { mixes: [{ label: "혼합 용액", parts: r.parts }], unit: u, showTable: false, btb: true });
  }
}

/* 단위 부피당 이온 수 그래프 (첨가 실험) */
class PerVolView {
  constructor(el, o) { this.el = el; this.o = Object.assign({ series: ["acidIon", "baseIon", "H", "OH"], unit: "" }, o); this.v = o.start != null ? o.start : o.max / 2; this.build(); }
  build() {
    const o = this.o; this.el.innerHTML = "";
    this.ctl = h("div", { class: "ctrls" }); this.el.append(this.ctl);
    const all = { acidIon: `${ION[SOL[o.acid.s].ion].l} (처음 구경꾼)`, baseIon: `${ION[SOL[o.base.s].ion].l} (넣는 구경꾼)`, H: "H⁺", OH: "OH⁻", total: "전체 이온", cation: "양이온 전체", anion: "음이온 전체" };
    this.on = new Set(o.series);
    Object.keys(all).forEach(k => { const t = h("label", { class: "toggle" }, `<input type="checkbox" ${this.on.has(k) ? "checked" : ""}> ${(o.names && o.names[k]) || all[k]}`); t.querySelector("input").onchange = e => { e.target.checked ? this.on.add(k) : this.on.delete(k); this.draw(); }; this.ctl.append(t); });
    const lab = h("span", { class: "ctrl" }, `<label>넣어 준 부피</label>`);
    const rg = h("input", { type: "range", min: 0, max: o.max, step: 0.5, value: this.v }); this.out = h("b");
    rg.oninput = () => { this.v = +rg.value; this.draw(); }; lab.append(rg, this.out);
    const cols = h("div", { class: "cols" }); this.el.append(cols);
    const left = h("div"); this.side = h("div"); cols.append(left, this.side);
    left.prepend(lab);
    this.plot = new Plot(left, 520, 320);
    this.draw();
  }
  at(v) { const o = this.o; return mix([{ s: o.acid.s, vol: o.acid.vol, n: o.acid.conc * o.acid.vol }, { s: o.base.s, vol: v, n: o.base.conc * v }]); }
  val(k, r) {
    const ai = SOL[this.o.acid.s].ion, bi = SOL[this.o.base.s].ion;
    const x = k === "acidIon" ? r.after[ai] : k === "baseIon" ? (r.after[bi] || 0) : k === "H" ? r.after.H : k === "OH" ? r.after.OH : k === "total" ? r.totalAfter : k === "cation" ? r.catAfter : r.anAfter;
    return x / r.vol;
  }
  draw() {
    const o = this.o, P = this.plot, u = o.unit;
    this.out.textContent = ` ${frac(this.v)} mL`;
    const N = 300, C = { acidIon: "#1d2530", baseIon: "#2a6fb0", H: "#ef6f4f", OH: "#8e44ad", total: "#23426b", cation: "#c0392b", anion: "#1c7c74" };
    const keys = [...this.on]; let ymax = 0; const data = {};
    keys.forEach(k => { data[k] = []; for (let i = 0; i <= N; i++) { const v = o.max * i / N, y = this.val(k, this.at(v)); data[k].push([v, y]); ymax = Math.max(ymax, y); } });
    const asy = {};
    if (o.asymptote) { const bs = SOL[o.base.s]; asy.total = o.base.conc * (1 + bs.v); asy.cation = o.base.conc; asy.baseIon = o.base.conc; asy.anion = o.base.conc * bs.v; asy.OH = o.base.conc * bs.v; keys.forEach(k => { if (asy[k]) ymax = Math.max(ymax, asy[k]); }); }
    P.frame(0, o.max, 0, ymax * 1.12 || 1, "넣어 준 염기 수용액의 부피(mL)", `단위 부피당 이온 수${u ? " (" + u + "/mL)" : ""}`, o.ticks || [0, o.max]);
    const vn = o.acid.conc * o.acid.vol * SOL[o.acid.s].v / (o.base.conc * SOL[o.base.s].v);
    if (vn <= o.max) { P.vline(vn, "#b23a3a"); P.text(vn, ymax * 1.06, "중화점", "#b23a3a", "center"); }
    keys.forEach(k => { P.line(data[k], C[k], k === "H" || k === "OH" ? [6, 4] : null); const last = data[k][N]; P.text(o.max, last[1], " " + ((o.names && o.names[k]) || { acidIon: ION[SOL[o.acid.s].ion].l, baseIon: ION[SOL[o.base.s].ion].l, H: "H⁺", OH: "OH⁻", total: "전체", cation: "양이온", anion: "음이온" }[k]), C[k], "right"); if (asy[k]) P.line([[0, asy[k]], [o.max, asy[k]]], C[k], [2, 4], 1); });
    P.vline(this.v, "#9aa7b5");
    const r = this.at(this.v);
    this.side.innerHTML = `<div class="panel"><h3>${SOL[o.acid.s].n} ${o.acid.vol} mL + ${SOL[o.base.s].n} ${frac(this.v)} mL (전체 ${frac(r.vol)} mL)</h3>
      <table class="t"><tr><th>이온</th><th>이온 수</th><th>단위 부피당</th></tr>${Object.keys(r.after).filter(k => r.after[k] > EPS).map(k => `<tr><td>${ION[k].l}</td><td>${fmt(r.after[k], u)}</td><td>${fmt(r.after[k] / r.vol, u)}</td></tr>`).join("")}
      <tr class="sum"><td>전체</td><td>${fmt(r.totalAfter, u)}</td><td>${fmt(r.totalAfter / r.vol, u)}</td></tr></table>
      <div class="note">액성 ${liqBadge(r.liq)} · 이온 수 = 단위 부피당 이온 수 × 전체 부피(처음 용액 ${o.acid.vol} mL 포함!)</div></div>`;
  }
}

/* ---------------- 칸 그림 (과량은 이온 수 / 2가 빼기) ---------------- */
class BoxView {
  constructor(el, o) { this.el = el; this.o = o; this.stage = 0; this.build(); }
  build() {
    this.el.innerHTML = "";
    const bar = h("div", { class: "ctrls" });
    ["[1] 반응 전", "[2] H⁺ · OH⁻ 반응", "[3] 구경꾼이 빈자리 채우기"].forEach((t, i) => { const b = h("button", { class: "btn ghost", onclick: () => { this.stage = i; this.draw(); } }, t); bar.append(b); });
    this.el.append(bar);
    this.ctx = mkCanvas(this.el, 560, 260);
    this.info = h("div", { class: "note" }); this.el.append(this.info);
    this.draw();
  }
  draw() {
    const c = this.ctx; c.clearRect(0, 0, c.W, c.H);
    const a = this.o.acid, b = this.o.base, A = SOL[a.s], B = SOL[b.s];
    const H = a.n * A.v, OH = b.n * B.v, r = Math.min(H, OH);
    const cell = Math.min(34, 200 / Math.max(H, OH, 1)), cw = 58;
    const ax = 40, bx = 300, y0 = 230;
    const colors = { H: "#9cc0e8", an: "#5f86b8", cat: "#f2d27a", OH: "#e0a94a" };
    const rect = (x, y, w, hh, fill, txt, dash, cross) => {
      c.save(); c.fillStyle = fill; c.strokeStyle = "#1d2530"; c.lineWidth = 1; if (dash) c.setLineDash([4, 3]); c.fillRect(x, y, w, hh); c.strokeRect(x, y, w, hh); c.restore();
      if (txt) { c.fillStyle = "#1d2530"; c.font = `700 ${Math.min(13, hh * .5 + 4)}px Noto Sans KR, sans-serif`; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText(txt, x + w / 2, y + hh / 2); }
      if (cross) { c.strokeStyle = "#c0392b"; c.lineWidth = 2; c.beginPath(); c.moveTo(x + 4, y + 4); c.lineTo(x + w - 4, y + hh - 4); c.moveTo(x + w - 4, y + 4); c.lineTo(x + 4, y + hh - 4); c.stroke(); }
    };
    c.fillStyle = "#23426b"; c.font = "700 13px Noto Sans KR, sans-serif"; c.textAlign = "center";
    c.fillText(`${A.n.replace(/<[^>]+>/g, "")} ${frac(a.n)}개`, ax + cw, 18); c.fillText(`${B.n.replace(/<[^>]+>/g, "")} ${frac(b.n)}개`, bx + cw, 18);
    const acidExcess = H > OH;
    // 산 : H 칸(왼쪽) + 음이온 칸(오른쪽, 가수만큼 높이)
    for (let i = 0; i < H; i++) {
      const y = y0 - (i + 1) * cell, reacted = i < r;
      if (this.stage === 0 || !reacted) rect(ax, y, cw - 2, cell - 2, colors.H, "H⁺");
      else if (this.stage === 1) rect(ax, y, cw - 2, cell - 2, colors.H, "H⁺", false, true);
      else if (acidExcess) { /* 염기 양이온이 들어옴 (양이온 전하만큼 칸 차지) */ }
      else rect(ax, y, cw - 2, cell - 2, "#fff", "", true);
    }
    for (let j = 0; j < a.n; j++) { const y = y0 - (j + 1) * cell * A.v; const moved = this.stage === 2 && !acidExcess && r < H + EPS && true; if (!(this.stage === 2 && !acidExcess)) rect(ax + cw, y, cw - 2, cell * A.v - 2, colors.an, ION[A.ion].l); else rect(ax + cw, y, cw - 2, cell * A.v - 2, "#fff", "", true); }
    for (let i = 0; i < OH; i++) {
      const y = y0 - (i + 1) * cell, reacted = i < r;
      if (this.stage === 0 || !reacted) rect(bx + cw, y, cw - 2, cell - 2, colors.OH, "OH⁻");
      else if (this.stage === 1) rect(bx + cw, y, cw - 2, cell - 2, colors.OH, "OH⁻", false, true);
      else if (!acidExcess) { /* 산 음이온이 들어옴 */ }
      else rect(bx + cw, y, cw - 2, cell - 2, "#fff", "", true);
    }
    for (let j = 0; j < b.n; j++) { const y = y0 - (j + 1) * cell * B.v; if (!(this.stage === 2 && acidExcess)) rect(bx, y, cw - 2, cell * B.v - 2, colors.cat, ION[B.ion].l); else rect(bx, y, cw - 2, cell * B.v - 2, "#fff", "", true); }
    if (this.stage === 2) {
      if (acidExcess) { // 반응한 H 자리(r칸)에 염기 양이온 b.n개가 들어감 (각 B.v칸)
        for (let j = 0; j < b.n; j++) rect(ax, y0 - (j + 1) * cell * B.v, cw - 2, cell * B.v - 2, colors.cat, ION[B.ion].l);
        arrow(c, bx, y0 - r * cell / 2, ax + cw, y0 - r * cell / 2);
      } else { // 반응한 OH 자리(r칸)에 산 음이온 a.n개가 들어감 (각 A.v칸)
        for (let j = 0; j < a.n; j++) rect(bx + cw, y0 - (j + 1) * cell * A.v, cw - 2, cell * A.v - 2, colors.an, ION[A.ion].l);
        arrow(c, ax + 2 * cw, y0 - r * cell / 2, bx + cw, y0 - r * cell / 2);
      }
    }
    const res = mix([{ s: a.s, n: a.n }, { s: b.s, n: b.n }]), u = this.o.unit || "";
    const lim = acidExcess ? b : a, LS = SOL[lim.s], exc = acidExcess ? a : b, ES = SOL[exc.s];
    const neutral = Math.abs(H - OH) < EPS;
    const excTot = exc.n * (1 + ES.v);
    const msgs = [
      `반응 전 : H⁺ ${fmt(H, u)}, OH⁻ ${fmt(OH, u)}. 1 : 1로 반응하므로 ${fmt(r, u)}씩 반응해요.`,
      `물 분자 ${fmt(r, u)}개 생성 = 소량(${neutral ? "둘 다" : LS.n.replace(/<[^>]+>/g, "")})의 ${LS.t === "a" ? "H⁺" : "OH⁻"} 수.`,
      neutral ? `중성 : 구경꾼 이온만 남아요. 전체 이온 수 ${fmt(res.totalAfter, u)}.` :
        (LS.v === 1 ? `한계 반응물이 1가 → 빈자리가 1 : 1로 꼭 채워져요. 반응 후 전체 이온 수 ${fmt(res.totalAfter, u)} = 과량 ${ES.n.replace(/<[^>]+>/g, "")}의 전체 이온 수 ${fmt(excTot, u)}.`
          : `한계 반응물이 2가 → 구경꾼 ${ION[LS.ion].l} 1개가 빈자리 2칸을 채워 절반만 채워져요. 전체 이온 수 ${fmt(res.totalAfter, u)} = 과량 전체 ${fmt(excTot, u)} − ${ION[LS.ion].l} ${fmt(lim.n, u)}.`)
    ];
    this.info.innerHTML = msgs.slice(0, this.stage + 1).map(m => `· ${m}`).join("<br>");
  }
}
function arrow(c, x1, y1, x2, y2) { c.save(); c.strokeStyle = "#c0392b"; c.fillStyle = "#c0392b"; c.lineWidth = 2; c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2 + 8, y2); c.stroke(); c.beginPath(); c.moveTo(x2, y2); c.lineTo(x2 + 10, y2 - 5); c.lineTo(x2 + 10, y2 + 5); c.fill(); c.restore(); }

/* ---------------- 리트머스 ---------------- */
const THREAD = {
  HCl: { cat: "H", an: "Cl", n: "묽은 염산(HCl)" }, H2SO4: { cat: "H", an: "SO4", n: "묽은 황산(H₂SO₄)" }, HNO3: { cat: "H", an: "NO3", n: "묽은 질산(HNO₃)" },
  NaOH: { cat: "Na", an: "OH", n: "수산화 나트륨(NaOH)" }, KOH: { cat: "K", an: "OH", n: "수산화 칼륨(KOH)" }, NaCl: { cat: "Na", an: "Cl", n: "염화 나트륨(NaCl)" }
};
class LitmusView {
  constructor(el, o) { this.el = el; this.o = o; this.i = 0; this.t = 0; this.build(); }
  build() {
    const o = this.o; this.el.innerHTML = "";
    const bar = h("div", { class: "ctrls" }); this.el.append(bar);
    if (o.editable) {
      const ps = h("select"); ps.innerHTML = `<option value="blue">푸른색 리트머스 종이</option><option value="red">붉은색 리트머스 종이</option>`;
      const ts = h("select"); ts.innerHTML = Object.keys(THREAD).map(k => `<option value="${k}">${THREAD[k].n}</option>`).join("");
      ps.value = o.setups[0].paper; ts.value = o.setups[0].thread;
      ps.onchange = () => { o.setups[0].paper = ps.value; this.reset(); }; ts.onchange = () => { o.setups[0].thread = ts.value; this.reset(); };
      bar.append(h("span", { class: "ctrl" }, "<label>종이</label>"), ps, h("span", { class: "ctrl" }, "<label>실</label>"), ts);
    } else if (o.setups.length > 1) {
      const seg = h("div", { class: "seg" });
      o.setups.forEach((s, i) => { const b = h("button", { class: i === 0 ? "on" : "", onclick: () => { this.i = i; [...seg.children].forEach(x => x.classList.toggle("on", x === b)); this.reset(); } }, s.label); seg.append(b); });
      bar.append(seg);
    }
    this.go = h("button", { class: "btn red", onclick: () => this.run() }, "⚡ 전류 흘리기"); bar.append(this.go, h("button", { class: "btn ghost", onclick: () => this.reset() }, "↺ 처음으로"));
    this.ctx = mkCanvas(this.el, 640, 230);
    this.info = h("div", { class: "note" }); this.el.append(this.info);
    this.reset();
  }
  reset() { cancelAnimationFrame(this.raf); this.t = 0; this.draw(); }
  run() { const t0 = performance.now(); const st = now => { this.t = Math.min(1, (now - t0) / 3200); this.draw(); if (this.t < 1) this.raf = requestAnimationFrame(st); }; cancelAnimationFrame(this.raf); this.raf = requestAnimationFrame(st); }
  draw() {
    const s = this.o.setups[this.i], th = THREAD[s.thread], c = this.ctx, t = this.t; c.clearRect(0, 0, c.W, c.H);
    const X0 = 60, X1 = 580, Y0 = 70, Y1 = 150, mid = (X0 + X1) / 2;
    c.fillStyle = "#eef1f4"; c.strokeStyle = "#9aa3ad"; c.lineWidth = 1; c.fillRect(X0 - 30, Y0 - 18, X1 - X0 + 60, Y1 - Y0 + 36); c.strokeRect(X0 - 30, Y0 - 18, X1 - X0 + 60, Y1 - Y0 + 36);
    const BL = "#8fb3e3", RD = "#eb9a9a"; const base = s.paper === "blue" ? BL : RD;
    c.fillStyle = base; c.fillRect(X0, Y0, X1 - X0, Y1 - Y0);
    // 색 변화
    const changer = s.paper === "blue" && th.cat === "H" ? { dir: -1, col: RD, ion: "H⁺" } : s.paper === "red" && th.an === "OH" ? { dir: 1, col: BL, ion: "OH⁻" } : null;
    const reach = t * (mid - X0 - 20);
    if (changer) {
      const g = c.createLinearGradient(mid, 0, mid + changer.dir * (reach + 30), 0);
      g.addColorStop(0, changer.col); g.addColorStop(Math.max(.01, reach / (reach + 30)), changer.col); g.addColorStop(1, base);
      c.fillStyle = g; const xa = Math.min(mid, mid + changer.dir * (reach + 30)); c.fillRect(xa, Y0, reach + 30, Y1 - Y0);
    }
    c.strokeStyle = "#555"; c.lineWidth = 5; c.beginPath(); c.moveTo(mid, Y0 - 10); c.lineTo(mid, Y1 + 10); c.stroke();
    // 집게
    [["(−)극", X0 - 22], ["(+)극", X1 + 22]].forEach(([l, x]) => { c.fillStyle = "#c9a24a"; c.fillRect(x - 8, Y0 + 20, 16, 40); c.fillStyle = "#1d2530"; c.font = "700 14px Noto Sans KR, sans-serif"; c.textAlign = "center"; c.fillText(l, x, Y0 - 28); });
    // 이온 이동
    const ions = [[th.cat, -1], [th.an, 1]];
    ions.forEach(([k, dir], j) => {
      for (let i = 0; i < 4; i++) {
        const x = mid + dir * (10 + t * (mid - X0 - 40) * (.55 + .15 * i)), y = Y0 + 14 + i * 18 + j * 6;
        drawIon(c, k, x, y, 10);
      }
    });
    c.fillStyle = "#1d2530"; c.font = "13px Noto Sans KR, sans-serif"; c.textAlign = "center";
    c.fillText(`${s.paper === "blue" ? "푸른색" : "붉은색"} 리트머스 종이 (질산 칼륨 수용액에 적심) · 실 : ${th.n}`, (X0 + X1) / 2, 210);
    const msg = !t ? "⚡ 전류 흘리기를 눌러 보세요. 양이온은 (−)극, 음이온은 (+)극으로 이동해요." :
      changer ? `<b>${changer.ion}</b>이 ${changer.dir < 0 ? "(−)극" : "(+)극"} 쪽으로 이동하면서 ${changer.dir < 0 ? "푸른색 → 붉은색" : "붉은색 → 푸른색"}으로 바뀌어요. 나머지 이온은 이동하지만 색을 바꾸지 않아요.` :
        `이온은 이동하지만 색이 변하지 않아요. ${th.cat === "H" ? "붉은색 리트머스는 산성에서 그대로예요." : th.an === "OH" ? "푸른색 리트머스는 염기성에서 그대로예요." : "중성 물질이라 H⁺도 OH⁻도 없어요."}`;
    this.info.innerHTML = msg;
  }
}

/* 지시약 색 표 */
const IND = {
  "페놀프탈레인 용액": { 산성: ["무색", "#ffffff"], 중성: ["무색", "#ffffff"], 염기성: ["붉은색", "#e8579a"] },
  "BTB 용액": { 산성: ["노란색", "#f6e27a"], 중성: ["초록색", "#9fd89a"], 염기성: ["파란색", "#86b2ea"] },
  "메틸 오렌지 용액": { 산성: ["붉은색", "#ec6a5c"], 중성: ["노란색", "#f6d36b"], 염기성: ["노란색", "#f6d36b"] },
  "푸른색 리트머스 종이": { 산성: ["붉은색", "#eb9a9a"], 중성: ["푸른색", "#8fb3e3"], 염기성: ["푸른색", "#8fb3e3"] },
  "붉은색 리트머스 종이": { 산성: ["붉은색", "#eb9a9a"], 중성: ["붉은색", "#eb9a9a"], 염기성: ["푸른색", "#8fb3e3"] }
};
class IndicatorView {
  constructor(el, o) { this.el = el; this.o = o; this.hide = !!o.hide; this.build(); }
  build() {
    this.el.innerHTML = ""; const o = this.o;
    const bar = h("div", { class: "ctrls" });
    if (o.labels) { const t = h("label", { class: "toggle" }, `<input type="checkbox" ${this.hide ? "" : "checked"}> 지시약 이름 보기`); t.querySelector("input").onchange = e => { this.hide = !e.target.checked; this.draw(); }; bar.append(t); }
    this.el.append(bar); this.tb = h("div"); this.el.append(this.tb); this.draw();
  }
  draw() {
    const o = this.o;
    this.tb.innerHTML = `<table class="t"><tr><th>지시약</th>${o.sols.map(s => `<th>${s[0]}<br><span class="badge ${s[1] === "산성" ? "b-acid" : s[1] === "염기성" ? "b-base" : "b-neu"}">${s[1]}</span></th>`).join("")}</tr>` +
      o.inds.map((k, i) => `<tr><td>${o.labels ? `<b>${o.labels[i]}</b>${this.hide ? "" : " " + k}` : k}</td>${o.sols.map(s => { const [n, col] = IND[k][s[1]]; return `<td><span style="display:inline-block;width:18px;height:18px;border-radius:50%;background:${col};border:1px solid #9aa5b2;vertical-align:-4px"></span> ${n}</td>`; }).join("")}</tr>`).join("") + "</table>";
  }
}

/* ---------------- 유형 정의 ---------------- */
const TYPES = [
  { id: "B1", grp: "basic", k: "기본 유형 1", t: "리트머스 종이 실험", d: "H⁺과 OH⁻이 이동하며 리트머스 색을 바꾸는 모습" },
  { id: "B2", grp: "basic", k: "기본 유형 2", t: "중화 반응 개괄", d: "H⁺ + OH⁻ → H₂O, 알짜·구경꾼 이온, 액성" },
  { id: "B3", grp: "basic", k: "기본 유형 3", t: "이온 모형 분석", d: "10 mL씩 넣을 때 기호 모형 읽기" },
  { id: "B4", grp: "basic", k: "기본 유형 4", t: "온도 변화 그래프", d: "중화열과 중화점, 두 가지 그래프" },
  { id: "H1", grp: "adv", k: "심화 유형 1", t: "물의 수와 이온 수", d: "과량은 이온 수, 소량은 물의 수" },
  { id: "H2", grp: "adv", k: "심화 유형 2", t: "이온의 종류 수로 액성 판단", d: "n개 용액 → 최소 n가지, n+1가지면 산성 또는 염기성" },
  { id: "H3", grp: "adv", k: "심화 유형 3", t: "2가 산 · 2가 염기", d: "한계 반응물이 2가면 구경꾼 수만큼 빼기" },
  { id: "H4", grp: "adv", k: "심화 유형 4", t: "단위 부피당 이온 수", d: "부피를 곱해 이온 수로, 첨가 그래프와 점근선" }
];

function stepper(label, val, min, max, on, step = 1) {
  const w = h("span", { class: "ctrl" }, `<label>${label}</label>`); const s = h("span", { class: "step" });
  const out = h("span", {}, String(val));
  const set = v => { val = Math.max(min, Math.min(max, Math.round(v / step) * step)); out.textContent = frac(val); on(val); };
  s.append(h("button", { onclick: () => set(val - step) }, "−"), out, h("button", { onclick: () => set(val + step) }, "+")); w.append(s); return w;
}
function selectEl(opts, val, on) { const s = h("select"); s.innerHTML = opts.map(k => `<option value="${k}">${SOL[k] ? SOL[k].n.replace(/<[^>]+>/g, m => "") : k}</option>`).join(""); s.innerHTML = opts.map(k => `<option value="${k}">${(SOL[k] ? SOL[k].n : k).replace(/<sub>(\d)<\/sub>/g, (m, d) => "₀₁₂₃₄₅₆₇₈₉"[d])}</option>`).join(""); s.value = val; s.onchange = () => on(s.value); return s; }
function panel(parent, title, cls = "") { const p = h("div", { class: "panel " + cls }); if (title) p.append(h("h3", {}, title)); parent.append(p); return p; }

const BASIC = {
  B1(el) {
    const p = panel(el, "리트머스 종이 실험");
    const box = h("div"); p.append(box);
    new LitmusView(box, { editable: true, setups: [{ paper: "blue", thread: "HCl" }] });
    const p2 = panel(el, "지시약의 색");
    const b2 = h("div"); p2.append(b2);
    new IndicatorView(b2, { inds: Object.keys(IND), sols: [["묽은 염산", "산성"], ["증류수", "중성"], ["NaOH 수용액", "염기성"]] });
    panel(el, "꼭 기억할 것", "tip").innerHTML += `<div class="ptext"><ul><li>질산 칼륨 수용액은 <b>전류가 흐르게</b> 하려고 적셔요. 색은 바꾸지 않아요.</li><li>색을 바꾸는 이온은 <b>H⁺</b>((−)극으로 이동)과 <b>OH⁻</b>((+)극으로 이동)뿐이에요.</li><li>다른 산(황산, 질산)을 써도 결과가 같아요. 산의 공통 이온이 H⁺이기 때문이에요.</li></ul></div>`;
  },
  B2(el) {
    const st = { a: "HCl", b: "NaOH", na: 4, nb: 3 };
    const p = panel(el, "산과 염기를 섞어 보기");
    const c = h("div", { class: "ctrls" }); p.append(c);
    const box = h("div"); p.append(box);
    const draw = () => new MixView(box, { mixes: [{ label: "혼합 용액", parts: [{ s: st.a, n: st.na }, { s: st.b, n: st.nb }], desc: `${SOL[st.a].n} ${st.na}개 + ${SOL[st.b].n} ${st.nb}개` }], btb: true });
    c.append(h("span", { class: "ctrl" }, "<label>산</label>"), selectEl(["HCl", "HNO3", "H2SO4"], st.a, v => { st.a = v; draw(); }), stepper("개수", st.na, 1, 8, v => { st.na = v; draw(); }),
      h("span", { class: "ctrl" }, "<label>염기</label>"), selectEl(["NaOH", "KOH", "CaOH2"], st.b, v => { st.b = v; draw(); }), stepper("개수", st.nb, 1, 8, v => { st.nb = v; draw(); }));
    draw();
    panel(el, "꼭 기억할 것", "tip").innerHTML += `<div class="ptext"><ul><li>알짜 이온 반응식은 산·염기 종류와 관계없이 <b>H⁺ + OH⁻ → H₂O</b>예요.</li><li>개수가 변하지 않는 이온이 <b>구경꾼 이온</b>, 구경꾼끼리 결합한 물질이 <b>염</b>이에요.</li><li>H⁺이 남으면 산성, OH⁻이 남으면 염기성, 둘 다 없으면 중성(중화점)이에요.</li><li>황산(2가)이나 수산화 칼슘(2가)을 골라 개수비가 어떻게 달라지는지 확인해 보세요.</li></ul></div>`;
  },
  B3(el) {
    const st = { init: "HCl", add: "NaOH", ni: 4, na: 2 };
    const p = panel(el, "10 mL씩 넣으며 이온 모형 읽기");
    const c = h("div", { class: "ctrls" }); p.append(c);
    const box = h("div"); p.append(box);
    const draw = () => {
      const acidFirst = SOL[st.init].t === "a";
      const sym = acidFirst ? { H: "tri", [SOL[st.init].ion]: "sq", [SOL[st.add].ion]: "star", OH: "circ" } : { OH: "tri", [SOL[st.init].ion]: "sq", [SOL[st.add].ion]: "star", H: "circ" };
      new TitView(box, { editable: true, init: { s: st.init, vol: 20, n: st.ni }, add: { s: st.add, conc: st.na / 10 }, steps: [], sym, stepVol: 10, labels: ["처음", "+10 mL", "+20 mL", "+30 mL", "+40 mL"] });
    };
    c.append(h("span", { class: "ctrl" }, "<label>처음 용액 20 mL</label>"), selectEl(["HCl", "HNO3", "NaOH", "KOH"], st.init, v => { st.init = v; st.add = SOL[v].t === "a" ? "NaOH" : "HCl"; draw(); }), stepper("입자 수", st.ni, 1, 8, v => { st.ni = v; draw(); }),
      stepper("넣는 용액 10 mL 속 입자 수", st.na, 1, 6, v => { st.na = v; draw(); }));
    draw();
    panel(el, "모형 읽는 순서", "tip").innerHTML += `<div class="ptext"><ol><li>처음 산 수용액 : H⁺ : 음이온 = 1 : 1 (1가 산)</li><li>넣을 때 <b>줄어드는 이온 = 알짜 이온</b></li><li><b>그대로인 이온 = 처음 용액의 구경꾼</b></li><li><b>새로 늘어나는 이온 = 넣은 용액의 구경꾼</b> → 그 수 = 넣은 염기(산) 수</li><li>중화점 이후 새로 나타나는 이온 = 남은 알짜 이온</li></ol><div class="note">'양이온만/음이온만' 보기로 학습지의 일부 이온만 그린 모형을 연습해 보세요.</div></div>`;
  },
  B4(el) {
    const st = { mode: "series", ca: 2, cb: 3 };
    const p = panel(el, "중화 반응과 온도");
    const c = h("div", { class: "ctrls" }); p.append(c); const box = h("div"); p.append(box);
    const draw = () => {
      if (st.mode === "series") new TempView(box, { mode: "series", acid: { s: "HCl", conc: st.ca }, base: { s: "NaOH", conc: st.cb }, points: [[10, 40], [20, 30], [30, 20], [40, 10]].map(q => [q[0], q[1], ""]), tk: 18 });
      else new TempView(box, { mode: "tit", acid: { s: "HCl", vol: 20, conc: st.ca }, base: { s: "NaOH", conc: st.cb }, max: 50, ticks: [0, 10, 20, 30, 40, 50], start: 10, tk: 18 });
    };
    const seg = h("div", { class: "seg" });
    [["series", "전체 부피 같게 섞기"], ["tit", "첨가 실험"]].forEach(([k, t]) => { const b = h("button", { class: st.mode === k ? "on" : "", onclick: () => { st.mode = k; [...seg.children].forEach(x => x.classList.toggle("on", x === b)); draw(); } }, t); seg.append(b); });
    c.append(seg, stepper("HCl 1 mL당 입자", st.ca, 1, 5, v => { st.ca = v; draw(); }), stepper("NaOH 1 mL당 입자", st.cb, 1, 5, v => { st.cb = v; draw(); }));
    draw();
    panel(el, "꼭 기억할 것", "tip").innerHTML += `<div class="ptext"><ul><li>생성된 물 분자 수가 많을수록 중화열이 많이 발생해요.</li><li>전체 부피가 같으면 <b>최고 온도 순서 = 생성된 물 분자 수 순서</b>, 꼭짓점이 중화점이에요.</li><li>첨가 실험은 중화점까지 온도가 올라가고, 중화점 이후에는 내려가요.</li></ul></div>`;
  },
  H1(el) {
    const st = { va: 20, ca: 2, vb: 30, cb: 2 };
    const p = panel(el, "과량은 이온 수, 소량은 물의 수 (1가 산 + 1가 염기)");
    const c = h("div", { class: "ctrls" }); p.append(c);
    const bx = h("div"); p.append(bx);
    const p2 = panel(el, "가정하고 확인하기"); const chk = h("div"); p2.append(chk);
    const draw = () => {
      const na = st.va * st.ca / 10, nb = st.vb * st.cb / 10;
      new BoxView(bx, { acid: { s: "HA", n: na }, base: { s: "BOH", n: nb } });
      const r = mix([{ s: "HA", vol: st.va, n: na }, { s: "BOH", vol: st.vb, n: nb }]);
      chk.innerHTML = `<div class="ptext">HA ${st.va} mL(${frac(na)}개) + BOH ${st.vb} mL(${frac(nb)}개)</div>
        <table class="t"><tr><th>가정</th><th>예상 물 분자 수</th><th>예상 전체 이온 수</th><th>실제와 비교</th></tr>
        <tr><td>산성이라면</td><td>BOH 수 = ${frac(nb)}</td><td>HA 이온 수 = ${frac(2 * na)}</td><td>${r.liq === "산성" || r.liq === "중성" ? "<span class='ok'>✓ 성립</span>" : "<span class='ng'>✗ 모순</span>"}</td></tr>
        <tr><td>염기성이라면</td><td>HA 수 = ${frac(na)}</td><td>BOH 이온 수 = ${frac(2 * nb)}</td><td>${r.liq === "염기성" || r.liq === "중성" ? "<span class='ok'>✓ 성립</span>" : "<span class='ng'>✗ 모순</span>"}</td></tr>
        <tr class="sum"><td>실제</td><td>${frac(r.water)}</td><td>${frac(r.totalAfter)}</td><td>${liqBadge(r.liq)}</td></tr></table>
        <div class="note">실제 물 분자 수 = 적은 쪽(소량)의 수, 실제 전체 이온 수 = 많은 쪽(과량)의 이온 수와 같아지는지 확인해 보세요.</div>`;
    };
    c.append(stepper("HA 부피(mL)", st.va, 10, 40, v => { st.va = v; draw(); }, 10), stepper("10 mL당 HA", st.ca, 1, 4, v => { st.ca = v; draw(); }),
      stepper("BOH 부피(mL)", st.vb, 10, 40, v => { st.vb = v; draw(); }, 10), stepper("10 mL당 BOH", st.cb, 1, 4, v => { st.cb = v; draw(); }));
    draw();
  },
  H2(el) {
    const st = { on: { HCl: true, HNO3: false, NaOH: true, KOH: false }, n: { HCl: 3, HNO3: 2, NaOH: 2, KOH: 2 } };
    const p = panel(el, "섞은 용액 수(n)와 이온의 종류 수");
    const c = h("div", { class: "ctrls" }); p.append(c);
    const out = h("div"); p.append(out);
    const draw = () => {
      const parts = Object.keys(st.on).filter(k => st.on[k]).map(k => ({ s: k, vol: 10, n: st.n[k] }));
      if (!parts.length) { out.innerHTML = "<div class='empty'>용액을 하나 이상 골라 주세요.</div>"; return; }
      const r = mix(parts), n = parts.length, kinds = Object.keys(r.after).filter(k => r.after[k] > EPS);
      out.innerHTML = `<div class="kv"><b>섞은 수용액 n</b><span>${n}개 → 구경꾼 이온 최소 ${n}가지</span><b>이온의 종류</b><span>${kinds.length}가지 : ${kinds.map(k => ION[k].l).join(", ")}</span>
        <b>판정</b><span>${kinds.length === n ? "n가지 → <b>중성</b>" : "n + 1가지 → <b>산성 또는 염기성</b>"} (실제 ${liqBadge(r.liq)})</span>
        <b>전하 균형</b><span>양전하 합 ${frac(kinds.reduce((a, k) => a + Math.max(0, ION[k].q) * r.after[k], 0))} = 음전하 합 ${frac(kinds.reduce((a, k) => a + Math.max(0, -ION[k].q) * r.after[k], 0))}</span></div>`;
      const mv = h("div"); out.append(mv); new MixView(mv, { mixes: [{ label: "혼합 용액", parts }], showTable: true, btb: true });
    };
    Object.keys(st.on).forEach(k => { const t = h("label", { class: "toggle" }, `<input type="checkbox" ${st.on[k] ? "checked" : ""}> ${SOL[k].n} 10 mL`); t.querySelector("input").onchange = e => { st.on[k] = e.target.checked; draw(); }; c.append(t, stepper("입자", st.n[k], 1, 6, v => { st.n[k] = v; draw(); })); });
    draw();
  },
  H3(el) {
    const st = { a: "H2A", na: 2, b: "NaOH", nb: 6 };
    const p = panel(el, "2가 산 · 2가 염기의 칸 그림");
    const c = h("div", { class: "ctrls" }); p.append(c);
    const bx = h("div"); p.append(bx); const mv = h("div"); p.append(mv);
    const draw = () => { new BoxView(bx, { acid: { s: st.a, n: st.na }, base: { s: st.b, n: st.nb } }); new MixView(mv, { mixes: [{ label: "혼합 용액", parts: [{ s: st.a, n: st.na }, { s: st.b, n: st.nb }], desc: "" }], btb: true }); };
    c.append(h("span", { class: "ctrl" }, "<label>산</label>"), selectEl(["H2A", "HCl"], st.a, v => { st.a = v; draw(); }), stepper("개수", st.na, 1, 6, v => { st.na = v; draw(); }),
      h("span", { class: "ctrl" }, "<label>염기</label>"), selectEl(["NaOH", "XOH2"], st.b, v => { st.b = v; draw(); }), stepper("개수", st.nb, 1, 8, v => { st.nb = v; draw(); }));
    draw();
    panel(el, "꼭 기억할 것", "tip").innerHTML += `<div class="ptext"><ul><li>H₂A 1개 → H⁺ 2개 + A²⁻ 1개 (전체 3개). 물 분자 수 = 가수 × 한계 반응물 수.</li><li>한계 반응물이 1가 → 반응 후 이온 수 = 과량의 이온 수 그대로.</li><li>한계 반응물이 2가 → 과량의 이온 수 <b>− 2가 한계 반응물의 구경꾼 이온 수</b>.</li></ul></div>`;
  },
  H4(el) {
    const st = { va: 20, ca: 3, cb: 2 };
    const p = panel(el, "HCl 수용액에 NaOH 수용액을 넣을 때 단위 부피당 이온 수");
    const c = h("div", { class: "ctrls" }); p.append(c); const box = h("div"); p.append(box);
    const draw = () => new PerVolView(box, { acid: { s: "HCl", vol: st.va, conc: st.ca }, base: { s: "NaOH", conc: st.cb }, max: 80, ticks: [0, 20, 40, 60, 80], series: ["acidIon", "baseIon", "H", "OH"], asymptote: true });
    c.append(stepper("HCl 부피(mL)", st.va, 10, 40, v => { st.va = v; draw(); }, 10), stepper("HCl 1 mL당 H⁺", st.ca, 1, 6, v => { st.ca = v; draw(); }), stepper("NaOH 1 mL당 OH⁻", st.cb, 1, 6, v => { st.cb = v; draw(); }));
    draw();
    panel(el, "그래프 읽기", "tip").innerHTML += `<div class="ptext"><ul><li>처음 있던 구경꾼(Cl⁻)은 수가 일정 → 단위 부피당 값은 계속 감소.</li><li>넣는 구경꾼(Na⁺)은 0에서 증가하며 NaOH 수용액의 값에 가까워져요(점근선).</li><li>Cl⁻과 Na⁺ 그래프가 만나는 점 = 중화점. 전체 이온 그래프는 중화점에서 최소예요.</li><li>단위 부피당 값을 이온 수로 바꿀 때는 처음 용액 부피까지 더한 전체 부피를 곱해요.</li></ul></div>`;
  }
};

/* ---------------- 문제 상황 ---------------- */
function renderPreset(pv, pr) {
  pv.innerHTML = "";
  const head = panel(pv, `${pr.o ? "DCAF " : "유사 "}${pr.no}`, "prob");
  head.querySelector("h3").innerHTML = `<span class="chip ${pr.o ? "red" : ""}">${pr.o ? "DCAF " + pr.no : "유사 " + pr.no}</span> ${pr.title || ""}`;
  head.append(h("div", { class: "ptext" }, pr.text || ""));
  if (pr.hint) { const d = h("details", { class: "hint" }); d.innerHTML = `<summary>풀이 단서 보기</summary><ol>${pr.hint.map(x => `<li>${x}</li>`).join("")}</ol>`; head.append(d); }
  (pr.views || []).forEach(v => {
    const p = panel(pv, v.title || ""); const box = h("div"); p.append(box);
    if (v.k === "mix") new MixView(box, Object.assign({ unit: pr.unit || "" }, v));
    else if (v.k === "tit") new TitView(box, Object.assign({ unit: pr.unit || "" }, v));
    else if (v.k === "temp") new TempView(box, Object.assign({ unit: pr.unit || "" }, v));
    else if (v.k === "pervol") new PerVolView(box, Object.assign({ unit: pr.unit || "" }, v));
    else if (v.k === "box") new BoxView(box, Object.assign({ unit: pr.unit || "" }, v));
    else if (v.k === "litmus") new LitmusView(box, v);
    else if (v.k === "ind") new IndicatorView(box, v);
  });
  pv.append(h("div", { class: "note" }, "시뮬레이션은 문제를 푼 뒤의 실제 상황(정답 조건)을 보여줘요. 먼저 학습지에서 풀어 보고 확인하세요."));
}

/* ---------------- 화면 전환 ---------------- */
function openType(id, q, tab) {
  const T = TYPES.find(t => t.id === id); if (!T) return home();
  $("#home").hidden = true; $("#view").hidden = false; window.scrollTo(0, 0);
  $("#vchip").textContent = T.k; $("#vchip").className = "chip" + (T.grp === "adv" ? " teal" : ""); $("#vtitle").textContent = T.t;
  document.title = `${T.k} ${T.t} · 중화 반응 연구소`;
  const tb = $("#tab-basic"); tb.innerHTML = ""; BASIC[id](tb);
  const list = (window.PRESETS || []).filter(p => p.type === id);
  const pl = $("#plist"), pv = $("#pview"); pl.innerHTML = ""; pv.innerHTML = `<div class="empty">위에서 문제를 골라 주세요.</div>`;
  list.forEach(p => { const b = h("button", { class: "pbtn" + (p.o ? " o" : ""), onclick: () => { [...pl.children].forEach(x => x.classList.toggle("on", x === b)); renderPreset(pv, p); history.replaceState(null, "", `?t=${id}&q=${p.code}`); } }, p.o ? p.no : "유사 " + p.no); pl.append(b); });
  let showProb = tab === "prob";
  if (q) { const idx = list.findIndex(p => p.code === q); if (idx >= 0) { showProb = true; pl.children[idx].click(); } }
  setTab(showProb ? "prob" : "basic");
  if (!q) history.replaceState(null, "", `?t=${id}`);
}
function setTab(t) {
  document.querySelectorAll(".tab").forEach(b => b.classList.toggle("active", b.dataset.tab === t));
  $("#tab-basic").hidden = t !== "basic"; $("#tab-prob").hidden = t !== "prob";
}
function home() { $("#home").hidden = false; $("#view").hidden = true; document.title = "중화 반응 연구소"; history.replaceState(null, "", location.pathname); }

function init() {
  const counts = {}; (window.PRESETS || []).forEach(p => counts[p.type] = (counts[p.type] || 0) + 1);
  TYPES.forEach(T => {
    const c = h("button", { class: "card" + (T.grp === "adv" ? " adv" : ""), onclick: () => openType(T.id) },
      `<span class="k">${T.k}</span><span class="t">${T.t}</span><span class="d">${T.d}</span><span class="n">문제 상황 ${counts[T.id] || 0}개</span>`);
    $(T.grp === "basic" ? "#cards-basic" : "#cards-adv").append(c);
  });
  $("#back").onclick = home;
  document.querySelectorAll(".tab").forEach(b => b.onclick = () => setTab(b.dataset.tab));
  const ps = new URLSearchParams(location.search);
  if (ps.get("t")) openType(ps.get("t"), ps.get("q"), ps.get("tab"));
}
window.addEventListener("error", e => { const d = document.getElementById("errbox") || document.body.appendChild(h("div", { id: "errbox", style: "position:fixed;bottom:0;left:0;right:0;background:#b23a3a;color:#fff;font-size:12px;padding:6px 10px;z-index:9" })); d.textContent = "오류: " + e.message; });
document.addEventListener("DOMContentLoaded", init);
