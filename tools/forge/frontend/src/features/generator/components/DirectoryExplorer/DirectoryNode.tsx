import React from "react";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { Text } from "@workspace/ui";
import styles from "./DirectoryExplorer.module.css";
import type { TreeNode } from "@/types/types";

/**
 * Props du composant DirectoryNode.
 * Représente un nœud de l'arborescence de répertoires.
 */
type DirectoryNodeProps = {
  node: TreeNode;
  expanded: Set<string>;
  selected: string | null;
  onToggle: (path: string) => void;
  onSelect: (path: string) => void;
};

/**
 * Nœud récursif de l'arborescence.
 * Mémoïsé pour éviter les re-renders des nœuds non impactés par les changements d'état.
 */
export const DirectoryNode = React.memo(
  ({ node, expanded, selected, onToggle, onSelect }: DirectoryNodeProps) => {
    const isOpen = expanded.has(node.path);
    const hasChildren = node.children.length > 0;

    return (
      <div>
        <button
          onClick={() => {
            onToggle(node.path);
            onSelect(node.path);
          }}
          className={styles.item}
          style={{ paddingLeft: `${1 + node.depth * 1.25}rem` }}
        >
          {/* Icône dossier ouvert / fermé */}
          <span className={selected === node.path ? styles.iconSelected : styles.icon}>
            {isOpen ? <FaFolderOpen /> : <FaFolder />}
          </span>

          <Text as="span" variant={selected === node.path ? "body-lg" : "body"} tone={selected === node.path ? "info" : "default"}>
            {node.name}
          </Text>

          {/* Indicateur d'enfants */}
          <span className={styles.arrow}>
            {hasChildren ? (
              isOpen ? <FiChevronDown /> : <FiChevronRight />
            ) : (
              <span className={styles.dot} />
            )}
          </span>
        </button>

        {/* Enfants récursifs */}
        {isOpen &&
          node.children.map((child) => (
            <DirectoryNode
              key={child.path}
              node={child}
              expanded={expanded}
              selected={selected}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
      </div>
    );
  }
);