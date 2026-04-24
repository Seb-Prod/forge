import { useEffect, useState } from "react";

import { getColor } from "@/features/GitManager/constants/branchColors";
import styles from "./BranchPaths.module.css";
import { useGitRepository } from "@/features/GitManager/context";

interface BranchPathsProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * BranchPaths
 *
 * Dessine les courbes de connexion entre branches Git sous forme de SVG.
 *
 * Se positionne en `absolute` par-dessus le conteneur parent pour relier
 * visuellement chaque branche à son parent via une courbe de Bézier cubique.
 * La couleur de chaque courbe dépend de la profondeur de la branche dans l'arbre.
 *
 * @remarks
 * Les nœuds du DOM sont détectés via l'attribut `data-branch` sur les éléments enfants
 * du `containerRef`. Ce composant doit donc être utilisé dans un conteneur
 * où `BranchTree` (ou équivalent) pose ces attributs.
 */
export const BranchPaths = ({ containerRef }: BranchPathsProps) => {
  const { mergedBranches } = useGitRepository();

  const [paths, setPaths] = useState<{ d: string; color: string }[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const getDepth = (branchName: string) => {
      let depth = 0;
      let current = mergedBranches.find((b) => b.name === branchName);
      while (current?.parent) {
        depth++;
        current = mergedBranches.find((b) => b.name === current?.parent);
      }
      return depth;
    };

    const nodes = containerRef.current.querySelectorAll("[data-branch]");
    const map: Record<string, DOMRect> = {};
    nodes.forEach((el) => {
      const name = el.getAttribute("data-branch");
      if (name) map[name] = el.getBoundingClientRect();
    });

    const containerRect = containerRef.current.getBoundingClientRect();

    const newPaths = mergedBranches
      .filter((b) => b.parent)
      .map((b) => {
        const parent = map[b.parent!];
        const child = map[b.name];
        if (!parent || !child) return null;

        const depth = getDepth(b.name);
        const color = getColor(depth);

        const x1 = parent.left - containerRect.left + parent.width / 2;
        const y1 = parent.top - containerRect.top + parent.height;

        const x2 = child.left - containerRect.left;
        const y2 = child.top - containerRect.top + child.height / 2;
        const dx = Math.abs(x2 - x1) * 0.5;
        const dy = Math.abs(y2 - y1) * 0.5;

        return {
          d: `M ${x1} ${y1} C ${x1} ${y1 + dy}, ${x2 - dx} ${y2}, ${x2} ${y2}`,
          color,
        };
      })
      .filter(Boolean) as { d: string; color: string }[];

    setPaths(newPaths);
  }, [mergedBranches, containerRef]);

  return (
    <svg width="100%" height="100%" className={styles.svg}>
      {paths.map((p, i) => (
        <path key={i} d={p.d} fill="none" stroke={p.color} strokeWidth="2" />
      ))}
    </svg>
  );
};
