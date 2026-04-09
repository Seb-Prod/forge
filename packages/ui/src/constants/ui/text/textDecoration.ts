import { UIConstant } from "../type";

/**
 * @constant TEXT_DECORATIONS
 * @description Décoration des textes.
 */
export const TEXT_DECORATIONS = {
  none: {
    value: "none",
    label: "None",
    description: "Sans décoration.",
  },
  underline: {
    value: "underline",
    label: "Underline",
    description: "Souligne le texte.",
  },
  lineThrough: {
    value: "line-through",
    label: "Line Through",
    description: "Barre le texte.",
  },
} as const satisfies Record<string, UIConstant<string>>;

/**
 * @type TextDecoration
 * @description Token de décoration de texte dérivé de {@link TEXT_DECORATIONS}.
 * Utilisé pour la prop `decoration` des composants UI.
 */
export type TextDecoration = keyof typeof TEXT_DECORATIONS;