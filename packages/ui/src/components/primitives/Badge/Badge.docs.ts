
import { DocsConfig } from "@workspace/ui/features";
import {
  BADGE_APPEARANCES,
  BADGE_VARIANTS,
  DEFAULT_PROPS,
} from "./Badge.types";


/**
 * 📚 Documentation du composant Badge
 */
export const badgeDocs: DocsConfig = {
  // 🎨 Constantes disponibles
  constants: {
    appearance: BADGE_APPEARANCES,
    
    variant: BADGE_VARIANTS,
  },

  // 🎛️ Contrôles interactifs (playground)
  controls: {
    children: { type: "text", label: "Texte du badge" },
    startIcon: { type: "icon", label: "Icône au début" },
    endIcon: { type: "icon", label: "Icône à la fin" },
    onRemove: { type: "action", label: "Callback suppression" },
  },

  // 🎯 Props par défaut pour le preview
  defaultProps: {
    ...DEFAULT_PROPS
  },

  // 📚 Documentation détaillée des props
  propsDocs: {
    tone: {
      type: "BadgeTone",
      description: "Tonalité sémantique du badge (ex: neutral, success…).",
    },
    appearance: {
      type: "BadgeAppearance",
      description: "Style visuel du badge (filled, outline, ghost…).",
    },
    size: {
      type: "BadgeSize",
      description: "Taille du badge (sm, md, lg).",
    },
    variant: {
      type: "BadgeVariant",
      description: "Variante du badge (default, dot, pill, removable).",
    },
    children: {
      type: "ReactNode",
      description: "Contenu affiché dans le badge.",
    },
    startIcon: {
      type: "ReactNode",
      description: "Icône affichée avant le texte.",
    },
    endIcon: {
      type: "ReactNode",
      description: "Icône affichée après le texte.",
    },
    onRemove: {
      type: "() => void",
      description: "Callback déclenché pour la suppression du badge.",
    },
  },
};