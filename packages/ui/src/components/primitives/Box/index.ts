/**
 * Box - conteneur générique du design system
 *
 * Point d’entrée principal du composant `Box`.
 * Expose :
 * - le composant principal
 * - ses variantes
 * - ses types
 * - son contexte
 *
 * @version 1.0.0
 *
 * @example
 * import { Box } from "@/components";
import { BoxScrollable } from './Box.variants';
 *
 * <Box padding="md" surface="card">
 *   Contenu
 * </Box>
 */
export { Box } from "./Box";

/**
 * Variantes prédéfinies du composant Box
 * (ex: layouts, presets de styles, etc.)
 */
export {
  BoxRow,
  BoxColumn,
  BoxCenter,
  BoxStack,
  BoxScrollable,
  BoxCard,
  BoxSection,
  BoxModal,
  BoxTooltip,
} from "./Box.variants";

/**
 * Types publics du composant Box
 */
export type { BoxProps } from "./Box.types";

/**
 * Hook d’accès au contexte Box
 */
export { useBoxContext } from "./Box.context";
