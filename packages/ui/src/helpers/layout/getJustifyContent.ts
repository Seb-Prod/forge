import { JUSTIFY_CONTENT, JustifyContent } from "@workspace/ui/constants";

/**
 * Retourne la valeur CSS de `justify-content`.
 *
 * @param justifyContent - Répartition des enfants sur l'axe principal
 * @returns Valeur CSS ou `undefined`
 */
export const getJustifyContent = (
  justifyContent?: JustifyContent,
): string | undefined => {
  if (justifyContent === undefined) return undefined;
  return JUSTIFY_CONTENT[justifyContent].value;
};
