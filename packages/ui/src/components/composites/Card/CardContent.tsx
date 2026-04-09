import { CardSectonProps } from "./Card.types";
import styles from "./card.module.css";
import { useCardContext } from "./context/CardContext";

export const CardContent = ({ children }: CardSectonProps) => {
  const { tone } = useCardContext();
  return (
    <div data-role="card" data-tone={tone} className={styles.content}>
      {children}
    </div>
  );
};

CardContent.displayName = 'CardContent';
