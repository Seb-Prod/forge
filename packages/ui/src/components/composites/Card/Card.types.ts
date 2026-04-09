import { ReactElement, ReactNode } from "react";

/**
 * Tons disponibles pour la card
 */
export const CARD_TONES = {
  primary: {
    value: "primary",
    label: "Primary",
    description:
      "Card principale pour mettre en avant du contenu important ou prioritaire",
  },
  secondary: {
    value: "secondary",
    label: "Secondary",
    description:
      "Card secondaire pour du contenu complémentaire ou moins prioritaire",
  },
  accent: {
    value: "accent",
    label: "Accent",
    description:
      "Card d'accentuation pour attirer l'attention sur un élément clé",
  },
  success: {
    value: "success",
    label: "Success",
    description:
      "Card de succès indiquant une action réussie ou un statut positif",
  },
  warning: {
    value: "warning",
    label: "Warning",
    description:
      "Card d'avertissement signalant une information nécessitant attention",
  },
  danger: {
    value: "danger",
    label: "Danger",
    description:
      "Card d'alerte pour des situations critiques ou des actions destructives",
  },
  info: {
    value: "info",
    label: "Info",
    description:
      "Card informative pour afficher des détails contextuels ou de l'aide",
  },
  neutral: {
    value: "neutral",
    label: "Neutral",
    description:
      "Card neutre par défaut sans connotation sémantique particulière",
  },
} as const;

export type CardTone = keyof typeof CARD_TONES;

/**
 * Props du composant Card (root)
 */
export interface CardProps {
  children?: ReactNode;
  tone?: CardTone;
}

export interface CardComposition {
  header?: ReactElement;
  content?: ReactElement;
  footer?: ReactElement;
  warnings: string[];
}

export interface CardSectonProps {
  children?: ReactNode;
}
