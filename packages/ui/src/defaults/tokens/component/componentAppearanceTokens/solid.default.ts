import { ComponentStateMap } from "@workspace/ui/types";

export const solidTokensDefault: Record<"light" | "dark", ComponentStateMap> = {
  light: {
    default: {
      bg: 500,
      text: 50,
      border: 600,
      shadow: 50,
    },

    hover: {
      bg: 600,
      text: 50,
      border: 700,
      shadow: 50,
    },

    active: {
      bg: 700,
      text: 50,
      border: 800,
      shadow: 50,
    },

    disabled: {
      bg: 200,
      text: 400,
      border: 200,
      shadow: 50,
    },

    focus: {
      bg: 500,
      text: 50,
      border: 600,
      shadow: 50,
    },
  },

  dark: {
    default: {
      bg: 500,
      text: 50,
      border: 500,
      shadow: 50,
    },

    hover: {
      bg: 400,
      text: 50,
      border: 400,
      shadow: 50,
    },

    active: {
      bg: 300,
      text: 50,
      border: 300,
      shadow: 50,
    },

    disabled: {
      bg: 800,
      text: 600,
      border: 700,
      shadow: 50,
    },

    focus: {
      bg: 500,
      text: 50,
      border: 300,
      shadow: 50,
    },
  },
} as const;