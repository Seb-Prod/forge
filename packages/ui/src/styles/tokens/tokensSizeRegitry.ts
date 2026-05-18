import { ComponentSize } from "@workspace/ui/constants";
import { ComponentSizeTokens } from "@workspace/ui/types";
import { lgTokensDefault, mdTokensDefault, smTokensDefault, xlTokensDefault, xsTokensDefault, xxlTokensDefault, xxsTokensDefault, xxxlTokensDefault } from "./bases/sizes";

export const COMPONENT_SIZES_TOKENS_DEFAULT: Record<ComponentSize, ComponentSizeTokens> = {
  xxs: xxsTokensDefault,
  xs: xsTokensDefault,
  sm: smTokensDefault,
  md: mdTokensDefault,
  lg: lgTokensDefault,
  xl: xlTokensDefault,
  "2xl": xxlTokensDefault,
  "3xl": xxxlTokensDefault,
};