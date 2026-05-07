import { UIConstant } from "../types/ui-constant";

export const OVERFLOW = {
  none: { value: "none", label: "None", description: "Aucun overflow" },
  x: { value: "x", label: "X", description: "Scroll horizontal" },
  y: { value: "y", label: "Y", description: "Scroll vertical" },
  both: {
    value: "both",
    label: "Both",
    description: "Scroll horizontal et vertical",
  },
  hidden: {
    value: "hidden",
    label: "Hidden",
    description: "Cache le contenu qui dépasse",
  },
} as const satisfies Record<string, UIConstant<string>>;

export type Overflow = keyof typeof OVERFLOW;
