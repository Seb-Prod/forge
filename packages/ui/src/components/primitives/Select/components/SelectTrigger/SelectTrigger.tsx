import { useSelectContext } from "../../Select.context";
import { FaChevronDown } from "react-icons/fa";
import { Text } from "@workspace/ui";
import styles from "./SelectTrigger.module.css";
import { useSelectTrigger } from "./hooks/useSelectTrigger";

interface SelectTriggerProps {
  id?: string;
}

export function SelectTrigger({ id }: SelectTriggerProps) {
  const { open, value, triggerRef, tone, appearance, size, placeholder } =
    useSelectContext();

  // --- Derived values ---

  const displayValue = value?.label ?? placeholder ?? "Sélectionner...";

  // --- Handlers ---

  const { handleKeyDown, toggleOpen } = useSelectTrigger();

  // --- Render ---

  return (
    <div ref={triggerRef} className={styles.wrapper}>
      <button
        id={id}
        type="button"
        className={styles.trigger}
        data-role="select"
        data-tone={tone}
        data-appearance={appearance}
        data-size={size}
        data-state={open ? "open" : "closed"}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
      >
        <Text>{displayValue}</Text>
        <FaChevronDown className={open ? styles.open : ""} aria-hidden="true" />
      </button>
    </div>
  );
}
