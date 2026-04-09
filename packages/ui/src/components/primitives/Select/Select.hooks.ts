import { useState, useMemo, useRef, useEffect } from "react";
import {
  SelectAppearance,
  SelectContextType,
  SelectOption,
  SelectSize,
  SelectTone,
  SelectVariant,
} from "./Select.types";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type UseSelectParams = {
  options: SelectOption[];
  value?: string;
  onSelect?: (value: string) => void;
  tone: SelectTone;
  appearance: SelectAppearance;
  size: SelectSize;
  variant: SelectVariant;
  placeholder?: string;
};

// ─────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────

export function useSelect({
  options,
  value: controlledValue,
  onSelect,
  tone,
  appearance,
  size,
  variant,
  placeholder,
}: UseSelectParams): SelectContextType {
  // --- Refs ---
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // --- État ---
  const [open, setOpen] = useState<boolean>(false);
  const [internalValue, setInternalValue] = useState<SelectOption | null>(null);
  const [search, setSearch] = useState<string>("");
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

  // --- Valeur sélectionnée ---
  const selectedValue = useMemo(() => {
    if (controlledValue)
      return options.find((o) => o.value === controlledValue) ?? null;
    return internalValue;
  }, [controlledValue, options, internalValue]);

  // --- Options filtrées ---
  const filteredOptions = useMemo(() => {
    if (!search) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [options, search]);

  // --- Actions ---
  const setValue = (option: SelectOption | null) => {
    setInternalValue(option);
    if (option) onSelect?.(option.value);
  };

  const clear = () => {
    setInternalValue(null);
    setSearch("");
    onSelect?.("");
  };

  // --- Effets ---

  /** Ferme le dropdown au clic extérieur */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      const isOutsideDropdown = !dropdownRef.current?.contains(target);
      const isOutsideTrigger = !triggerRef.current?.contains(target);

      if (isOutsideDropdown && isOutsideTrigger) setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /** Réinitialise la navigation au changement de recherche */
  useEffect(() => {
    setHighlightedIndex(0);
  }, [search]);

  /** Réinitialise la navigation à l'ouverture */
  useEffect(() => {
    if (open) setHighlightedIndex(0);
  }, [open]);

  // --- Retour ---
  return {
    triggerRef,
    dropdownRef,
    open,
    setOpen,
    value: selectedValue,
    setValue,
    clear,
    search,
    setSearch,
    options: filteredOptions,
    highlightedIndex,
    setHighlightedIndex,
    tone,
    appearance,
    size,
    variant,
    placeholder,
  };
}
