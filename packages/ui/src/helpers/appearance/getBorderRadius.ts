import { RADIUS, Radius } from "@workspace/ui/constants";

/**
 * Valeur de rayon unique ou par coin.
 * @example "md" | { topLeft: "sm", bottomRight: "lg" }
 */
export type RadiusShorthand =
  | Radius
  | {
      topLeft?: Radius;
      topRight?: Radius;
      bottomLeft?: Radius;
      bottomRight?: Radius;
    };

/**
 * Retourne la valeur CSS de `border-radius`.
 * Accepte un rayon uniforme ou des valeurs par coin.
 *
 * @param radius - Rayon uniforme ou objet par coin (`undefined` retourne `undefined`)
 * @returns Valeur CSS ou `undefined`
 */
const resolveRadius = (value?: RadiusShorthand): string | undefined => {
  if (!value) return undefined;
  if (typeof value === "string") return RADIUS[value].value;

  const tl = value.topLeft ? RADIUS[value.topLeft].value : "0px";
  const tr = value.topRight ? RADIUS[value.topRight].value : "0px";
  const br = value.bottomRight ? RADIUS[value.bottomRight].value : "0px";
  const bl = value.bottomLeft ? RADIUS[value.bottomLeft].value : "0px";

  return `${tl} ${tr} ${br} ${bl}`;
};

export const getBorderRadius = (radius?: RadiusShorthand) =>
  resolveRadius(radius);
