import { initParticles, launchConfetti, launchConfettiLoop } from './shared.js';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxdFgoG_FAeX_TbmztcrLLigfA3OIiczGTZnDg0itZ1djTWHrObY0DbLOYwFqQgsTyd/exec';
const MAX=2, N=16, ARC=360/N;

// Premium beauty palette — dark rose/burgundy velvet, rose nacré accents
const PAL=[
  {l:'-25%',d:'-25% sur votre commande',ca:'#3d1028',cb:'#1a0010'},
  {l:'-30%',d:'-30% sur votre commande',ca:'#280918',cb:'#120008'},
  {l:'-35%',d:'-35% sur votre commande',ca:'#4a1530',cb:'#220012'},
  {l:'-40%',d:'-40% sur votre commande',ca:'#1e0815',cb:'#0d0008'},
];
const SEGS=Array.from({length:N},(_,i)=>PAL[i%PAL.length]);

let CODE='',ROT=0,SPIN=false,SZ=320,DPR=1;

const getT=c=>parseInt(localStorage.getItem('whl_'+c)||'0');
const setT=(c,n)=>localStorage.setItem('whl_'+c,String(n));
function sv(id){['vl','vload','vw','vb','vr'].forEach(v=>{document.getElementById(v).style.display=v===id?'':'none';})}

export function onci(){
  const el=document.getElementById('ci');
  el.value=el.value.toUpperCase().replace(/[^A-Z0-9-]/g,'');
  document.getElementById('bv').disabled=!/^SD26-\d{4}$/.test(el.value);
  document.getElementById('ce').style.display='none';
}

export function validate(){
  const code=document.getElementById('ci').value.toUpperCase().trim();
  if(!/^SD26-\d{4}$/.test(code))return;
  CODE=code;sv('vload');
  setTimeout(()=>{getT(code)>=MAX?sv('vb'):(initWheel(code,getT(code)),sv('vw'));},700);
}

function initWheel(code,tries){
  document.getElementById('wg').textContent='Bonne chance · '+code;
  renderDots(tries);
  const available=Math.min(window.innerWidth-60,380);
  SZ=Math.min(available,360);DPR=window.devicePixelRatio||1;
  const cv=document.getElementById('wc');
  cv.width=SZ*DPR;cv.height=SZ*DPR;cv.style.width=SZ+'px';cv.style.height=SZ+'px';
  ROT=0;draw(0);
  document.getElementById('bs').disabled=false;
  if(window.gsap){
    window.gsap.fromTo('#wc',{scale:0.86,opacity:0},{scale:1,opacity:1,duration:1,ease:'back.out(1.4)',delay:0.1});
    window.gsap.fromTo('.pointer',{opacity:0,y:-8},{opacity:1,y:0,duration:0.5,ease:'bounce.out',delay:0.6});
    window.gsap.fromTo('#bs',{y:20,opacity:0},{y:0,opacity:1,duration:0.6,ease:'power2.out',delay:0.4});
    window.gsap.fromTo('#dots',{opacity:0},{opacity:1,duration:0.4,delay:0.3});
  }
}

function renderDots(tries){
  const w=document.getElementById('dots');w.innerHTML='';
  for(let i=0;i<MAX;i++){
    const d=document.createElement('div');
    d.className='dot '+(i<tries?'dot-used':'dot-active');
    w.appendChild(d);
  }
}

function draw(rotDeg){
  const cv=document.getElementById('wc'),ctx=cv.getContext('2d');
  ctx.save();ctx.scale(DPR,DPR);ctx.clearRect(0,0,SZ,SZ);
  const cx=SZ/2,cy=SZ/2,r=SZ/2-6,rotR=(rotDeg-90)*Math.PI/180;

  // Wheel outer glow
  ctx.save();
  ctx.shadowColor='rgba(248,164,200,0.25)';ctx.shadowBlur=26;
  ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);
  ctx.fillStyle='rgba(13,0,8,0.01)';ctx.fill();
  ctx.restore();

  // Segments — dark luxury velvet feel
  for(let i=0;i<N;i++){
    const sa=rotR+(i*ARC)*Math.PI/180,ea=rotR+((i+1)*ARC)*Math.PI/180,seg=SEGS[i];
    // Base radial fill
    const g=ctx.createRadialGradient(cx,cy,r*.05,cx,cy,r);
    g.addColorStop(0,seg.ca);g.addColorStop(1,seg.cb);
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,sa,ea);ctx.closePath();
    ctx.fillStyle=g;ctx.fill();
    // Subtle rose nacré edge shimmer
    const sh=ctx.createRadialGradient(cx,cy,r*.68,cx,cy,r);
    sh.addColorStop(0,'rgba(255,255,255,0)');
    sh.addColorStop(1,'rgba(248,164,200,0.08)');
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,sa,ea);ctx.closePath();
    ctx.fillStyle=sh;ctx.fill();
  }

  // Divider lines — rose nacré, subtle glow
  for(let i=0;i<N;i++){
    const a=rotR+(i*ARC)*Math.PI/180;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx+15*Math.cos(a),cy+15*Math.sin(a));
    ctx.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
    ctx.strokeStyle='rgba(248,164,200,0.3)';ctx.lineWidth=1;
    ctx.shadowColor='rgba(248,164,200,0.55)';ctx.shadowBlur=4;
    ctx.stroke();ctx.restore();
  }

  // Outer shadow ring
  ctx.beginPath();ctx.arc(cx,cy,r+2,0,Math.PI*2);
  ctx.strokeStyle='rgba(0,0,0,0.85)';ctx.lineWidth=6;ctx.stroke();

  // Decorative outer ring — rose nacré / or rose gradient
  const ring=ctx.createLinearGradient(0,0,SZ,SZ);
  ring.addColorStop(0,  'rgba(248,164,200,0.92)');
  ring.addColorStop(0.3,'rgba(212,165,116,0.80)');
  ring.addColorStop(0.6,'rgba(255,220,238,0.96)');
  ring.addColorStop(1,  'rgba(248,164,200,0.92)');
  ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);
  ctx.strokeStyle=ring;ctx.lineWidth=3.5;ctx.stroke();

  // Inner accent ring
  ctx.beginPath();ctx.arc(cx,cy,r*.12,0,Math.PI*2);
  ctx.strokeStyle='rgba(248,164,200,0.35)';ctx.lineWidth=1;ctx.stroke();

  // Segment labels — clean white text, no pill background
  for(let i=0;i<N;i++){
    const mid=rotR+(i+.5)*ARC*Math.PI/180,seg=SEGS[i];
    const lx=cx+(r*.63)*Math.cos(mid),ly=cy+(r*.63)*Math.sin(mid);
    ctx.save();ctx.translate(lx,ly);ctx.rotate(mid+Math.PI/2);
    ctx.shadowColor='rgba(0,0,0,0.75)';ctx.shadowBlur=6;
    ctx.fillStyle='rgba(255,255,255,0.93)';
    ctx.font='700 13px Montserrat,Arial';
    ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText(seg.l,0,0);
    ctx.restore();
  }

  ctx.restore();
}

export function spin(){
  if(SPIN)return;SPIN=true;document.getElementById('bs').disabled=true;
  if(navigator.vibrate)navigator.vibrate([30,20,30]);

  // Pointer anticipation
  if(window.gsap){
    window.gsap.to('.pointer',{y:-6,duration:0.15,ease:'power2.in',yoyo:true,repeat:1});
  }

  const winner=Math.floor(Math.random()*N);
  const extra=6+Math.floor(Math.random()*4);
  const target=extra*360+(360-winner*ARC-ARC/2);
  const dur=5500+Math.random()*1500;

  // Pointer vibrates during spin (simulates clicking on segments)
  if(window.gsap){
    window.gsap.to('.pointer',{y:-3,duration:0.18,repeat:Math.floor(dur/360),yoyo:true,ease:'power1.inOut',delay:0.1});
  }

  const easeOut=t=>1-Math.pow(1-t,4.8);
  const start=ROT,t0=performance.now();
  function fr(now){
    const t=Math.min((now-t0)/dur,1);
    ROT=start+target*easeOut(t);draw(ROT%360);
    if(t<1)requestAnimationFrame(fr);
    else{
      ROT=ROT%360;SPIN=false;
      const tries=getT(CODE)+1;setT(CODE,tries);
      showResult(winner,tries);
    }
  }
  requestAnimationFrame(fr);
}

function sendWheelResult(code, prize, attempt) {
  fetch(SCRIPT_URL+'?'+new URLSearchParams({
    type:'wheel', ticket:code, prize:prize, attempt:String(attempt),
    ts:new Date().toISOString()
  }).toString(), {mode:'no-cors'}).catch(()=>{});
}

function showResult(winner,tries){
  const seg=SEGS[winner];
  document.getElementById('rl').textContent=seg.l;
  document.getElementById('rd').textContent=seg.d;
  document.getElementById('rc').textContent=CODE;
  document.getElementById('br').style.display=tries<MAX?'flex':'none';
  sv('vr');

  // Staggered cinematic entrance for full-screen coupon
  const sections=['#res-top','#res-bravo','#res-sub','#res-prize','#res-desc','#res-divider','#res-code','#res-cta','#res-btns'];
  if(window.gsap){
    sections.forEach((sel,i)=>{
      window.gsap.fromTo(sel,
        {opacity:0, y: sel==='#res-prize'?0:20, scale: sel==='#res-prize'?0.6:1},
        {opacity:1, y:0, scale:1, duration: sel==='#res-prize'?0.65:0.5, ease: sel==='#res-prize'?'back.out(2)':'power2.out', delay:0.1+i*0.1}
      );
    });
  }

  // Send to Google Sheets
  sendWheelResult(CODE, seg.l, tries);

  // Vibrate + confetti loop
  setTimeout(()=>{
    if(navigator.vibrate)navigator.vibrate([50,30,80,30,50]);
    launchConfettiLoop(6);
  },400);
}

export function retry(){
  const tries=getT(CODE);if(tries>=MAX){sv('vb');return;}
  SPIN=false;initWheel(CODE,tries);sv('vw');
}

export function back(){
  CODE='';document.getElementById('ci').value='';
  document.getElementById('bv').disabled=true;sv('vl');
}

initParticles();
sv('vl');
