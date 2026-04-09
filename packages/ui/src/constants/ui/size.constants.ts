import { UIConstant } from "./type";

/**
 * @constant SIZES
 * @description Échelle de tailles pour les composants interactifs (boutons, inputs, avatars…).
 * Basée sur une grille de 8px.
 */
export const SIZES = {
  xs: { value: "--size-xs", label: "Extra Small", description: "24px" },
  sm: { value: "--size-sm", label: "Small",       description: "32px" },
  md: { value: "--size-md", label: "Medium",      description: "40px" },
  lg: { value: "--size-lg", label: "Large",       description: "48px" },
  xl: { value: "--size-xl", label: "Extra Large", description: "56px" },
} as const satisfies Record<string, UIConstant<string>>;

/**
 * @type Size
 * @description Token de taille dérivé de {@link SIZES}.
 * Utilisé pour la prop `size` des composants interactifs.
 */
export type Size = keyof typeof SIZES;