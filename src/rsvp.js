import { initParticles, launchConfetti } from './shared.js';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxdFgoG_FAeX_TbmztcrLLigfA3OIiczGTZnDg0itZ1djTWHrObY0DbLOYwFqQgsTyd/exec';
let currentTicket = '';

export function mv(el) { el.value.trim() ? el.classList.add('v') : el.classList.remove('v'); }

export function cf() {
  const ok = ['fn','fs','fc','fp','fr','fd'].every(id => document.getElementById(id).value.trim() !== '');
  document.getElementById('bc').disabled = !ok;
  document.getElementById('bd').disabled = !ok;
}

function sv(id) { ['vf','vl','vs','vd'].forEach(v => { document.getElementById(v).style.display = v===id ? '' : 'none'; }); }

export function sub(t) {
  const n=document.getElementById('fn').value.trim(), s=document.getElementById('fs').value.trim(),
        c=document.getElementById('fc').value.trim(), p=document.getElementById('fp').value.trim(),
        g=document.getElementById('fg').value, r=document.getElementById('fr').value,
        d=document.getElementById('fd').value;
  currentTicket = 'SD26-'+String(Math.floor(1000+Math.random()*9000));
  fetch(SCRIPT_URL+'?'+new URLSearchParams({name:n,salon:s,city:c,phone:p,guests:g,rep:r,date:d,type:t,ticket:currentTicket}).toString(), {mode:'no-cors'}).catch(()=>{});
  sv('vl');
  setTimeout(() => {
    if (t==='confirm') { document.getElementById('td').textContent=currentTicket; sv('vs'); setTimeout(launchConfetti, 350); }
    else sv('vd');
  }, 1400);
}

export function rf() {
  ['fn','fs','fc','fp'].forEach(id => { const el=document.getElementById(id); el.value=''; el.classList.remove('v'); });
  document.getElementById('fr').value=''; document.getElementById('fr').classList.remove('v');
  document.getElementById('fd').value=''; document.getElementById('fd').classList.remove('v');
  document.getElementById('fg').value='1';
  document.getElementById('bc').disabled=true; document.getElementById('bd').disabled=true;
  sv('vf');
}

export function openTicket() {
  const n=document.getElementById('fn').value.trim(), s=document.getElementById('fs').value.trim(),
        c=document.getElementById('fc').value.trim(), g=document.getElementById('fg').value,
        r=document.getElementById('fr').value, d=document.getElementById('fd').value, t=currentTicket;
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html>
<html lang="fr"><head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Billet VIP — ${t}</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Montserrat:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#1a0a12;font-family:'Montserrat',sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 20px;}

/* ── TICKET SHELL ── */
.ticket{width:100%;max-width:600px;border-radius:3px;overflow:hidden;box-shadow:0 50px 120px rgba(0,0,0,0.7),0 0 0 1px rgba(248,164,200,0.08);}

/* ── TOP STRIP ── */
.strip{background:#0D0008;padding:12px 36px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(248,164,200,0.1);}
.strip-code{font-size:10px;font-weight:700;letter-spacing:0.28em;color:rgba(248,164,200,0.7);text-transform:uppercase;}
.strip-label{font-size:8px;font-weight:600;letter-spacing:0.35em;color:rgba(255,255,255,0.2);text-transform:uppercase;}

/* ── HERO ── */
.hero{position:relative;background:linear-gradient(170deg,#0D0008 0%,#1c0016 40%,#2a0022 65%,#120010 100%);padding:52px 36px 44px;text-align:center;overflow:hidden;}
.hero-glow{position:absolute;top:-60px;left:50%;transform:translateX(-50%);width:500px;height:380px;background:radial-gradient(ellipse at center,rgba(248,164,200,0.18) 0%,rgba(196,112,144,0.06) 45%,transparent 70%);pointer-events:none;}
.hero-pattern{position:absolute;inset:0;background-image:repeating-linear-gradient(60deg,transparent,transparent 38px,rgba(248,164,200,0.018) 38px,rgba(248,164,200,0.018) 39px),repeating-linear-gradient(-60deg,transparent,transparent 38px,rgba(248,164,200,0.018) 38px,rgba(248,164,200,0.018) 39px);pointer-events:none;}
.eyebrow{font-size:8px;font-weight:600;letter-spacing:0.46em;text-transform:uppercase;color:rgba(248,164,200,0.45);margin-bottom:28px;display:flex;align-items:center;justify-content:center;gap:16px;position:relative;}
.eyebrow::before,.eyebrow::after{content:'';display:block;width:28px;height:1px;background:linear-gradient(90deg,transparent,rgba(248,164,200,0.3));}
.eyebrow::after{transform:scaleX(-1);}
.brand{position:relative;}
.brand-s{display:block;font-family:'Cormorant Garamond',serif;font-size:72px;font-weight:300;font-style:italic;line-height:1;background:linear-gradient(145deg,#c47090 0%,#F8A4C8 30%,#ffe4f0 55%,#D4A574 80%,#F8A4C8 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;}
.brand-d{display:block;font-size:18px;font-weight:800;letter-spacing:0.55em;text-transform:uppercase;color:rgba(255,248,245,0.5);margin-top:4px;}
.edition-tag{display:inline-block;margin:18px auto 0;padding:5px 18px;border:1px solid rgba(248,164,200,0.18);border-radius:100px;font-size:8px;font-weight:600;letter-spacing:0.3em;text-transform:uppercase;color:rgba(248,164,200,0.45);}
.h-sep{width:120px;height:1px;background:linear-gradient(90deg,transparent,rgba(248,164,200,0.35),transparent);margin:22px auto;}
.h-date{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:400;letter-spacing:0.05em;color:#F8A4C8;margin-bottom:6px;position:relative;}
.h-place{font-size:8px;font-weight:500;letter-spacing:0.28em;text-transform:uppercase;color:rgba(255,255,255,0.25);position:relative;}

/* ── DATE BADGE ── */
.date-badge{display:flex;align-items:center;justify-content:center;gap:10px;margin-top:22px;padding:11px 22px;background:rgba(248,164,200,0.07);border:1px solid rgba(248,164,200,0.22);border-radius:8px;width:fit-content;margin-left:auto;margin-right:auto;position:relative;}
.date-badge-dot{width:6px;height:6px;border-radius:50%;background:#F8A4C8;box-shadow:0 0 10px rgba(248,164,200,0.8);}
.date-badge-label{font-size:8px;font-weight:600;letter-spacing:0.28em;text-transform:uppercase;color:rgba(248,164,200,0.5);}
.date-badge-val{font-size:13px;font-weight:700;letter-spacing:0.08em;color:#FFF8F5;}

/* ── PERFORATION ── */
.perf{position:relative;background:#f5ede8;overflow:visible;z-index:1;}
.perf-line{height:1px;background:repeating-linear-gradient(90deg,#d4c0b8 0,#d4c0b8 6px,transparent 6px,transparent 12px);}
.perf::before,.perf::after{content:'';position:absolute;top:50%;transform:translateY(-50%);width:26px;height:26px;border-radius:50%;background:#1a0a12;z-index:2;}
.perf::before{left:-2px;box-shadow:inset -4px 0 8px rgba(0,0,0,0.3);}
.perf::after{right:-2px;box-shadow:inset 4px 0 8px rgba(0,0,0,0.3);}

/* ── GUEST SECTION ── */
.guest{background:#f5ede8;padding:30px 36px 26px;}
.guest-sup{font-size:7.5px;font-weight:700;letter-spacing:0.32em;text-transform:uppercase;color:#b09890;margin-bottom:8px;}
.guest-name{font-family:'Cormorant Garamond',serif;font-size:42px;font-weight:400;color:#0D0008;line-height:1.05;margin-bottom:22px;letter-spacing:-0.01em;}
.guest-meta{display:grid;grid-template-columns:1fr 1fr;gap:14px 24px;}
.meta-item{}
.meta-key{font-size:7px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#b09890;margin-bottom:3px;}
.meta-val{font-size:12px;font-weight:600;color:#2a0018;letter-spacing:0.01em;}

/* ── PERKS ── */
.perks{background:#efe5e0;padding:20px 36px 24px;border-top:1px solid rgba(196,112,144,0.12);}
.perks-sup{font-size:7.5px;font-weight:700;letter-spacing:0.32em;text-transform:uppercase;color:#b09890;margin-bottom:14px;}
.perks-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
.perk-card{background:#fff9f6;border:1px solid rgba(248,164,200,0.22);border-radius:10px;padding:16px 8px 14px;text-align:center;}
.perk-icon{font-size:20px;margin-bottom:10px;}
.perk-val{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:600;color:#0D0008;line-height:1;}
.perk-desc{font-size:7.5px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:#c09098;margin-top:4px;}

/* ── FOOTER ── */
.foot{background:linear-gradient(135deg,#0D0008 0%,#1a0015 50%,#0D0008 100%);padding:16px 36px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(248,164,200,0.1);}
.foot-code{font-family:'Courier New',monospace;font-size:14px;font-weight:700;letter-spacing:0.2em;color:#F8A4C8;}
.foot-right{text-align:right;}
.foot-nom{font-size:8px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.18);}

/* ── PRINT BUTTON ── */
.print-btn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;max-width:600px;margin:20px 0 0;padding:15px;background:linear-gradient(135deg,#c47090,#F8A4C8 40%,#ffdaec 65%,#D4A574);color:#0D0008;font-family:'Montserrat',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;border:none;border-radius:8px;cursor:pointer;box-shadow:0 6px 30px rgba(248,164,200,0.35);}
.print-btn:hover{opacity:0.9;}

@media print{
  body{background:white;padding:0;}
  .print-btn{display:none;}
  .ticket{box-shadow:none;max-width:none;border-radius:0;}
  .perf::before,.perf::after{background:white;}
  .foot,.strip,.hero{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
}
</style></head>
<body>
<div class="ticket">

  <!-- strip top -->
  <div class="strip">
    <span class="strip-code">${t}</span>
    <span class="strip-label">Semilac Days 2026 &nbsp;·&nbsp; Billet VIP</span>
  </div>

  <!-- hero -->
  <div class="hero">
    <div class="hero-glow"></div>
    <div class="hero-pattern"></div>
    <p class="eyebrow">Invitation Officielle</p>
    <div class="brand">
      <span class="brand-s">Semilac</span>
      <span class="brand-d">Days</span>
    </div>
    <span class="edition-tag">2ème Édition</span>
    <div class="h-sep"></div>
    <p class="h-date">14 — 19 Mai 2026</p>
    <p class="h-place">Showroom Cosmotrend &nbsp;·&nbsp; Casablanca</p>
    <div class="date-badge">
      <span class="date-badge-dot"></span>
      <span class="date-badge-label">Votre jour</span>
      <span class="date-badge-val">${d}</span>
    </div>
  </div>

  <!-- perforation -->
  <div class="perf"><div class="perf-line"></div></div>

  <!-- guest -->
  <div class="guest">
    <p class="guest-sup">Titulaire du billet</p>
    <p class="guest-name">${n}</p>
    <div class="guest-meta">
      <div class="meta-item"><p class="meta-key">Salon / Institut</p><p class="meta-val">${s}</p></div>
      <div class="meta-item"><p class="meta-key">Ville</p><p class="meta-val">${c}</p></div>
      <div class="meta-item"><p class="meta-key">Personnes</p><p class="meta-val">${g} personne${g>1?'s':''}</p></div>
      <div class="meta-item"><p class="meta-key">Représentant</p><p class="meta-val">${r}</p></div>
    </div>
  </div>

  <!-- perks -->
  <div class="perks">
    <p class="perks-sup">Avantages inclus</p>
    <div class="perks-grid">
      <div class="perk-card"><div class="perk-icon">🎫</div><div class="perk-val">−25%</div><div class="perk-desc">Sur commandes</div></div>
      <div class="perk-card"><div class="perk-icon">⭐</div><div class="perk-val">Tombola</div><div class="perk-desc">Ticket offert</div></div>
      <div class="perk-card"><div class="perk-icon">🚗</div><div class="perk-val">VTC</div><div class="perk-desc">Chauffeur offert</div></div>
    </div>
  </div>

  <!-- footer -->
  <div class="foot">
    <span class="foot-code">${t}</span>
    <div class="foot-right">
      <p class="foot-nom">Billet nominatif · non cessible</p>
      <p class="foot-nom" style="margin-top:3px;color:rgba(248,164,200,0.25);">Cosmotrend · Casablanca · 2026</p>
    </div>
  </div>

</div>
<button class="print-btn" onclick="window.print()">
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>
  Enregistrer en PDF
</button>
</body></html>`);
  w.document.close();
}

// Init
initParticles();
cf();
