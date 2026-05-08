import { Surface, Variant } from "@workspace/ui/constants";
import { useIsDark } from "@workspace/ui/contexts";

/** Pas de niveau de scale CSS (0–950). */
type ScaleStep = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

/** Niveau d'élévation d'ombre (0 = aucune, 5 = maximale). */
type ShadowLevel = 0 | 1 | 2 | 3 | 4 | 5;

/** État d'un composant interactif. */
type ComponentState = "default" | "hover" | "active" | "disabled" | "focus";

/** Tokens de style associés à un état. */
interface ComponentStateTokens {
  bg: ScaleStep;
  text: ScaleStep;
  border: ScaleStep;
  shadow: ShadowLevel;
}

/** Association surface → tokens, hors cas `"none"`. */
type ComponentStateMap = Record<ComponentState, ComponentStateTokens>;

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
    solid: {
      default: {
        bg: 500,
        text: 50,
        border: 500,
        shadow: 1,
      },

      hover: {
        bg: 600,
        text: 50,
        border: 600,
        shadow: 2,
      },

      active: {
        bg: 700,
        text: 50,
        border: 700,
        shadow: 1,
      },

      disabled: {
        bg: 200,
        text: 400,
        border: 200,
        shadow: 0,
      },

      focus: {
        bg: 500,
        text: 50,
        border: 600,
        shadow: 2,
      },
    },

    soft: {
      default: {
        bg: 100,
        text: 700,
        border: 200,
        shadow: 0,
      },

      hover: {
        bg: 200,
        text: 800,
        border: 300,
        shadow: 1,
      },

      active: {
        bg: 300,
        text: 900,
        border: 400,
        shadow: 0,
      },

      disabled: {
        bg: 100,
        text: 400,
        border: 200,
        shadow: 0,
      },

      focus: {
        bg: 100,
        text: 800,
        border: 400,
        shadow: 1,
      },
    },

    ghost: {
      default: {
        bg: 50,
        text: 700,
        border: 50,
        shadow: 0,
      },

      hover: {
        bg: 100,
        text: 800,
        border: 100,
        shadow: 0,
      },

      active: {
        bg: 200,
        text: 900,
        border: 200,
        shadow: 0,
      },

      disabled: {
        bg: 50,
        text: 300,
        border: 50,
        shadow: 0,
      },

      focus: {
        bg: 100,
        text: 800,
        border: 300,
        shadow: 0,
      },
    },

    outline: {
      default: {
        bg: 50,
        text: 700,
        border: 400,
        shadow: 0,
      },

      hover: {
        bg: 100,
        text: 800,
        border: 500,
        shadow: 0,
      },

      active: {
        bg: 200,
        text: 900,
        border: 600,
        shadow: 0,
      },

      disabled: {
        bg: 50,
        text: 300,
        border: 200,
        shadow: 0,
      },

      focus: {
        bg: 50,
        text: 800,
        border: 600,
        shadow: 1,
      },
    },
  },

  dark: {
    solid: {
      default: {
        bg: 500,
        text: 50,
        border: 500,
        shadow: 1,
      },

      hover: {
        bg: 400,
        text: 50,
        border: 400,
        shadow: 2,
      },

      active: {
        bg: 300,
        text: 50,
        border: 300,
        shadow: 1,
      },

      disabled: {
        bg: 800,
        text: 600,
        border: 700,
        shadow: 0,
      },

      focus: {
        bg: 500,
        text: 50,
        border: 300,
        shadow: 2,
      },
    },

    soft: {
      default: {
        bg: 800,
        text: 100,
        border: 700,
        shadow: 0,
      },

      hover: {
        bg: 700,
        text: 50,
        border: 600,
        shadow: 1,
      },

      active: {
        bg: 600,
        text: 50,
        border: 500,
        shadow: 0,
      },

      disabled: {
        bg: 900,
        text: 700,
        border: 800,
        shadow: 0,
      },

      focus: {
        bg: 800,
        text: 50,
        border: 500,
        shadow: 1,
      },
    },

    ghost: {
      default: {
        bg: 950,
        text: 200,
        border: 950,
        shadow: 0,
      },

      hover: {
        bg: 900,
        text: 100,
        border: 900,
        shadow: 0,
      },

      active: {
        bg: 800,
        text: 50,
        border: 800,
        shadow: 0,
      },

      disabled: {
        bg: 950,
        text: 700,
        border: 950,
        shadow: 0,
      },

      focus: {
        bg: 900,
        text: 100,
        border: 700,
        shadow: 0,
      },
    },

    outline: {
      default: {
        bg: 950,
        text: 200,
        border: 600,
        shadow: 0,
      },

      hover: {
        bg: 900,
        text: 100,
        border: 500,
        shadow: 0,
      },

      active: {
        bg: 800,
        text: 50,
        border: 400,
        shadow: 0,
      },

      disabled: {
        bg: 950,
        text: 700,
        border: 800,
        shadow: 0,
      },

      focus: {
        bg: 950,
        text: 100,
        border: 400,
        shadow: 1,
      },
    },
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
