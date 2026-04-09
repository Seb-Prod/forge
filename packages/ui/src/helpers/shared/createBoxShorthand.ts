export type BoxSides<T> = {
  top?: T;
  right?: T;
  bottom?: T;
  left?: T;
};

/**
 * @function formatShorthand
 * @description Optimise un shorthand CSS à quatre valeurs selon les règles de compression CSS.
 * - 1 valeur  : `"16px"` → tous les côtés identiques
 * - 2 valeurs : `"16px 8px"` → top/bottom identiques et right/left identiques
 * - 3 valeurs : `"16px 8px 4px"` → right/left identiques
 * - 4 valeurs : `"16px 8px 4px 0px"` → tous différents
 *
 * @param t - Valeur CSS du côté top
 * @param r - Valeur CSS du côté right
 * @param b - Valeur CSS du côté bottom
 * @param l - Valeur CSS du côté left
 * @returns Shorthand CSS optimisé
 *
 * @example
 * formatShorthand("8px", "8px", "8px", "8px")   // "8px"
 * formatShorthand("8px", "16px", "8px", "16px")  // "8px 16px"
 * formatShorthand("8px", "16px", "4px", "16px")  // "8px 16px 4px"
 * formatShorthand("8px", "16px", "4px", "0px")   // "8px 16px 4px 0px"
 */
const formatShorthand = (t: string, r: string, b: string, l: string): string => {
  if (t === r && t === b && t === l) return t;
  if (t === b && r === l) return `${t} ${r}`;
  if (r === l) return `${t} ${r} ${b}`;
  return `${t} ${r} ${b} ${l}`;
};

/**
 * @function isBoxSides
 * @description Détermine si une valeur est un objet {@link BoxSides}.
 * Vérifie la présence d'au moins une clé parmi `top`, `right`, `bottom`, `left`.
 *
 * @template T - Type des valeurs des côtés
 * @param value - Valeur à tester
 * @returns `true` si la valeur est un {@link BoxSides}, `false` sinon
 *
 * @internal
 */
const isBoxSides = <T>(value: unknown): value is BoxSides<T> => {
  return (
    typeof value === "object" &&
    value !== null &&
    (
      "top" in value ||
      "right" in value ||
      "bottom" in value ||
      "left" in value
    )
  );
};

/**
 * @function createBoxShorthand
 * @description Résout une valeur globale ou par côté en shorthand CSS optimisé.
 * Délègue la résolution de chaque valeur au `resolver` fourni,
 * et compresse le résultat via {@link formatShorthand}.
 *
 * @template T - Type du token ou de la valeur d'espacement
 * @param value - Valeur globale ou objet {@link BoxSides}
 * @param resolver - Fonction de résolution d'un token en valeur CSS
 * @param defaultValue - Valeur utilisée pour les côtés non renseignés
 * @returns Shorthand CSS optimisé
 *
 * @example
 * createBoxShorthand("md", resolveSpacing, "none")
 * // "16px"
 *
 * createBoxShorthand({ top: "sm", bottom: "lg" }, resolveSpacing, "none")
 * // "8px 0px 24px"
 */
export const createBoxShorthand = <T>(
  value: T | BoxSides<T>,
  resolver: (v: T) => string,
  defaultValue: T
): string => {
  if (isBoxSides<T>(value)) {
    const t = resolver(value.top ?? defaultValue);
    const r = resolver(value.right ?? defaultValue);
    const b = resolver(value.bottom ?? defaultValue);
    const l = resolver(value.left ?? defaultValue);
    return formatShorthand(t, r, b, l);
  }

  return resolver(value);
};