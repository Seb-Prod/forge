import { Position } from "@workspace/ui/constants";

/**
 * Retourne la valeur CSS de `z-index`.
 *
 * @param zIndex - Ordre d'empilement sur l'axe Z
 * @returns Valeur numérique ou `undefined`
 */
export const getZIndex = (zIndex?: number): number | undefined => {
  if (zIndex === undefined) return undefined;
  return zIndex;
};
