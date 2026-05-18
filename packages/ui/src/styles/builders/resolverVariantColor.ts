import { ComponentStateMap, PaletteBase, ScaleStep } from "@workspace/ui/types";

// ---------------------------------------------------------------------------
// Internal
// ---------------------------------------------------------------------------

type ColorPalette = {
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

const resolveColorState = (palette: ColorPalette): ComponentStateMap => ({
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

// ---------------------------------------------------------------------------
// Public
// ---------------------------------------------------------------------------

/**
 * @function buildColorTokens
 * @description
 * Transforme une `PaletteBase` en `ComponentStateMap` pour un mode donné.
 *
 * Extrait les scale steps du mode cible (light ou dark) et délègue
 * la résolution finale à `resolveColorState`.
 *
 * Les propriétés optionnelles absentes (bg, border...) tombent sur `0`.
 *
 * @param palette - La palette source définissant les scale steps par mode et état.
 * @param mode    - Le mode cible : `"light"` ou `"dark"`.
 * @returns Un `ComponentStateMap` prêt à être converti en CSS variables.
 *
 * @example
 * export const tokensElevatedDefault = {
 *   light: buildColorTokens(elevatedBase, "light"),
 *   dark:  buildColorTokens(elevatedBase, "dark"),
 * } as const;
 */
export const buildColorTokens = (
  palette: PaletteBase,
  mode: "light" | "dark",
): ComponentStateMap =>
  resolveColorState({
    defaultBg: palette.bg?.[mode]?.default,
    hoverBg: palette.bg?.[mode]?.hover,
    activeBg: palette.bg?.[mode]?.active,

    defaultText: palette.text[mode]!.default,
    hoverText: palette.text[mode]!.hover,
    activeText: palette.text[mode]!.active,

    defaultBorder: palette.border?.[mode]?.default,
    hoverBorder: palette.border?.[mode]?.hover,
    activeBorder: palette.border?.[mode]?.active,

    defaultShadow: palette.shadow?.[mode]?.default,
    defaulthighlight: palette.highlight?.[mode]?.default,
  });