import {
  useComponentColors,
} from "@workspace/ui/helpers";
import { ButtonProps } from "../Button.types";
import { useIsDark } from "@workspace/ui/contexts";
import { useMemo } from "react";
import { useButtonSize } from "./useButtonSize";

/**
 * Calcule les styles CSS du composant `Box` à partir de ses props.
 * Mémoïse le résultat pour éviter les recalculs inutiles.
 *
 * @param props - Props du composant Box
 * @returns Objet de styles CSS fusionné
 */
export const useButtonStyle = (props: ButtonProps): React.CSSProperties => {
  const isDark = useIsDark();

  const colorVars = useComponentColors({
    tone: props.tone,
    variant: props.variant,
  });

  const sizeVars = useButtonSize({ size: props.size });

  return useMemo(
    () => ({
      ...colorVars,
      ...sizeVars,

      ...props.style,
    }),
    [isDark, props.variant, props.tone, props.style, props.size],
  );
};
