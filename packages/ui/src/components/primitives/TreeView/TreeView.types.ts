import type { ReactNode } from "react";

/**
 * Nœud générique de l'arborescence.
 *
 * @template T - Type des données métier attachées au nœud.
 */
export type TreeNodeData<T = unknown> = {
  /** Identifiant unique du nœud. */
  id: string;
  /** Texte affiché par défaut. */
  label: string;
  /** Enfants — présence détermine si le nœud est un dossier. */
  children?: TreeNodeData<T>[];
  /** Données métier arbitraires. */
  data?: T;
};

/**
 * Props du composant `TreeView`.
 *
 * @template T - Type des données métier.
 */
export type TreeViewProps<T = unknown> = {
  /** Nœuds racine de l'arborescence. */
  nodes: TreeNodeData<T>[];
  /**
   * Les dossiers sont-ils ouverts par défaut ?
   * @default true
   */
  defaultOpen?: boolean;
  /**
   * Override du rendu d'un nœud feuille.
   * Si absent, affiche `node.label`.
   */
  renderLeaf?: (node: TreeNodeData<T>) => ReactNode;
  /**
   * Override du rendu d'un nœud dossier.
   * Reçoit les enfants déjà rendus, le toggle et l'état open.
   * Si absent, affiche `node.label` avec une icône.
   */
  renderFolder?: (
    node: TreeNodeData<T>,
    children: ReactNode,
    toggle: () => void,
    open: boolean,
  ) => ReactNode;
  /**
   * Id du nœud sélectionné.
   * Transmis aux renderers pour que l'appelant gère le style.
   */
  selectedId?: string;
  /** Callback déclenché au clic sur n'importe quel nœud. */
  onNodeClick?: (node: TreeNodeData<T>) => void;
};

/**
 * Props internes partagées entre `TreeLeaf` et `TreeFolder`.
 *
 * @template T - Type des données métier.
 */
export type TreeNodeProps<T = unknown> = {
  node: TreeNodeData<T>;
  defaultOpen: boolean;
  renderLeaf?: TreeViewProps<T>["renderLeaf"];
  renderFolder?: TreeViewProps<T>["renderFolder"];
  selectedId?: string;
  onNodeClick?: TreeViewProps<T>["onNodeClick"];
};