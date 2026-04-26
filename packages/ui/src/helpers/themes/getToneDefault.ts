import { getToneColor } from "@workspace/ui/helpers";
import { Tone } from "@workspace/ui/constants";

export type ComponentTheme = {
  bgIdle: string;
  bg: string;
  colorTextMuted: string;
  colorText: string;
  shadowIdle: string;
  shadowPressed: string;
  shadowActive: string;
};

export const getToneDefault = (tone: Tone = "primary"): ComponentTheme => ({
  bgIdle: getToneColor(tone, 900),
  bg: getToneColor(tone, 700),

  colorTextMuted: getToneColor(tone, 500),
  colorText: getToneColor(tone, 100),

  shadowIdle: `
    inset 0 1px 0 rgba(255,255,255,.05),
    inset 0 -1px 0 rgba(0,0,0,.2),
    0 2px 4px rgba(0,0,0,.25)
  `,

  shadowActive: `
    inset 0 2px 4px rgba(0, 0, 0, 1.25),
    inset 0 -1px 4px rgba(0, 0, 0, 1.25)
  `,

  shadowPressed: `
    inset 0 2px 0 rgba(0, 0, 0, 0.4),
    inset 0 -1px 0 rgba(0, 0, 0, 0.06),
    0 1px 1px rgba(0, 0, 0, 1.10)
  `,
});
