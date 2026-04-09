import { forwardRef } from "react";
import { BadgeProps, DEFAULT_PROPS } from "./Badge.types";
import { classNames } from "@workspace/ui";
import { BadgeContent, BadgeDot, BadgeRemoveButton } from "./components";
import { shouldShowRemoveButton, shouldShowDot } from "./utils";
import styles from "./Badge.module.css";

/**
 * Composant badge pour étiquettes, statuts et indicateurs.
 *
 * @see README.md pour la documentation complète
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const {
    children,
    tone,
    appearance,
    size,
    variant,
    startIcon,
    endIcon,
    onRemove,
    className,
    ...rest
  } = { ...DEFAULT_PROPS, ...props };

  return (
    <span
      ref={ref}
      className={classNames(styles.badge, className)}
      data-role="badge"
      data-tone={tone}
      data-appearance={appearance}
      data-size={size}
      data-variant={variant}
      {...rest}
    >
      {/* Point indicateur */}
      {shouldShowDot(variant) && <BadgeDot />}

      {/* Contenu principal */}
      <BadgeContent startIcon={startIcon} endIcon={endIcon}>
        {children}
      </BadgeContent>

      {/* Bouton de suppression */}
      {shouldShowRemoveButton(variant, onRemove) && (
        <BadgeRemoveButton onRemove={onRemove!} />
      )}
    </span>
  );
});

Badge.displayName = "Badge";
