import { getColor } from "@/features/GitManager/constants/branchColors";
import styles from "./BranchDot.module.css";

interface BranchDotProps {
  depth: number;
  isActive: boolean;
  branchName: string;
}

/**
 * Nœud circulaire représentant une branche dans le graphe git.
 * La couleur et l'indentation sont dérivées de la profondeur.
 */
export const BranchDot = ({ depth, isActive, branchName }: BranchDotProps) => {
  const color = getColor(depth);

  return (
    <div
      data-branch={branchName}
      className={`${styles.node} ${isActive ? styles.activeNode : ""}`}
      style={{ marginLeft: depth * 40, borderColor: color, color }}
    />
  );
};
