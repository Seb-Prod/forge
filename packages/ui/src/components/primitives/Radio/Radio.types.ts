import { Size, Tone } from "@workspace/ui/constants";

/**
 * Props du composant Radio.
 */
export interface RadioProps {
  // 🎨 Apparence
  tone?: Tone;
  size?: Size;

  // 🛠 Customisation
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Valeur par défaut
 */
export const DEFAULT_PROPS = {
    tone:"neutral",
    size:"md",
} as const satisfies Partial<RadioProps>;