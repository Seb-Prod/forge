import { APPEARANCES, SIZES, TONES } from "@workspace/ui/constants";
import { createDocs, DocsConfig } from "@workspace/ui/features";
import {
  CHECKBOX_APPEARANCES,
  CheckboxProps,
  DEFAULT_PROPS,
} from "./Checkbox.types";

export const CheckboxDocs = createDocs<CheckboxProps>()({
  constants: {
    tone: TONES,
    size: SIZES,
    appearance: CHECKBOX_APPEARANCES,
  },

  controls: {
    label: { type: "text", label: "Label" },
    indeterminate: { type: "boolean", label: "Indeterminate" },
    iconChecked: { type: "icon", label: "Icon checked" },
    iconUnchecked: { type: "icon", label: "Icon unchecked" },
    iconIndeterminate: { type: "icon", label: "Icon indeterminate" },
  },

  defaultProps: {
    ...DEFAULT_PROPS,
    label: "Nouvelle Checkbox",
  },

  propsDocs: {
    label: {
      type: "string",
      description: "Label affiché pour décrire la checkbox",
    },

    tone: {
      type: "Tone",
      description: "Définit la tonalité sémantique",
    },

    size: {
      type: "Size",
      description: "Définit la taille de la checkbox",
    },

    appearance: {
      type: "Appearance",
      description: "Définit le style visuel",
    },

    indeterminate: {
      type: "boolean",
      description: "Permet de rendre la checkbox tri-état",
    },

    iconChecked: {
      type: "ReactNode",
      description: "Icône affichée lorsque la checkbox est cochée",
    },

    iconUnchecked: {
      type: "ReactNode",
      description: "Icône affichée lorsque la checkbox est décochée",
    },

    iconIndeterminate: {
      type: "ReactNode",
      description:"Icône affichée lorsque la checkbox est en état indeterminate",
    },
  },
});
