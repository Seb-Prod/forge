import { forwardRef, ButtonHTMLAttributes } from "react";
import { classNames } from "@workspace/ui";
import styles from "./Button.module.css";
import { ButtonContent } from "./components/ButtonContent/ButtonContent";
import { useAction } from "./Button.hooks";
import {
  renderButtonIcon,
  getButtonAriaLabel,
} from "./components/ButtonBase/ButtonBase";
import { ButtonProps, DEFAULT_PROPS } from "./Button.types";

/**
 * Composant bouton interactif et accessible.
 *
 * @see README.md pour la documentation complète
 */
export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">
>((props, ref) => {
  const {
    children,
    icon,
    startIcon,
    endIcon,
    iconOnly,
    tone,
    appearance,
    animation,
    size,
    fullWidth,
    type,
    disabled,
    loading,
    loadingText,
    className,
    onClick,
    "aria-label": ariaLabel,
    ...rest
  } = { ...DEFAULT_PROPS, ...props };

  const { finalAnimation, handleClick } = useAction({
    appearance,
    animation,
    loading,
    onClick,
  });

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-label={getButtonAriaLabel(loading, loadingText, ariaLabel)}
      aria-busy={loading}
      onClick={handleClick}
      className={classNames(styles.button, className)}
      data-role="button"
      data-tone={tone}
      data-appearance={appearance}
      data-animation={finalAnimation}
      data-size={size}
      data-full-width={fullWidth || undefined}
      data-icon-only={iconOnly || undefined}
      data-loading={loading || undefined}
      {...rest}
    >
      <ButtonContent loading={loading} loadingText={loadingText}>
        {renderButtonIcon(iconOnly, icon, startIcon, endIcon, children)}
      </ButtonContent>
    </button>
  );
});

Button.displayName = "Button";
