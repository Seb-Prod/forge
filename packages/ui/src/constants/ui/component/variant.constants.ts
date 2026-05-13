import { UIConstant } from "../types/ui-constant";

/**
 * @constant VARIANTS
 * @status stable
 * @description
 * Source de vérité globale des variants visuels disponibles dans le design system.
 *
 * Ces variants définissent le comportement visuel des composants :
 * - background
 * - border
 * - shadow
 * - niveau de contraste
 *
 * Ils peuvent être filtrés par composant via `COMPONENT_VARIANTS`.
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

  elevated: {
    value: "elevated",
    label: "Elevated",
    description: "Variant avec ombre permanente.",
  },

  "3d": {
    value: "3d",
    label: "3D",
    description: "Variant avec effet de profondeur.",
  },

  link: {
    value: "link",
    label: "Link",
    description: "Variant ressemblant à un lien texte.",
  },
} as const satisfies Record<string, UIConstant<string>>;

/**
 * @type Variant
 * @description
 * Union type représentant tous les variants disponibles globalement.
 *
 * Exemple :
 * "solid" | "soft" | "ghost" | "outline" | "elevated"
 */
export type Variant = keyof typeof VARIANTS;

/**
 * @type VariantKey
 * @description
 * Alias technique de `Variant`.
 *
 * Utilisé dans les systèmes génériques et design tokens.
 */
export type VariantKey = keyof typeof VARIANTS;

/**
 * @constant COMPONENT_VARIANTS
 * @description
 * Mapping des variants autorisés par composant.
 *
 * Permet de restreindre les variants disponibles selon le composant
 * afin d’éviter les incohérences UX/UI.
 *
 * Exemple :
 * - Button → solid, outline, ghost
 * - Badge → solid, soft, outline
 * - Card → solid, elevated
 */

export const COMPONENT_VARIANTS = {
  button: ["solid", "outline", "ghost", "3d"] as const,
  badge: ["solid", "soft", "outline"] as const,
  card: ["solid", "elevated"] as const,
} as const satisfies Record<string, readonly VariantKey[]>;