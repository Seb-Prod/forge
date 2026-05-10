import { ComponentStateMap } from "../types";

export const solidTokens: Record<"light" | "dark", ComponentStateMap> = {
  light: {
    default: {
      bg: 500,
      text: 50,
      border: 600,
      shadow: 1,
    },

    hover: {
      bg: 600,
      text: 50,
      border: 700,
      shadow: 2,
    },

    active: {
      bg: 700,
      text: 50,
      border: 800,
      shadow: 1,
    },

    disabled: {
      bg: 200,
      text: 400,
      border: 200,
      shadow: 0,
    },

    focus: {
      bg: 500,
      text: 50,
      border: 600,
      shadow: 2,
    },
  },

  dark: {
    default: {
      bg: 500,
      text: 50,
      border: 500,
      shadow: 1,
    },

    hover: {
      bg: 400,
      text: 50,
      border: 400,
      shadow: 2,
    },

    active: {
      bg: 300,
      text: 50,
      border: 300,
      shadow: 1,
    },

    disabled: {
      bg: 800,
      text: 600,
      border: 700,
      shadow: 0,
    },

    focus: {
      bg: 500,
      text: 50,
      border: 300,
      shadow: 2,
    },
  },
} as const;