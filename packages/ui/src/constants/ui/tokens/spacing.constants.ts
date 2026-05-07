import { UIConstant } from "../types/ui-constant";

/**
 * @constant SPACINGS
 * @description Échelle d'espacement partagée entre margin, padding et gap.
 * Basée sur une grille de 4px jusqu'à 8px, puis 8px au-delà.
 */
export const SPACINGS = {
  none: { value: "0px", label: "NONE", description: "Aucun espacement" },
  xxs: {
    value: "4px",
    label: "XXS",
    description: "Très très petit espacement",
  },
  xs: { value: "8px", label: "XS", description: "Très petit espacement" },
  sm: { value: "12px", label: "SM", description: "Petit espacement" },
  md: { value: "16px", label: "MD", description: "Espacement standard" },
  lg: { value: "24px", label: "LG", description: "Grand espacement" },
  xl: { value: "32px", label: "XL", description: "Très grand espacement" },
  "2xl": { value: "48px", label: "2XL", description: "Espacement large" },
  "3xl": { value: "64px", label: "3XL", description: "Très large espacement" },
  "4xl": { value: "96px", label: "4XL", description: "Espacement énorme" },
  "5xl": { value: "128px", label: "5XL", description: "Espacement maximal" },
} as const satisfies Record<string, UIConstant<string>>;

/**
 * @type Spacing
 * @description Token d'espacement dérivé de {@link SPACINGS}.
 * Utilisé pour les props `margin`, `padding` et `gap`.
 */
export type Spacing = keyof typeof SPACINGS;
