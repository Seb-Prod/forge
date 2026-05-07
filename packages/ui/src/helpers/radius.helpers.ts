import { RADIUS, Radius } from "../constants";

export type RadiusShorthand =
  | Radius
  | {
      topLeft?: Radius;
      topRight?: Radius;
      bottomLeft?: Radius;
      bottomRight?: Radius;
    };

const resolveRadius = (value?: RadiusShorthand): string | undefined => {
  if (!value) return undefined;
  if (typeof value === "string") return RADIUS[value].value;

  const tl = value.topLeft ? RADIUS[value.topLeft].value : "0px";
  const tr = value.topRight ? RADIUS[value.topRight].value : "0px";
  const br = value.bottomRight ? RADIUS[value.bottomRight].value : "0px";
  const bl = value.bottomLeft ? RADIUS[value.bottomLeft].value : "0px";

  return `${tl} ${tr} ${br} ${bl}`;
};

export const getRadius = (radius?: RadiusShorthand) => resolveRadius(radius);
