import type { JSX } from "react";
import { Box, Text } from "@workspace/ui";
import { FaCheck } from "react-icons/fa";
import styles from "./EmptyState.module.css";


/**
 * EmptyState
 *
 * Écran affiché lorsqu'aucune modification n'est en attente dans le dépôt.
 *
 * Indique à l'utilisateur que sa branche est synchronisée et affiche.
 */
export const EmptyState = (): JSX.Element => {

  return (
    <div className={styles.emptyState}>
      
        <div className={styles.iconContainer}>
          <FaCheck className={styles.icon} />
        </div>

        <Text size="4xl" weight="medium" align="center">
          Aucune modification en attente
        </Text>

        <Text size="xl" tone="secondary" align="center">
          Votre branche est à jour avec le dépôt.
        </Text>
      
    </div>
  );
};