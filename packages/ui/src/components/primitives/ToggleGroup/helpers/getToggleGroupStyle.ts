import { getToneTheme, mapThemeToCssVars } from "@workspace/ui/helpers";
import { ToggleGroupProps } from "../ToggleGroup.types";

type ToggleGroupStyleProps = Pick<
  ToggleGroupProps<string>,
  "tone" | "size" | "variant" | "style"
>;

export const getToggleGroupeStyle = (
  props: ToggleGroupStyleProps,
): React.CSSProperties => {
  const theme = getToneTheme(
    props.tone ?? "primary",
    props.variant ?? "default",
  );

  return {
    ...mapThemeToCssVars(theme, "tg"),

    // 📏 Rayon
    "--tg-radius-container": "10px",
    "--tg-radius-button": "8px",

    // 📐 Taille
    "--tg-font-size": "14px",
    "--tg-padding-x": "14px",
    "--tg-padding-y": "8px",

    ...props.style,
  } as React.CSSProperties;
};
