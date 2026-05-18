import { buildColorTokens } from "@workspace/ui/styles";
import { PaletteBase } from "@workspace/ui/types";

const elevatedColors = {
  bg: {
    light: { default: 100, hover: 200, active: 300 },
    dark: { default: 800, hover: 700, active: 600 },
  },
  text: {
    light: { default: 700, hover: 800, active: 900, focus: 700, disabled: 700 },
    dark: { default: 100, hover: 50, active: 50, focus: 100, disabled: 100 },
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
  light: buildColorTokens(elevatedColors, "light"),
  dark: buildColorTokens(elevatedColors, "dark"),
} as const;
