import { Surface } from "@workspace/ui/constants";
import { useIsDark } from "@workspace/ui/contexts";

/** Pas de niveau de scale CSS (0–950). */
type ScaleStep = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

/** Niveau d'élévation d'ombre (0 = aucune, 5 = maximale). */
type ShadowLevel = 0 | 1 | 2 | 3 | 4 | 5;

/** Tokens de style associés à un niveau de surface. */
interface SurfaceLevelTokens {
  bg: ScaleStep;
  text: ScaleStep;
  border: ScaleStep;
  hover: ScaleStep;
  shadow: ShadowLevel;
}

/** Association surface → tokens, hors cas `"none"`. */
type SurfaceLevelMap = Record<Exclude<Surface, "none">, SurfaceLevelTokens>;

type ShadowMap = Record<ShadowLevel, string>;

const SHADOWS: Record<"light" | "dark", ShadowMap> = {
  light: {
    0: "none",

    1: `
      0 1px 2px rgba(0,0,0,.06),
      0 0 0 1px rgba(0,0,0,.03)
    `,

    2: `
      0 4px 10px rgba(0,0,0,.08),
      0 1px 2px rgba(0,0,0,.04)
    `,

    3: `
      0 8px 20px rgba(0,0,0,.12),
      0 2px 4px rgba(0,0,0,.05)
    `,

    4: `
      0 14px 32px rgba(0,0,0,.16),
      0 4px 8px rgba(0,0,0,.06)
    `,

    5: `
      0 24px 48px rgba(0,0,0,.22),
      0 8px 16px rgba(0,0,0,.08)
    `,
  },
  dark: {
    0: "none",

    1: `
      0 1px 2px rgba(0,0,0,.45),
      0 0 0 1px rgba(255,255,255,.04)
    `,

    2: `
      0 4px 10px rgba(0,0,0,.55),
      0 0 0 1px rgba(255,255,255,.05)
    `,

    3: `
      0 8px 20px rgba(0,0,0,.62),
      0 0 0 1px rgba(255,255,255,.06)
    `,

    4: `
      0 14px 32px rgba(0,0,0,.72),
      0 0 0 1px rgba(255,255,255,.07)
    `,

    5: `
      0 24px 48px rgba(0,0,0,.82),
      0 0 0 1px rgba(255,255,255,.08)
    `,
  },
};

const SURFACE_LEVELS: Record<"light" | "dark", SurfaceLevelMap> = {
  light: {
    base: { bg: 50, text: 900, border: 200, hover: 100, shadow: 0 },
    raised: { bg: 100, text: 900, border: 200, hover: 200, shadow: 1 },
    overlay: { bg: 200, text: 900, border: 300, hover: 300, shadow: 2 },
    muted: { bg: 100, text: 700, border: 200, hover: 200, shadow: 0 },
    inverted: { bg: 900, text: 50, border: 700, hover: 800, shadow: 3 },
  },
  dark: {
    base: { bg: 900, text: 50, border: 700, hover: 800, shadow: 0 },
    raised: { bg: 800, text: 50, border: 700, hover: 700, shadow: 1 },
    overlay: { bg: 700, text: 50, border: 600, hover: 600, shadow: 2 },
    muted: { bg: 950, text: 300, border: 800, hover: 900, shadow: 0 },
    inverted: { bg: 50, text: 900, border: 200, hover: 100, shadow: 3 },
  },
} as const;

/**
 * Retourne les tokens de surface et d'ombre réactifs au thème actif.
 *
 * @returns `levels` — map surface → tokens, `getShadow` — valeur CSS d'ombre par niveau
 */
export const useSurfaceTokens = () => {
  const isDark = useIsDark();
  const levels = isDark ? SURFACE_LEVELS.dark : SURFACE_LEVELS.light;
  const shadows = isDark ? SHADOWS.dark : SHADOWS.light;

  const getShadow = (level: ShadowLevel): string => shadows[level];

  return { levels, getShadow };
};
