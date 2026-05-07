import { DEFAULT_APPEARANCE_PROPS, DEFAULT_DIMENSION_PROPS, DEFAULT_INTERACTIVE_PROPS, DEFAULT_LAYOUT_PROPS, DEFAULT_SPACING_PROPS } from "@workspace/ui/defaults";
import { AppearanceProps, BaseProps, DimensionProps, InteractiveProps, LayoutProps, SpacingProps } from "@workspace/ui/types";


/** Props du composant `Box` — agrège toutes les catégories de props. */
export interface BoxProps
  extends
    BaseProps,
    SpacingProps,
    DimensionProps,
    AppearanceProps,
    LayoutProps,
    InteractiveProps {}

/** Valeurs par défaut du composant `Box`. */
export const DEFAULT_PROPS: Partial<BoxProps> = {
  ...DEFAULT_SPACING_PROPS,
  ...DEFAULT_APPEARANCE_PROPS,
  ...DEFAULT_LAYOUT_PROPS,
  ...DEFAULT_INTERACTIVE_PROPS,
  ...DEFAULT_DIMENSION_PROPS,
};
