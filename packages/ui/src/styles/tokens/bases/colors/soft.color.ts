import { buildColorTokens } from "@workspace/ui/styles";
import { PaletteBase } from "@workspace/ui/types";

const softColors = {
  bg: {
    light: { default: 100, hover: 200, active: 300 },
    dark: { default: 800, hover: 700, active: 600 },
  },
  text: {
    light: { default: 700, hover: 800, active: 900, focus: 700, disabled: 100 },
    dark: { default: 100, hover: 50, active: 50, focus: 700, disabled: 100 },
  },
  border: {
    light: { default: 100, hover: 200, active: 300 },
    dark: { default: 800, hover: 700, active: 600 },
  },
} satisfies PaletteBase;

export const tokensSoftDefault = {
  light: buildColorTokens(softColors, "light"),
  dark: buildColorTokens(softColors, "dark"),
} as const;
