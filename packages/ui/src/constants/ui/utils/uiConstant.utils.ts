import { UIConstant } from "../types";

/**
 * Utils pour manipuler les constantes UI.
 *
 * @module uiConstant.utils
 * @version 1.0.0
 */

/**
 * Récupère une propriété d'une constante UI à partir de sa clé.
 *
 * Cette fonction permet d'accéder dynamiquement à une propriété
 * (`value`, `label`, `description`, etc.) d'un objet de constantes
 * typé avec `UIConstant`.
 *
 * @template T - Objet contenant les constantes UI.
 * @template K - Clé d'une constante dans l'objet.
 * @template P - Propriété de la constante à récupérer.
 *
 * @param constants - Objet contenant les constantes UI.
 * @param prop - Nom de la propriété à récupérer.
 * @param key - Clé de la constante recherchée.
 *
 * @returns La valeur de la propriété demandée,
 * ou `"none"` si aucune clé n'est fournie.
 *
 * @example
 * ```ts
 * getConstantProp(COMPONENT_SIZES, "value", "sm");
 * // "sm"
 * ```
 *
 * @example
 * ```ts
 * getConstantProp(COMPONENT_SIZES, "label", "sm");
 * // "Small"
 * ```
 */
export const getConstantProp = <
  T extends Record<string, UIConstant<string>>,
  K extends keyof T,
  P extends keyof T[K],
>(
  constants: T,
  prop: P,
  key?: K,
): T[K][P] | "none" => {
  if (!key) return "none";

  return constants[key][prop];
};

/**
 * Récupère la propriété `value` d'une constante UI.
 *
 * @template T - Objet contenant les constantes UI.
 * @template K - Clé d'une constante dans l'objet.
 *
 * @param c - Objet contenant les constantes UI.
 * @param key - Clé de la constante recherchée.
 *
 * @returns La valeur de la constante,
 * ou `"none"` si aucune clé n'est fournie.
 *
 * @example
 * ```ts
 * getConstantValue(COMPONENT_SIZES, "sm");
 * // "sm"
 * ```
 */
export const getConstantValue = <
  T extends Record<string, UIConstant<string>>,
  K extends keyof T,
>(
  c: T,
  key?: K,
): T[K]["value"] | "none" => getConstantProp(c, "value", key);

/**
 * Récupère la propriété `label` d'une constante UI.
 *
 * @template T - Objet contenant les constantes UI.
 * @template K - Clé d'une constante dans l'objet.
 *
 * @param c - Objet contenant les constantes UI.
 * @param key - Clé de la constante recherchée.
 *
 * @returns Le label de la constante,
 * ou `"none"` si aucune clé n'est fournie.
 *
 * @example
 * ```ts
 * getConstantLabel(COMPONENT_SIZES, "sm");
 * // "Small"
 * ```
 */
export const getConstantLabel = <
  T extends Record<string, UIConstant<string>>,
  K extends keyof T,
>(
  c: T,
  key?: K,
): T[K]["label"] | "none" => getConstantProp(c, "label", key);

/**
 * Récupère la propriété `description` d'une constante UI.
 *
 * @template T - Objet contenant les constantes UI.
 * @template K - Clé d'une constante dans l'objet.
 *
 * @param c - Objet contenant les constantes UI.
 * @param key - Clé de la constante recherchée.
 *
 * @returns La description de la constante,
 * ou `"none"` si aucune clé n'est fournie.
 *
 * @example
 * ```ts
 * getConstantDescription(COMPONENT_SIZES, "sm");
 * // "Petit composant"
 * ```
 */
export const getConstantDescription = <
  T extends Record<string, UIConstant<string>>,
  K extends keyof T,
>(
  c: T,
  key?: K,
): T[K]["description"] | "none" => getConstantProp(c, "description", key);
