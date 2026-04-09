import { BorderSize, Shadow, Surface, Tone } from "@workspace/ui/constants";
import {
  GapValue,
  MarginValue,
  PaddingValue,
  RadiusValue,
} from "@workspace/ui/helpers";
import { ReactNode } from "react";

// 🎨 Constantes
export const BOX_OVERFLOW = {
  none: {
    value: "none",
    label: "None",
    description: "Aucun overflow",
  },
  x: {
    value: "x",
    label: "X",
    description: "Scroll horizontal",
  },
  y: {
    value: "y",
    label: "Y",
    description: "Scroll vertical",
  },
  both: {
    value: "both",
    label: "Both",
    description: "Scroll horizontal et vertical",
  },
  hidden: {
    value: "hidden",
    label: "Hidden",
    description: "Cache le contenu qui dépasse",
  },
} as const;

// 🧠 Types
export type BoxOverflow = keyof typeof BOX_OVERFLOW;

// ⚙️ Props du composant
export interface BoxProps {
  // 🎨 UI
  surface?: Surface;
  tone?: Tone;

  // 📐 Espacement
  padding?: PaddingValue;
  margin?: MarginValue;
  gap?: GapValue;

  // 📏 Dimensions
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
  minHeight?: string;
  maxHeight?: string;
  minWidth?: string;
  maxWidth?: string;

  // 🎨 Apparence
  border?: BorderSize;
  shadow?: Shadow;
  radius?: RadiusValue;
  overflow?: BoxOverflow;
  flexDirection?: "row" | "column";

  // 🏷 Contenu
  children?: ReactNode;

  // 🛠 Customisation
  className?: string;
  style?: React.CSSProperties;
}

// 🎯 Valeurs par défaut
export const DEFAULT_PROPS: Partial<BoxProps> = {
  surface: "base",
  border: "none",
  overflow: "none",
  radius: "none",
  flexDirection: "column",
};
