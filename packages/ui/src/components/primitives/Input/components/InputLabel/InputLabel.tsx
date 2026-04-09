import { FaAsterisk } from "react-icons/fa6";
import { Text } from "@workspace/ui";
import styles from "./InputLabel.module.css";
import { classNames } from "../../../../../functions/classNames";
import { InputSize } from "../../Input.types";

interface InputLabelProps {
  label: string;
  required: boolean;
  isFloating: boolean;
  htmlFor: string;
  size: InputSize;
  leftIcon: boolean;
  disabled: boolean;
}

/**
 * InputLabel
 *
 * Label du champ
 */
export const InputLabel = ({
  label,
  required,
  isFloating,
  htmlFor,
  size = "lg",
  leftIcon,
  disabled
}: InputLabelProps) => {
  return (
    <div
      className={classNames(
        isFloating ? styles.floating : styles.standart,
        leftIcon ? styles.withLeftIcon : "",
      )}
    >
      <Text as="label" htmlFor={htmlFor} size={size} disabled={disabled}>
        {label}
      </Text>
      {required && <FaAsterisk className={styles.required} />}
    </div>
  );
};
