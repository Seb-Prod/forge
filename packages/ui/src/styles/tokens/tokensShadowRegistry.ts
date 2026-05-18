import { VariantShadowMap } from "@workspace/ui/types";
import {
  elevatedShadow,
  ghostShadow,
  outlineShadow,
  shadow3D,
  solidShadow,
} from "./bases/shadow";

export const COMPONENT_SHADOW_TOKENS_DEFAULT = {
  solid: solidShadow,
  ghost: ghostShadow,
  outline: outlineShadow,
  elevated: elevatedShadow,
  "3d": shadow3D,
} as const satisfies VariantShadowMap;
