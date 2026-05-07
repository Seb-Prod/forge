import { FlexWrap } from "@workspace/ui/constants";

/**
 * Retourne la valeur CSS de `flex-wrap`.
 *
 * @param flexWrap - Mode de retour à la ligne
 * @returns Valeur CSS ou `undefined`
 */
export const getFlexWrap = (flexWrap?: FlexWrap): FlexWrap | undefined => {
  if (flexWrap === undefined) return undefined;
  return flexWrap;
};
