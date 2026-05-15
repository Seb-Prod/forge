import { ComponentStateMap, ScaleStep } from "@workspace/ui/types";

export type VariantPalette = {
  defaultBg?: ScaleStep;
  hoverBg?: ScaleStep;
  activeBg?: ScaleStep;

  defaultShadow?: ScaleStep;
  defaulthighlight?: ScaleStep;

  defaultText: ScaleStep;
  hoverText: ScaleStep;
  activeText: ScaleStep;

  defaultBorder?: ScaleStep;
  hoverBorder?: ScaleStep;
  activeBorder?: ScaleStep;
};

export const createVariantTokens = (
  palette: VariantPalette,
): ComponentStateMap => ({
  default: {
    bg: palette.defaultBg ?? 0,
    text: palette.defaultText,
    border: palette.defaultBorder ?? 0,
    shadow: palette.defaultShadow ?? 0,
    highlight: palette.defaulthighlight ?? 0,
  },

  hover: {
    bg: palette.hoverBg ?? 0,
    text: palette.hoverText,
    border: palette.hoverBorder ?? 0,
  },

  active: {
    bg: palette.activeBg ?? 0,
    text: palette.activeText,
    border: palette.activeBorder ?? 0,
  },

  disabled: {
    bg: palette.defaultBg ?? 0,
    text: palette.defaultText,
    border: palette.defaultBorder ?? 0,
  },

  focus: {
    bg: palette.defaultBg ?? 0,
    text: palette.defaultText,
    border: palette.defaultBorder ?? 0,
  },
});
