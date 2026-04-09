import { useState } from "react";

type UseInputValueParams = {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export function useInputValue({
  value,
  onChange,
  onBlur,
}: UseInputValueParams) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(value ?? "");
  const [showPassword, setShowPassword] = useState(false);
  const currentValue = isControlled ? value : internalValue;

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    const event = {
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>;
    if (!isControlled) setInternalValue("");
    onChange?.(event);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    currentValue,
    hasValue: currentValue !== "",
    showPassword,
    togglePasswordVisibility,
    handleChange,
    handleBlur,
    handleClear,
  };
}
