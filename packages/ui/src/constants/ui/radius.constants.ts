import { UIConstant } from "./type";

/**
 * @constant RADIUS
 * @description Échelle d'arrondis pour les composants UI.
 */
export const RADIUS = {
  none: { 
    value: "--radius-none", 
    label: "None", 
    description: "Aucun arrondi." },
  xs: {
    value: "--radius-xs",
    label: "Extra Small",
    description: "Arrondi très subtil.",
  },
  sm: {
    value: "--radius-sm",
    label: "Small",
    description: "Petit arrondi.",
  },
  md: {
    value: "--radius-md",
    label: "Medium",
    description: "Arrondi standard.",
  },
  lg: {
    value: "--radius-lg",
    label: "Large",
    description: "Grand arrondi.",
  },
  xl: {
    value: "--radius-xl",
    label: "Extra Large",
    description: "Arrondi prononcé.",
  },
  "2xl": {
    value: "--radius-2xl",
    label: "2X Large",
    description: "Arrondi très prononcé.",
  },
  "3xl": {
    value: "--radius-3xl",
    label: "3X Large",
    description: "Arrondi extrême.",
  },
  full: {
    value: "--radius-full",
    label: "Full",
    description: "Arrondi complet (pill/circle).",
  },
} as const satisfies Record<string, UIConstant<string>>;

/**
 * @type Radius
 * @description Token d'arrondi dérivé de {@link RADIUS}.
 * Utilisé pour la prop `radius` des composants UI.
 */
export type Radius = keyof typeof RADIUS;
