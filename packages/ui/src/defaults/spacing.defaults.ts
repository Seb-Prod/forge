import { SpacingProps } from "../types";

export const DEFAULT_SPACING_PROPS = {
  padding: "none",
  margin: "none",
  gap: "none",
} as const satisfies Partial<SpacingProps>;
