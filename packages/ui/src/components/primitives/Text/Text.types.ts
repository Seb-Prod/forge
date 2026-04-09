import { TextAlign, TextDecoration, TextSize, TextTransform, TextWeight, Tone, ToneIntensity } from "@workspace/ui/constants";
import { TextTag } from "@workspace/ui/constants/ui/text/textTag";
import { Color } from "@workspace/ui/types";
import { ReactNode } from "react";

// ─────────────────────────────────────────────
// Enums / Constantes
// ─────────────────────────────────────────────




/**
 * Props du composant Text.
 *
 * @see README.md pour la documentation complète et les exemples
 */
export interface TextProps {
  // 🎨 Apparence
  tone?:Tone;
  intensity?:ToneIntensity;
  color?: Color;
  size?: TextSize;
  weight?: TextWeight;
  align?: TextAlign;
  transform?: TextTransform;
  decoration?: TextDecoration;
  italic?: boolean;
  truncate?: boolean;
  lineClamp?: number;

  // // 🏷 Sémantique
  as?: TextTag;
  htmlFor?: string;
  
  // 🏷 Contenu
  children?: ReactNode;

  // 🛠 Customisation
  className?: string;
  style?: React.CSSProperties;
}

// ─────────────────────────────────────────────
// Valeurs par défaut
// ─────────────────────────────────────────────

export const DEFAULT_PROPS = {
  as:"span",
  size: "lg",
  weight: "regular",
  align: "left",
  transform:"none",
} as const satisfies Partial<TextProps>;
