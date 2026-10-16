import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GAP       = 160;          // px of scroll gap between each card
const ROTATIONS = [2, -2, 2];  // degrees: card 1, 2, 3

document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.lp-section');
  const cards   = [...document.querySelectorAll('.lp-card')];
  if (!section || !cards.length) return;

  let ctx;

  function init() {
    ctx?.revert();

    ctx = gsap.context(() => {
      const vh    = window.innerHeight;
      const cardH = cards[0].offsetHeight;

      // Distance each card travels: enters from bottom of vp, exits above section top
      const singleTrip = vh + cardH;
      // Total pinned scroll: 3 card trips + 2 x 160px gaps between them
      const totalPin   = singleTrip * cards.length + GAP * (cards.length - 1);

      // Park all cards off-screen below with their rotations
      cards.forEach((card, i) => {
        gsap.set(card, {
          xPercent: -50,
          rotation: ROTATIONS[i],
          y: vh + cardH + 20,
        });
      });

      // Build scrub timeline — each card occupies a proportional slice
      const tl = gsap.timeline();

      cards.forEach((card, i) => {
        const startAt = i === 0 ? 0 : (i * (singleTrip + GAP)) / totalPin;

        tl.to(card, {
          y: -(cardH + 50),
          ease: 'none',
          duration: singleTrip / totalPin,
        }, startAt);
      });

      ScrollTrigger.create({
        trigger:   section,
        start:     'top top',
        end:       `+=${totalPin}`,
        pin:       true,
        scrub:     1.5,
        animation: tl,
      });
    });
  }

  init();

  // Recalculate on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(init, 200);
  });
});
