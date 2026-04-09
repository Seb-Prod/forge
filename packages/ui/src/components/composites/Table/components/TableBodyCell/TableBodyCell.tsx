import { ReactNode, isValidElement } from "react";
import { Text } from "@workspace/ui/components";
import styles from "./TableBodyCell.module.css";
import { Size } from "@workspace/ui/constants";

interface TableBodyCellProps {
  value: unknown;
  size?: Size;
}

const toReactNode = (value: unknown): ReactNode => {
  if (typeof value === "boolean") {
    return value ? "true" : "false";
    
  }

  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {
    return value;
  }

  return null;
};

export const TableBodyCell = ({ value, size }: TableBodyCellProps) => {
  return (
    <td className={styles.td}>
      <div className={styles.inner}>
        {isValidElement(value) ? (
          value
        ) : (
          <Text size={size}>{toReactNode(value) ?? "-"}</Text>
        )}
      </div>
    </td>
  );
};