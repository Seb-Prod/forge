import { Size } from "@workspace/ui/constants";
import { Column, SortState } from "../../Table.types";
import { SortToggle } from "../SortToggle";
import { Text } from "@workspace/ui/components";
import styles from "./TableHeaderCell.module.css";

interface TableHeaderCellProps {
  column: Column;
  size: Size;
  sort: SortState;
  onSort: (key: string) => void;
}

export const TableHeaderCell = ({
  column,
  size,
  sort,
  onSort,
}: TableHeaderCellProps) => {
  return (
    <th className={styles.th}>
      <div className={styles.inner}>
        <Text size={size} className={styles.text}>
          {column.label}
        </Text>

        <SortToggle
          columnKey={column.key}
          sortable={column.sortable}
          sort={sort}
          onSort={onSort}
        />
      </div>
    </th>
  );
};
