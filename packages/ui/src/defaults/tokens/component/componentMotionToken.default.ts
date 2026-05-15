import { ComponentSize, Variant } from "@workspace/ui/constants";
import { createSolidMotion } from "@workspace/ui/helpers/motion/createSolidMotion";

import { ComponentMotionMap } from "@workspace/ui/types/component.type";

export const COMPONENT_MOTION_TOKENS_DEFAULT: Record<
  Variant,
  Record<ComponentSize, ComponentMotionMap>
> = {
  solid: {
    xxs: createSolidMotion("xxs"),
    md: createSolidMotion("md"),
    lg: createSolidMotion("lg"),
    xs: createSolidMotion("xs"),
    sm: createSolidMotion("sm"),
    xl: createSolidMotion("xl"),
    "2xl": createSolidMotion("2xl"),
    "3xl": createSolidMotion("3xl"),
  },

  ghost: {
    xxs: {
      default: {},

      hover: {
        transform: "scale(1.01)",
      },

      active: {
        transform: "scale(.98)",
      },

      disabled: {},
      focus: {},
    },

    md: {
      default: {},

      hover: {
        transform: "scale(1.02)",
      },

      active: {
        transform: "scale(.97)",
      },

      disabled: {},
      focus: {},
    },
    xs: { default: {}, hover: {}, active: {}, disabled: {}, focus: {} },
    sm: { default: {}, hover: {}, active: {}, disabled: {}, focus: {} },
    xl: { default: {}, hover: {}, active: {}, disabled: {}, focus: {} },
    "2xl": { default: {}, hover: {}, active: {}, disabled: {}, focus: {} },
    "3xl": { default: {}, hover: {}, active: {}, disabled: {}, focus: {} },
    lg: { default: {}, hover: {}, active: {}, disabled: {}, focus: {} },
  },

  outline: {} as Record<ComponentSize, ComponentMotionMap>,
  soft: {} as Record<ComponentSize, ComponentMotionMap>,
  elevated: {} as Record<ComponentSize, ComponentMotionMap>,
  "3d": {} as Record<ComponentSize, ComponentMotionMap>,
  link: {} as Record<ComponentSize, ComponentMotionMap>,
};
