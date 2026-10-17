// ─── Shared sound system — imported by all pages ─────────────────────────────
// Guard: only initialise once per page (index.html has its own inline audio for
// page-specific sounds; this module handles everything else without conflicts).
if (window.__soundsReady) { /* already running */ }
else {

window.__soundsReady = true;

let _ctx;
function getCtx() {
  if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (_ctx.state === 'suspended') _ctx.resume();
  return _ctx;
}

// Soft sine tick — used for hover enter / leave
function playTick(freq = 750, vol = 0.10, dur = 0.055) {
  const ctx = getCtx();
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  osc.type = 'sine';
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(vol, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + dur);
}

// Noise burst — click / confirm
function playClick() {
  const ctx = getCtx();
  const dur  = 0.018;
  const buf  = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 4);
  }
  const src    = ctx.createBufferSource();
  src.buffer   = buf;
  const filter = ctx.createBiquadFilter();
  filter.type  = 'bandpass';
  filter.frequency.value = 1800;
  filter.Q.value = 1.0;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.09, ctx.currentTime);
  src.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
  src.start(); src.stop(ctx.currentTime + dur);
}

// Expose so page-specific inline scripts can reuse without a second AudioContext
window.__playTick  = playTick;
window.__playClick = playClick;

// ── Attach to elements ────────────────────────────────────────────────────────

// Nav links
document.querySelectorAll('.nav-links a').forEach(el => {
  el.addEventListener('mouseenter', () => playTick(750, 0.10, 0.055));
});

// Nav CTA button
document.querySelectorAll('.nav-cta').forEach(el => {
  el.addEventListener('mouseenter', () => playTick(900, 0.08, 0.05));
});

// Hero buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(el => {
  el.addEventListener('mouseenter', () => playTick(750, 0.08, 0.05));
});

// Project / SP cards
document.querySelectorAll('.sp-card').forEach(el => {
  el.addEventListener('mouseenter', () => playTick(680, 0.07, 0.06));
});

// Case study cards + CTA buttons
document.querySelectorAll('.cs-case-btn').forEach(el => {
  el.addEventListener('mouseenter', () => playTick(900, 0.07, 0.05));
});

// Tab buttons
document.querySelectorAll('.sp-tab').forEach(el => {
  el.addEventListener('mouseenter', () => playTick(750, 0.07, 0.05));
});

// AI build items
document.querySelectorAll('.ai-build-item').forEach(el => {
  el.addEventListener('mouseenter', () => playTick(750, 0.08, 0.055));
});

// Graphics hero cards
document.querySelectorAll('.gfx-hero-frame').forEach(el => {
  el.addEventListener('mouseenter', () => playTick(750, 0.10, 0.055));
  el.addEventListener('mouseleave', () => playTick(1100, 0.18, 0.055));
});

// Footer social icons & nav links
document.querySelectorAll('.footer-social-icon, .footer-nav-links a, .footer-cta-btn').forEach(el => {
  el.addEventListener('mouseenter', () => playTick(750, 0.06, 0.05));
});

// Case study pills
document.querySelectorAll('.sp-case-pill').forEach(el => {
  el.addEventListener('mouseenter', () => playTick(900, 0.07, 0.05));
});

// Intro items (floating cards on homepage)
document.querySelectorAll('.intro-item:not(.intro-hello)').forEach(el => {
  el.addEventListener('mouseenter', () => playTick(750, 0.10, 0.055));
  el.addEventListener('mouseleave', () => playTick(1100, 0.18, 0.055));
});

// Global click — all links and buttons
document.addEventListener('click', e => {
  if (e.target.closest('a, button')) playClick();
}, { passive: true });

} // end guard
