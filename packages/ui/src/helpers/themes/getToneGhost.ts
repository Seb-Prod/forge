import { getToneColor } from "@workspace/ui/helpers";
import { Tone } from "@workspace/ui/constants";

export type ComponentTheme = {
  colorBorder: string;
  colorTextMuted: string;
  colorText: string;
  bgSubtle: string;
  colorAccent: string;
};

export const getToneGhost = (
  tone: Tone = "primary"
): ComponentTheme => ({
  colorBorder: getToneColor(tone, 200),

  colorTextMuted: getToneColor(tone, 500),
  colorText: getToneColor(tone, 800),

  bgSubtle: getToneColor(tone, 100),

  colorAccent: getToneColor(tone, 600),
});