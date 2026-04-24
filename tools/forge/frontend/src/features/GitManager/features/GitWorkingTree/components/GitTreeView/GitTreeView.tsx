import type { TreeNode as GitTreeNode } from "../../types";
import type { TreeNodeData } from "@workspace/ui";
import { TreeView } from "@workspace/ui";
import { TreeFileItem } from "../TreeFileItem/TreeFileItem";
import { TreeFolderItem } from "../TreeFolderItem/TreeFolderItem";

/**
 * Convertit un `GitTreeNode` en `TreeNodeData` compatible avec `TreeView`.
 *
 * Mappe récursivement `path` → `id`, `name` → `label`,
 * et attache le nœud Git original dans `data`.
 */
const toTreeNodeData = (node: GitTreeNode): TreeNodeData<GitTreeNode> => ({
  id: node.path,
  label: node.name,
  data: node,
  children:
    node.type === "folder" ? node.children.map(toTreeNodeData) : undefined,
});

type GitTreeViewProps = {
  tree: GitTreeNode[];
  checked: Record<string, boolean>;
  onToggleCheck: (path: string) => void;
};

/**
 * GitTreeView
 *
 * Affiche les fichiers Git modifiés sous forme d'arborescence interactive.
 *
 * - Adapte les `GitTreeNode` au format `TreeNodeData` via `toTreeNodeData`.
 * - Délègue le rendu des fichiers à `TreeFileItem`.
 * - Délègue le rendu des dossiers à `TreeFolderItem`.
 * - Transmet la sélection (`checked`, `onToggleCheck`) aux nœuds enfants.
 */
export const GitTreeView = ({
  tree,
  checked,
  onToggleCheck,
}: GitTreeViewProps) => (
  <TreeView
    nodes={tree.map(toTreeNodeData)}
    renderLeaf={(node) => {
      if (node.data?.type !== "file") return null;
      return (
        <TreeFileItem
          node={node.data}
          checked={checked}
          onToggleCheck={onToggleCheck}
        />
      );
    }}
    renderFolder={(node, children, toggle, open) => {
      if (node.data?.type !== "folder") return null;
      return (
        <TreeFolderItem
          node={node.data}
          checked={checked}
          onToggleCheck={onToggleCheck}
          open={open}
          onToggle={toggle}
        >
          {children}
        </TreeFolderItem>
      );
    }}
  />
);
