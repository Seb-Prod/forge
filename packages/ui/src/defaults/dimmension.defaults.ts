import { DimensionProps } from "../types";

export const DEFAULT_DIMENSION_PROPS = {
  width: "100%",
} as const satisfies Partial<DimensionProps>;
