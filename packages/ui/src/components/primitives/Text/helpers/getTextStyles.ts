import {
  getTextDecoration,
  getTextSize,
  getTextWeight,
  getToneColor,
} from "@workspace/ui/helpers";
import { TextProps } from "../Text.types";

export const getTextStyle = (props: TextProps): React.CSSProperties => ({
  fontSize: getTextSize(props.size),
  fontWeight: getTextWeight(props.weight),
  textAlign: props.align,
  textTransform: props.transform,
  fontStyle: props.italic ? "italic" : undefined,
  textDecorationLine: getTextDecoration(props.decoration),
  color: props.tone ? getToneColor(props.tone, props.intensity) : props.color,
  ...(props.truncate && {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  }),
  ...(props.lineClamp && {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: props.lineClamp,
  }),
  ...props.style,
});
