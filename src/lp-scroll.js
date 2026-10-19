import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ROTATIONS = [2, -2, 2];

document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.lp-section');
  const wrapper = document.querySelector('.lp-wrapper');
  const cards   = [...document.querySelectorAll('.lp-card')];
  if (!section || !wrapper || !cards.length) return;

  let ctx;

  function init() {
    ctx?.revert();
    wrapper.style.height = ''; // reset before recalculating

    ctx = gsap.context(() => {
      const vh       = window.innerHeight;
      const cardH    = cards[0].offsetHeight;
      const isMobile = window.innerWidth <= 860;
      const GAP      = isMobile ? Math.round(vh / 4) : Math.round(vh / 2);

      // Park cards in a chain below the viewport
      cards.forEach((card, i) => {
        gsap.set(card, {
          xPercent: -50,
          rotation: ROTATIONS[i],
          y: vh + 20 + i * (cardH + GAP),
        });
      });

      // All cards move this many pixels to clear card 3 off the top
      const totalTravel = vh + 20 + 2 * (cardH + GAP) + cardH + 50;

      // Text-only phase before cards start (0 on mobile — first card enters immediately)
      const textPhase = isMobile ? 0 : Math.round(vh / 3);
      const totalPin  = textPhase + totalTravel;

      // The wrapper height = totalPin + vh so that:
      //   ScrollTrigger 'top top' → 'bottom bottom' covers exactly totalPin of scroll.
      // When wrapper's bottom clears the viewport, the sticky section releases
      // and the next section (decks) follows with zero gap.
      wrapper.style.height = (totalPin + vh) + 'px';

      const inner = section.querySelector('.lp-inner');
      const bg    = section.querySelector('.lp-bg');
      const tl    = gsap.timeline();

      // All 3 cards move together by totalTravel — constant vh/2 gap maintained
      tl.to(cards, {
        y:        `-=${totalTravel}`,
        ease:     'none',
        duration: totalTravel / totalPin,
      }, textPhase / totalPin);

      // Fade text + bg as the last card is nearly gone
      tl.to([inner, bg], { opacity: 0, ease: 'none', duration: 0.07 }, 0.93);

      // No pin:true — sticky CSS handles the visual lock.
      // When wrapper ends, section unsticks and decks appears immediately below.
      ScrollTrigger.create({
        trigger:   wrapper,
        start:     'top top',
        end:       'bottom bottom',
        scrub:     0.8,
        animation: tl,
      });
    });
  }

  init();

  // Re-init after images/fonts finish loading so card heights are accurate.
  // DOMContentLoaded can fire before images are rendered, causing wrong cardH
  // and stale y-positions that produce visible overlaps until page refresh.
  window.addEventListener('load', () => {
    init();
    ScrollTrigger.refresh();
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(init, 200);
  });
});
