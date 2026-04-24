import { useGitRepository } from "@/features/GitManager/context/GitRepository";
import { AutoRefreshIndicator, Button, Text } from "@workspace/ui";
import styles from "./GitWorkingTreeHeader.module.css";

/**
 * GitWorkingTreeHeader
 *
 * En-tête du panneau de sélection des fichiers Git modifiés.
 *
 * - Affiche le titre de la section.
 * - Indique le temps restant avant le prochain rafraîchissement automatique via `AutoRefreshIndicator`.
 * - Expose un bouton de rafraîchissement manuel, passant en état de chargement
 *   quand le rafraîchissement automatique est imminent (moins d'une seconde).
 */
export const GitWorkingTreeHeader = () => {
  const { statusRemaining, triggerStatusRefresh, isRefreshingStatus} = useGitRepository();
  const isLoading = statusRemaining !== null && statusRemaining < 1000;

  return (
    <div className={styles.container}>
      <Text size="xl">Sélectionner les fichiers :</Text>
      <div className={styles.actions}>
        <AutoRefreshIndicator ms={statusRemaining} />
        <Button size="xs" loading={isRefreshingStatus || isLoading} loadingText="Mise à jour" appearance="outline" onClick={triggerStatusRefresh}>
          Rafraîchir
        </Button>
      </div>
    </div>
  );
};