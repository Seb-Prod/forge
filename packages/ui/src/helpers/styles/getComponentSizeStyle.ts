import { ComponentSizeTokens } from "@workspace/ui/types";
import { CSSProperties } from "react";
import { getRadius } from "../radius.helpers";
import { getMargin } from "../spacing";
import { getComponentSize } from "../dimension";
import { BORDER_SIZES, COMPONENT_SIZES, getConstantValue, TEXT_SIZES } from "@workspace/ui/constants";

type SizeMap<T extends string = string> = Record<T, ComponentSizeTokens>;

type GetSizeStyleParams<T extends string> = {
  size?: T;
  sizes: SizeMap<T>;
};

export const getComponentSizeStyle = <T extends string>({
  size,
  sizes,
}: GetSizeStyleParams<T>): CSSProperties => {
  if (!size) return {};

  const tokens = sizes[size];

  return {
    ["--component-radius" as string]: getRadius(tokens.radius),
    ["--component-padding" as string]: getMargin(tokens.paddingX),
    ["--component-height" as string]: getConstantValue(COMPONENT_SIZES, tokens.height),
    ["--component-fontSize" as string]: getConstantValue(TEXT_SIZES, tokens.fontSize),
    ["--component-borderSize" as string]: getConstantValue(BORDER_SIZES, tokens.borderSize),
  };
};
