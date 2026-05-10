import { UIConstant } from "../types/ui-constant";

/**
 * @constant TEXT_SIZES
 * @description Échelle de tailles typographiques.
 *
 * Basée sur une échelle cohérente avec les tailles
 * des composants interactifs.
 */
export const TEXT_SIZES = {
  xxs: {
    value: "10px",
    label: "XXS",
    description: "Texte minuscule.",
  },

  xs: {
    value: "12px",
    label: "XS",
    description: "Très petit texte.",
  },

  sm: {
    value: "14px",
    label: "SM",
    description: "Petit texte.",
  },

  md: {
    value: "16px",
    label: "MD",
    description: "Taille de texte standard.",
  },

  lg: {
    value: "18px",
    label: "LG",
    description: "Grand texte.",
  },

  xl: {
    value: "20px",
    label: "XL",
    description: "Très grand texte.",
  },

  "2xl": {
    value: "24px",
    label: "2XL",
    description: "Texte de titre.",
  },

  "3xl": {
    value: "30px",
    label: "3XL",
    description: "Très grand titre.",
  },
} as const satisfies Record<string, UIConstant<string>>;

/**
 * @type TextSize
 * @description Token de taille dérivé de {@link TEXT_SIZES}.
 *
 * Utilisé pour la prop `size`
 * des composants textuels.
 */
export type TextSize = keyof typeof TEXT_SIZES;