import { InteractiveProps } from "@workspace/ui/types";
import { getCursor } from "./getCursor";
import { getPointerEvents } from "./getPointerEvents";

/**
 * Génère un objet `CSSProperties` à partir des props interactives.
 * Seules les propriétés définies sont incluses dans le résultat.
 *
 * @param props - Props interactives (cursor, pointerEvents)
 * @returns Objet de styles CSS partiel
 */
export const getInteractiveStyle = (
  props: InteractiveProps,
): React.CSSProperties => {
  return {
    ...(props.cursor !== undefined && { cursor: getCursor(props.cursor) }),
    ...(props.pointerEvents !== undefined && {pointerEvents: getPointerEvents(props.pointerEvents)})
  };
};
