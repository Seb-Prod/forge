import { Size, Tone, Animation, Appearance, APPEARANCES } from "@workspace/ui/constants";
import { pickConstants } from "@workspace/ui/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

// 🎨 Constantes d'apparence
export const BUTTON_APPEARANCES = pickConstants(APPEARANCES, [
  "filled",
  "outline",
  "ghost",
  "link"
]);

// 🧠 Types
export type ButtonAppearance = keyof typeof BUTTON_APPEARANCES;

// ⚙️ Props du composant
export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  // 🎨 UI
  tone?: Tone;
  appearance?: ButtonAppearance;
  size?: Size;
  animation?: Animation;

  // 🏷 Contenu
  children?: ReactNode;

  // ✨ Icônes
  icon?: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  iconOnly?: boolean;

  // ⚙️ États
  fullWidth?: boolean;
  loading?: boolean;
  loadingText?: string;

  // 🛠 Customisation
  className?: string;
}

// 🎯 Valeurs par défaut du Button
export const DEFAULT_PROPS = {
  tone: "primary",
  appearance: "filled",
  size: "md",
  animation: "none",
  children: "Button",
  loading: false,
  iconOnly: false,
} as const;
