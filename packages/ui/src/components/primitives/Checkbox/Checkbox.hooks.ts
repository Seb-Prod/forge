import { useControllableState } from "@workspace/ui/hooks";
import { useEffect, useState } from "react";

type UseCheckboxProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.RefObject<HTMLInputElement>;
};

export function useCheckbox({
  checked,
  defaultChecked = false,
  indeterminate,
  onChange,
  ref,
}: UseCheckboxProps) {
  const [resolvedChecked, setChecked] = useControllableState({
    value: checked,
    defaultValue: defaultChecked,
  });

  const resolvedIndeterminate = Boolean(indeterminate);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    onChange?.(e);
  };

  useEffect(() => {
    if (ref?.current) {
      ref.current.indeterminate = Boolean(resolvedIndeterminate);
    }
  }, [ref, resolvedIndeterminate]);

  return {
    checked: resolvedChecked,
    resolvedIndeterminate,
    handleChange,
  };
}
