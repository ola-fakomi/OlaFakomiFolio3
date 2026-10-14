// ─── INTRO FRAME DATA ─────────────────────────────────────────────────────────
//
// Each key = a CSS selector matching one floating item.
// Each value = array of 6 sub-arrays, one per frame:  [x, y, rotation?]
//
//   x, y  = center of the element in artboard units (artboard = AW × AH).
//   rotation = degrees (omit or set 0 for no rotation).
//
// Frames:
//   0 → Frame 1  starting position (all items below / off-screen)
//   1 → Frame 2  mid-point of the auto-play intro
//   2 → Frame 3  end of auto-play — scroll phase begins here
//   3 → Frame 4  scroll target 1
//   4 → Frame 5  scroll target 2
//   5 → Frame 6  final position (items off-screen top, hero copy fully visible)
//
// Replace every value with the exact coordinates from Figma once exported.
// The artboard dimensions below must also match your Figma artboard.
// ──────────────────────────────────────────────────────────────────────────────

export const AW = 1200; // artboard width  (px)
export const AH = 800;  // artboard height (px)

export const FRAMES = {
  //                     F1              F2              F3              F4              F5              F6
  '.intro-hello':     [[600,1000,0],  [600,700,0],   [600,640,0],   [600,355,0],   [600,205,0],   [600,-320,0]],
  '.intro-cloud-l':   [[0,725,0],     [0,615,0],     [0,430,0],     [0,340,0],     [0,490,0],     [0,-30,0]],
  '.intro-cloud-r':   [[1135,950,0],  [1135,715,0],  [1135,720,0],  [1135,680,0],  [1135,545,0],  [1135,-30,0]],
  '.intro-keyboard':  [[285,665,-10], [285,510,-10], [285,215,-10], [285,145,-10], [285,70,-10],  [285,-180,-10]],
  '.intro-character': [[640,735,0],   [640,580,0],   [640,330,0],   [640,205,0],   [640,70,0],    [640,-180,0]],
  '.intro-trib':      [[945,660,8],   [945,500,8],   [945,225,8],   [945,145,8],   [945,90,8],    [945,-140,8]],
  '.intro-phone':     [[440,950,-12], [440,685,-12], [440,540,-12], [440,405,-12], [440,325,-12], [440,-180,-12]],
  '.intro-coin':      [[1010,950,0],  [1010,645,0],  [1010,530,0],  [1010,400,0],  [1010,280,0],  [1010,-140,0]],
};

// Hero copy offset from its resting place, in artboard units (Y axis only).
// 0 = fully in position. Positive = pushed below the viewport.
export const HERO_OFFSET = [600, 600, 600, 600, 505, 0];

// ─── MOBILE ───────────────────────────────────────────────────────────────────
// TODO: supply mobile-specific values once the mobile artboard is ready in Figma.
// Until then, desktop values are reused on mobile (see intro.js).
// export const FRAMES_MOBILE   = { ... };
// export const HERO_OFFSET_MOBILE = [...];
