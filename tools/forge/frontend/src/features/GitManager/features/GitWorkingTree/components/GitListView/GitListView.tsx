import {Box, } from "@workspace/ui";
import type { TreeNode as GitTreeNode, FileNode } from "../../types/";
import { TreeFileItem } from "../TreeFileItem";

type GitListViewProps = {
  tree: GitTreeNode[];
  checked: Record<string, boolean>;
  onToggleCheck: (path: string) => void;
};

/**
 * Aplatit récursivement un arbre Git en liste de `FileNode` uniquement.
 * Les dossiers sont traversés mais non inclus dans le résultat.
 */
const flattenTree = (nodes: GitTreeNode[]): FileNode[] =>
  nodes.flatMap((node) =>
    node.type === "file" ? [node] : flattenTree(node.children),
  );

/**
 * GitListView
 *
 * Affiche les fichiers Git modifiés sous forme de liste à plat.
 *
 * - Aplatit récursivement l'arbre via `flattenTree` (dossiers exclus).
 * - Affiche le chemin complet de chaque fichier (contrairement à `GitTreeView` qui affiche le nom).
 * - Indique le statut Git de chaque fichier via un `Badge` coloré.
 * - Permet la sélection individuelle de chaque fichier via une `Checkbox`.
 */
export const GitListView = ({
  tree,
  checked,
  onToggleCheck,
}: GitListViewProps) => {
  const files = flattenTree(tree);

  return (
    <Box gap="xs" padding="0" surface="none">
      {files.map((file) => (
        <TreeFileItem
          key={file.path}
          node={file}
          checked={checked}
          onToggleCheck={onToggleCheck}
          displayPath
        />
      ))}
    </Box>
  );
};
