import { LayoutProps } from "@workspace/ui/types";
import { getFlex } from "./getFlex";
import { getFlexDirection } from "./getFlexDirection";
import { getFlexWrap } from "./getFlexWrap";
import { getAlignItems } from "./getAlignItems";
import { getJustifyContent } from "./getJustifyContent";
import { getPosition } from "./getPosition";
import { getZIndex } from "./getZIndex";
import { getOverflow } from "./getOverflow";

/**
 * Génère un objet `CSSProperties` à partir des props de layout.
 * Les props flex ne sont appliquées que si `display` est `"flex"` ou `"inline-flex"`.
 * Seules les propriétés définies sont incluses dans le résultat.
 *
 * @param props - Props de layout (display, flex, position, overflow…)
 * @returns Objet de styles CSS partiel
 */
export const getLayoutStyle = (props: LayoutProps): React.CSSProperties => {
  const isFlex = props.display === "flex" || props.display === "inline-flex";

  return {
    ...(props.display !== undefined && { display: props.display }),

    ...(isFlex && props.flex !== undefined && { flex: getFlex(props.flex) }),
    ...(isFlex && props.flexDirection !== undefined && { flexDirection: getFlexDirection(props.flexDirection) }),
    ...(isFlex && props.flexWrap !== undefined && { flexWrap: getFlexWrap(props.flexWrap) }),
    ...(isFlex && props.alignItems !== undefined && { alignItems: getAlignItems(props.alignItems) }),
    ...(isFlex && props.justifyContent !== undefined && { justifyContent: getJustifyContent(props.justifyContent) }),

    ...(props.position !== undefined && { position: getPosition(props.position) }),
    ...(props.zIndex !== undefined && { zIndex: getZIndex(props.zIndex) }),
    ...getOverflow(props.overflow),
  };
};
