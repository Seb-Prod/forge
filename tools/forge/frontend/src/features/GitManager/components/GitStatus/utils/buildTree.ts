import type { FileStatus, TreeNode } from "../GitStatus.types";

type BuildTreeInput = {
  paths: string[];
  status: FileStatus;
};

/**
 * Nœud intermédiaire utilisé pendant la construction de l'arbre,
 * avant la normalisation en `TreeNode`.
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
 * `buildTree` — Construit une arborescence de nœuds Git à partir
 * de listes de chemins de fichiers groupées par statut.
 *
 * Fonctionne en deux passes :
 * 1. **Insertion** — chaque chemin est découpé en segments et inséré
 *    dans un `Record` intermédiaire (`RawNode`), créant les dossiers
 *    parents à la volée.
 * 2. **Normalisation** — le `Record` est converti récursivement en
 *    tableau de `TreeNode`, et le statut des dossiers est déduit
 *    de celui de leurs enfants.
 *
 * ### Propagation du statut des dossiers
 * | Enfants                        | Statut du dossier |
 * |--------------------------------|-------------------|
 * | Tous `untracked`               | `"untracked"`     |
 * | Mixtes ou tous `modified`      | `"modified"`      |
 * | Tous `deleted`                 | `"deleted"`       |
 *
 * @param inputs - Tableau de `{ paths, status }` à fusionner dans l'arbre.
 * @returns Arborescence de `TreeNode` triée par ordre d'insertion.
 *
 * @example
 * buildTree([
 *   { paths: ["src/index.ts", "src/utils/helper.ts"], status: "modified" },
 *   { paths: ["old/file.ts"],                         status: "deleted"  },
 * ]);
 */
export const buildTree = (inputs: BuildTreeInput[]): TreeNode[] => {
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

  const normalize = (nodes: Record<string, RawNode>): TreeNode[] =>
    Object.values(nodes).map((node): TreeNode => {
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
