// motion.types.ts

export type MotionIntent = "none" | "up" | "down" | "grow" | "shrink" | "fade";

export type MotionStateIntent = {
  translateY?: MotionIntent;
  scale?: MotionIntent;
  opacity?: MotionIntent;
};

export type VariantMotionTokens = {
  hover?: MotionStateIntent;
  active?: MotionStateIntent;
  focus?: MotionStateIntent;
  disabled?: MotionStateIntent;
};

export type MotionAmplitude = {
  up: number;
  down: number;
  grow: number;
  shrink: number;
  fade: number;
};

export type ResolvedMotionState = {
  translateY: number;
  scale: number;
  opacity: number;
};

export type ResolvedVariantMotion = {
  hover?: ResolvedMotionState;
  active?: ResolvedMotionState;
  focus?: ResolvedMotionState;
  disabled?: ResolvedMotionState;
};

export type VariantMotionMap = {
  solid?: VariantMotionTokens;
  ghost?: VariantMotionTokens;
  outline?: VariantMotionTokens;
  elevated?: VariantMotionTokens;
  "3d"?: VariantMotionTokens;
  soft?: VariantMotionTokens;
  link?: VariantMotionTokens;
};