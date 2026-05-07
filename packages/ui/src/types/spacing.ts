import { Spacing } from "../constants";
import { AxisSpacing } from "../constants/ui/types";

/**
 * Props d'espacement partagées entre les composants UI.
 *
 * @example
 * <Box padding="md" gap="sm" />
 * <Box padding={{ top: "lg", bottom: "sm" }} margin={{ left: "xl" }} />
 */
export interface SpacingProps {
  /** Espacement intérieur — token simple ou objet par côté. */
  padding?: AxisSpacing<Spacing>;

  /** Espacement extérieur — token simple ou objet par côté. */
  margin?: AxisSpacing<Spacing>;

  /** Espacement entre les enfants directs (flexbox/grid). */
  gap?: Spacing;
}