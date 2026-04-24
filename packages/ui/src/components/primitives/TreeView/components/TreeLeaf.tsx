import type { TreeNodeProps } from "../TreeView.types";

/**
 * `TreeLeaf` — Nœud feuille de l'arborescence.
 *
 * Affiche `node.label` par défaut.
 * Le rendu est entièrement overridable via `renderLeaf`.
 *
 * @example
 * // Rendu par défaut
 * <TreeLeaf node={node} defaultOpen={true} />
 *
 * // Rendu custom
 * <TreeLeaf node={node} defaultOpen={true} renderLeaf={(n) => <MyFileItem node={n} />} />
 */
export const TreeLeaf = <T,>({
  node,
  renderLeaf,
  selectedId,
  onNodeClick,
}: TreeNodeProps<T>) => {
  const isSelected = selectedId === node.id;

  if (renderLeaf) {
    return (
      <div onClick={() => onNodeClick?.(node)} role="treeitem" aria-selected={isSelected}>
        {renderLeaf(node)}
      </div>
    );
  }

  return (
    <div
      role="treeitem"
      aria-selected={isSelected}
      onClick={() => onNodeClick?.(node)}
      style={{
        padding: "2px 4px",
        cursor: "pointer",
        borderRadius: "4px",
        background: isSelected ? "var(--color-primary, #0066cc)" : "transparent",
        color: isSelected ? "#fff" : "inherit",
        userSelect: "none",
      }}
    >
      {node.label}
    </div>
  );
};