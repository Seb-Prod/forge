import { TableProps, DEFAULT_PROPS, Column } from "./Table.types";
import { useState } from "react";
import { TableBodyCell, TableHeaderCell } from "./components";
import styles from "./Table.module.css";

type SortDirection = "asc" | "desc" | null;

type SortState = {
  key: string;
  direction: SortDirection;
};

export const Table = (props: TableProps) => {
  const {
    tone,
    size,
    surface,
    grid,
    zebra,
    spacing,
    columns,
    rows,
    rowKey,
    onRowClick,
  } = { ...DEFAULT_PROPS, ...props };

  const [sort, setSort] = useState<SortState>({ key: "", direction: null });

  // ────────────── TRI DES DONNÉES ──────────────
  const handleSort = (key: string) => {
    setSort((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedRows = [...(rows ?? [])].sort((a, b) => {
    if (!sort.direction) return 0;
    const valA = a[sort.key];
    const valB = b[sort.key];

    // Tri intelligent string / number / boolean
    if (typeof valA === "number" && typeof valB === "number") {
      return sort.direction === "asc" ? valA - valB : valB - valA;
    }

    if (typeof valA === "boolean" && typeof valB === "boolean") {
      return sort.direction === "asc"
        ? Number(valA) - Number(valB)
        : Number(valB) - Number(valA);
    }

    return sort.direction === "asc"
      ? String(valA ?? "").localeCompare(String(valB ?? ""))
      : String(valB ?? "").localeCompare(String(valA ?? ""));
  });

  // ────────────── RENDER ──────────────
  return (
    <div
      className={styles.table}
      data-role="table"
      data-tone={tone}
      data-background={surface}
      data-spacing={spacing}
      data-zebra={zebra}
      data-grid={grid}
    >
      <table>
        {/* HEADER */}
        {columns && columns.length > 0 && (
          <thead>
            <tr>
              {columns.map((col) => (
                <TableHeaderCell
                  key={col.key as string}
                  column={col as Column}
                  size={size}
                  sort={sort}
                  onSort={handleSort}
                />
              ))}
            </tr>
          </thead>
        )}

        {/* BODY */}
        {sortedRows.length > 0 ? (
          <tbody>
            {sortedRows.map((row, rowIndex) => (
              <tr
                key={
                  rowKey
                    ? (() => {
                        const val = row[rowKey];
                        if (typeof val === "string" || typeof val === "number")
                          return val;
                        return rowIndex;
                      })()
                    : rowIndex
                }
                onClick={() => onRowClick?.(row)}
                style={{ cursor: onRowClick ? "pointer" : "default" }}
              >
                {columns?.map((col) => (
                  <TableBodyCell
                    size={size}
                    key={col.key as string}
                    value={
                      col.render ? col.render(row[col.key], row) : row[col.key]
                    }
                  />
                ))}
              </tr>
            ))}
          </tbody>
        ) : (
          // EMPTY STATE
          <tbody>
            <tr>
              <td
                colSpan={columns?.length}
                style={{ textAlign: "center", padding: "1rem" }}
              >
                Aucun résultat
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};
