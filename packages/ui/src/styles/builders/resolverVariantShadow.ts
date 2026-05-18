import { ComponentSize } from "@workspace/ui/constants";
import {
  ResolvedShadowState,
  ResolvedVariantShadow,
  ShadowAmplitude,
  ShadowLayer,
  ShadowStateIntent,
  VariantShadowTokens,
} from "@workspace/ui/types";
import { SHADOW_AMPLITUDE_BY_SIZE } from "../tokens/shadowAmplitude.tokens";

// ---------------------------------------------------------------------------
// Internal
// ---------------------------------------------------------------------------

const resolveShadowState = (
  intent: ShadowStateIntent,
  amplitude: ShadowAmplitude,
): ResolvedShadowState => {
  if (intent.shadow === "none")
    return { offsetY: 0, blur: 0, spread: 0, opacity: 0 };
  return amplitude[intent.shadow];
};

// ---------------------------------------------------------------------------
// Public
// ---------------------------------------------------------------------------

/**
 * Convertit une couche de shadow en string CSS `box-shadow`.
 * Utilisée par le variant `3d` pour ses shadows multicouches.
 */
export const toBoxShadowLayer = (layer: ShadowLayer): string => {
  const color =
    layer.opacity !== null
      ? `rgb(from var(--component-${layer.colorVar}) r g b / ${layer.opacity})`
      : `var(--component-${layer.colorVar})`;

  return `0 ${layer.offsetY}px ${layer.blur}px ${layer.spread}px ${color}`;
};

/**
 * Résout un tableau de couches en string `box-shadow` finale.
 * Retourne `"none"` si le tableau est vide (ex: état disabled du 3d).
 */
export const resolveLayeredShadow = (layers: ShadowLayer[]): string =>
  layers.length === 0 ? "none" : layers.map(toBoxShadowLayer).join(", ");

/**
 * Résout les intents de shadow d'un variant en valeurs concrètes
 * pour une taille donnée.
 */
export const resolveVariantShadow = (
  variantShadow: VariantShadowTokens,
  size: ComponentSize,
): ResolvedVariantShadow => {
  const amplitude = SHADOW_AMPLITUDE_BY_SIZE[size];

  return {
    default:  variantShadow.default  ? resolveShadowState(variantShadow.default,  amplitude) : undefined,
    hover:    variantShadow.hover    ? resolveShadowState(variantShadow.hover,    amplitude) : undefined,
    active:   variantShadow.active   ? resolveShadowState(variantShadow.active,   amplitude) : undefined,
    focus:    variantShadow.focus    ? resolveShadowState(variantShadow.focus,     amplitude) : undefined,
    disabled: variantShadow.disabled ? resolveShadowState(variantShadow.disabled, amplitude) : undefined,
  };
};