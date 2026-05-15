import { buildVariantTokens, PaletteBase } from "@workspace/ui/styles";

const outlineBase = {
  text: {
    light: { default: 700, hover: 800, active: 900 },
    dark: { default: 600, hover: 500, active: 300 },
  },
  border: {
    light: { default: 700, hover: 800, active: 900 },
    dark: { default: 600, hover: 500, active: 300 },
  },
} satisfies PaletteBase;

export const tokensOutlineDefault = {
  light: buildVariantTokens(outlineBase, "light"),
  dark: buildVariantTokens(outlineBase, "dark"),
} as const;