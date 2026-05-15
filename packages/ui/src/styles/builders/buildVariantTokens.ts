import { ScaleStep } from "@workspace/ui/types";
import { createVariantTokens } from "./createVariantTokens";

type OptionalStateMap = {
  default?: ScaleStep;
  hover?: ScaleStep;
  active?: ScaleStep;
};

type RequiredStateMap = {
  default: ScaleStep;
  hover: ScaleStep;
  active: ScaleStep;
};

type ModeMap<T extends OptionalStateMap = OptionalStateMap> = {
  light?: T;
  dark?: T;
};

export type PaletteBase = {
  bg?: ModeMap;
  text: ModeMap<RequiredStateMap>;
  border?: ModeMap;
  shadow?: ModeMap;
  highlight?: ModeMap;
};

export const buildVariantTokens = (
  palette: PaletteBase,
  mode: "light" | "dark",
) =>
  createVariantTokens({
    defaultBg: palette.bg?.[mode]?.default,
    hoverBg: palette.bg?.[mode]?.hover,
    activeBg: palette.bg?.[mode]?.active,

    defaultText: palette.text[mode]!.default, // non-optionnel
    hoverText: palette.text[mode]!.hover,
    activeText: palette.text[mode]!.active,

    defaultBorder: palette.border?.[mode]?.default,
    hoverBorder: palette.border?.[mode]?.hover,
    activeBorder: palette.border?.[mode]?.active,

    defaultShadow: palette.shadow?.[mode]?.default,
    defaulthighlight: palette.highlight?.[mode]?.default,
  });
