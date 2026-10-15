import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AW, AH, FRAMES, HERO_OFFSET } from './intro-frames.js';

gsap.registerPlugin(ScrollTrigger);

// Always start the page at the very top so the intro plays in full.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// ─── Coordinate helpers ───────────────────────────────────────────────────────
// Scale artboard units → current viewport pixels at call time.
// x is intentionally excluded — horizontal position is set via CSS `left` percentages
// so it stays fixed relative to the viewport on every screen size and never moves on scroll.
const sy = v => (v / AH) * window.innerHeight;

// Snapshot values for the auto-play timeline (captured once, not reactive).
const posNow  = ([_x, y, r = 0]) => ({ y: sy(y), rotation: r });

// Function-based values for the scroll timeline (recalculated on every resize).
const posLive = ([_x, y, r = 0]) => ({ y: () => sy(y), rotation: r });

const selectors = Object.keys(FRAMES);

// ─── Reduced-motion: skip straight to the frame-6 state ──────────────────────
if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
  selectors.forEach(sel =>
    gsap.set(sel, { xPercent: -50, yPercent: -50, ...posNow(FRAMES[sel][5]) })
  );
  gsap.set('.intro-copy', { y: 0 });
  gsap.set('nav', { opacity: 1 });
} else {
  // ─── gsap.matchMedia: desktop vs mobile ────────────────────────────────────
  // TODO: swap in FRAMES_MOBILE / HERO_OFFSET_MOBILE for the mobile branch
  //       once those values are added to intro-frames.js.
  const mm = gsap.matchMedia();
  mm.add('(min-width: 810px)', () => boot(FRAMES, HERO_OFFSET));
  mm.add('(max-width: 809px)', () => boot(FRAMES, HERO_OFFSET)); // TODO: mobile frames
}

// Recalculate once all images and fonts have loaded.
window.addEventListener('load', () => ScrollTrigger.refresh());

// ─── boot: place items at frame 1 and kick off the two-part animation ─────────
function boot(frames, heroOffset) {
  selectors.forEach(sel =>
    gsap.set(sel, { xPercent: -50, yPercent: -50, ...posNow(frames[sel][0]) })
  );
  gsap.set('.intro-copy', { y: sy(heroOffset[0]) });
  gsap.set('nav', { opacity: 0 });

  lockScroll(true);

  // ─── Part 1: auto-play frames 1 → 2 → 3 ───────────────────────────────────
  const part1 = gsap.timeline({
    delay: 0.3,
    onComplete() { startScrollPart(frames, heroOffset); },
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
function startScrollPart(frames, heroOffset) {
  lockScroll(false);
  document.documentElement.classList.remove('js-intro');

  const tl = gsap.timeline({
    defaults: { ease: 'none', duration: 1 },
    scrollTrigger: {
      trigger: '#intro',
      start: 'top top',
      end: '+=62%',     // spacer ≈ 1395px at 813px vh — (110+62)%×813=1401px
      pin: true,         // keeps #intro fixed while the user scrolls
      scrub: 1,          // ties timeline progress to the scrollbar (1 s smoothing)
      invalidateOnRefresh: true,
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

// ─── Scroll lock helpers ──────────────────────────────────────────────────────
function preventDefault(e) { e.preventDefault(); }

function lockScroll(on) {
  document.documentElement.classList.toggle('intro-locked', on);
  const method = on ? 'addEventListener' : 'removeEventListener';
  ['wheel', 'touchmove'].forEach(evt =>
    window[method](evt, preventDefault, { passive: false })
  );
}
