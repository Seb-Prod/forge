import { Button } from "@workspace/ui";
import { ReactNode } from "react";

type ToggleGroupOption<T extends string> = {
  value: T;
  icon?: ReactNode;
  label?: string;
  ariaLabel?: string;
};

type ToggleGroupProps<T extends string> = {
  value: T;
  onChange: (value: T) => void;
  options: ToggleGroupOption<T>[];
};

export const ToggleGroup = <T extends string>({
  value,
  onChange,
  options,
}: ToggleGroupProps<T>) => {
  return (
    <div role="group" style={{display: "flex"}}>
      {options.map((option) => (
        <Button
          key={option.value}
          aria-label={option.ariaLabel ?? option.label}
          aria-pressed={value === option.value}
          appearance={value === option.value ? "filled" : "ghost"}
          onClick={() => onChange(option.value)}
        >
          {option.icon}
          {option.label}
        </Button>
      ))}
    </div>
  );
};