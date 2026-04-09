/**
 * @constant CSS_SIZE_REGEX
 * @description Expression régulière validant une valeur CSS de taille.
 * Couvre les usages de spacing, radius, et dimensions.
 * Accepte les unités `px`, `rem`, `em`, `%`, `vh`, `vw`, `ch`, `fr`, `pt`, ainsi que `0` nu.
 *
 * @example
 * CSS_SIZE_REGEX.test("16px")   // true
 * CSS_SIZE_REGEX.test("50%")    // true
 * CSS_SIZE_REGEX.test("0")      // true
 * CSS_SIZE_REGEX.test("banana") // false
 */
export const CSS_SIZE_REGEX = /^-?[\d.]+(px|rem|em|%|vh|vw|ch|fr|pt)$|^0$/;