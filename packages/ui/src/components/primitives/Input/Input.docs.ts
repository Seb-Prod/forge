import { createDocs, DocsConfig } from "@workspace/ui/features";
import {
  DEFAULT_PROPS,
  INPUT_LABEL_POSITION,
  INPUT_TONES,
  INPUT_TYPES,
  InputProps,
} from "./Input.types";
import { APPEARANCES,} from "@workspace/ui/constants";

export const InputDocs = createDocs<InputProps>()({
  constants: {
    type: INPUT_TYPES,
    tone: INPUT_TONES,
    appearance: APPEARANCES,
    labelPosition: INPUT_LABEL_POSITION,
  },

  controls: {
    label: {
      type: "text",
      label: "Label",
    },

    placeholder: {
      type: "text",
      label: "Placeholder",
    },

    helperText: {
      type: "text",
      label: "Helper text",
    },

    required: {
      type: "boolean",
      label: "Champ obligatoire",
    },

    valid: {
      type: "boolean",
      label: "Champ valide",
    },

    error: {
      type: "boolean",
      label: "Champ en erreur",
    },

    disabled: {
      type: "boolean",
      label: "Désactive le champ",
    },

    startIcon: {
      type: "icon",
      label: "Icône de début",
    },
  },

  defaultProps: {
    ...DEFAULT_PROPS,
    label: "Label",
    placeholder: "Saisir une valeur...",
  },

  propsDocs: {
    label: {
      type: "string",
      description: "Label affiché pour décrire le champ.",
      required: true,
    },
    placeholder: {
      type: "string",
      description: "Texte affiché dans le champ lorsque celui-ci est vide.",
    },
    helperText: {
      type: "string",
      description: "Texte d'aide affiché sous le champ.",
    },
    error: {
      type: "boolean",
      description: "Indique que le champ est en état d'erreur.",
    },
    valid: {
      type: "boolean",
      description: "Indique que la valeur du champ est valide.",
    },
    required: {
      type: "boolean",
      description: "Indique que le champ est obligatoire.",
    },
    disabled: {
      type: "boolean",
      description: "Indique si le composant doit être désactivé",
    },
    tone: {
      type: "InputTone",
      description: "Définit la tonalité sémantique de l'input.",
    },
    appearance: {
      type: "InputAppearance",
      description: "Définit le style visuel de l'input.",
    },
    size: {
      type: "InputSize",
      description: "Définit la taille du champ.",
    },
    labelPosition: {
      type: "InputLabelPosition",
      description: "Définit la position du label par rapport au champ.",
    },
    startIcon: {
      type: "ReactNode",
      description: "Icône affichée au début du champ.",
    },
  },
});
