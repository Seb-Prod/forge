import {
  TextAlign,
  TextDecoration,
  TextLineHeight,
  TextSize,
  TextTransform,
  TextWeight,
  Tone,
  ToneIntensity,
} from "@workspace/ui/constants";
import { TextTag } from "@workspace/ui/constants/ui/typography/textTag";
import { Color } from "@workspace/ui/types";
import { ReactNode } from "react";

/**
 * Props du composant Text.
 */
export interface TextProps {
  // 🎨 Apparence
  tone?: Tone;
  intensity?: ToneIntensity;
  color?: Color;

  size?: TextSize;
  weight?: TextWeight;
  lineHeight?: TextLineHeight;

  align?: TextAlign;
  transform?: TextTransform;
  decoration?: TextDecoration;

  italic?: boolean;
  truncate?: boolean;
  lineClamp?: number;

  // 🚀 Variante
  variant?: "body" | "caption" | "label" | "title";

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
  as: "span",
  size: "lg",
  weight: "regular",
  align: "left",
  transform: "none",
} as const satisfies Partial<TextProps>;
