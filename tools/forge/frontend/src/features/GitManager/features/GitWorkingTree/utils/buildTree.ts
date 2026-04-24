import type {
  FileStatus,
  TreeNode as GitTreeNode,
} from "../types";

type BuildTreeInput = {
  paths: string[];
  status: FileStatus;
};

/**
 * Nœud intermédiaire utilisé pendant la construction de l'arbre,
 * avant la normalisation en `GitTreeNode`.
 * Les enfants sont stockés dans un `Record` pour faciliter
 * la déduplication lors de l'insertion.
 */
type RawNode = {
  name: string;
  path: string;
  type: "file" | "folder";
  status?: FileStatus;
  children: Record<string, RawNode>;
};

/**
 * buildTree
 *
 * Construit une arborescence de nœuds Git à partir de listes de chemins groupées par statut.
 *
 * Fonctionne en deux passes :
 * 1. Insertion — chaque chemin est découpé en segments et inséré dans un `Record`
 *    intermédiaire, créant les dossiers parents à la volée.
 * 2. Normalisation — le `Record` est converti récursivement en `GitTreeNode[]`,
 *    et le statut des dossiers est déduit de celui de leurs enfants.
 *
 * Propagation du statut des dossiers :
 * - Tous `untracked` → `"untracked"`
 * - Tous `deleted`   → `"deleted"`
 * - Mixte            → `"modified"`
 */
export const buildTree = (inputs: BuildTreeInput[]): GitTreeNode[] => {
  const root: Record<string, RawNode> = {};

  const insert = (path: string, status: FileStatus) => {
    const parts = path.split("/");
    let current = root;
    let currentPath = "";

    parts.forEach((part, index) => {
      currentPath += (index === 0 ? "" : "/") + part;
      if (!current[part]) {
        current[part] = {
          name: part,
          path: currentPath,
          type: index === parts.length - 1 ? "file" : "folder",
          children: {},
        };
      }
      if (index === parts.length - 1) {
        current[part].status = status;
      }
      current = current[part].children;
    });
  };

  inputs.forEach(({ paths, status }) => {
    paths.forEach((path) => insert(path, status));
  });

  const normalize = (nodes: Record<string, RawNode>): GitTreeNode[] =>
    Object.values(nodes).map((node): GitTreeNode => {
      const children = normalize(node.children);
      let status: FileStatus = node.status ?? "modified";

      if (node.type === "folder" && children.length > 0) {
        const statuses = children.map((c) => c.status);
        if (statuses.every((s) => s === "untracked")) status = "untracked";
        else if (statuses.every((s) => s === "deleted")) status = "deleted";
        else status = "modified";
      }

      if (node.type === "folder") {
        return {
          name: node.name,
          path: node.path,
          type: "folder",
          status,
          children,
        };
      }
      return { name: node.name, path: node.path, type: "file", status };
    });

  return normalize(root);
};
