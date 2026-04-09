import { forwardRef, useId, useRef } from "react";
import { CheckboxProps, DEFAULT_PROPS } from "./Checkbox.types";
import { Text } from "@workspace/ui/components";
import React from "react";
import styles from "./Checkbox.module.css";
import { useCheckbox } from "./Checkbox.hooks";

/**
 * Composant Checkbox
 *
 * Checkbox réutilisable avec :
 * - label optionnel
 * - support des icônes personnalisées (checked / unchecked / indeterminate)
 * - état indeterminate (tri-state)
 * - gestion controlled et uncontrolled
 * - styles via tone / size / appearance
 *
 * Permet d'utiliser :
 * - un état contrôlé via `checked`
 * - un état non contrôlé avec gestion interne
 *
 * L'état `indeterminate` est appliqué directement sur l'élément
 * HTMLInputElement via la propriété DOM `indeterminate`.
 *
 * @see README.md pour la documentation complète
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const {
      tone,
      label,
      labelClassName,
      checked,
      indeterminate,
      onChange,
      size,
      appearance,
      iconChecked,
      iconUnchecked,
      iconIndeterminate,
      ...rest
    } = {
      ...DEFAULT_PROPS,
      ...props,
    };

    const id = useId();

    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref ?? internalRef) as React.RefObject<HTMLInputElement>;

    const {
      checked: resolvedChecked,
      resolvedIndeterminate,
      handleChange,
    } = useCheckbox({
      checked,
      indeterminate,
      onChange,
      ref: inputRef,
    });

    return (
      <label
        className={styles.checkbox}
        data-role="checkbox"
        data-tone={tone}
        data-appearance={appearance}
        data-size={size}
      >
        <input
          id={id}
          ref={ref}
          type="checkbox"
          checked={resolvedChecked}
          onChange={handleChange}
          className={styles.input}
          {...rest}
        />

        <span className={styles.control}>
          <Text as="span" size={size} align="center">
            {resolvedIndeterminate
              ? (iconIndeterminate ?? "-")
              : resolvedChecked
                ? (iconChecked ?? "x")
                : (iconUnchecked ?? "")}
          </Text>
        </span>

        {label && (
          <Text as="label" size={size} htmlFor={id} className={labelClassName}>
            {label}
          </Text>
        )}
      </label>
    );
  },
);
