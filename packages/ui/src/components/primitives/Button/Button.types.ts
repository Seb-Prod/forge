import {
  BaseProps,
  ComponentAppearanceProps,
} from "@workspace/ui/types";

export const BUTTON_VARIANTS = [
  "solid",
  "outline",
  "ghost",
] as const;

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

export interface ButtonProps extends BaseProps, ComponentAppearanceProps<ButtonVariant> {
  loading?: boolean;
}

export const DEFAULT_PROPS: Partial<ButtonProps> = {
  tone: "primary",
  variant: "solid",
  size: "md",
};
