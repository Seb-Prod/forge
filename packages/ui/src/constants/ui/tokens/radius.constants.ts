import { UIConstant } from "../types/ui-constant";

/**
 * @constant RADIUS
 * @description Échelle d'arrondis pour les composants UI.
 */
export const RADIUS = {
  none: { value: "0px", label: "None", description: "Aucun arrondi." },
  xxs: { value: "2px", label: "XXS", description: "Arrondi minimal." },
  xs: { value: "4px", label: "XS", description: "Arrondi très subtil." },
  sm: { value: "8px", label: "SM", description: "Petit arrondi." },
  md: { value: "12px", label: "MD", description: "Arrondi standard." },
  lg: { value: "16px", label: "LG", description: "Grand arrondi." },
  xl: { value: "24px", label: "XL", description: "Arrondi prononcé." },
  "2xl": { value: "32px", label: "2XL", description: "Arrondi très prononcé." },
  "3xl": { value: "48px", label: "3XL", description: "Arrondi extrême." },
  "4xl": { value: "64px", label: "4XL", description: "Arrondi énorme." },
  "5xl": { value: "96px", label: "5XL", description: "Arrondi maximal." },
  full: {
    value: "9999px",
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
