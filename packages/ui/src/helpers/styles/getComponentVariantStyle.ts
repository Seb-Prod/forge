import { Tone, Variant } from "@workspace/ui/constants";
import { VariantStateMap } from "@workspace/ui/types";

type ComponentCSSVars = React.CSSProperties;

type UseComponentColorsParams = {
  tone?: Tone;
  variant?: Variant;
  mode?: "light" | "dark";
  appearances: Record<"light" | "dark", VariantStateMap>;
};

export const getComponentVariantStyle = ({
  tone = "neutral",
  variant = "solid",
  mode = "light",
  appearances,
}: UseComponentColorsParams): ComponentCSSVars => {
  const levels = appearances[mode][variant];

  return {
    // DEFAULT
    ["--component-bg" as string]:
      `var(--color-${tone}-${levels.default.bg})`,

    ["--component-text" as string]:
      `var(--color-${tone}-${levels.default.text})`,

    ["--component-border" as string]:
      `var(--color-${tone}-${levels.default.border})`,

    

    // HOVER
    ["--component-bg-hover" as string]:
      `var(--color-${tone}-${levels.hover.bg})`,

    ["--component-text-hover" as string]:
      `var(--color-${tone}-${levels.hover.text})`,

    ["--component-border-hover" as string]:
      `var(--color-${tone}-${levels.hover.border})`,

    

    // ACTIVE
    ["--component-bg-active" as string]:
      `var(--color-${tone}-${levels.active.bg})`,

    ["--component-text-active" as string]:
      `var(--color-${tone}-${levels.active.text})`,

    ["--component-border-active" as string]:
      `var(--color-${tone}-${levels.active.border})`,

    

    // DISABLED
    ["--component-bg-disabled" as string]:
      `var(--color-${tone}-${levels.disabled.bg})`,

    ["--component-text-disabled" as string]:
      `var(--color-${tone}-${levels.disabled.text})`,

    ["--component-border-disabled" as string]:
      `var(--color-${tone}-${levels.disabled.border})`,

    
  };
};