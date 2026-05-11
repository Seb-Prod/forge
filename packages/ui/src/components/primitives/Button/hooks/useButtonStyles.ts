import { getComponentStyle } from "@workspace/ui/helpers";
import { ButtonProps } from "../Button.types";
import { useIsDark } from "@workspace/ui/contexts";
import { useMemo } from "react";
import { COMPONENT_SIZES_TOKENS_DEFAULT } from "@workspace/ui/defaults";

export const useButtonStyle = (
  props: ButtonProps,
): React.CSSProperties => {
  const isDark = useIsDark();

  const componentStyle = getComponentStyle({
    ...props,
    sizes: COMPONENT_SIZES_TOKENS_DEFAULT,
  });

  return useMemo(
    () => ({
      ...componentStyle,
      ...props.style,
    }),
    [isDark, props.variant, props.tone, props.style, props.size],
  );
};