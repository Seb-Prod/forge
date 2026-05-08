import {
  getAppearanceStyle,
  getDimensionStyle,
  getInteractiveStyle,
  getLayoutStyle,
  getSpacingStyle,
  useSurfaceColors,
} from "@workspace/ui/helpers";
import { ButtonProps } from "../Button.types";
import { useIsDark } from "@workspace/ui/contexts";
import { useMemo } from "react";

/**
 * Calcule les styles CSS du composant `Box` à partir de ses props.
 * Mémoïse le résultat pour éviter les recalculs inutiles.
 *
 * @param props - Props du composant Box
 * @returns Objet de styles CSS fusionné
 */
export const useBoxStyle = (props: ButtonProps): React.CSSProperties => {
  const isDark = useIsDark();
  const surfaceColors = useSurfaceColors();

  return useMemo(
    () => ({
      ...getAppearanceStyle(props, surfaceColors),
      

      ...props.style,
    }),
    [
      isDark,
      surfaceColors,
      props.tone,
      props.style,
    ],
  );
};
