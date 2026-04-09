import { Tone } from "@workspace/ui/constants";

// ─────────────────────────────────────────────
// Enums / Constantes
// ─────────────────────────────────────────────

export const {{nameAllCaps}}_NAMES = {
  primary: {
    value: "primary",
    label: "Primary",
    description: "La description",
  },
} as const;

// ─────────────────────────────────────────────
// Types dérivés des constantes
// ─────────────────────────────────────────────

export type {{name}}Name = keyof typeof {{nameAllCaps}}_NAMES;


/**
 * Props du composant {{name}}.
 *
 * @see README.md pour la documentation complète et les exemples
 */
export interface {{name}}Props {
  /** Label affiché au-dessus du select */
  label: string;
  
  /**
   * Tonalité de couleur sémantique.
   * @default "neutral"
   */
  tone?: Tone;
}

// ─────────────────────────────────────────────
// Valeurs par défaut
// ─────────────────────────────────────────────

export const DEFAULT_PROPS = {
  tone: "neutral",
  
} as const;