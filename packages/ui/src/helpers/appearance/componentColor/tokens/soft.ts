import { ComponentStateMap } from "../types";

export const softTokens: Record<"light" | "dark", ComponentStateMap> = {
  light: {
    default: {
      bg: 100,
      text: 700,
      border: 200,
      shadow: 0,
    },

    hover: {
      bg: 200,
      text: 800,
      border: 300,
      shadow: 1,
    },

    active: {
      bg: 300,
      text: 900,
      border: 400,
      shadow: 0,
    },

    disabled: {
      bg: 100,
      text: 400,
      border: 200,
      shadow: 0,
    },

    focus: {
      bg: 100,
      text: 800,
      border: 400,
      shadow: 1,
    },
  },

  dark: {
    default: {
      bg: 800,
      text: 100,
      border: 700,
      shadow: 0,
    },

    hover: {
      bg: 700,
      text: 50,
      border: 600,
      shadow: 1,
    },

    active: {
      bg: 600,
      text: 50,
      border: 500,
      shadow: 0,
    },

    disabled: {
      bg: 900,
      text: 700,
      border: 800,
      shadow: 0,
    },

    focus: {
      bg: 800,
      text: 50,
      border: 500,
      shadow: 1,
    },
  },
} as const;
