import { CURSOR, Cursor } from "@workspace/ui/constants";

/**
 * Retourne la valeur CSS de `cursor`.
 *
 * @param cursor - Token de curseur
 * @returns Valeur CSS ou `undefined`
 */
export const getCursor = (cursor?: Cursor): string | undefined => {
  if (cursor === undefined) return undefined;
  return CURSOR[cursor].value;
};
