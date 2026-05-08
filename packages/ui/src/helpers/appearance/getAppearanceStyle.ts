import { AppearanceProps } from "@workspace/ui/types";
import { CSSProperties } from "react";
import { SurfaceColors } from "./surfaceColor/useSurfaceColors";
import { getBorderSize } from "./getBorderSize";
import { getBorderRadius } from "./getBorderRadius";
import { getOpacity } from "./getOpacity";

/**
 * Génère un objet `CSSProperties` à partir des props d'apparence.
 * Seules les propriétés définies sont incluses dans le résultat.
 *
 * @param props - Props d'apparence (surface, tone, border, radius, opacity, overflow, shadow)
 * @param surfaceColors - Helpers de couleur issus de `useSurfaceColors`
 * @returns Objet de styles CSS partiel
 */
export const getAppearanceStyle = (
  props: AppearanceProps,
  surfaceColors: SurfaceColors,
): CSSProperties => {
  const {
    getSurfaceBackground,
    getSurfaceTextColor,
    getSurfaceBorderColor,
    getSurfaceShadow,
  } = surfaceColors;

  const surface = props.surface ?? "none";

  const background = getSurfaceBackground(surface, props.tone);
  const color = getSurfaceTextColor(surface, props.tone);
  const borderColor = getSurfaceBorderColor(surface, props.tone);
  const boxShadow = getSurfaceShadow(surface, props.shadow);
  const borderSize = getBorderSize(props.border);
  const borderRadius = getBorderRadius(props.radius);
  const opacity = getOpacity(props.opacity);

  return {
    ...(background && { background }),
    ...(color && { color }),
    ...(borderColor && { borderColor }),
    ...(boxShadow && { boxShadow }),

    ...(borderRadius !== undefined && { borderRadius }),
    ...(opacity !== undefined && { opacity }),

    ...(borderSize &&
      borderColor && {
        border: `${borderSize} solid ${borderColor}`,
      }),
  };
};
