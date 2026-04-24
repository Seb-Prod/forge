import type { TreeViewProps } from "./TreeView.types";
import { TreeNode } from "./components";

/**
 * `TreeView` — Arborescence générique et composable.
 *
 * Affiche une liste de nœuds récursifs avec support natif
 * des dossiers dépliables, d'un rendu custom par nœud,
 * et d'une sélection optionnelle.
 *
 * ### Rendu par défaut
 * - Feuille : texte `node.label`, mis en surbrillance si sélectionné.
 * - Dossier : texte `node.label` + icône toggle, enfants indentés.
 *
 * ### Overrides
 * Passe `renderLeaf` ou `renderFolder` pour contrôler entièrement
 * le rendu de chaque type de nœud.
 *
 * ### Sélection
 * `TreeView` ne gère pas l'état de sélection — il expose `selectedId`
 * et `onNodeClick` pour que l'appelant en reste maître.
 *
 * @example
 * // Usage minimal
 * <TreeView nodes={nodes} />
 *
 * @example
 * // Avec rendu custom et sélection
 * <TreeView
 *   nodes={nodes}
 *   defaultOpen={false}
 *   selectedId={selected}
 *   onNodeClick={(node) => setSelected(node.id)}
 *   renderLeaf={(node) => <MyFileItem node={node} />}
 *   renderFolder={(node, children, toggle, open) => (
 *     <MyFolderItem node={node} open={open} onToggle={toggle}>
 *       {children}
 *     </MyFolderItem>
 *   )}
 * />
 */
export const TreeView = <T,>({
  nodes,
  defaultOpen = true,
  renderLeaf,
  renderFolder,
  selectedId,
  onNodeClick,
}: TreeViewProps<T>) => {
  return (
    <div role="tree">
      {nodes.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          defaultOpen={defaultOpen}
          renderLeaf={renderLeaf}
          renderFolder={renderFolder}
          selectedId={selectedId}
          onNodeClick={onNodeClick}
        />
      ))}
    </div>
  );
};