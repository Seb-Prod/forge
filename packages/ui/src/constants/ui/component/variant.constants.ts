import { UIConstant } from "../types/ui-constant";

/**
 * @constant VARIANTS
 * @description Variants visuels des composants interactifs
 * (buttons, badges, cards, inputs, alerts…).
 *
 * Chaque variant définit un comportement visuel :
 * background, border, shadow, transparence, relief…
 */
export const VARIANTS = {
  solid: {
    value: "solid",
    label: "Solid",
    description: "Variant plein avec fort contraste.",
  },

  soft: {
    value: "soft",
    label: "Soft",
    description: "Variant doux avec fond léger.",
  },

  ghost: {
    value: "ghost",
    label: "Ghost",
    description: "Variant transparent minimal.",
  },

  outline: {
    value: "outline",
    label: "Outline",
    description: "Variant avec bordure visible.",
  },

  // elevated: {
  //   value: "elevated",
  //   label: "Elevated",
  //   description: "Variant avec ombre permanente.",
  // },

  // flat: {
  //   value: "flat",
  //   label: "Flat",
  //   description: "Variant sans ombre ni relief.",
  // },

  // glass: {
  //   value: "glass",
  //   label: "Glass",
  //   description: "Variant avec effet glassmorphism.",
  // },

  // "3d": {
  //   value: "3d",
  //   label: "3D",
  //   description: "Variant avec effet de profondeur.",
  // },

  // link: {
  //   value: "link",
  //   label: "Link",
  //   description: "Variant ressemblant à un lien texte.",
  // },
} as const satisfies Record<string, UIConstant<string>>;

/**
 * @type Variant
 * @description Token de variant dérivé de {@link VARIANTS}.
 *
 * Utilisé pour la prop `variant`
 * des composants interactifs.
 */
export type Variant = keyof typeof VARIANTS;