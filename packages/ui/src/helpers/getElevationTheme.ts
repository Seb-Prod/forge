import { Variant } from "../constants";
import { getElevationEffect, getGhostElevationEffect, getOutlineElevationEffect, getSegmentElevationEffect } from "./themes/getElevationEffect";


export const getElevationTheme = (variant: Variant) => {
  switch (variant) {
    case "segment":
      return getSegmentElevationEffect();

    case "ghost":
      return getGhostElevationEffect();

    case "outline":
      return getOutlineElevationEffect();

    default:
      return getElevationEffect();
  }
};