import { BoxOverflow } from "../Box.types";

const OVERFLOW_STYLES: Record<BoxOverflow, React.CSSProperties> = {
  none: {},
  x: { overflowX: "auto", overflowY: "hidden" },
  y: { overflowY: "auto", overflowX: "hidden" },
  both: { overflow: "auto" },
  hidden: { overflow: "hidden" },
};

export const getOverflow = (
  overflow: BoxOverflow = "none",
): React.CSSProperties => OVERFLOW_STYLES[overflow];