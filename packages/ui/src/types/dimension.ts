/** Props de dimensionnement — acceptent toute valeur CSS valide (`px`, `%`, `rem`…). */
export interface DimensionProps {
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
  minWidth?: React.CSSProperties["minWidth"];
  maxWidth?: React.CSSProperties["maxWidth"];
  minHeight?: React.CSSProperties["minHeight"];
  maxHeight?: React.CSSProperties["maxHeight"];
}