import { Appearance, Size, TONES } from "@workspace/ui/constants";
import { pickConstants } from "@workspace/ui/utils";

// ─────────────────────────────────────────────
// Enums / Constantes
// ─────────────────────────────────────────────



export const INPUT_TONES = pickConstants(TONES, ["primary", "secondary", "neutral", "danger"]);

export const INPUT_LABEL_POSITION = {
  top: {
    value: "top",
    label: "Top",
    description: "Le label est affiché au-dessus de l'input.",
  },
  left: {
    value: "left",
    label: "Left",
    description: "Le label est affiché à gauche de l'input.",
  },
  floating: {
    value: "floating",
    label: "Floating",
    description:
      "Le label remplace le placeholder et se déplace au-dessus du champ lors de la saisie.",
  },
} as const;

export const INPUT_TYPES = {
  text: {
    value: "text",
    label: "Text",
    description: "Champ de saisie pour du texte.",
  },
  number: {
    value: "number",
    label: "Number",
    description: "Champ de saisie pour des nombres.",
  },
  tel: {
    value: "tel",
    label: "Telephone",
    description: "Champ de saisie pour un numéro de téléphone.",
  },
  email: {
    value: "email",
    label: "Email",
    description: "Champ de saisie pour une adresse e-mail.",
  },
  password: {
    value: "password",
    label: "Password",
    description:
      "Champ de saisie pour un mot de passe avec option d'affichage.",
  },
} as const;

// ─────────────────────────────────────────────
// Types dérivés des constantes
// ─────────────────────────────────────────────

export type InputTone = keyof typeof INPUT_TONES;
export type InputLabelPosition = keyof typeof INPUT_LABEL_POSITION;
export type InputType = keyof typeof INPUT_TYPES;

/**
 * Props du composant Input.
 *
 * @see README.md pour la documentation complète et les exemples
 */
export interface InputProps {
  /** Label du champ */
  label?: string;

  /** Position du label */
  labelPosition?: InputLabelPosition;

  /** Ton sémantique (couleur principale de l'input) */
  tone?: InputTone;

  /** Style visuel de l'input */
  appearance?: Appearance;

  /** Taille du composant */
  size?: Size;

  /** Texte d'aide affiché sous l'input */
  helperText?: string;

  /** Indique si le champ est en erreur */
  error?: boolean;

  /** Indique si le champ est obligatoire */
  required?: boolean;

  /** Icône affichée au début du champ */
  startIcon?: React.ReactNode;

  /** Icône affichée à la fin du champ */
  endIcon?: React.ReactNode;

  /** Permet d'afficher un bouton pour vider le champ */
  clearable?: boolean;

  /** Valeur du champ */
  value?: string;

  /** Placeholder du champ */
  placeholder?: string;

  /** Fonction appelée lors d'un changement de valeur */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /** Fonction appelée lorsque le champ perd le focus */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

  /** Type du champ */
  type?: InputType;

  /** Indique que la valeur est valide */
  valid?: boolean;

  /** Indique si le composant doit être désactivé */
  disabled?: boolean;

  /** Classe CSS supplémentaire */
  className?: string;
}

// ─────────────────────────────────────────────
// Valeurs par défaut
// ─────────────────────────────────────────────

export const DEFAULT_PROPS = {
  tone: "neutral",
  appearance: "filled",
  size: "md",
  labelPosition: "floating",
  type: "text",
  required: false,
  disabled: false,
  error: false,
  valid:false,
  
} as const;

