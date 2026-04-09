import {
  BorderSize,
  Shadow,
  Surface,
  Tone,
} from "@workspace/ui/constants";
import { GapValue, MarginValue, PaddingValue, RadiusValue } from "@workspace/ui/helpers";
import { ElementType, ReactNode } from "react";

// 🎨 Constantes
export const GRID_MODE = {
  grid: {
    value: "grid",
    label: "Grid",
    description: "CSS Grid layout",
  },
  flex: {
    value: "flex",
    label: "Flex",
    description: "Flexbox layout",
  },
} as const;

export const GRID_AUTO_FLOW = {
  row: {
    value: "row",
    label: "Row",
    description: "Placement automatique par ligne",
  },
  column: {
    value: "column",
    label: "Column",
    description: "Placement automatique par colonne",
  },
  dense: {
    value: "dense",
    label: "Dense",
    description: "Remplit les trous dans la grille",
  },
  rowDense: {
    value: "row dense",
    label: "Row Dense",
    description: "Par ligne, en remplissant les trous",
  },
  columnDense: {
    value: "column dense",
    label: "Column Dense",
    description: "Par colonne, en remplissant les trous",
  },
} as const;

export const GRID_JUSTIFY = {
  start: {
    value: "start",
    label: "Start",
    description: "Aligne au début de l'axe inline",
  },
  center: {
    value: "center",
    label: "Center",
    description: "Centre sur l'axe inline",
  },
  end: {
    value: "end",
    label: "End",
    description: "Aligne à la fin de l'axe inline",
  },
  stretch: {
    value: "stretch",
    label: "Stretch",
    description: "Étire les items pour remplir la cellule",
  },
  spaceBetween: {
    value: "space-between",
    label: "Space Between",
    description: "Espace égal entre les items",
  },
  spaceAround: {
    value: "space-around",
    label: "Space Around",
    description: "Espace égal autour des items",
  },
  spaceEvenly: {
    value: "space-evenly",
    label: "Space Evenly",
    description: "Espace absolument égal entre tous les items",
  },
} as const;

export const GRID_ALIGN = {
  start: {
    value: "start",
    label: "Start",
    description: "Aligne au début de l'axe block",
  },
  center: {
    value: "center",
    label: "Center",
    description: "Centre sur l'axe block",
  },
  end: {
    value: "end",
    label: "End",
    description: "Aligne à la fin de l'axe block",
  },
  stretch: {
    value: "stretch",
    label: "Stretch",
    description: "Étire les items pour remplir la cellule",
  },
  baseline: {
    value: "baseline",
    label: "Baseline",
    description: "Aligne sur la ligne de base du texte",
  },
} as const;

export const GRID_DIRECTION = {
  row: {
    value: "row",
    label: "Row",
    description: "Axe principal horizontal (gauche → droite)",
  },
  rowReverse: {
    value: "row-reverse",
    label: "Row Reverse",
    description: "Axe principal horizontal inversé",
  },
  column: {
    value: "column",
    label: "Column",
    description: "Axe principal vertical (haut → bas)",
  },
  columnReverse: {
    value: "column-reverse",
    label: "Column Reverse",
    description: "Axe principal vertical inversé",
  },
} as const;

export const GRID_WRAP = {
  wrap: {
    value: "wrap",
    label: "Wrap",
    description: "Passage à la ligne activé",
  },
  nowrap: {
    value: "nowrap",
    label: "No Wrap",
    description: "Pas de passage à la ligne",
  },
  wrapReverse: {
    value: "wrap-reverse",
    label: "Wrap Reverse",
    description: "Passage à la ligne inversé",
  },
} as const;

// 🧠 Types
export type GridMode = keyof typeof GRID_MODE;
export type GridAutoFlow = keyof typeof GRID_AUTO_FLOW;
export type GridJustify = keyof typeof GRID_JUSTIFY;
export type GridAlign = keyof typeof GRID_ALIGN;
export type GridDirection = keyof typeof GRID_DIRECTION;
export type GridWrap = keyof typeof GRID_WRAP;

export interface GridBreakpointOverrides {
  cols?: number | string;
  rows?: number | string;
  gap?: GapValue;
  rowGap?: GapValue;
  colGap?: GapValue;
  justify?: GridJustify;
  align?: GridAlign;
  direction?: GridDirection;
  wrap?: GridWrap;
}

// ⚙️ Props du composant
export interface GridProps {
  // 🎨 UI
  surface?: Surface;
  tone?: Tone;

  // 🏗 Layout
  mode?: GridMode;

  // 📐 Espacement
  padding?: PaddingValue;
  margin?: MarginValue;
  gap?: GapValue;
  rowGap?: GapValue;
  colGap?: GapValue;

  // 📏 Dimensions
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
  minHeight?: string;
  maxHeight?: string;
  minWidth?: string;
  maxWidth?: string;

  // 🔲 CSS Grid
  cols?: number | string;
  rows?: number | string;
  autoRows?: string;
  autoCols?: string;
  autoFlow?: GridAutoFlow;
  minColWidth?: number | string;

  // 💪 Flexbox
  direction?: GridDirection;
  wrap?: GridWrap;

  // ↔️ Alignement
  justify?: GridJustify;
  align?: GridAlign;
  justifyContent?: GridJustify;
  alignContent?: GridAlign;

  // 📱 Responsive
  breakpoints?: {
    sm?: GridBreakpointOverrides;
    md?: GridBreakpointOverrides;
    lg?: GridBreakpointOverrides;
    xl?: GridBreakpointOverrides;
  };

  // 🎨 Apparence
  border?: BorderSize;
  shadow?: Shadow;
  radius?: RadiusValue;

  // 🏷 Contenu
  children?: ReactNode;

  // 🛠 Customisation
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

// 🎯 Valeurs par défaut
export const DEFAULT_PROPS: Partial<GridProps> = {
  mode: "grid",
  cols: 12,
  autoFlow: "row",
  autoRows: "auto",
  justify: "stretch",
  align: "stretch",
  direction: "row",
  wrap: "wrap",
  border: "none",
  radius: "none",
  as: "div",
};