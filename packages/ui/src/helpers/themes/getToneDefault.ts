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

export const getToneDefault = (tone: Tone = "primary"): ComponentTheme => ({
  bgDefault:  getToneColor(tone, 600),
  bgHover:    getToneColor(tone, 500),
  bgPressed:  getToneColor(tone, 700),
  bgSelected: getToneColor(tone, 800),
  text:       getToneColor(tone, 50),
  textMuted:  getToneColor(tone, 200),
});