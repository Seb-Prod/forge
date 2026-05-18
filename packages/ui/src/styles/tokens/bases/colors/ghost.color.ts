import { buildColorTokens } from "@workspace/ui/styles";
import { PaletteBase } from "@workspace/ui/types";

const ghostColors = {
  text: {
    light: { default: 700, hover: 800, active: 900, focus: 700, disabled: 700 },
    dark: { default: 600, hover: 500, active: 300, focus: 600, disabled: 600 },
  },
} satisfies PaletteBase;

export const tokensGhostDefault = {
  light: buildColorTokens(ghostColors, "light"),
  dark: buildColorTokens(ghostColors, "dark"),
} as const;
