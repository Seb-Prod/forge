import { CSSProperties } from "react";
import {
  ComponentAppearanceProps,
  ComponentSizeTokens,
  VariantMotionMap,
  VariantStateMap,
} from "../types";
import { getComponentSizeStyle } from "./styles/getComponentSizeStyle";
import { getComponentVariantStyle } from "./styles/getComponentVariantStyle";
import { getComponentShadowStyle } from "./styles/getComponentShadowStyle";
import {
  ComponentShadowStates,
  UIConstant,
} from "../constants/ui/types/ui-constant";
import { ComponentSize, Variant } from "../constants";
import { getComponentMotionStyle } from "./styles/getComponentMotionStyle";

type Mode = "light" | "dark";

type GetComponentStyleParams<TSize extends string> =
  ComponentAppearanceProps & {
    size?: TSize;
    sizes?: Record<TSize, ComponentSizeTokens>;
    mode?: Mode;
    colors?: Record<Mode, Partial<VariantStateMap>>;
    shadows?: Partial<
      Record<Variant, Record<TSize, UIConstant<ComponentShadowStates>>>
    >;
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
    props.size && props.shadows
      ? getComponentShadowStyle({
          size: props.size,
          shadows: props.shadows,
          variant: props.variant,
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
