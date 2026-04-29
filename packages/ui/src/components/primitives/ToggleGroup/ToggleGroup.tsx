import { forwardRef, useMemo } from "react";
import { classNames } from "@workspace/ui/functions";
import styles from "./ToggleGroup.module.css";
import { DEFAULT_PROPS, ToggleGroupProps } from "./ToggleGroup.types";
import { getToggleGroupeStyle } from "./helpers/getToggleGroupStyle";

/**
 * Composant ToggleGroup qui affiche un groupe de boutons bascule.
 *
 * @template T - Le type de la valeur associée à chaque option, étend string.
 *
 * @param {ToggleGroupProps<T>} props - Les props du composant ToggleGroup.
 * @param {T} props.value - La valeur actuellement sélectionnée.
 * @param {Array<{ value: T; label?: string; icon?: React.ReactNode; ariaLabel?: string }>} props.options - La liste des options à afficher sous forme de boutons bascule.
 * @param {(value: T) => void} props.onChange - Callback déclenché lors du clic sur un bouton bascule.
 * @param {string} [props.tone] - La tonalité/couleur du groupe (ex : "primary", "neutral").
 * @param {string} [props.size] - La taille des boutons bascule (ex : "sm", "md", "lg").
 * @param {string} [props.variant] - La variante visuelle du groupe (ex : "solid", "outline").
 * @param {React.CSSProperties} [props.style] - Styles inline supplémentaires appliqués au conteneur.
 * @param {string} [props.className] - Classes CSS supplémentaires appliquées au conteneur.
 * @param {React.Ref<HTMLDivElement>} ref - Ref transmise et attachée au div racine du conteneur.
 *
 * @returns {React.ReactElement} Un div conteneur avec un ensemble de boutons bascule accessibles.
 *
 * @example
 * <ToggleGroup
 *   value="list"
 *   options={[
 *     { value: "list", label: "Liste", icon: <ListIcon /> },
 *     { value: "grid", label: "Grille", icon: <GridIcon /> },
 *   ]}
 *   onChange={(value) => setView(value)}
 * />
 */
const ToggleGroupBase = <T extends string>(
  props: ToggleGroupProps<T>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const mergedProps = { ...DEFAULT_PROPS, ...props };

  /**
   * Objet de style mémoïsé pour le conteneur du groupe bascule.
   * Recalculé uniquement lorsque tone, size, variant ou style changent,
   * évitant ainsi des recalculs inutiles lors de re-renders sans rapport.
   */
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

/**
 * ToggleGroup avec une ref transmise, en préservant le paramètre de type générique T.
 * Le cast est nécessaire car `forwardRef` ne supporte pas nativement les génériques.
 */
export const ToggleGroup = ToggleGroupForwardRef as <T extends string>(
  props: ToggleGroupProps<T> & {
    ref?: React.Ref<HTMLDivElement>;
  }
) => React.ReactElement;