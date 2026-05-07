import { InteractiveProps } from "../types";

export const DEFAULT_INTERACTIVE_PROPS = {
  cursor: "default",
  pointerEvents: "auto",
} as const satisfies Partial<InteractiveProps>;
