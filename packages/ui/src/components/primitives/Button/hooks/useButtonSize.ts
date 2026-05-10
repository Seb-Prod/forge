import { getComponentSize, getMargin, getRadius } from "@workspace/ui/helpers";
import { BUTTON_SIZES, ButtonSize } from "../Button.types";

type ButtonCSSVars = React.CSSProperties;

type UseButtonSizeParam = {
  size?: ButtonSize;
};

export const useButtonSize = ({
  size = "md",
}: UseButtonSizeParam = {}): ButtonCSSVars => {
  return {
    ["--component-radius" as string]: getRadius(BUTTON_SIZES[size].radius),
    ["--component-padding" as string]: getMargin(BUTTON_SIZES[size].paddingX),
    ["--component-height" as string]: getComponentSize(
      BUTTON_SIZES[size].height,
    ),
  };
};
