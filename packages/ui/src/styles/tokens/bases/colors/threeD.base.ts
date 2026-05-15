import { buildVariantTokens, PaletteBase } from "@workspace/ui/styles";

const threeDBase = {
  bg: {
    light: { default: 500, hover: 600, active: 700 },
    dark: { default: 500, hover: 400, active: 300 },
  },
  text: {
    light: { default: 50, hover: 50, active: 50 },
    dark: { default: 50, hover: 50, active: 50 },
  },
  border: {
    light: { default: 600, hover: 700, active: 800 },
    dark: { default: 500, hover: 400, active: 300 },
  },
  shadow: {
    light: { default: 900 },
    dark: { default: 100, active: 200 },
  },
  highlight: {
    light: { default: 700 },
    dark: { default: 900, active: 950 },
  },
} satisfies PaletteBase;

export const tokens3DDefault = {
  light: buildVariantTokens(threeDBase, "light"),
  dark: buildVariantTokens(threeDBase, "dark"),
} as const;