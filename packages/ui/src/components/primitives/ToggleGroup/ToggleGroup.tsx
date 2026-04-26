import { forwardRef, useMemo } from "react";
import { classNames } from "@workspace/ui/functions";
import styles from "./ToggleGroup.module.css";
import { DEFAULT_PROPS, ToggleGroupProps } from "./ToggleGroup.types";
import { getToggleGroupeStyle } from "./helpers/getToggleGroupStyle";

const ToggleGroupBase = <T extends string>(
  props: ToggleGroupProps<T>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const mergedProps = { ...DEFAULT_PROPS, ...props };

  const toggleGroupStyle = useMemo(
    () => getToggleGroupeStyle(mergedProps),
    [
      mergedProps.tone,
      mergedProps.size,
      mergedProps.variant,
      mergedProps.style,
    ],
  );

  return (
    <div
      ref={ref}
      role="group"
      className={classNames(
        styles.container,
        styles[`variant-${mergedProps.variant}`],
        mergedProps.className,
      )}
      style={toggleGroupStyle}
    >
      {mergedProps.options.map((option) => {
        const isActive = mergedProps.value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            aria-label={option.ariaLabel ?? option.label}
            onClick={() => mergedProps.onChange(option.value)}
            className={classNames(
              styles.button,
              isActive && styles.active,
            )}
          >
            {option.icon && (
              <span className={styles.icon}>{option.icon}</span>
            )}

            {option.label && (
              <span className={styles.label}>{option.label}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

const ToggleGroupForwardRef = forwardRef(ToggleGroupBase);

ToggleGroupForwardRef.displayName = "ToggleGroup";

export const ToggleGroup = ToggleGroupForwardRef as <
  T extends string
>(
  props: ToggleGroupProps<T> & {
    ref?: React.Ref<HTMLDivElement>;
  }
) => React.ReactElement;