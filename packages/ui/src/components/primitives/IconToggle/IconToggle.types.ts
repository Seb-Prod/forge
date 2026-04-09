import { Shadow, Size, Tone } from "@workspace/ui/constants";
import { Color } from "@workspace/ui/types";
import { createElement, ReactNode } from "react";
import { FaCheck, FaTimes } from "react-icons/fa"; 

// ⚙️ Props du composant
export interface IconToggleProps {
  // 🎨 UI
  tone?: Tone;
  color?: Color;

  // 📏 Dimensions
  size?: Size;

  // 🎨 Apparence
  shadow?: Shadow;

  // 🏷 Contenu
  activeIcon: ReactNode;
  inactiveIcon: ReactNode;

  // 🔁 État
  pressed: boolean;
  defaultPressed?: boolean;
  onToggle: (nextState: boolean) => void;

  // ♿ Accessibilité
  ariaLabel: string;

  // 🛠 Customisation
  className?: string;
  style?: React.CSSProperties;
}

// 🎯 Valeurs par défaut
export const DEFAULT_PROPS: Partial<IconToggleProps> = {
  shadow: "none",
  tone: "primary",
  activeIcon: createElement(FaCheck),
  inactiveIcon: createElement(FaTimes),
};
