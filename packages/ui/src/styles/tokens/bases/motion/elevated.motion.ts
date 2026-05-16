import { VariantMotionTokens } from "@workspace/ui/types";

export const elevatedMotion: VariantMotionTokens = {
  hover:    { translateY: "up",   scale: "grow" },
  active:   { translateY: "down", scale: "shrink" },
  disabled: { opacity: "fade" },
};