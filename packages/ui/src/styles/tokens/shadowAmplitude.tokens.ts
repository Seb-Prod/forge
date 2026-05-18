import { ComponentSize } from "@workspace/ui/constants";
import { ShadowAmplitude } from "@workspace/ui/types";
import { ShadowLayer } from "@workspace/ui/types/shadow.types";

export const SHADOW_AMPLITUDE_BY_SIZE: Record<ComponentSize, ShadowAmplitude> =
  {
    xxs: {
      soft: { offsetY: 1, blur: 1, spread: 0, opacity: 0.08 },
      raised: { offsetY: 2, blur: 4, spread: 0, opacity: 0.12 },
      pressed: { offsetY: 0, blur: 1, spread: 0, opacity: 0.06 },
      flat: { offsetY: 0, blur: 0, spread: 0, opacity: 0 },
    },
    xs: {
      soft: { offsetY: 1, blur: 2, spread: 0, opacity: 0.08 },
      raised: { offsetY: 2, blur: 4, spread: 0, opacity: 0.12 },
      pressed: { offsetY: 0, blur: 1, spread: 0, opacity: 0.06 },
      flat: { offsetY: 0, blur: 0, spread: 0, opacity: 0 },
    },
    sm: {
      soft: { offsetY: 1, blur: 2, spread: 0, opacity: 0.1 },
      raised: { offsetY: 3, blur: 6, spread: 0, opacity: 0.13 },
      pressed: { offsetY: 1, blur: 1, spread: 0, opacity: 0.06 },
      flat: { offsetY: 0, blur: 0, spread: 0, opacity: 0 },
    },
    md: {
      soft: { offsetY: 1, blur: 2, spread: 0, opacity: 0.1 },
      raised: { offsetY: 4, blur: 8, spread: 0, opacity: 0.15 },
      pressed: { offsetY: 1, blur: 2, spread: 0, opacity: 0.06 },
      flat: { offsetY: 0, blur: 0, spread: 0, opacity: 0 },
    },
    lg: {
      soft: { offsetY: 2, blur: 4, spread: 0, opacity: 0.1 },
      raised: { offsetY: 6, blur: 12, spread: 0, opacity: 0.15 },
      pressed: { offsetY: 1, blur: 2, spread: 0, opacity: 0.06 },
      flat: { offsetY: 0, blur: 0, spread: 0, opacity: 0 },
    },
    xl: {
      soft: { offsetY: 2, blur: 6, spread: 0, opacity: 0.1 },
      raised: { offsetY: 8, blur: 16, spread: 0, opacity: 0.15 },
      pressed: { offsetY: 1, blur: 3, spread: 0, opacity: 0.06 },
      flat: { offsetY: 0, blur: 0, spread: 0, opacity: 0 },
    },
    "2xl": {
      soft: { offsetY: 3, blur: 8, spread: 0, opacity: 0.1 },
      raised: { offsetY: 10, blur: 20, spread: 0, opacity: 0.15 },
      pressed: { offsetY: 1, blur: 4, spread: 0, opacity: 0.06 },
      flat: { offsetY: 0, blur: 0, spread: 0, opacity: 0 },
    },
    "3xl": {
      soft: { offsetY: 4, blur: 10, spread: 0, opacity: 0.1 },
      raised: { offsetY: 12, blur: 24, spread: 0, opacity: 0.15 },
      pressed: { offsetY: 2, blur: 4, spread: 0, opacity: 0.06 },
      flat: { offsetY: 0, blur: 0, spread: 0, opacity: 0 },
    },
  };

export type ShadowAmplitude3D = {
  default: ShadowLayer[];
  hover: ShadowLayer[];
  active: ShadowLayer[];
  disabled: ShadowLayer[];
};

export const SHADOW_3D_AMPLITUDE_BY_SIZE: Record<
  ComponentSize,
  ShadowAmplitude3D
> = {
  xxs: {
    default: [
      { offsetY: 1, blur: 0, spread: 0, colorVar: "highlight", opacity: null },
      { offsetY: 1, blur: 0, spread: 0, colorVar: "shadow", opacity: null },
      { offsetY: 2, blur: 3, spread: 0, colorVar: "shadow", opacity: 0.14 },
    ],
    hover: [
      { offsetY: 1, blur: 0, spread: 0, colorVar: "highlight", opacity: null },
      { offsetY: 2, blur: 0, spread: 0, colorVar: "shadow", opacity: null },
      { offsetY: 3, blur: 4, spread: 0, colorVar: "shadow", opacity: 0.16 },
    ],
    active: [
      { offsetY: 1, blur: 0, spread: 0, colorVar: "highlight", opacity: null },
      { offsetY: 0, blur: 0, spread: 0, colorVar: "shadow", opacity: null },
      { offsetY: 1, blur: 2, spread: 0, colorVar: "shadow", opacity: 0.1 },
    ],
    disabled: [],
  },

  xs: {
    default: [
      { offsetY: 1, blur: 0, spread: 0, colorVar: "highlight", opacity: null },
      { offsetY: 1, blur: 0, spread: 0, colorVar: "shadow", opacity: null },
      { offsetY: 2, blur: 4, spread: 0, colorVar: "shadow", opacity: 0.14 },
    ],
    hover: [
      { offsetY: 1, blur: 0, spread: 0, colorVar: "highlight", opacity: null },
      { offsetY: 2, blur: 0, spread: 0, colorVar: "shadow", opacity: null },
      { offsetY: 4, blur: 5, spread: 0, colorVar: "shadow", opacity: 0.16 },
    ],
    active: [
      { offsetY: 1, blur: 0, spread: 0, colorVar: "highlight", opacity: null },
      { offsetY: 0, blur: 0, spread: 0, colorVar: "shadow", opacity: null },
      { offsetY: 1, blur: 2, spread: 0, colorVar: "shadow", opacity: 0.1 },
    ],
    disabled: [],
  },

  sm: {
    default: [
      { offsetY: 1, blur: 0, spread: 0, colorVar: "highlight", opacity: null },
      { offsetY: 2, blur: 0, spread: 0, colorVar: "shadow", opacity: null },
      { offsetY: 3, blur: 5, spread: 0, colorVar: "shadow", opacity: 0.15 },
    ],
    hover: [
      { offsetY: 1, blur: 0, spread: 0, colorVar: "highlight", opacity: null },
      { offsetY: 3, blur: 0, spread: 0, colorVar: "shadow", opacity: null },
      { offsetY: 5, blur: 7, spread: 0, colorVar: "shadow", opacity: 0.17 },
    ],
    active: [
      { offsetY: 1, blur: 0, spread: 0, colorVar: "highlight", opacity: null },
      { offsetY: 0, blur: 0, spread: 0, colorVar: "shadow", opacity: null },
      { offsetY: 1, blur: 2, spread: 0, colorVar: "shadow", opacity: 0.1 },
    ],
    disabled: [],
  },

  md: {
    default: [
      { offsetY: 1, blur: 0, spread: 0, colorVar: "highlight", opacity: null },
      { offsetY: 2, blur: 0, spread: 0, colorVar: "shadow", opacity: null },
      { offsetY: 4, blur: 6, spread: 0, colorVar: "shadow", opacity: 0.16 },
    ],
    hover: [
      { offsetY: 1, blur: 0, spread: 0, colorVar: "highlight", opacity: null },
      { offsetY: 3, blur: 0, spread: 0, colorVar: "shadow", opacity: null },
      { offsetY: 6, blur: 8, spread: 0, colorVar: "shadow", opacity: 0.18 },
    ],
    active: [
      { offsetY: 1, blur: 0, spread: 0, colorVar: "highlight", opacity: null },
      { offsetY: 0, blur: 0, spread: 0, colorVar: "shadow", opacity: null },
      { offsetY: 1, blur: 2, spread: 0, colorVar: "shadow", opacity: 0.1 },
    ],
    disabled: [],
  },

  lg: {
    default: [
      { offsetY: 2, blur: 0, spread: 0, colorVar: "highlight", opacity: null },
      { offsetY: 4, blur: 0, spread: 0, colorVar: "shadow", opacity: null },
      { offsetY: 6, blur: 10, spread: 0, colorVar: "shadow", opacity: 0.18 },
    ],
    hover: [
      { offsetY: 2, blur: 0, spread: 0, colorVar: "highlight", opacity: null },
      { offsetY: 5, blur: 0, spread: 0, colorVar: "shadow", opacity: null },
      { offsetY: 8, blur: 14, spread: 0, colorVar: "shadow", opacity: 0.2 },
    ],
    active: [
      { offsetY: 1, blur: 0, spread: 0, colorVar: "highlight", opacity: null },
      { offsetY: 1, blur: 0, spread: 0, colorVar: "shadow", opacity: null },
      { offsetY: 2, blur: 4, spread: 0, colorVar: "shadow", opacity: 0.12 },
    ],
    disabled: [],
  },

  xl: {
    default: [
      { offsetY: 2, blur: 0, spread: 0, colorVar: "highlight", opacity: null },
      { offsetY: 5, blur: 0, spread: 0, colorVar: "shadow", opacity: null },
      { offsetY: 8, blur: 14, spread: 0, colorVar: "shadow", opacity: 0.2 },
    ],
    hover: [
      { offsetY: 2, blur: 0, spread: 0, colorVar: "highlight", opacity: null },
      { offsetY: 6, blur: 0, spread: 0, colorVar: "shadow", opacity: null },
      { offsetY: 10, blur: 18, spread: 0, colorVar: "shadow", opacity: 0.22 },
    ],
    active: [
      { offsetY: 1, blur: 0, spread: 0, colorVar: "highlight", opacity: null },
      { offsetY: 2, blur: 0, spread: 0, colorVar: "shadow", opacity: null },
      { offsetY: 3, blur: 5, spread: 0, colorVar: "shadow", opacity: 0.14 },
    ],
    disabled: [],
  },

  "2xl": {
    default: [
      { offsetY: 3, blur: 0, spread: 0, colorVar: "highlight", opacity: null },
      { offsetY: 6, blur: 0, spread: 0, colorVar: "shadow", opacity: null },
      { offsetY: 10, blur: 18, spread: 0, colorVar: "shadow", opacity: 0.22 },
    ],
    hover: [
      { offsetY: 3, blur: 0, spread: 0, colorVar: "highlight", opacity: null },
      { offsetY: 7, blur: 0, spread: 0, colorVar: "shadow", opacity: null },
      { offsetY: 12, blur: 22, spread: 0, colorVar: "shadow", opacity: 0.24 },
    ],
    active: [
      { offsetY: 1, blur: 0, spread: 0, colorVar: "highlight", opacity: null },
      { offsetY: 2, blur: 0, spread: 0, colorVar: "shadow", opacity: null },
      { offsetY: 4, blur: 6, spread: 0, colorVar: "shadow", opacity: 0.15 },
    ],
    disabled: [],
  },

  "3xl": {
    default: [
      { offsetY: 4, blur: 0, spread: 0, colorVar: "highlight", opacity: null },
      { offsetY: 8, blur: 0, spread: 0, colorVar: "shadow", opacity: null },
      { offsetY: 12, blur: 24, spread: 0, colorVar: "shadow", opacity: 0.24 },
    ],
    hover: [
      { offsetY: 4, blur: 0, spread: 0, colorVar: "highlight", opacity: null },
      { offsetY: 9, blur: 0, spread: 0, colorVar: "shadow", opacity: null },
      { offsetY: 14, blur: 28, spread: 0, colorVar: "shadow", opacity: 0.26 },
    ],
    active: [
      { offsetY: 2, blur: 0, spread: 0, colorVar: "highlight", opacity: null },
      { offsetY: 3, blur: 0, spread: 0, colorVar: "shadow", opacity: null },
      { offsetY: 5, blur: 8, spread: 0, colorVar: "shadow", opacity: 0.16 },
    ],
    disabled: [],
  },
};
