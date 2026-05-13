import {
  BaseProps,
  ComponentAppearanceProps,
} from "@workspace/ui/types";

export interface ButtonProps extends BaseProps, ComponentAppearanceProps {
  loading?: boolean;
}

export const DEFAULT_PROPS: Partial<ButtonProps> = {
  tone: "primary",
  variant: "solid",
  size: "md",
};
