import { ComponentSize } from "@workspace/ui/constants";
import { ShadowAmplitude } from "@workspace/ui/types";

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
