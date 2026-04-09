import { useState } from "react";

type UseControllableStateProps<T> = {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
};

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateProps<T>) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = value !== undefined;
  const resolvedValue = isControlled ? value : internalValue;

  const setValue = (next: T) => {
    if (!isControlled) {
      setInternalValue(next);
    }
    onChange?.(next);
  };

  return [resolvedValue, setValue] as const;
}