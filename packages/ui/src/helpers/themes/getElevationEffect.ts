type ElevationEffect = {
  shadowDefault: string;
  shadowActive: string;
  shadowSelected: string;
};

/* =========================
   SOLID / DEFAULT
========================= */
export const getElevationEffect = (): ElevationEffect => ({
  shadowDefault: `
    inset 0 1px 0 rgba(255,255,255,.05),
    inset 0 -1px 0 rgba(0,0,0,.20),
    0 2px 4px rgba(0,0,0,.25)
  `,
  shadowActive: `
    inset 0 2px 4px rgba(0,0,0,.45),
    inset 0 -1px 4px rgba(0,0,0,.35)
  `,
  shadowSelected: `
    inset 0 2px 0 rgba(0,0,0,.40),
    inset 0 -1px 0 rgba(255,255,255,.04),
    0 1px 2px rgba(0,0,0,.35)
  `,
});

/* =========================
   GHOST
   léger / transparent
========================= */
export const getGhostElevationEffect = (): ElevationEffect => ({
  shadowDefault: `
    inset 0 1px 0 rgba(255,255,255,.03),
    0 1px 2px rgba(0,0,0,.08)
  `,
  shadowActive: `
    inset 0 2px 3px rgba(0,0,0,.18)
  `,
  shadowSelected: `
    inset 0 0 0 1px rgba(255,255,255,.06),
    0 1px 3px rgba(0,0,0,.14)
  `,
});

/* =========================
   OUTLINE
   contour net
========================= */
export const getOutlineElevationEffect = (): ElevationEffect => ({
  shadowDefault: `
    inset 0 0 0 1px rgba(255,255,255,.08),
    0 1px 2px rgba(0,0,0,.12)
  `,
  shadowActive: `
    inset 0 0 0 1px rgba(255,255,255,.05),
    inset 0 2px 4px rgba(0,0,0,.28)
  `,
  shadowSelected: `
    inset 0 0 0 1px rgba(255,255,255,.12),
    0 0 0 1px rgba(0,0,0,.22),
    0 2px 4px rgba(0,0,0,.20)
  `,
});

/* =========================
   SEGMENT
   tabs / segmented control
========================= */
export const getSegmentElevationEffect = (): ElevationEffect => ({
  shadowDefault: `
    inset 0 1px 0 rgba(255,255,255,.04),
    inset 0 -1px 0 rgba(0,0,0,.10)
  `,
  shadowActive: `
    inset 0 2px 4px rgba(0,0,0,.30)
  `,
  shadowSelected: `
    inset 0 1px 0 rgba(255,255,255,.06),
    inset 0 -1px 0 rgba(0,0,0,.18),
    0 1px 2px rgba(0,0,0,.18)
  `,
});