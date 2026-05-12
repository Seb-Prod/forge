import { ComponentStateMap } from "@workspace/ui/types";

export const outlineTokensDefault: Record<"light" | "dark", ComponentStateMap> = {
  light: {
    default: {
      text: 700,
      border: 700,
    },

    hover: {
      text: 800,
      border: 800,
    },

    active: {
      text: 900,
      border: 900,
    },

    disabled: {
      text: 300,
      border: 300,
    },

    focus: {
      text: 800,
      border: 600,
    },
  },

  dark: {
    default: {
      text: 600,
      border: 600,
    },

    hover: {
      text: 500,
      border: 500,
    },

    active: {
      text: 300,
      border: 300,
    },

    disabled: {
      text: 700,
      border: 700,
    },

    focus: {
      text: 100,
      border: 100,
    },
  },
} as const;
