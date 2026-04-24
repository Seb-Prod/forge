import { useState } from "react";
import type { TreeNodeProps } from "../TreeView.types";
import { TreeNode } from "./TreeNode";

/**
 * `TreeFolder` — Nœud dossier dépliable de l'arborescence.
 *
 * Gère son propre état `open`, initialisé depuis `defaultOpen`.
 * Affiche `node.label` avec une icône toggle par défaut.
 * Le rendu est entièrement overridable via `renderFolder`.
 *
 * @example
 * // Rendu par défaut
 * <TreeFolder node={folderNode} defaultOpen={true} />
 *
 * // Rendu custom
 * <TreeFolder
 *   node={folderNode}
 *   defaultOpen={false}
 *   renderFolder={(node, children, toggle, open) => (
 *     <MyFolderItem node={node} open={open} onToggle={toggle}>
 *       {children}
 *     </MyFolderItem>
 *   )}
 * />
 */
export const TreeFolder = <T,>({
  node,
  defaultOpen,
  renderLeaf,
  renderFolder,
  selectedId,
  onNodeClick,
}: TreeNodeProps<T>) => {
  const [open, setOpen] = useState(defaultOpen);
  const toggle = () => setOpen((v) => !v);

  const children = open ? (
    <div style={{ paddingLeft: "16px" }}>
      {(node.children ?? []).map((child) => (
        <TreeNode
          key={child.id}
          node={child}
          defaultOpen={defaultOpen}
          renderLeaf={renderLeaf}
          renderFolder={renderFolder}
          selectedId={selectedId}
          onNodeClick={onNodeClick}
        />
      ))}
    </div>
  ) : null;

  if (renderFolder) {
    return (
      <div role="treeitem" aria-expanded={open}>
        {renderFolder(node, children, toggle, open)}
      </div>
    );
  }

  return (
    <div role="treeitem" aria-expanded={open}>
      <div
        onClick={() => {
          toggle();
          onNodeClick?.(node);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          padding: "2px 4px",
          cursor: "pointer",
          borderRadius: "4px",
          userSelect: "none",
          background: selectedId === node.id ? "var(--color-primary, #0066cc)" : "transparent",
          color: selectedId === node.id ? "#fff" : "inherit",
        }}
      >
        <span style={{ fontSize: "10px", transition: "transform 0.15s", transform: open ? "rotate(90deg)" : "none" }}>
          ▶
        </span>
        {node.label}
      </div>
      {children}
    </div>
  );
};