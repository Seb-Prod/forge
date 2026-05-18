import { ComponentSize } from "@workspace/ui/constants";
import {
  MotionAmplitude,
  MotionStateIntent,
  ResolvedMotionState,
  ResolvedVariantMotion,
  VariantMotionTokens,
} from "@workspace/ui/types";
import { MOTION_AMPLITUDE_BY_SIZE } from "../tokens/motionAmplitude.tokens";

const resolveMotionState = (
  intent: MotionStateIntent,
  amplitude: MotionAmplitude,
): ResolvedMotionState => ({
  translateY:
    intent.translateY === "up"
      ? -amplitude.up
      : intent.translateY === "down"
        ? amplitude.down
        : 0,

  scale:
    intent.scale === "grow"
      ? amplitude.grow
      : intent.scale === "shrink"
        ? amplitude.shrink
        : 1,

  opacity: intent.opacity === "fade" ? amplitude.fade : 1,
});

export const resolveVariantMotion = (
  variantMotion: VariantMotionTokens,
  size: ComponentSize,
): ResolvedVariantMotion => {
  const amplitude = MOTION_AMPLITUDE_BY_SIZE[size];

  return {
    hover: variantMotion.hover
      ? resolveMotionState(variantMotion.hover, amplitude)
      : undefined,
    active: variantMotion.active
      ? resolveMotionState(variantMotion.active, amplitude)
      : undefined,
    focus: variantMotion.focus
      ? resolveMotionState(variantMotion.focus, amplitude)
      : undefined,
    disabled: variantMotion.disabled
      ? resolveMotionState(variantMotion.disabled, amplitude)
      : undefined,
  };
};
