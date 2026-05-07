/**
 * Retourne la valeur d'opacité CSS.
 *
 * @param opacity - Valeur entre 0 et 1 (`1` par défaut)
 * @returns Valeur numérique d'opacité
 */
export const getOpacity = (opacity?: number): number => {
  return opacity ?? 1;
};
