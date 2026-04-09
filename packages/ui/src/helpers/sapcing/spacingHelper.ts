import { Spacing, SPACINGS } from "@workspace/ui/constants";
import { BoxSides, createBoxShorthand, createLogger, createResolver } from "../shared";


/**
 * @function resolveSpacing
 * @description Résout un token d'espacement en valeur CSS.
 * Si la valeur est un token connu (ex: `"md"`), retourne la valeur associée (ex: `"16px"`).
 * Sinon, retourne la valeur brute (ex: `"1rem"`, `"10%"`).
 * En développement, un avertissement est émis si la valeur ne correspond pas à {@link CSS_SIZE_REGEX}.
 *
 * @param value - Token {@link Spacing} ou valeur CSS arbitraire
 * @returns Valeur CSS résolue
 *
 * @example
 * resolveSpacing("md")     // "16px"
 * resolveSpacing("1rem")   // "1rem"
 * resolveSpacing("banana") // "banana" + logger.warn
 */
export const resolveSpacing = createResolver(
  SPACINGS,
  createLogger({ prefix: "resolvePaddingSize" }),
  "Spacing",
);

/**
 * @type SpacingValue
 * @description Valeur d'espacement acceptant un token global ou des côtés individuels.
 *
 * @template T - Type du token, par défaut {@link Spacing} ou `string`
 *
 * @example
 * // Token global
 * const a: SpacingValue = "md";
 *
 * // Côtés individuels
 * const b: SpacingValue = { top: "sm", bottom: "lg" };
 */
export type SpacingValue<T = Spacing | string> = T | BoxSides<T>;

/**
 * @type PaddingValue
 * @description Valeur de padding. Alias sémantique de {@link SpacingValue}.
 */
export type PaddingValue = SpacingValue;

/**
 * @type MarginValue
 * @description Valeur de margin. Alias sémantique de {@link SpacingValue}.
 */
export type MarginValue = SpacingValue;

/**
 * @type GapValue
 * @description Valeur de gap. Alias sémantique de {@link SpacingValue}.
 */
export type GapValue = SpacingValue;

/**
 * @function getPadding
 * @description Résout une {@link PaddingValue} en shorthand CSS.
 *
 * @param padding - Valeur de padding. Par défaut `"md"` (`16px`)
 * @returns Shorthand CSS (ex: `"16px"`, `"16px 0px 8px 0px"`)
 *
 * @example
 * getPadding("lg")                        // "24px"
 * getPadding({ top: "sm", bottom: "md" }) // "8px 0px 16px 0px"
 */
export const getPadding = (padding: PaddingValue = "md") =>
  createBoxShorthand(padding, resolveSpacing, "none");

/**
 * @function getMargin
 * @description Résout une {@link MarginValue} en shorthand CSS.
 *
 * @param margin - Valeur de margin. Par défaut `"none"` (`0px`)
 * @returns Shorthand CSS (ex: `"0px"`, `"8px 16px 8px 16px"`)
 *
 * @example
 * getMargin("xs")                          // "4px"
 * getMargin({ top: "md", right: "none" })  // "16px 0px 0px 0px"
 */
export const getMargin = (margin: MarginValue = "none") =>
  createBoxShorthand(margin, resolveSpacing, "none");

/**
 * @function getGap
 * @description Résout une {@link GapValue} en shorthand CSS.
 *
 * @param gap - Valeur de gap. Par défaut `"none"` (`0px`)
 * @returns Shorthand CSS (ex: `"8px"`, `"16px 8px 0px 0px"`)
 *
 * @example
 * getGap("sm")                        // "8px"
 * getGap({ top: "md", left: "xs" })   // "16px 0px 0px 4px"
 */
export const getGap = (gap: GapValue = "none") =>
  createBoxShorthand(gap, resolveSpacing, "none");
