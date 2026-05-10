import { UIConstant } from "../types/ui-constant";

/**
 * @constant TEXT_SIZES
 * @description Taille des textes.
 */
export const TEXT_SIZES_HOLD = {
  xs: {
    value: "--text-xs",
    label: "Extra Small",
    description: "Texte très petit.",
  },
  sm: {
    value: "--text-sm",
    label: "Small",
    description: "Petit texte.",
  },
  md: {
    value: "--text-md",
    label: "Medium",
    description: "Taille de texte standard.",
  },
  lg: {
    value: "--text-lg",
    label: "Large",
    description: "Grand texte.",
  },
  xl: {
    value: "--text-xl",
    label: "Extra Large",
    description: "Très grand texte.",
  },
  "2xl": {
    value: "--text-2xl",
    label: "2X Large",
    description: "Texte de titre.",
  },
  "3xl": {
    value: "--text-3xl",
    label: "3X Large",
    description: "Texte de grande titre.",
  },
  "4xl": {
    value: "--text-4xl",
    label: "4X Large",
    description: "Texte de très grande titre.",
  },
  "5xl": {
    value: "--text-5xl",
    label: "4X Large",
    description: "Texte de très grande titre.",
  },
} as const satisfies Record<string, UIConstant<string>>;

/**
 * @type TextSize
 * @description Token de taille de texte dérivé de {@link TEXT_SIZES}.
 * Utilisé pour la prop `size` des composants UI.
 */
export type TextSizeHold = keyof typeof TEXT_SIZES_HOLD;
