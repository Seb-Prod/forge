import { UIConstant } from "./type";

/**
 * @constant APPEARANCES
 * @description Variantes visuelles d'un composant, indépendantes de sa couleur.
 */
export const APPEARANCES = {
  filled:  { value: "filled",  label: "Filled",  description: "Fond plein."     },
  outline: { value: "outline", label: "Outline", description: "Bordure visible." },
  ghost:   { value: "ghost",   label: "Ghost",   description: "Sans fond."      },
  soft:    { value: "soft",    label: "Soft",    description: "Fond léger."     },
  link:    { value: "link",    label: "Link",    description: "Style lien."     },
} as const satisfies Record<string, UIConstant<string>>;

/**
 * @type Appearance
 * @description Token de variante visuelle dérivé de {@link APPEARANCES}.
 * Utilisé pour la prop `appearance` des composants UI.
 */
export type Appearance = keyof typeof APPEARANCES;