import { CSSProperties } from "react";
import { ComponentAppearanceProps, ComponentSizeTokens } from "../types";
import { useComponentColors } from "./appearance";
import { getComponentSizeStyle } from "./styles/getComponentSizeStyle";
import { ButtonProps, ButtonSize } from "../components/primitives/Button/Button.types";

type GetComponentStyleParams<T extends string> = ComponentAppearanceProps & {
  size?: T;
  sizes?: Record<T, ComponentSizeTokens>;
};

export const getComponentStyle = <T extends string>(

  props: GetComponentStyleParams<T>,

): CSSProperties => {

  const colorVars = useComponentColors({
    tone: props.tone,
    variant: props.variant,
  });

  const sizeVars =
    props.size && props.sizes
      ? getComponentSizeStyle({
          size: props.size,
          sizes: props.sizes,
        })
      : {};
      
  return {
    ...colorVars,
    ...sizeVars,
  };

};
