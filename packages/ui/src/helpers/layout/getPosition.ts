import { Position } from "@workspace/ui/constants";

/**
 * Retourne la valeur CSS de `position`.
 *
 * @param position - Mode de positionnement
 * @returns Valeur CSS ou `undefined`
 */
export const getPosition = (position?: Position): Position | undefined => {
  if (position === undefined) return undefined;
  return position;
};
