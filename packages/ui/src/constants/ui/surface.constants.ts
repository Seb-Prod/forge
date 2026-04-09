import { UIConstant } from "./type";

type SurfaceConstant = UIConstant<string> & {
  surfaceTone: number;
  textTone: number;
  borderTone: number;
};

/**
 * @constant SURFACES
 * @description Niveaux de surface définissant le fond et l'élévation visuelle d'un composant.
 * Chaque surface embarque son palier de couleur pour le fond (`surfaceTone`) et le texte (`textTone`).
 */
export const SURFACES = {
  none: {
    value: "none",
    label: "None",
    description: "Aucun background.",
    surfaceTone: 0,
    textTone: 50,
    borderTone: 0,
  },
  base: {
    value: "base",
    label: "Base",
    description: "Background principal.",
    surfaceTone: 500,
    textTone: 50,
    borderTone: 400,
  },
  raised: {
    value: "raised",
    label: "Raised",
    description: "Surface surélevée (cards).",
    surfaceTone: 600,
    textTone: 50,
    borderTone: 500,
  },
  overlay: {
    value: "overlay",
    label: "Overlay",
    description: "Modales, popovers.",
    surfaceTone: 700,
    textTone: 50,
    borderTone: 600,
  },
  muted: {
    value: "muted",
    label: "Muted",
    description: "Zone secondaire.",
    surfaceTone: 800,
    textTone: 50,
    borderTone: 700,
  },
  inverted: {
    value: "inverted",
    label: "Inverted",
    description: "Contraste inversé.",
    surfaceTone: 50,
    textTone: 900,
    borderTone: 200,
  },
} as const satisfies Record<string, SurfaceConstant>;

/**
 * @type Surface
 * @description Token de surface dérivé de {@link SURFACES}.
 * Utilisé pour la prop `surface` des composants conteneurs.
 */
export type Surface = keyof typeof SURFACES;
