import { CSSProperties } from "react";
import { ComponentSize } from "@workspace/ui/constants";
import { VariantMotionMap } from "@workspace/ui/types";
import { Variant } from "@workspace/ui/constants";
import { resolveVariantMotion } from "@workspace/ui/styles";

type GetComponentMotionStyleParams = {
  variant?: Variant;
  size?: ComponentSize;
  motions?: VariantMotionMap;
};

export const getComponentMotionStyle = ({
  variant,
  size,
  motions,
}: GetComponentMotionStyleParams): CSSProperties => {
  if (!variant || !size || !motions) return {};

  const variantMotion = motions[variant];
  if (!variantMotion) return {};

  const resolved = resolveVariantMotion(variantMotion, size);

  return {
    "--motion-hover-translate-y":  `${resolved.hover?.translateY  ?? 0}px`,
    "--motion-hover-scale":         resolved.hover?.scale          ?? 1,
    "--motion-hover-opacity":       resolved.hover?.opacity        ?? 1,

    "--motion-active-translate-y": `${resolved.active?.translateY ?? 0}px`,
    "--motion-active-scale":        resolved.active?.scale         ?? 1,
    "--motion-active-opacity":      resolved.active?.opacity       ?? 1,

    "--motion-focus-translate-y":  `${resolved.focus?.translateY  ?? 0}px`,
    "--motion-focus-scale":         resolved.focus?.scale          ?? 1,
    "--motion-focus-opacity":       resolved.focus?.opacity        ?? 1,

    "--motion-disabled-translate-y": `${resolved.disabled?.translateY ?? 0}px`,
    "--motion-disabled-scale":        resolved.disabled?.scale         ?? 1,
    "--motion-disabled-opacity":      resolved.disabled?.opacity       ?? 1,
  } as CSSProperties;
};