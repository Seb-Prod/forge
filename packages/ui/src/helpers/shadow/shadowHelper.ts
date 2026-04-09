import { Shadow, SHADOWS } from "@workspace/ui/constants";


/**
 * @function getShadow
 * @description Résout un token d'ombre en variable CSS `box-shadow`.
 * Les valeurs sont définies dans les tokens CSS et s'adaptent au thème via `--shadow-color`.
 *
 * @param shadow - Token {@link Shadow}. Par défaut `"none"`
 * @returns Variable CSS `box-shadow`
 *
 * @example
 * getShadow("sm")    // "var(--shadow-sm)"
 * getShadow("inner") // "var(--shadow-inner)"
 * getShadow("none")  // "var(--shadow-none)"
 */
export const getShadow = (shadow: Shadow = "none"): string =>
  `var(${SHADOWS[shadow].value})`;