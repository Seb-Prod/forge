import { SurfaceAppearanceProps } from "../types";

export const DEFAULT_SURFACE_APPEARANCE_PROPS = {
  surface: "none",
  border: "none",
  shadow: false,
  radius: "none",
  opacity: 1,
} as const satisfies Partial<SurfaceAppearanceProps>;
