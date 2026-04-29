import { Tone } from "@workspace/ui/constants";
import { getToneColor } from "../getToneColor";

export type ComponentTheme = {
  bgDefault:  string;
  bgHover:    string;
  bgPressed:  string;
  bgSelected: string;
  text:       string;
  textMuted:  string;
};

export const getToneSegment = (tone: Tone = "primary"): ComponentTheme => ({
  bgDefault: getToneColor(tone, 900),
  bgHover: getToneColor(tone, 800),
  bgPressed: getToneColor(tone, 700),
  bgSelected: getToneColor(tone, 600),
  text: getToneColor(tone, 300),
  textMuted: getToneColor(tone, 200),
});