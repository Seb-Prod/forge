import { forwardRef, InputHTMLAttributes, ReactNode, useId } from "react";
import styles from "./Switch.module.css";
import { classNames } from "../../../functions/classNames";

/**
 * Composant Switch (toggle) accessible.
 * 
 * @example
 * ```tsx
 * const [enabled, setEnabled] = useState(false);
 * <Switch checked={enabled} onChange={setEnabled}>
 *   Activer les notifications
 * </Switch>
 * ```
 */
export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "className" | "size" | "onChange"
> {
  /** Variante visuelle (défaut: "primary") */
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info";

  /** Apparence du switch (défaut: "filled") */
  appearance?: "filled" | "outline";

  /** Taille du switch (défaut: "md") */
  size?: "sm" | "md" | "lg";

  /** État du switch (composant contrôlé) */
  checked: boolean;

  /** Désactive le switch */
  disabled?: boolean;

  /** Classes CSS supplémentaires */
  className?: string;

  /** Label visible du switch */
  children?: ReactNode;

  /** Callback de changement d'état */
  onChange: (checked: boolean) => void;

  /** ID personnalisé (auto-généré si non fourni) */
  id?: string;

  /** Label accessible (obligatoire si pas de children) */
  "aria-label"?: string;
}

type StrictSwitchProps = 
  | (SwitchProps & { children: ReactNode; "aria-label"?: never })
  | (SwitchProps & { children?: never; "aria-label": string });

/**
 * Switch accessible avec support des variantes, tailles et apparences.
 * 
 * Respecte `prefers-reduced-motion` et `prefers-contrast: more`.
 */
export const Switch = forwardRef<HTMLInputElement, StrictSwitchProps>(
  (
    {
      checked,
      onChange,
      children,
      appearance = "filled",
      className = "",
      variant = "primary",
      size = "md",
      disabled = false,
      id: providedId,
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;

    const sizeClass = size !== "md" ? styles[`switch--${size}`] : undefined;
    const classList = classNames(styles.switch, sizeClass, className);

    return (
      <label
        htmlFor={id}
        className={classList}
        data-tone={variant}
        data-appearance={appearance !== "filled" ? appearance : undefined}
        data-disabled={disabled || undefined}
      >
        <input
          {...props}
          ref={ref}
          id={id}
          type="checkbox"
          role="switch"
          className={styles.hiddenInput}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          aria-checked={checked}
          aria-label={!children ? ariaLabel : undefined}
        />
        <span className={styles.switchSlider} aria-hidden="true" />
        {children && <span className={styles.switchLabel}>{children}</span>}
      </label>
    );
  },
);

Switch.displayName = "Switch";