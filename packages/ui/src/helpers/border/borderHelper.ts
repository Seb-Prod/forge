import { BORDER_SIZES, BorderSize } from "@workspace/ui/constants";
import {
  BoxSides,
  createBoxShorthand,
  createLogger,
  createResolver,
} from "../shared";

/**
 * @function resolveBorderSize
 * @description Résout un token de taille de bordure en valeur CSS.
 * Si la valeur est un token connu (ex: `"sm"`), retourne la valeur associée (ex: `"1px"`).
 * Sinon, retourne la valeur brute (ex: `"2px"`, `"0.1rem"`).
 * Un avertissement est émis si la valeur ne correspond pas à une taille CSS valide.
 *
 * @param value - Token {@link BorderSize} ou valeur CSS arbitraire
 * @returns Valeur CSS résolue
 *
 * @example
 * resolveBorderSize("sm")     // "1px"
 * resolveBorderSize("2px")    // "2px"
 * resolveBorderSize("banana") // "banana" + logger.warn
 */
export const resolveBorderSize = createResolver(
  BORDER_SIZES,
  createLogger({ prefix: "resolveBorderSize" }),
  "BorderSize",
);

/**
 * @type BorderSizeValue
 * @description Valeur de taille de bordure acceptant un token global ou des côtés individuels.
 *
 * @template T - Type du token, par défaut {@link BorderSize} ou `string`
 *
 * @example
 * // Token global
 * const a: BorderSizeValue = "sm";
 *
 * // Côtés individuels
 * const b: BorderSizeValue = { top: "sm", bottom: "md" };
 */
export type BorderSizeValue<T = BorderSize | string> = T | BoxSides<T>;

/**
 * @function getBorderSize
 * @description Résout une {@link BorderSizeValue} en shorthand CSS.
 *
 * @param borderSize - Valeur de taille de bordure. Par défaut `"md"`
 * @returns Shorthand CSS (ex: `"2px"`, `"1px 0px 4px 0px"`)
 *
 * @example
 * getBorderSize("lg")"
 * getBorderSize({ top: "sm", bottom: "md" })"
 */
export const getBorderSize = (borderSize: BorderSizeValue = "md") =>
  createBoxShorthand(borderSize, resolveBorderSize, "none");
