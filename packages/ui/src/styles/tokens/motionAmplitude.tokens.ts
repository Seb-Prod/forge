import { ComponentSize } from "@workspace/ui/constants";
import { MotionAmplitude } from "@workspace/ui/types";

export const MOTION_AMPLITUDE_BY_SIZE: Record<ComponentSize, MotionAmplitude> =
  {
    xxs: { up: 1, down: 1, grow: 1.02, shrink: 0.98, fade: 0.4 },
    xs: { up: 1, down: 1, grow: 1.02, shrink: 0.98, fade: 0.4 },
    sm: { up: 1, down: 2, grow: 1.03, shrink: 0.97, fade: 0.4 },
    md: { up: 2, down: 2, grow: 1.04, shrink: 0.96, fade: 0.4 },
    lg: { up: 2, down: 3, grow: 1.04, shrink: 0.96, fade: 0.4 },
    xl: { up: 3, down: 3, grow: 1.05, shrink: 0.95, fade: 0.4 },
    "2xl": { up: 3, down: 4, grow: 1.05, shrink: 0.95, fade: 0.4 },
    "3xl": { up: 4, down: 4, grow: 1.06, shrink: 0.94, fade: 0.4 },
  };
