import { ALIGN_ITEMS, AlignItems } from "@workspace/ui/constants";

/**
 * Retourne la valeur CSS de `align-items`.
 *
 * @param alignItems - Alignement des enfants sur l'axe secondaire
 * @returns Valeur CSS ou `undefined`
 */
export const getAlignItems = (alignItems?: AlignItems): string | undefined => {
  if (alignItems === undefined) return undefined;
  return ALIGN_ITEMS[alignItems].value;
};
