import { useIsDark } from "@workspace/ui/contexts";
import { ButtonProps } from "../Button.types";
import { useMemo } from "react";
import { getComponentStyle } from "@workspace/ui/helpers";
import { COMPONENT_SIZES_TOKENS_DEFAULT} from "@workspace/ui/defaults";
import { COMPONENT_MOTION_TOKENS_DEFAULT, COMPONENT_COLOR_TOKENS_DEFAULT, COMPONENT_SHADOW_TOKENS_DEFAULT } from "@workspace/ui/styles";

export const useButtonStyle = (
  props: ButtonProps,
): React.CSSProperties => {
  const isDark = useIsDark();

  return useMemo(() => {
    return {
      ...getComponentStyle({
        ...props,
        mode: isDark ? "dark" : "light",
        sizes: COMPONENT_SIZES_TOKENS_DEFAULT,
        colors: COMPONENT_COLOR_TOKENS_DEFAULT,
        shadows: COMPONENT_SHADOW_TOKENS_DEFAULT,
        motions: COMPONENT_MOTION_TOKENS_DEFAULT,
      }),
      ...props.style,
    };
  }, [
    isDark,
    props.variant,
    props.tone,
    props.size,
    props.style,
  ]);
};