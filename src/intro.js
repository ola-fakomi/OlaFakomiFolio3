import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { AW, AH, FRAMES, HERO_OFFSET } from './intro-frames.js';

gsap.registerPlugin(ScrollTrigger);

// ─── Lenis smooth scroll ──────────────────────────────────────────────────────
const lenis = new Lenis({ autoRaf: false });
window.__lenis = lenis; // expose for other scripts (e.g. card stack)

// Keep ScrollTrigger in sync with Lenis's virtual scroll position
lenis.on('scroll', ScrollTrigger.update);

// Drive Lenis from GSAP's ticker so both run on the same frame
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// ─── Coordinate helpers ───────────────────────────────────────────────────────
const sy = v => (v / AH) * window.innerHeight;
const posNow  = ([_x, y, r = 0]) => ({ y: sy(y), rotation: r });
const posLive = ([_x, y, r = 0]) => ({ y: () => sy(y), rotation: r });
const selectors = Object.keys(FRAMES);

// ─── Skip intro when navigating from within the site ─────────────────────────
// Only skip if the user arrived via an internal link (referrer is same origin).
// Fresh loads, direct URL visits, and page refreshes all play the full intro.
const fromInternal = (() => {
  try {
    const ref = new URL(document.referrer);
    // Same origin but different page — genuine internal navigation (not a reload)
    return ref.origin === location.origin && ref.pathname !== location.pathname;
  }
  catch (e) { return false; }
})();

if (fromInternal) {
  // ─── Internal navigation: start at hero, keep intro scrollable upward ────
  document.documentElement.classList.remove('js-intro');

  if (window.innerWidth <= 809) {
    // Mobile: just reveal hero content, no scroll animation
    gsap.set('.intro-copy', { y: 0 });
    gsap.set('nav', { opacity: 1 });
    document.querySelectorAll('.intro-item, .intro-copy').forEach(el => {
      el.style.visibility = 'visible';
    });
  } else {
    // Desktop: place items at frame 3 so the scrub owns their state.
    selectors.forEach(sel =>
      gsap.set(sel, { xPercent: -50, yPercent: -50, ...posNow(FRAMES[sel][2]) })
    );
    gsap.set('.intro-copy', { y: sy(HERO_OFFSET[2]) });
    gsap.set('nav', { opacity: 0 });
    document.querySelectorAll('.intro-item, .intro-copy').forEach(el => {
      el.style.visibility = 'visible';
    });

    // scrub:true = no lag, so jumping to the end snaps the animation to frame 6 instantly.
    startScrollPart(FRAMES, HERO_OFFSET, true);

    // Jump to the end of the pin (62% vh → 100% progress → frame 6 / hero fully visible).
    requestAnimationFrame(() => {
      lenis.scrollTo(Math.round(window.innerHeight * 0.62), { immediate: true });
    });
  }
  // No ScrollTrigger.refresh() on load — it would snap the scroll back after assets load.

} else {

  // ─── Fresh load / refresh: play full intro from the top ──────────────────
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  lenis.scrollTo(0, { immediate: true });

  // ─── Reduced-motion: skip straight to the frame-6 state ──────────────────
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    selectors.forEach(sel =>
      gsap.set(sel, { xPercent: -50, yPercent: -50, ...posNow(FRAMES[sel][5]) })
    );
    gsap.set('.intro-copy', { y: 0 });
    gsap.set('nav', { opacity: 1 });
  } else {
    // ─── gsap.matchMedia: desktop vs mobile ──────────────────────────────────
    const mm = gsap.matchMedia();
    mm.add('(min-width: 810px)', () => boot(FRAMES, HERO_OFFSET));
    mm.add('(max-width: 809px)', () => {
      // Mobile: skip intro animation — jump straight to hero state
      gsap.set('.intro-copy', { y: 0 });
      gsap.set('nav', { opacity: 1 });
      document.querySelectorAll('.intro-item, .intro-copy').forEach(el => {
        el.style.visibility = 'visible';
      });
      document.documentElement.classList.remove('js-intro');
    });
  }

  // Recalculate once all images and fonts have loaded.
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

// ─── boot: place items at frame 1 and kick off the two-part animation ─────────
function boot(frames, heroOffset) {
  selectors.forEach(sel =>
    gsap.set(sel, { xPercent: -50, yPercent: -50, ...posNow(frames[sel][0]) })
  );
  gsap.set('.intro-copy', { y: sy(heroOffset[0]) });
  gsap.set('nav', { opacity: 0 });

  // Reveal elements now that GSAP has placed them in their correct starting positions.
  // Must use 'visible' as inline style to override the html.js-intro CSS class rule.
  document.querySelectorAll('.intro-item, .intro-copy').forEach(el => {
    el.style.visibility = 'visible';
  });

  lockScroll(true);

  // ─── Part 1: auto-play frames 1 → 2 → 3 ───────────────────────────────────
  const part1 = gsap.timeline({
    delay: 0.3,
    onComplete() { startScrollPart(frames, heroOffset); heroCheckpoint(); },
  });


  selectors.forEach(sel => {
    part1.to(
      sel,
      {
        keyframes: {
          '45%': posNow(frames[sel][1]),
          '100%': posNow(frames[sel][2]),
          easeEach: 'none',
        },
        duration: 2.2,
        ease: 'power3.inOut',
      },
      0 // all items start simultaneously
    );
  });
}

// ─── Part 2: scroll-scrubbed frames 3 → 4 → 5 → 6 ───────────────────────────
function startScrollPart(frames, heroOffset, scrub = 1) {
  lockScroll(false);
  document.documentElement.classList.remove('js-intro');

  const tl = gsap.timeline({
    defaults: { ease: 'none', duration: 1 },
    scrollTrigger: {
      trigger: '#intro',
      start: 'top top',
      end: '+=62%',
      pin: true,
      scrub,
      invalidateOnRefresh: true,
      onUpdate() {
        const hello = document.querySelector('.intro-hello');
        const atTop = hello ? hello.getBoundingClientRect().top <= 0 : false;
        document.getElementById('intro')
          ?.classList.toggle('intro-hero-visible', atTop);
      },
    },
  });

  // Animate to frames 4, 5, 6 (indices 3, 4, 5) at timeline positions 0, 1, 2.
  [3, 4, 5].forEach((frameIdx, t) => {
    selectors.forEach(sel => tl.to(sel, posLive(frames[sel][frameIdx]), t));
    tl.to('.intro-copy', { y: () => sy(heroOffset[frameIdx]) }, t);
  });

  // Fade the nav in near the end once items are mostly off-screen.
  tl.to('nav', { opacity: 1, duration: 0.4 }, 2.6);
}

// ─── Hero scroll checkpoint ───────────────────────────────────────────────────
// After the intro animation completes, intercept the first scroll that overshoots
// the hero position and snap back to it. The next deliberate scroll continues freely.
function heroCheckpoint() {
  const snapY = Math.round(window.innerHeight * 0.62);
  let snapped = false;

  function onScroll({ scroll }) {
    if (snapped || scroll <= snapY + 5) return;
    snapped = true;
    lenis.off('scroll', onScroll);
    lenis.scrollTo(snapY, { immediate: true });
  }

  lenis.on('scroll', onScroll);
}

// ─── Scroll lock helpers ──────────────────────────────────────────────────────
function lockScroll(on) {
  document.documentElement.classList.toggle('intro-locked', on);
  if (on) { lenis.stop(); } else { lenis.start(); }
}

// ─── Hover tilt on floating intro items ──────────────────────────────────────
document.querySelectorAll('.intro-item:not(.intro-hello)').forEach(el => {
  let baseRot = 0;
  let hovered = false;

  el.addEventListener('mouseenter', () => {
    if (hovered) return;
    hovered = true;
    baseRot = gsap.getProperty(el, 'rotation');
    gsap.to(el, { rotation: baseRot + 12, duration: 0.45, ease: 'back.out(1.7)', overwrite: 'auto' });
  });

  el.addEventListener('mouseleave', () => {
    if (!hovered) return;
    hovered = false;
    gsap.to(el, { rotation: baseRot, duration: 0.45, ease: 'back.out(1.7)', overwrite: 'auto' });
  });
});

