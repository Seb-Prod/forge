import { COMPONENT_VARIANTS } from "@workspace/ui/constants";
import {
  BaseProps,
  ComponentAppearanceProps,
} from "@workspace/ui/types";


export type ButtonVariant = (typeof COMPONENT_VARIANTS.button)[number];

export interface ButtonProps extends BaseProps, ComponentAppearanceProps<ButtonVariant> {
  loading?: boolean;
}

export const DEFAULT_PROPS: Partial<ButtonProps> = {
  tone: "primary",
  variant: "solid",
  size: "md",
};
