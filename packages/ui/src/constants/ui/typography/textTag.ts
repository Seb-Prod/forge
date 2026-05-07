import { UIConstant } from "../types/ui-constant";

/**
 * @constant TEXT_TAGS
 * @description Balises HTML disponibles pour le composant Text.
 */
export const TEXT_TAGS = {
  p: {
    value: "p",
    label: "Paragraph",
    description: "Paragraphe de texte.",
  },
  span: {
    value: "span",
    label: "Span",
    description: "Texte inline sans sémantique.",
  },
  h1: {
    value: "h1",
    label: "Heading 1",
    description: "Titre de niveau 1.",
  },
  h2: {
    value: "h2",
    label: "Heading 2",
    description: "Titre de niveau 2.",
  },
  h3: {
    value: "h3",
    label: "Heading 3",
    description: "Titre de niveau 3.",
  },
  h4: {
    value: "h4",
    label: "Heading 4",
    description: "Titre de niveau 4.",
  },
  h5: {
    value: "h5",
    label: "Heading 5",
    description: "Titre de niveau 5.",
  },
  h6: {
    value: "h6",
    label: "Heading 6",
    description: "Titre de niveau 6.",
  },
  label: {
    value: "label",
    label: "Label",
    description: "Étiquette associée à un champ de formulaire.",
  },
  strong: {
    value: "strong",
    label: "Strong",
    description: "Texte important, rendu en gras.",
  },
  em: {
    value: "em",
    label: "Em",
    description: "Texte mis en emphase, rendu en italique.",
  },
  small: {
    value: "small",
    label: "Small",
    description: "Texte de petite taille, mentions légales, annotations.",
  },
  legend: {
    value: "legend",
    label: "Legend",
    description: "Légende d'un groupe de champs de formulaire.",
  },
} as const satisfies Record<string, UIConstant<string>>;

/**
 * @type TextTag
 * @description Balise HTML dérivée de {@link TEXT_TAGS}.
 * Utilisé pour la prop `as` du composant Text.
 */
export type TextTag = keyof typeof TEXT_TAGS;
