import { ComponentStateMap } from "@workspace/ui/types";

export const solidTokensDefault: Record<"light" | "dark", ComponentStateMap> = {
  light: {
    default: {
      bg: 500,
      text: 50,
      border: 600,
    },

    hover: {
      bg: 600,
      text: 50,
      border: 700,
    },

    active: {
      bg: 700,
      text: 50,
      border: 800,
    },

    disabled: {
      bg: 200,
      text: 400,
      border: 200,
    },

    focus: {
      bg: 500,
      text: 50,
      border: 600,
    },
  },

  dark: {
    default: {
      bg: 500,
      text: 50,
      border: 500,
    },

    hover: {
      bg: 400,
      text: 50,
      border: 400,
    },

    active: {
      bg: 300,
      text: 50,
      border: 300,
    },

    disabled: {
      bg: 800,
      text: 600,
      border: 700,
    },

    focus: {
      bg: 500,
      text: 50,
      border: 300,
    },
  },
} as const;