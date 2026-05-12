import { Variant } from "@workspace/ui/constants";
import { CSSProperties } from "react";

type GetComponentShadowStyleParams<T extends string> = {
  variant?: Variant;
  size?: T;
};

export const getComponentShadowStyle = <T extends string>({
  variant = "solid",
  size,
}: GetComponentShadowStyleParams<T>): CSSProperties => {
  if (variant !== "elevated") {
    return {
      ["--component-shadow-box" as string]: "none",
    };
  }

  const shadows: Record<string, string> = {
    xxs: `
      0 1px 2px rgb(from var(--component-shadow) r g b / 0.10)
    `,

    xs: `
      0 1px 3px rgb(from var(--component-shadow) r g b / 0.11)
    `,

    sm: `
      0 2px 4px rgb(from var(--component-shadow) r g b / 0.12)
    `,

    md: `
      0 4px 8px rgb(from var(--component-shadow) r g b / 0.14)
    `,

    lg: `
      0 6px 12px rgb(from var(--component-shadow) r g b / 0.16)
    `,

    xl: `
      0 10px 24px rgb(from var(--component-shadow) r g b / 0.18)
    `,
  };

  return {
    ["--component-shadow-box" as string]:
      shadows[size ?? "md"],
  };
};