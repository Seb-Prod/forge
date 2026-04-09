import { useMemo, forwardRef, useState } from "react";
import { DEFAULT_PROPS, IconToggleProps } from "./IconToggle.types";
import { getIconToggleStyle } from "./helpers/getIconToogleStyle";
import styles from "./IconToggle.module.css";
import { classNames } from "@workspace/ui";

export const IconToggle = forwardRef<HTMLButtonElement, IconToggleProps>(
  (props, ref) => {
    const mergedProps = { ...DEFAULT_PROPS, ...props };

    const isControlled = mergedProps.pressed !== undefined;
    const [internalPressed, setInternalPressed] = useState(
      mergedProps.defaultPressed ?? false
    );

    const pressed = isControlled ? mergedProps.pressed : internalPressed;

    const iconToggleStyle = useMemo(
      () => getIconToggleStyle({ ...mergedProps, pressed }),
      [mergedProps.size, mergedProps.tone, pressed],
    );

    const handleToggle = () => {
      const next = !pressed;
      if (!isControlled) setInternalPressed(next);
      mergedProps.onToggle?.(next);
    };

    return (
      <button
        ref={ref}
        type="button"
        className={classNames(styles.iconToggle, mergedProps.className)}
        style={iconToggleStyle}
        onClick={handleToggle}
        aria-pressed={pressed}
        aria-label={mergedProps.ariaLabel ?? (pressed ? "Actif" : "Inactif")}
      >
        <span className={styles.icon}>
          {pressed ? mergedProps.activeIcon : mergedProps.inactiveIcon}
        </span>
      </button>
    );
  }
);

IconToggle.displayName = "IconToggle";