import { forwardRef, useState, useImperativeHandle  } from "react";
import { runAction } from "@/services/api";
import { Button, Card, Text } from "@workspace/ui";
import styles from "./DirectoryExplorer.module.css";
import { DirectoryNode } from "./DirectoryNode";
import type { Entry, TreeNode } from "@/types/types";

/**
 * Props du composant DirectoryExplorer.
 * Permet de naviguer dans une arborescence de répertoires.
 */
type Props = {
  targets: Target[];
  onSelect?: (path: string) => void;
};

/**
 * Représente une cible de navigation (point d'entrée de l'arborescence).
 */
type Target = {
  label: string;
  path: string;
};

/**
 * Construit un arbre de nœuds à partir d'une liste plate d'entrées.
 */
function buildTree(entries: Entry[]): TreeNode[] {
  const map = new Map<string, TreeNode>();

  entries.forEach((e) => {
    map.set(e.path, { ...e, children: [] });
  });

  const roots: TreeNode[] = [];

  entries.forEach((e) => {
    const parentPath = e.path.split("/").slice(0, -1).join("/");
    const node = map.get(e.path);
    if (!node) return;

    if (map.has(parentPath)) {
      map.get(parentPath)!.children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}

export type DirectoryExplorerHandle = {
  refresh: () => void;
};

export const DirectoryExplorer = forwardRef<DirectoryExplorerHandle, Props>(
  ({ targets, onSelect }, ref) => {
    const [tree, setTree] = useState<TreeNode[]>([]);
    const [cache, setCache] = useState<Record<string, Entry[]>>({});
    const [expanded, setExpanded] = useState<Set<string>>(new Set());
    const [selected, setSelected] = useState<string | null>(null);
    const [activeTarget, setActiveTarget] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    /** Ouvre ou ferme un répertoire dans l'arborescence. */
    const toggleDir = (path: string) => {
      setExpanded((prev) => {
        const next = new Set(prev);
        if (next.has(path)) next.delete(path);
        else next.add(path);
        return next;
      });
    };

    /** Charge les répertoires d'une cible, avec mise en cache. */
    const fetchDirs = async (targetPath: string, forceRefresh = false) => {
      setSelected(null);

      if (!forceRefresh && cache[targetPath]) {
        setTree(buildTree(cache[targetPath]));
        setActiveTarget(targetPath);
        setExpanded(new Set());
        return;
      }

      setLoading(true);
      setActiveTarget(targetPath);

      try {
        const result = await runAction<Entry[]>("list-directory", [targetPath]);
        const entries = Array.isArray(result) ? result : [];
        const directories = entries.filter((e) => e.type === "directory");

        setTree(buildTree(directories));
        setCache((prev) => ({ ...prev, [targetPath]: directories }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    useImperativeHandle(ref, () => ({
      refresh: () => {
        if (activeTarget) {
          setCache((prev) => {
            const next = { ...prev };
            delete next[activeTarget];
            return next;
          });
          fetchDirs(activeTarget, true);
        }
      },
    }));

    /** Sélectionne un répertoire et notifie le parent. */
    const handleSelect = (path: string) => {
      setSelected(path);
      onSelect?.(path);
    };

    /** Affichage cours du path */
    const formatPath = (path: string, base: string) => {
      const parts = base.split("/");
      const firstSegment = parts[0];
      const index = path.indexOf(firstSegment);
      return index !== -1 ? path.slice(index) : path;
    };

    return (
      <Card tone="secondary">
        <Card.Header>
          <Text as="h3">Choisir le répertoire de destination</Text>
        </Card.Header>

        <Card.Content>
          {/* Points d'entrée de l'arborescence */}
          <div className={styles.targets}>
            {targets.map((target) => (
              <Button
                key={target.path}
                onClick={() => fetchDirs(target.path)}
                tone={activeTarget === target.path ? "secondary" : "neutral"}
              >
                {loading && activeTarget === target.path
                  ? "Chargement..."
                  : target.label}
              </Button>
            ))}
          </div>

          {/* Arborescence des répertoires */}
          <div className={styles.list}>
            {tree.length === 0 && activeTarget && !loading && (
              <p className={styles.empty}>Aucun dossier trouvé</p>
            )}
            {tree.map((node) => (
              <DirectoryNode
                key={node.path}
                node={node}
                expanded={expanded}
                selected={selected}
                onToggle={toggleDir}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </Card.Content>

        <Card.Footer>
          {/* Répertoire sélectionné */}
          <Text>
            Dossier choisi :{" "}
            {selected && activeTarget
              ? formatPath(selected, activeTarget)
              : "—"}
          </Text>
        </Card.Footer>
      </Card>
    );
  },
);

DirectoryExplorer.displayName = "DirectoryExplorer";
