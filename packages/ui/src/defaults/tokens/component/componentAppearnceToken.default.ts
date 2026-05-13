import { VariantStateMap } from "@workspace/ui/types";
import {
  elevatedTokensDefault,
  ghostTokensDefault,
  outlineTokensDefault,
  softTokensDefault,
  solidTokensDefault,
  threeDTokensDefault,
} from "./componentAppearanceTokens";

export const COMPONENT_VARIANT_TOKENS_DEFAULT: Record<
  "light" | "dark",
  Partial<VariantStateMap>
> = {
  light: {
    solid: solidTokensDefault.light,
    soft: softTokensDefault.light,
    ghost: ghostTokensDefault.light,
    outline: outlineTokensDefault.light,
    elevated: elevatedTokensDefault.light,
    "3d": threeDTokensDefault.light,
  },
  dark: {
    solid: solidTokensDefault.dark,
    soft: softTokensDefault.dark,
    ghost: ghostTokensDefault.dark,
    outline: outlineTokensDefault.dark,
    elevated: elevatedTokensDefault.dark,
    "3d": threeDTokensDefault.dark,
  },
} as const;
