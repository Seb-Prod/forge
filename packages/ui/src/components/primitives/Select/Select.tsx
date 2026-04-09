import { forwardRef, useId } from "react";
import { DEFAULT_PROPS, SelectProps } from "./Select.types";
import { classNames } from "@workspace/ui";
import { Text } from "@workspace/ui";
import { SelectTrigger } from "./components/SelectTrigger/SelectTrigger";
import { SelectDropdown } from "./components/SelectDropdown/SelectDropdown";
import { SelectContext } from "./Select.context";
import { useSelect } from "./Select.hooks";
import styles from "./Select.module.css";

/**
 * Composant select pour la sélection d'options dans une liste déroulante.
 *
 * @see README.md pour la documentation complète
 */
export const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const mergedProps = { ...DEFAULT_PROPS, ...props };

  const {
    label,
    placeholder,
    topLabel,
    options,
    value,
    onSelect,
    tone,
    appearance,
    size,
    variant,
    className,
    ...rest
  } = mergedProps;

  const id = useId();

  const select = useSelect({
    options,
    value,
    onSelect,
    tone,
    appearance,
    size,
    variant,
    placeholder,
  });

  const rootClassName = classNames(
    styles.root,
    topLabel ? styles.topLabel : styles.leftLabel,
    className
  );


  return (
    <SelectContext.Provider value={select}>
      <div
        ref={ref}
        className={rootClassName}
        data-role="select"
        {...rest}
      >
        {/* Label */}
        <Text as="label" size={size} htmlFor={id}>
          {label}
        </Text>

        {/* Trigger */}
        <SelectTrigger id={id}/>

        {/* Dropdown */}
        <SelectDropdown />
      </div>
    </SelectContext.Provider>
  );
});

Select.displayName = "Select";
