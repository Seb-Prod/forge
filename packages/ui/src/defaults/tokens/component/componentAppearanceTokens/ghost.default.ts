import { ComponentStateMap } from "@workspace/ui/types";

export const ghostTokensDefault: Record<"light" | "dark", ComponentStateMap> = {
  light: {
    default: {
      text: 700,
    },

    hover: {
      text: 800,
    },

    active: {
      text: 900,
    },

    disabled: {
      text: 300,
    },

    focus: {
      text: 600,
    },
  },

  dark: {
    default: {
      text: 600,
    },

    hover: {
      text: 500,
    },

    active: {
      text: 300,
    },

    disabled: {
      text: 700,
    },

    focus: {
      text: 100,
    },
  },
} as const;
