import { Surface, Tone } from "@workspace/ui/constants";
import { useSurfaceTokens } from "./surfaceLevels";

export type SurfaceColors = {
  getSurfaceBackground: (surface: Surface, tone?: Tone) => string | undefined;
  getSurfaceTextColor: (surface: Surface, tone?: Tone) => string | undefined;
  getSurfaceBorderColor: (surface: Surface, tone?: Tone) => string | undefined;
  getSurfaceShadow: (surface: Surface, shadow?: boolean) => string | undefined;
};

/**
 * Retourne les helpers de couleur de surface réactifs au thème actif.
 *
 * @example
 * const { getSurfaceBackground, getSurfaceTextColor } = useSurfaceColors();
 * getSurfaceBackground("raised", "primary"); // "var(--color-primary-100)"
 */
export const useSurfaceColors = (): SurfaceColors => {
  const { levels, getShadow } = useSurfaceTokens();

  /** Couleur de fond — `"transparent"` si `surface === "none"`. */
  const getSurfaceBackground = (
    surface: Surface,
    tone: Tone = "neutral",
  ): string => {
    if (surface === "none") return "transparent";
    return `var(--color-${tone}-${levels[surface].bg})`;
  };

  /** Couleur de texte — `"inherit"` si `surface === "none"`. */
  const getSurfaceTextColor = (
    surface: Surface,
    tone: Tone = "neutral",
  ): string => {
    if (surface === "none") return "inherit";
    return `var(--color-${tone}-${levels[surface].text})`;
  };

  /** Couleur de bordure — `"transparent"` si `surface === "none"`. */
  const getSurfaceBorderColor = (
    surface: Surface,
    tone: Tone = "neutral",
  ): string => {
    if (surface === "none") return "transparent";
    return `var(--color-${tone}-${levels[surface].border})`;
  };

  /** Ombre CSS — `"none"` si `surface === "none"`. */
  const getSurfaceShadow = (surface: Surface, shadow?: boolean): string => {
    if (surface === "none" || shadow === false) return "none";
    return getShadow(levels[surface].shadow);
  };

  return {
    getSurfaceBackground,
    getSurfaceTextColor,
    getSurfaceBorderColor,
    getSurfaceShadow,
  };
};
