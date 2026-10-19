// ASCII Ripple — vanilla JS water-wave simulation rendered as ASCII characters.
// Each frame: solve the 2D wave equation on a character grid, map amplitudes to chars.

const CHARS = ' .·:+*%#@';

/**
 * @param {HTMLElement} container  — sized, positioned element (sticky/relative/absolute)
 * @param {object}      options
 * @returns {() => void}           — cleanup / destroy
 */
export function initAsciiRipple(container, options = {}) {
  const cfg = {
    fontSize:        13,
    fontFamily:      'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
    color:           '#1e1e1e',
    chars:           CHARS,
    damping:         0.974,   // energy loss per frame (0–1)
    rippleStrength:  60,      // amplitude added on cursor move
    rippleRadius:    3,       // cells
    ambientInterval: 1400,    // ms between auto-drops
    ambientStrength: 55,      // amplitude of auto-drops
    ...options,
  };

  /* ── canvas ───────────────────────────────────────────────── */
  const canvas = document.createElement('canvas');
  canvas.style.cssText =
    'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  let cols = 0, rows = 0;
  let curr = new Float32Array(0);
  let prev = new Float32Array(0);
  let W = 0, H = 0, cW = 0, cH = 0, dpr = 1;
  let alive = true, rafId = 0;

  /* ── resize ───────────────────────────────────────────────── */
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(1, container.clientWidth);
    H = Math.max(1, container.clientHeight);
    canvas.width  = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);

    ctx.font = `${cfg.fontSize}px ${cfg.fontFamily}`;
    cW = ctx.measureText('M').width;
    cH = cfg.fontSize * 1.42;

    const nc = Math.ceil(W / cW) + 2;
    const nr = Math.ceil(H / cH) + 2;
    if (nc !== cols || nr !== rows) {
      cols = nc; rows = nr;
      curr = new Float32Array(cols * rows);
      prev = new Float32Array(cols * rows);
    }
  }

  /* ── splash — add energy at a canvas pixel position ──────── */
  function splash(px, py, strength) {
    const mc = Math.round(px / cW);
    const mr = Math.round(py / cH);
    const r  = cfg.rippleRadius;
    for (let dr = -r; dr <= r; dr++) {
      for (let dc = -r; dc <= r; dc++) {
        const d = Math.sqrt(dc * dc + dr * dr);
        if (d > r) continue;
        const c = mc + dc, rr = mr + dr;
        if (c < 1 || c >= cols - 1 || rr < 1 || rr >= rows - 1) continue;
        // cosine falloff from centre
        curr[rr * cols + c] += strength * Math.cos((d / r) * Math.PI * 0.5);
      }
    }
  }

  /* ── wave simulation — 2D wave equation with damping ─────── */
  function simulate() {
    const next = new Float32Array(cols * rows);
    let active = false;
    for (let r = 1; r < rows - 1; r++) {
      for (let c = 1; c < cols - 1; c++) {
        const i = r * cols + c;
        // simplified wave: next = (sum_neighbours / 2) - prev, then damp
        const v = (
          curr[(r - 1) * cols + c] +
          curr[(r + 1) * cols + c] +
          curr[r * cols + (c - 1)] +
          curr[r * cols + (c + 1)]
        ) * 0.5 - prev[i];
        next[i] = v * cfg.damping;
        if (Math.abs(next[i]) > 0.08) active = true;
      }
    }
    prev = curr;
    curr = next;
    return active;
  }

  /* ── render — map amplitudes → ASCII chars ────────────────── */
  function render() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.font          = `${cfg.fontSize}px ${cfg.fontFamily}`;
    ctx.fillStyle     = cfg.color;
    ctx.textBaseline  = 'top';

    const chars = cfg.chars;
    const n     = chars.length - 1;
    const scale = 110; // amplitude at which char index is maxed

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const val  = Math.abs(curr[r * cols + c]);
        if (val < 0.4) continue;
        const norm = Math.min(val / scale, 1);
        const ci   = Math.min(n, Math.round(norm * n));
        const ch   = chars[ci];
        if (!ch || ch === ' ') continue;
        ctx.globalAlpha = Math.min(1, norm * 1.8 + 0.1);
        ctx.fillText(ch, c * cW, r * cH);
      }
    }
    ctx.globalAlpha = 1;
  }

  /* ── main loop ────────────────────────────────────────────── */
  function tick() {
    rafId = 0;
    if (!alive) return;
    const active = simulate();
    render();
    if (active) rafId = requestAnimationFrame(tick);
  }

  function wake() {
    if (!alive || rafId) return;
    rafId = requestAnimationFrame(tick);
  }


  /* ── pointer events ───────────────────────────────────────── */
  const onMove = e => {
    const rect = container.getBoundingClientRect();
    splash(e.clientX - rect.left, e.clientY - rect.top, cfg.rippleStrength);
    wake();
  };

  container.addEventListener('pointermove', onMove, { passive: true });

  /* ── resize observer ──────────────────────────────────────── */
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  resize();

  /* ── cleanup ──────────────────────────────────────────────── */
  return () => {
    alive = false;
    cancelAnimationFrame(rafId);
    ro.disconnect();
    container.removeEventListener('pointermove', onMove);
    canvas.remove();
  };
}
