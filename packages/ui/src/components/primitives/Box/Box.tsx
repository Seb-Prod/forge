import { BoxProps, DEFAULT_PROPS } from "./Box.types";
import { getBoxStyle } from "./helpers/getBoxStyles";
import { useMemo, forwardRef } from "react";

/**
 * Conteneur générique du design system.
 *
 * Rend un `<div>` natif dont l'apparence est entièrement pilotée par les tokens
 * du design system (surface, tone, espacement, dimensions, bordure, ombre, rayon, overflow).
 *
 * Les styles sont calculés par `getBoxStyle()` et mémoïsés : un recalcul n'a lieu
 * que si une prop de style change. `className` et `children` n'en déclenchent pas.
 *
 * @example
 * // Box simple avec padding et surface
 * <Box padding="md" surface="card">
 *   Contenu ici
 * </Box>
 *
 * @example
 * // Conteneur scrollable en hauteur
 * <Box maxHeight="300px" overflow="y" padding="sm" border="sm" radius="md">
 *   {longContent}
 * </Box>
 *
 * @example
 * // Card avec élévation
 * <Box surface="elevated" shadow="md" radius="lg" padding="lg" tone="primary">
 *   Card avec élévation
 * </Box>
 */
export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const mergedProps = { ...DEFAULT_PROPS, ...props };

  const boxStyle = useMemo(
    () => getBoxStyle(mergedProps),
    [
      mergedProps.surface,
      mergedProps.tone,
      mergedProps.padding,
      mergedProps.margin,
      mergedProps.gap,
      mergedProps.width,
      mergedProps.height,
      mergedProps.minHeight,
      mergedProps.maxHeight,
      mergedProps.minWidth,
      mergedProps.maxWidth,
      mergedProps.radius,
      mergedProps.shadow,
      mergedProps.overflow,
      mergedProps.style,
    ],
  );

  return (
    <div
      ref={ref}
      className={mergedProps.className}
      style={boxStyle}
    >
      {mergedProps.children}
    </div>
  );
});