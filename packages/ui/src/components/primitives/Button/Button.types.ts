import {
  ComponentSize,
} from "@workspace/ui/constants";
import { BaseProps, ComponentAppearanceProps } from "@workspace/ui/types";
import { lgTokens, mdTokens, smTokens } from "./tokens";
import { ComponentSizeTokens } from "@workspace/ui/helpers/types";

export type ButtonSize = Exclude<
  ComponentSize,
  "xxs" | "xs" | "xl" | "2xl" | "3xl"
>;

export const BUTTON_SIZES: Record<ButtonSize, ComponentSizeTokens> = {
  sm: smTokens,
  md: mdTokens,
  lg: lgTokens,
};

export interface ButtonProps extends BaseProps, ComponentAppearanceProps {
  loading?: boolean;
}

export const DEFAULT_PROPS: Partial<ButtonProps> = {
  tone: "secondary",
  variant: "solid",
  size: "sm",
};
