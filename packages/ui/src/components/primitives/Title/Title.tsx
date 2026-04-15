import { forwardRef } from "react";
import { Text, type TextProps } from "@workspace/ui"

// 🎯 Restreindre uniquement aux titres
type TitleTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface TitleProps extends Omit<TextProps, "as"> {
  as?: TitleTag;
}

// 🎨 Mapping par défaut
const TITLE_DEFAULTS: Record<TitleTag, Partial<TextProps>> = {
  h1: { size: "5xl", weight: "bold", lineHeight: "tight" },
  h2: { size: "4xl", weight: "bold", lineHeight: "tight" },
  h3: { size: "3xl", weight: "semibold", lineHeight: "snug" },
  h4: { size: "2xl", weight: "semibold", lineHeight: "snug" },
  h5: { size: "xl", weight: "medium", lineHeight: "normal" },
  h6: { size: "lg", weight: "medium", lineHeight: "normal" },
};

export const Title = forwardRef<HTMLElement, TitleProps>(
  ({ as = "h1", size, weight, ...props }, ref) => {
    const defaults = TITLE_DEFAULTS[as];

    return (
      <Text
        ref={ref}
        as={as}
        size={size ?? defaults.size}
        weight={weight ?? defaults.weight}
        {...props}
      />
    );
  }
);

Title.displayName = "Title";