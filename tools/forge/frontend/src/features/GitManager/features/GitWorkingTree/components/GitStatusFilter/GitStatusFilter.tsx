import { Box, Checkbox, Text } from "@workspace/ui";
import { STATUS_CONFIG } from "../../constants";
import { useGitRepository } from "@/features/GitManager/context";

interface GitStatusFilterProps {
  /** État de sélection de chaque fichier, indexé par chemin. */
  checked: Record<string, boolean>;
  /**
   * Callback déclenché quand l'utilisateur coche/décoche un groupe entier.
   * @param paths  - Liste des chemins concernés par le statut.
   * @param value  - `true` pour tout sélectionner, `false` pour tout désélectionner.
   */
  onToggleAllByStatus: (paths: string[], value: boolean) => void;
}

/**
 * `GitStatusFilter` — Sélection groupée de fichiers par statut Git.
 *
 * Affiche trois checkboxes (Modifiés / Supprimés / Non suivis) permettant
 * de sélectionner ou désélectionner en un clic tous les fichiers d'un même
 * statut pour les inclure dans le prochain commit.
 *
 * ### Comportement des checkboxes
 * | État                          | Visuel        |
 * |-------------------------------|---------------|
 * | Aucun fichier disponible      | Désactivée    |
 * | Aucun fichier sélectionné     | Décochée      |
 * | Certains fichiers sélectionnés| Indéterminée  |
 * | Tous les fichiers sélectionnés| Cochée        |
 *
 * Le label indique `sélectionnés/total` pour chaque statut.
 *
 * @example
 * <GitStatusFilter
 *   checked={checkedFiles}
 *   onToggleAllByStatus={(paths, value) => toggleGroup(paths, value)}
 * />
 */
export const GitStatusFilter = ({
  checked,
  onToggleAllByStatus,
}: GitStatusFilterProps) => {
  const { gitData } = useGitRepository();

  if (!gitData) return null;

  const countSelected = (paths: string[]) =>
    paths.filter((path) => checked[path]).length;

  return (
    <Box surface="none">
      <Text size="xl">Sélectionner les fichiers par statut :</Text>

      <Box flexDirection="row" surface="none" gap={"lg"}>
        {(Object.values(STATUS_CONFIG)).map(({ key, label, tone })  => {
          const paths = gitData[key] ?? [];
          const selectedCount = countSelected(paths);
          const isAllSelected =
            paths.length > 0 && selectedCount === paths.length;
          const isIndeterminate = selectedCount > 0 && !isAllSelected;

          return (
            <Checkbox
              key={key}
              tone={tone}
              size="md"
              appearance="soft"
              label={`${label} (${selectedCount}/${paths.length})`}
              checked={isAllSelected}
              indeterminate={isIndeterminate}
              disabled={paths.length === 0}
              onChange={(e) => onToggleAllByStatus(paths, e.target.checked)}
            />
          );
        })}
      </Box>
    </Box>
  );
};
