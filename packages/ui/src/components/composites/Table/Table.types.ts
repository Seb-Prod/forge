import { Size, Tone, Surface } from "@workspace/ui/constants";
import { ReactNode } from "react";

// ─────────────────────────────────────────────
// 🧩 TABLE CONFIG (constantes métier)
// ─────────────────────────────────────────────

export const TABLE_NAMES = {
  primary: {
    value: "primary",
    label: "Primary",
    description: "La description",
  },
} as const;

// ─────────────────────────────────────────────
// 🧠 TYPES DE BASE
// ─────────────────────────────────────────────

export type TableName = keyof typeof TABLE_NAMES;

export type SortDirection = "asc" | "desc" | null;

export interface SortState {
  key: string;
  direction: SortDirection;
}

export type Column<T = any> = {
  label: string;
  key: string;
  sortable?: boolean;
  render?: (value: any, row: T) => ReactNode;
};

export type Row = Record<string, unknown>;

// ─────────────────────────────────────────────
// ⚙️ PROPS DU COMPOSANT
// ─────────────────────────────────────────────

/**
 * Props du composant Table
 *
 * @see README.md pour la documentation complète
 */
export interface TableProps {
  // 🎨 UI
  surface?: Surface;
  tone?: Tone;
  size?: Size;

  // 📊 Data
  columns?: Column[];
  rows?: Row[];

  // 🎛️ Options d'affichage
  grid?: boolean;
  zebra?: boolean;

  // 🚀 (future-proof)
  spacing?: boolean;

  rowKey?: string; 
  onRowClick?: (row: any) => void
}

// ─────────────────────────────────────────────
// 🎯 DEFAULTS
// ─────────────────────────────────────────────

export const DEFAULT_PROPS: Required<
  Pick<TableProps, "tone" | "size" | "columns" | "zebra" | "grid" | "spacing">
> = {
  tone: "primary",
  size: "md",
  columns: [],
  zebra: true,
  grid: false,
  spacing: false,
};