import {
  TONES,
  TONE_INTENSITIES,
  TEXT_WEIGHTS,
  TEXT_ALIGNS,
  TEXT_TRANSFORMS,
  TEXT_DECORATIONS,
  TEXT_TAGS,
} from "@workspace/ui/constants";
import { DocsConfig } from "@workspace/ui/features";
import { DEFAULT_PROPS } from "../Text.types";

export const TextDocs: DocsConfig = {
  constants: {
    tone: TONES,
    intensity: TONE_INTENSITIES,
    weight: TEXT_WEIGHTS,
    align: TEXT_ALIGNS,
    transform: TEXT_TRANSFORMS,
    decoration: TEXT_DECORATIONS,
    as: TEXT_TAGS,
  },

  controls: {
    children: { type: "text", label: "Contenu" },
    color: { type: "text", label: "Couleur (hex, rgb, rgba)" },
    htmlFor: { type: "text", label: "htmlFor" },
    italic: { type: "boolean", label: "Italic" },
    truncate: { type: "boolean", label: "Truncate" },
    lineClamp: { type: "number", label: "Line Clamp" },
  },

  defaultProps: {
    ...DEFAULT_PROPS,
  },

  propsDocs: {
    as: {
      type: "TextTag",
      description: "Balise HTML rendue par le composant.",
    },
    tone: {
      type: "Tone",
      description: "Tonalité sémantique du texte (primary, danger, success…).",
    },
    intensity: {
      type: "ToneIntensity",
      description: "Intensité de la couleur sémantique. Utilisé conjointement avec `tone`.",
    },
    color: {
      type: "TextColor",
      description: "Couleur CSS directe (hex, rgb, rgba). Ignorée si `tone` est défini.",
    },
    size: {
      type: "TextSize",
      description: "Taille du texte via token CSS.",
    },
    weight: {
      type: "TextWeight",
      description: "Graisse du texte via token CSS.",
    },
    align: {
      type: "TextAlign",
      description: "Alignement horizontal du texte.",
    },
    transform: {
      type: "TextTransform",
      description: "Transformation de la casse du texte.",
    },
    decoration: {
      type: "TextDecoration",
      description: "Décoration du texte (underline, line-through).",
    },
    italic: {
      type: "boolean",
      description: "Passe le texte en italique.",
    },
    truncate: {
      type: "boolean",
      description: "Tronque le texte avec une ellipse sur une seule ligne.",
    },
    lineClamp: {
      type: "number",
      description: "Tronque le texte après N lignes avec une ellipse.",
    },
    htmlFor: {
      type: "string",
      description: "Associe le label à un champ. Uniquement utilisé si `as='label'`.",
    },
    className: {
      type: "string",
      description: "Classe CSS additionnelle.",
    },
    style: {
      type: "CSSProperties",
      description: "Styles inline additionnels, mergés avec les styles calculés.",
    },
  },
};