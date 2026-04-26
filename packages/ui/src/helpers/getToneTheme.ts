import { Tone, Variant } from "../constants";
import { getToneDefault } from "./themes/getToneDefault";
import { getToneGhost } from "./themes/getToneGhost";
import { getToneOutline } from "./themes/getToneOutline";
import { getToneSegment } from "./themes/getToneSegment";

export const getToneTheme = (
  tone: Tone,
  variant: Variant
) => {
  switch (variant) {
    case "segment":
        return getToneSegment(tone);

    case "ghost":
      return getToneGhost(tone);

    case "outline":
      return getToneOutline(tone);

    default:
      return getToneDefault(tone);
  }
};