import { VariantMotionMap } from "@workspace/ui/types";
import {
  elevatedMotion,
  ghostMotion,
  motion3D,
  outlineMotion,
  solidMotion,
} from "./bases/motion";

export const COMPONENT_MOTION_TOKENS_DEFAULT = {
  solid: solidMotion,
  ghost: ghostMotion,
  outline: outlineMotion,
  elevated: elevatedMotion,
  "3d": motion3D,
} as const satisfies VariantMotionMap;
