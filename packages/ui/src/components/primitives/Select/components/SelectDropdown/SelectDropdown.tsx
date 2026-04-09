import { createPortal } from "react-dom";
import { useSelectContext } from "../../Select.context";
import { useSelectPosition } from "./hooks/useSelectPosition";
import { FaSearch } from "react-icons/fa";
import { SelectOption } from "../SelectOption";
import {Input} from "@workspace/ui";
import styles from "./SelectDropdown.module.css";

export function SelectDropdown() {
  const {
    open,
    options,
    setOpen,
    triggerRef,
    dropdownRef,
    tone,
    variant,
    setSearch
  } = useSelectContext();

  const { position, side } = useSelectPosition(open, triggerRef, dropdownRef, setOpen);

  // --- Render ---

  if (!open) return null;

  return createPortal(
    <div
      ref={dropdownRef}
      className={styles.dropdown}
      data-role="select"
      data-tone={tone}
      data-state="open"
      data-side={side}
      style={{
        position: "absolute",
        top:      position.top,
        left:     position.left,
        width:    position.width,
      }}
    >
      {variant === "searchable" && (
        <div className={styles.searchable}>
          <Input startIcon={<FaSearch/>} onChange={(e) =>setSearch(e.target.value)}></Input>
        </div>
      )}

      <div className={styles.options}>
        {options.map((option) => (
          <SelectOption
            key={option.value}
            value={option.value}
            label={option.label}
          />
        ))}
      </div>
    </div>,
    document.body,
  );
}