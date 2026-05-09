import { ComponentStateMap } from "../types";

export const ghostTokens: Record<"light" | "dark", ComponentStateMap> = {
  light: {
    default: {
      bg: 50,
      text: 700,
      border: 50,
      shadow: 0,
    },

    hover: {
      bg: 100,
      text: 800,
      border: 100,
      shadow: 0,
    },

    active: {
      bg: 200,
      text: 900,
      border: 200,
      shadow: 0,
    },

    disabled: {
      bg: 50,
      text: 300,
      border: 50,
      shadow: 0,
    },

    focus: {
      bg: 100,
      text: 800,
      border: 300,
      shadow: 0,
    },
  },

  dark: {
    default: {
      bg: 950,
      text: 200,
      border: 950,
      shadow: 0,
    },

    hover: {
      bg: 900,
      text: 100,
      border: 900,
      shadow: 0,
    },

    active: {
      bg: 800,
      text: 50,
      border: 800,
      shadow: 0,
    },

    disabled: {
      bg: 950,
      text: 700,
      border: 950,
      shadow: 0,
    },

    focus: {
      bg: 900,
      text: 100,
      border: 700,
      shadow: 0,
    },
  },
} as const;
