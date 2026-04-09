import type { BadgeVariant } from "../Badge.types";

/**
 * Détermine si le badge doit afficher un bouton de suppression
 */
export const shouldShowRemoveButton = (
  variant: BadgeVariant,
  onRemove?: () => void
): boolean => {
  // return variant === "removable" && !!onRemove;
  return variant === "removable" ;
};

/**
 * Détermine si le badge doit afficher un point indicateur
 */
export const shouldShowDot = (variant: BadgeVariant): boolean => {
  return variant === "dot";
};