import { CSSProperties } from "react";
import {
  ComponentAppearanceProps,
  ComponentSizeTokens,
  VariantStateMap,
} from "../types";
import { getComponentSizeStyle } from "./styles/getComponentSizeStyle";
import { getComponentVariantStyle } from "./styles/getComponentVariantStyle";
import { getComponentShadowStyle } from "./styles/getComponentShadowStyle";

type GetComponentStyleParams<T extends string> = ComponentAppearanceProps & {
  size?: T;
  sizes?: Record<T, ComponentSizeTokens>;
  mode?: "light" | "dark";
  appearances: Record<"light" | "dark", VariantStateMap>;
};

export const getComponentStyle = <T extends string>(
  props: GetComponentStyleParams<T>,
): CSSProperties => {
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

  const shadowVars = getComponentShadowStyle({
    variant: props.variant,
    size: props.size,
  });

  return {
    ...colorVars,
    ...sizeVars,
    ...shadowVars,
  };
};
