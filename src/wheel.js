import { initParticles, launchConfetti } from './shared.js';

const MAX=2, N=16, ARC=360/N;
const PAL=[
  {l:'-25%',d:'-25% sur votre commande',c1:'#ff2da8',c2:'#a8005a'},
  {l:'-30%',d:'-30% sur votre commande',c1:'#cc0078',c2:'#7a0046'},
  {l:'-35%',d:'-35% sur votre commande',c1:'#960050',c2:'#580030'},
  {l:'-40%',d:'-40% sur votre commande',c1:'#680038',c2:'#3a0020'},
];
const SEGS = Array.from({length:N}, (_,i) => PAL[i%PAL.length]);
let CODE='', ROT=0, SPIN=false, SZ=320, DPR=1;

const getT = c => parseInt(localStorage.getItem('whl_'+c)||'0');
const setT = (c,n) => localStorage.setItem('whl_'+c, String(n));

function sv(id) { ['vl','vload','vw','vb','vr'].forEach(v => { document.getElementById(v).style.display = v===id ? '' : 'none'; }); }

export function onci() {
  const el = document.getElementById('ci');
  el.value = el.value.toUpperCase().replace(/[^A-Z0-9-]/g,'');
  document.getElementById('bv').disabled = !/^SD26-\d{4}$/.test(el.value);
  document.getElementById('ce').style.display = 'none';
}

export function validate() {
  const code = document.getElementById('ci').value.toUpperCase().trim();
  if (!/^SD26-\d{4}$/.test(code)) return;
  CODE = code; sv('vload');
  setTimeout(() => { getT(code)>=MAX ? sv('vb') : (initWheel(code, getT(code)), sv('vw')); }, 550);
}

function initWheel(code, tries) {
  document.getElementById('wg').textContent = 'Bonne chance — '+code;
  renderDots(tries);
  const available = Math.min(window.innerWidth-60, 380);
  SZ = Math.min(available, 360); DPR = window.devicePixelRatio||1;
  const cv = document.getElementById('wc');
  cv.width=SZ*DPR; cv.height=SZ*DPR; cv.style.width=SZ+'px'; cv.style.height=SZ+'px';
  ROT=0; draw(0);
  document.getElementById('bs').disabled = false;
}

function renderDots(tries) {
  const w = document.getElementById('dots'); w.innerHTML='';
  for (let i=0; i<MAX; i++) { const d=document.createElement('div'); d.className='dot '+(i<tries?'dot-used':'dot-active'); w.appendChild(d); }
}

function draw(rotDeg) {
  const cv=document.getElementById('wc'), ctx=cv.getContext('2d');
  ctx.save(); ctx.scale(DPR,DPR); ctx.clearRect(0,0,SZ,SZ);
  const cx=SZ/2, cy=SZ/2, r=SZ/2-5, rotR=(rotDeg-90)*Math.PI/180;
  for (let i=0; i<N; i++) {
    const sa=rotR+(i*ARC)*Math.PI/180, ea=rotR+((i+1)*ARC)*Math.PI/180, mid=rotR+(i+.5)*ARC*Math.PI/180, seg=SEGS[i];
    const grad=ctx.createRadialGradient(cx,cy,r*.15,cx,cy,r);
    grad.addColorStop(0,seg.c1); grad.addColorStop(1,seg.c2);
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,r,sa,ea); ctx.closePath(); ctx.fillStyle=grad; ctx.fill();
    const hx=cx+(r*.55)*Math.cos(mid), hy=cy+(r*.55)*Math.sin(mid);
    const hg=ctx.createRadialGradient(hx,hy,0,hx,hy,r*.28);
    hg.addColorStop(0,'rgba(255,255,255,0.12)'); hg.addColorStop(1,'rgba(255,255,255,0)');
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,r,sa,ea); ctx.closePath(); ctx.fillStyle=hg; ctx.fill();
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+r*Math.cos(sa),cy+r*Math.sin(sa));
    ctx.strokeStyle='rgba(0,0,0,0.45)'; ctx.lineWidth=1.5; ctx.stroke();
  }
  ctx.beginPath(); ctx.arc(cx,cy,r-4,0,Math.PI*2); ctx.strokeStyle='rgba(0,0,0,0.35)'; ctx.lineWidth=10; ctx.stroke();
  const ring=ctx.createLinearGradient(0,0,SZ,SZ);
  ring.addColorStop(0,'rgba(232,201,126,0.9)'); ring.addColorStop(.25,'rgba(200,144,42,0.7)');
  ring.addColorStop(.5,'rgba(247,234,187,0.95)'); ring.addColorStop(.75,'rgba(200,144,42,0.7)'); ring.addColorStop(1,'rgba(232,201,126,0.9)');
  ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.strokeStyle=ring; ctx.lineWidth=4; ctx.stroke();
  ctx.beginPath(); ctx.arc(cx,cy,r+3,0,Math.PI*2); ctx.strokeStyle='rgba(0,0,0,0.6)'; ctx.lineWidth=4; ctx.stroke();
  for (let i=0; i<N; i++) {
    const mid=rotR+(i+.5)*ARC*Math.PI/180, lx=cx+(r*.67)*Math.cos(mid), ly=cy+(r*.67)*Math.sin(mid), seg=SEGS[i];
    ctx.save(); ctx.translate(lx,ly); ctx.rotate(mid+Math.PI/2);
    ctx.fillStyle='rgba(0,0,0,0.3)'; ctx.beginPath(); ctx.roundRect(-23,-9.5,46,19,5); ctx.fill();
    ctx.fillStyle='#fff'; ctx.font='bold 13px Arial'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.shadowColor='rgba(0,0,0,0.6)'; ctx.shadowBlur=3; ctx.fillText(seg.l,0,0); ctx.restore();
  }
  ctx.restore();
}

export function spin() {
  if (SPIN) return; SPIN=true; document.getElementById('bs').disabled=true;
  if (navigator.vibrate) navigator.vibrate([30,20,30]);
  const winner=Math.floor(Math.random()*N), extra=6+Math.floor(Math.random()*4);
  const target=extra*360+(360-winner*ARC-ARC/2), dur=5500+Math.random()*1500;
  const ease=t=>1-Math.pow(1-t,4.8), start=ROT, t0=performance.now();
  function fr(now) {
    const t=Math.min((now-t0)/dur,1); ROT=start+target*ease(t); draw(ROT%360);
    if (t<1) requestAnimationFrame(fr);
    else { ROT=ROT%360; SPIN=false; const tries=getT(CODE)+1; setT(CODE,tries); showResult(winner,tries); }
  }
  requestAnimationFrame(fr);
}

function showResult(winner, tries) {
  const seg=SEGS[winner];
  document.getElementById('rl').textContent=seg.l;
  document.getElementById('rd').textContent=seg.d;
  document.getElementById('rc').textContent=CODE;
  document.getElementById('br').style.display=tries<MAX?'':'none';
  sv('vr');
  setTimeout(() => { launchConfetti(window.innerWidth/2, window.innerHeight*.35); if(navigator.vibrate)navigator.vibrate([50,30,80,30,50]); }, 300);
}

export function retry() {
  const tries=getT(CODE); if(tries>=MAX){sv('vb');return;}
  SPIN=false; initWheel(CODE,tries); sv('vw');
}

export function back() {
  CODE=''; document.getElementById('ci').value=''; document.getElementById('bv').disabled=true; sv('vl');
}

// Init
initParticles();
sv('vl');
