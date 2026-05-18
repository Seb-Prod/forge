import { ComponentSize } from "@workspace/ui/constants";
import {
  ResolvedShadowState,
  ResolvedVariantShadow,
  ShadowAmplitude,
  ShadowStateIntent,
  VariantShadowTokens,
} from "@workspace/ui/types";
import { SHADOW_AMPLITUDE_BY_SIZE } from "../tokens/shadowAmplitude.tokens";

const resolveShadowState = (
  intent: ShadowStateIntent,
  amplitude: ShadowAmplitude,
): ResolvedShadowState => {
  if (intent.shadow === "none")
    return { offsetY: 0, blur: 0, spread: 0, opacity: 0 };
  return amplitude[intent.shadow];
};

export const resolveVariantShadow = (
  variantShadow: VariantShadowTokens,
  size: ComponentSize,
): ResolvedVariantShadow => {
  const amplitude = SHADOW_AMPLITUDE_BY_SIZE[size];

  return {
    default: variantShadow.default
      ? resolveShadowState(variantShadow.default, amplitude)
      : undefined,
    hover: variantShadow.hover
      ? resolveShadowState(variantShadow.hover, amplitude)
      : undefined,
    active: variantShadow.active
      ? resolveShadowState(variantShadow.active, amplitude)
      : undefined,
    focus: variantShadow.focus
      ? resolveShadowState(variantShadow.focus, amplitude)
      : undefined,
    disabled: variantShadow.disabled
      ? resolveShadowState(variantShadow.disabled, amplitude)
      : undefined,
  };
};
