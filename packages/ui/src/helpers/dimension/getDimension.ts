import { DimensionProps } from "@workspace/ui/types";

export const getWidth = (
  value?: React.CSSProperties["width"],
): React.CSSProperties["width"] => value;

export const getHeight = (
  value?: React.CSSProperties["height"],
): React.CSSProperties["height"] => value;

export const getMinWidth = (
  value?: React.CSSProperties["minWidth"],
): React.CSSProperties["minWidth"] => value;

export const getMaxWidth = (
  value?: React.CSSProperties["maxWidth"],
): React.CSSProperties["maxWidth"] => value;

export const getMinHeight = (
  value?: React.CSSProperties["minHeight"],
): React.CSSProperties["minHeight"] => value;

export const getMaxHeight = (
  value?: React.CSSProperties["maxHeight"],
): React.CSSProperties["maxHeight"] => value;

export const getDimensionStyle = (
  props: DimensionProps,
): React.CSSProperties => ({
  ...(props.width !== undefined && { width: props.width }),
  ...(props.height !== undefined && { height: props.height }),
  ...(props.minWidth !== undefined && { minWidth: props.minWidth }),
  ...(props.maxWidth !== undefined && { maxWidth: props.maxWidth }),
  ...(props.minHeight !== undefined && { minHeight: props.minHeight }),
  ...(props.maxHeight !== undefined && { maxHeight: props.maxHeight }),
});
