import { getToneColor } from "@workspace/ui/helpers";
import { Tone } from "@workspace/ui/constants";

export type ComponentTheme = {
  colorTextMuted:string;
  colorText:string;
  bgHover:string;
  colorTextHover:string;
  bg: string;
};

export const getToneOutline = (tone: Tone = "primary"): ComponentTheme => ({
  colorTextMuted: getToneColor(tone, 600),

  bg: getToneColor(tone, 500),
  colorText: getToneColor(tone,900),

  bgHover: getToneColor(tone,200),
  colorTextHover:getToneColor(tone,800)
});