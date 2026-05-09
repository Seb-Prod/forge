import { Variant } from "@workspace/ui/constants";
import { useIsDark } from "@workspace/ui/contexts";
import { ComponentState, ComponentStateTokens, ShadowLevel } from "./types";
import { ghostTokens, outlineTokens, softTokens, solidTokens } from "./tokens";


/** Association surface → tokens, hors cas `"none"`. */

export type VariantStateMap = Record<
  Variant,
  Record<ComponentState, ComponentStateTokens>
>;

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

const COMPONENT_VARIANT_TOKENS: Record<"light" | "dark", VariantStateMap> = {
  light: {
    solid: solidTokens.light,
    soft: softTokens.light,
    ghost: ghostTokens.light,
    outline: outlineTokens.light,
  },

  dark: {
    solid: solidTokens.dark,
    soft: softTokens.dark,
    ghost: softTokens.dark,
    outline: outlineTokens.dark,
  },
} as const;

type UseComponentTokensParams = {
  variant?: Variant;
};

/**
 * Retourne les tokens de surface et d'ombre réactifs au thème actif.
 *
 * @returns `levels` — map surface → tokens, `getShadow` — valeur CSS d'ombre par niveau
 */
export const useComponentTokens = ({
  variant = "solid",
}: UseComponentTokensParams = {}) => {
  const isDark = useIsDark();

  const levels = isDark
    ? COMPONENT_VARIANT_TOKENS.dark[variant]
    : COMPONENT_VARIANT_TOKENS.light[variant];

  const shadows = isDark ? SHADOWS.dark : SHADOWS.light;

  const getShadow = (level: ShadowLevel): string => shadows[level];

  return {
    levels,
    getShadow,
  };
};
