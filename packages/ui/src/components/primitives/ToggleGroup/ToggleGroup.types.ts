import { Size, Tone, Variant } from "@workspace/ui/constants";
import { ReactNode } from "react";

/**
 * Représente une option individuelle dans le ToggleGroup.
 *
 * Au moins `label` ou `ariaLabel` est requis pour garantir l'accessibilité.
 *
 * @template T - Le type de la valeur de l'option, étend string.
 *
 * @property {T} value - La valeur unique identifiant l'option.
 * @property {ReactNode} [icon] - Icône optionnelle affichée dans le bouton.
 * @property {string} [label] - Texte affiché dans le bouton.
 * @property {string} [ariaLabel] - Label d'accessibilité utilisé si `label` est absent.
 */
type ToggleGroupOption<T extends string> = {
  value: T;
  icon?: ReactNode;
  label?: string;
  ariaLabel?: string;
} & ({ label: string } | { ariaLabel: string });

/**
 * Props du composant ToggleGroup.
 *
 * @template T - Le type des valeurs des options, étend string.
 *
 * @property {Tone} [tone] - Tonalité colorimétrique du groupe (ex : "primary", "neutral").
 * @property {Size} [size] - Taille des boutons (ex : "sm", "md", "lg").
 * @property {Variant} [variant] - Variante visuelle du groupe (ex : "default", "outline", "segment", "ghost").
 * @property {ToggleGroupOption<T>[]} options - Liste des options à afficher sous forme de boutons bascule.
 * @property {T} value - La valeur actuellement sélectionnée.
 * @property {(value: T) => void} onChange - Callback déclenché lors de la sélection d'une option.
 * @property {string} [className] - Classes CSS supplémentaires appliquées au conteneur.
 * @property {React.CSSProperties} [style] - Styles inline supplémentaires appliqués au conteneur.
 */
export interface ToggleGroupProps<T extends string> {
  tone?: Tone;

  size?: Size;

  variant?: Variant;

  options: ToggleGroupOption<T>[];

  value: T;
  onChange: (value: T) => void;

  className?: string;
  style?: React.CSSProperties;
}

/**
 * Valeurs par défaut appliquées aux props du ToggleGroup.
 * Fusionnées avec les props fournies par l'utilisateur dans le composant.
 */
export const DEFAULT_PROPS: Partial<ToggleGroupProps<string>> = {
  tone: "primary",
  size: "md",
  variant: "ghost",
};