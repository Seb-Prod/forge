import { UIConstant } from "../types/ui-constant";

export const POSITION = {
  relative: {
    value: "relative",
    label: "Relative",
    description: "Positionnement relatif",
  },
  absolute: {
    value: "absolute",
    label: "Absolute",
    description: "Positionnement absolu",
  },
  fixed: { value: "fixed", label: "Fixed", description: "Positionnement fixe" },
  sticky: {
    value: "sticky",
    label: "Sticky",
    description: "Positionnement collant",
  },
} as const satisfies Record<string, UIConstant<string>>;

export type Position = keyof typeof POSITION;
