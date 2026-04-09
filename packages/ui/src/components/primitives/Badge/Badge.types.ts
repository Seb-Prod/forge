import { APPEARANCES, Size, Tone } from "@workspace/ui/constants";
import { pickConstants } from "@workspace/ui/utils";
import { HTMLAttributes, ReactNode } from "react";

// 🎨 Constantes d'apparence du Badge
export const BADGE_APPEARANCES = pickConstants(APPEARANCES, [
  "filled",
  "outline",
  "soft",
]);

export const BADGE_VARIANTS = {
  default: {
    value: "default",
    label: "Default",
    description: "Badge standard sans style particulier",
  },
  dot: {
    value: "dot",
    label: "Dot",
    description: "Badge avec point indicateur pour signaler un statut",
  },
  pill: {
    value: "pill",
    label: "Pill",
    description: "Badge arrondi en forme de capsule",
  },
  removable: {
    value: "removable",
    label: "Removable",
    description: "Badge avec bouton de suppression intégré",
  },
} as const;

// 🧠 Types
export type BadgeAppearance = keyof typeof BADGE_APPEARANCES;
export type BadgeVariant = keyof typeof BADGE_VARIANTS;

// ⚙️ Props du composant
export interface BadgeProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children"
> {
  // 🎨 UI
  tone?: Tone;
  appearance?: BadgeAppearance;
  variant?: BadgeVariant;
  size?: Size;

  // 🏷 Contenu
  children?: ReactNode;

  // ✨ Icônes
  startIcon?: ReactNode;
  endIcon?: ReactNode;

  // ❌ Actions
  onRemove?: () => void;

  // 🛠 Customisation
  className?: string;
}

// 🎯 Valeurs par défaut du Badge
export const DEFAULT_PROPS = {
  tone: "danger",
  appearance: "filled",
  size: "md",
  variant: "default",
  children: "Badge",
} as const;
