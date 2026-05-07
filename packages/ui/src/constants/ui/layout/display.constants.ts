import { UIConstant } from "../types/ui-constant";

export const DISPLAY = {
  flex: {
    value: "flex",
    label: "Flex",
    description: "Conteneur flex",
  },
  "inline-flex": {
    value: "inline-flex",
    label: "Inline Flex",
    description: "Conteneur flex inline",
  },
  block: {
    value: "block",
    label: "Block",
    description: "Élément block",
  },
  "inline-block": {
    value: "inline-block",
    label: "Inline Block",
    description: "Élément block inline",
  },
  inline: {
    value: "inline",
    label: "Inline",
    description: "Élément inline",
  },
  none: {
    value: "none",
    label: "None",
    description: "Élément masqué",
  },
} as const satisfies Record<string, UIConstant<string>>;

export type Display = keyof typeof DISPLAY;