'use strict';

/* ─────────────────────────────────────────
   GLOBALS
───────────────────────────────────────── */
const isTouch = window.matchMedia('(pointer:coarse)').matches;

/* ─────────────────────────────────────────
   CUSTOM CURSOR (desktop only)
   Only hides native cursor after first mouse
   movement — so it's never invisible on load.
───────────────────────────────────────── */
(function initCursor(){
  if(isTouch) return;
  const ring = document.getElementById('cRing');
  const dot  = document.getElementById('cDot');
  if(!ring || !dot) return;

  let rx=0, ry=0, dx=-200, dy=-200;
  let hasMoved = false;

  document.addEventListener('mousemove', e => {
    dx = e.clientX; dy = e.clientY;
    dot.style.left = dx + 'px';
    dot.style.top  = dy + 'px';
    if(!hasMoved){
      hasMoved = true;
      document.body.classList.add('cursor-active');
    }
  });

  (function loop(){
    rx += (dx - rx) * 0.082;
    ry += (dy - ry) * 0.082;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    // Gold bloom over interactive, ruby glow otherwise — T02 palette
    ring.style.boxShadow = document.body.classList.contains('ch')
      ? '0 0 44px 16px rgba(200,134,10,.55)'
      : '0 0 20px 4px rgba(160,24,48,.25)';
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('a, button, .ev-node, .tt, .gal-item').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('ch'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('ch'));
  });
})();

/* ─────────────────────────────────────────
   PRELOADER — 1.6s total
   300ms  → gold line draws
   700ms  → names fade up
   1600ms → preloader fades out, hero animates in
───────────────────────────────────────── */
/* ─────────────────────────────────────────
   PRELOADER — graceful reveal
   Body gets .pl-active immediately (inline
   script in <head> sets it). If JS fails or
   preloader not found, everything is visible
   by default via CSS fallback.
───────────────────────────────────────── */
function revealHero(){
  document.body.classList.remove('pl-active');
  const palace  = document.querySelector('.hl-palace');
  const flowers = document.querySelector('.hl-flowers');
  const copy    = document.getElementById('heroCopy');
  if(palace)  palace.classList.add('in');
  if(flowers) flowers.classList.add('in');
  if(copy)    copy.classList.add('in');
}

function runPreloader(){
  const pl = document.getElementById('preloader');
  if(!pl){
    revealHero();
    return;
  }
  // Step 1: draw gold line
  setTimeout(() => pl.classList.add('li'), 300);
  // Step 2: names appear
  setTimeout(() => pl.classList.add('ni'), 700);
  // Step 3: fade out preloader, reveal hero
  setTimeout(() => {
    pl.classList.add('away');
    setTimeout(() => {
      pl.style.display = 'none';
      revealHero();
    }, 500);
  }, 1600);
}

// Add pl-active to body so CSS hides elements during preload
document.body.classList.add('pl-active');

// Run when page is fully loaded; if already loaded, run immediately
if(document.readyState === 'complete'){
  runPreloader();
} else {
  window.addEventListener('load', runPreloader);
}

// Safety net: if load never fires within 4s, reveal everything
setTimeout(() => {
  if(document.body.classList.contains('pl-active')){
    revealHero();
    const pl = document.getElementById('preloader');
    if(pl) pl.style.display = 'none';
  }
}, 4000);

/* ─────────────────────────────────────────
   SCROLL-PINNED HERO DRIVER
   - Palace zooms in (scale 1→1.5) as user scrolls
   - Names positioned by JS just below palace bottom
   - Names fade as palace zooms
───────────────────────────────────────── */
const heroWrap    = document.getElementById('heroWrap');
const heroPin     = document.getElementById('heroPin');
const palaceEl    = document.getElementById('l3');
const heroCopy    = document.getElementById('heroCopy');
const scrollNudge = document.getElementById('scrollNudge');
var _snFired=false;var _snTimer=setTimeout(function(){if(scrollNudge&&!_snFired){_snFired=true;scrollNudge.style.animation='snAttention 0.9s ease-in-out forwards';setTimeout(function(){if(scrollNudge)scrollNudge.style.animation='snPulse 2.5s ease-in-out infinite';},900);}},4000);window.addEventListener('scroll',function(){if(!_snFired){_snFired=true;clearTimeout(_snTimer);}},{once:true,passive:true});
const heroMoon    = document.getElementById('heroMoon');

let raw=0, lerped=0, mouseX=0, mouseY=0, rafH=null;

function lerp(a,b,t){ return a+(b-a)*t; }

/* ── Scroll progress 0→1 ── */
function getHeroProgress(){
  if(!heroWrap) return 0;
  const top    = heroWrap.getBoundingClientRect().top + window.scrollY;
  const travel = heroWrap.offsetHeight - window.innerHeight;
  return Math.min(1, Math.max(0, (window.scrollY - top) / travel));
}

function driveHero(){
  lerped += (raw - lerped) * 0.06;
  const p  = lerped;
  const mx = isTouch ? 0 : mouseX;
  const my = isTouch ? 0 : mouseY;

  // Moon: gentle drift
  if(heroMoon)
    heroMoon.style.transform = `translateY(${p * -28 + my * -5}px) translateX(${mx * -3}px)`;

  // Palace: 3D perspective tilt on mouse + scale on scroll (Change 06)
  if(palaceEl){
    const scale = 1.0 + p * 0.45;
    const tiltX = mx * -14;
    const tiltY = my * -9;
    palaceEl.style.transform = `perspective(1400px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) translateX(calc(-50% + ${(tiltX*0.5).toFixed(1)}px)) scale(${scale})`;
    palaceEl.style.filter    = `drop-shadow(0 ${(20+p*30).toFixed(0)}px ${(50+p*40).toFixed(0)}px rgba(0,0,0,${(0.28+p*0.22).toFixed(2)})) drop-shadow(0 4px 16px rgba(200,134,10,${(0.10+p*0.08).toFixed(2)}))`;
  }

  // Names: stay fully visible until p=0.55, then dissolve with blur by p=0.88
  if(heroCopy){
    const dissolveStart = 0.55;
    const dissolveEnd   = 0.88;
    const t = Math.max(0, Math.min(1, (p - dissolveStart) / (dissolveEnd - dissolveStart)));
    heroCopy.style.opacity      = (1 - t).toFixed(3);
    heroCopy.style.transform    = `translateY(${p * -32}px)`;
    heroCopy.style.filter       = t > 0 ? `blur(${(t*16).toFixed(1)}px)` : '';
    heroCopy.style.letterSpacing = t > 0 ? (t*0.10).toFixed(3)+'em' : '';
  }

  // Scroll nudge fades immediately
  if(scrollNudge)
    scrollNudge.style.opacity = String(Math.max(0, 1 - p / 0.18));

  if(heroWrap && window.scrollY < heroWrap.offsetHeight)
    rafH = requestAnimationFrame(driveHero);
  else
    rafH = null;
}

window.addEventListener('scroll', () => {
  raw = getHeroProgress();
  if(!rafH && heroWrap && window.scrollY < heroWrap.offsetHeight)
    rafH = requestAnimationFrame(driveHero);
}, { passive: true });

// Mouse parallax on hero (desktop only)
if(!isTouch && heroPin){
  heroPin.addEventListener('mousemove', e => {
    mouseX = e.clientX / window.innerWidth  - 0.5;
    mouseY = e.clientY / window.innerHeight - 0.5;
    if(!rafH) rafH = requestAnimationFrame(driveHero);
  });
  heroPin.addEventListener('mouseleave', () => {
    mouseX = 0; mouseY = 0;
    if(!rafH) rafH = requestAnimationFrame(driveHero);
  });
}

// Nothing to do on load for hero — CSS handles positioning
window.addEventListener('resize', () => { /* reserved */ });

/* ─────────────────────────────────────────
   SKY LANTERN SYSTEM — T02 Royal Midnight
   Element 2.png = sky lantern (rises UP on dark sky).
   Screen blend so dark backgrounds show through.
   Gold glow filter for ambient lamp warmth.
   Covers ALL sections including story + gallery.
─────────────────────────────────────────── */
class Petals {
  constructor(id, opts={}){
    this.el    = document.getElementById(id);
    this.max   = opts.max  || 6;
    this.rate  = opts.rate || 1200;
    this.src   = './assets/images/elements/Element 2.webp';
    this.active= false;
    this.pool  = new Set();
    this._iv   = null;
  }

  spawn(){
    if(!this.el) return;
    if(this.pool.size >= this.max){
      const first = this.pool.values().next().value;
      first?.remove();
      this.pool.delete(first);
    }
    if(this.pool.size >= this.max) return;

    // Lanterns: varied sizes, spread across full width
    const sz    = 50 + Math.random() * 55;       // 50-105px
    const x     = 4  + Math.random() * 90;
    const dur   = 10 + Math.random() * 8;        // slower rise = more majestic
    const drift = (Math.random() - 0.5) * 80;   // gentle horizontal sway
    const tilt  = (Math.random() - 0.5) * 20;   // slight tilt as it rises

    const wrap = document.createElement('div');
    // Lanterns spawn from BOTTOM and rise UP
    wrap.style.cssText = `position:absolute;width:${sz}px;height:${sz}px;left:${x}%;bottom:-${sz}px;pointer-events:none`;

    const img = document.createElement('img');
    img.src = this.src;
    img.loading = 'lazy';
    img.style.cssText = [
      'width:100%;height:100%;object-fit:contain',
      'mix-blend-mode:screen',                   // screen on dark bg = lantern glows
      `filter:drop-shadow(0 0 12px rgba(200,134,10,.70)) drop-shadow(0 0 30px rgba(200,134,10,.35))`
    ].join(';');
    wrap.appendChild(img);

    // Rise upward: translateY goes NEGATIVE (up), with gentle sway + tilt
    const anim = wrap.animate([
      { transform: `translateY(0) translateX(0) rotate(0deg)`,                                      opacity: 0 },
      { transform: `translateY(-8vh) translateX(${drift*.15}px) rotate(${tilt*.3}deg)`,              opacity: .80, offset: .06 },
      { transform: `translateY(-55vh) translateX(${drift*.7}px) rotate(${tilt*.8}deg)`,              opacity: .65, offset: .55 },
      { transform: `translateY(-95vh) translateX(${drift}px) rotate(${tilt}deg)`,                   opacity: .30, offset: .90 },
      { transform: `translateY(-115vh) translateX(${drift}px) rotate(${tilt}deg)`,                  opacity: 0   },
    ], { duration: dur * 1000, easing: 'ease-in', fill: 'forwards' });

    anim.onfinish = () => { wrap.remove(); this.pool.delete(wrap); };
    this.el.appendChild(wrap);
    this.pool.add(wrap);
  }

  start(){
    if(this.active || !this.el) return;
    this.active = true;
    const rate = isTouch ? this.rate * 2 : this.rate;
    this._iv = setInterval(() => { if(this.active) this.spawn(); }, rate);
    this.spawn();
  }

  stop(){
    this.active = false;
    clearInterval(this._iv);
  }
}

// Lantern systems — ALL sections including story + gallery (missing in original)
const PS = {
  hero:    new Petals('petalHero',    { max: isTouch?4:8,  rate: isTouch?2000:1000 }),
  invite:  new Petals('petalInvite',  { max: isTouch?3:5,  rate: isTouch?3500:2000 }),
  events:  new Petals('petalEvents',  { max: isTouch?5:12, rate: isTouch?1800:800  }),  // denser flow
  story:   new Petals('petalStory',   { max: isTouch?2:4,  rate: isTouch?4500:2800 }),
  gallery: new Petals('petalGallery', { max: isTouch?2:4,  rate: isTouch?4500:2800 }),
  things:  new Petals('petalThings',  { max: isTouch?2:4,  rate: isTouch?5000:3000 }),
  rsvp:    new Petals('petalRsvp',    { max: isTouch?2:4,  rate: isTouch?3500:2000 }),
};

// Activate/deactivate as sections enter viewport
const sIO = new IntersectionObserver(entries => {
  entries.forEach(({ target, isIntersecting }) => {
    const id  = target.id;
    const sys = id === 'heroWrap' ? PS.hero : PS[id];
    if(sys) isIntersecting ? sys.start() : sys.stop();
  });
}, { threshold: 0.08 });

['heroWrap','invite','events','story','gallery','things','rsvp'].forEach(id => {
  const el = document.getElementById(id);
  if(el) sIO.observe(el);
});

/* ─────────────────────────────────────────
   SCROLL REVEAL
   Elements with .scroll-in animate in when
   they enter the viewport.
───────────────────────────────────────── */
const rIO = new IntersectionObserver(entries => {
  entries.forEach(({ target, isIntersecting }) => {
    if(isIntersecting){
      target.classList.add('vis');
      rIO.unobserve(target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.scroll-in').forEach(el => rIO.observe(el));

// Also observe the invite card itself for name pop-in animation
const inviteCard = document.querySelector('.invite-card');
if(inviteCard) rIO.observe(inviteCard);

/* ─────────────────────────────────────────
   EVENTS — Journey Line
   Measures rendered icon centres after layout,
   draws a smooth SVG curve through them on scroll.
───────────────────────────────────────── */
(function initEventsJourney(){
  if(window.matchMedia('(min-width:681px)').matches) return;

  const section  = document.getElementById('events');
  const stage    = document.getElementById('evStage');
  const svgEl    = document.getElementById('evJourneySvg');
  const trackEl  = document.getElementById('ejTrack');
  const drawnEl  = document.getElementById('ejDrawn');
  if(!section || !stage || !svgEl || !trackEl || !drawnEl) return;

  /* ── Get icon centre positions relative to SECTION ── */
  function getNodeCentres(){
    const nodes = Array.from(stage.querySelectorAll('.ev-node'));
    const secRect = section.getBoundingClientRect();
    return nodes.map(node => {
      const iconWrap = node.querySelector('.ev-icon-wrap');
      const r = (iconWrap || node).getBoundingClientRect();
      return {
        x: r.left + r.width  / 2 - secRect.left,
        y: r.top  + r.height / 2 - secRect.top,
      };
    });
  }

  /* ── Build smooth quadratic bezier path through all centres ── */
  function buildPath(pts){
    if(pts.length < 2) return '';
    let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for(let i = 0; i < pts.length - 1; i++){
      const a  = pts[i];
      const b  = pts[i + 1];
      const mx = ((a.x + b.x) / 2).toFixed(1);
      const my = ((a.y + b.y) / 2).toFixed(1);
      const wave = (i % 2 === 0 ? 1 : -1) * Math.min(60, Math.abs(b.x - a.x) * 0.28);
      const cy   = ((a.y + b.y) / 2 - 28).toFixed(1);
      d += ` Q ${(+mx + wave).toFixed(1)} ${cy}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
    }
    return d;
  }

  /* ── Size SVG canvas to section dimensions ── */
  function sizeSvg(){
    const w = section.offsetWidth;
    const h = section.offsetHeight;
    svgEl.setAttribute('width',   w);
    svgEl.setAttribute('height',  h);
    svgEl.setAttribute('viewBox', `0 0 ${w} ${h}`);
  }

  /* ── Full layout pass — exposed globally so config loader can re-trigger ── */
  function layout(){
    sizeSvg();
    requestAnimationFrame(() => {
      const pts  = getNodeCentres();
      const d    = buildPath(pts);
      trackEl.setAttribute('d', d);
      drawnEl.setAttribute('d', d);
      if(drawnEl.getTotalLength){
        const total = drawnEl.getTotalLength();
        drawnEl.style.strokeDasharray  = total;
        drawnEl.style.strokeDashoffset = total;
        drawnEl._total = total;
      }
      onScroll();
    });
  }

  /* ── Scroll progress: tracks user position THROUGH the section ── */
  function onScroll(){
    if(!drawnEl._total) return;
    const winH    = window.innerHeight;
    const rect    = section.getBoundingClientRect();
    const secH    = section.offsetHeight;
    const scrolled = winH - rect.top;
    const total    = secH + winH;
    const progress = Math.min(1, Math.max(0, scrolled / total));
    drawnEl.style.strokeDashoffset = (drawnEl._total * (1 - progress)).toFixed(1);
  }

  window._evJourneyLayout = layout;

  // Re-layout when section first becomes visible (fixes content-visibility timing)
  const visIO = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting){
      requestAnimationFrame(() => requestAnimationFrame(layout));
      visIO.disconnect();
    }
  }, { threshold: 0.01 });
  visIO.observe(section);

  window.addEventListener('load',   layout);
  window.addEventListener('scroll', onScroll, { passive: true });

  let rTO;
  window.addEventListener('resize', () => {
    clearTimeout(rTO);
    rTO = setTimeout(layout, 180);
  });

})();

/* ─────────────────────────────────────────
   EVENTS — Scroll-triggered detail reveal
   Details open when the node's centre crosses
   40% from the bottom of the viewport — giving
   a clear "passing through" sensation.
   On desktop (where multiple nodes show at once),
   each node only opens when it reaches the trigger zone.
───────────────────────────────────────── */
function initEventsAutoOpen(){
  // Re-read nodes fresh every time (supports config-rebuilt DOM)
  const nodes = Array.from(document.querySelectorAll('.ev-node'));
  if(!nodes.length) return;

  // Track which nodes are already revealed (never re-close)
  const revealed = new Set();

  function checkNodes(){
    const triggerLine = window.innerHeight * 0.60;
    nodes.forEach(node => {
      if(revealed.has(node)) return;
      const rect = node.getBoundingClientRect();
      const nodeCentre = rect.top + rect.height / 2;
      if(nodeCentre < triggerLine){
        revealed.add(node);
        requestAnimationFrame(() => node.classList.add('ev-active'));
      }
    });
  }

  window.addEventListener('scroll', checkNodes, { passive: true });
  window.addEventListener('load', checkNodes);
  // Also check immediately (page may already be scrolled)
  checkNodes();
}

// Run on initial page load
initEventsAutoOpen();

/* ─────────────────────────────────────────
   STORY — Theatrical Curtain Reveal
   Phase 1 (IntersectionObserver fires):
     - Characters do pull animation
   Phase 2 (300ms later):
     - Tension animation
   Phase 3 (800ms later):
     - Scroll-driven curtain open starts
     - Characters drift outward with curtains
   Phase 4 (curtain > 70% open):
     - Content reveals with CSS stagger
     - Petals spawn
───────────────────────────────────────── */
(function initCurtainReveal(){

  const section  = document.getElementById('story');
  const stage    = document.getElementById('stStage');
  const bride    = document.getElementById('stBride');
  const groom    = document.getElementById('stGroom');
  const curtL    = document.getElementById('stCurtL');
  const curtR    = document.getElementById('stCurtR');
  const reveal   = document.getElementById('stReveal');
  const petalsEl = document.getElementById('stPetals');

  if(!section || !stage || !bride || !curtL || !curtR) return;

  let sequenceDone = false;  // pull+tension phase fired
  let openEnabled  = false;  // scroll-driven phase unlocked
  let revealed     = false;
  let lastP        = 0;

  /* ── Spawn petal ── */
  function spawnPetal(){
    if(!petalsEl) return;
    const sz  = 5 + Math.random() * 10;
    const x   = 10 + Math.random() * 80;
    const dur = 5000 + Math.random() * 4000;
    const dx  = (Math.random() - 0.5) * 90;
    // T02 story petals — ruby, gold, jade on dark stage
    const COLS = ['rgba(160,24,48,.25)','rgba(200,134,10,.20)','rgba(107,142,122,.22)','rgba(240,224,176,.35)'];
    const col  = COLS[Math.floor(Math.random()*COLS.length)];
    const el   = document.createElement('div');
    el.style.cssText = `position:absolute;width:${sz}px;height:${sz}px;left:${x}%;top:-${sz}px;pointer-events:none;border-radius:50% 10% 50% 10%;background:${col};mix-blend-mode:multiply`;
    petalsEl.appendChild(el);
    el.animate([
      { transform:'translateY(0) translateX(0) rotate(0deg)',                      opacity:0     },
      { transform:`translateY(4vh) translateX(${dx*.1}px) rotate(40deg)`,          opacity:.9, offset:.05 },
      { transform:`translateY(60vh) translateX(${dx*.85}px) rotate(230deg)`,       opacity:.4, offset:.85 },
      { transform:`translateY(90vh) translateX(${dx}px) rotate(360deg)`,           opacity:0     },
    ], { duration:dur, easing:'linear', fill:'forwards' }).onfinish = ()=> el.remove();
  }

  /* ── Phase 1+2: Pull → tension → unlock scroll ── */
  function runSequence(){
    if(sequenceDone) return;
    sequenceDone = true;

    // Phase 1 — Pull
    bride.classList.add('st-pull');
    groom.classList.add('st-pull');

    // Phase 2 — Tension (715ms)
    setTimeout(() => {
      bride.classList.remove('st-pull');
      groom.classList.remove('st-pull');
      bride.classList.add('st-tension');
      groom.classList.add('st-tension');
    }, 715);

    // Phase 3 — Enable scroll-driven open (1235ms)
    setTimeout(() => {
      bride.classList.remove('st-tension');
      groom.classList.remove('st-tension');
      openEnabled = true;
      // Apply current scroll progress immediately in case user already scrolled
      applyProgress(getCurtainProgress());
    }, 1235);
  }

  /* ── Scroll progress for curtain (0→1) ──
     Starts once section centre crosses viewport bottom-40%.
     Completes over 70vh of scroll travel.
  */
  function getCurtainProgress(){
    if(!openEnabled) return 0;
    const rect  = section.getBoundingClientRect();
    const start = window.innerHeight * 0.55;
    const range = window.innerHeight * 0.91;   /* 30% slower: 0.70 → 0.91 */
    return Math.min(1, Math.max(0, (start - rect.top) / range));
  }

  /* ── Apply curtain + character position for progress p ── */
  function applyProgress(p){
    if(Math.abs(p - lastP) < 0.002) return;
    lastP = p;

    // Curtain slides — cubic overshoot for dramatic feel (Change 05/T02)
    const eased = p < 1 ? 1 - Math.pow(1 - p, 3.2) : 1;
    curtL.style.transform = `translateX(-${(eased * 100).toFixed(2)}%)`;
    curtR.style.transform = `translateX(${(eased  * 100).toFixed(2)}%)`;
    // Shadow grows on inner edges as curtains open — physical weight on dark stage
    curtL.style.filter = `drop-shadow(${(eased*30).toFixed(1)}px 0 36px rgba(0,0,0,${(eased*.65).toFixed(2)}))`;
    curtR.style.filter = `drop-shadow(-${(eased*30).toFixed(1)}px 0 36px rgba(0,0,0,${(eased*.65).toFixed(2)}))`;

    // Characters follow curtain outward (drift + slight scale down as they "recede")
    const charDrift = eased * 28;  // px outward
    const charScale = 1 - eased * 0.04;
    bride.style.transform = `translateX(-${charDrift.toFixed(1)}px) scale(${charScale.toFixed(3)})`;
    groom.style.transform = `translateX(${charDrift.toFixed(1)}px)  scale(${charScale.toFixed(3)})`;

    // Reveal content once curtain is 70% open
    if(eased >= 0.70 && !revealed){
      revealed = true;
      reveal.classList.add('revealed');
      let n = 0;
      const iv = setInterval(() => { spawnPetal(); if(++n >= 28) clearInterval(iv); }, 160);
    }
  }

  /* ── Scroll listener ── */
  window.addEventListener('scroll', () => {
    applyProgress(getCurtainProgress());
  }, { passive:true });

  /* ── IntersectionObserver fires the pull sequence ── */
  const io = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting && entries[0].intersectionRatio >= 0.22){
      runSequence();
      io.disconnect();
    }
  }, { threshold: [0.22] });
  io.observe(section);

  /* ── Resize: reapply ── */
  let rTO;
  window.addEventListener('resize', () => {
    clearTimeout(rTO);
    rTO = setTimeout(() => applyProgress(getCurtainProgress()), 150);
  });

})();


/* ─────────────────────────────────────────
   RSVP — WhatsApp button petal burst on click
───────────────────────────────────────── */
(function initRsvpBtn(){
  const btn = document.getElementById('rsvpWaBtn');
  if(!btn) return;

  btn.addEventListener('click', () => {
    burstPetals(btn);
  });
})();

/* ─────────────────────────────────────────
   RSVP PETAL BURST
   Petals explode outward from button on click
───────────────────────────────────────── */
function burstPetals(fromEl){
  const r   = fromEl.getBoundingClientRect();
  const cx  = r.left + r.width  / 2;
  const cy  = r.top  + r.height / 2;
  const src = './assets/images/elements/Element 2.webp';

  for(let i = 0; i < 18; i++){
    const el  = document.createElement('div');
    el.className = 'burst-p';
    const sz  = 10 + Math.random() * 16;
    const ang = (i / 18) * 360 + Math.random() * 18;
    const dst = 60 + Math.random() * 80;
    const tx  = Math.cos(ang * Math.PI / 180) * dst;
    const ty  = Math.sin(ang * Math.PI / 180) * dst;
    el.style.cssText = `left:${cx}px;top:${cy}px;width:${sz}px;height:${sz}px;transform:translate(-50%,-50%);position:fixed;pointer-events:none;z-index:9000`;
    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = 'width:100%;height:100%;object-fit:contain;mix-blend-mode:multiply';
    el.appendChild(img);
    document.body.appendChild(el);
    el.animate([
      { transform:`translate(-50%,-50%) scale(.2) rotate(0deg)`, opacity:1 },
      { transform:`translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1.1) rotate(${Math.random()*360}deg)`, opacity:.85, offset:.45 },
      { transform:`translate(calc(-50% + ${tx*1.5}px), calc(-50% + ${ty*1.5+50}px)) scale(.3) rotate(${Math.random()*560}deg)`, opacity:0 },
    ], { duration:900 + Math.random()*400, easing:'ease-out', fill:'forwards' })
    .onfinish = () => el.remove();
  }
}

/* ─────────────────────────────────────────
   3D CARD TILT — events + gallery (Change 07/T02)
─────────────────────────────────────────── */
(function initCardTilt(){
  function attachMouseTilt(el){
    if(el._tiltAttached) return;
    el._tiltAttached = true;
    el.addEventListener('mousemove', function(e){
      const r = this.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      this.style.transition = 'transform 0.08s ease';
      this.style.transform  = `perspective(900px) rotateX(${(y*-13).toFixed(2)}deg) rotateY(${(x*16).toFixed(2)}deg) scale(1.035)`;
    });
    el.addEventListener('mouseleave', function(){
      this.style.transition = 'transform 0.55s cubic-bezier(0.34,1.56,0.64,1)';
      this.style.transform  = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }
  function attachTouchTilt(el){
    if(el._touchTiltAttached) return;
    el._touchTiltAttached = true;
    el.addEventListener('touchmove', function(e){
      if(e.touches.length !== 1) return;
      const r = this.getBoundingClientRect();
      const x = (e.touches[0].clientX - r.left) / r.width  - 0.5;
      const y = (e.touches[0].clientY - r.top)  / r.height - 0.5;
      this.style.transition = 'transform 0.05s ease';
      this.style.transform  = `perspective(700px) rotateX(${(y*-8).toFixed(2)}deg) rotateY(${(x*10).toFixed(2)}deg) scale(1.025)`;
    }, {passive:true});
    el.addEventListener('touchend', function(){
      this.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
      this.style.transform  = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }
  function attachTilt(el){ attachMouseTilt(el); attachTouchTilt(el); }
  document.querySelectorAll('.ev-node, .gal-item').forEach(attachTilt);
  const _orig = window.initEventsAutoOpen;
  window.initEventsAutoOpen = function(){
    if(typeof _orig === 'function') _orig();
    document.querySelectorAll('.ev-node').forEach(attachTilt);
  };
})();

/* ─────────────────────────────────────────
   HERO COUNTDOWN TIMER (Change 12/T02)
   Reads WEDDING_CONFIG.couple.date.
   Falls back to 12 Dec 2026.
─────────────────────────────────────────── */
(function initCountdown(){
  const el = document.getElementById('heroCountdown');
  if(!el) return;
  function getTarget(){
    try{
      if(typeof WEDDING_CONFIG !== 'undefined' && WEDDING_CONFIG.couple && WEDDING_CONFIG.couple.date){
        const d = new Date(WEDDING_CONFIG.couple.date + 'T00:00:00');
        if(!isNaN(d)) return d;
      }
    }catch(e){}
    return new Date('2026-12-12T00:00:00');
  }
  function pad(n){ return String(n).padStart(2,'0'); }
  function tick(){
    const diff = getTarget() - Date.now();
    if(diff <= 0){
      el.innerHTML = '<span class="hc-cd-unit"><span class="hc-cd-num" style="font-size:clamp(.65rem,1.6vw,1rem);color:var(--gold)">We\'re Married ♥</span></span>';
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000)  / 60000);
    const s = Math.floor((diff % 60000)    / 1000);
    el.innerHTML =
      `<span class="hc-cd-unit"><span class="hc-cd-num">${d}</span><span class="hc-cd-label">Days</span></span>` +
      `<span class="hc-cd-sep">·</span>` +
      `<span class="hc-cd-unit"><span class="hc-cd-num">${pad(h)}</span><span class="hc-cd-label">Hrs</span></span>` +
      `<span class="hc-cd-sep">·</span>` +
      `<span class="hc-cd-unit"><span class="hc-cd-num">${pad(m)}</span><span class="hc-cd-label">Min</span></span>` +
      `<span class="hc-cd-sep">·</span>` +
      `<span class="hc-cd-unit"><span class="hc-cd-num">${pad(s)}</span><span class="hc-cd-label">Sec</span></span>`;
  }
  tick();
  setInterval(tick, 1000);
})();

/* ─────────────────────────────────────────
   ELEPHANT CONFETTI SYSTEM
   Canvas-based confetti rains from trunk tips
   of both elephants, cascading into invitation.

   HOW IT WORKS:
   - Each particle starts at the trunk tip position
   - Falls with gravity + gentle horizontal drift
   - Rotates continuously while falling
   - Colours sampled from the wedding palette
   - Particles that exit bottom are recycled to top
─────────────────────────────────────────── */
(function initElephantConfetti(){

  const rainCanvas = document.getElementById('confettiRain');
  if(!rainCanvas) return;
  const bridge = document.getElementById('elephBridge');
  if(!bridge) return;

  const ctx = rainCanvas.getContext('2d');

  // ── Resize canvas exactly to bridge + overflow ──
  const OVERFLOW = 200; // px confetti spills below bridge into invite
  function resizeCanvas(){
    rainCanvas.width  = bridge.offsetWidth;
    rainCanvas.height = bridge.offsetHeight + OVERFLOW;
    rainCanvas.style.height = (bridge.offsetHeight + OVERFLOW) + 'px';
  }

  // ── Trunk tip: measured from actual elephant DOM element ──
  // Left elephant:  trunk tip is at the RIGHT edge, near the TOP of the img
  // Right elephant: trunk tip is at the LEFT  edge, near the TOP of the img
  // We use getBoundingClientRect() relative to the bridge to get true px coords.
  // These ratios (trunkX, trunkY as fraction of the elephant img dimensions)
  // are calibrated to the paper-cut elephant illustrations.
  // If using your own Firefly images, adjust TRUNK_X_FRAC / TRUNK_Y_FRAC below.
  const TRUNK = {
    // Fraction of elephant IMG width/height where trunk tip appears
    // Left elephant (facing right): tip is at ~85% width, ~10% height
    left:  { xFrac: 0.85, yFrac: 0.10 },
    // Right elephant (facing left, mirrored): tip is at ~15% width, ~10% height
    right: { xFrac: 0.15, yFrac: 0.10 },
  };

  function getTrunkTips(){
    const bridgeRect = bridge.getBoundingClientRect();

    // Find elephant image elements (or SVG fallback if no image)
    const elephLEl = document.querySelector('#elephL img, #elephL .eleph-svg');
    const elephREl = document.querySelector('#elephR img, #elephR .eleph-svg');

    let leftTip, rightTip;

    if(elephLEl){
      const r = elephLEl.getBoundingClientRect();
      leftTip = {
        x: (r.left - bridgeRect.left) + r.width  * TRUNK.left.xFrac,
        y: (r.top  - bridgeRect.top)  + r.height * TRUNK.left.yFrac,
      };
    } else {
      // Absolute fallback if DOM not ready
      leftTip = { x: bridge.offsetWidth * 0.28, y: bridge.offsetHeight * 0.12 };
    }

    if(elephREl){
      const r = elephREl.getBoundingClientRect();
      rightTip = {
        x: (r.left - bridgeRect.left) + r.width  * TRUNK.right.xFrac,
        y: (r.top  - bridgeRect.top)  + r.height * TRUNK.right.yFrac,
      };
    } else {
      rightTip = { x: bridge.offsetWidth * 0.72, y: bridge.offsetHeight * 0.12 };
    }

    return { left: leftTip, right: rightTip };
  }

  // ── Re-measure tips on resize so confetti always tracks trunk ──
  let tips = { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } };
  function refreshLayout(){
    resizeCanvas();
    tips = getTrunkTips();
    // Reset all particles to new trunk positions
    particles?.forEach(p => {
      const origin = p.side === 'left' ? tips.left : tips.right;
      p.ox = origin.x;
      p.oy = origin.y;
    });
  }

  // Debounced resize — don't thrash on every pixel of drag
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(refreshLayout, 120);
  });

  // ── T02 Royal Midnight Mewar palette ──
  // Ruby red · aged ivory · burnished gold · jade · royal blue · silk gold · parchment · deep crimson
  const COLOURS = ['#A01830','#F0E0B0','#C8860A','#6B8E7A','#1A2C5B','#E8C060','#FAF4E4','#C8380A'];
  const SHAPES  = ['rect','circle','petal'];

  // ── Particle ──
  class Particle {
    constructor(side){
      this.side = side;
      const origin = side === 'left' ? tips.left : tips.right;
      this.ox = origin.x;
      this.oy = origin.y;
      this.initRandom();
      // Stagger so they don't all start at trunk tip simultaneously
      this.y = Math.random() * (bridge.offsetHeight + OVERFLOW);
    }

    initRandom(){
      const dir = this.side === 'left' ? 1 : -1;
      this.x     = this.ox + (Math.random() - 0.5) * 20;
      this.y     = this.oy + Math.random() * 10;
      this.vx    = dir * (0.4 + Math.random() * 1.4) + (Math.random() - 0.5) * 0.6;
      this.vy    = 0.6 + Math.random() * 1.8;
      this.vr    = (Math.random() - 0.5) * 5;
      this.rot   = Math.random() * 360;
      this.sz    = 5 + Math.random() * 9;
      this.colour= COLOURS[Math.floor(Math.random() * COLOURS.length)];
      this.shape = SHAPES [Math.floor(Math.random() * SHAPES.length)];
      this.alpha = 0.7 + Math.random() * 0.3;
      this.decay = 0.001 + Math.random() * 0.001;
    }

    update(canvasH){
      this.x   += this.vx;
      this.vy  += 0.035;          // gravity
      this.y   += this.vy;
      this.rot += this.vr;
      this.alpha -= this.decay;

      if(this.y > canvasH + 10 || this.alpha <= 0){
        // Recycle back to measured trunk tip
        const origin = this.side === 'left' ? tips.left : tips.right;
        this.ox = origin.x;
        this.oy = origin.y;
        this.initRandom();
      }
    }

    draw(ctx){
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle   = this.colour;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot * Math.PI / 180);
      const s = this.sz;
      if(this.shape === 'rect'){
        ctx.fillRect(-s/2, -s/4, s, s/2);
      } else if(this.shape === 'circle'){
        ctx.beginPath(); ctx.arc(0, 0, s/2, 0, Math.PI*2); ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(0, -s/2);
        ctx.quadraticCurveTo(s/2, 0, 0, s/2);
        ctx.quadraticCurveTo(-s/2, 0, 0, -s/2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  // ── Build particle pool after first layout measurement ──
  const COUNT = isTouch ? 60 : 110;
  let particles = [];

  function buildParticles(){
    particles = [];
    for(let i = 0; i < COUNT; i++){
      particles.push(new Particle(i < COUNT/2 ? 'left' : 'right'));
    }
  }

  // ── Render loop ──
  function animate(){
    ctx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
    particles.forEach(p => { p.update(rainCanvas.height); p.draw(ctx); });
    requestAnimationFrame(animate);
  }

  // ── Start once bridge is in viewport AND images have had time to lay out ──
  const io = new IntersectionObserver(([entry]) => {
    if(!entry.isIntersecting) return;
    io.disconnect();
    // Wait one frame for images to have real dimensions
    requestAnimationFrame(() => {
      refreshLayout();
      buildParticles();
      animate();
    });
  }, { threshold: 0.1 });
  io.observe(bridge);

})();