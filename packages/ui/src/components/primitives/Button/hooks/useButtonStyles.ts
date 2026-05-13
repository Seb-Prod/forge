import { useIsDark } from "@workspace/ui/contexts";
import { ButtonProps } from "../Button.types";
import { useMemo } from "react";
import { getComponentStyle } from "@workspace/ui/helpers";
import { COMPONENT_SHADOW_TOKENS_DEFAULT, COMPONENT_SIZES_TOKENS_DEFAULT, COMPONENT_VARIANT_TOKENS_DEFAULT } from "@workspace/ui/defaults";

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
        appearances: COMPONENT_VARIANT_TOKENS_DEFAULT,
        shadows: COMPONENT_SHADOW_TOKENS_DEFAULT,
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