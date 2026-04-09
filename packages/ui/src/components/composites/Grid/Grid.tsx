import { GridProps, DEFAULT_PROPS } from "./Grid.types";
import { getGridStyle } from "./helpers/getGridStyles";
import { useMemo } from "react";

/**
 * Conteneur de mise en page du design system.
 *
 * Rend un élément natif (par défaut `<div>`) dont la disposition est pilotée
 * par les tokens du design system. Supporte deux modes :
 * - `"grid"` : CSS Grid, avec contrôle des colonnes, lignes et placement automatique.
 * - `"flex"` : Flexbox, avec contrôle de l'axe, du wrapping et de l'alignement.
 *
 * Les styles sont calculés par `getGridStyle()` et mémoïsés : un recalcul n'a lieu
 * que si une prop de style change. `className`, `children` et `as` n'en déclenchent pas.
 *
 * @example
 * // Grille 3 colonnes avec gouttière
 * <Grid cols={3} gap="md">
 *   <div>1</div>
 *   <div>2</div>
 *   <div>3</div>
 * </Grid>
 *
 * @example
 * // Colonnes fluides responsives sans breakpoints
 * <Grid minColWidth={240} gap="lg">
 *   {items.map(item => <Card key={item.id} {...item} />)}
 * </Grid>
 *
 * @example
 * // Flexbox centré horizontalement et verticalement
 * <Grid mode="flex" justify="center" align="center" gap="sm" minHeight="100vh">
 *   <Spinner />
 * </Grid>
 *
 * @example
 * // Layout page avec breakpoints
 * <Grid cols={12} gap="md" breakpoints={{ sm: { cols: 1 }, md: { cols: 6 } }}>
 *   <GridItem colSpan={8}>Contenu principal</GridItem>
 *   <GridItem colSpan={4}>Sidebar</GridItem>
 * </Grid>
 *
 * @example
 * // Rendu en <ul> sémantique
 * <Grid as="ul" cols={2} gap="sm">
 *   <li>Item 1</li>
 *   <li>Item 2</li>
 * </Grid>
 */
export const Grid = (props: GridProps) => {
  const mergedProps = { ...DEFAULT_PROPS, ...props };
  const Tag = mergedProps.as ?? "div";

  const gridStyle = useMemo(
    () => getGridStyle(mergedProps),
    [
      mergedProps.mode,
      mergedProps.surface,
      mergedProps.tone,
      mergedProps.padding,
      mergedProps.margin,
      mergedProps.gap,
      mergedProps.rowGap,
      mergedProps.colGap,
      mergedProps.width,
      mergedProps.height,
      mergedProps.minHeight,
      mergedProps.maxHeight,
      mergedProps.minWidth,
      mergedProps.maxWidth,
      mergedProps.cols,
      mergedProps.rows,
      mergedProps.autoRows,
      mergedProps.autoCols,
      mergedProps.autoFlow,
      mergedProps.minColWidth,
      mergedProps.direction,
      mergedProps.wrap,
      mergedProps.justify,
      mergedProps.align,
      mergedProps.justifyContent,
      mergedProps.alignContent,
      mergedProps.border,
      mergedProps.shadow,
      mergedProps.radius,
      mergedProps.style,
    ],
  );

  return (
    <Tag className={mergedProps.className} style={gridStyle}>
      {mergedProps.children}
    </Tag>
  );
};