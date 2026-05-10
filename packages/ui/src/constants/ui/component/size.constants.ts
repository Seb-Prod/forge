import { UIConstant } from "../types/ui-constant";

/**
 * @constant COMPONENT_SIZES
 * @description Échelle de tailles pour les composants interactifs
 * (boutons, inputs, avatars, badges…).
 *
 * Basée sur une grille de 8px.
 */
export const COMPONENT_SIZES = {
  xxs: {
    value: "16px",
    label: "XXS",
    description: "Taille minimale.",
  },

  xs: {
    value: "24px",
    label: "XS",
    description: "Très petite taille.",
  },

  sm: {
    value: "32px",
    label: "SM",
    description: "Petite taille.",
  },

  md: {
    value: "40px",
    label: "MD",
    description: "Taille standard.",
  },

  lg: {
    value: "48px",
    label: "LG",
    description: "Grande taille.",
  },

  xl: {
    value: "56px",
    label: "XL",
    description: "Très grande taille.",
  },

  "2xl": {
    value: "64px",
    label: "2XL",
    description: "Taille extra large.",
  },

  "3xl": {
    value: "80px",
    label: "3XL",
    description: "Taille massive.",
  },
} as const satisfies Record<string, UIConstant<string>>;

/**
 * @type ComponentSize
 * @description Token de taille dérivé de {@link COMPONENT_SIZES}.
 *
 * Utilisé pour la prop `Componentsize`
 * des composants interactifs.
 */
export type ComponentSize = keyof typeof COMPONENT_SIZES;