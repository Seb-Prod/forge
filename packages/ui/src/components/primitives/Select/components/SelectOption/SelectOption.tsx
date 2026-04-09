import { useSelectContext } from "../../Select.context";
import { FaCheck } from "react-icons/fa";
import styles from "./SelectOption.module.css";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type SelectOptionProps = {
  value: string;
  label: string;
};

// ─────────────────────────────────────────────
// Composant
// ─────────────────────────────────────────────

export function SelectOption({ value, label }: SelectOptionProps) {
  const { value: selected, setValue, setOpen, size } = useSelectContext();

  const isSelected = selected?.value === value;

  // --- Handlers ---

  const handleClick = () => {
    setValue({ value, label });
    setOpen(false);
  };

  // --- Render ---

  return (
    <button
      className={styles.option}
      data-role="select"
      data-selected={isSelected}
      data-size={size}
      onClick={handleClick}
    >
      {isSelected && <FaCheck className={styles.icon} />}
      <span className={styles.label}>{label}</span>
    </button>
  );
}