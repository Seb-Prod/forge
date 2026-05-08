import { ButtonHTMLAttributes, forwardRef, MouseEvent } from "react";
import { ButtonProps, DEFAULT_PROPS } from "./Button.types";
import { useComponentColors } from "@workspace/ui/helpers";
import styles from "./Button.module.css";

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">
>((props, ref) => {
  const mergedProps = { ...DEFAULT_PROPS, ...props };

  const vars = useComponentColors({
    tone: mergedProps.tone,
    variant:mergedProps.variant,
  });

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (mergedProps.disabled || mergedProps.loading) {
      e.preventDefault();
      return;
    }
    mergedProps.onClick?.(e);
  };

  return (
    <button ref={ref} onClick={handleClick} style={vars} className={styles.uiButton}>
      {mergedProps.children}
    </button>
  );
});

Button.displayName = "Button";
