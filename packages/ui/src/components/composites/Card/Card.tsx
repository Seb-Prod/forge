import { CardProps } from "./Card.types";
import styles from "./card.module.css";
import { CardProvider } from "./context/CardContext";
import { organizeCardChildren } from "./utils/cardChildren";

export const CardRoot = ({ children, tone = "primary" }: CardProps) => {
  const { header, content, footer, warnings } = organizeCardChildren(children);

  return (
    <CardProvider value={{ tone: tone }}>
      <div data-role="card" data-tone={tone} className={styles.card}>
        {warnings.length > 0 && (
          <div className={styles.devWarning}>
            <strong>⚠️ Card - Problèmes de composition détectés :</strong>
            <ul>
              {warnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </div>
        )}
        {header}
        {content}
        {footer}
      </div>
    </CardProvider>
  );
};
