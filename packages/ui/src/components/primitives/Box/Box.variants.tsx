import { forwardRef } from "react";
import { Box } from "./Box";
import { BoxProps } from "./Box.types";

const withBoxDefaults = (defaults: Partial<BoxProps>) => {
  const Component = forwardRef<HTMLDivElement, BoxProps>((props, ref) => (
    <Box ref={ref} {...defaults} {...props} />
  ));
  return Component;
};

/** Conteneur flex horizontal. */
export const BoxRow = withBoxDefaults({ display: "flex", flexDirection: "row" });
BoxRow.displayName = "BoxRow";

/** Conteneur flex vertical. */
export const BoxColumn = withBoxDefaults({ display: "flex", flexDirection: "column" });
BoxColumn.displayName = "BoxColumn";

/** Conteneur flex centré sur les deux axes. */
export const BoxCenter = withBoxDefaults({ display: "flex", alignItems: "center", justifyContent: "center" });
BoxCenter.displayName = "BoxCenter";

/** Conteneur flex vertical avec espacement entre les enfants. */
export const BoxStack = withBoxDefaults({ display: "flex", flexDirection: "column", gap: "md" });
BoxStack.displayName = "BoxStack";

/** Conteneur scrollable verticalement. */
export const BoxScrollable = withBoxDefaults({ overflow: "y" });
BoxScrollable.displayName = "BoxScrollable";

/** Card avec surface élevée, rayon et padding. */
export const BoxCard = withBoxDefaults({ surface: "raised", radius: "md", padding: "md" });
BoxCard.displayName = "BoxCard";

/** Section avec padding vertical. */
export const BoxSection = withBoxDefaults({ padding: { y: "lg" } });
BoxSection.displayName = "BoxSection";

/** Conteneur overlay avec ombre et rayon élevés. */
export const BoxModal = withBoxDefaults({ surface: "overlay", shadow: true, radius: "lg", padding: "lg" });
BoxModal.displayName = "BoxModal";

/** Tooltip inversé avec padding minimal. */
export const BoxTooltip = withBoxDefaults({ surface: "inverted", radius: "sm", padding: "sm" });
BoxTooltip.displayName = "BoxTooltip";