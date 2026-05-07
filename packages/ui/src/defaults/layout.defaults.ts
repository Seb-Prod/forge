import { LayoutProps } from "../types";

export const DEFAULT_LAYOUT_PROPS = {
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "start",
  flexWrap: "nowrap",
  position: "relative",
  overflow: "none",
} as const satisfies Partial<LayoutProps>;
