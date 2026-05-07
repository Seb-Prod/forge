import {
  getAppearanceStyle,
  getDimensionStyle,
  getInteractiveStyle,
  getLayoutStyle,
  getSpacingStyle,
  useSurfaceColors,
} from "@workspace/ui/helpers";
import { BoxProps } from "../Box.types";
import { useIsDark } from "@workspace/ui/contexts";
import { useMemo } from "react";

/**
 * Calcule les styles CSS du composant `Box` à partir de ses props.
 * Mémoïse le résultat pour éviter les recalculs inutiles.
 *
 * @param props - Props du composant Box
 * @returns Objet de styles CSS fusionné
 */
export const useBoxStyle = (props: BoxProps): React.CSSProperties => {
  const isDark = useIsDark();
  const surfaceColors = useSurfaceColors();

  return useMemo(
    () => ({
      ...getAppearanceStyle(props, surfaceColors),
      ...getSpacingStyle(props),
      ...getDimensionStyle(props),
      ...getLayoutStyle(props),
      ...getInteractiveStyle(props),

      ...props.style,
    }),
    [
      isDark,
      surfaceColors,
      props.surface,
      props.tone,
      props.shadow,
      props.border,
      props.radius,
      props.opacity,
      props.overflow,
      props.padding,
      props.margin,
      props.gap,
      props.width,
      props.height,
      props.minWidth,
      props.maxWidth,
      props.minHeight,
      props.maxHeight,
      props.display,
      props.flex,
      props.flexDirection,
      props.flexWrap,
      props.alignItems,
      props.justifyContent,
      props.position,
      props.zIndex,
      props.cursor,
      props.pointerEvents,
      props.style,
    ],
  );
};
