import { BORDER_SIZES, BorderSize } from "@workspace/ui/constants";

/**
 * Retourne la valeur CSS de la taille de bordure.
 *
 * @param borderSize - Clé de taille de bordure (`undefined` retourne `"none"`)
 * @returns Valeur CSS de la bordure
 */
export const getBorderSize = (borderSize?: BorderSize): string => {
  if (borderSize === undefined) return "none";
  return `${BORDER_SIZES[borderSize].value}`;
};
