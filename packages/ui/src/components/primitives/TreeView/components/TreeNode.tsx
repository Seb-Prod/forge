import type { TreeNodeProps } from "../TreeView.types";
import { TreeLeaf } from "./TreeLeaf";
import { TreeFolder } from "./TreeFolder";

/**
 * `TreeNode` — Routeur interne de l'arborescence.
 *
 * Détermine si le nœud est une feuille ou un dossier
 * en fonction de la présence de `node.children`,
 * et délègue au composant approprié.
 *
 * Ce composant est interne — il n'est pas exporté publiquement.
 */
export const TreeNode = <T,>(props: TreeNodeProps<T>) => {
  const isFolder = Array.isArray(props.node.children);
  return isFolder ? <TreeFolder {...props} /> : <TreeLeaf {...props} />;
};