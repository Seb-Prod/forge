import { {{name}}Props, DEFAULT_PROPS } from "./{{name}}.types";
import styles from "./{{name}}.module.css";

/**
 * Composant {{name}} ...
 *
 * @see README.md pour la documentation complète
 */
export const {{name}} = (props: {{name}}Props) => {
  const { tone, label } = { ...DEFAULT_PROPS, ...props };
  
  return (
    <div 
      className={styles.{{nameLower}}}
      data-role="{{name}}"
      data-tone={tone}
    >
      {label}
    </div>
  );
};