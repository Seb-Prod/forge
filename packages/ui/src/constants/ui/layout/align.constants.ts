import { UIConstant } from "../types/ui-constant";

export const ALIGN_ITEMS = {
  start: {
    value: "flex-start",
    label: "Start",
    description: "Aligne au début",
  },
  center: {
    value: "center",
    label: "Center",
    description: "Centre les éléments",
  },
  end: { value: "flex-end", label: "End", description: "Aligne à la fin" },
  stretch: {
    value: "stretch",
    label: "Stretch",
    description: "Étire les éléments",
  },
  baseline: {
    value: "baseline",
    label: "Baseline",
    description: "Aligne sur la baseline",
  },
} as const satisfies Record<string, UIConstant<string>>;

export type AlignItems = keyof typeof ALIGN_ITEMS;
