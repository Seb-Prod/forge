import { UIConstant } from "@workspace/ui/constants/ui/types/ui-constant";

/**
 * @function createTokenValueResolver
 * @description Crée un resolver de token CSS qui retourne la valeur brute.
 *
 * @param tokens     - Map de tokens {@link UIConstant}
 * @param defaultKey - Clé utilisée si aucune valeur n'est passée
 * @returns Fonction qui résout une clé en valeur brute
 *
 * @example
 * const getTextDecoration = createTokenValueResolver(TEXT_DECORATIONS, "none");
 * getTextDecoration("lineThrough") // "line-through"
 */
export const createTokenValueResolver = <
  T extends Record<string, UIConstant<string>>,
>(
  tokens: T,
  defaultKey: keyof T,
) => {
  return (key: keyof T = defaultKey): string => tokens[key].value;
};

/**
 * @function createTokenResolver
 * @description Crée un resolver de token CSS générique.
 *
 * @param tokens     - Map de tokens {@link UIConstant}
 * @param defaultKey - Clé utilisée si aucune valeur n'est passée
 * @returns Fonction qui résout une clé en `var(--...)`
 *
 * @example
 * const getShadow = createTokenResolver(SHADOWS, "none");
 * getShadow("sm") // "var(--shadow-sm)"
 *
 * const getTextSize = createTokenResolver(TEXT_SIZES, "md");
 * getTextSize("lg") // "var(--text-lg)"
 */
export const createTokenResolver = <
  T extends Record<string, UIConstant<string>>,
>(
  tokens: T,
  defaultKey: keyof T,
) => {
  const resolveValue = createTokenValueResolver(tokens, defaultKey);
  return (key: keyof T = defaultKey): string => `var(${resolveValue(key)})`;
};
