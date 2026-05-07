import type { CSSProperties } from "react";
import { SpacingProps } from "@workspace/ui/types";
import { AxisSpacing, SPACINGS, Spacing } from "../../constants";

/** Retourne la valeur CSS d'une clé d'espacement, ou `"0px"` si absente. */
const getSpacingValue = (key?: Spacing): string => {
  if (!key) return "0px";
  return SPACINGS[key]?.value ?? "0px";
};

/**
 * Résout une valeur d'espacement en raccourci CSS `top right bottom left`.
 * Accepte une clé simple ou un objet avec des axes (`x`, `y`) et/ou des côtés (`top`, `right`, `bottom`, `left`).
 * Les côtés spécifiques ont priorité sur les axes.
 */
const resolveSpacing = (value?: AxisSpacing<Spacing>): string | undefined => {
  if (!value) return undefined;

  if (typeof value === "string") {
    return getSpacingValue(value);
  }

  // Raccourci CSS : top | right | bottom | left
  const top    = getSpacingValue(value.top    ?? value.y);
  const bottom = getSpacingValue(value.bottom ?? value.y);
  const left   = getSpacingValue(value.left   ?? value.x);
  const right  = getSpacingValue(value.right  ?? value.x);

  return `${top} ${right} ${bottom} ${left}`;
};

export const getPadding = resolveSpacing;
export const getMargin = resolveSpacing;

/** Retourne la valeur CSS d'un espacement de type `gap`, ou `undefined` si absent. */
export const getGap = (spacing?: Spacing): string | undefined =>
  spacing ? getSpacingValue(spacing) : undefined;

/**
 * Génère un objet `CSSProperties` à partir des props d'espacement.
 * Seules les propriétés définies sont incluses dans le résultat.
 */
export const getSpacingStyle = (props: SpacingProps): CSSProperties => {
  const padding = getPadding(props.padding);
  const margin = getMargin(props.margin);
  const gap = getGap(props.gap);

  return {
    ...(padding && { padding }),
    ...(margin && { margin }),
    ...(gap && { gap }),
  };
};