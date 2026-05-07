import { UIConstant } from "../types/ui-constant";

/**
 * @constant VARIANTS
 * @description Variantes visuelles des composants.
 * Chaque variante définit un style de rendu distinct pour les composants.
 */
export const VARIANTS = {
  default: {
    value: "default",
    label: "Default",
    description:
      "Style principal avec relief visuel et hiérarchie marquée pour les éléments interactifs.",
  },

  outline: {
    value: "outline",
    label: "Outline",
    description:
      "Style épuré avec bordures visibles et fond discret, idéal pour les interfaces sobres.",
  },

  segment: {
    value: "segment",
    label: "Segment",
    description:
      "Style compact et structuré avec éléments regroupés dans un ensemble uniforme.",
  },

  ghost: {
    value: "ghost",
    label: "Ghost",
    description:
      "Style minimal et transparent mettant l’accent sur le contenu avec feedback léger.",
  },
} as const satisfies Record<string, UIConstant<string>>;

/**
 * @type ToggleGroupVariant
 * @description Token de variante dérivé de {@link TOGGLE_GROUP_VARIANTS}.
 * Utilisé pour la prop `variant` du composant ToggleGroup.
 */
export type Variant = keyof typeof VARIANTS;
