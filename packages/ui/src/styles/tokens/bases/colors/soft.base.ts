import { buildVariantTokens, PaletteBase } from "@workspace/ui/styles";

const softBase = {
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
} satisfies PaletteBase;

export const tokensSoftDefault = {
  light: buildVariantTokens(softBase, "light"),
  dark: buildVariantTokens(softBase, "dark"),
} as const;