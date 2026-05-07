import { UIConstant } from "../types/ui-constant";

export const FLEX_WRAP = {
  nowrap: {
    value: "nowrap",
    label: "No Wrap",
    description: "Pas de retour à la ligne",
  },
  wrap: { value: "wrap", label: "Wrap", description: "Retour à la ligne" },
  "wrap-reverse": {
    value: "wrap-reverse",
    label: "Wrap Reverse",
    description: "Retour à la ligne inversé",
  },
} as const;

export const FLEX_DIRECTION = {
  row: { value: "row", label: "Row", description: "Horizontal" },
  column: { value: "column", label: "Column", description: "Vertical" },
  "row-reverse": {
    value: "row-reverse",
    label: "Row Reverse",
    description: "Horizontal inversé",
  },
  "column-reverse": {
    value: "column-reverse",
    label: "Column Reverse",
    description: "Vertical inversé",
  },
} as const;

export const FLEX = {
  none: { value: "none", label: "None", description: "Pas de flex" },
  auto: { value: "1 1 auto", label: "Auto", description: "Flex automatique" },
  initial: { value: "0 1 auto", label: "Initial", description: "Flex initial" },
  fill: {
    value: "1 1 0%",
    label: "Fill",
    description: "Remplit l'espace disponible",
  },
  fixed: {
    value: "0 0 auto",
    label: "Fixed",
    description: "Taille fixe, ne grandit pas",
  },
} as const satisfies Record<string, UIConstant<string>>;

export type FlexWrap = keyof typeof FLEX_WRAP;
export type FlexDirection = keyof typeof FLEX_DIRECTION;
export type Flex = keyof typeof FLEX;
