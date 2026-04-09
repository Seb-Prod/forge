import {
  createTokenResolver,
  getSize,
  getSurfaceTextColor,
  getToneColor,
} from "@workspace/ui/helpers";
import { IconToggleProps } from "../IconToggle.types";
import { SIZES } from "@workspace/ui/constants";

export const getIconToggleStyle = (
  props: IconToggleProps,
): React.CSSProperties => ({
  width: getSize(props.size),
  height: getSize(props.size),
  color: props.color ? props.color : getToneColor(props.tone, 500),
  ...props.style,
});
