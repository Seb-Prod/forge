import { FlexDirection } from "@workspace/ui/constants";

/**
 * Retourne la valeur CSS de `flex-direction`.
 *
 * @param flexDirection - Direction du flux flex
 * @returns Valeur CSS ou `undefined`
 */
export const getFlexDirection = (flexDirection?: FlexDirection): FlexDirection | undefined => {
  if (flexDirection === undefined) return undefined;
  return flexDirection;
};
