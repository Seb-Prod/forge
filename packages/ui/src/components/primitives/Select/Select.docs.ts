import { DocsConfig } from "../../../features/Showcase/Showcase.types";
import {
  SELECT_APPEARANCES,
  SELECT_SIZES,
  SELECT_TONES,
  SELECT_VARIANTS,
} from "./Select.types";

export const selectDocs: DocsConfig = {
  // ─────────────────────────────────────────────
  // Constantes
  // ─────────────────────────────────────────────

  constants: {
    tone: SELECT_TONES,
    appearance: SELECT_APPEARANCES,
    size: SELECT_SIZES,
    variant: SELECT_VARIANTS,
  },

  // ─────────────────────────────────────────────
  // Contrôles
  // ─────────────────────────────────────────────

  controls: {
    label: { type: "text", label: "Label" },
    placeholder: { type: "text", label: "Placeholder" },
    helperText: { type: "text", label: "Helper text" },
    startIcon: { type: "image", label: "Start icon" },
    disabled: { type: "boolean", label: "Disabled" },
    topLabel: { type: "boolean", label: "Label on top" },
  },

  // ─────────────────────────────────────────────
  // Props par défaut
  // ─────────────────────────────────────────────

  defaultProps: {
    label: "Framework",
    tone: "neutral",
    appearance: "outline",
    size: "md",
    variant: "default",
    placeholder: "Sélectionner...",
    topLabel: "true",
    options: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue.js" },
      { value: "svelte", label: "Svelte" },
      { value: "angular", label: "Angular" },
    ],
  },

  // ─────────────────────────────────────────────
  // Table des props
  // ─────────────────────────────────────────────

  propsTable: [
    // --- Données ---
    {
      name: "label",
      type: "string",
      required: true,
      description: "Label affiché au-dessus du select",
    },
    {
      name: "options",
      type: "SelectOption[]",
      required: true,
      description: "Liste des options { value, label, disabled? }",
    },
    {
      name: "onSelect",
      type: "(value: string) => void",
      required: true,
      description: "Callback appelé à la sélection",
    },
    {
      name: "value",
      type: "string",
      description: "Valeur sélectionnée (mode contrôlé)",
    },
    {
      name: "placeholder",
      type: "string",
      default: '"Sélectionner..."',
      description: "Texte affiché si aucune sélection",
    },

    // --- Variantes visuelles ---
    {
      name: "tone",
      type: "SelectTone",
      default: "neutral",
      description: "Tonalité sémantique",
    },
    {
      name: "appearance",
      type: "SelectAppearance",
      default: "outline",
      description: "Style visuel",
    },
    {
      name: "size",
      type: "SelectSize",
      default: "md",
      description: "Taille",
    },
    {
      name: "variant",
      type: "SelectVariant",
      default: "default",
      description: "Variante (searchable, clearable)",
    },

    // --- Contenu ---
    {
      name: "startIcon",
      type: "ReactNode",
      description: "Icône avant le texte du trigger",
    },
    {
      name: "helperText",
      type: "string",
      description: "Message d'aide sous le select",
    },

    // --- État ---
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Désactive le composant",
    },
  ],
};
