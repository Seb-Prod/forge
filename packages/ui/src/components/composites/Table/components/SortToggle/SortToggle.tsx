import { FaFilter, FaCaretDown, FaCaretUp } from "react-icons/fa";
import styles from "./SortToggle.module.css";
import { SortState } from "../../Table.types";



interface SortToggleProps {
  columnKey: string;
  sortable?: boolean;
  sort: SortState;
  onSort: (key: string) => void;
}

export const SortToggle = ({
  columnKey,
  sortable = false,
  sort,
  onSort,
}: SortToggleProps) => {
  if (!sortable) return null;

  const isActive = sort.key === columnKey;

  const renderIcon = () => {
    if (!isActive) return <FaFilter />;

    if (sort.direction === "asc") return <FaCaretUp />;

    if (sort.direction === "desc") return <FaCaretDown />;

    return <FaFilter />;
  };

  return (
    <button
      className={styles.sortToggle}
      onClick={(e) => {
        e.stopPropagation();
        onSort(columnKey);
      }}
    >
      {renderIcon()}
    </button>
  );
};