import { forwardRef, useMemo } from "react";
import { BoxProps, DEFAULT_PROPS } from "./Box.types";
import { useBoxStyle } from "./hooks/useBoxStyles";
import { BoxContext, useBoxContext } from "./Box.context";

/**
 * Conteneur générique du design system.
 *
 * * @version 1.0.0
 *
 * Rend un `<div>` natif dont l'apparence est entièrement pilotée par les tokens
 * du design system (surface, tone, espacement, dimensions, bordure, ombre, rayon, overflow).
 *
 * Les styles sont calculés par `useBoxStyle()` et mémoïsés : un recalcul n'a lieu
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

  const boxStyle = useBoxStyle(mergedProps);

  const parent = useBoxContext();

  const contextValue = useMemo(
    () => ({
      surface: props.surface !== undefined ? props.surface : parent?.surface,
      tone: props.tone !== undefined ? props.tone : parent?.tone,
    }),
    [mergedProps.surface, mergedProps.tone, parent],
  );

  return (
    <BoxContext.Provider value={contextValue}>
      <div ref={ref} className={mergedProps.className} style={boxStyle}>
        {mergedProps.children}
      </div>
    </BoxContext.Provider>
  );
});

Box.displayName = "Box";
