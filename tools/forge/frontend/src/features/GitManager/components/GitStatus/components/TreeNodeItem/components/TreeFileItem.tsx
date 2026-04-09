import { STATUS_CONFIG } from "../../../constants/statusConfig";
import type { FileNode } from "../../../GitStatus.types";
import { Badge, Box, Checkbox, Text } from "@workspace/ui";

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
export const TreeFileItem = ({ node, checked, onToggleCheck }: TreeFileItemProps) => {
  const config = STATUS_CONFIG.find((s) => s.key === node.status);

  if (!config) return null;

  return (
    <Box flexDirection="row" gap="xs" padding="0">
      <Checkbox
        checked={!!checked[node.path]}
        onChange={() => onToggleCheck(node.path)}
      />
      <Text tone={config.tone}>{node.name}</Text>
      <Badge tone={config.tone}>{config.label}</Badge>
    </Box>
  );
};