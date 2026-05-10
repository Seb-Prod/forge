import {
  TONES,
  SHADOWS,
} from "@workspace/ui/constants";
import { DocsConfig } from "@workspace/ui/features";
import { DEFAULT_PROPS } from "../IconToggle.types";

export const IconToggleDocs: DocsConfig = {
  constants: {
    tone: TONES,
    shadow: SHADOWS,
  },

  controls: {
    activeIcon: { type: "icon", label: "Icône active" },
    inactiveIcon: { type: "icon", label: "Icône inactive" },
    pressed: { type: "boolean", label: "État actif" },
  },

  defaultProps: {
    ...DEFAULT_PROPS,
    pressed: false,
  },

  propsDocs: {
    activeIcon: {
      type: "ReactNode",
      description: "Icône affichée lorsque le toggle est actif (pressed = true).",
    },
    inactiveIcon: {
      type: "ReactNode",
      description: "Icône affichée lorsque le toggle est inactif (pressed = false).",
    },
    pressed: {
      type: "boolean",
      description: "État du toggle (actif ou inactif).",
    },
    onToggle: {
      type: "() => void",
      description: "Callback déclenché lors du clic sur le toggle.",
    },
    ariaLabel: {
      type: "string",
      description: "Label accessible pour les lecteurs d’écran.",
    },
    tone: {
      type: "Tone",
      description: "Tonalité visuelle du bouton.",
    },
    size: {
      type: "TextSize",
      description: "Taille du toggle (impacte la taille de l’icône).",
    },
    shadow: {
      type: "Shadow",
      description: "Ombre appliquée au composant.",
    },
    className: {
      type: "string",
      description: "Classe CSS additionnelle.",
    },
    style: {
      type: "CSSProperties",
      description: "Styles inline additionnels.",
    },
  },
};