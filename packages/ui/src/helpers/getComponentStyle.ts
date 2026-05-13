import { CSSProperties } from "react";
import {
  ComponentAppearanceProps,
  ComponentSizeTokens,
  VariantStateMap,
} from "../types";
import { getComponentSizeStyle } from "./styles/getComponentSizeStyle";
import { getComponentVariantStyle } from "./styles/getComponentVariantStyle";
import { getComponentShadowStyle } from "./styles/getComponentShadowStyle";
import {
  ComponentShadowStates,
  UIConstant,
} from "../constants/ui/types/ui-constant";
import { Variant } from "../constants";


type Mode = "light" | "dark";

type GetComponentStyleParams<TSize extends string> =
  ComponentAppearanceProps & {
    size?: TSize;
    sizes?: Record<TSize, ComponentSizeTokens>;
    mode?: Mode;
    appearances?: Record<Mode, Partial<VariantStateMap>>;
    shadows?: Partial<
      Record<Variant, Record<TSize, UIConstant<ComponentShadowStates>>>
    >;
  };

export const getComponentStyle = <TSize extends string>(
  props: GetComponentStyleParams<TSize>,
): CSSProperties => {
  const colorVars =
    props.variant && props.appearances
      ? getComponentVariantStyle({
          tone: props.tone,
          variant: props.variant,
          mode: props.mode,
          appearances: props.appearances,
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

  return {
    ...colorVars,
    ...sizeVars,
    ...shadowVars,
  };
};
