import { FLEX, Flex } from "@workspace/ui/constants";

/**
 * Retourne la valeur CSS de `flex`.
 * Accepte un token {@link Flex} ou une valeur CSS libre (`1`, `"1 1 auto"`…).
 *
 * @param flex - Token ou valeur CSS libre
 * @returns Valeur CSS ou `undefined`
 */
export const getFlex = (flex?: Flex | React.CSSProperties["flex"]): string | undefined => {
  if (flex === undefined) return undefined;
  if (flex in FLEX) return FLEX[flex as Flex].value;
  return `${flex}`;
};
