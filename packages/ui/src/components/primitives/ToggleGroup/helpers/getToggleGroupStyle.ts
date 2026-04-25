import { getSurfaceBackground } from "@workspace/ui/helpers";
import { ToggleGroupProps } from "../ToggleGroup.types";

type ToggleGroupStyleProps = Pick<
  ToggleGroupProps<string>,
  "tone" | "size" | "variant" | "style"
>;

export const getToggleGroupeStyle = (
  props: ToggleGroupStyleProps,
): React.CSSProperties =>
  ({
    "--background": getSurfaceBackground("overlay", props.tone),
    "--backgroundActive": getSurfaceBackground("raised", props.tone),
    ...props.style,
  }) as React.CSSProperties;
