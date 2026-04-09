import { UIConstant } from "./type";

/**
 * @constant SPACINGS
 * @description Échelle d'espacement partagée entre margin, padding et gap.
 * Basée sur une grille de 4px jusqu'à 8px, puis 8px au-delà.
 */
export const SPACINGS = {
  none: { value: "--space-0", label: "None", description: "Aucun espacement" },
  xs: {
    value: "--space-1",
    label: "Extra Small",
    description: "Très petit espacement",
  },
  sm: { value: "--space-2", label: "Small", description: "Petit espacement" },
  md: {
    value: "--space-4",
    label: "Medium",
    description: "Espacement standard",
  },
  lg: { value: "--space-6", label: "Large", description: "Grand espacement" },
  xl: {
    value: "--space-8",
    label: "Extra Large",
    description: "Très grand espacement",
  },
  "2xl": {
    value: "--space-12",
    label: "2X Large",
    description: "Espacement très large",
  },
  "3xl": {
    value: "--space-16",
    label: "3X Large",
    description: "Espacement maximal",
  },
} as const satisfies Record<string, UIConstant<string>>;

/**
 * @type Spacing
 * @description Token d'espacement dérivé de {@link SPACINGS}.
 * Utilisé pour les props `margin`, `padding` et `gap`.
 */
export type Spacing = keyof typeof SPACINGS;
