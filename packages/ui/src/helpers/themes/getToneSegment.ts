import { getToneColor } from "@workspace/ui/helpers";
import { Tone } from "@workspace/ui/constants";

export type ComponentTheme = {
  bgSubtle: string;
  colorTextMuted: string;
  colorText: string;
  colorAccent: string;
  colorOnAccent: string;
};

export const getToneSegment = (
  tone: Tone = "primary"
): ComponentTheme => ({
  bgSubtle: getToneColor(tone, 100),

  colorTextMuted: getToneColor(tone, 500),
  colorText: getToneColor(tone, 800),

  colorAccent: getToneColor(tone, 600),
  colorOnAccent: getToneColor(tone, 50),
});