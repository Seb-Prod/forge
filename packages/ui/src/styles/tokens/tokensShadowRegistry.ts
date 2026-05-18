import { VariantShadowMap } from "@workspace/ui/types";
import {
  elevatedShadow,
  ghostShadow,
  outlineShadow,
  solidShadow,
} from "./bases/shadow";

export const COMPONENT_SHADOW_TOKENS_DEFAULT = {
  solid: solidShadow,
  ghost: ghostShadow,
  outline: outlineShadow,
  elevated: elevatedShadow,
} as const satisfies VariantShadowMap;
