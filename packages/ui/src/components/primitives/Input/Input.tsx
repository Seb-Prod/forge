import { forwardRef, useCallback, useId, useState } from "react";
import { DEFAULT_PROPS, InputProps } from "./Input.types";
import { classNames } from "@workspace/ui";

import styles from "./Input.module.css";
import { useInputValue } from "./Input.hooks";

import {
  ClearButton,
  InputIcon,
  InputLabel,
  InputMessage,
  ShowPassword,
} from "./components";

import { MdError } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

/**
 * Composant Input
 *
 * Input réutilisable avec :
 * - label classique ou flottant
 * - icône au début
 * - bouton clear
 * - affichage mot de passe
 * - états error / success
 * - helper text
 *
 * Compatible controlled et uncontrolled
 *
 * @see README.md pour la documentation complète
 */
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  /** Props */
  const {
    tone,
    appearance,
    size,
    labelPosition,
    type,
    required,
    label,
    helperText,
    error,
    startIcon,
    value,
    onChange,
    onBlur,
    placeholder,
    valid,
    disabled,
    className,
    ...rest
  } = { ...DEFAULT_PROPS, ...props };

  /** Hook de gestion de valeur */

  const {
    currentValue,
    hasValue,
    handleChange,
    handleClear,
    handleBlur,
    togglePasswordVisibility,
    showPassword,
  } = useInputValue({
    value,
    onChange,
    onBlur,
  });

  /** State */

  const id = useId();
  const [focused, setFocused] = useState(false);
  const handleFocus = useCallback(() => setFocused(true), []);

  /** Derived state */

  const isFloatingLabel = labelPosition === "floating";
  const status = error ? "error" : valid ? "success" : "default";
  const inputType = type === "password" && showPassword ? "text" : type;
  const icon = error ? <MdError /> : valid ? <FaCheck /> : null;
  const showClearButton = type !== "password" && focused && hasValue;
  const showPasswordToggle = type === "password";
  const showMessage = error || focused;
  const validationIcon =
    !focused && icon ? <InputIcon type="endIcon">{icon}</InputIcon> : null;

  /** Label */

  const labelElement = label && (
    <InputLabel
      label={label}
      required={required}
      isFloating={isFloatingLabel}
      htmlFor={id}
      size={size}
      leftIcon={!!startIcon}
      disabled={disabled}
    />
  );

  /** Render */

  return (
    <div
      className={classNames(styles.root, className)}
      data-role="input"
      data-tone={
        status === "error" ? "danger" : status === "success" ? "success" : tone
      }
      data-appearance={appearance}
      data-size={size}
      data-focused={focused}
      data-has-value={hasValue}
      data-label-position={labelPosition}
    >
      {/* Label au-dessus */}
      {!isFloatingLabel && labelElement}

      <div className={styles.inputWrapper}>
        <div className={styles.inputInner}>
          {/* Icône gauche */}
          {startIcon && <InputIcon>{startIcon}</InputIcon>}

          {/* Champ input */}
          <input
            id={id}
            ref={ref}
            type={inputType}
            value={currentValue}
            placeholder={isFloatingLabel ? " " : placeholder || ""}
            className={classNames(
              styles.input,
              startIcon ? styles.withLeftIcon : "",
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            required={required}
            aria-invalid={!!error}
            aria-describedby={helperText ? `${id}-message` : undefined}
            disabled={disabled}
            {...rest}
          />

          {/* Label flottant */}
          {isFloatingLabel && labelElement}

          {/* Password toggle */}
          {showPasswordToggle && (
            <ShowPassword
              showPassword={showPassword}
              onClick={togglePasswordVisibility}
            />
          )}

          {/* Clear button */}
          {showClearButton && <ClearButton onClick={handleClear} visible />}

          {/* Icône validation */}
          {validationIcon}
        </div>
      </div>

      {/* Message helper ou erreur */}
      {helperText && showMessage && (
        <InputMessage
          id={`${id}-message`}
          message={helperText}
          type={error ? "error" : "info"}
        />
      )}
    </div>
  );
});

Input.displayName = "Input";
