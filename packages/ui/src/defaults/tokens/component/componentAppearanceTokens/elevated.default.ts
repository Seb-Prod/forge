import { ComponentStateMap } from "@workspace/ui/types";

export const elevatedTokensDefault: Record<
  "light" | "dark",
  ComponentStateMap
> = {
  light: {
    default: {
      bg: 100,
      text: 700,
      border: 100,
      shadow: 900,
    },

    hover: {
      bg: 200,
      text: 800,
      border: 200,
    },

    active: {
      bg: 300,
      text: 900,
      border: 300,
    },

    disabled: {
      bg: 100,
      text: 400,
      border: 100,
    },

    focus: {
      bg: 100,
      text: 800,
      border: 100,
    },
  },

  dark: {
    default: {
      bg: 800,
      text: 100,
      border: 800,
      shadow: 200,
    },

    hover: {
      bg: 700,
      text: 50,
      border: 700,
    },

    active: {
      bg: 600,
      text: 50,
      border: 600,
    },

    disabled: {
      bg: 900,
      text: 700,
      border: 900,
    },

    focus: {
      bg: 800,
      text: 50,
      border: 800,
    },
  },
} as const;
