import { UIConstant } from "../types/ui-constant";

export const CURSOR = {
  default: {
    value: "default",
    label: "Default",
    description: "Curseur par défaut",
  },
  pointer: {
    value: "pointer",
    label: "Pointer",
    description: "Curseur pointeur",
  },
  grab: { value: "grab", label: "Grab", description: "Curseur main ouverte" },
  grabbing: {
    value: "grabbing",
    label: "Grabbing",
    description: "Curseur main fermée",
  },
  "not-allowed": {
    value: "not-allowed",
    label: "Not Allowed",
    description: "Curseur interdit",
  },
  text: { value: "text", label: "Text", description: "Curseur texte" },
} as const satisfies Record<string, UIConstant<string>>;

export type Cursor = keyof typeof CURSOR;
