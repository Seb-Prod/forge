import { UIConstant } from "../types/ui-constant";

/**
 * @constant TEXT_TRANSFORMS
 * @description Transformation de la casse des textes.
 */
export const TEXT_TRANSFORMS = {
  none: {
    value: "none",
    label: "None",
    description: "Sans modification.",
  },
  uppercase: {
    value: "uppercase",
    label: "Uppercase",
    description: "Tous les caractères seront écrits en capitales.",
  },
  lowercase: {
    value: "lowercase",
    label: "Lowercase",
    description: "Tous les caractères seront écrits en minuscules.",
  },
  capitalize: {
    value: "capitalize",
    label: "Capitalize",
    description: "La première lettre de chaque mot sera en capitale.",
  },
} as const satisfies Record<string, UIConstant<string>>;

/**
 * @type TextTransform
 * @description Token de transformation de casse dérivé de {@link TEXT_TRANSFORMS}.
 * Utilisé pour la prop `transform` des composants UI.
 */
export type TextTransform = keyof typeof TEXT_TRANSFORMS;
