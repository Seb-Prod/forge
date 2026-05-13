import { ComponentStateMap } from "@workspace/ui/types";

export const solidTokensDefault: Record<"light" | "dark", ComponentStateMap> = {
  light: {
    default: {
      bg: 500,
      text: 50,
      border: 600,
      shadow: 900,
      highlight: 100,
    },

    hover: {
      bg: 600,
      text: 50,
      border: 700,
      shadow: 950,
      highlight: 50,
    },

    active: {
      bg: 700,
      text: 50,
      border: 800,
      shadow: 950,
      highlight: 200,
    },

    disabled: {
      bg: 200,
      text: 400,
      border: 200,
      shadow: 300,
      highlight: 100,
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
      shadow: 100,
      highlight: 900,
    },

    hover: {
      bg: 400,
      text: 50,
      border: 400,
      shadow: 50,
      highlight: 950,
    },

    active: {
      bg: 300,
      text: 50,
      border: 300,
      shadow: 200,
      highlight: 950,
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
