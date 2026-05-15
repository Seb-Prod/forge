import { buildVariantTokens, PaletteBase } from "@workspace/ui/styles";

const elevatedBase = {
  bg: {
    light: { default: 100, hover: 200, active: 300 },
    dark: { default: 800, hover: 700, active: 600 },
  },
  text: {
    light: { default: 700, hover: 800, active: 900 },
    dark: { default: 100, hover: 50, active: 50 },
  },
  border: {
    light: { default: 100, hover: 200, active: 300 },
    dark: { default: 800, hover: 700, active: 600 },
  },
  shadow: {
    light: { default: 900 },
    dark: { default: 200 },
  },
} satisfies PaletteBase;

export const tokensElevatedDefault = {
  light: buildVariantTokens(elevatedBase, "light"),
  dark: buildVariantTokens(elevatedBase, "dark"),
} as const;
