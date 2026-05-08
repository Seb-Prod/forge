import { AnchorHTMLAttributes, forwardRef } from "react";
import { classNames } from "@workspace/ui";
import styles from "./Button.module.css";
import { ButtonContent } from "./components/ButtonContent/ButtonContent";
import { useAction } from "./Button.hooks";
import { NavLink } from "react-router-dom";
import {
  renderButtonIcon,
  getButtonAriaLabel,
} from "./components/ButtonBase/ButtonBase";
import { ButtonProps, DEFAULT_PROPS } from "./Button.types";

/**
 * Props du composant Link
 */
export interface LinkProps
  extends Omit<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      "children"
    >,
    Omit<ButtonProps, keyof AnchorHTMLAttributes<HTMLAnchorElement>> {
  /** URL de destination (route React Router) */
  to: string;

  /** Contenu du lien */
  children?: React.ReactNode;
}

/**
 * Composant Link stylé comme un bouton.
 *
 * @see README.md pour la documentation complète
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => {
    const {
      to,
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
      <NavLink
        to={to}
        ref={ref}
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
      </NavLink>
    );
  },
);

Link.displayName = "Link";