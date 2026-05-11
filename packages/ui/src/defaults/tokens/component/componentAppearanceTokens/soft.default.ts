import { ComponentStateMap } from "@workspace/ui/types";

export const softTokensDefault: Record<"light" | "dark", ComponentStateMap> = {
  light: {
    default: {
      bg: 100,
      text: 700,
      border: 200,
      shadow: 50,
    },

    hover: {
      bg: 200,
      text: 800,
      border: 300,
      shadow: 50,
    },

    active: {
      bg: 300,
      text: 900,
      border: 400,
      shadow: 50,
    },

    disabled: {
      bg: 100,
      text: 400,
      border: 200,
      shadow: 50,
    },

    focus: {
      bg: 100,
      text: 800,
      border: 400,
      shadow: 50,
    },
  },

  dark: {
    default: {
      bg: 800,
      text: 100,
      border: 700,
      shadow: 50,
    },

    hover: {
      bg: 700,
      text: 50,
      border: 600,
      shadow: 50,
    },

    active: {
      bg: 600,
      text: 50,
      border: 500,
      shadow: 50,
    },

    disabled: {
      bg: 900,
      text: 700,
      border: 800,
      shadow: 50,
    },

    focus: {
      bg: 800,
      text: 50,
      border: 500,
      shadow: 50,
    },
  },
} as const;
