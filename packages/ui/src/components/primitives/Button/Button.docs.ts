import { ANIMATIONS, APPEARANCES, SIZES, TONES } from "@workspace/ui/constants";
import { DocsConfig } from "@workspace/ui/features";
import { BUTTON_APPEARANCES, DEFAULT_PROPS } from "./Button.types";

/**
 * 📚 Documentation du composant Button
 */
export const buttonDocs: DocsConfig = {
  // 🎨 Constantes disponibles
  constants: {
    tone: TONES,
    appearance: BUTTON_APPEARANCES,
    size: SIZES,
    animation: ANIMATIONS,
  },

  // 🎛️ Contrôles interactifs (playground)
  controls: {
    children: { type: "text", label: "Texte du bouton" },
    startIcon: { type: "icon", label: "Icône au début" },
    endIcon: { type: "icon", label: "Icône à la fin" },
    icon: { type: "icon", label: "Icône seule" },
    iconOnly: { type: "boolean", label: "Icône uniquement" },
    fullWidth: { type: "boolean", label: "Prend toute la largeur" },
    loading: { type: "boolean", label: "État loading" },
    loadingText: { type: "text", label: "Texte pendant le loading" },
  },

  // 🎯 Props par défaut pour le preview
  defaultProps: {
    ...DEFAULT_PROPS,
  },

  // 📚 Documentation détaillée des props
  propsDocs: {
    tone: {
      type: "Tone",
      description:
        "Tonalité sémantique du bouton (primary, secondary, success, danger…).",
    },
    appearance: {
      type: "ButtonAppearance",
      description:
        "Style visuel du bouton (filled, outline, ghost, link…).",
    },
    size: {
      type: "Size",
      description: "Taille du bouton (sm, md, lg).",
    },
    animation: {
      type: "Animation",
      description:
        "Animation au survol du bouton (center, left, right, circle…).",
    },
    children: {
      type: "ReactNode",
      description: "Contenu affiché dans le bouton.",
    },
    icon: {
      type: "ReactNode",
      description:
        "Icône principale (utilisée seule si iconOnly=true).",
    },
    startIcon: {
      type: "ReactNode",
      description: "Icône affichée avant le texte.",
    },
    endIcon: {
      type: "ReactNode",
      description: "Icône affichée après le texte.",
    },
    iconOnly: {
      type: "boolean",
      description:
        "Affiche uniquement une icône (nécessite aria-label pour accessibilité).",
    },
    fullWidth: {
      type: "boolean",
      description: "Le bouton prend toute la largeur du conteneur.",
    },
    loading: {
      type: "boolean",
      description: "Affiche un état de chargement.",
    },
    loadingText: {
      type: "string",
      description:
        "Texte affiché pendant le chargement (remplace children).",
    },
    disabled: {
      type: "boolean",
      description: "Désactive le bouton.",
    },
    className: {
      type: "string",
      description: "Classes CSS supplémentaires.",
    },
  },
};