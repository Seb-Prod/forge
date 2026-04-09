import { UIConstant } from "../type";

/**
 * @constant TEXT_ALIGNS
 * @description Alignement du texte.
 */
export const TEXT_ALIGNS = {
  left: {
    value: "left",
    label: "Left",
    description: "Aligne le texte à gauche",
  },
  center: {
    value: "center",
    label: "Center",
    description: "Centre le texte.",
  },
  right: {
    value: "right",
    label: "Right",
    description: "Aligne le texte à droite",
  },
  justify: {
    value: "justify",
    label: "Justify",
    description: "Justifie le texte.",
  },
} as const satisfies Record<string, UIConstant<string>>;

/**
 * @type TextAlign
 * @description Token d’alignement de texte dérivé de {@link TEXT_ALIGNS}.
 * Utilisé pour la prop `textAlign` des composants UI.
 */
export type TextAlign = keyof typeof TEXT_ALIGNS;