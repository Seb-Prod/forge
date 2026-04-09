import { Text } from "@workspace/ui";
import styles from "./InputMessage.module.css";
import { FaInfoCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import { classNames } from "@workspace/ui";

interface InputMessageProps {
  type?: "info" | "error";
  message?: string;
  id?: string;
}

/**
 * InputMessage
 *
 * Affiche un message d'aide ou d'erreur avec son icon adapté
 */
export const InputMessage = ({ type = "info", message, id }: InputMessageProps) => {
  return (
    <div className={classNames(styles.message, type==="info" ? styles.info : styles.error)}>
        {type==="info" && (
            <FaInfoCircle />
        )}
        {type==="error" && (
            <MdOutlineError />
        )}
      <Text id={id} as="strong" tone={type === "info" ? "info" : "danger"}>
        {message}
      </Text>
    </div>
  );
};
