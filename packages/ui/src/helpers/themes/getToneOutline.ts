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

export const getToneOutline = (tone: Tone = "primary"): ComponentTheme => ({
  bgDefault: "transparent",
  bgHover: getToneColor(tone, 900),
  bgPressed: getToneColor(tone, 800),
  bgSelected: getToneColor(tone, 700),
  text: getToneColor(tone, 300),
  textMuted: getToneColor(tone, 200),
});