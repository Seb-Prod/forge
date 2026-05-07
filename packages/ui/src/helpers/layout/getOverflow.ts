import { Overflow } from "@workspace/ui/constants";

/**
 * Retourne les styles CSS correspondant à la valeur d'overflow.
 *
 * @param overflow - Valeur d'overflow (`"none"` par défaut)
 * @returns Objet de styles CSS partiel
 */
const OVERFLOW_STYLES: Record<Overflow, React.CSSProperties> = {
  none: {},
  x: { overflowX: "auto", overflowY: "hidden" },
  y: { overflowY: "auto", overflowX: "hidden" },
  both: { overflow: "auto" },
  hidden: { overflow: "hidden" },
};

export const getOverflow = (overflow: Overflow = "none"): React.CSSProperties =>
  OVERFLOW_STYLES[overflow];
