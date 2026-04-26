import { Size, Tone, Variant } from "@workspace/ui/constants";
import { UIConstant } from "@workspace/ui/constants/ui/type";
import { ReactNode } from "react";

type ToggleGroupOption<T extends string> = {
  value: T;
  icon?: ReactNode;
  label?: string;
  ariaLabel?: string;
} & ({ label: string } | { ariaLabel: string });

// ⚙️ Props du composant
export interface ToggleGroupProps<T extends string> {
  // 🎨 UI
  tone?: Tone;

  // 📏 Dimensions
  size?: Size;

  // 🎨 Apparence
  variant?: Variant;

  // 🏷 Contenu
  options: ToggleGroupOption<T>[];

  // 🔁 État
  value: T;
  onChange: (value: T) => void;

  // 🛠 Customisation
  className?: string;
  style?: React.CSSProperties;
}

// 🎯 Valeurs par défaut
export const DEFAULT_PROPS: Partial<ToggleGroupProps<string>> = {
  tone: "primary",
  size: "md",
  variant: "default",
};
