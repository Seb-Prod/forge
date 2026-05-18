import { CSSProperties } from "react";
import {
  ComponentAppearanceProps,
  ComponentSizeTokens,
  VariantMotionMap,
  VariantShadowMap,
  VariantStateMap,
} from "../types";
import { getComponentSizeStyle } from "./styles/getComponentSizeStyle";
import { getComponentVariantStyle } from "./styles/getComponentVariantStyle";
import { getComponentShadowStyle } from "./styles/getComponentShadowStyle";
import { getComponentMotionStyle } from "./styles/getComponentMotionStyle";
import { ComponentSize } from "../constants";

type Mode = "light" | "dark";

type GetComponentStyleParams<TSize extends string> =
  ComponentAppearanceProps & {
    size?: TSize;
    sizes?: Record<TSize, ComponentSizeTokens>;
    mode?: Mode;
    colors?: Record<Mode, Partial<VariantStateMap>>;
    shadows?: VariantShadowMap;  // ← nouveau type
    motions?: VariantMotionMap;
  };

export const getComponentStyle = <TSize extends string>(
  props: GetComponentStyleParams<TSize>,
): CSSProperties => {
  const colorVars =
    props.variant && props.colors
      ? getComponentVariantStyle({
          tone: props.tone,
          variant: props.variant,
          mode: props.mode,
          appearances: props.colors,
        })
      : {};

  const sizeVars =
    props.size && props.sizes
      ? getComponentSizeStyle({
          size: props.size,
          sizes: props.sizes,
        })
      : {};

  const shadowVars =
    props.variant && props.size && props.shadows
      ? getComponentShadowStyle({
          variant: props.variant,  // ← manquait
          size: props.size as ComponentSize,
          shadows: props.shadows,
        })
      : {};

  const motionVars =
    props.variant && props.size && props.motions
      ? getComponentMotionStyle({
          variant: props.variant,
          size: props.size as ComponentSize,
          motions: props.motions,
        })
      : {};

  return {
    ...colorVars,
    ...sizeVars,
    ...shadowVars,
    ...motionVars,
  };
};