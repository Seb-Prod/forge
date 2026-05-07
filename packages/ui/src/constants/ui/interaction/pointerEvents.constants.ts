import { UIConstant } from "../types/ui-constant";

export const POINTER_EVENTS = {
  none: {
    value: "none",
    label: "None",
    description: "Désactive les événements souris",
  },
  auto: {
    value: "auto",
    label: "Auto",
    description: "Comportement par défaut",
  },
} as const satisfies Record<string, UIConstant<string>>;

export type PointerEvents = keyof typeof POINTER_EVENTS;
