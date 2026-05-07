import {
  AlignItems,
  Display,
  Flex,
  FlexDirection,
  FlexWrap,
  JustifyContent,
  Overflow,
  Position,
} from "../constants";

/** Props de mise en page — flexbox, positionnement et empilement. */
export interface LayoutProps {
  /** Token {@link Flex} ou valeur CSS libre (`1`, `"1 1 auto"`…). */
  display?: Display;
  flex?: Flex | React.CSSProperties["flex"];
  flexDirection?: FlexDirection;
  flexWrap?: FlexWrap;
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  position?: Position;
  overflow?: Overflow;
  zIndex?: number;
}
