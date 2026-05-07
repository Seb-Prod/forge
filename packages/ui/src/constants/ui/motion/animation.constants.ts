import { UIConstant } from "../types/ui-constant";

/**
 * @constant ANIMATIONS
 * @description Points d'origine des animations d'entrée/sortie des composants.
 */
export const ANIMATIONS = {
  center: { value: "center", label: "Center", description: "Depuis centre" },
  left: { value: "left", label: "Left", description: "Gauche → droite" },
  right: { value: "right", label: "Right", description: "Droite → gauche" },
  top: { value: "top", label: "Top", description: "Haut → bas" },
  bottom: { value: "bottom", label: "Bottom", description: "Bas → haut" },
  circle: { value: "circle", label: "Circle", description: "Expansion" },
  splitH: {
    value: "split-h",
    label: "Split Horizontal",
    description: "Ouverture horizontale",
  },
  splitV: {
    value: "split-v",
    label: "Split Vertical",
    description: "Ouverture verticale",
  },
  none: { value: "none", label: "None", description: "Aucune animation" },
} as const satisfies Record<string, UIConstant<string>>;

/**
 * @type Animation
 * @description Token d'animation dérivé de {@link ANIMATIONS}.
 * Utilisé pour la prop `animation` des composants avec entrée/sortie.
 */
export type Animation = keyof typeof ANIMATIONS;
