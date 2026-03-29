/* ===== PARTICLES ===== */
export function initParticles() {
  const cv = document.getElementById('pcv'), x = cv.getContext('2d');
  let W, H, ps = [];
  function resize() { W = cv.width = window.innerWidth; H = cv.height = window.innerHeight; }
  window.addEventListener('resize', resize); resize();
  function mp() { return { x: Math.random()*W, y: H+Math.random()*80, s: Math.random()*1.8+.3, vx: (Math.random()-.5)*.35, vy: -(Math.random()*.65+.2), o: Math.random()*.55+.1, tw: Math.random()*Math.PI*2, ts: Math.random()*.025+.008 }; }
  for (let i = 0; i < 75; i++) { const p = mp(); p.y = Math.random()*H; ps.push(p); }
  function fr() {
    x.clearRect(0,0,W,H);
    ps.forEach(p => {
      p.x+=p.vx; p.y+=p.vy; p.tw+=p.ts;
      if (p.y<-10||p.x<-10||p.x>W+10) Object.assign(p, mp());
      const a = p.o*(0.5+0.5*Math.sin(p.tw));
      x.save(); x.globalAlpha=a; x.fillStyle='#F8A4C8';
      x.shadowBlur=7; x.shadowColor='rgba(248,164,200,.7)';
      x.beginPath(); x.arc(p.x,p.y,p.s,0,Math.PI*2); x.fill(); x.restore();
    });
    requestAnimationFrame(fr);
  }
  fr();
}

/* ===== CONFETTI ===== */
const CC = ['#F8A4C8','#D4A574','#FFFFFF','#ffdaec','#FFF8F5','#c47090','#ffc8de'];
let cp = [];

export function launchConfetti(ox, oy) {
  const ccv = document.getElementById('ccv'), cx = ccv.getContext('2d');
  ccv.width = window.innerWidth; ccv.height = window.innerHeight;
  ccv.style.display = 'block';
  ox = ox ?? window.innerWidth/2;
  oy = oy ?? window.innerHeight*.44;
  for (let i = 0; i < 200; i++) cp.push({ x:ox+(Math.random()-.5)*60, y:oy, vx:(Math.random()-.5)*15, vy:-(Math.random()*15+5), g:.38, dr:.99, s:Math.random()*9+3, c:CC[Math.floor(Math.random()*CC.length)], r:Math.random()*360, rs:(Math.random()-.5)*10, sh:Math.random()>.35?'r':'c', asp:.3+Math.random()*.5, li:1, dc:Math.random()*.008+.004 });
  function ac() {
    cx.clearRect(0,0,ccv.width,ccv.height);
    cp = cp.filter(p => p.li>0);
    cp.forEach(p => {
      p.x+=p.vx; p.y+=p.vy; p.vy+=p.g; p.vx*=p.dr; p.r+=p.rs; p.li-=p.dc;
      cx.save(); cx.globalAlpha=p.li; cx.fillStyle=p.c;
      cx.translate(p.x,p.y); cx.rotate(p.r*Math.PI/180);
      if (p.sh==='r') cx.fillRect(-p.s/2,-p.s*p.asp/2,p.s,p.s*p.asp);
      else { cx.beginPath(); cx.arc(0,0,p.s/2,0,Math.PI*2); cx.fill(); }
      cx.restore();
    });
    if (cp.length>0) requestAnimationFrame(ac); else ccv.style.display='none';
  }
  ac();
}
