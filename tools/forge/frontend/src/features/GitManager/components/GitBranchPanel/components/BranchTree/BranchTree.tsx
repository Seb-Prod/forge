import type { JSX } from "react";
import type { Branch } from "../../GitBranchPanel";
import { BranchNode } from "../BranchNode";
import { useGit } from "@/features/GitManager/context/useGit";

interface BranchTreeProps {
  branches: Branch[];
  currentBranch: string;
  parent?: string | null;
  depth?: number;
}

/**
 * BranchTree
 *
 * Génère récursivement la liste à plat des nœuds de l'arbre de branches.
 *
 * Filtre les branches par `parent` à chaque niveau et s'appelle récursivement
 * pour construire l'arborescence complète en profondeur.
 *
 */
export const BranchTree = ({
  branches,
  currentBranch,
  parent = null,
  depth = 0,
}: BranchTreeProps): JSX.Element[] => {
  const {hasModifications} = useGit();
  
  return branches
    .filter((b) => b.parent === parent)
    .flatMap((branch) => {
      const isActive = branch.name === currentBranch;
      return [
        <BranchNode
          key={branch.name}
          branch={branch}
          depth={depth}
          isActive={isActive}
          hasModifications={hasModifications}
        />,
        ...BranchTree({
          branches,
          currentBranch,
          parent: branch.name,
          depth: depth + 1,
        }),
      ];
    });
};
