import type { TreeNode } from "../../GitStatus.types";
import { Box } from "@workspace/ui";
import { TreeFolderItem } from "./components/TreeFolderItem";
import { TreeFileItem } from "./components";

interface TreeNodeItemProps {
  /** Nœud à afficher, peut être un fichier ou un dossier. */
  node: TreeNode;
  /** État de sélection de chaque fichier, indexé par chemin. */
  checked: Record<string, boolean>;
  /**
   * Callback déclenché quand l'utilisateur coche ou décoche un fichier.
   * @param path - Chemin du fichier concerné.
   */
  onToggleCheck: (path: string) => void;
}

/**
 * `TreeNodeItem` — Routeur de rendu pour un nœud de l'arborescence Git.
 *
 * Détermine si le nœud est un fichier ou un dossier et délègue
 * le rendu au composant approprié (`TreeFileItem` ou `TreeFolderItem`).
 * Ce composant ne contient aucune logique propre : il sert uniquement
 * de point d'entrée unifié pour l'arborescence récursive.
 *
 * ### Types de nœuds supportés
 * | `node.type` | Composant rendu   |
 * |-------------|-------------------|
 * | `"folder"`  | `TreeFolderItem`  |
 * | `"file"`    | `TreeFileItem`    |
 *
 * @example
 * <TreeNodeItem
 *   node={node}
 *   checked={checked}
 *   onToggleCheck={toggleCheck}
 * />
 */
export const TreeNodeItem = ({ node, checked, onToggleCheck }: TreeNodeItemProps) => {
  return (
    <Box padding={{ left: "12px" }}>
      {node.type === "folder" ? (
        <TreeFolderItem
          node={node}
          checked={checked}
          onToggleCheck={onToggleCheck}
        />
      ) : (
        <TreeFileItem
          node={node}
          checked={checked}
          onToggleCheck={onToggleCheck}
        />
      )}
    </Box>
  );
};