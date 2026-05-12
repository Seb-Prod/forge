import { VariantStateMap } from "@workspace/ui/types";
import {
  elevatedTokensDefault,
  ghostTokensDefault,
  outlineTokensDefault,
  softTokensDefault,
  solidTokensDefault,
} from "./componentAppearanceTokens";

export const COMPONENT_VARIANT_TOKENS_DEFAULT: Record<
  "light" | "dark",
  VariantStateMap
> = {
  light: {
    solid: solidTokensDefault.light,
    soft: softTokensDefault.light,
    ghost: ghostTokensDefault.light,
    outline: outlineTokensDefault.light,
    elevated: elevatedTokensDefault.light,
  },
  dark: {
    solid: solidTokensDefault.dark,
    soft: softTokensDefault.dark,
    ghost: ghostTokensDefault.dark,
    outline: outlineTokensDefault.dark,
    elevated: elevatedTokensDefault.dark,
  },
} as const;
