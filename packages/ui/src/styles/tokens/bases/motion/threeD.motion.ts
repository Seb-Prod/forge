import { VariantMotionTokens } from "@workspace/ui/types";

export const motion3D: VariantMotionTokens = {
  hover:    { translateY: "up",   scale: "grow" },
  active:   { translateY: "down", scale: "shrink" },
  disabled: { opacity: "fade" },
};