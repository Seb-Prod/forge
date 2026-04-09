import { Radius, RADIUS } from "@workspace/ui/constants";
import { BoxSides, createBoxShorthand, createLogger, createResolver } from "../shared";

/**
 * @function resolveRadius
 * @description Résout un token radius en valeur CSS.
 * Si la valeur est un token connu (ex: `"md"`), retourne la valeur associée (ex: `"8px"`).
 * Sinon, retourne la valeur brute (ex: `"1rem"`, `"50%"`).
 * Un avertissement est émis si la valeur ne correspond pas à une taille CSS valide.
 *
 * @param value - Token {@link Radius} ou valeur CSS arbitraire
 * @returns Valeur CSS résolue
 *
 * @example
 * resolveRadius("md")     // "8px"
 * resolveRadius("1rem")   // "1rem"
 * resolveRadius("banana") // "banana" + logger.warn
 */
export const resolveRadius = createResolver(RADIUS, createLogger({ prefix: "resolveRadius" }), "Radius");

/**
 * @type RadiusValue
 * @description Valeur radius acceptant un token global ou des côtés individuels.
 *
 * @template T - Type du token, par défaut {@link Radius} ou `string`
 *
 * @example
 * // Token global
 * const a: RadiusValue = "md";
 *
 * // Côtés individuels
 * const b: RadiusValue = { top: "sm", bottom: "lg" };
 */
export type RadiusValue<T = Radius | string> = T | BoxSides<T>;

/**
 * @function getRadius
 * @description Résout une {@link RadiusValue} en shorthand CSS.
 *
 * @param radius - Valeur de radius. Par défaut `"md"`
 * @returns Shorthand CSS (ex: `"8px"`, `"8px 0px 16px 0px"`)
 *
 * @example
 * getRadius("lg")                        // "24px"
 * getRadius({ top: "sm", bottom: "md" }) // "8px 0px 16px 0px"
 */
export const getRadius = (radius: RadiusValue = "md") =>
  createBoxShorthand(radius, resolveRadius, "none");