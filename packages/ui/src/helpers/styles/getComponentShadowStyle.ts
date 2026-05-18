import { CSSProperties } from "react";
import { ComponentSize, Variant } from "@workspace/ui/constants";
import { ResolvedShadowState, VariantShadowMap } from "@workspace/ui/types";
import { resolveLayeredShadow, resolveVariantShadow, SHADOW_3D_AMPLITUDE_BY_SIZE } from "@workspace/ui/styles";

const toBoxShadow = (s: ResolvedShadowState): string =>
  `0 ${s.offsetY}px ${s.blur}px ${s.spread}px rgb(from var(--component-shadow) r g b / ${s.opacity})`;

type GetComponentShadowStyleParams = {
  variant?: Variant;
  size?: ComponentSize;
  shadows?: VariantShadowMap;
};


export const getComponentShadowStyle = ({
  variant,
  size,
  shadows,
}: GetComponentShadowStyleParams): CSSProperties => {
  if (!variant || !size || !shadows) return {};

  // Cas 3d : résolution par couches directement depuis l'amplitude
  if (variant === "3d") {
    const amplitude = SHADOW_3D_AMPLITUDE_BY_SIZE[size as ComponentSize];
    return {
      "--component-shadow-box":          resolveLayeredShadow(amplitude.default),
      "--component-shadow-box-hover":    resolveLayeredShadow(amplitude.hover),
      "--component-shadow-box-active":   resolveLayeredShadow(amplitude.active),
      "--component-shadow-box-disabled": resolveLayeredShadow(amplitude.disabled),
    } as CSSProperties;
  }

  // Cas standard
  const variantShadow = shadows[variant];
  if (!variantShadow) return {};

  const resolved = resolveVariantShadow(variantShadow, size as ComponentSize);

  return {
    "--component-shadow-box":          resolved.default  ? toBoxShadow(resolved.default)  : "none",
    "--component-shadow-box-hover":    resolved.hover    ? toBoxShadow(resolved.hover)    : "none",
    "--component-shadow-box-active":   resolved.active   ? toBoxShadow(resolved.active)   : "none",
    "--component-shadow-box-focus":    resolved.focus    ? toBoxShadow(resolved.focus)    : "none",
    "--component-shadow-box-disabled": resolved.disabled ? toBoxShadow(resolved.disabled) : "none",
  } as CSSProperties;
};