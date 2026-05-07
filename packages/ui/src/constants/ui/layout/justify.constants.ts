import { UIConstant } from "../types/ui-constant";

export const JUSTIFY_CONTENT = {
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
  between: {
    value: "space-between",
    label: "Space Between",
    description: "Espace entre les éléments",
  },
  around: {
    value: "space-around",
    label: "Space Around",
    description: "Espace autour des éléments",
  },
  evenly: {
    value: "space-evenly",
    label: "Space Evenly",
    description: "Espace égal partout",
  },
} as const satisfies Record<string, UIConstant<string>>;

export type JustifyContent = keyof typeof JUSTIFY_CONTENT;
