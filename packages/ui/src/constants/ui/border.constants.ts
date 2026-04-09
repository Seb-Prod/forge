import { UIConstant } from "./type";

/**
 * @constant BORDER_SIZES
 * @description Échelle d'épaisseur des bordures pour les composants UI.
 * Inspirée des conventions classiques (fine → épaisse).
 */
export const BORDER_SIZES = {
  none: {
    value: "--border-width-none",
    label: "None",
    description: "Aucune bordure.",
  },
  xs: {
    value: "--border-width-xs",
    label: "Extra Small",
    description: "Bordure très fine.",
  },
  sm: {
    value: "--border-width-sm",
    label: "Small",
    description: "Bordure fine.",
  },
  md: {
    value: "--border-width-md",
    label: "Medium",
    description: "Bordure standard.",
  },
  lg: {
    value: "--border-width-lg",
    label: "Large",
    description: "Bordure épaisse.",
  },
  xl: {
    value: "--border-width-xl",
    label: "Extra Large",
    description: "Bordure très épaisse.",
  },
} as const satisfies Record<string, UIConstant<string>>;

/**
 * @type BorderSize
 * @description Token d'épaisseur de bordure dérivé de {@link BORDER_SIZES}.
 * Utilisé pour les props liées aux bordures (`borderWidth`, etc.).
 */
export type BorderSize = keyof typeof BORDER_SIZES;
