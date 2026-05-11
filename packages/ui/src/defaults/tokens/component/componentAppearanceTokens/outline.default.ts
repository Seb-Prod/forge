import { ComponentStateMap } from "@workspace/ui/types";

export const outlineTokensDefault: Record<"light" | "dark", ComponentStateMap> = {
  light: {
    default: {
      bg: 50,
      text: 700,
      border: 400,
      shadow: 50,
    },

    hover: {
      bg: 100,
      text: 800,
      border: 500,
      shadow: 50,
    },

    active: {
      bg: 200,
      text: 900,
      border: 600,
      shadow: 50,
    },

    disabled: {
      bg: 50,
      text: 300,
      border: 200,
      shadow: 50,
    },

    focus: {
      bg: 50,
      text: 800,
      border: 600,
      shadow: 50,
    },
  },

  dark: {
    default: {
      bg: 950,
      text: 200,
      border: 600,
      shadow: 50,
    },

    hover: {
      bg: 900,
      text: 100,
      border: 500,
      shadow: 50,
    },

    active: {
      bg: 800,
      text: 50,
      border: 400,
      shadow: 50,
    },

    disabled: {
      bg: 950,
      text: 700,
      border: 800,
      shadow: 50,
    },

    focus: {
      bg: 950,
      text: 100,
      border: 400,
      shadow: 50,
    },
  },
} as const;
