import {
  Tone,
  Size,
  AxisSpacing,
  Spacing,
  Variant,
} from "@workspace/ui/constants";
import { BaseProps } from "@workspace/ui/types";

export const BUTTON_SIZES = {
  sm: {
    height: 32,
    paddingX: 12,
    fontSize: 14,
    radius: "md",
  },

  md: {
    height: 40,
    paddingX: 16,
    fontSize: 16,
    radius: "lg",
  },

  lg: {
    height: 48,
    paddingX: 20,
    fontSize: 18,
    radius: "xl",
  },
};
export interface ButtonProps extends BaseProps {
  loading?: boolean;
  tone?: Tone;
  variant?: Variant;
  size?: Size;
  paddingX?: AxisSpacing<Spacing>;
}

export const DEFAULT_PROPS: Partial<ButtonProps> = { tone: "secondary", variant:"outline" };
