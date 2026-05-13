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

type ShadowSizeMap = Record<string, UIConstant<ComponentShadowStates>>;

type GetComponentStyleParams<T extends string> = ComponentAppearanceProps & {
  size?: T;
  sizes?: Record<T, ComponentSizeTokens>;
  mode?: "light" | "dark";
  appearances: Record<"light" | "dark", VariantStateMap>;
  shadows?: Partial<Record<Variant, ShadowSizeMap>>;
};

export const getComponentStyle = <T extends string>(
  props: GetComponentStyleParams<T>,
): CSSProperties => {
  console.log("je recharge")
  const colorVars = getComponentVariantStyle({
    tone: props.tone,
    variant: props.variant,
    mode: props.mode,
    appearances: props.appearances,
  });

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
