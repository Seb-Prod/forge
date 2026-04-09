import { Appearance, APPEARANCES, Size, Tone } from "@workspace/ui/constants";
import { pickConstants } from "@workspace/ui/utils";

// ─────────────────────────────────────────────
// Enums / Constantes
// ─────────────────────────────────────────────

export const CHECKBOX_APPEARANCES = pickConstants(APPEARANCES, [
  "filled",
  "outline",
  "soft",
  'ghost'
]);

export const CHECKBOX_NAMES = {
  primary: {
    value: "primary",
    label: "Primary",
    description: "La description",
  },
} as const;

// ─────────────────────────────────────────────
// Types dérivés
// ─────────────────────────────────────────────

export type CheckboxAppearance = keyof typeof CHECKBOX_APPEARANCES;
export type CheckboxName = keyof typeof CHECKBOX_NAMES;

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

type CheckboxIconProps =
  | {
      iconChecked?: undefined;
      iconUnchecked?: undefined;
    }
  | {
      iconChecked: React.ReactNode;
      iconUnchecked: React.ReactNode;
    };

export type CheckboxProps =
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> &
  CheckboxIconProps & {
    label?: string;
    labelClassName?: string;
    tone?: Tone;
    size?: Size;
    appearance?: Appearance;
    indeterminate?: boolean;
    iconIndeterminate?: React.ReactNode
  };

// ─────────────────────────────────────────────
// Valeurs par défaut
// ─────────────────────────────────────────────

export const DEFAULT_PROPS = {
  tone: "neutral",
  size: "md",
  appearance: "filled",
} as const;
