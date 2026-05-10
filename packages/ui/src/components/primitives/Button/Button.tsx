import { ButtonHTMLAttributes, forwardRef, MouseEvent } from "react";
import { ButtonProps, DEFAULT_PROPS } from "./Button.types";
import { useComponentColors } from "@workspace/ui/helpers";
import styles from "./Button.module.css";
import { useButtonStyle } from "./hooks/useButtonStyles";

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">
>((props, ref) => {
  const mergedProps = { ...DEFAULT_PROPS, ...props };

  const buttonStyle = useButtonStyle(mergedProps);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (mergedProps.disabled || mergedProps.loading) {
      e.preventDefault();
      return;
    }
    mergedProps.onClick?.(e);
  };

  return (
    <button ref={ref} onClick={handleClick} style={buttonStyle} className={styles.uiButton}>
      {mergedProps.children}
    </button>
  );
});

Button.displayName = "Button";
