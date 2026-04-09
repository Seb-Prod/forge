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
import { GridProps, GRID_AUTO_FLOW, GRID_JUSTIFY, GRID_ALIGN, GRID_DIRECTION, GRID_WRAP } from "../Grid.types";

const getGridTemplateColumns = (
  cols: GridProps["cols"],
  minColWidth: GridProps["minColWidth"],
): string | undefined => {
  if (minColWidth !== undefined) {
    const width = typeof minColWidth === "number" ? `${minColWidth}px` : minColWidth;
    return `repeat(auto-fill, minmax(${width}, 1fr))`;
  }
  if (cols === undefined) return undefined;
  if (typeof cols === "number") return `repeat(${cols}, 1fr)`;
  return cols;
};

const getGridTemplateRows = (rows: GridProps["rows"]): string | undefined => {
  if (rows === undefined) return undefined;
  if (typeof rows === "number") return `repeat(${rows}, 1fr)`;
  return rows;
};

const getGridDisplay = (mode: GridProps["mode"]): "grid" | "flex" =>
  mode === "flex" ? "flex" : "grid";

export const getGridStyle = (props: GridProps): React.CSSProperties => {
  const isGrid = props.mode !== "flex";

  return {
    display: getGridDisplay(props.mode),
    background: getSurfaceBackground(props.surface ?? "none", props.tone),
    color: getSurfaceTextColor(props.surface ?? "none", props.tone),
    padding: getPadding(props.padding),
    margin: getMargin(props.margin),
    gap: getGap(props.gap),
    rowGap: props.rowGap ? getGap(props.rowGap) : undefined,
    columnGap: props.colGap ? getGap(props.colGap) : undefined,
    width: props.width,
    height: props.height,
    minHeight: props.minHeight,
    maxHeight: props.maxHeight,
    minWidth: props.minWidth,
    maxWidth: props.maxWidth,
    borderRadius: getRadius(props.radius),
    boxShadow: getShadow(props.shadow),
    border: `${getBorderSize(props.border)} solid ${getSurfaceBorderColor(props.surface ?? "none", props.tone)}`,

    // CSS Grid
    ...(isGrid && {
      gridTemplateColumns: getGridTemplateColumns(props.cols, props.minColWidth),
      gridTemplateRows: getGridTemplateRows(props.rows),
      gridAutoRows: props.autoRows,
      gridAutoColumns: props.autoCols,
      gridAutoFlow: props.autoFlow ? GRID_AUTO_FLOW[props.autoFlow].value : undefined,
      justifyItems: props.justify ? GRID_JUSTIFY[props.justify].value : undefined,
      alignItems: props.align ? GRID_ALIGN[props.align].value : undefined,
      justifyContent: props.justifyContent ? GRID_JUSTIFY[props.justifyContent].value : undefined,
      alignContent: props.alignContent ? GRID_ALIGN[props.alignContent].value : undefined,
    }),

    // Flexbox
    ...(!isGrid && {
      flexDirection: props.direction ? GRID_DIRECTION[props.direction].value : undefined,
      flexWrap: props.wrap ? GRID_WRAP[props.wrap].value : undefined,
      justifyContent: props.justify ? GRID_JUSTIFY[props.justify].value : undefined,
      alignItems: props.align ? GRID_ALIGN[props.align].value : undefined,
      alignContent: props.alignContent ? GRID_ALIGN[props.alignContent].value : undefined,
    }),

    ...props.style,
  };
};