import { UIConstant } from "../types/ui-constant";

/**
 * @constant BORDER_SIZES
 * @description Échelle d'épaisseur des bordures pour les composants UI.
 * Inspirée des conventions classiques (fine → épaisse).
 */
export const BORDER_SIZES = {
  none: { value: "0px", label: "None", description: "Aucune bordure." },
  xs: { value: "1px", label: "Extra Small", description: "Bordure très fine." },
  sm: { value: "2px", label: "Small", description: "Bordure fine." },
  md: { value: "3px", label: "Medium", description: "Bordure standard." },
  lg: { value: "4px", label: "Large", description: "Bordure épaisse." },
  xl: {
    value: "6px",
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
