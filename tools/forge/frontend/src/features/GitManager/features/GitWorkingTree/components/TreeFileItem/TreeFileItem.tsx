import { STATUS_CONFIG } from "../../constants/statusConfig";
import { Badge, Box, Button, Checkbox, ScrollText } from "@workspace/ui";
import type { FileNode } from "../../types";
import styles from "./TreeFileIem.module.css";
import { useGitModal, useGitRepository } from "@/features/GitManager/context";

interface TreeFileItemProps {
  /** Nœud de type fichier à afficher. */
  node: FileNode;
  /** État de sélection de chaque fichier, indexé par chemin. */
  checked: Record<string, boolean>;
  /**
   * Callback déclenché quand l'utilisateur coche ou décoche le fichier.
   * @param path - Chemin du fichier concerné.
   */
  onToggleCheck: (path: string) => void;
  displayPath?: boolean;
}

/**
 * `TreeFileItem` — Nœud fichier de l'arborescence Git.
 *
 * Affiche un fichier avec sa checkbox de sélection, son nom coloré
 * selon son statut Git, et un badge indiquant ce statut.
 *
 * ### Statuts supportés
 * | `node.status` | Couleur    | Badge        |
 * |---------------|------------|--------------|
 * | `"modified"`  | `warning`  | Modifié      |
 * | `"deleted"`   | `danger`   | Supprimé     |
 * | `"untracked"` | `success`  | Non suivi    |
 *
 * @example
 * <TreeFileItem
 *   node={fileNode}
 *   checked={checked}
 *   onToggleCheck={toggleCheck}
 * />
 */
export const TreeFileItem = ({
  node,
  checked,
  onToggleCheck,
  displayPath = false,
}: TreeFileItemProps) => {
  const config = STATUS_CONFIG[node.status];
  const { currentBranch } = useGitRepository();
  const { openModal } = useGitModal();

  if (!config) return null;
  const ActionIcon = config.icon;
  return (
    <Box flexDirection="row" gap="xs" padding="xs" surface="none" className={styles.container} radius={"md"}>
      <div className={styles.fileCol}>
        <Checkbox
          checked={!!checked[node.path]}
          onChange={() => onToggleCheck(node.path)}
        />

        <ScrollText tone={config.tone} speed={150}>
          {displayPath ? node.path : node.name}
        </ScrollText>
      </div>
      <div className={styles.actionsCol}>
        <Badge size="sm" tone={config.tone} className={styles.badge}>
          {config.label}
        </Badge>
        <Button
          startIcon={<ActionIcon />}
          size="xs"
          tone="neutral"
          onClick={() =>
            openModal("discard", {
              modal: "discard",
              branchName: currentBranch,
              file: node.path,
            })
          }
        >{config.actionLabel}</Button>
      </div>
    </Box>
  );
};
