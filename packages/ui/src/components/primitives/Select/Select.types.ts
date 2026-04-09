import { HTMLAttributes, ReactNode } from "react";

// ─────────────────────────────────────────────
// Enums / Constantes
// ─────────────────────────────────────────────

export const SELECT_TONES = {
  primary: {
    value: "primary",
    label: "Primary",
    description: "Select principal pour les champs prioritaires",
  },
  secondary: {
    value: "secondary",
    label: "Secondary",
    description: "Select secondaire pour les champs complémentaires",
  },
  neutral: {
    value: "neutral",
    label: "Neutral",
    description: "Select neutre par défaut sans connotation sémantique",
  },
  danger: {
    value: "danger",
    label: "Danger",
    description: "Select en état d'erreur ou de validation échouée",
  },
  success: {
    value: "success",
    label: "Success",
    description: "Select en état de validation réussie",
  },
} as const;

export const SELECT_APPEARANCES = {
  filled: {
    value: "filled",
    label: "Filled",
    description: "Fond plein coloré",
  },
  outline: {
    value: "outline",
    label: "Outline",
    description: "Bordure colorée avec fond transparent",
  },
  ghost: {
    value: "ghost",
    label: "Ghost",
    description: "Bordure transparent avec fond transparent",
  },
  soft: {
    value: "soft",
    label: "Soft",
    description: "Fond coloré léger pour un rendu discret",
  },
} as const;

export const SELECT_SIZES = {
  sm: {
    value: "sm",
    label: "Small",
    description: "Select petit (32px de hauteur)",
  },
  md: {
    value: "md",
    label: "Medium",
    description: "Select moyen (40px de hauteur)",
  },
  lg: {
    value: "lg",
    label: "Large",
    description: "Select grand (48px de hauteur)",
  },
} as const;

export const SELECT_VARIANTS = {
  default: {
    value: "default",
    label: "Default",
    description: "Select standard",
  },
  searchable: {
    value: "searchable",
    label: "Searchable",
    description: "Select avec champ de recherche intégré",
  },
} as const;

// ─────────────────────────────────────────────
// Types dérivés des constantes
// ─────────────────────────────────────────────

export type SelectTone = keyof typeof SELECT_TONES;
export type SelectAppearance = keyof typeof SELECT_APPEARANCES;
export type SelectSize = keyof typeof SELECT_SIZES;
export type SelectVariant = keyof typeof SELECT_VARIANTS;

// ─────────────────────────────────────────────
// Modèles de données
// ─────────────────────────────────────────────

/** Une option du select */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// ─────────────────────────────────────────────
// Props du composant
// ─────────────────────────────────────────────

/**
 * Props du composant Select.
 *
 * @see README.md pour la documentation complète et les exemples
 */
export interface SelectProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  // --- Données ---

  /** Liste des options */
  options: SelectOption[];

  /** Valeur sélectionnée (mode contrôlé) */
  value?: string;

  // --- Affichage ---

  /** Label affiché au-dessus du select */
  label: string;

  /** Position du label (au-dessus si `true`) */
  topLabel?: boolean;

  /** Texte affiché quand aucune option n'est sélectionnée */
  placeholder?: string;

  /** Icône à afficher avant le contenu du trigger */
  startIcon?: ReactNode;

  /** Message d'aide affiché sous le select */
  helperText?: string;

  // --- Variantes visuelles ---

  /**
   * Tonalité de couleur sémantique.
   * @default "neutral"
   */
  tone?: SelectTone;

  /**
   * Apparence du select.
   * @default "outline"
   */
  appearance?: SelectAppearance;

  /**
   * Taille du select.
   * @default "md"
   */
  size?: SelectSize;

  /**
   * Variante du select.
   * @default "default"
   */
  variant?: SelectVariant;

  // --- État ---

  /** Désactive le select */
  disabled?: boolean;

  // --- Callbacks ---

  /** Callback appelé à la sélection d'une option */
  onSelect: (value: string) => void;

  // --- Style ---

  /** Classes CSS supplémentaires */
  className?: string;
}

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────

export type SelectContextType = {
  // Refs
  triggerRef: React.RefObject<HTMLDivElement | null>;
  dropdownRef: React.RefObject<HTMLDivElement | null>;

  // État du dropdown
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  // Valeur sélectionnée
  value: SelectOption | null;
  setValue: (option: SelectOption | null) => void;
  clear: () => void;

  // Recherche
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;

  // Options & navigation
  options: SelectOption[];
  highlightedIndex: number;
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>;

  // Variantes visuelles
  tone: SelectTone;
  appearance: SelectAppearance;
  size: SelectSize;
  variant: SelectVariant;
  placeholder?: string;
};

// ─────────────────────────────────────────────
// Valeurs par défaut
// ─────────────────────────────────────────────

export const DEFAULT_PROPS = {
  tone: "neutral",
  appearance: "filled",
  size: "md",
  placeholder: "Sélectionner...",
  variant: "default",
  topLabel: true,
  
} as const;
