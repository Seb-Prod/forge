import {
  getSurfaceBackground,
  getGap,
  getMargin,
  getPadding,
  getRadius,
  getShadow,
  getSurfaceTextColor,
  getSurfaceBorderColor,
  getBorderSize,
} from "@workspace/ui/helpers";
import { BoxProps } from "../Box.types";
import { getOverflow } from "./getOverflow";

export const getBoxStyle = (props: BoxProps): React.CSSProperties => ({
  display: "flex",
  flexDirection: props.flexDirection,
  background: getSurfaceBackground(props.surface ?? "none", props.tone),
  color: getSurfaceTextColor(props.surface ?? "none", props.tone),
  padding: getPadding(props.padding),
  margin: getMargin(props.margin),
  gap: getGap(props.gap),
  width: props.width,
  height: props.height,
  minHeight: props.minHeight,
  maxHeight: props.maxHeight,
  minWidth: props.minWidth,
  maxWidth: props.maxWidth,
  borderRadius: getRadius(props.radius),
  boxShadow: getShadow(props.shadow),
  border: `${getBorderSize(props.border)} solid ${getSurfaceBorderColor(props.surface ?? "none", props.tone)}`,
  ...getOverflow(props.overflow),
  ...props.style,
});
