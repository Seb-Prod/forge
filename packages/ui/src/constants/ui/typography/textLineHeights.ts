import { UIConstant } from "../types/ui-constant";

/**
 * @constant TEXT_LINE_HEIGHTS
 * @description Hauteur de ligne des textes.
 */
export const TEXT_LINE_HEIGHTS = {
  tight: {
    value: "--leading-tight",
    label: "Tight",
    description: "Hauteur de ligne très compacte, idéale pour les titres.",
  },
  snug: {
    value: "--leading-snug",
    label: "Snug",
    description: "Hauteur de ligne légèrement compacte.",
  },
  normal: {
    value: "--leading-normal",
    label: "Normal",
    description: "Hauteur de ligne standard pour le corps de texte.",
  },
  relaxed: {
    value: "--leading-relaxed",
    label: "Relaxed",
    description: "Hauteur de ligne confortable pour la lecture.",
  },
  loose: {
    value: "--leading-loose",
    label: "Loose",
    description: "Hauteur de ligne très espacée.",
  },
} as const satisfies Record<string, UIConstant<string>>;

/**
 * @type TextLineHeight
 * @description Token de hauteur de ligne dérivé de {@link TEXT_LINE_HEIGHTS}.
 */
export type TextLineHeight = keyof typeof TEXT_LINE_HEIGHTS;
