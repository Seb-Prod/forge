import { Tone, Variant } from "@workspace/ui/constants";
import { useComponentTokens } from "./useComponentTokens";

type ComponentCSSVars = React.CSSProperties;

type UseComponentColorsParams = {
  tone?: Tone;
  variant?: Variant;
  shadow?: boolean;
};

export const useComponentColors = ({
  tone = "neutral",
  variant = "solid",
  shadow = true,
}: UseComponentColorsParams = {}): ComponentCSSVars => {
  const { levels, getShadow } = useComponentTokens({
    variant,
  });

  return {
    // DEFAULT
    ["--component-bg" as string]:
      `var(--color-${tone}-${levels.default.bg})`,

    ["--component-text" as string]:
      `var(--color-${tone}-${levels.default.text})`,

    ["--component-border" as string]:
      `var(--color-${tone}-${levels.default.border})`,

    ["--component-shadow" as string]:
      shadow ? getShadow(levels.default.shadow) : "none",

    // HOVER
    ["--component-bg-hover" as string]:
      `var(--color-${tone}-${levels.hover.bg})`,

    ["--component-text-hover" as string]:
      `var(--color-${tone}-${levels.hover.text})`,

    ["--component-border-hover" as string]:
      `var(--color-${tone}-${levels.hover.border})`,

    ["--component-shadow-hover" as string]:
      shadow ? getShadow(levels.hover.shadow) : "none",

    // ACTIVE
    ["--component-bg-active" as string]:
      `var(--color-${tone}-${levels.active.bg})`,

    ["--component-text-active" as string]:
      `var(--color-${tone}-${levels.active.text})`,

    ["--component-border-active" as string]:
      `var(--color-${tone}-${levels.active.border})`,

    ["--component-shadow-active" as string]:
      shadow ? getShadow(levels.active.shadow) : "none",

    // DISABLED
    ["--component-bg-disabled" as string]:
      `var(--color-${tone}-${levels.disabled.bg})`,

    ["--component-text-disabled" as string]:
      `var(--color-${tone}-${levels.disabled.text})`,

    ["--component-border-disabled" as string]:
      `var(--color-${tone}-${levels.disabled.border})`,

    ["--component-shadow-disabled" as string]:
      shadow ? getShadow(levels.disabled.shadow) : "none",
  };
};