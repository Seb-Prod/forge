import { UIConstant } from "../types/ui-constant";

/**
 * @constant TEXT_WEIGHTS
 * @description Graisse des textes.
 */
export const TEXT_WEIGHTS = {
  light: {
    value: "--font-light",
    label: "Light",
    description: "Texte fin, léger.",
  },
  regular: {
    value: "--font-regular",
    label: "Regular",
    description: "Texte normal.",
  },
  medium: {
    value: "--font-medium",
    label: "Medium",
    description: "Texte légèrement gras.",
  },
  semibold: {
    value: "--font-semibold",
    label: "Semi Bold",
    description: "Texte semi-gras.",
  },
  bold: {
    value: "--font-bold",
    label: "Bold",
    description: "Texte gras.",
  },
  extrabold: {
    value: "--font-extrabold",
    label: "Extra Bold",
    description: "Texte très gras.",
  },
} as const satisfies Record<string, UIConstant<string>>;

/**
 * @type TextWeight
 * @description Token de graisse de texte dérivé de {@link TEXT_WEIGHTS}.
 * Utilisé pour la prop `weight` des composants UI.
 */
export type TextWeight = keyof typeof TEXT_WEIGHTS;
