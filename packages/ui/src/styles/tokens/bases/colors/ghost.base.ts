import { buildVariantTokens, PaletteBase } from "@workspace/ui/styles";

const ghostBase = {
  text: {
    light: { default: 700, hover: 800, active: 900 },
    dark: { default: 600, hover: 500, active: 300 },
  },
} satisfies PaletteBase;

export const tokensGhostDefault = {
  light: buildVariantTokens(ghostBase, "light"),
  dark: buildVariantTokens(ghostBase, "dark"),
} as const;
