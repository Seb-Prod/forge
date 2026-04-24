/**
 * Mode d'affichage du panneau Git Working Tree.
 *
 * | Valeur   | Signification                                  |
 * |----------|------------------------------------------------|
 * | `"tree"` | Affichage en arborescence (dossiers/fichiers) |
 * | `"list"` | Affichage en liste plate                      |
 *
 * Utilisé pour basculer entre les vues dans l'interface utilisateur.
 *
 * @example
 * const [view, setView] = useState<View>("tree");
 *
 * @see GitWorkingTree
 */
export const VIEW_OPTIONS = ["tree", "list"] as const;
export type View = (typeof VIEW_OPTIONS)[number];

/**
 * Statut Git possible pour un fichier ou un dossier dans l'arborescence.
 *
 * | Valeur        | Signification                                 |
 * |---------------|-----------------------------------------------|
 * | `"modified"`  | Fichier modifié par rapport au dernier commit |
 * | `"deleted"`   | Fichier supprimé, en attente de staging       |
 * | `"untracked"` | Fichier non suivi par Git                     |
 */
export type FileStatus = "modified" | "deleted" | "untracked";

/**
 * Représentation des fichiers modifiés retournée par le contexte Git.
 * Chaque clé correspond à un statut `FileStatus` et contient
 * la liste des chemins de fichiers concernés.
 */
export type GitStatus = Record<FileStatus, string[]>;

/** Champs communs à tous les nœuds de l'arborescence. */
type BaseNode = {
  /** Nom du fichier ou dossier (dernier segment du chemin). */
  name: string;
  /** Chemin complet depuis la racine du dépôt. */
  path: string;
  /** Statut Git du nœud, propagé depuis les enfants pour les dossiers. */
  status: FileStatus;
};

/**
 * Nœud feuille représentant un fichier Git.
 * N'a jamais d'enfants.
 */
export type FileNode = BaseNode & {
  type: "file";
  children?: never;
};

/**
 * Nœud intermédiaire représentant un dossier Git.
 * A toujours au moins un enfant.
 */
export type FolderNode = BaseNode & {
  type: "folder";
  children: TreeNode[];
};

/**
 * Nœud de l'arborescence Git — union discriminante sur `type`.
 * Utilise `node.type` pour narrower vers `FileNode` ou `FolderNode`.
 *
 * @example
 * if (node.type === "folder") {
 *   node.children; // TreeNode[] — garanti défini
 * }
 *
 * @see buildTree
 */
export type TreeNode = FileNode | FolderNode;
